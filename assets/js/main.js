document.addEventListener("DOMContentLoaded", function () {
  // 헤더 애니메이션
  let header = document.querySelector(".header");

  if (header) {
    let headerHeight = header.offsetHeight;

    window.onscroll = function () {
      console.log(headerHeight);
      let windowTop = window.scrollY;
      // 스크롤 세로값이 헤더높이보다 크거나 같으면 
      // 헤더에 클래스 'drop'을 추가한다
      if (windowTop >= headerHeight) {
        header.classList.add("drop");
      } 
      // 아니면 클래스 'drop'을 제거
      else {
        header.classList.remove("drop");
      }
    };
  } else {
    console.error("관리자에게 문의해주세요");
  }

  // 팝업
  const popup = document.getElementById("lego_popup");
  const noShow7DaysBtn = document.getElementById("no-show-7days-btn");
  const closeBtn = document.getElementById("close-btn");

  // 팝업이 존재하는지 확인
  if (popup && noShow7DaysBtn && closeBtn) {
    // 팝업이 7일 동안 열리지 않도록 설정
      noShow7DaysBtn.addEventListener("click", function () {
      setCookie("hideLegoPopup", "true", 7); // 7일간 쿠키 설정
      popup.style.display = "none";
    });

    // 팝업 닫기
    closeBtn.addEventListener("click", function () {
      popup.style.display = "none";
    });

    // 쿠키 설정 함수
    function setCookie(name, value, days) {
      let expires = "";
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    // 쿠키 읽기 함수
    function getCookie(name) {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    }

    // 쿠키에 hidePopup이 없으면 팝업 표시
    if (getCookie("hideLegoPopup") !== "true") {
      popup.style.display = "block";
    } else {
      popup.style.display = "none";
    }
  } else {
    console.error("팝업 요소가 존재하지 않습니다. HTML 코드를 확인해주세요.");
  }
});
