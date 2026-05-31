-- ──────────────────────────────────────────────────────────
-- SERENA v3 — Schema sem autenticação
-- PIN é checado no cliente. Supabase armazena os dados.
-- Cole no SQL Editor do Supabase → Execute
-- ──────────────────────────────────────────────────────────

-- ATENÇÃO: user_id aqui é um texto fixo (sem ligação com auth.users)
-- Coloque o mesmo valor que está em USER_ID no index.html

CREATE TABLE IF NOT EXISTS daily_tracking (
  id                   uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id              text NOT NULL,
  date                 date NOT NULL,
  sleep_hours          numeric(4,1),
  sleep_quality        smallint,
  sleep_fixed_time     boolean DEFAULT false,
  sleep_no_screen      boolean DEFAULT false,
  steps                integer,
  aerobic_done         boolean DEFAULT false,
  strength_done        boolean DEFAULT false,
  mobility_done        boolean DEFAULT false,
  protein_met          boolean DEFAULT false,
  eating_window_ok     boolean DEFAULT false,
  plants_count         smallint,
  sun_morning          boolean DEFAULT false,
  downregulation_done  boolean DEFAULT false,
  social_done          boolean DEFAULT false,
  energy               smallint,
  focus                smallint,
  mood                 smallint,
  cycle_day            smallint,
  cycle_phase          text,
  cycle_symptoms       text[],
  notes                text,
  UNIQUE(user_id, date)
);
ALTER TABLE daily_tracking DISABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS weekly_scores (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id         text NOT NULL,
  week_key        text NOT NULL,
  year            smallint,
  week_num        smallint,
  score_sleep     smallint,
  score_exercise  smallint,
  score_nutrition smallint,
  score_stress    smallint,
  score_total     smallint,
  UNIQUE(user_id, week_key)
);
ALTER TABLE weekly_scores DISABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS lab_results (
  id                   uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id              text NOT NULL,
  date                 date NOT NULL,
  category             text,
  glicemia_jejum       numeric, insulina_jejum numeric, homa_ir numeric,
  hba1c                numeric, colesterol_total numeric, hdl numeric,
  ldl                  numeric, triglicerideos numeric, apob numeric,
  lpa                  numeric, acido_urico numeric,
  pcr_us               numeric, ferritina numeric, homocisteina numeric,
  vitamina_d           numeric, magnesio numeric, zinco numeric,
  b12                  numeric, folato numeric,
  tsh                  numeric, t4_livre numeric, anti_tpo numeric,
  prolactina           numeric, amh numeric, fsh numeric,
  lh                   numeric, e2 numeric, progesterona_lutea numeric,
  hemoglobina          numeric, hematocrito numeric, ferro numeric,
  ck                   numeric, creatinina numeric, ureia numeric,
  ast                  numeric, alt numeric,
  saved                timestamptz DEFAULT now()
);
ALTER TABLE lab_results DISABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS health_sync (
  id                   uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id              text NOT NULL,
  date                 date NOT NULL,
  steps                integer,
  active_calories      integer,
  exercise_minutes     integer,
  stand_hours          integer,
  distance_km          numeric(6,2),
  sleep_start          timestamptz,
  sleep_end            timestamptz,
  sleep_minutes        integer,
  sleep_deep_minutes   integer,
  sleep_rem_minutes    integer,
  sleep_core_minutes   integer,
  resting_hr           integer,
  hrv_ms               numeric(6,1),
  vo2max               numeric(5,1),
  spo2_pct             numeric(5,1),
  respiratory_rate     numeric(5,1),
  weight_kg            numeric(5,1),
  source               text DEFAULT 'apple_health',
  synced_at            timestamptz DEFAULT now(),
  UNIQUE(user_id, date)
);
ALTER TABLE health_sync DISABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS epi_results (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     text NOT NULL,
  date        date,
  platform    text,
  bio_age     numeric(5,1),
  pace        numeric(5,2),
  grim        numeric(5,1),
  pheno       numeric(5,1),
  notes       text,
  saved       timestamptz DEFAULT now()
);
ALTER TABLE epi_results DISABLE ROW LEVEL SECURITY;

-- Realtime (opcional)
ALTER PUBLICATION supabase_realtime ADD TABLE daily_tracking;
ALTER PUBLICATION supabase_realtime ADD TABLE health_sync;
