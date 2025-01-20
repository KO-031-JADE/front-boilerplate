# megakit_basic_Boilerplate

**미드킷 보일러플레이트 저장소입니다.**  

***

## 프로젝트 제목 컨벤션 🐈

1. **[날짜_프로젝트이름]** 디렉토리 생성
2. ex )  
      202411_awards  
      202407_climate-change
***

## 기본 특징 🐉

1. **신규 페이지 전용**: 신규사이트, 웹 앱 제작에 적합.
2. **사용 기술**: HTML, CSS, jQuery, JavaScript.
3. **JS 패턴**: 기본 모듈화 사용, 함수 표현식(`const`) 지향 하지만 프로젝트 규모가 작은 경우이므로 선언식 사용.
4. **CDN 사용 지향**: 캐싱 및 로드 성능 최적화.
5. **프로젝트 시작**: 복사 후 디렉토리 이름 변경 및 불필요한 요소 제거.
6. **CSS 전역 관리**: `globals.css`로 CSS 변수 통합 관리.

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
- **함수 선언식과 함수 표현식을 상황에 맞게 사용**
- 예시:
  ```javascript
  // 함수 선언식은 코드 상단에서 선언되었지만, 아래 코드에서도 호출할 수 있음
  function doSomething() {
      console.log("Hello");
  }

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
📦megakit_basic               # 미드킷 보일러플레이트 프로젝트 루트 디렉토리
 ┣ 📂assets                    # 정적 파일 저장 디렉토리
 ┃ ┣ 📂fonts                      # 웹사이트에서 사용하는 폰트 파일 저장
 ┃ ┣ 📂icons                      # 아이콘 파일 저장 (SVG, PNG 등)
 ┃ ┗ 📂images                     # 이미지 파일 저장 (JPG, PNG 등)
 ┣ 📂src                        # 소스 코드 디렉토리
 ┃ ┣ 📂pages                     # 개별 페이지 관리
 ┃ ┃ ┣ 📂about                    # About 임시 페이지
 ┃ ┃ ┣ 📂contact                  # Contact 임시 페이지
 ┃ ┃ ┗ 📂main                     # 메인 페이지
 ┃ ┣ 📂scripts                   # 공통 스크립트 관리
 ┃ ┃ ┣ 📂helpers                  # 유틸리티 함수 모음 (예: 날짜 포맷 변환)
 ┃ ┃ ┣ 📂lib                      # 외부 스크립트 라이브러리 (예: Swiper, Jquery)
 ┃ ┃ ┣ 📂services                 # API 통신 및 서비스 로직 관리
 ┃ ┃ ┗ 📜main.js                  # 프로젝트 전체에서 사용하는 공통 스크립트
 ┃ ┣ 📂styles                    # 전역 스타일 관리
 ┃ ┃ ┣ 📂lib                      # 외부 CSS 라이브러리 (예: AOS)
 ┃ ┃ ┣ 📜animation.css            # 애니메이션 효과 관련 스타일
 ┃ ┃ ┣ 📜font.css                 # 폰트 스타일 정의
 ┃ ┃ ┣ 📜globals.css              # 전역 스타일 및 변수 정의
 ┃ ┃ ┣ 📜media.css                # 미디어 쿼리 스타일 정의
 ┃ ┃ ┣ 📜reset.css                # 기본 브라우저 스타일 초기화
 ┃ ┃ ┗ 📜style.css                # 프로젝트 공통 스타일
 ┣ 📜index.html                 # 메인 진입점 HTML
 ┗ 📜README.md                  # 프로젝트 설명 파일


```

##  기타 작업 가이드
1. 프로젝트 복사 후 디렉토리 이름을 [날짜_프로젝트이름] 형식으로 변경 후 작업.
2. 불필요한 파일, 코드, 주석. 폰트 삭제 후 작업 진행.
3. CSS는 globals.css에서 글로벌 변수 관리. 필요 시 추가.
4. 외부 라이브러리(AOS, Swiper 등)는 CDN 사용을 권장하지만, 주요 스크립트와 스타일은 로컬 파일로 관리.
5. HTML5 Boilerplate, Google Web Fundamentals, 그리고 오픈소스 프로젝트 사례를 종합적으로 참고.
