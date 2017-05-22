const Constants = {
  MESSAGE_SENDING: 'MESSAGE_SENDING',
  MESSAGE_SENT: 'MESSAGE_SENT',
  MESSAGE_SENT_ERRORS: 'MESSAGE_SENT_ERRORS',

  LOADING_DATA: 'LOADING_DATA',
  LOADING_DATA_ERROR: 'LOADING_DATA_ERROR',
  LOADING_DATA_SUCCESS: 'LOADING_DATA_SUCCESS',

  LOADING_DATA_PERSONALITIES: 'LOADING_DATA_PERSONALITIES',
  LOADING_DATA_ERROR_PERSONALITIES: 'LOADING_DATA_ERROR_PERSONALITIES',
  LOADING_DATA_SUCCESS_PERSONALITIES: 'LOADING_DATA_SUCCESS_PERSONALITIES',

  LOADING_DATA_AUTHORS: 'LOADING_DATA_AUTHORS',
  LOADING_DATA_ERROR_AUTHORS: 'LOADING_DATA_ERROR_AUTHORS',
  LOADING_DATA_SUCCESS_AUTHORS: 'LOADING_DATA_SUCCESS_AUTHORS',

  LOADING_DATA_ASSOCIATIONS: 'LOADING_DATA_ASSOCIATIONS',
  LOADING_DATA_ERROR_ASSOCIATIONS: 'LOADING_DATA_ERROR_ASSOCIATIONS',
  LOADING_DATA_SUCCESS_ASSOCIATIONS: 'LOADING_DATA_SUCCESS_ASSOCIATIONS',

  LOADING_DATA_NATURE: 'LOADING_DATA_NATURE',
  LOADING_DATA_ERROR_NATURE: 'LOADING_DATA_ERROR_NATURE',
  LOADING_DATA_SUCCESS_NATURE: 'LOADING_DATA_SUCCESS_NATURE',

  LOADING_DATA_PRESS: 'LOADING_DATA_PRESS',
  LOADING_DATA_ERROR_PRESS: 'LOADING_DATA_ERROR_PRESS',
  LOADING_DATA_SUCCESS_PRESS: 'LOADING_DATA_SUCCESS_PRESS',

  LOADING_DATA_PARISH: 'LOADING_DATA_PARISH',
  LOADING_DATA_ERROR_PARISH: 'LOADING_DATA_ERROR_PARISH',
  LOADING_DATA_SUCCESS_PARISH: 'LOADING_DATA_SUCCESS_PARISH',

  LOADING_DATA_CITY_COUNCIL: 'LOADING_DATA_CITY_COUNCIL',
  LOADING_DATA_SUCCESS_CITY_COUNCIL: 'LOADING_DATA_SUCCESS_CITY_COUNCIL',
  LOADING_DATA_ERROR_CITY_COUNCIL: 'LOADING_DATA_ERROR_CITY_COUNCIL',


  DATES: {
    d1836_1910: "1836-1910",
    d1910_1926: "1910-1926",
    d1926_1974: "1926-1974",
    d1974_1976: "1974-1976",
    d1976_2013: "1976-2013",

    d1400_1500: "1400-1500",
    d1501_1600: "1501-1600",
    d1601_1700: "1601-1700",
    d1701_1800: "1701-1800",
    d1801_1900: "1801-1900",
    d1901_2000: "1901-2000",
  },


  DATE_MAPPINGS: {
    d1836_1910: "data1836_1910",
    d1910_1926: "data1910_1926",
    d1926_1974: "data1926_1974",
    d1974_1976: "data1974_1976",
    d1976_2013: "data1976_2013",
    d1400_1500: "data1400_1500",
    d1501_1600: "data1501_1600",
    d1601_1700: "data1601_1700",
    d1701_1800: "data1701_1800",
    d1801_1900: "data1801_1900",
    d1901_2000: "data1901_2000",
  },


  ASSOCIATIONS: {
    CULTURAL: 'cultural',
    CIVIC: 'civic',
    SPORTS: 'sports',
    RELIGIOUS: 'religious',
    SOCIAL: 'social',
    RECREATIONAL: 'recreational',
  },


  ASSOCIATIONS_TEXT: {
    CULTURAL: 'Culturais',
    CIVIC: 'Cívicas',
    SPORTS: 'Desportivas',
    RELIGIOUS: 'Religiosas',
    SOCIAL: 'Sociais',
    RECREATIONAL: 'Recreativas',
  },


  PRESS: {
    MAGAZINES: 'magazines',
    JOURNALS: 'journals',
    RADIOS: 'radios',
    TELEVISIONS: 'televisions',
    ONLINE: 'online'
  },


  PRESS_TEXT: {
    MAGAZINES: 'Revistas',
    JOURNALS: 'Jornais',
    RADIOS: 'Rádios',
    TELEVISIONS: 'Televisões',
    ONLINE: 'Online'
  },


  NATURE: {
    BROOKS: 'brooks',
    RIVERS: 'rivers',
    MOUNTAINS: 'mountains',
  },


    NATURE_TEXT: {
    BROOKS: 'Ribeiros',
    RIVERS: 'Rios',
    MOUNTAINS: 'Serras',
  },


  PERSONALITIES: {
    ARTS_WRITING: 'arts_writing',
    SPORTS: 'sports',
    SOCIAL_ECONOMICAL: 'social_economical',
    POLITICAL: 'political',
  },


  PERSONALITIES_TEXT: {
    ARTS_WRITING: 'Artes e Letras',
    SPORTS: 'Desporto',
    SOCIAL_ECONOMICAL: 'Social e Económico',
    POLITICAL: 'Político'
  },


  PRESIDENTS: 'presidents',
  COUNCILMEN: 'councilmen',
  AUTHORS: 'authors',
  ASSOCIATIONS_TABLE: 'associations',
  PRESS_TABLE: 'press',
  FESTIVITIES_TABLE: 'festivities',
  CITY_COUNCIL_TABLE: 'city_council',
  NATURE_TABLE: 'nature',
  PERSONALITIES_TABLE: 'personalities',


  PERSONALITIES_STRING: 'Personalidades',


  MINIMUM_WAIT_TIME: 500,


  PARISHES: {
      'aboadela_sanche': 'Aboadela e Sanche',
      'aboim_vila_garcia': 'Aboim e Vila Garcia',
      'ansiaes': 'Ansiães',
      'bustelo_carvalho_rei': 'Bustelo e Carvalho de Rei',
      'canadelo_olo': 'Canadelo e Ôlo',
      'candemil': 'Candemil',
      'cepelos_gatao_sao_goncalo': 'Cepelos, São Gonçalo e Gatão',
      'figueiro_santa_cristina_santiago': 'Figueiró, Santa Cristina e Santiago',
      'fregim': 'Fregim',
      'freixo_baixo_cima': 'Freixo de Baixo e Freixo de Cima',
      'fridao': 'Fridão',
      'gondar': 'Gondar',
      'gouveia': 'Gouveia',
      'jazente': 'Jazente',
      'lomba': 'Lomba',
      'louredo': 'Louredo',
      'lufrei': 'Lufrei',
      'mancelos': 'Mancelos',
      'oliveira': 'Oliveira',
      'padronelo': 'Padronelo',
      'real': 'Real',
      'rebordelo': 'Rebordelo',
      'salvador': 'Salvador do Monte',
      'teloes': 'Telões',
      'travanca': 'Travanca',
      'vila_caiz': 'Vila Caíz',
      'vila_cha_marao': 'Vila Chã do Marão',
      'vila_mea': 'Vila Meã'
  },


  PARISHES_NAMES: ['Aboadela', 'Aboim', 'Amarante (S. Gonçalo)', 'Ansiães', 'Ataíde', 'Bustelo',
  'Canadelo', 'Candemil', 'Carneiro', 'Carvalho de Rei', 'Cepelos', 'Chapa', 'Figueiró Santa Cristina',
  'Figueiro Santiago', 'Fregim', 'Freixo de Baixo', 'Freixo de Cima', 'Fridão', 'Gatão', 'Gondar',
  'Gouveia - S. Simão', 'Jazente', 'Lomba', 'Louredo', 'Lufrei', 'Madalena', 'Mancelos', 'Oliveira',
  'Ôlo', 'Padronelo',  'Real', 'Rebordelo', 'Salvador do Monte', 'Sanche', 'Telões', 'Travanca', 'Várzea',
  'Vila Caíz', 'Vila Chã do Marão', 'Vila Garcia', 'Vila Meã', 'União de Freguesias de Aboadela, Sanche e Várzea',
  'União de Freguesias de Amarante (S. Gonçalo), Madalena, Cepelos e Gatão', 'União de Freguesias de Bustelo, Carneiro e Carvalho de Rei',
  'União de Freguesias Figueiró (Santiago e Santa Cristina)', 'União de Freguesias de Freixo de Cima e de Baixo',
  'União de Freguesias de Ôlo e Canadelo', 'União de Freguesias de Vila Garcia, Aboim e Chapa']
};


export { Constants };
