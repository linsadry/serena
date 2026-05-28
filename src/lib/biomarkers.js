window.BIOMARKERS = {
  metabolico: {
    label: 'Metabólico & Cardiovascular',
    icon: '🫀',
    frequency: '6–12 meses',
    color: '#A0522D',
    markers: {
      glicemia_jejum:   { label: 'Glicemia de jejum',  unit: 'mg/dL',  goal: '<100',       ideal: [70,99],   warn: [100,125], alert: 126,  priority: 'alta',  note: 'Colher após 8h de jejum' },
      insulina_jejum:   { label: 'Insulina de jejum',  unit: 'µUI/mL', goal: '<10',        ideal: [2,9.9],   warn: [10,15],   alert: 15.1, priority: 'alta',  note: 'Marcador precoce de resistência' },
      homa_ir:          { label: 'HOMA-IR',            unit: '',       goal: '<2.0',       ideal: [0,1.99],  warn: [2,2.9],   alert: 3,    priority: 'alta',  note: 'Calculado: insulina×glicemia/405' },
      hba1c:            { label: 'HbA1c',              unit: '%',      goal: '<5.4',       ideal: [4,5.39],  warn: [5.4,5.6], alert: 5.7,  priority: 'alta',  note: 'Média glicêmica 3 meses' },
      colesterol_total: { label: 'Colesterol total',   unit: 'mg/dL',  goal: '<200',       ideal: [150,199], warn: [200,239], alert: 240,  priority: 'media', note: null },
      hdl:              { label: 'HDL',                unit: 'mg/dL',  goal: '>60',        ideal: [60,120],  warn: [50,59],   alert: 49,   priority: 'alta',  note: 'Quanto maior melhor' },
      ldl:              { label: 'LDL',                unit: 'mg/dL',  goal: '<100',       ideal: [0,99],    warn: [100,129], alert: 130,  priority: 'alta',  note: null },
      triglicerideos:   { label: 'Triglicerídeos',     unit: 'mg/dL',  goal: '<100',       ideal: [0,99],    warn: [100,149], alert: 150,  priority: 'alta',  note: 'Reflete ingestão de carbs/álcool' },
      apob:             { label: 'ApoB',               unit: 'mg/dL',  goal: '<80',        ideal: [0,79],    warn: [80,99],   alert: 100,  priority: 'alta',  note: 'Melhor preditor CV que LDL' },
      lpa:              { label: 'Lp(a)',              unit: 'nmol/L', goal: '<75',        ideal: [0,74],    warn: [75,125],  alert: 125,  priority: 'media', note: 'Genético — pedir 1x' },
      acido_urico:      { label: 'Ácido úrico',        unit: 'mg/dL',  goal: '<5.5',       ideal: [2,5.4],   warn: [5.5,6.4], alert: 6.5,  priority: 'media', note: null },
    }
  },
  inflamacao: {
    label: 'Inflamação & Envelhecimento',
    icon: '🔥',
    frequency: '6–12 meses',
    color: '#8B6914',
    markers: {
      pcr_us:       { label: 'PCR-us',       unit: 'mg/L',   goal: '<1.0',    ideal: [0,0.99],  warn: [1,3],    alert: 3.1,  priority: 'alta',  note: 'Correlaciona com GrimAge' },
      ferritina:    { label: 'Ferritina',    unit: 'ng/mL',  goal: '50–150',  ideal: [50,150],  warn: [20,49],  alert: 200,  priority: 'alta',  note: '>200 = inflamação ou sobrecarga' },
      homocisteina: { label: 'Homocisteína', unit: 'µmol/L', goal: '<10',     ideal: [0,9.9],   warn: [10,14],  alert: 15,   priority: 'alta',  note: 'Risco CV + cognitivo; responde a B12/folato' },
      vitamina_d:   { label: 'Vitamina D',   unit: 'ng/mL',  goal: '40–60',   ideal: [40,60],   warn: [20,39],  alert: 19,   priority: 'alta',  note: 'Imunidade, humor, metabolismo ósseo' },
      magnesio:     { label: 'Magnésio',     unit: 'mg/dL',  goal: '2.0–2.5', ideal: [2.0,2.5], warn: [1.7,1.9],alert: 1.6, priority: 'media', note: null },
      zinco:        { label: 'Zinco',        unit: 'µg/dL',  goal: '80–120',  ideal: [80,120],  warn: [60,79],  alert: 59,   priority: 'media', note: null },
      b12:          { label: 'B12',          unit: 'pg/mL',  goal: '>400',    ideal: [400,900], warn: [200,399],alert: 199,  priority: 'alta',  note: 'Neuroproteção' },
      folato:       { label: 'Folato',       unit: 'ng/mL',  goal: '>10',     ideal: [10,20],   warn: [5,9.9],  alert: 4.9,  priority: 'alta',  note: 'Essencial pré-concepção' },
    }
  },
  hormonal: {
    label: 'Tireóide & Hormonal',
    icon: '🦋',
    frequency: 'Anual ou conforme indicação',
    color: '#4A5240',
    markers: {
      tsh:                { label: 'TSH',               unit: 'mUI/L',  goal: '1.0–2.5',  ideal: [1.0,2.5], warn: [2.6,4],  alert: 4.1,  priority: 'alta',  note: 'Meta restrita em fertilidade' },
      t4_livre:           { label: 'T4 livre',          unit: 'ng/dL',  goal: '1.0–1.5',  ideal: [1.0,1.5], warn: [0.8,0.9],alert: 0.7, priority: 'alta',  note: null },
      anti_tpo:           { label: 'Anti-TPO',          unit: 'UI/mL',  goal: '<35',      ideal: [0,34],    warn: [35,100], alert: 101,  priority: 'alta',  note: 'Hashimoto — relevante em fertilidade' },
      prolactina:         { label: 'Prolactina',        unit: 'ng/mL',  goal: '5–25',     ideal: [5,25],    warn: [25,40],  alert: 40.1, priority: 'media', note: 'Pedir não lactante' },
      amh:                { label: 'AMH',               unit: 'ng/mL',  goal: '1.5–4',    ideal: [1.5,4],   warn: [0.7,1.4],alert: 0.6, priority: 'alta',  note: 'Reserva ovariana — qualquer dia' },
      fsh:                { label: 'FSH',               unit: 'mUI/mL', goal: '<10 (D3)', ideal: [2,9.9],   warn: [10,15],  alert: 15.1, priority: 'alta',  note: 'Pedir D2–D4' },
      lh:                 { label: 'LH',                unit: 'mUI/mL', goal: 'D3: <7',   ideal: [1,6.9],   warn: [7,12],   alert: 12.1, priority: 'media', note: 'Pedir D2–D4' },
      e2:                 { label: 'Estradiol (E2)',     unit: 'pg/mL',  goal: 'D3: <60',  ideal: [20,59],   warn: [60,100], alert: 100,  priority: 'media', note: 'Pedir D2–D4' },
      progesterona_lutea: { label: 'Progesterona lútea',unit: 'ng/mL',  goal: '>10 D21',  ideal: [10,30],   warn: [5,9.9],  alert: 4.9,  priority: 'alta',  note: 'Confirma ovulação — ~D21' },
    }
  },
  performance: {
    label: 'Performance & Recuperação',
    icon: '⚡',
    frequency: '6–12 meses',
    color: '#6B7A5E',
    markers: {
      hemoglobina: { label: 'Hemoglobina',  unit: 'g/dL',  goal: '12–16',   ideal: [12,16],  warn: [10,11.9], alert: 9.9, priority: 'alta',  note: null },
      hematocrito: { label: 'Hematócrito',  unit: '%',     goal: '36–46',   ideal: [36,46],  warn: [33,35.9], alert: 32,  priority: 'media', note: null },
      ferro:       { label: 'Ferro sérico', unit: 'µg/dL', goal: '60–160',  ideal: [60,160], warn: [40,59],   alert: 39,  priority: 'alta',  note: 'Pedir junto com ferritina' },
      ck:          { label: 'CK',           unit: 'U/L',   goal: '<170',    ideal: [0,169],  warn: [170,300], alert: 301, priority: 'baixa', note: 'Relevante se treinando intenso' },
      creatinina:  { label: 'Creatinina',   unit: 'mg/dL', goal: '0.5–1.1', ideal: [0.5,1.1],warn: [1.1,1.3],alert: 1.3, priority: 'media', note: null },
      ureia:       { label: 'Ureia',        unit: 'mg/dL', goal: '15–40',   ideal: [15,40],  warn: [41,55],   alert: 56,  priority: 'baixa', note: null },
      ast:         { label: 'AST (TGO)',    unit: 'U/L',   goal: '<30',     ideal: [0,29],   warn: [30,40],   alert: 41,  priority: 'media', note: null },
      alt:         { label: 'ALT (TGP)',    unit: 'U/L',   goal: '<25',     ideal: [0,24],   warn: [25,40],   alert: 41,  priority: 'media', note: 'Sensível para saúde hepática feminina' },
    }
  }
};

window.CORE_MARKERS = [
  { key: 'hba1c',          category: 'metabolico',  freq: '6m'  },
  { key: 'homa_ir',        category: 'metabolico',  freq: '6m'  },
  { key: 'triglicerideos', category: 'metabolico',  freq: '6m'  },
  { key: 'hdl',            category: 'metabolico',  freq: '6m'  },
  { key: 'apob',           category: 'metabolico',  freq: '6m'  },
  { key: 'pcr_us',         category: 'inflamacao',  freq: '6m'  },
  { key: 'vitamina_d',     category: 'inflamacao',  freq: '6m'  },
  { key: 'ferritina',      category: 'inflamacao',  freq: '6m'  },
  { key: 'b12',            category: 'inflamacao',  freq: '6m'  },
  { key: 'tsh',            category: 'hormonal',    freq: '12m' },
  { key: 'amh',            category: 'hormonal',    freq: '12m' },
];

window.EPIAGE_TESTS = [
  {
    name: 'TruDiagnostic',
    clocks: ['GrimAge', 'PhenoAge', 'DunedinPACE', 'Horvath'],
    best_for: 'Análise avançada + acompanhamento científico',
    strengths: 'Mais clocks validados, DunedinPACE (velocidade), relatório detalhado',
    limitations: 'Mais caro, sem app dedicado',
    price: 'US$ 299–500',
    recommendation: '⭐ Recomendado para acompanhar intervenções seriamente',
    color: '#A0522D'
  },
  {
    name: 'Tally Health',
    clocks: ['TallyAge (proprietário)'],
    best_for: 'Acompanhamento lifestyle com app',
    strengths: 'App bem feito, sugestões personalizadas',
    limitations: 'Menos transparente metodologicamente',
    price: 'US$ 129–249',
    recommendation: 'Bom ponto de entrada',
    color: '#8B6914'
  },
  {
    name: 'Elysium Index',
    clocks: ['Proprietário baseado em Horvath'],
    best_for: 'Experiência mais simples',
    strengths: 'Acessível, interface limpa',
    limitations: 'Menos profundo, menos clocks',
    price: 'US$ 229',
    recommendation: 'Opção de custo menor',
    color: '#4A5240'
