document.addEventListener("DOMContentLoaded", function () {
  handleHeaderAnimation(); // 헤더 애니메이션
  handleReceptionButtonFloating(); // 접수하러 가기 버튼 애니메이션
  handlePopup(); // 팝업
  toggleNoticeTitles(); // 공지사항 토글
  handleTabs(); // 투표하기 탭 애니메이션
  handleCateTabs(); // 카테고리 탭 애니메이션
});

// 헤더의 애니메이션
function handleHeaderAnimation() {
  const header = document.querySelector(".header");
  if (!header) {
    console.error("헤더 요소가 없습니다. 관리자에게 문의해주세요.");
    return;
  }

  const headerHeight = header.offsetHeight;
  window.onscroll = () => {
    const windowTop = window.scrollY;
    if (windowTop >= headerHeight) {
      header.classList.add("drop");
    } else {
      header.classList.remove("drop");
    }
  };
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
  if (getCookie("hideLegoPopup") !== "true") {
    popup.style.display = "block";
  } else {
    popup.style.display = "none";
  }
}

// 쿠키 설정 후 팝업 숨김 처리
function setCookieAndHidePopup(popup) {
  setCookie("hideLegoPopup", "true", 7);
  popup.style.display = "none";
}

// 쿠키를 설정하는 함수
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = `${name}=${value}${expires}; path=/`;
}

// 쿠키를 가져오는 함수
function getCookie(name) {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
  }
  return null;
}

// 공지사항 타이틀 클릭 시 토글
function toggleNoticeTitles() {
  const noticeTitles = document.querySelectorAll('.notice-lists_tit');
  noticeTitles.forEach(title => {
    title.addEventListener('click', () => title.classList.toggle('open'));
  });
}


// 투표하기 탭 애니메이션
function handleTabs() {
  const tabs = document.querySelectorAll('.tabs-wrap .tab');
  const indicator = document.querySelector('.tabs-wrap .indicator');

  tabs.forEach((tab, index) => tab.addEventListener('click', () => {
    document.querySelector('.tabs-wrap .tab.active').classList.remove('active');
    tab.classList.add('active');
    const tabWidth = tab.offsetWidth;
    const tabLeft = tab.offsetLeft;
    indicator.style.transform = `translateX(${tabLeft}px)`;
    indicator.style.width = `${tabWidth}px`;
  }));

  // 초기 active 상태 설정
  const activeTab = document.querySelector('.tabs-wrap .tab.active');
  if (activeTab) {
    const tabWidth = activeTab.offsetWidth;
    const tabLeft = activeTab.offsetLeft;
    const indicator = document.querySelector('.tabs-wrap .indicator');
    indicator.style.transform = `translateX(${tabLeft}px)`;
    indicator.style.width = `${tabWidth}px`;
  }
}

// 카테고리 탭 애니메이션
function handleCateTabs() {
  const tabs = document.querySelectorAll('.cate-wrap .tab');
  const indicator = document.querySelector('.cate-wrap .indicator');

  tabs.forEach((tab, index) => tab.addEventListener('click', () => {
    document.querySelector('.cate-wrap .tab.active').classList.remove('active');
    tab.classList.add('active');
    const tabWidth = tab.offsetWidth;
    const tabLeft = tab.offsetLeft;
    indicator.style.transform = `translateX(${tabLeft}px)`;
    indicator.style.width = `${tabWidth}px`;
  }));

  // 초기 active 상태 설정
  const activeTab = document.querySelector('.cate-wrap .tab.active');
  if (activeTab) {
    const tabWidth = activeTab.offsetWidth;
    const tabLeft = activeTab.offsetLeft;
    const indicator = document.querySelector('.cate-wrap .indicator');
    indicator.style.transform = `translateX(${tabLeft}px)`;
    indicator.style.width = `${tabWidth}px`;
  }
}

// 접수하러 가기 플로팅 애니메이션
function handleReceptionButtonFloating() {
  // 기존 css에서 플로팅 배너 위치(top)값을 가져와 저장한다.	
  // var floatPosition = parseInt($("#floatButton").css('top'));	
  var floatPosition = 712;	
  // 250px 이런식으로 가져오므로 여기서 숫자만 가져온다. parseInt( 값 ); 	
  $(window).scroll(function() {		
    // 현재 스크롤 위치를 가져온다.		
    var scrollTop = $(window).scrollTop();		
    var newPosition = scrollTop + floatPosition + "px"; 		
    /* 애니메이션 없이 바로 따라감		 $("#floatMenu").css('top', newPosition);		 */ 
    $("#floatButton").stop().animate({			"top" : newPosition		}, 500); 	
  }).scroll();
}



