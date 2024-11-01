// Dropzone 및 Sortable 초기화 설정
document.addEventListener('DOMContentLoaded', function () {
  handleLeftFloating(); // 왼쪽 플로팅 버튼 애니메이션 초기화
  handleHeaderAnimation(); // 헤더 애니메이션
  handleTabActivation(); // 메뉴 리스트 탭 활성화 기능
  handleSmoothScroll(); // 부드러운 스크롤 기능
  // handleReceptionButtonFloating(); // 접수하러 가기 버튼 애니메이션
  handlePopup(); // 팝업
  toggleNoticeTitles(); // 공지사항 토글
  handleTabs(); // 투표하기, 점수확인 탭
  handleCateTabs(); // 카테고리 탭
  popSelect(); // 접수하기 팝업 공모부분 selectbox
  attachFiles(); // 사업소개서 첨부파일
  initDropzone(); // Dropzone 설정
  initSortable(); // Sortable 설정스크롤
  setupTextareaCounter(); // 글자수 카운팅
  checkedOutline(); // 접수하기, 점수확인 체크박스 테두리
  setupContentSwitch(); // 컨텐츠 전환
  handleResize(); // resize
  mobileMenyToggleSlide(); // 모바일 메뉴 토글 슬라이드
  widgetOpen(); // 위젯 여닫기
  radioClick();
  widgetDelete();
  widgetDeleteAll();
  removeDetail();
});

// 왼쪽 플로팅 버튼 애니메이션 처리
function handleLeftFloating() {
  const floatButton = document.getElementById('floatLeftButton');
  const votingSection = document.querySelector('.voting-section');

  window.addEventListener('scroll', () => {
    const votingSectionTop = votingSection.getBoundingClientRect().top;

    if (votingSectionTop <= 0) {
      // 스크롤이 voting-section 아래로 내려갔을 때 나타남
      floatButton.classList.add('visible');
    } else {
      // 스크롤이 voting-section 위로 올라가면 사라짐
      floatButton.classList.remove('visible');
    }
  });
}

// 문서가 로드되었을 때 handleLeftFloating 실행
document.addEventListener('DOMContentLoaded', handleLeftFloating);

function handleResize() {
  if (window.innerWidth > 768) {
    document.querySelector('.dropzone').addEventListener('click', openFileDialog);
    handleMouseMoveListener();
  } else {
  }
}

// resize
window.addEventListener('resize', handleResize);

// 헤더의 애니메이션
function handleHeaderAnimation() {
  const header = document.querySelector('.header');
  if (!header) {
    console.error('헤더 요소가 없습니다. 관리자에게 문의해주세요.');
    return;
  }

  const headerHeight = header.offsetHeight;
  window.addEventListener('scroll', () => {
    if (window.scrollY >= headerHeight) {
      header.classList.add('drop');
    } else {
      header.classList.remove('drop');
    }
  });
}

// 부드러운 스크롤 기능
function handleSmoothScroll() {
  document.querySelectorAll('.scroll-link').forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // 요소의 위치 가져오기
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;

        // 원하는 여백 (예: 100px)
        const offset = 145;

        // 부드럽게 스크롤 이동 (여백을 준 위치까지)
        window.scrollTo({
          top: targetPosition - offset,
          behavior: 'smooth',
        });
      }

      if ($('#burgur').hasClass('on')) {
        $('#burgur').removeClass('on');
        $('#slide').removeClass('on');
      } else {
        $('#burgur').addClass('on');
        $('#slide').addClass('on');
      }


      // 탭 활성화 처리
      if (targetId === 'section2') {
        setActiveTab('contents2'); // 접수확인 탭 활성화
      } else if (targetId === 'section3') {
        setActiveTab('contents1'); // 투표하기 탭 활성화
      }
    });
  });
}

// 메뉴 리스트 탭 활성화 기능
function handleTabActivation() {
  document.querySelectorAll('.menu .scroll-link').forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-target');

      // 스크롤 이동 처리
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offset = 100; // 여백 설정
        window.scrollTo({ top: targetPosition - offset, behavior: 'smooth' });
      }

      // 탭 활성화 처리
      if (targetId === 'section2') {
        setActiveTab('contents2'); // 접수확인 탭 활성화
      } else if (targetId === 'section3') {
        setActiveTab('contents1'); // 투표하기 탭 활성화
      }
    });
  });
}

// 탭 활성화 함수
function setActiveTab(targetContentId) {
  // 모든 탭에서 active 클래스 제거
  document.querySelectorAll('.tabs-wrap .tab').forEach((tab) => tab.classList.remove('active'));
  document.querySelectorAll('.contents-container > .contents').forEach((content) => content.classList.add('hidden'));

  // 해당 탭과 콘텐츠 활성화
  const activeTab = document.querySelector(`.tabs-wrap .tab[data-target="${targetContentId}"]`);
  const activeContent = document.getElementById(targetContentId);

  if (activeTab && activeContent) {
    activeTab.classList.add('active');
    activeContent.classList.remove('hidden');
  }
}

// 팝업
function handlePopup() {
  const popup = document.getElementById('lego_popup');
  const noShow7DaysBtn = document.getElementById('no-show-7days-btn');
  const closeBtn = document.getElementById('close-btn');

  if (!popup || !noShow7DaysBtn || !closeBtn) {
    console.error('팝업 관련 요소가 존재하지 않습니다. HTML 코드를 확인해주세요.');
    return;
  }

  // 7일간 팝업 표시 안 함 버튼 처리
  noShow7DaysBtn.addEventListener('click', () => setCookieAndHidePopup(popup));
  // 팝업 닫기 버튼 처리
  closeBtn.addEventListener('click', () => (popup.style.display = 'none'));

  // 페이지 로드 시 쿠키 검사 후 팝업 표시 결정
  popup.style.display = getCookie('hideLegoPopup') !== 'true' ? 'block' : 'none';
}

// 쿠키 설정 후 팝업 숨김 처리
function setCookieAndHidePopup(popup) {
  setCookie('hideLegoPopup', 'true', 7);
  popup.style.display = 'none';
}

// 쿠키를 설정하는 함수
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

// 쿠키를 가져오는 함수
function getCookie(name) {
  const nameEQ = `${name}=`;
  return (
    document.cookie
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.indexOf(nameEQ) === 0)
      ?.substring(nameEQ.length) || null
  );
}

// 공지사항 타이틀 클릭 시 토글
function toggleNoticeTitles() {
  document.querySelectorAll('.notice-lists_tit').forEach((title) => {
    title.addEventListener('click', () => title.classList.toggle('open'));
  });
}

// 투표하기, 점수확인 탭
function handleTabs() {
  const tabs = document.querySelectorAll('.tabs-wrap .tab');

  tabs.forEach((tab) =>
    tab.addEventListener('click', () => {
      document.querySelector('.tabs-wrap .tab.active').classList.remove('active');
      tab.classList.add('active');
    })
  );
}


// 카테고리 탭
function handleCateTabs() {
const tabs = document.querySelectorAll('.cate-wrap .tab');

tabs.forEach((tab) =>
 tab.addEventListener('click', () => {
   document.querySelector('.cate-wrap .tab.active').classList.remove('active');
   tab.classList.add('active');
   console.log($('.cate-wrap .tab.active').index());
   if($('.cate-wrap .tab.active').index() == 1){
 	  $("#nowSection").val("A");
   } else  if($('.cate-wrap .tab.active').index() == 2){
 	  $("#nowSection").val("B");
   } else  if($('.cate-wrap .tab.active').index() == 3){
 	  $("#nowSection").val("C");
   } else  if($('.cate-wrap .tab.active').index() == 4){
 	  $("#nowSection").val("D");
   } else  if($('.cate-wrap .tab.active').index() == 5){
 	  $("#nowSection").val("E");
   } else {
 	  $("#nowSection").val("");
   }
   getAwardMyList();
 })
);
}

// // 접수하러 가기 플로팅 애니메이션
// function handleReceptionButtonFloating() {
//   // 기존 css에서 플로팅 배너 위치(top)값을 가져와 저장한다.
//   var floatPosition = 712;
//   $(window).scroll(function() {
//     // 현재 스크롤 위치를 가져온다.
//     var scrollTop = $(window).scrollTop();
//     var newPosition = scrollTop + floatPosition + "px";
//     $("#floatRightButton").stop().animate({ "top": newPosition }, 500);
//     // $("#floatLeftButton").stop().animate({ "top": newPosition }, 500);
//   }).scroll();
// }

// 접수하기 팝업 공모부분 selectbox
function popSelect() {
  const selectBox = document.querySelector('.select_box');
  const selectSelected = selectBox.querySelector('.select-selected');
  const hiddenInput = document.querySelector('#section');

  selectSelected.addEventListener('click', function () {
    selectBox.classList.toggle('open');
  });

  selectBox.querySelectorAll('.select-item').forEach((item) => {
    item.addEventListener('click', function () {
      const selectedHTML = this.innerHTML;
      const selectedValue = this.getAttribute('data-value');

      selectSelected.innerHTML = selectedHTML;
      hiddenInput.value = selectedValue;
      selectBox.classList.remove('open');

      // 선택된 상태 스타일 추가
      selectSelected.classList.add('selected');
    });
  });
}

// 사업소개서 첨부파일 (최대 5개)
function attachFiles() {
  const maxBoxes = 5;
  const allowedExtensions = ['pdf', 'doc', 'docx', 'hwp'];
  const fileBoxes = document.querySelector('.file_boxes');

  // 1. btn-document_add 클릭 시 파일 선택창 열기
  fileBoxes.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-document_add')) {
      const fileInput = event.target.previousElementSibling; // 자매 요소인 input[type="file"]
      if (fileInput) {
        fileInput.click(); // 파일 선택창 열기
      }
    }
  });

  // 2. 파일 첨부 시 파일명 표시 및 삭제 버튼 추가
  fileBoxes.addEventListener('change', function (event) {
    if (event.target.classList.contains('a11yHidden')) {
      const fileInput = event.target;
      const fileNameSpan = fileInput.closest('.file_box').querySelector('.file_name');
      const fileName = fileInput.files[0]?.name;
      const fileExtension = fileName?.split('.').pop().toLowerCase();

      if (fileName && allowedExtensions.includes(fileExtension)) {
        // 허용된 파일 형식일 경우
        fileNameSpan.textContent = fileName;
        fileNameSpan.classList.remove('no_files');

        // 삭제 버튼 추가
        if (!fileNameSpan.querySelector('.btn-document_delete')) {
          const deleteButton = document.createElement('button');
          deleteButton.type = 'button';
          deleteButton.className = 'btn-document_delete';
          deleteButton.innerHTML = '<img src="assets/images/btn-doc-delete.png" alt="파일-삭제">';
          fileNameSpan.appendChild(deleteButton);
        }
      } else {
        // 허용되지 않은 파일 형식일 경우
        alert('pdf, doc, docx, hwp 파일만 첨부할 수 있습니다.');
        fileInput.value = ''; // 입력값 초기화
        fileNameSpan.textContent = '파일을 선택하세요.';
        fileNameSpan.classList.add('no_files');

        // 기존 삭제 버튼 제거
        const deleteButton = fileNameSpan.querySelector('.btn-document_delete');
        if (deleteButton) deleteButton.remove();
      }
    }
  });

  // 3. 파일 삭제 버튼 클릭 시 파일명 초기화 및 삭제 버튼 제거
  fileBoxes.addEventListener('click', function (event) {
    if (event.target.closest('.btn-document_delete')) {
      const fileBox = event.target.closest('.file_box');
      const fileInput = fileBox.querySelector("input[type='file']");
      const fileNameSpan = fileBox.querySelector('.file_name');

      // 파일 초기화 및 파일명 초기화
      fileInput.value = '';
      fileNameSpan.textContent = '파일을 선택하세요.';
      fileNameSpan.classList.add('no_files');

      // 삭제 버튼 제거
      event.target.closest('.btn-document_delete').remove();
    }
  });

  // 4. 파일박스 추가 버튼 클릭 시 새로운 파일박스 생성
  fileBoxes.addEventListener('click', function (event) {
    if (event.target.closest('.btn-filebox_add')) {
      const boxCount = fileBoxes.querySelectorAll('li').length;

      if (boxCount < maxBoxes) {
        const newBox = document.createElement('li');
        newBox.innerHTML = `
          <div class="file_box">
            <span class="file_label">첨부파일</span>
            <span class="file_name no_files">파일을 선택하세요.</span>
            <input type="file" id="documentInput_${boxCount}" class="a11yHidden">
            <button type="button" class="btn-document_add">첨부</button>
          </div>
          <div class="btn-filebox_wrap">
            <button type="button" class="btn-filebox_add">파일박스 추가</button>
            ${
              boxCount > 0
                ? `
              <button type="button" class="btn-filebox_delete">파일박스 삭제</button>`
                : ''
            }
          </div>

        `;

        fileBoxes.appendChild(newBox);

        // 최대 개수에 도달하면 추가 버튼 숨기기
        if (boxCount + 1 === maxBoxes) {
          // document.querySelectorAll(".btn-filebox_add").forEach(btn => btn.style.display = "none");
        }
      }
    }
  });

  // 5. 파일박스 삭제 버튼 클릭 시 해당 파일박스 제거
  fileBoxes.addEventListener('click', function (event) {
    if (event.target.closest('.btn-filebox_delete')) {
      const boxToDelete = event.target.closest('li');
      boxToDelete.remove();

      // 파일박스 개수가 최대 미만이면 추가 버튼 다시 표시
      if (fileBoxes.querySelectorAll('li').length < maxBoxes) {
        document.querySelectorAll('.btn-filebox_add').forEach((btn) => (btn.style.display = 'inline-block'));
      }
    }
  });
}

// 사업소개서 첨부파일 reset
function resetFiles() {
  const fileBoxes = document.querySelector('.file_boxes');

  // 기존 파일박스 모두 제거
  fileBoxes.innerHTML = '';

  // 기본 파일박스 하나 추가
  const initialBox = document.createElement('li');
  initialBox.innerHTML = `
    <div class="file_box">
      <span class="file_label">첨부파일</span>
      <span class="file_name no_files">파일을 선택하세요.</span>
      <input type="file" class="a11yHidden">
      <button type="button" class="btn-document_add">첨부</button>
    </div>
    <div class="btn-filebox_wrap">
      <button type="button" class="btn-filebox_add">파일박스 추가</button>
    </div>
  `;

  fileBoxes.appendChild(initialBox);
}

// Dropzone 설정
let dropzone;

function initDropzone() {
  Dropzone.autoDiscover = false;
  const dropzonePreviewNode = document.createElement('div');
  dropzonePreviewNode.innerHTML = `
    <li class="dz-image-preview card-image">
      <div class="representative-label"><button type="button" data-dzc-representative>대표</button></div>
      <button data-dz-remove class="delete-icon">삭제</button>
      <div class="image-box">
        <img data-dz-thumbnail src="#" alt="Dropzone-Image">
      </div>
      <div class="file_info a11yHidden">
        <p data-dz-name>&nbsp;</p>
        <p data-dz-size></p>
        <p data-dz-errormessage></p>
      </div>
    </li>`;

  const previewTemplate = dropzonePreviewNode.innerHTML;

  dropzone = new Dropzone('.dropzone', {
    dictDefaultMessage: '여기에 파일을 드롭하여 업로드하세요',
    url: 'https://httpbin.org/post',
    autoProcessQueue: false,
    previewTemplate: previewTemplate,
    previewsContainer: '#dropzone-preview',
    acceptedFiles: 'image/jpeg,image/png,image/gif,image/jpg',
    maxFiles: 3,
    init: function () {
      const myDropzone = this;
      myDropzone.on('addedfile', (file) => validateFile(file, myDropzone));
      myDropzone.on('removedfile', (file) => {
        toggleMessage(file, myDropzone);
      });
      myDropzone.on('maxfilesexceeded', (file) => handleMaxFilesExceeded(file, myDropzone));
    },
  });

  document.getElementById('dropzone-preview').addEventListener('click', function (event) {
    setRepresentativeImage(event);
  });

  document.querySelector('#apply_popup .btn-pop_submit').addEventListener('click', () => submitFiles(dropzone));

  if (window.innerWidth > 768) {
    document.querySelector('.dropzone').addEventListener('click', openFileDialog);
  }
}

// 파일 1개 이상 3개 미만일 때, 클릭 시 파일 선택 창 열기 함수
function openFileDialog(event) {
  // 썸네일이나 대표이미지 클릭시에는 파일 선택창 뜨지 않도록 변경
  if (event.target.hasAttribute('data-dzc-representative') || event.target.hasAttribute('data-dz-thumbnail')) {
    return;
  }
  if (dropzone.files.length > 0 && dropzone.files.length < dropzone.options.maxFiles) {
    event.stopPropagation();
    dropzone.hiddenFileInput.click();
  }
}

// 파일 유효성 검사
function validateFile(file, dropzone) {
  const fileName = file.name;
  const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
  const img = new Image();

  if (!['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension) || file.size > 2 * 1200 * 1380) {
    alert('지원되지 않는 파일 형식 또는 크기입니다: ' + fileName);
    return dropzone.removeFile(file);
  }

  img.onload = function () {
    if (img.width > 1200 || img.height > 1360) {
      alert('이미지 크기는 1200x1360을 초과할 수 없습니다: ' + fileName);
      dropzone.removeFile(file);
    }
  };
  img.src = URL.createObjectURL(file);

  if (isDuplicateFile(file, dropzone.getAcceptedFiles())) {
    alert('동일한 이름의 파일이 이미 존재합니다: ' + fileName);
    dropzone.removeFile(file);
  }

  if (!document.querySelector('.dz-image-preview.representative-selected')) {
    setTimeout(() => {
      const firstImage = document.querySelector('.dz-image-preview');
      firstImage?.classList.add('representative-selected');
    }, 10);
  }
  toggleMessage(file, dropzone);
}

// 파일 중복 검사
function isDuplicateFile(file, existingFiles) {
  return existingFiles.some((existingFile) => existingFile.name === file.name && existingFile.size === file.size);
}

// 파일 미리보기 여백 설정
function setDropzonePreviewUpload() {
  //  if (!dropzone) return;

  const display = !(dropzone.files.length === 0 || dropzone.files.length >= dropzone.options.maxFiles);
  const preview = document.querySelector('#dropzone-preview');
  const uploadWrapCss = 'card-with-upload';
  const uploadMaxClassPrefix = 'card_upload_max';
  const uploadMaxClassPrefixReg = new RegExp(uploadMaxClassPrefix + '.*', 'i');
  const uploadMaxClass = display ? uploadMaxClassPrefix + (dropzone.options.maxFiles - dropzone.files.length) : '';

  // 여백노출 클래스 추가
  if (display) {
    if (preview?.classList?.contains(uploadWrapCss) !== true) {
      preview.classList.add(uploadWrapCss);
    }
    if (preview?.classList?.contains(uploadMaxClass) !== true) {
      preview.classList.add(uploadMaxClass);
    }
  }
  // 여백노출 클래스 삭제
  for (var i = 0, l = preview.classList.length; i < l; ++i) {
    const className = preview.classList[i];
    if (!display) {
      // 숨김
      if (className === uploadWrapCss || uploadMaxClassPrefixReg.test(className)) {
        preview.classList.remove(className);
        i--;
      }
    } else {
      // 노출
      if (!className) break;
      if (className !== uploadWrapCss && className !== uploadMaxClass && uploadMaxClassPrefixReg.test(className)) {
        preview.classList.remove(className);
        i--;
      }
    }
  }
}

// 파일 제거 후 메시지 보이기 설정
function toggleMessage(file, dropzone) {
  if (!dropzone) return;
  if (dropzone.files.length === 0) {
    document.querySelector('.dz-message').style.display = 'block';
    document.querySelector('.dropzone').style.border = '1px solid #ccc';
  } else {
    document.querySelector('.dz-message').style.display = 'none';
    document.querySelector('.dropzone').style.border = 'none';

    // 삭제 버튼 클릭시 대표 이미지 변경
    if (file != null && file.previewElement?.classList?.contains('representative-selected') === true) {
      const nextObj = document.querySelector('#dropzone-preview > li [data-dzc-representative]');
      if (nextObj) {
        nextObj.click();
      }
    }
  }
  setDropzonePreviewUpload();
}

// 최대 파일 개수 초과 처리
function handleMaxFilesExceeded(file, dropzone) {
  alert('이미지는 최대 3개까지 업로드 가능합니다.');
  dropzone.removeFile(file);
}

// 대표 이미지 설정
function setRepresentativeImage(event) {
  // const target = event.target.parentNode.parentNode;
  const target = event.target.closest('.dz-image-preview');

  if (target) {
    document.querySelectorAll('.dz-image-preview').forEach((item) => item.classList.remove('representative-selected'));
    target.classList.add('representative-selected');
  }
}

// 파일 제출 처리
function submitFiles(dropzone) {
  if (dropzone.getQueuedFiles().length > 0) {
    const formData = new FormData(document.getElementById('upload-form'));
    const uploadedFiles = document.querySelectorAll('#dropzone-preview > .dz-image-preview');

    uploadedFiles.forEach((item, index) => {
      const fileName = item.querySelector('[data-dz-name]').textContent.trim();
      const file = dropzone.getQueuedFiles().find((file) => file.name === fileName);
      formData.append(`image${index + 1}`, file, fileName);
      formData.append(`image-title${index + 1}`, fileName);
    });

    const representativeImage = document.querySelector('.dz-image-preview.representative-selected img');
    if (representativeImage) {
      resizeRepresentativeImage(representativeImage, 300, 341).then((resizedData) => {
        formData.append('thumbnail-img', resizedData.blob, `thumbnail_${fileName}`);
        formData.append('thumbnail-image-title', fileName);

        // 미리보기 업데이트
        document.getElementById('resized-thumbnail-preview').src = resizedData.url;
        document.getElementById('resized-thumbnail-preview').style.display = 'block';

        fetch('https://httpbin.org/post', { method: 'POST', body: formData })
          .then((response) => response.json())
          .then((data) => alert('파일이 성공적으로 업로드되었습니다!'))
          .catch((error) => alert('파일 업로드 중 오류가 발생했습니다.'));
      });
    } else {
      alert('대표 이미지를 선택해 주세요.');
    }
  } else {
    alert('최소 1개의 이미지를 업로드해 주세요.');
  }
}

// 파일 제거 함수
function clearDropzoneFiles() {
  if (dropzone) {
    dropzone.removeAllFiles(true);
  }
}

// 대표 이미지 복사 및 리사이징
function resizeRepresentativeImage(image, width, height) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, width, height);
    canvas.toBlob((blob) => resolve({ blob, url: canvas.toDataURL('image/jpeg') }), 'image/jpeg');
  });
}

// Sortable 설정
function initSortable() {
  new Sortable(document.getElementById('dropzone-preview'), {
    animation: 150,
    ghostClass: 'sortable-ghost',
    handle: '.image-box',
    onEnd: function () {
      const uploadedFiles = document.querySelectorAll('#dropzone-preview > .dz-image-preview');
      const fileOrder = Array.from(uploadedFiles).map((item) => item.querySelector('[data-dz-name]').textContent.trim());
      // console.log("업데이트된 이미지 순서:", fileOrder);
    },
  });
}

// 글자수 카운팅 설정
function setupTextareaCounter() {
  const contentTextarea = document.getElementById('cardContents');
  const charCountDisplay = document.getElementById('char-count');
  contentTextarea.addEventListener('input', () => {
    const currentLength = contentTextarea.value.length;
    charCountDisplay.textContent = `${currentLength} /`;
  });
}

// 접수하기 팝업
function openPopupApply() {
  document.querySelector('.popup-dim').classList.add('on');
  document.querySelector('#apply_popup').classList.add('on');
  document.querySelector('#apply_popup').scrollTop = 0; // 팝업 맨 위로 이동

  const form = document.querySelector('#apply_popup form');
  if (form) {
    form.reset(); // form reset
  }
  // reset 공모부문 select_box
  document.querySelector('.select_box').classList.remove('open');
  document.querySelector('.select-selected').classList.remove('selected');
  document.querySelector('.select-selected').innerHTML = '공모부문을 선택해주세요';
  document.querySelector('#section').value = '';

  // reset 첨부파일
  resetFiles();

  // reset 카드뉴스
  clearDropzoneFiles();
  toggleMessage(null, dropzone);

  // 닫기 버튼 따라다니기
  handleMouseMoveListener('#apply_popup .popup-box', '#apply_popup .btn-pop_close_follow');
}

// //접수하기 팝업
// function openPopupApply() {

//   $.ajax({
// 	    type: 'GET',
// 	    url: '/unicef/api/fo/campaign/award/loginYn',
// 	    headers: {
// 	      'X-AUTH-TOKEN': localStorage.getItem('token'),
// 	    },
// 	  }).done(function (data) {
// 	    console.log("(data.resultCode==>" + data.resultCode);
// 	    if (data.resultCode == 'no') {
// 	      var loginPage = confirm(
// 	        '공모전 참여를 위해서 로그인이 필요합니다\n로그인 페이지로 이동하시겠습니까?'
// 	      );
// 	      if (loginPage) {
// 	        location.href = '/auth/login?redirectTo=/event/unicef-awards';
// 	      } else {
// 	        return;
// 	      }
// 	    } else {
// 	    	  document.querySelector('.popup-dim').classList.add('on');
// 	    	  document.querySelector('#apply_popup').classList.add('on');
// 	    	  document.querySelector('html').classList.add('blockScroll');
// 	    	  document.querySelector('#apply_popup').scrollTop = 0; // 팝업 맨 위로 이동

// 	    	  const form = document.querySelector('#apply_popup form');
// 	    	  if (form) {
// 	    	    form.reset(); // form reset
// 	    	  }
// 	    	  // reset 공모부문 select_box
// 	    	  document.querySelector('.select_box').classList.remove('open');
// 	    	  document.querySelector('.select-selected').classList.remove('selected');
// 	    	  document.querySelector('.select-selected').innerHTML = '공모부문을 선택해주세요';
// 	    	  document.querySelector('#section').value = '';

// 	    	  // reset 첨부파일
// 	    	  resetFiles();

// 	    	  // reset 카드뉴스
// 	    	  clearDropzoneFiles();
// 	    	  toggleMessage(null, dropzone);

//             // 닫기 버튼 따라다니기
//   handleMouseMoveListener('#apply_popup .popup-box', '#apply_popup .btn-pop_close_follow');
// 	    }

// 투표동의 팝업
function openPopupVoteAgree() {
  document.querySelector('.popup-dim').classList.add('on');
  document.querySelector('#vote_agree').classList.add('on');
  document.querySelector('#vote_agree').scrollTop = 0; // 팝업 맨 위로 이동

  const form = document.querySelector('#vote_agree form');
  if (form) {
    form.reset(); // form reset
  }

  // 닫기 버튼 따라다니기
  handleMouseMoveListener('#vote_agree .popup-box', '#vote_agree .btn-pop_close_follow');
}

function closePopupApply(popupSelector) {
  document.querySelector('.popup-dim').classList.remove('on');
  document.querySelector(popupSelector).classList.remove('on');
  // document.removeEventListener('mousemove', mouseMoveHandler);
}

function handleMouseMoveListener(popupSelector, closeBtnSelector) {
  const popup = document.querySelector(popupSelector);
  const popupClose = document.querySelector(closeBtnSelector);

  // 팝업이 존재할 경우
  if (popup && popupClose) {
    // 마우스 이동 리스너 정의
    const mouseMoveHandler = (e) => {
      const isInsideLayer = popup.contains(e.target);
      
      if (window.innerWidth > 768) {
        // PC 화면에서 닫기 버튼 따라다니기
        popupClose.style.transform = isInsideLayer ? "scale(0)" : "scale(1)";
        popupClose.style.left = `${e.clientX - 50}px`;
        popupClose.style.top = `${e.clientY - 50}px`;
      } else {
        // 모바일 화면에서 닫기 버튼 고정
        popupClose.style.transform = "scale(1) translateX(-50%)";
        popupClose.style.position = "absolute";
        popupClose.style.left = '50%';
        popupClose.style.top = '50px'; 
      }
    };

    // 마우스 이동 리스너 추가
    document.addEventListener('mousemove', mouseMoveHandler);

  }
}



// 접수하기, 점수확인 체크박스 테두리
function checkedOutline() {
  const lists = document.querySelectorAll('.list');

  lists.forEach((list) => {
    const checkbox = list.querySelector("input[type='radio']");
    checkbox.addEventListener('change', function () {

      // 모든 라디오 버튼의 체크 상태를 다시 확인하여 클래스 추가/제거
      lists.forEach((listItem) => {
        const checkbox = listItem.querySelector("input[type='radio']");
        
        if (checkbox.checked) {
          listItem.classList.add('checked-border'); // 클래스 추가
        } else {
          listItem.classList.remove('checked-border'); // 클래스 제거
        }
      });

    });
  });
}

// 콘텐츠 전환 기능
function setupContentSwitch() {
  // 탭 클릭 시 관련 콘텐츠 표시
  document.querySelectorAll('.tabs-wrap .tab').forEach((tab) => {
    tab.addEventListener('click', function () {
      // 모든 탭의 active 클래스 제거 및 모든 콘텐츠 숨김 처리
      document.querySelectorAll('.tabs-wrap .tab').forEach((t) => t.classList.remove('active'));
      document.querySelectorAll('.contents-container > .contents').forEach((content) => content.classList.add('hidden'));

      // 클릭된 탭 활성화
      this.classList.add('active');

      // 해당 탭과 관련된 콘텐츠 활성화
      const targetContentId = this.getAttribute('data-target');
      const targetContent = document.getElementById(targetContentId);
      if (targetContent) {
        targetContent.classList.remove('hidden');
      }
    });
  });
}

function mobileMenyToggleSlide() {
  $('#slide-open').click(function () {
    if ($('#burgur').hasClass('on')) {
      $('#burgur').removeClass('on');
      $('#slide').removeClass('on');
      $('#header').removeClass('drop');
    } else {
      $('#burgur').addClass('on');
      $('#slide').addClass('on');
      $('#header').addClass('drop');
    }
  });
}

// 위젯 여닫기
function widgetOpen() {
  const floatButton = document.getElementById('floatLeftButton');
  const widget = document.getElementById('widget');
  const widgetBox = document.querySelector('.widget_wrap');
  const widgetCloseBtns = document.querySelectorAll('.widget_close, .btn-widget_close');

  floatButton.addEventListener('click', function() {
    widget.classList.add('on');
    setTimeout(function(){
      widgetBox.classList.add('open');
    },300);
    widget.scrollTop = 0;
  });
  widgetCloseBtns.forEach(button => {
    button.addEventListener('click', function() {
      widgetBox.classList.remove('open');
      setTimeout(function(){
        widget.classList.remove('on');
      },300);
    });
  });
}

// 라디오 버튼 클릭 이벤트
function radioClick() {
  document.querySelectorAll('.works-list-item input[type="radio"]').forEach((radio) => {
    radio.addEventListener('click', function () {
      const checkedItem = this.closest('.works-list-item');
      const checkedData = checkedItem.getAttribute('data-item');
      const checkedRadio = this.id;
      const checkedImgSrc = checkedItem.querySelector('img').src;

      // 라디오 토글
      if (this.checked && this.getAttribute('data-checked') === 'true') {
        this.checked = false;
        this.setAttribute('data-checked', 'false');
      } else {
        document.querySelectorAll(`input[name="${this.name}"]`).forEach((radio) => {
          radio.setAttribute('data-checked', 'false');
        });
        this.setAttribute('data-checked', 'true');
        this.checked = true;
      }

      // 체크된 라디오 내용 투표하기 위젯에 뿌려주기
      if (this.checked) {
        const selectedItem = document.querySelector('.vote-list-item[data-vote="'+checkedData+'"]');
        selectedItem.setAttribute('data-id', checkedRadio);

        const title = checkedItem.querySelector('.lists-decription_title').textContent;
        const school = checkedItem.querySelector('.lists-decription_school').textContent;
        const widgetList = document.querySelector('.vote-list-item[data-id="'+checkedRadio+'"]');

        widgetList.querySelector('.vote_title').textContent = title;
        widgetList.querySelector('.vote_school').textContent = school;
        selectedItem.querySelector('.vote_img').innerHTML = '<img src="'+checkedImgSrc+'" alt="Selected-Image" />';
        selectedItem.classList.add('selected');

        updateVoteButton();
      }else {
        // 체크된 라디오 버튼 클릭시 체크해제 및 위젯 삭제
        const widgetList = document.querySelector('.vote-list-item[data-id="'+checkedRadio+'"]');
        const selectedItem = document.querySelector('.vote-list-item[data-vote="'+checkedData+'"]');

        widgetList.querySelector('.vote_title').textContent = '';
        widgetList.querySelector('.vote_school').textContent = '';
        selectedItem.querySelector('.vote_img').innerHTML = '<span>선택하기</span>';
        selectedItem.classList.remove('selected');
        checkedItem.classList.remove('checked-border');

        updateVoteButton();
      }

    });
  });
};

// 개별 삭제 버튼 클릭 이벤트
function widgetDelete() {
  document.querySelectorAll('.btn-vote_delete').forEach((button) => {
    button.addEventListener('click', function (event) {
      let deletedItem = event.target.closest('.vote-list-item');
      let dataVote = deletedItem.getAttribute('data-vote');
      let dataId = deletedItem.getAttribute('data-id');
    
      let worksItem = document.querySelector('input[type="radio"]#'+dataId).closest('.works-list-item');
      let title = worksItem.querySelector('.lists-decription_title').textContent;
      console.log(dataId,worksItem);
      
      if (confirm('‘'+title+'’ 작품 선택을 취소하시겠습니까?')) {
        // 이미지 삭제 및 라디오 버튼 해제
        deletedItem.querySelector('.vote_img').innerHTML = '<span>선택하기</span>';
        deletedItem.querySelector('.vote_title').textContent = ' ';
        deletedItem.querySelector('.vote_school').textContent = ' ';
        document.querySelector('input[type="radio"]#'+dataId).checked = false;

        if (worksItem) {
          worksItem.classList.remove('checked-border');
        }

        deletedItem.classList.remove('selected');
      }

      // updateNotification();
      updateVoteButton();
    });
  });
};

// 전체 삭제 버튼 클릭 이벤트
function widgetDeleteAll() {
  document.getElementById('deselectAll').addEventListener('click', function () {
    console.log('widget deleteAll');
    if (confirm('선택을 모두 해제 하시겠습니까?')) {
      // 모든 라디오 버튼 해제
      document.querySelectorAll('.works-list-item').forEach((item) => {
        item.querySelector('input[type="radio"]').checked = false;
        item.classList.remove('checked-border');
      });
  
      // .vote-list-item의 모든 데이터 초기화
      document.querySelectorAll('.vote-list-item').forEach((item) => {
        item.querySelector('.vote_img').innerHTML = '<span>선택하기</span>';
        item.querySelector('.vote_title').textContent = ' ';
        item.querySelector('.vote_school').textContent = ' ';
        item.removeAttribute('data-id');

        item.classList.remove('selected');
      });
  
      alert('선택이 모두 해제 되었습니다.');
    }
  
    // updateNotification();
    updateVoteButton();
  });
};


// 위젯 선택된 카드 개수 안내문구
function updateNotification() {
  const selectedCount = document.querySelectorAll('.vote-list-item .vote_img img').length;
  const maxCount = document.querySelectorAll('.vote-list-item').length;

  if (selectedCount === 0) {
    document.querySelector('.noti__none').style.display = 'block';
    document.querySelector('.noti__count').style.display = 'none';
  } else {
    document.querySelector('.noti__none').style.display = 'none';
    document.querySelector('.noti__count-num').textContent = selectedCount;
    document.querySelector('.noti__count').style.display = 'block';
  }
}

// 투표하기 버튼 업데이트
function updateVoteButton() {
  const selectedCount = document.querySelectorAll('.vote-list-item .vote_img img').length;
  const maxCount = document.querySelectorAll('.vote-list-item').length;

  document.querySelector('.btn-vote').disabled = selectedCount !== maxCount;
}

// 뉴스카드 상세 열기버튼
function detailPage() {
  if ($('#card-detail').hasClass('on')) {
    $('#card-detail').removeClass('on');
  } else {
    $('#card-detail').addClass('on');
  }
}

// 뉴스카드 상세 닫기버튼
function removeDetail() {
  document.querySelectorAll('.card-detail-wrap .mo-detail, .card-detail-wrap .bg').forEach(element => {
    element.addEventListener('click', function () {
      document.getElementById('card-detail').classList.remove('on');
      console.log('닫기');
    });
  });
}