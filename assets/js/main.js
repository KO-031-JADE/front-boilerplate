// Dropzone 및 Sortable 초기화 설정
document.addEventListener("DOMContentLoaded", function () {
  handleHeaderAnimation(); // 헤더 애니메이션
  handleReceptionButtonFloating(); // 접수하러 가기 버튼 애니메이션
  handlePopup(); // 팝업
  toggleNoticeTitles(); // 공지사항 토글
  handleTabs(); // 투표하기, 점수확인 탭
  handleCateTabs(); // 카테고리 탭
  popSelect(); // 접수하기 팝업 공모부분 selectbox
  attachFiles(); // 사업소개서 첨부파일
  initDropzone(); // Dropzone 설정
  initSortable(); // Sortable 설정
  setupTextareaCounter(); // 글자수 카운팅
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






// 접수하기 팝업
function openPopupApply() {
  document.querySelector(".popup-dim").classList.add("on");
  document.querySelector("#apply_popup").classList.add("on");
  document.querySelector("html").classList.add("blockScroll");
  document.querySelector("#apply_popup").scrollTop = 0; // 팝업 맨 위로 이동

  const form = document.querySelector("#apply_popup form");
  if (form) {
    form.reset(); // form reset
  }
  // reset 공모부문 select_box
  document.querySelector('.select_box').classList.remove('open');
  document.querySelector('.select-selected').classList.remove('selected');
  document.querySelector('.select-selected').innerHTML = '공모부문을 선택해주세요';
  document.querySelector('#customSelectValue').value = '';
  // reset 첨부파일
  resetFiles();
}

function closePopupApply() {
  document.querySelector(".popup-dim").classList.remove("on");
  document.querySelector("#apply_popup").classList.remove("on");
  document.querySelector("html").classList.remove("blockScroll");
}


// 접수하기 팝업 공모부분 selectbox
function popSelect() {
  const selectBox = document.querySelector('.select_box');
  const selectSelected = selectBox.querySelector('.select-selected');
  const hiddenInput = document.querySelector('#customSelectValue');
  
  selectSelected.addEventListener('click', function() {
    selectBox.classList.toggle('open');
  });
  
  selectBox.querySelectorAll('.select-item').forEach(item => {
    item.addEventListener('click', function() {
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
  const fileBoxes = document.querySelector(".file_boxes");

  // 1. btn-document_add 클릭 시 파일 선택창 열기
  fileBoxes.addEventListener("click", function(event) {
    if (event.target.classList.contains("btn-document_add")) {
      const fileInput = event.target.previousElementSibling; // 자매 요소인 input[type="file"]
      if (fileInput) {
        fileInput.click(); // 파일 선택창 열기
      }
    }
  });

  // 2. 파일 첨부 시 파일명 표시 및 삭제 버튼 추가
  fileBoxes.addEventListener("change", function(event) {
    if (event.target.classList.contains("a11yHidden")) {
      const fileInput = event.target;
      const fileNameSpan = fileInput.closest(".file_box").querySelector(".file_name");

      if (fileInput.files[0]) {
        // 파일이 첨부된 경우
        fileNameSpan.textContent = fileInput.files[0].name;
        fileNameSpan.classList.remove("no_files");

        // 삭제 버튼 추가
        if (!fileNameSpan.querySelector(".btn-document_delete")) {
          const deleteButton = document.createElement("button");
          deleteButton.type = "button";
          deleteButton.className = "btn-document_delete";
          deleteButton.innerHTML = '<img src="assets/images/btn-doc-delete.png" alt="파일-삭제">';
          fileNameSpan.appendChild(deleteButton);
        }
      } else {
        // 파일이 첨부되지 않은 경우
        fileNameSpan.textContent = "파일을 선택하세요.";
        fileNameSpan.classList.add("no_files");

        // 기존 삭제 버튼 제거
        const deleteButton = fileNameSpan.querySelector(".btn-document_delete");
        if (deleteButton) deleteButton.remove();
      }
    }
  });

  // 3. 파일 삭제 버튼 클릭 시 파일명 초기화 및 삭제 버튼 제거
  fileBoxes.addEventListener("click", function(event) {
    if (event.target.closest(".btn-document_delete")) {
      const fileBox = event.target.closest(".file_box");
      const fileInput = fileBox.querySelector("input[type='file']");
      const fileNameSpan = fileBox.querySelector(".file_name");

      // 파일 초기화 및 파일명 초기화
      fileInput.value = "";
      fileNameSpan.textContent = "파일을 선택하세요.";
      fileNameSpan.classList.add("no_files");

      // 삭제 버튼 제거
      event.target.closest(".btn-document_delete").remove();
    }
  });

  // 4. 파일박스 추가 버튼 클릭 시 새로운 파일박스 생성
  fileBoxes.addEventListener("click", function(event) {
    if (event.target.closest(".btn-filebox_add")) {
      const boxCount = fileBoxes.querySelectorAll("li").length;

      if (boxCount < maxBoxes) {
        const newBox = document.createElement("li");
        newBox.innerHTML = `
          <div class="file_box">
            <span class="file_label">첨부파일</span>
            <span class="file_name no_files">파일을 선택하세요.</span>
            <input type="file" id="documentInput_${boxCount}" class="a11yHidden">
            <button type="button" class="btn-document_add">첨부</button>
          </div>
          <button type="button" class="btn-filebox_add">
            <img src="assets/images/btn-files-add.png" alt="파일박스-추가">
          </button>
          ${boxCount > 0 ? `
            <button type="button" class="btn-filebox_delete">
              <img src="assets/images/btn-files-delete.png" alt="파일박스-삭제">
            </button>` : ""}
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
  fileBoxes.addEventListener("click", function(event) {
    if (event.target.closest(".btn-filebox_delete")) {
      const boxToDelete = event.target.closest("li");
      boxToDelete.remove();

      // 파일박스 개수가 최대 미만이면 추가 버튼 다시 표시
      if (fileBoxes.querySelectorAll("li").length < maxBoxes) {
        document.querySelectorAll(".btn-filebox_add").forEach(btn => btn.style.display = "inline-block");
      }
    }
  });
}

// 사업소개서 첨부파일 reset
function resetFiles() {
  const fileBoxes = document.querySelector(".file_boxes");

  // 기존 파일박스 모두 제거
  fileBoxes.innerHTML = ''; 

  // 기본 파일박스 하나 추가
  const initialBox = document.createElement("li");
  initialBox.innerHTML = `
    <div class="file_box">
      <span class="file_label">첨부파일</span>
      <span class="file_name no_files">파일을 선택하세요.</span>
      <input type="file" class="a11yHidden">
      <button type="button" class="btn-document_add">첨부</button>
    </div>
    <button type="button" class="btn-filebox_add">
      <img src="assets/images/btn-files-add.png" alt="파일박스-추가">
    </button>
  `;

  fileBoxes.appendChild(initialBox);
}

// Dropzone 설정
function initDropzone() {
  Dropzone.autoDiscover = false;
  const dropzonePreviewNode = document.createElement('div');
  dropzonePreviewNode.innerHTML = `
    <li class="mt-2 dz-image-preview card-image">
      <div class="rounded-3 position-relative image-box">
        <div class="representative-label">대표</div>
        <div class="d-flex align-items-center p-2">
          <div class="flex-shrink-0 me-3">
            <div class="width-8 h-auto rounded-3">
              <img data-dz-thumbnail class="w-full h-auto rounded-3 block" src="#" alt="Dropzone-Image" />
            </div>
          </div>
          <div class="flex-grow-1">
            <div class="pt-1">
              <h6 class="font-semibold mb-1" data-dz-name>&nbsp;</h6>
              <p class="text-sm text-muted fw-normal" data-dz-size></p>
              <strong class="error text-danger" data-dz-errormessage></strong>
            </div>
          </div>
          <div class="shrink-0">
            <button data-dz-remove class="delete-icon"></button>
          </div>
        </div>
      </div>
    </li>`;
  
  const previewTemplate = dropzonePreviewNode.innerHTML;

  const dropzone = new Dropzone(".dropzone", {
    dictDefaultMessage: "여기에 파일을 드롭하여 업로드하세요",
    url: "https://httpbin.org/post",
    autoProcessQueue: false,
    previewTemplate: previewTemplate,
    previewsContainer: '#dropzone-preview',
    acceptedFiles: "image/jpeg,image/png,image/gif,image/jpg",
    maxFiles: 3,
    init: function () {
      const myDropzone = this;
      myDropzone.on("addedfile", (file) => validateFile(file, myDropzone));
      myDropzone.on("removedfile", () => toggleMessage(myDropzone));
      myDropzone.on("maxfilesexceeded", (file) => handleMaxFilesExceeded(file, myDropzone));
    }
  });

  document.getElementById("dropzone-preview").addEventListener("click", function (event) {
    setRepresentativeImage(event);
  });

  // document.getElementById("submit-button").addEventListener("click", () => submitFiles(dropzone));
}

// 파일 유효성 검사
function validateFile(file, dropzone) {
  const fileName = file.name;
  const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
  const img = new Image();

  if (!['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension) || file.size > 2 * 1024 * 1024) {
    alert("지원되지 않는 파일 형식 또는 크기입니다: " + fileName);
    return dropzone.removeFile(file);
  }

  img.onload = function () {
    if (img.width > 1200 || img.height > 1360) {
      alert("이미지 크기는 1200x1360을 초과할 수 없습니다: " + fileName);
      dropzone.removeFile(file);
    }
  };
  img.src = URL.createObjectURL(file);

  if (isDuplicateFile(file, dropzone.getAcceptedFiles())) {
    alert("동일한 이름의 파일이 이미 존재합니다: " + fileName);
    dropzone.removeFile(file);
  }

  if (!document.querySelector('.dz-image-preview.representative-selected')) {
    setTimeout(() => {
      const firstImage = document.querySelector('.dz-image-preview');
      firstImage?.classList.add('representative-selected');
    }, 10);
  }

  document.querySelector(".dz-message").style.display = "none";
}

// 파일 중복 검사
function isDuplicateFile(file, existingFiles) {
  return existingFiles.some(existingFile => existingFile.name === file.name && existingFile.size === file.size);
}

// 파일 제거 후 메시지 보이기 설정
function toggleMessage(dropzone) {
  if (dropzone.files.length === 0) document.querySelector(".dz-message").style.display = "block";
}

// 최대 파일 개수 초과 처리
function handleMaxFilesExceeded(file, dropzone) {
  alert("이미지는 최대 3개까지 업로드 가능합니다.");
  dropzone.removeFile(file);
}

// 대표 이미지 설정
function setRepresentativeImage(event) {
  const target = event.target.closest('.dz-image-preview');
  if (target) {
    document.querySelectorAll('.dz-image-preview').forEach(item => item.classList.remove('representative-selected'));
    target.classList.add('representative-selected');
  }
}

// 파일 제출 처리
function submitFiles(dropzone) {
  if (dropzone.getQueuedFiles().length > 0) {
    const formData = new FormData(document.getElementById("upload-form"));
    const uploadedFiles = document.querySelectorAll('#dropzone-preview > .dz-image-preview');

    uploadedFiles.forEach((item, index) => {
      const fileName = item.querySelector('[data-dz-name]').textContent.trim();
      const file = dropzone.getQueuedFiles().find(file => file.name === fileName);
      formData.append(`image${index + 1}`, file, fileName);
      formData.append(`image-title${index + 1}`, fileName);
    });

    const representativeImage = document.querySelector('.dz-image-preview.representative-selected img');
    if (representativeImage) {
      resizeRepresentativeImage(representativeImage, 300, 341).then((resizedData) => {
        formData.append("thumbnail-img", resizedData.blob, `thumbnail_${fileName}`);
        formData.append("thumbnail-image-title", fileName);

        // 미리보기 업데이트
        document.getElementById("resized-thumbnail-preview").src = resizedData.url;
        document.getElementById("resized-thumbnail-preview").style.display = 'block';

        fetch("https://httpbin.org/post", { method: "POST", body: formData })
          .then(response => response.json())
          .then(data => alert("파일이 성공적으로 업로드되었습니다!"))
          .catch(error => alert("파일 업로드 중 오류가 발생했습니다."));
      });
    } else {
      alert("대표 이미지를 선택해 주세요.");
    }
  } else {
    alert("최소 1개의 이미지를 업로드해 주세요.");
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
    canvas.toBlob(blob => resolve({ blob, url: canvas.toDataURL('image/jpeg') }), 'image/jpeg');
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
      const fileOrder = Array.from(uploadedFiles).map(item => item.querySelector('[data-dz-name]').textContent.trim());
      console.log("업데이트된 이미지 순서:", fileOrder);
    }
  });
}

// 글자수 카운팅 설정
function setupTextareaCounter() {
  const contentTextarea = document.getElementById("content");
  const charCountDisplay = document.getElementById("char-count");
  contentTextarea.addEventListener("input", () => {
    const currentLength = contentTextarea.value.length;
    charCountDisplay.textContent = `${currentLength} /`;
  });
}
