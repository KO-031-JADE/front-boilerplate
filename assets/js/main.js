document.addEventListener("DOMContentLoaded", function () {
  handleHeaderAnimation(); // 헤더 애니메이션
  handleReceptionButtonFloating(); // 접수하러 가기 버튼 애니메이션
  handlePopup(); // 팝업
  toggleNoticeTitles(); // 공지사항 토글
  handleTabs(); // 투표하기, 점수확인 탭
  handleCateTabs(); // 카테고리 탭
});

// 헤더의 애니메이션
function handleHeaderAnimation() {
  const header = document.querySelector(".header");
  if (!header) {
    console.error("헤더 요소가 없습니다. 관리자에게 문의해주세요.");
    return;
  }

  const headerHeight = header.offsetHeight;
  window.addEventListener("scroll", () => {
    if (window.scrollY >= headerHeight) {
      header.classList.add("drop");
    } else {
      header.classList.remove("drop");
    }
  });
}

// 팝업
function handlePopup() {
  const popup = document.getElementById("lego_popup");
  const noShow7DaysBtn = document.getElementById("no-show-7days-btn");
  const closeBtn = document.getElementById("close-btn");

  if (!popup || !noShow7DaysBtn || !closeBtn) {
    console.error("팝업 관련 요소가 존재하지 않습니다. HTML 코드를 확인해주세요.");
    return;
  }

  // 7일간 팝업 표시 안 함 버튼 처리
  noShow7DaysBtn.addEventListener("click", () => setCookieAndHidePopup(popup));
  // 팝업 닫기 버튼 처리
  closeBtn.addEventListener("click", () => popup.style.display = "none");

  // 페이지 로드 시 쿠키 검사 후 팝업 표시 결정
  popup.style.display = getCookie("hideLegoPopup") !== "true" ? "block" : "none";
}

// 쿠키 설정 후 팝업 숨김 처리
function setCookieAndHidePopup(popup) {
  setCookie("hideLegoPopup", "true", 7);
  popup.style.display = "none";
}

// 쿠키를 설정하는 함수
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

// 쿠키를 가져오는 함수
function getCookie(name) {
  const nameEQ = `${name}=`;
  return document.cookie.split(';').map(c => c.trim()).find(c => c.indexOf(nameEQ) === 0)?.substring(nameEQ.length) || null;
}

// 공지사항 타이틀 클릭 시 토글
function toggleNoticeTitles() {
  document.querySelectorAll('.notice-lists_tit').forEach(title => {
    title.addEventListener('click', () => title.classList.toggle('open'));
  });
}

// 투표하기, 점수확인 탭
function handleTabs() {
  const tabs = document.querySelectorAll('.tabs-wrap .tab');

  tabs.forEach((tab) => tab.addEventListener('click', () => {
    document.querySelector('.tabs-wrap .tab.active').classList.remove('active');
    tab.classList.add('active');
  }));
}

// 카테고리 탭
function handleCateTabs() {
  const tabs = document.querySelectorAll('.cate-wrap .tab');

  tabs.forEach((tab) => tab.addEventListener('click', () => {
    document.querySelector('.cate-wrap .tab.active').classList.remove('active');
    tab.classList.add('active');
  }));
}

// 접수하러 가기 플로팅 애니메이션
function handleReceptionButtonFloating() {
  // 기존 css에서 플로팅 배너 위치(top)값을 가져와 저장한다.	
  var floatPosition = 712;	
  $(window).scroll(function() {		
    // 현재 스크롤 위치를 가져온다.		
    var scrollTop = $(window).scrollTop();		
    var newPosition = scrollTop + floatPosition + "px";		
    $("#floatButton").stop().animate({ "top": newPosition }, 500);	
  }).scroll();
}
