// 스킨, 글꼴, 기호 등 모든 창이 함께 쓰는 값
(function () {
  // on: 포인트색 위 글자색, dark: 어두운 스킨
  const SKINS = {
    lav: {
      name: '라벤더 글래스', base: '#EEF0FB', b: ['#FFCADB', '#CFC8FF', '#C6F0DF', '#C7E0FF'],
      a1: '#5F67DE', a2: '#8E6FE6', ink: '#2E3150', sub: '#535877', sun: '#C2416A', sat: '#4A5BD6', glow: 'rgba(110,100,230,0.32)', on: '#FFFFFF',
      pal: [[[255, 243, 196], [255, 222, 214]], [[204, 243, 224], [196, 229, 255]], [[255, 214, 222], [255, 200, 232]], [[204, 226, 255], [214, 206, 255]], [[226, 214, 255], [246, 214, 255]]]
    },
    peach: {
      // 디자인 스킨 · 피치 블라썸: 복숭아 핑크 유리 + 3D 벚꽃, 복숭아 말랑이 (예전 '피치 소다' 자리)
      name: '피치 블라썸', deco: 'peach', glassSeason: true, solidAccent: true, panelRGB: '255, 236, 236', bunny: 'bunny-3d-peach.png', logo: 'logo-3d-peach.png',
      base: '#FDF1F1', b: ['#FFD6D8', '#FFE4E2', '#FCDCE4', '#FFEBE6'],
      a1: '#EC7889', a2: '#F7AEB8', ink: '#4A2E36', sub: '#8A6870', sun: '#E0607E', sat: '#4A7BC8', glow: 'rgba(236,120,137,0.26)', on: '#FFFFFF',
      pal: [[[255, 230, 230], [255, 216, 220]], [[255, 238, 234], [255, 224, 224]], [[255, 228, 236], [252, 214, 228]], [[255, 238, 228], [255, 224, 216]], [[252, 232, 240], [248, 220, 232]]]
    },
    pink: {
      name: '핑크 다이어리', base: '#FDF0F4', b: ['#FFC6D6', '#CBEFDF', '#FFDCE6', '#FBD0DE'],
      a1: '#EA6A9A', a2: '#F6A2BE', ink: '#45283A', sub: '#76506A', sun: '#D9487A', sat: '#2E8A66', glow: 'rgba(234,106,154,0.30)', on: '#FFFFFF',
      pal: [[[255, 222, 232], [255, 206, 222]], [[214, 244, 230], [200, 238, 222]], [[255, 240, 232], [255, 226, 226]], [[255, 214, 228], [252, 224, 238]], [[230, 246, 222], [214, 240, 230]]]
    },
    cotton: {
      name: '코튼 캔디', base: '#F5F3FC', b: ['#FFD0E4', '#C9E4FF', '#FFE3F0', '#D6E8FF'],
      a1: '#E46FA4', a2: '#7FA6EE', ink: '#2E2C4A', sub: '#5A5878', sun: '#D6457A', sat: '#4A6BD6', glow: 'rgba(200,120,200,0.30)', on: '#FFFFFF',
      pal: [[[255, 224, 238], [226, 232, 255]], [[214, 234, 255], [236, 226, 255]], [[255, 236, 244], [255, 222, 236]], [[222, 240, 255], [212, 230, 255]], [[244, 228, 255], [255, 228, 240]]]
    },
    aurora: {
      // 디자인 스킨 · 오로라 글래스: 원래 오로라 글래스 색 그대로 + 오로라 띠·반짝이 별, 오로라 말랑이
      name: '오로라 글래스', deco: 'aurora', glassSeason: true, bunny: 'bunny-3d-aurora.png', logo: 'logo-3d-aurora.png', base: '#EFF1FC', b: ['#C9CCFF', '#BFEDE6', '#F6D3EA', '#C7E3F7'],
      a1: '#5A63E8', a2: '#2E9BC9', ink: '#1B2440', sub: '#4A5578', sun: '#C2416A', sat: '#4C63D8', glow: 'rgba(90,99,232,0.30)', on: '#FFFFFF',
      pal: [[[208, 210, 246], [194, 204, 240]], [[196, 222, 238], [186, 212, 236]], [[220, 204, 242], [206, 198, 240]], [[200, 214, 246], [190, 204, 244]], [[214, 208, 246], [196, 222, 238]]]
    },
    blue: {
      name: '소프트 블루', base: '#E7ECF4', b: ['#C7D9F6', '#DCE6F7', '#BCD1F2', '#E2E9F6'],
      a1: '#3566D8', a2: '#5B8DEF', ink: '#26324A', sub: '#4E5A72', sun: '#C2416A', sat: '#3566D8', glow: 'rgba(60,110,230,0.32)', on: '#FFFFFF',
      pal: [[[232, 240, 252], [212, 226, 250]], [[240, 244, 252], [224, 232, 246]], [[214, 232, 255], [196, 216, 250]], [[236, 240, 248], [220, 226, 242]], [[212, 226, 250], [226, 220, 252]]]
    },
    sky: {
      // 디자인 스킨 · 스카이 블루(세일러): 하늘빛 유리 + 구름·물결, 배 타는 세일러 말랑이
      name: '스카이 블루', deco: 'sky', glassSeason: true, solidAccent: true, panelRGB: '238, 247, 255', bunny: 'bunny-3d-sky.png', logo: 'logo-3d-sky.png',
      base: '#EEF7FE', b: ['#CFE7FA', '#E0F0FC', '#D6EEF6', '#E8F4FD'],
      a1: '#4A9BE8', a2: '#9CCBF5', ink: '#1F3448', sub: '#5A7088', sun: '#E0607E', sat: '#4A9BE8', glow: 'rgba(74,155,232,0.28)', on: '#FFFFFF',
      pal: [[[232, 244, 255], [218, 236, 252]], [[236, 248, 252], [222, 240, 248]], [[240, 246, 255], [226, 236, 252]], [[230, 246, 250], [216, 238, 246]], [[244, 248, 255], [230, 240, 252]]]
    },
    forest: {
      // 디자인 스킨 · 숲속 유리: 짙은 숲색 유리 목록바 + 밝은 카드, 나뭇잎 말랑이
      name: '포레스트 그린', deco: 'forest', glassSeason: true, solidAccent: true, panelRGB: '241, 238, 230', bunny: 'bunny-3d-forest.png', logo: 'logo-3d-forest.png',
      base: '#EEF5F0', b: ['#CFE8D8', '#DCEFE2', '#E6F3E8', '#D2E9DC'],
      a1: '#2F8F67', a2: '#8FCF9F', ink: '#1C3A30', sub: '#5A7568', sun: '#C8466E', sat: '#2F7FB8', glow: 'rgba(47,143,103,0.24)', on: '#FFFFFF',
      pal: [[[236, 247, 239], [226, 242, 231]], [[230, 244, 238], [220, 238, 230]], [[242, 248, 234], [232, 243, 224]], [[232, 242, 246], [222, 238, 236]], [[246, 248, 236], [236, 244, 230]]]
    },
    honey: {
      // 디자인 스킨 · 선샤인 레몬: 레몬빛 유리 + 탄산 방울, 레몬 조각·데이지, 레몬 말랑이
      name: '선샤인 레몬', deco: 'lemon', glassSeason: true, solidAccent: true, panelRGB: '255, 251, 230', bunny: 'bunny-3d-lemon.png', logo: 'logo-3d-lemon.png',
      base: '#FFFBEA', b: ['#FFF1A8', '#FFF6C8', '#EAF6C8', '#FFF0B8'],
      a1: '#E9B10C', a2: '#FFE27A', ink: '#3E3518', sub: '#7A6E48', sun: '#E0605A', sat: '#3E8EC8', glow: 'rgba(242,194,27,0.30)', on: '#3E3410',
      pal: [[[255, 249, 214], [255, 242, 190]], [[250, 252, 220], [242, 248, 204]], [[255, 246, 222], [255, 236, 200]], [[246, 252, 232], [236, 246, 214]], [[255, 251, 230], [252, 244, 208]]]
    },
    // paper: 투명하지 않은 종이·달력 느낌 (메모는 흰 종이 + 색 머리띠)
    office: {
      name: '페이퍼 블루', paper: true, base: '#E3EBF6', b: ['#DCE6F4', '#E7EEF8', '#D3E0F2', '#EEF3FA'],
      a1: '#1F56D6', a2: '#3F80EC', ink: '#1C2A44', sub: '#56647F', sun: '#D2445E', sat: '#1F56D6', glow: 'rgba(31,86,214,0.22)', on: '#FFFFFF',
      pal: [[[222, 233, 251], [222, 233, 251]], [[228, 236, 246], [228, 236, 246]], [[218, 238, 250], [218, 238, 250]], [[232, 229, 250], [232, 229, 250]], [[222, 242, 235], [222, 242, 235]]]
    },
    sage: {
      name: '페이퍼 그린', paper: true, base: '#E2EDE6', b: ['#D6E7DC', '#E6F0EA', '#CDE2D4', '#EEF5F0'],
      a1: '#2E7D56', a2: '#4FA67A', ink: '#1E3228', sub: '#556B5F', sun: '#D0465C', sat: '#2E7D56', glow: 'rgba(46,125,86,0.22)', on: '#FFFFFF',
      pal: [[[216, 237, 224], [216, 237, 224]], [[220, 240, 236], [220, 240, 236]], [[241, 239, 224], [241, 239, 224]], [[225, 234, 241], [225, 234, 241]], [[246, 231, 223], [246, 231, 223]]]
    },
    berry: {
      name: '페이퍼 핑크', paper: true, base: '#FBE7EE', b: ['#F9D3DF', '#FDE6ED', '#D3EFE4', '#F7DCE5'],
      a1: '#E0708F', a2: '#E98FA8', ink: '#4A2A36', sub: '#8A6070', sun: '#E0708F', sat: '#2F9C7B', glow: 'rgba(224,112,143,0.22)', on: '#FFFFFF',
      pal: [[[253, 224, 232], [253, 224, 232]], [[214, 242, 232], [214, 242, 232]], [[237, 228, 249], [237, 228, 249]], [[234, 244, 212], [234, 244, 212]], [[216, 237, 249], [216, 237, 249]]]
    },
    // draw: 손그림 말랑이 + 검은 펜 + 아이보리 종이 (흑백)
    draw: {
      name: '말랑 드로잉', paper: true, draw: true, bunny: 'bunny-draw.svg', logo: 'logo-draw.svg', base: '#EFEFEC', b: ['#E9E9E5', '#F3F3F0', '#E3E3DE', '#F7F7F3'],
      a1: '#161616', a2: '#3A3A38', ink: '#161616', sub: '#6E6E66', sun: '#161616', sat: '#161616', glow: 'rgba(0,0,0,0.16)', on: '#FBFAF5',
      pal: [[[251, 250, 245], [251, 250, 245]], [[251, 250, 245], [251, 250, 245]], [[251, 250, 245], [251, 250, 245]], [[251, 250, 245], [251, 250, 245]], [[251, 250, 245], [251, 250, 245]]]
    },
    // 계절 스킨 (드로잉 스킨에 옷 입히기) — SEASONS_ON 이 true 일 때만 목록에 보임
    halloween: {
      name: '드로잉 할로윈', paper: true, draw: true, season: 'halloween', bunny: 'bunny-halloween.png', logo: 'logo-halloween.png', paperBg: '#FFF7EC', base: '#2B2238', b: ['#3A2E4C', '#2B2238', '#463858', '#2B2238'],
      a1: '#1E1630', a2: '#3A2E4C', ink: '#1E1630', sub: '#7A6E86', sun: '#1E1630', sat: '#1E1630', glow: 'rgba(0,0,0,0.18)', on: '#FFF7EC',
      pal: [[[255, 247, 236], [255, 247, 236]], [[255, 247, 236], [255, 247, 236]], [[255, 247, 236], [255, 247, 236]], [[255, 247, 236], [255, 247, 236]], [[255, 247, 236], [255, 247, 236]]]
    },
    xmas: {
      name: '드로잉 크리스마스', paper: true, draw: true, season: 'xmas', bunny: 'bunny-xmas.png', logo: 'logo-xmas.png', paperBg: '#FFFDF6', base: '#1F4A35', b: ['#2A5A42', '#1F4A35', '#346A4E', '#1F4A35'],
      a1: '#1C2B22', a2: '#2F4A3A', ink: '#1C2B22', sub: '#6E7C72', sun: '#1C2B22', sat: '#1C2B22', glow: 'rgba(0,0,0,0.18)', on: '#FFFDF6',
      pal: [[[255, 253, 246], [255, 253, 246]], [[255, 253, 246], [255, 253, 246]], [[255, 253, 246], [255, 253, 246]], [[255, 253, 246], [255, 253, 246]], [[255, 253, 246], [255, 253, 246]]]
    },
    // 기본 말랑이(유리) 계절 스킨 — 차분한 색, 그라데이션 대신 한 가지 포인트 색
    ghalloween: {
      name: '말랑 할로윈', season: 'halloween', glassSeason: true, solidAccent: true, panelRGB: '42, 35, 56', bunny: 'bunny-3d-halloween.png', logo: 'logo-3d-halloween.png',
      base: '#EDE7F0', b: ['#E9D9C8', '#DCD5E8', '#EFE6D6', '#D8CFE6'],
      a1: '#D9772F', a2: '#6F5F92', ink: '#2F2836', sub: '#77707E', sun: '#D9772F', sat: '#6F5F92', glow: 'rgba(217,119,47,0.26)', on: '#FFFFFF',
      pal: [[[250, 226, 204], [243, 212, 186]], [[226, 220, 236], [212, 204, 228]], [[240, 232, 218], [230, 220, 202]], [[244, 218, 204], [236, 204, 190]], [[222, 224, 236], [208, 212, 230]]]
    },
    gxmas: {
      name: '말랑 크리스마스', season: 'xmas', glassSeason: true, solidAccent: true, panelRGB: '32, 56, 46', bunny: 'bunny-3d-xmas.png', logo: 'logo-3d-xmas.png',
      base: '#EEF2EE', b: ['#EED6D4', '#D6E6DA', '#F2ECDE', '#DCE8E0'],
      a1: '#B8434A', a2: '#5E8A6E', ink: '#2A302C', sub: '#6E7770', sun: '#B8434A', sat: '#5E8A6E', glow: 'rgba(184,67,74,0.24)', on: '#FFFFFF',
      pal: [[[246, 218, 216], [238, 204, 202]], [[218, 232, 220], [204, 222, 208]], [[246, 240, 226], [236, 228, 210]], [[240, 226, 214], [232, 212, 200]], [[224, 234, 236], [210, 226, 228]]]
    },
    midnight: {
      name: '미드나잇', dark: true, base: '#16181D', b: ['#2A3A64', '#1E3442', '#3A2C52', '#1C3448'],
      a1: '#4C8DFF', a2: '#6FB3FF', ink: '#E9ECF1', sub: '#AEB6C4', sun: '#FF8FA8', sat: '#7FBDFF', glow: 'rgba(76,141,255,0.30)', on: '#FFFFFF',
      pal: [[[62, 68, 84], [52, 58, 76]], [[46, 70, 74], [42, 60, 78]], [[74, 56, 78], [62, 52, 80]], [[48, 62, 92], [44, 56, 84]], [[72, 64, 54], [60, 56, 68]]]
    }
  };

  const FONTS = [
    { id: 'gowun', name: '고운돋움', fam: "'Gowun Dodum', sans-serif", size: 14 },
    { id: 'plex', name: 'IBM Plex Sans KR · 단정한 고딕', fam: "'IBM Plex Sans KR', sans-serif", size: 14 },
    { id: 'notosans', name: 'Noto Sans KR · 깔끔한 고딕', fam: "'Noto Sans KR', sans-serif", size: 14 },
    { id: 'nanumgothic', name: '나눔고딕', fam: "'Nanum Gothic', sans-serif", size: 14 },
    { id: 'sunflower', name: '해바라기 · 또렷한 고딕', fam: "'Sunflower', sans-serif", size: 14 },
    { id: 'dohyeon', name: '도현 · 굵은 제목체', fam: "'Do Hyeon', sans-serif", size: 15 },
    { id: 'serif', name: 'Noto Serif KR · 명조', fam: "'Noto Serif KR', serif", size: 14 },
    { id: 'nanummyeongjo', name: '나눔명조', fam: "'Nanum Myeongjo', serif", size: 14 },
    { id: 'gowunbatang', name: '고운바탕 · 부드러운 명조', fam: "'Gowun Batang', serif", size: 14 },
    { id: 'jua', name: '주아 · 동글동글', fam: "'Jua', sans-serif", size: 15 },
    { id: 'dongle', name: '동글 · 통통한 글씨', fam: "'Dongle', sans-serif", size: 22 },
    { id: 'singleday', name: '싱글데이 · 귀여운 글씨', fam: "'Single Day', cursive", size: 15 },
    { id: 'gaegu', name: '개구 · 손글씨', fam: "'Gaegu', cursive", size: 17 },
    { id: 'gamja', name: '감자꽃 · 손글씨', fam: "'Gamja Flower', cursive", size: 17 },
    { id: 'himelody', name: '하이멜로디 · 손글씨', fam: "'Hi Melody', cursive", size: 17 },
    { id: 'poorstory', name: '푸어스토리 · 손글씨', fam: "'Poor Story', cursive", size: 16 },
    { id: 'pen', name: '나눔손글씨 펜', fam: "'Nanum Pen Script', cursive", size: 20 },
    { id: 'poppins', name: 'Poppins · 영문·숫자 (한글은 고운돋움)', fam: "'Poppins', 'Gowun Dodum', sans-serif", size: 14 }
  ];

  const MARKS = {
    heart: 'M12 20.5s-7.6-4.6-9.7-9.2C.8 8 2.9 4.5 6.5 4.5c2.1 0 3.7 1.2 5.5 3.3 1.8-2.1 3.4-3.3 5.5-3.3 3.6 0 5.7 3.5 4.2 6.8-2.1 4.6-9.7 9.2-9.7 9.2z',
    star: 'M12 2.6l2.9 6 6.5.8-4.8 4.5 1.2 6.5L12 17.2l-5.8 3.2 1.2-6.5-4.8-4.5 6.5-.8z',
    flag: 'M5 3h1.8v18H5zM8 4h11l-2.6 4.2L19 12.4H8z',
    alert: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.1 5h2.2v7h-2.2zm0 8.6h2.2v2.2h-2.2z',
    check: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.3 14.3L6.4 12l1.5-1.5 2.8 2.8 5.5-5.5 1.5 1.5z'
  };
  // 기호마다 실제 그림 크기가 달라서, 같은 크기로 보이도록 각자 화면 틀을 맞춤
  const MARK_VB = {
    heart: '0.6 1 22.8 22.8',
    star: '2.3 1.8 19.4 19.4',
    flag: '2.6 2.6 18.8 18.8',
    alert: '1.6 1.6 20.8 20.8',
    check: '1.6 1.6 20.8 20.8'
  };
  // 캘린더 글꼴 고르기 목록
  function calFontOptions(settings) {
    const f = FONTS.find((x) => x.id === settings.font) || FONTS[0];
    return [{ id: 'same', name: '메모 글꼴과 같게 (지금: ' + f.name.split(' · ')[0] + ')' }, { id: 'poppins', name: 'Poppins 숫자·영문 + 메모 글꼴 한글' }]
      .concat(FONTS.filter((x) => x.id !== 'poppins').map((x) => ({ id: x.id, name: x.name })));
  }

  const MARK_NAMES = { heart: '하트', star: '별', flag: '깃발', alert: '느낌표', check: '체크' };
  const MARK_COLORS = [
    { hex: '#E8456B', name: '빨강' }, { hex: '#F5A524', name: '주황' }, { hex: '#2FA57C', name: '초록' },
    { hex: '#3A7FD4', name: '파랑' }, { hex: '#8E6FE6', name: '보라' }, { hex: '#3E3A4A', name: '먹색' }
  ];
  // 그룹 색 (그룹마다 하나씩)
  const GROUP_COLORS = ['#E8456B', '#F08C2E', '#2FA57C', '#3A7FD4', '#8E6FE6', '#C9A400'];
  const EVENT_COLORS = { lav: '#7466E4', mint: '#2A9D74', pink: '#D4508A', sky: '#3A7FD4' };

  const rgba = (c, a) => 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')';
  const grad = (skin, slot, a) => {
    const p = skin.pal[((slot % 5) + 5) % 5];
    if (skin.paper) a = 1;                       // 종이 스킨은 투명하지 않게
    return 'linear-gradient(155deg, ' + rgba(p[0], a) + ', ' + rgba(p[1], a) + ')';
  };
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = (n) => (n < 10 ? '0' + n : '' + n);
  const dateKey = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());

  // 스킨·글꼴을 CSS 변수로 적용
  function applyTheme(settings) {
    const sk = SKINS[settings.skin] || SKINS.lav;
    const f = FONTS.find((x) => x.id === settings.font) || FONTS[0];
    const r = document.documentElement.style;
    r.setProperty('--ink', sk.ink);
    r.setProperty('--sub', sk.sub);
    r.setProperty('--a1', sk.a1);
    r.setProperty('--a2', sk.a2);
    r.setProperty('--glow', sk.glow);
    r.setProperty('--accent', sk.solidAccent ? sk.a1 : 'linear-gradient(135deg, ' + sk.a1 + ', ' + sk.a2 + ')');
    r.setProperty('--on', sk.on || '#FFFFFF');
    r.setProperty('--glass', sk.dark ? '46, 51, 62' : '255, 255, 255');
    r.setProperty('--line-soft', sk.dark ? 'rgba(255,255,255,.12)' : 'rgba(80,80,140,.18)');
    document.documentElement.classList.toggle('dark', !!sk.dark);
    document.documentElement.classList.toggle('paper', !!sk.paper);
    document.documentElement.classList.toggle('draw', !!sk.draw);
    // 메모 모서리: 꾸미기에서 정하면 모든 스킨 위에 덮어씀 (안 정하면 스킨 기본)
    // 0% = 각진 사각형, 100% = 지금 스킨 그대로
    const mp = typeof settings.memoRound === 'number' ? settings.memoRound : 100;
    document.documentElement.classList.toggle('customR', mp !== 100);
    if (mp !== 100) {
      const base = sk.draw ? 14 : sk.paper ? 12 : 22, fbase = sk.draw ? 11 : sk.paper ? 9 : 16;
      r.setProperty('--memo-r', Math.round(base * mp) / 100 + 'px');
      r.setProperty('--memo-rf', Math.round(fbase * mp) / 100 + 'px');
    }
    // 드로잉 계절 스킨: html.halloween / html.xmas · 유리(기본 말랑이) 계절 스킨: html.gseason + g-halloween / g-xmas
    document.documentElement.classList.toggle('halloween', !!sk.draw && sk.season === 'halloween');
    document.documentElement.classList.toggle('xmas', !!sk.draw && sk.season === 'xmas');
    document.documentElement.classList.toggle('gseason', !!sk.glassSeason);
    document.documentElement.classList.toggle('g-halloween', !!sk.glassSeason && sk.season === 'halloween');
    document.documentElement.classList.toggle('g-xmas', !!sk.glassSeason && sk.season === 'xmas');
    for (const d of ['forest', 'peach', 'lemon', 'sky', 'aurora']) document.documentElement.classList.toggle('g-' + d, sk.deco === d);   // 디자인 스킨 장식
    r.setProperty('--paper-bg', sk.paperBg || '#FBFAF5');
    // 드로잉 스킨에서는 말랑이도 손그림으로
    document.querySelectorAll('img[data-bun]').forEach((img) => { const want = img.dataset.draw ? (sk.logo || img.dataset.bun) : (sk.bunny || img.dataset.bun); if (img.getAttribute('src') !== want) img.setAttribute('src', want); });
    r.setProperty('--base', sk.base);
    r.setProperty('--memo-font', f.fam);
    const scale = (settings.fontScale || 100) / 100;              // 글자 크기 (모든 메모에 한 번에)
    r.setProperty('--memo-size', Math.round(f.size * scale * 10) / 10 + 'px');
    // 캘린더 글꼴: 'same' = 메모 글꼴과 같게, 'poppins' = 숫자·영문은 Poppins + 한글은 메모 글꼴, 그 밖 = 고른 글꼴
    const cf = settings.calFont || 'same';
    const cfObj = cf === 'same' ? f : (cf === 'poppins' ? null : (FONTS.find((x) => x.id === cf) || f));
    const calFam = cf === 'poppins' ? "'Poppins', " + f.fam : cfObj.fam;
    const calFactor = cf === 'poppins' ? 1 : cfObj.size / 14;          // 글자가 작게 그려지는 글꼴은 키워서 맞춤
    r.setProperty('--cal-font', calFam);
    r.setProperty('--cs', String(Math.round((settings.calScale || 100) / 100 * calFactor * 100) / 100));
    // 연락망 글꼴·크기 (캘린더처럼 따로 정함)
    const pf = settings.peopleFont || 'same';
    const pfObj = pf === 'same' ? f : (pf === 'poppins' ? null : (FONTS.find((x) => x.id === pf) || f));
    r.setProperty('--pp-font', pf === 'poppins' ? "'Poppins', " + f.fam : pfObj.fam);
    r.setProperty('--pps', String(Math.round((settings.peopleScale || 100) / 100 * (pf === 'poppins' ? 1 : pfObj.size / 14) * 100) / 100));
    // 제목도 고른 글꼴로 (작게 그려지는 글꼴은 그만큼 키움)
    const tf = f.size / 14;
    r.setProperty('--tf', String(Math.round(tf * 100) / 100));
    const ts = (settings.titleScale || 100) / 100;                 // 제목 크기 (본문과 따로)
    r.setProperty('--memo-title-size', Math.round(14 * tf * ts * 10) / 10 + 'px');
    r.setProperty('--ts', String(ts));
    r.setProperty('--fold-title-size', Math.round(13 * tf * Math.min(ts, 1.25) * 10) / 10 + 'px');   // 접힌 바는 높이가 정해져 있어 조금만
    r.setProperty('--title-weight', settings.titleBold === false ? '400' : '700');
    return { sk, f };
  }

  const ICONS = {
    plus: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    list: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 6l1.5 1.5L8 4.5M3.5 12l1.5 1.5L8 10.5M3.5 18l1.5 1.5L8 16.5M11 6h10M11 12h10M11 18h10"/></svg>',
    front: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h14M12 20V9M7 14l5-5 5 5"/></svg>',
    back: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 20h14M12 4v11M7 10l5 5 5-5"/></svg>',
    eyeOff: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A9.8 9.8 0 0 1 12 5c5 0 9 4.5 10 7a13 13 0 0 1-3 4.1M6.2 6.2C4 7.6 2.6 9.9 2 12c1 2.5 5 7 10 7 1.6 0 3-.4 4.3-1"/></svg>',
    eye: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
    trash: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/></svg>',
    starLine: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z"/></svg>',
    chev: '<svg class="chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
    check: '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l4 4 10-10"/></svg>',
    x: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    search: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    pin: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 4h6l-1 6 4 4H6l4-4zM12 14v7"/></svg>',
    left: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    right: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
    foldAll: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 4l5 5 5-5M7 20l5-5 5 5"/></svg>',
    dots: '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>',
    table: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="15" rx="3"/><path d="M3.5 10h17M3.5 15h17M10 4.5v15"/></svg>',
    phone: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/></svg>',
    folder: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2.2h7a2 2 0 0 1 2 2v7.8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/></svg>',
    folderOpen: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 17.5V7.5a2 2 0 0 1 2-2h4l2 2.2h6a2 2 0 0 1 2 2v1.3"/><path d="M3.5 17.5l2.3-6.2a1.6 1.6 0 0 1 1.5-1h13a1.2 1.2 0 0 1 1.1 1.6l-2 5.6a2 2 0 0 1-1.9 1.3H5.5a2 2 0 0 1-2-1.3z"/></svg>',
    scissors: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="6" cy="6.5" r="2.6"/><circle cx="6" cy="17.5" r="2.6"/><path d="M8.2 8l11.3 9.5M8.2 16l11.3-9.5"/></svg>',
    unfoldAll: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 9l5-5 5 5M7 15l5 5 5-5"/></svg>'
  };
  const markSvg = (mark, color, size) =>
    MARKS[mark] ? '<svg class="mark" width="' + size + '" height="' + size + '" viewBox="' + (MARK_VB[mark] || '0 0 24 24') + '" aria-hidden="true"><path d="' + MARKS[mark] + '" fill="' + esc(color) + '" fill-rule="evenodd"/></svg>' : '';

  // 목록 순서: 직접 정한 순서(ord)가 있으면 그 순서, 없으면 최근 수정한 것부터
  function memoOrder(a, b) {
    const ha = typeof a.ord === 'number', hb = typeof b.ord === 'number';
    if (ha && hb) return a.ord - b.ord || (b.mt || 0) - (a.mt || 0);
    if (ha !== hb) return ha ? 1 : -1;
    return (b.mt || 0) - (a.mt || 0);
  }

  // ───────── 메모 내용 편집 칸 ─────────
  // 내용은 지금처럼 글자로 저장하고, 구분선은 '⸻' 한 줄로 저장해서 화면에서는 얇은 선으로 보여줘요.
  const DIVIDER = '⸻';
  function lineEditor(el, onChange) {
    el.contentEditable = 'true';
    el.spellcheck = false;
    el.setAttribute('role', 'textbox');
    el.setAttribute('aria-multiline', 'true');
    const isDv = (n) => n && n.nodeType === 1 && n.classList.contains('dv');
    function lineEl(t) {
      const d = document.createElement('div');
      if (t === DIVIDER) {
        d.className = 'dv';
        d.contentEditable = 'false';
        d.setAttribute('role', 'separator');
        return d;
      }
      if (t) d.textContent = t; else d.appendChild(document.createElement('br'));
      return d;
    }
    function blockText(n) {
      let s = '';
      for (const c of n.childNodes) {
        if (c.nodeType === 3) s += c.nodeValue;
        else if (c.nodeName === 'BR') s += '\n';
        else if (isDv(c)) s += (s && !s.endsWith('\n') ? '\n' : '') + DIVIDER + '\n';
        else {
          const t = blockText(c);
          s += (s && !s.endsWith('\n') ? '\n' : '') + t;
        }
      }
      return s.replace(/\n$/, '');
    }
    function getText() {
      const out = [];
      let buf = null;
      for (const n of el.childNodes) {
        if (n.nodeType === 3) { buf = (buf || '') + n.nodeValue; continue; }
        if (n.nodeName === 'BR') { out.push(buf || ''); buf = null; continue; }
        if (buf !== null) { out.push(buf); buf = null; }
        out.push(isDv(n) ? DIVIDER : blockText(n));
      }
      if (buf !== null) out.push(buf);
      const t = out.join('\n').replace(/ /g, ' ');
      return t.trim() === '' ? '' : t;
    }
    function setText(text) {
      text = String(text || '');
      if (!text) { el.replaceChildren(); return; }
      el.replaceChildren(...text.split('\n').map(lineEl));
    }
    function caretTo(node, atEnd) {
      const r = document.createRange();
      r.selectNodeContents(node);
      r.collapse(!atEnd);
      const sel = getSelection();
      sel.removeAllRanges();
      sel.addRange(r);
    }
    function focusEnd() {
      el.focus();
      const last = el.lastChild;
      if (last) caretTo(isDv(last) ? el : last, true);
    }
    function insertDivider() {
      el.focus();
      const sel = getSelection();
      let node = sel.rangeCount ? sel.getRangeAt(0).startContainer : null;
      if (!node || !el.contains(node)) node = null;
      while (node && node.parentNode !== el) node = node.parentNode;
      if (node && node.nodeType === 3) {          // 맨 앞 줄이 감싸지지 않은 글자면 줄로 감싸기
        const d = document.createElement('div');
        node.replaceWith(d);
        d.appendChild(node);
        node = d;
      }
      const dv = lineEl(DIVIDER), nl = lineEl('');
      if (!node || node === el) el.append(dv, nl);
      else if (!isDv(node) && (node.textContent || '') === '') { node.replaceWith(dv); dv.after(nl); }
      else { node.after(dv); dv.after(nl); }
      caretTo(nl, false);
      onChange();
    }
    el.addEventListener('input', () => { if (getText() === '' && el.childNodes.length && !el.querySelector('.dv')) el.replaceChildren(); onChange(); });
    el.addEventListener('paste', (e) => {
      e.preventDefault();
      const t = (e.clipboardData && e.clipboardData.getData('text/plain')) || '';
      document.execCommand('insertText', false, t);
    });
    el.addEventListener('drop', (e) => e.preventDefault());
    el.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !e.isComposing) { e.preventDefault(); insertDivider(); }
    });
    return { getText, setText, insertDivider, focusEnd };
  }
  // 목록 미리보기 등에서 구분선을 선으로 바꿔 보여주기
  function previewHTML(text) {
    return String(text || '').split('\n').map((l) => (l === DIVIDER ? '<span class="dvp" aria-hidden="true"></span>' : esc(l))).join('\n');
  }
  const stripDividers = (text) => String(text || '').split('\n').filter((l) => l !== DIVIDER).join('\n');

  // ───────── 표 ─────────
  // 표 데이터: { rows: [[머리글...], [칸...], ...] }  (첫 줄은 머리글)
  const TBL = { maxR: 500, maxC: 12, maxCell: 1000 };
  const CONTACT_HEAD = ['부서', '이름', '내선'];
  // 예전 기본 머리글(직급·휴대폰 포함)이면 두 칸을 빼기
  function fixContactRows(rows) {
    if (!rows || !rows[0]) return null;
    let out = rows, changed = false;
    if (out[0].join('|') === '부서|이름|직급|내선|휴대폰|이메일') { out = out.map((r) => r.filter((c, i) => i !== 2 && i !== 4)); changed = true; }
    if (out[0].join('|') === '부서|이름|내선|이메일' && out.slice(1).every((r) => !String(r[3] || '').trim())) { out = out.map((r) => r.slice(0, 3)); changed = true; }
    return changed ? out : null;
  }
  function cleanTable(t, fallbackHead) {
    let rows = t && Array.isArray(t.rows) ? t.rows : null;
    if (!rows || !rows.length) {
      const h = fallbackHead || ['', '', ''];
      rows = [h.slice(), h.map(() => ''), h.map(() => '')];
    }
    rows = rows.slice(0, TBL.maxR).map((r) => (Array.isArray(r) ? r : []).slice(0, TBL.maxC).map((c) => String(c == null ? '' : c).slice(0, TBL.maxCell)));
    const n = Math.max(1, ...rows.map((r) => r.length));
    rows = rows.map((r) => (r.length < n ? r.concat(Array(n - r.length).fill('')) : r));
    if (rows.length < 2) rows.push(Array(n).fill(''));
    return { rows };
  }
  // 예전 버전·목록 미리보기용 글자
  const tableToText = (rows) => (rows || []).filter((r) => r.some((c) => c.trim())).map((r) => r.map((c) => c.replace(/\s*\n\s*/g, ' ')).join(' | ')).join('\n');
  function textToTable(text) {
    const lines = stripDividers(text).split('\n').filter((l) => l.trim());
    if (!lines.length) return cleanTable(null);
    const sep = lines.some((l) => l.includes('\t')) ? '\t' : lines.some((l) => l.includes(' | ')) ? ' | ' : null;
    let rows = lines.map((l) => (sep ? l.split(sep) : [l]).map((c) => c.trim()));
    if (!sep) rows = [['내용']].concat(rows);
    return cleanTable({ rows });
  }
  // 엑셀에서 복사한 글자(탭 구분, 따옴표 안 줄바꿈 포함) → 칸 배열
  function parseTSV(s) {
    s = String(s || '').replace(/\r\n?/g, '\n');
    if (s.endsWith('\n')) s = s.slice(0, -1);
    const rows = []; let row = [], cell = '', q = false;
    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (q) {
        if (ch === '"' && s[i + 1] === '"') { cell += '"'; i++; }
        else if (ch === '"') q = false;
        else cell += ch;
      } else if (ch === '"' && cell === '') q = true;
      else if (ch === '\t') { row.push(cell); cell = ''; }
      else if (ch === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
      else cell += ch;
    }
    row.push(cell); rows.push(row);
    return rows;
  }
  const toTSV = (rows) => rows.map((r) => r.map((c) => (/[\t\n"]/.test(c) ? '"' + c.replace(/"/g, '""') + '"' : c)).join('\t')).join('\n');
  const digits = (s) => String(s).replace(/[^0-9]/g, '');
  function rowMatches(r, q) {
    if (!q) return true;
    const ql = q.toLowerCase(), qd = digits(q);
    return r.some((c) => c.toLowerCase().includes(ql) || (qd.length >= 2 && qd.length === q.replace(/[\s-]/g, '').length && digits(c).includes(qd)));
  }

  /* 표 편집기
     wrap 안에 표와 아래쪽 버튼(+줄, +칸, 지우기, 복사)을 만들어요.
     opts.onChange(rows) 바뀔 때마다 · opts.copy(text) 복사 · opts.head 기본 머리글 · opts.callable 보기 모드에서 번호·메일 누르면 연결 · opts.editable false 면 보기 모드로 시작 */
  function tableEditor(wrap, opts) {
    opts = opts || {};
    let rows = cleanTable(null, opts.head).rows;
    let cur = null, query = '', canEdit = opts.editable !== false;
    wrap.classList.add('tblWrap');
    wrap.innerHTML =
      '<div class="tblScroll"><table class="mtbl"><thead></thead><tbody></tbody></table></div>' +
      '<div class="tblBar" role="toolbar" aria-label="표 도구">' +
        '<button type="button" class="tb" data-op="row" title="아래에 줄 추가">+ 줄</button>' +
        '<button type="button" class="tb" data-op="col" title="오른쪽에 칸 추가">+ 칸</button>' +
        '<button type="button" class="tb" data-op="delrow" title="고른 줄 지우기">줄 지우기</button>' +
        '<button type="button" class="tb" data-op="delcol" title="고른 칸 지우기">칸 지우기</button>' +
        '<span class="tbGap"></span>' +
        '<button type="button" class="tb" data-op="copy" title="표 전체 복사 (엑셀에 붙여넣기 가능)">복사</button>' +
      '</div>';
    const table = wrap.querySelector('table'), thead = table.tHead, tbody = table.tBodies[0], bar = wrap.querySelector('.tblBar');
    const editable = (() => { const d = document.createElement('div'); d.contentEditable = 'plaintext-only'; return d.contentEditable === 'plaintext-only' ? 'plaintext-only' : 'true'; })();
    const isPhone = (v) => /^\+?[0-9][0-9\s-]{6,}$/.test(v.trim()) && digits(v).length >= 8;
    const isMail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
    function cellInner(v, r) {
      // 보기 모드(휴대폰 연락망): 번호는 눌러서 전화, 메일은 눌러서 메일
      if (!canEdit && opts.callable && r > 0) {
        if (isPhone(v)) return '<a class="tel" href="tel:' + digits(v) + '">' + ICONS.phone + esc(v) + '</a>';
        if (isMail(v)) return '<a class="tel" href="mailto:' + esc(v.trim()) + '">' + esc(v) + '</a>';
      }
      return esc(v);
    }
    const cellHTML = (tag, v, r, c) => '<' + tag + (canEdit ? ' contenteditable="' + editable + '"' : '') + ' spellcheck="false" data-r="' + r + '" data-c="' + c + '"' +
      (r === 0 && canEdit ? ' data-ph="머리글"' : '') + '>' + cellInner(v, r) + '</' + tag + '>';
    function cellText(td) {
      let t = td.innerText.replace(/ /g, ' ');
      if (t.endsWith('\n')) t = t.slice(0, -1);
      return t === '\n' ? '' : t;
    }
    function render(focus) {
      thead.innerHTML = '<tr>' + rows[0].map((v, c) => cellHTML('th', v, 0, c)).join('') + '</tr>';
      tbody.innerHTML = rows.slice(1).map((r, i) => '<tr data-r="' + (i + 1) + '">' + r.map((v, c) => cellHTML('td', v, i + 1, c)).join('') + '</tr>').join('');
      applyFilter();
      if (focus) focusCell(focus.r, focus.c, focus.end !== false);
      syncBar();
    }
    function cellAt(r, c) { return table.querySelector('[data-r="' + r + '"][data-c="' + c + '"]'); }
    function focusCell(r, c, atEnd) {
      const el = cellAt(r, c);
      if (!el) return;
      el.focus();
      const rg = document.createRange(); rg.selectNodeContents(el); rg.collapse(!atEnd);
      const sel = getSelection(); sel.removeAllRanges(); sel.addRange(rg);
      el.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
    function changed() { opts.onChange && opts.onChange(rows.map((r) => r.slice())); }
    function syncBar() {
      const has = !!cur;
      bar.querySelector('[data-op="delrow"]').disabled = !has || cur.r === 0 || rows.length <= 2;
      bar.querySelector('[data-op="delcol"]').disabled = !has || rows[0].length <= 1;
      bar.querySelector('[data-op="row"]').disabled = rows.length >= TBL.maxR;
      bar.querySelector('[data-op="col"]').disabled = rows[0].length >= TBL.maxC;
      table.querySelectorAll('.cur').forEach((x) => x.classList.remove('cur'));
      if (has) { const el = cellAt(cur.r, cur.c); if (el) el.classList.add('cur'); }
    }
    function addRow(after) {
      if (rows.length >= TBL.maxR) return false;
      const at = after == null ? rows.length : Math.max(1, after + 1);
      rows.splice(at, 0, Array(rows[0].length).fill(''));
      return at;
    }
    function applyFilter() {
      let shown = 0;
      for (const tr of tbody.rows) {
        const ok = rowMatches(rows[Number(tr.dataset.r)] || [], query);
        tr.hidden = !ok;
        if (ok) shown++;
      }
      wrap.classList.toggle('noMatch', !!query && !shown);
      return shown;
    }
    table.addEventListener('focusin', (e) => {
      const el = e.target.closest('[data-r]');
      if (!el || el.dataset.c == null) return;
      cur = { r: Number(el.dataset.r), c: Number(el.dataset.c) };
      syncBar();
    });
    table.addEventListener('input', (e) => {
      const el = e.target.closest('[data-c]');
      if (!el) return;
      rows[Number(el.dataset.r)][Number(el.dataset.c)] = cellText(el).slice(0, TBL.maxCell);
      changed();
    });
    table.addEventListener('keydown', (e) => {
      const el = e.target.closest('[data-c]');
      if (!el || e.isComposing || e.keyCode === 229) return;
      const r = Number(el.dataset.r), c = Number(el.dataset.c), C = rows[0].length;
      const visible = (rr) => rr === 0 || !(tbody.rows[rr - 1] && tbody.rows[rr - 1].hidden);
      const nextRow = (rr, d) => { let x = rr + d; while (x > 0 && x < rows.length && !visible(x)) x += d; return x; };
      if (e.key === 'Tab') {
        e.preventDefault();
        let nr = r, nc = c + (e.shiftKey ? -1 : 1);
        if (nc >= C) { nc = 0; nr = nextRow(r, 1); }
        if (nc < 0) { nc = C - 1; nr = nextRow(r, -1); }
        if (nr < 0) return;
        if (nr >= rows.length) { if (addRow() === false) return; render({ r: rows.length - 1, c: 0 }); changed(); return; }
        focusCell(nr, nc, true);
      } else if (e.key === 'Enter' && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        const nr = nextRow(r, 1);
        if (nr >= rows.length || (e.ctrlKey || e.metaKey)) {
          const at = addRow((e.ctrlKey || e.metaKey) ? r : null);
          if (at === false) return;
          render({ r: at, c }); changed(); return;
        }
        focusCell(nr, c, true);
      } else if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && !e.shiftKey && !cellText(el).includes('\n')) {
        const nr = nextRow(r, e.key === 'ArrowUp' ? -1 : 1);
        if (nr >= 0 && nr < rows.length) { e.preventDefault(); focusCell(nr, c, true); }
      } else if (e.key === 'Escape') {
        el.blur(); cur = null; syncBar();
      }
    });
    table.addEventListener('paste', (e) => {
      const el = e.target.closest('[data-c]');
      if (!el) return;
      e.preventDefault();
      const t = (e.clipboardData && e.clipboardData.getData('text/plain')) || '';
      if (!/[\t\n]/.test(t.replace(/\n$/, ''))) { document.execCommand('insertText', false, t.replace(/\n$/, '')); return; }
      // 여러 칸 붙여넣기: 고른 칸부터 채우고 모자라면 줄·칸을 늘려요
      const grid = parseTSV(t);
      const r0 = Number(el.dataset.r), c0 = Number(el.dataset.c);
      const needC = Math.min(TBL.maxC, c0 + Math.max(...grid.map((g) => g.length)));
      while (rows[0].length < needC) rows.forEach((row) => row.push(''));
      grid.forEach((g, i) => {
        const rr = r0 + i;
        if (rr >= TBL.maxR) return;
        while (rows.length <= rr) rows.push(Array(rows[0].length).fill(''));
        g.forEach((v, j) => { if (c0 + j < rows[0].length) rows[rr][c0 + j] = v.slice(0, TBL.maxCell); });
      });
      render({ r: Math.min(rows.length - 1, r0 + grid.length - 1), c: c0 });
      changed();
    });
    table.addEventListener('drop', (e) => e.preventDefault());
    // 버튼을 눌러도 칸 선택이 풀리지 않게
    bar.addEventListener('pointerdown', (e) => { if (e.target.closest('button')) e.preventDefault(); });
    bar.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b || b.disabled) return;
      const op = b.dataset.op;
      const c = cur ? cur.c : rows[0].length - 1;
      if (op === 'row') {
        const at = addRow(cur ? cur.r : null);
        if (at === false) return;
        render({ r: at, c: cur ? cur.c : 0 });
      } else if (op === 'col') {
        if (rows[0].length >= TBL.maxC) return;
        rows.forEach((row) => row.splice(c + 1, 0, ''));
        render({ r: 0, c: c + 1 });
      } else if (op === 'delrow') {
        if (!cur || cur.r === 0 || rows.length <= 2) return;
        rows.splice(cur.r, 1);
        render({ r: Math.min(cur.r, rows.length - 1), c: cur.c });
      } else if (op === 'delcol') {
        if (!cur || rows[0].length <= 1) return;
        rows.forEach((row) => row.splice(cur.c, 1));
        render({ r: cur.r, c: Math.min(cur.c, rows[0].length - 1) });
      } else if (op === 'copy') {
        const out = toTSV(rows.filter((r, i) => i === 0 || (r.some((x) => x.trim()) && rowMatches(r, query))));
        Promise.resolve(opts.copy ? opts.copy(out) : navigator.clipboard.writeText(out)).then(() => {
          b.textContent = '복사했어요'; b.classList.add('done');
          setTimeout(() => { b.textContent = '복사'; b.classList.remove('done'); }, 1300);
        }).catch(() => {});
        return;
      }
      changed();
    });
    wrap.addEventListener('focusout', () => setTimeout(() => {
      if (!wrap.contains(document.activeElement)) { cur = null; syncBar(); }
    }, 0));
    function setRows(next) {
      const clean = cleanTable({ rows: next }, opts.head).rows;
      if (JSON.stringify(clean) === JSON.stringify(rows)) return;
      const a = document.activeElement;
      const editing = a && table.contains(a) && a.dataset.c != null;
      if (editing && clean.length === rows.length && clean[0].length === rows[0].length) {
        // 쓰고 있는 칸은 그대로 두고 나머지만 바꾸기
        const ar = Number(a.dataset.r), ac = Number(a.dataset.c);
        clean.forEach((row, r) => row.forEach((v, c) => {
          if (r === ar && c === ac) { clean[r][c] = rows[r][c]; return; }
          if (rows[r][c] !== v) { const el = cellAt(r, c); if (el) el.innerHTML = cellInner(v, r); }
        }));
        rows = clean;
        applyFilter();
        return;
      }
      rows = clean;
      render(editing && cur ? { r: Math.min(cur.r, rows.length - 1), c: Math.min(cur.c, rows[0].length - 1) } : null);
    }
    function setEditable(v) {
      canEdit = !!v;
      wrap.classList.toggle('ro', !canEdit);
      cur = null;
      render();
    }
    wrap.classList.toggle('ro', !canEdit);
    render();
    return {
      setRows, setEditable,
      getRows: () => rows.map((r) => r.slice()),
      filter(q) { query = String(q || '').trim(); return applyFilter(); },
      focusFirst() { focusCell(rows.length > 1 && !rows[1].some((x) => x) ? 1 : 0, 0, true); },
      isEditing: () => table.contains(document.activeElement)
    };
  }

  /* 연락망 보기 (부서별로 묶어서 이름·내선을 촘촘하게)
     el 안에 그려요. opts.onPick(값, 줄, 요소) 누를 때 · opts.store 접어 둔 부서 기억용 키 */
  const deptIcon = () => '<img src="' + (document.documentElement.classList.contains('draw') ? 'bunny-draw.svg' : 'bunny.png') + '" alt="" width="18" height="18" draggable="false">';
  function contactView(el, opts) {
    opts = opts || {};
    let rows = null, query = '';
    let closed = {};
    try { closed = JSON.parse(localStorage.getItem(opts.store || 'mallang.gv.closed') || '{}') || {}; } catch (e) { closed = {}; }
    const saveClosed = () => { try { localStorage.setItem(opts.store || 'mallang.gv.closed', JSON.stringify(closed)); } catch (e) { /* 무시 */ } };
    el.classList.add('gv');
    const findCol = (head, re, dflt) => { const i = head.findIndex((h) => re.test(h)); return i >= 0 ? i : dflt; };
    const isMain = (name) => /^(대표|대표번호|팀\s*대표)$/.test(String(name).trim());
    function render() {
      if (!rows) return;
      const head = rows[0] || [];
      const D = findCol(head, /부서|팀|소속/, 0);
      const N = findCol(head, /이름|성명|담당/, D === 0 ? 1 : 0);
      const X = findCol(head, /내선|전화|번호|연락/, head.length > 2 ? 2 : head.length - 1);
      const extra = head.map((h, i) => i).filter((i) => i !== D && i !== N && i !== X);
      const groups = [], byName = new Map();
      rows.slice(1).forEach((r, k) => {
        if (!r.some((c) => String(c).trim())) return;
        const g = String(r[D] || '').trim() || '기타';
        if (!byName.has(g)) { const o = { name: g, main: [], people: [] }; byName.set(g, o); groups.push(o); }
        const item = { r, k: k + 1 };
        (isMain(r[N]) ? byName.get(g).main : byName.get(g).people).push(item);
      });
      const q = query;
      let html = '', shown = 0;
      for (const g of groups) {
        const gHit = q && rowMatches([g.name], q);
        const people = q && !gHit ? g.people.filter((it) => rowMatches(it.r, q)) : g.people;
        const mains = q && !gHit ? g.main.filter((it) => rowMatches(it.r, q)) : g.main;
        if (q && !people.length && !mains.length) continue;
        shown += people.length + mains.length;
        const isClosed = !q && closed[g.name];
        // 부서 줄: [접기 · 부서 이름 · 인원] [대표번호]
        html += '<section class="gvSec' + (isClosed ? ' closed' : '') + (people.length ? '' : ' solo') + '">' +
          '<div class="gvHead"><button type="button" class="gvTog" data-g="' + esc(g.name) + '" aria-expanded="' + !isClosed + '"' + (people.length ? '' : ' tabindex="-1"') + '>' +
            '<span class="gvIco" aria-hidden="true">' + deptIcon() + '</span>' +
            (people.length ? '<span class="gvChev" aria-hidden="true">' + ICONS.chev + '</span>' : '') +
            '<b>' + (q ? hl(g.name, q) : esc(g.name)) + '</b>' +
            (g.people.length ? '<span class="gvCnt">' + g.people.length + '명</span>' : '') + '</button>' +
          mains.map((it) => '<button type="button" class="gvMain" data-v="' + esc(it.r[X] || '') + '" data-k="' + it.k + '" title="대표번호 · 눌러서 복사">' +
            '<span>대표</span><b>' + hl(it.r[X] || '', q) + '</b></button>').join('') + '</div>' +
          (people.length ? '<div class="gvGrid">' + people.map((it) => {
            const ex = extra.map((i) => String(it.r[i] || '').trim()).filter(Boolean).join(' · ');
            const vacant = /^(공석|빈자리|-)$/.test(String(it.r[N] || '').trim());
            return '<button type="button" class="gvItem' + (vacant ? ' vacant' : '') + '" data-v="' + esc(it.r[X] || '') + '" data-k="' + it.k + '" title="눌러서 복사">' +
              '<span class="gvName">' + hl(it.r[N] || '', q) + (ex ? '<i>' + hl(ex, q) + '</i>' : '') + '</span>' +
              '<span class="gvExt">' + hl(it.r[X] || '', q) + '</span></button>';
          }).join('') + '</div>' : '') + '</section>';
      }
      if (!groups.length) html = '<div class="gvEmpty">아직 연락망이 없어요.<br>편집을 눌러 넣거나, 엑셀에서 복사해 붙여넣어 보세요.</div>';
      else if (!shown && q) html = '<div class="gvEmpty">찾는 사람이 없어요</div>';
      el.innerHTML = html;
    }
    function hl(text, q) {
      const t = String(text || '');
      if (!q) return esc(t);
      const n = q.toLowerCase(), lt = t.toLowerCase();
      let j = lt.indexOf(n);
      if (j < 0) {
        // 번호는 - 없이 쳐도 찾으니 강조 없이
        return esc(t);
      }
      let out = '', i = 0;
      while (j >= 0) { out += esc(t.slice(i, j)) + '<mark>' + esc(t.slice(j, j + n.length)) + '</mark>'; i = j + n.length; j = lt.indexOf(n, i); }
      return out + esc(t.slice(i));
    }
    el.addEventListener('click', (e) => {
      const h = e.target.closest('.gvTog');
      if (h) {
        if (query || h.closest('.solo')) return;
        const g = h.dataset.g;
        closed[g] = !closed[g];
        if (!closed[g]) delete closed[g];
        saveClosed();
        h.closest('.gvSec').classList.toggle('closed', !!closed[g]);
        h.setAttribute('aria-expanded', String(!closed[g]));
        return;
      }
      const b = e.target.closest('.gvItem, .gvMain');
      if (!b || !b.dataset.v) return;
      if (opts.onPick) opts.onPick(b.dataset.v.trim(), rows[Number(b.dataset.k)], b);
    });
    return {
      setRows(r) { const j = JSON.stringify(r); if (j === JSON.stringify(rows)) return; rows = r ? r.map((x) => x.slice()) : null; render(); },
      filter(q) { query = String(q || '').trim(); render(); },
      render
    };
  }

  // 내용이 그대로면 다시 그리지 않음 (나타나는 효과가 다시 재생되며 깜빡이는 것 방지)
  const htmlDesc = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
  function guardHTML(...els) {
    for (const el of els) {
      if (!el || el.__guarded) continue;
      el.__guarded = true;
      Object.defineProperty(el, 'innerHTML', {
        configurable: true,
        get() { return htmlDesc.get.call(el); },
        set(v) { v = String(v); if (el.__h === v) return; el.__h = v; htmlDesc.set.call(el, v); }
      });
    }
  }

  // 슬라이더: 채워진 부분을 스킨색으로 (기본 모양은 뒤가 검게 비쳐서 직접 그림)
  function syncRange(el) {
    const min = Number(el.min || 0), max = Number(el.max || 100), v = Number(el.value);
    el.style.setProperty('--p', (max > min ? ((v - min) / (max - min)) * 100 : 0) + '%');
  }
  function syncRanges(root) { (root || document).querySelectorAll('input[type="range"]').forEach(syncRange); }
  document.addEventListener('input', (e) => { if (e.target && e.target.type === 'range') syncRange(e.target); }, true);

  // ───────── 반복 일정 ─────────
  // 일정 { t, title, c, r?, x? } · r: 'd' 매일 · 'wd' 평일 · 'w' 매주 · 'm' 매월 · 'y' 매년 · x: 이 날은 빼기 [날짜키]
  const REPEATS = [['', '반복'], ['d', '매일'], ['wd', '평일'], ['w', '매주'], ['m', '매월'], ['y', '매년']];
  const REPEAT_NAME = { d: '매일', wd: '평일', w: '매주', m: '매월', y: '매년' };
  const keyDate = (k) => { const p = k.split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); };
  function repeatsOn(ev, startKey, k) {
    if (!ev.r || k <= startKey) return false;
    if (Array.isArray(ev.x) && ev.x.includes(k)) return false;
    const a = keyDate(startKey), b = keyDate(k);
    switch (ev.r) {
      case 'd': return true;
      case 'wd': return b.getDay() > 0 && b.getDay() < 6;
      case 'w': return a.getDay() === b.getDay();
      case 'm': return a.getDate() === b.getDate();
      case 'y': return a.getDate() === b.getDate() && a.getMonth() === b.getMonth();
      default: return false;
    }
  }
  // 반복 일정 목록 (한 번 만들어 두고 여러 날짜에 씀)
  function recurring(events) {
    const out = [];
    for (const [k, list] of Object.entries(events || {})) (list || []).forEach((ev, i) => { if (ev && ev.r) out.push({ k, i, ev }); });
    return out;
  }
  // 그 날의 일정: 그 날 적은 것 + 다른 날에서 반복되어 오는 것 (시간 순)
  function eventsOn(events, k, rec) {
    const own = ((events || {})[k] || []).map((ev, i) => ({ ev, k, i, own: true }));
    const more = (rec || recurring(events)).filter((x) => x.k !== k && repeatsOn(x.ev, x.k, k)).map((x) => ({ ...x, own: false }));
    return own.concat(more).sort((p, q) => (p.ev.t || '').localeCompare(q.ev.t || ''));
  }

  // 창 모양을 카드에 맞춰 자름: 투명 여백이 옆 메모를 덮지 않게 (크기가 바뀌는 동안만 따라감)
  function fitShape(card, pad) {
    const api = window.api;
    if (!api || !api.setShape) return;
    pad = pad == null ? 6 : pad;   // 그림자가 잘리지 않을 만큼만 (옆 메모는 이 정도만 덮음)
    let last = '', until = 0, raf = 0;
    const send = () => {
      const r = card.getBoundingClientRect();
      const o = { x: r.left - pad, y: r.top - pad, w: r.width + pad * 2, h: r.height + pad * 2 };
      const k = [o.x, o.y, o.w, o.h].map(Math.round).join(',');
      if (k !== last) { last = k; api.setShape(o); }
    };
    const loop = () => { raf = 0; send(); if (Date.now() < until) raf = requestAnimationFrame(loop); };
    const burst = (ms) => { until = Math.max(until, Date.now() + (ms || 900)); if (!raf) raf = requestAnimationFrame(loop); };
    if (window.ResizeObserver) new ResizeObserver(() => burst(400)).observe(card);
    new MutationObserver(() => burst(900)).observe(card, { attributes: true, attributeFilter: ['class', 'style'] });
    window.addEventListener('resize', () => burst(600));
    card.addEventListener('transitionrun', () => burst(900));
    card.addEventListener('transitionend', () => burst(200));
    burst(1200);
  }
  const SEASONS_ON = false;   // 계절 스킨 꺼내기: true 로 바꾸면 스킨 목록에 나타남
  window.M = { SEASONS_ON, fitShape, REPEATS, REPEAT_NAME, repeatsOn, recurring, eventsOn, GROUP_COLORS, syncRanges, TBL, CONTACT_HEAD, fixContactRows, contactView, cleanTable, tableToText, textToTable, parseTSV, toTSV, rowMatches, tableEditor, DIVIDER, lineEditor, previewHTML, stripDividers, calFontOptions, guardHTML, memoOrder, SKINS, FONTS, MARKS, MARK_NAMES, MARK_COLORS, EVENT_COLORS, ICONS, rgba, grad, esc, pad, dateKey, applyTheme, markSvg };
})();
