// 크롬이 "설치 가능" 신호를 보내면 놓치지 않도록 페이지 맨 처음에 받아 둠
window.__installEvt = null;
window.addEventListener('beforeinstallprompt', function (e) {
  e.preventDefault();
  window.__installEvt = e;
  window.dispatchEvent(new Event('mallang-installable'));
});
