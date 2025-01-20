document.addEventListener('DOMContentLoaded', function () {
  // 브라우저 감지
  browserDetector();

  // 컴포넌트 로드
  // 헤더 컴포넌트 사용
  $("#header-container").html(createHeader("내 웹사이트"));

  // 사이드바 컴포넌트 사용
  $("#sidebar-container").html(Sidebar.create(["메뉴5", "메뉴2", "메뉴3"]));

  // 푸터 컴포넌트 동적 로딩
  $("#footer-container").load("./src/components-test/footer/footer.html");
});

// 브라우저 감지
function browserDetector() {
  // Edge
  if (navigator.userAgent.includes('Edg')) {
    document.body.classList.add('edge');
    alert('edge');
  }

  // Whale
  if (navigator.userAgent.includes('Whale')) {
    document.body.classList.add('whale');
    alert('whale');
  }
}

function textQr() {

}