// 월급관리대장 — 받은 급여 · 지출 · 납부 체크 · 매달 반복 · 보기 전용 공유
(() => {
  'use strict';
  const SB = { url: 'https://omdyyvqkxxigilxjysbz.supabase.co', key: 'sb_publishable_g41wwhIMN19UchPheU9Vvg_lAHjnZNf', domain: 'mallang.invalid', iter: 310000 };
  const LS_SESSION = 'ledger.session.v1', LS_VIEW = 'ledger.view.v1', LS_VIEWCACHE = 'ledger.viewcache.v1';
  const CATS = [
    { id: 'phone', n: '통신비', e: '📱' }, { id: 'trans', n: '교통비', e: '🚌' }, { id: 'insure', n: '보험·적금', e: '🛡️' },
    { id: 'loan', n: '대출 상환', e: '🏦' }, { id: 'food', n: '식비', e: '🍚' }, { id: 'card', n: '카드값', e: '💳' },
    { id: 'allow', n: '용돈', e: '💝' }, { id: 'etc', n: '기타', e: '📦' }
  ];
  const catOf = (id) => CATS.find((c) => c.id === id) || CATS[CATS.length - 1];
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const won = (n) => (n < 0 ? '-' : '') + Math.abs(Math.round(n || 0)).toLocaleString('ko-KR') + '원';
  const num = (v) => { const d = String(v || '').replace(/[^\d]/g, ''); return d ? Math.min(+d, 9999999999) : 0; };
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const load = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { toast('휴대폰 저장 공간이 부족해요'); } };
  const ICON = {
    left: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    right: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
    menu: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l4 4 10-10"/></svg>'
  };

  let toastT;
  function toast(t) { const el = $('toast'); el.textContent = t; el.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), 2200); }

  // ───────── 서버 ─────────
  class CloudError extends Error { constructor(code, status) { super(code); this.code = code; this.status = status; } }
  async function call(path, opts) {
    let res;
    try { res = await fetch(SB.url + path, { ...opts, headers: { apikey: SB.key, 'Content-Type': 'application/json', ...(opts && opts.headers) } }); }
    catch (e) { throw new CloudError('offline'); }
    const text = await res.text();
    let body = null; try { body = text ? JSON.parse(text) : null; } catch (e) { body = text; }
    if (!res.ok) throw new CloudError(String((body && (body.error_code || body.code || body.error)) || 'http_' + res.status), res.status);
    return body;
  }
  const toSession = (t, username) => ({ access: t.access_token, refresh: t.refresh_token, exp: Date.now() + (Number(t.expires_in) || 3600) * 1000, userId: t.user && t.user.id, username });
  async function secretOf(username, password) {
    // 말랑메모와 같은 방식으로 로그인 비밀값을 만듦 (비밀번호 자체는 서버로 보내지 않음)
    const enc = new TextEncoder();
    const base = await crypto.subtle.importKey('raw', enc.encode(String(password)), 'PBKDF2', false, ['deriveBits']);
    const bits = new Uint8Array(await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: enc.encode('mallang-memo/v1/' + username), iterations: SB.iter }, base, 512));
    return Array.from(bits.slice(0, 32), (b) => b.toString(16).padStart(2, '0')).join('');
  }
  let session = load(LS_SESSION, null);
  async function refresh() {
    const t = await call('/auth/v1/token?grant_type=refresh_token', { method: 'POST', body: JSON.stringify({ refresh_token: session.refresh }) });
    session = toSession(t, session.username); save(LS_SESSION, session);
  }
  async function authed(path, opts) {
    if (!session) throw new CloudError('signed_out');
    if (session.exp - Date.now() < 60000) { try { await refresh(); } catch (e) { if (e.status === 400 || e.status === 401) throw new CloudError('session_expired', 401); throw e; } }
    const go = () => call(path, { ...opts, headers: { Authorization: 'Bearer ' + session.access, ...(opts && opts.headers) } });
    try { return await go(); } catch (e) {
      if (e.status !== 401) throw e;
      try { await refresh(); } catch (e2) { throw new CloudError('session_expired', 401); }
      return go();
    }
  }

  // ───────── 데이터 ─────────
  // months[ym] = { income:[{id,name,amount,rec}], items:[{id,cat,name,amount,day,rec,paid}], memo }
  let mode = 'edit';          // 'edit' | 'view'
  let db = { months: {}, dirty: {} };
  const dbKey = () => 'ledger.data.v1.' + (session && session.userId);
  const persist = () => save(dbKey(), db);
  const now = new Date();
  let ym = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
  const shiftYm = (k, d) => { const [y, m] = k.split('-').map(Number); const t = new Date(y, m - 1 + d, 1); return t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0'); };
  const clean = (m) => ({
    income: (Array.isArray(m && m.income) ? m.income : []).map((x) => ({ id: String(x.id || uid()), name: String(x.name || '').slice(0, 40), amount: num(x.amount), rec: !!x.rec })),
    items: (Array.isArray(m && m.items) ? m.items : []).map((x) => ({ id: String(x.id || uid()), cat: catOf(x.cat).id, name: String(x.name || '').slice(0, 40), amount: num(x.amount), day: Math.min(31, num(x.day)) || 0, rec: !!x.rec, paid: !!x.paid })),
    memo: String((m && m.memo) || '').slice(0, 2000)
  });
  // 기록 없는 달: 바로 전에 기록된 달의 '매달' 항목을 미리 채워 보여줌 (고치면 그때 저장)
  function draftFor(k) {
    const prev = Object.keys(db.months).filter((x) => x < k).sort().pop();
    if (!prev) return { m: { income: [{ id: uid(), name: '월급', amount: 0, rec: true }], items: [], memo: '' }, from: null };
    const p = db.months[prev];
    return {
      m: { income: p.income.filter((x) => x.rec).map((x) => ({ ...x, id: uid() })), items: p.items.filter((x) => x.rec).map((x) => ({ ...x, id: uid(), paid: false })), memo: '' },
      from: prev
    };
  }
  let cur = null, curDraft = null;
  function openMonth() {
    if (db.months[ym]) { cur = db.months[ym]; curDraft = null; }
    else if (mode === 'edit') { const d = draftFor(ym); cur = d.m; curDraft = d.from || 'new'; }
    else { cur = { income: [], items: [], memo: '' }; curDraft = 'none'; }
  }
  function commit() {
    db.months[ym] = cur; curDraft = null; db.dirty[ym] = true; persist(); render(); schedulePush();
  }

  // ───────── 동기화 ─────────
  let pushT = null, syncing = false, lastErr = '';
  function schedulePush(ms) { clearTimeout(pushT); pushT = setTimeout(pushDirty, ms == null ? 700 : ms); setSync(); }
  async function pushDirty() {
    if (mode !== 'edit' || !session || syncing) return;
    const keys = Object.keys(db.dirty).filter((k) => db.dirty[k]);
    if (!keys.length) { lastErr = ''; setSync(); return; }
    syncing = true; setSync();
    try {
      const rows = keys.map((k) => ({ user_id: session.userId, ym: k, data: db.months[k] }));
      await authed('/rest/v1/ledger_months?on_conflict=user_id,ym', { method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify(rows) });
      for (const k of keys) if (JSON.stringify(rows.find((r) => r.ym === k).data) === JSON.stringify(db.months[k])) delete db.dirty[k];
      persist(); lastErr = '';
    } catch (e) {
      lastErr = e.code === 'offline' ? '인터넷이 없어서 휴대폰에 먼저 저장했어요' : e.code === 'session_expired' ? '다시 로그인해 주세요' : '서버 저장을 다시 시도할게요';
      if (e.code === 'session_expired') { syncing = false; setSync(); return logout(true); }
      clearTimeout(pushT); pushT = setTimeout(pushDirty, 20000);
    }
    syncing = false; setSync();
    if (Object.keys(db.dirty).some((k) => db.dirty[k]) && !lastErr) schedulePush(300);
  }
  async function pullAll() {
    try {
      const rows = await authed('/rest/v1/ledger_months?select=ym,data', {});
      for (const r of rows || []) if (!db.dirty[r.ym]) db.months[r.ym] = clean(r.data);
      persist(); openMonth(); render(); lastErr = '';
    } catch (e) {
      if (e.code === 'session_expired') return logout(true);
      lastErr = e.code === 'offline' ? '인터넷이 없어요 · 휴대폰에 저장된 내용을 보여줘요' : '서버에서 불러오지 못했어요';
    }
    setSync(); pushDirty();
  }
  function setSync() {
    const el = $('syncState'); if (!el) return;
    if (mode === 'view') { el.textContent = ''; return; }
    const pending = Object.keys(db.dirty).some((k) => db.dirty[k]);
    el.textContent = lastErr || (syncing || pending ? '저장하는 중…' : '서버에 안전하게 저장됨 ✓');
    el.classList.toggle('warn', !!lastErr);
  }
  window.addEventListener('online', () => { if (mode === 'edit') pushDirty(); else loadView(); });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && $('sheet').hidden) { if (mode === 'edit' && session) pullAll(); else if (mode === 'view') loadView(); } });

  // ───────── 보기 전용 (언니) ─────────
  let viewToken = null, viewLabel = '';
  async function loadView() {
    try {
      const r = await call('/rest/v1/rpc/ledger_view', { method: 'POST', body: JSON.stringify({ p_token: viewToken }) });
      if (!r) { $('viewBanner').textContent = '이 링크는 더 이상 쓸 수 없어요. 새 링크를 받아 주세요.'; db.months = {}; }
      else { db.months = {}; for (const k of Object.keys(r.months || {})) db.months[k] = clean(r.months[k]); viewLabel = r.label || ''; save(LS_VIEWCACHE, { months: db.months, label: viewLabel }); setBanner(); }
    } catch (e) { toast('인터넷이 없어서 마지막으로 본 내용을 보여줘요'); }
    openMonth(); render();
  }
  function setBanner() { $('viewBanner').innerHTML = '👀 <b>보기 전용</b>' + (viewLabel ? ' · ' + esc(viewLabel) : '') + '<br><small>내역은 동생이 관리해요. 바꿀 게 있으면 말해 주세요!</small>'; }

  // ───────── 화면 ─────────
  function render() {
    if (!cur) openMonth();
    const [y, m] = ym.split('-').map(Number);
    $('mLabel').innerHTML = y + '년 <b>' + m + '월</b>';
    const inSum = cur.income.reduce((a, x) => a + x.amount, 0);
    const outSum = cur.items.reduce((a, x) => a + x.amount, 0);
    const paidSum = cur.items.filter((x) => x.paid).reduce((a, x) => a + x.amount, 0);
    const bal = inSum - outSum;
    $('sBal').textContent = won(bal); $('sBal').classList.toggle('neg', bal < 0);
    $('sIn').textContent = won(inSum); $('sOut').textContent = won(outSum);
    $('sBar').style.width = (inSum ? Math.min(100, (outSum / inSum) * 100) : outSum ? 100 : 0) + '%';
    $('sBar').classList.toggle('over', outSum > inSum);
    const nPaid = cur.items.filter((x) => x.paid).length;
    $('sPaid').innerHTML = cur.items.length
      ? '납부 완료 <b>' + nPaid + '</b> / ' + cur.items.length + '건' + (outSum - paidSum > 0 ? ' · 아직 낼 돈 <b>' + won(outSum - paidSum) + '</b>' : ' · 다 냈어요 🎉')
      : '';
    // 지난달에서 가져온 안내
    const c = $('carry');
    if (mode === 'edit' && curDraft && curDraft !== 'new' && curDraft !== 'none') {
      const n = cur.income.length + cur.items.length;
      c.hidden = false; c.innerHTML = '🔁 ' + (+curDraft.split('-')[1]) + '월의 <b>매달 항목 ' + n + '개</b>를 미리 넣어 뒀어요. 고치거나 체크하면 저장돼요.';
    } else if (mode === 'view' && curDraft === 'none') { c.hidden = false; c.textContent = '이 달은 아직 기록이 없어요.'; }
    else c.hidden = true;

    $('inList').innerHTML = cur.income.length ? cur.income.map((x) =>
      '<button class="row inc" type="button" data-k="in" data-id="' + x.id + '"><span class="ic">💰</span><span class="nm">' + esc(x.name || '급여') + (x.rec ? '<em class="tag">매달</em>' : '') + '</span><b class="amt plus">' + won(x.amount) + '</b></button>').join('')
      : '<p class="empty">받은 급여를 적어 주세요</p>';

    const groups = CATS.map((ct) => ({ ct, list: cur.items.filter((x) => x.cat === ct.id) })).filter((g) => g.list.length);
    $('outList').innerHTML = groups.length ? groups.map((g) =>
      '<div class="grp"><div class="grpH"><span>' + g.ct.e + ' ' + g.ct.n + '</span><span>' + won(g.list.reduce((a, x) => a + x.amount, 0)) + '</span></div>' +
      g.list.map((x) => '<div class="row out' + (x.paid ? ' paid' : '') + '" data-k="out" data-id="' + x.id + '">' +
        '<button class="cb" type="button" data-pay="' + x.id + '" aria-pressed="' + x.paid + '" aria-label="' + (x.paid ? '납부 취소' : '납부 완료') + '">' + (x.paid ? ICON.check : '') + '</button>' +
        '<button class="rowMain" type="button"><span class="nm">' + esc(x.name || g.ct.n) + (x.rec ? '<em class="tag">매달</em>' : '') + (x.day ? '<em class="tag day">' + x.day + '일</em>' : '') + '</span>' +
        '<b class="amt">' + won(x.amount) + '</b></button></div>').join('') + '</div>').join('')
      : '<p class="empty">통신비, 대출, 카드값 같은 지출을 추가해 주세요</p>';

    if (document.activeElement !== $('memo')) $('memo').value = cur.memo || '';
    $('memo').readOnly = mode === 'view';
    document.body.classList.toggle('viewMode', mode === 'view');
    setSync();
  }

  // ───────── 편집 시트 ─────────
  let ed = null;   // { k: 'in'|'out', id|null, cat }
  function openEd(k, id) {
    if (mode !== 'edit') return;
    const list = k === 'in' ? cur.income : cur.items;
    const x = id ? list.find((v) => v.id === id) : null;
    ed = { k, id: x ? x.id : null, cat: x ? x.cat : 'phone' };
    $('edTitle').textContent = (x ? '' : '새 ') + (k === 'in' ? '받은 급여' : '지출');
    $('edCats').hidden = k === 'in'; $('edDayRow').hidden = k === 'in';
    renderCats();
    $('edName').value = x ? x.name : (k === 'in' ? '월급' : '');
    $('edAmt').value = x && x.amount ? x.amount.toLocaleString('ko-KR') : '';
    $('edDay').value = x && x.day ? x.day : '';
    $('edRec').checked = x ? x.rec : true;
    $('edDel').hidden = !x;
    $('sheet').hidden = false;
    setTimeout(() => (x ? $('edAmt') : $('edName')).focus(), 250);
  }
  function renderCats() {
    $('edCats').innerHTML = CATS.map((c) => '<button type="button" class="cat' + (ed.cat === c.id ? ' on' : '') + '" data-cat="' + c.id + '">' + c.e + ' ' + c.n + '</button>').join('');
  }
  $('edCats').onclick = (e) => {
    const b = e.target.closest('[data-cat]'); if (!b) return;
    const was = catOf(ed.cat).n; ed.cat = b.dataset.cat; renderCats();
    if (!$('edName').value.trim() || $('edName').value === was) $('edName').value = catOf(ed.cat).n;
  };
  $('edAmt').addEventListener('input', (e) => { const n = num(e.target.value); e.target.value = n ? n.toLocaleString('ko-KR') : ''; });
  $('edForm').onsubmit = (e) => {
    e.preventDefault();
    const list = ed.k === 'in' ? cur.income : cur.items;
    const v = { name: $('edName').value.trim() || (ed.k === 'in' ? '월급' : catOf(ed.cat).n), amount: num($('edAmt').value), rec: $('edRec').checked };
    if (ed.k === 'out') { v.cat = ed.cat; v.day = Math.min(31, num($('edDay').value)) || 0; }
    const old = ed.id && list.find((x) => x.id === ed.id);
    if (old) Object.assign(old, v);
    else list.push({ id: uid(), ...v, ...(ed.k === 'out' ? { paid: false } : {}) });
    closeSheets(); commit(); hop($('sumBun'), '뾰잉! 저장했어');
  };
  $('edDel').onclick = () => {
    const list = ed.k === 'in' ? cur.income : cur.items;
    const i = list.findIndex((x) => x.id === ed.id); if (i < 0) return;
    const [gone] = list.splice(i, 1); closeSheets(); commit();
    toast('"' + gone.name + '" 삭제했어요');
  };
  function closeSheets() { $('sheet').hidden = true; $('menu').hidden = true; document.activeElement && document.activeElement.blur(); }
  document.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', closeSheets));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSheets(); });

  $('addIn').onclick = () => openEd('in', null);
  $('addOut').onclick = () => openEd('out', null);
  $('inList').onclick = (e) => { const r = e.target.closest('.row'); if (r) openEd('in', r.dataset.id); };
  $('outList').onclick = (e) => {
    const pay = e.target.closest('[data-pay]');
    if (pay) { if (mode !== 'edit') return; const x = cur.items.find((v) => v.id === pay.dataset.pay); x.paid = !x.paid; commit();
      if (x.paid) { const all = cur.items.every((v) => v.paid); hop($('sumBun'), all ? '이번 달 다 냈다! 🎉' : CHEERS[Math.floor(Math.random() * CHEERS.length)], all); }
      return; }
    const r = e.target.closest('.row'); if (r) openEd('out', r.dataset.id);
  };
  let memoT;
  // 말랑이 뾰잉
  let bubT;
  function hop(el, msg, big) {
    el.classList.remove('boing', 'big'); void el.offsetWidth; el.classList.add(big ? 'big' : 'boing');
    if (msg != null && el.id === 'sumBun') { const b = $('bubble'); b.textContent = msg; b.classList.add('show'); clearTimeout(bubT); bubT = setTimeout(() => b.classList.remove('show'), big ? 2600 : 1600); }
  }
  ['sumBun', 'logo'].forEach((id) => $(id).addEventListener('animationend', (e) => { if (e.target.tagName === 'IMG' && e.animationName === 'boing') $(id).classList.remove('boing', 'big'); }));
  const CHEERS = ['뾰잉! 잘했어 🐰', '뾰잉뾰잉 ✓', '하나 끝! 💪', '착착 낸다 ✨', '최고야 💜'];
  $('logo').onclick = () => hop($('logo'));
  $('sumBun').style.pointerEvents = 'auto';
  $('sumBun').onclick = () => hop($('sumBun'), ['뾰잉?', '돈 관리 화이팅!', '오늘도 아껴 쓰자 🐰', '말랑말랑 💜'][Math.floor(Math.random() * 4)]);
  $('memo').addEventListener('input', (e) => { if (mode !== 'edit') return; cur.memo = e.target.value; clearTimeout(memoT); memoT = setTimeout(commit, 500); });
  $('prevM').innerHTML = ICON.left; $('nextM').innerHTML = ICON.right; $('menuBtn').innerHTML = ICON.menu;
  $('prevM').onclick = () => { ym = shiftYm(ym, -1); openMonth(); render(); };
  $('nextM').onclick = () => { ym = shiftYm(ym, 1); openMonth(); render(); };
  $('mLabel').onclick = () => { ym = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0'); openMonth(); render(); };

  // ───────── 설정 ─────────
  $('menuBtn').onclick = () => { $('menu').hidden = false; renderSkins(); renderInstall(); if (mode === 'edit') renderShare(); };
  const linkOf = (t) => location.origin + location.pathname + '?v=' + t;
  async function renderShare() {
    const box = $('shareBox'); box.innerHTML = '<p class="small">불러오는 중…</p>';
    try {
      const r = await authed('/rest/v1/ledger_share?select=token,label', {});
      const s = r && r[0];
      box.innerHTML = s
        ? '<label>보는 사람 이름<input id="shLabel" maxlength="20" value="' + esc(s.label) + '" placeholder="예: 언니"></label>' +
          '<div class="linkBox">' + esc(linkOf(s.token)) + '</div>' +
          '<div class="btnRow"><button id="shCopy" class="primary" type="button">링크 보내기</button><button id="shNew" class="ghost" type="button">새 링크로 바꾸기</button></div>' +
          '<button id="shOff" class="ghost danger" type="button">공유 끄기</button>'
        : '<button id="shMake" class="primary" type="button">보기 전용 링크 만들기</button>';
      if (s) {
        $('shCopy').onclick = () => sendLink(s.token);
        $('shNew').onclick = () => makeShare(true);
        $('shOff').onclick = async () => { await authed('/rest/v1/ledger_share?user_id=eq.' + session.userId, { method: 'DELETE' }); toast('공유를 껐어요'); renderShare(); };
        $('shLabel').onchange = async (e) => { await authed('/rest/v1/ledger_share?user_id=eq.' + session.userId, { method: 'PATCH', body: JSON.stringify({ label: e.target.value.trim() }) }); toast('이름을 바꿨어요'); };
      } else $('shMake').onclick = () => makeShare(false);
    } catch (e) { box.innerHTML = '<p class="small">인터넷 연결을 확인해 주세요</p>'; }
  }
  async function makeShare(renew) {
    if (renew && !confirm('새 링크로 바꾸면 예전 링크로는 더 이상 볼 수 없어요. 바꿀까요?')) return;
    const t = Array.from(crypto.getRandomValues(new Uint8Array(24)), (b) => b.toString(16).padStart(2, '0')).join('');
    await authed('/rest/v1/ledger_share?on_conflict=user_id', { method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify([{ user_id: session.userId, token: t, label: '언니' }]) });
    await renderShare(); sendLink(t);
  }
  async function sendLink(t) {
    const url = linkOf(t);
    if (navigator.share) { try { await navigator.share({ title: '월급관리대장', text: '이번 달 돈 관리 내역이야! 링크 눌러서 봐 줘 🐰', url }); return; } catch (e) { if (e.name === 'AbortError') return; } }
    try { await navigator.clipboard.writeText(url); toast('링크를 복사했어요. 카톡에 붙여 넣어 보내 주세요'); } catch (e) { prompt('이 링크를 복사해서 보내 주세요', url); }
  }
  $('exportBtn').onclick = () => {
    const blob = new Blob([JSON.stringify({ app: 'salary-book', at: new Date().toISOString(), months: db.months }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = '월급관리대장-백업-' + new Date().toISOString().slice(0, 10) + '.json'; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  };
  $('logoutBtn').onclick = () => logout(false);
  function logout(expired) {
    if (!expired && Object.keys(db.dirty).some((k) => db.dirty[k]) && !confirm('아직 서버에 못 올라간 내용이 있어요. 그래도 로그아웃할까요?')) return;
    localStorage.removeItem(LS_SESSION);
    if (!Object.keys(db.dirty).some((k) => db.dirty[k])) localStorage.removeItem(dbKey());
    session = null; closeSheets(); showAuth(expired ? '로그인이 만료됐어요. 다시 로그인해 주세요.' : '');
  }

  // ───────── 로그인 ─────────
  function showAuth(msg) { $('app').hidden = true; $('auth').hidden = false; $('authMsg').textContent = msg || ''; }
  $('loginForm').onsubmit = async (e) => {
    e.preventDefault();
    const u = $('uid').value.trim().toLowerCase(), p = $('upw').value;
    if (!/^[a-z0-9_]{3,20}$/.test(u)) { $('authMsg').textContent = '아이디를 다시 확인해 주세요'; return; }
    $('loginBtn').disabled = true; $('loginBtn').textContent = '확인하는 중…'; $('authMsg').textContent = '';
    try {
      const secret = await secretOf(u, p);
      const t = await call('/auth/v1/token?grant_type=password', { method: 'POST', body: JSON.stringify({ email: u + '@' + SB.domain, password: secret }) });
      session = toSession(t, u); save(LS_SESSION, session); $('upw').value = '';
      startEdit();
    } catch (err) {
      $('authMsg').textContent = err.code === 'offline' ? '인터넷 연결을 확인해 주세요' : (err.status === 400 || err.status === 401) ? '아이디 또는 비밀번호가 맞지 않아요' : '잠시 후 다시 시도해 주세요';
    }
    $('loginBtn').disabled = false; $('loginBtn').textContent = '로그인';
  };
  function startEdit() {
    mode = 'edit'; db = load(dbKey(), { months: {}, dirty: {} });
    for (const k of Object.keys(db.months)) db.months[k] = clean(db.months[k]);
    $('auth').hidden = true; $('app').hidden = false; $('viewBanner').hidden = true;
    $('who').textContent = session.username || '';
    openMonth(); render(); pullAll();
  }
  function startView() {
    mode = 'view'; const c = load(LS_VIEWCACHE, null);
    db = { months: {}, dirty: {} };
    if (c) { for (const k of Object.keys(c.months || {})) db.months[k] = clean(c.months[k]); viewLabel = c.label || ''; }
    $('auth').hidden = true; $('app').hidden = false; $('viewBanner').hidden = false; setBanner();
    $('who').textContent = '';
    openMonth(); render(); loadView();
  }


  // ───────── 스킨 (말랑메모와 같은 스킨) ─────────
  const LS_PREFS = 'ledger.prefs.v1';
  const prefs = load(LS_PREFS, { skin: 'lav', installHide: false });
  const savePrefs = () => save(LS_PREFS, prefs);
  const M = window.M;
  function applySkin() {
    const t = M.applyTheme({ skin: prefs.skin });
    const sk = t.sk, r = document.documentElement.style;
    r.setProperty('--base', sk.base);
    r.setProperty('--b0', sk.b[0]); r.setProperty('--b1', sk.b[1]); r.setProperty('--b2', sk.b[2]);
    document.querySelector('meta[name="theme-color"]').setAttribute('content', sk.base);
  }
  function renderSkins() {
    const SK = M.SKINS;
    const ORDER = ['lav', 'pink', 'cotton', 'blue', 'midnight', 'peach', 'forest', 'honey', 'sky', 'aurora', 'office', 'sage', 'berry', 'draw'];
    const ids = ORDER.concat(Object.keys(SK).filter((id) => !ORDER.includes(id) && !SK[id].season)).filter((id) => SK[id]);
    $('skins').innerHTML = '<div class="skg">' + ids.map((id) => {
      const k = SK[id];
      return '<button class="skin' + (prefs.skin === id ? ' on' : '') + '" type="button" data-skin="' + id + '" aria-pressed="' + (prefs.skin === id) + '" style="--sc:' + k.a1 + '">' +
        (k.bunny ? '<span class="sw swDraw' + (k.deco || k.glassSeason ? ' swDeco' : '') + '" style="background:' + (k.season || k.deco ? k.b[0] : '') + '"><img src="' + k.bunny + '" alt=""></span>'
          : '<span class="sw" style="background:linear-gradient(135deg,' + k.b[0] + ',' + k.b[2] + ')"><b style="background:linear-gradient(135deg,' + k.a1 + ',' + k.a2 + ')"></b></span>') +
        '<span class="sn">' + esc(k.name) + '</span></button>';
    }).join('') + '</div>';
  }
  $('skins').onclick = (e) => {
    const b = e.target.closest('[data-skin]'); if (!b) return;
    prefs.skin = b.dataset.skin; savePrefs(); applySkin(); renderSkins();
    hop($('logo'));
  };
  applySkin();

  // ───────── 앱으로 설치 (말랑메모와 같은 방식) ─────────
  const ua = navigator.userAgent;
  const isIOS = /iphone|ipad|ipod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /android/i.test(ua);
  const inApp = /KAKAOTALK|NAVER\(inapp|Instagram|FBAN|FBAV|Line\/|DaumApps|everytimeApp|; wv\)/i.test(ua);
  const isKakao = /KAKAOTALK/i.test(ua);
  const iosNotSafari = isIOS && /CriOS|FxiOS|EdgiOS|Whale|NAVER/i.test(ua);
  const standalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  let installed = false, installBusy = false;
  const evt = () => window.__installEvt;
  window.addEventListener('mallang-installable', renderInstall);
  window.addEventListener('appinstalled', () => { window.__installEvt = null; installed = true; renderInstall(); toast('설치했어요! 홈 화면의 말랑이 아이콘으로 열어 보세요'); });
  function installMode() {
    if (standalone()) return 'none';
    if (inApp) return 'external';
    if (evt()) return 'prompt';
    if (installed) return 'installed';
    if (isIOS) return iosNotSafari ? 'external' : 'ios';
    if (isAndroid) return 'wait';
    return 'none';
  }
  function renderInstall() {
    const mode = installMode();
    $('install').hidden = !(mode !== 'none' && mode !== 'installed' && !prefs.installHide);
    $('installSub').textContent = { prompt: '누르면 바로 설치돼요', wait: '누르면 바로 설치돼요', ios: '홈 화면에 아이콘을 만들어요', external: isIOS ? '사파리에서 설치해요' : '크롬에서 바로 설치' }[mode] || '';
    $('installGo').textContent = installBusy ? '준비 중…' : (mode === 'external' ? (isIOS ? '사파리로' : '크롬으로') : '설치');
    $('installGo').disabled = installBusy;
    $('installSec').hidden = mode === 'none' && !installed;
    $('installSet').textContent = installed || mode === 'installed' ? '이미 설치돼 있어요' : '설치하기';
    $('installSet').disabled = installed || mode === 'installed';
  }
  function openExternal() {
    const url = location.href.split('#')[0];
    if (isKakao) { location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(url); return; }
    if (isAndroid) { location.href = 'intent://' + url.replace(/^https?:\/\//, '') + '#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=' + encodeURIComponent(url) + ';end'; return; }
    if (navigator.clipboard) navigator.clipboard.writeText(url).then(() => toast('주소를 복사했어요. 사파리에 붙여넣어 열어 주세요')).catch(() => toast('사파리에서 ' + url + ' 을 열어 주세요'));
    else toast('사파리에서 ' + url + ' 을 열어 주세요');
  }
  async function runPrompt() {
    const e = evt(); window.__installEvt = null; e.prompt();
    let choice = null; try { choice = await e.userChoice; } catch (err) { /* 무시 */ }
    if (choice && choice.outcome === 'accepted') installed = true;
    renderInstall();
  }
  async function doInstall() {
    const mode = installMode();
    if (mode === 'prompt') return runPrompt();
    if (mode === 'external') return openExternal();
    if (mode === 'ios') { closeSheets(); $('iosTip').hidden = false; return; }
    if (mode === 'installed') { toast('이미 설치돼 있어요. 홈 화면의 말랑이 아이콘으로 열어 주세요'); return; }
    if (mode === 'wait') {
      installBusy = true; renderInstall();
      const ok = await new Promise((res) => {
        if (evt()) return res(true);
        const t = setTimeout(() => { window.removeEventListener('mallang-installable', on); res(false); }, 5000);
        function on() { clearTimeout(t); res(true); }
        window.addEventListener('mallang-installable', on, { once: true });
      });
      installBusy = false;
      if (ok) return runPrompt();
      renderInstall();
      toast(installed ? '이미 설치돼 있어요' : '크롬 오른쪽 위 ⋮ 메뉴에서 "앱 설치"를 눌러 주세요');
    }
  }
  $('installGo').onclick = doInstall;
  $('installSet').onclick = doInstall;
  $('installX').onclick = () => { prefs.installHide = true; savePrefs(); renderInstall(); toast('설정(☰)에서 언제든 설치할 수 있어요'); };
  $('iosTipX').onclick = () => { $('iosTip').hidden = true; };
  renderInstall();

  // ───────── 시작 ─────────
  const q = new URLSearchParams(location.search).get('v');
  if (q && /^[0-9a-f]{24,}$/.test(q)) {
    save(LS_VIEW, q); viewToken = q;
    history.replaceState(null, '', location.pathname);
    startView();
  } else if (session) startEdit();
  else if ((viewToken = load(LS_VIEW, null))) startView();
  else showAuth();

  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
})();
