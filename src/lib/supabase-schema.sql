-- ============================================================
-- Serena — Dashboard de Longevidade Feminina
-- Supabase Schema
-- ============================================================
-- Execute no SQL Editor do seu projeto Supabase

-- ============================================================
-- TABELA: lab_results (exames laboratoriais)
-- ============================================================
create table if not exists lab_results (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  date date not null,
  category text not null,

  -- A. Metabólico e cardiovascular
  glicemia_jejum numeric,
  insulina_jejum numeric,
  homa_ir numeric,
  hba1c numeric,
  colesterol_total numeric,
  hdl numeric,
  ldl numeric,
  triglicerideos numeric,
  apob numeric,
  lpa numeric,
  acido_urico numeric,

  -- B. Inflamação e envelhecimento
  pcr_us numeric,
  ferritina numeric,
  homocisteina numeric,
  vitamina_d numeric,
  magnesio numeric,
  zinco numeric,
  b12 numeric,
  folato numeric,

  -- C. Tireóide e hormonal
  tsh numeric,
  t4_livre numeric,
  anti_tpo numeric,
  prolactina numeric,
  amh numeric,
  fsh numeric,
  lh numeric,
  e2 numeric,
  progesterona_lutea numeric,

  -- D. Performance e recuperação
  hemoglobina numeric,
  hematocrito numeric,
  ferro numeric,
  ck numeric,
  creatinina numeric,
  ureia numeric,
  ast numeric,
  alt numeric,

  notes text,
  created_at timestamptz default now()
);

-- ============================================================
-- TABELA: daily_tracking (registro diário)
-- ============================================================
create table if not exists daily_tracking (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  date date not null,

  sleep_hours numeric,
  sleep_quality int,
  sleep_fixed_time bool,
  sleep_no_screen bool,

  steps int,
  aerobic_done bool,
  strength_done bool,
  mobility_done bool,

  protein_met bool,
  eating_window_ok bool,
  plants_count int,

  sun_morning bool,
  downregulation_done bool,
  social_done bool,

  energy int,
  focus int,
  mood int,
  anxiety int,

  cycle_day int,
  cycle_phase text,
  cycle_symptoms text[],

  notes text,
  created_at timestamptz default now(),
  unique(user_id, date)
);

-- ============================================================
-- TABELA: physical_metrics
-- ============================================================
create table if not exists physical_metrics (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  date date not null,

  weight numeric,
  waist_cm numeric,
  body_fat_pct numeric,
  muscle_mass_kg numeric,
  resting_hr int,
  hrv numeric,
  vo2_estimated numeric,
  grip_strength numeric,

  created_at timestamptz default now()
);

-- ============================================================
-- TABELA: weekly_scores
-- ============================================================
create table if not exists weekly_scores (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  week_key text not null,
  year int not null,
  week_num int not null,

  score_sleep int,
  score_exercise int,
  score_nutrition int,
  score_stress int,
  score_total int,

  notes text,
  created_at timestamptz default now(),
  unique(user_id, week_key)
);

-- ============================================================
-- RLS Policies
-- ============================================================
alter table lab_results enable row level security;
alter table daily_tracking enable row level security;
alter table physical_metrics enable row level security;
alter table weekly_scores enable row level security;

create policy "Own data only" on lab_results for all using (auth.uid() = user_id);
create policy "Own data only" on daily_tracking for all using (auth.uid() = user_id);
create policy "Own data only" on physical_metrics for all using (auth.uid() = user_id);
create policy "Own data only" on weekly_scores for all using (auth.uid() = user_id);

-- ============================================================
-- View: HOMA-IR calculado automaticamente
-- ============================================================
create or replace view lab_results_computed as
select *,
  case
    when insulina_jejum is not null and glicemia_jejum is not null
    then round((insulina_jejum * glicemia_jejum / 405)::numeric, 2)
    else homa_ir
  end as homa_ir_calc,
  case
    when triglicerideos is not null and hdl is not null and hdl > 0
    then round((triglicerideos / hdl)::numeric, 2)
    else null
  end as tg_hdl_ratio
from lab_results;

-- ============================================================
-- Índices
-- ============================================================
create index on lab_results (user_id, date desc);
create index on daily_tracking (user_id, date desc);
create index on physical_metrics (user_id, date desc);
create index on weekly_scores (user_id, week_key desc);
