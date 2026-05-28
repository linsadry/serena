// src/lib/supabase.js
// Substitua pelos valores do seu projeto:
// Supabase Dashboard → Settings → API

const SUPABASE_URL = window.ENV_SUPABASE_URL || 'https://SEU-PROJETO.supabase.co';
const SUPABASE_ANON_KEY = window.ENV_SUPABASE_ANON_KEY || 'sua-anon-key-aqui';

class SupabaseClient {
  constructor(url, key) {
    this.url = url;
    this.key = key;
    this.authToken = null;
    this._loadToken();
  }

  _loadToken() {
    try {
      const stored = localStorage.getItem('sb-auth-token');
      if (stored) this.authToken = JSON.parse(stored).access_token;
    } catch {}
  }

  _headers(extra = {}) {
    return {
      'Content-Type': 'application/json',
      'apikey': this.key,
      'Authorization': `Bearer ${this.authToken || this.key}`,
      ...extra
    };
  }

  async signIn(email, password) {
    const r = await fetch(`${this.url}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: this._headers(),
      body: JSON.stringify({ email, password })
    });
    const data = await r.json();
    if (data.access_token) {
      this.authToken = data.access_token;
      localStorage.setItem('sb-auth-token', JSON.stringify(data));
    }
    return data;
  }

  async signUp(email, password) {
    const r = await fetch(`${this.url}/auth/v1/signup`, {
      method: 'POST',
      headers: this._headers(),
      body: JSON.stringify({ email, password })
    });
    return r.json();
  }

  async signOut() {
    await fetch(`${this.url}/auth/v1/logout`, {
      method: 'POST',
      headers: this._headers()
    });
    this.authToken = null;
    localStorage.removeItem('sb-auth-token');
  }

  getUser() {
    try {
      const stored = localStorage.getItem('sb-auth-token');
      if (!stored) return null;
      return JSON.parse(stored).user || null;
    } catch { return null; }
  }

  from(table) {
    return new QueryBuilder(this.url, this.key, this._headers.bind(this), table);
  }
}

class QueryBuilder {
  constructor(url, key, headersFn, table) {
    this.url = url;
    this.table = table;
    this._headers = headersFn;
    this._filters = [];
    this._order = null;
    this._limit = null;
    this._select = '*';
  }

  select(cols = '*') { this._select = cols; return this; }
  eq(col, val) { this._filters.push(`${col}=eq.${val}`); return this; }
  order(col, { ascending = true } = {}) { this._order = `${col}.${ascending ? 'asc' : 'desc'}`; return this; }
  limit(n) { this._limit = n; return this; }

  _buildUrl() {
    let u = `${this.url}/rest/v1/${this.table}?select=${this._select}`;
    this._filters.forEach(f => u += `&${f}`);
    if (this._order) u += `&order=${this._order}`;
    if (this._limit) u += `&limit=${this._limit}`;
    return u;
  }

  async get() {
    const r = await fetch(this._buildUrl(), { headers: this._headers() });
    const data = await r.json();
    return { data: Array.isArray(data) ? data : [], error: data.error || null };
  }

  async insert(row) {
    const r = await fetch(`${this.url}/rest/v1/${this.table}`, {
      method: 'POST',
      headers: this._headers({ 'Prefer': 'return=representation' }),
      body: JSON.stringify(row)
    });
    const data = await r.json();
    return { data, error: data.error || null };
  }

  async upsert(row, { onConflict } = {}) {
    let url = `${this.url}/rest/v1/${this.table}`;
    if (onConflict) url += `?on_conflict=${onConflict}`;
    const r = await fetch(url, {
      method: 'POST',
      headers: this._headers({ 'Prefer': 'return=representation,resolution=merge-duplicates' }),
      body: JSON.stringify(row)
    });
    const data = await r.json();
    return { data, error: data.error || null };
  }
}

window.supabase = new SupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);
