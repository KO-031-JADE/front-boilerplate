# midkitbasic_Boilerplate

**미드킷 보일러플레이트 저장소입니다.**  

***

## 프로젝트 제목 컨벤션 🐈

1. **[프로젝트이름]** 디렉토리 생성
2. ex )  
      awards  
      climate-change
***

## 기본 특징 🐉

1. **번들러 및 프레임워크 미사용**: 이 프로젝트는 번들러(Webpack, Vite 등) 또는 프레임워크(React, Vue 등)를 사용하지 않는 가벼운 구조로 설계.
2. **사용 기술**: HTML, CSS, jQuery, JavaScript.
3. **JS 패턴**: 기본 모듈화 사용, 함수 표현식(`const`) 지향 하지만 프로젝트 규모가 작은 경우이므로 선언식 사용.
4. **CDN 사용 지향**: 캐싱 및 로드 성능 최적화.
5. **프로젝트 시작**: 복사 후 디렉토리 이름 변경 및 불필요한 요소 제거.
6. **CSS 전역 관리**: `globals.css`로 CSS 변수 통합 관리.

---

<br>  

### **주요 사용하는 라이브러리** 🪄
| Feature          | Description               | Files                             | Version   | Source       |
| :-------------- | :----------------------- | :-------------------------------- | :--------:| :----------: |
| `jQuery`         | DOM 조작 및 간단한 이벤트 핸들링  | `-`             | 3.6.0     | CDN          |
| `Swiper`         | 이미지 및 콘텐츠 슬라이드 구현           | `-` | 11.1.14  | CDN          |
| `AOS`            | 스크롤 애니메이션 구현 및 화면 전환 효과        | `aos.js`, `aos.css`               | 2.3.1     | 로컬 파일    |
| `Dropzone`       | 파일 드래그 앤 드롭 업로드 기능 구현      | `-` | 6       | CDN          |
| `Sortable`       | 리스트 및 아이템 순서 변경 기능                | `sortable.min.js`                 | 1.15.0    | CDN          |

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
📦 midkitbasic                # 프로젝트 루트 디렉토리
 ┣ 📂 assets                    # 정적 파일(이미지, 폰트, 아이콘 등) 저장 디렉토리
 ┃ ┣ 📂 fonts                     # 웹사이트에서 사용하는 폰트 파일 저장
 ┃ ┣ 📂 icons                     # 아이콘 파일 저장(SVG, PNG 등)
 ┃ ┗ 📂 images                    # 이미지 파일 저장(JPG, PNG 등)
 ┣ 📂 docs                    # 문서 관리 디렉토리
 ┃ ┗ 📜 style-guide.md          # 프로젝트 스타일 가이드 문서
 ┣ 📂 src                     # 소스 코드 디렉토리
 ┃ ┣ 📂 components-test         # 컴포넌트 테스트용 디렉토리 (헤더, 푸터, 사이드바 등)
 ┃ ┣ 📂 css                   # CSS 스타일 관리 디렉토리
 ┃ ┃ ┣ 📜 animation.css         # 애니메이션 효과 관련 스타일 정의
 ┃ ┃ ┣ 📜 font.css              # 폰트 스타일 정의
 ┃ ┃ ┣ 📜 globals.css           # 전역 스타일 및 CSS 변수 정의
 ┃ ┃ ┣ 📜 media.css             # 미디어 쿼리 관련 스타일 정의
 ┃ ┃ ┣ 📜 reset.css             # 브라우저 기본 스타일 초기화
 ┃ ┃ ┗ 📜 layout.css            # 레이아웃 스타일 정의
 ┃ ┣ 📂 js                    # JavaScript 파일 관리 디렉토리
 ┃ ┃ ┣ 📂 helpers               # 프로젝트 전반에서 사용할 유틸리티 함수 저장 (예: 형식 변환, 데이터 검증 등)
 ┃ ┃ ┣ 📂 lib                   # jQuery, Swiper 등의 외부 라이브러리 파일 관리
 ┃ ┃ ┣ 📂 services              # 비즈니스 로직 및 API 요청 관련 모듈 관리
 ┃ ┃ ┗ 📜 index.js              # 프로젝트 공통 초기화 및 진입점 스크립트
 ┃ ┣ 📂 pages                 # 각 페이지별 파일 저장 디렉토리
 ┃ ┃ ┣ 📂 about                 # About 페이지 관련 파일 저장
 ┃ ┃ ┣ 📂 contact               # Contact 페이지 관련 파일 저장
 ┃ ┃ ┗ 📂 main                  # Main 페이지 관련 파일 저장
 ┣ 📜 index.html              # 웹사이트 메인 진입점 HTML 파일
 ┗ 📜 README.md               # 프로젝트 설명


```

##  기타 작업 가이드
1. 프로젝트 복사 후 디렉토리 이름을 [프로젝트이름] 형식으로 변경 후 작업.
2. 불필요한 파일, 코드, 주석. 폰트 삭제 후 작업 진행.
3. CSS는 globals.css에서 글로벌 변수 관리. 필요 시 추가.
4. 외부 라이브러리(AOS, Swiper 등)는 CDN 사용을 권장하지만, 주요 스크립트와 스타일은 로컬 파일로 관리.
5. HTML5 Boilerplate, Google Web Fundamentals, 그리고 오픈소스 프로젝트 사례를 종합적으로 참고.
