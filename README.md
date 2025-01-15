# megakit_basic_Boilerplate

**메가킷 보일러플레이트 저장소입니다.**  

***

## 프로젝트 제목 컨벤션 🐈

1. **[날짜_프로젝트이름]** 디렉토리 생성
2. ex )  
      202411_awards  
      202407_climate-change

***

## 기본 특징 🐉

1. **대규모 페이지 전용**: 신규사이트, 웹 앱 제작에 적합.
2. **사용 기술**: HTML, CSS, jQuery, JavaScript.
3. **JS 패턴**: 기본 모듈화 사용, 함수 표현식(`const`) 지향 하지만 프로젝트 규모가 작은 경우이므로 선언식 사용.
4. **CDN 사용 지양**: 코드 품질, 의존성 관리, 장기적인 유지보수성을 중요.
5. **프로젝트 시작**: 복사 후 디렉토리 이름 변경 및 불필요한 요소 제거.
6. **CSS 전역 관리**: `global.css`로 CSS 변수 통합 관리.

---
### **코드 스타일 가이드**
#### **HTML**
- **시맨틱 태그**와 속성 순서(`id` → `class` → `data-*`)를 지킴.
- 예시:
  ```html
  <button id="submit" class="btn primary" data-action="submit">Submit</button>
  ```
#### **CSS**
- **BEM 네이밍 규칙 지향**
- 예시:
  ```css
  .card {}
  .card__header {}
  .card--highlighted {}
  ```
#### **JavaScript**
- **함수 선언식 대신 함수 표현식을 사용하여 재할당 방지, 호이스팅 방지, 블록 스코프 관리가 용이 하지만 프로젝트 규모가 작은 경우이므로 선언식으로 진행**
- 예시:
  ```javascript
  // 함수 선언식 (지양)
  // 함수 선언식은 코드 상단에서 선언되었지만, 아래 코드에서도 호출할 수 있음
  function doSomething() {
      console.log("Hello");
  }

  // 함수 표현식 (지향)
  // 함수 표현식은 선언된 시점에서만 호출 가능하며, 호이스팅 방지 및 재할당 방지
  const doSomething = function() {
      console.log("Hello");
  };

  ```

<br>  

### **주요 사용하는 라이브러리** 🪄
| Feature          | Description               | Files                             | Version   | Source       |
| :-------------- | :----------------------- | :-------------------------------- | :--------:| :----------: |
| `jQuery`         | 자바스크립트 라이브러리  | `-`             | 3.6.0     | CDN          |
| `Swiper`         | 이미지 슬라이드          | `-` | 11.1.14  | CDN          |
| `AOS`            | 스크롤 애니메이션        | `aos.js`, `aos.css`               | 2.3.1     | 로컬 파일    |
| `Dropzone`       | 드래그 앤 드랍 기능      | `-` | 6       | CDN          |
| `Sortable`       | 순서 정렬                | `sortable.min.js`                 | 1.15.0    | CDN          |
| `gsap`           | 애니메이션 엔진          | `gsap.min.js`                     | 3.12.5    | CDN          |
| `ScrollTrigger`  | 스크롤 트리거 및 애니메이션 제어 | `scrollTrigger.min.js`          | 3.12.5    | CDN          |

***
<br>

## 작업시 도움되는 사이트 🪄
### 1. 이미지 최적화
  - [iLoveimg](https://www.iloveimg.com/ko/compress-image)  
  **설명**: 웹용 레거시 이미지 추출 후 용량 체크 확인
### 2. 폰트 최적화 
  - [Transfonter](https://transfonter.org/)  
  **설명**: woff2, woffm eot, ttf, subset 가능한 폰트 최적화 
### 3. css minifier
  - [CSS Minifier](https://www.toptal.com/developers/cssminifier)  
  **설명**: 프로젝트 상황에 따라 적용
### 4. js minifier 
  - [Transfonter](https://www.toptal.com/developers/javascript-minifier)  
  **설명**: 프로젝트 상황에 따라 적용
### 5. 퍼포먼스 테스트
  - [Lighthouse](https://developers.google.com/web/tools/lighthouse)  
  **설명**: 사용해 성능, 접근성, SEO, PWA 점수 확인
### 6. 코드 검증
- HTML: [W3C Validator](https://validator.w3.org/).
- CSS: [W3C CSS Validator](https://jigsaw.w3.org/css-validator/).
- JS: [ESLint](https://eslint.org/)  
**설명**: 사용해 코드 스타일과 에러 확인.

***
<br>

##  보일러플레이트 구조 🧱

```
📦 Project Root
├── 📂 assets
│   ├── 📂 styles
│   │   ├── animation.css          # 애니메이션 관련 스타일
│   │   ├── font.css               # 폰트 관련 스타일
│   │   ├── media.css              # 미디어 쿼리 스타일
│   │   ├── reset.css              # 기본 초기화 스타일
│   │   ├── globals.css            # CSS 변수 및 전역 설정
│   │   ├── style.css              # 주요 스타일 정의
│   │   └── 📂 lib                 # 라이브러리 파일 저장소
│   │       └── aos.css
│   ├── 📂 fonts                   # 폰트 파일 저장소
│   ├── 📂 images                  # 이미지 리소스 저장소
│   ├── 📂 scripts
│   │   ├── api.js                 # API 관련 함수
│   │   ├── ui.js                  # UI 기능 (모달, 드롭다운 등).
│   │   ├── animation.js           # 애니메이션 초기화 함수
│   │   ├── utils.js               # 공통 헬퍼 함수
│   │   ├── main.js                # 메인 스크립트 파일
│   │   └── 📂 lib                 # 라이브러리 파일 저장소
│   │       ├── aos.js
│   │       ├── gsap.min.js
│   │       └── scrollTrigger.min.js
├── 📄 index.html                  # 메인 HTML 파일
├── 📄 README.md                   # 프로젝트 설명 파일
└── 📄 settings.json               # VS Code 또는 프로젝트 설정 파일
```

##  기타 작업 가이드
1. 프로젝트 복사 후 디렉토리 이름을 [날짜_프로젝트이름] 형식으로 변경 후 작업.
2. 불필요한 파일, 코드, 주석. 폰트 삭제 후 작업 진행.
3. CSS는 root.css에서 글로벌 변수 관리. 필요 시 추가.
4. 기본적으로 CDN 사용 지향. 로컬 파일은 백업 또는 수정 필요 시만 사용.
