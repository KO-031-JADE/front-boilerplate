# 미드킷 베이직 보일러플레이트 스타일 가이드

이 문서는 미드킷 베이직 보일러플레이트 프로젝트의 일관성과 가독성을 유지하기 위한 스타일 가이드입니다. 아래의 규칙과 권장 사항을 따라 코드 품질과 협업 효율성을 높일 수 있습니다.

---

## 1. HTML 스타일 가이드

### 1.1 시맨틱 마크업
- 시맨틱 HTML5 태그(예: `<header>`, `<footer>`, `<section>`, `<article>`)를 사용하여 콘텐츠를 논리적으로 구조화.

### 1.2 속성 순서
- 속성의 순서를 일관되게 유지하여 가독성 향상:
  1. `id`
  2. `class`
  3. `data-*`
  4. ARIA 속성(예: `aria-label`, `role`)
  5. 기타 속성

**예시:**
```html
<button id="submit" class="btn primary" data-action="submit" aria-label="양식 제출">제출</button>
```

### 1.3 들여쓰기 및 줄 바꿈
- 들여쓰기는 **2칸**을 사용.
- 속성이 많은 경우 줄 바꿈을 통해 가독성을 향상.

**예시:**
```html
<img
  src="image.jpg"
  alt="설명 텍스트"
  width="600"
  height="400"
/>
```

---

## 2. CSS 스타일 가이드

### 2.1 파일 구조
- 전역 스타일과 컴포넌트별 스타일을 분리.
  - `globals.css`에는 전역 변수, 초기화 스타일 및 유틸리티 클래스를 정의.
  - 컴포넌트별 스타일은 해당 컴포넌트 폴더에 배치.

### 2.2 네이밍 규칙
- **BEM(Block Element Modifier)** 방법론:
  - Block: `.card`
  - Element: `.card__header`
  - Modifier: `.card--highlighted`

**예시:**
```css
.card {
  background-color: #fff;
  border: 1px solid #ddd;
}

.card__header {
  font-size: 1.5rem;
  font-weight: bold;
}

.card--highlighted {
  border-color: #f39c12;
}
```

### 2.3 미디어 쿼리
- 모바일 우선 접근 방식을 사용하고, 점진적으로 큰 화면을 위한 브레이크포인트를 정의.

**예시:**
```css
.button {
  font-size: 1rem;
}

@media (min-width: 768px) {
  .button {
    font-size: 1.25rem;
  }
}
```

---

## 3. JavaScript 스타일 가이드

### 3.1 파일 구조
- JavaScript 파일을 다음과 같이 구성:
  - `helpers`: 유틸리티 함수 (예: 날짜 포맷 변환, DOM 조작).
  - `lib`: 외부 라이브러리.
  - `services`: API 호출 및 비즈니스 로직.

### 3.2 변수 네이밍
- 변수와 함수에는 **camelCase**를 사용.
- 클래스와 생성자 함수에는 **PascalCase**를 사용.

**예시:**
```javascript
const userName = 'John';

function fetchUserData() {
  // 로직 작성
}

class UserProfile {
  constructor(name) {
    this.name = name;
  }
}
```

---

## 4. 베스트 프랙티스

### 4.1 주석 작성
- **왜** 그렇게 작성했는지 설명하는 주석을 사용.
- 함수 문서화를 위해 `/** */`를 사용하세요.

**예시:**
```javascript
/**
 * 총 비용을 계산합니다.
 * @param {number} price - 개별 항목의 가격.
 * @param {number} quantity - 항목 수량.
 * @returns {number} - 총 비용.
 */
function calculateTotal(price, quantity) {
  return price * quantity;
}
```

### 4.2 성능 최적화
- DOM 조작을 최소화하기 위해 참조를 캐싱하세요.
- `var` 대신 `const`와 `let`을 사용하세요.

---

## 5. 도구와 리소스
- **HTML 유효성 검사:** [W3C Validator](https://validator.w3.org/)
- **CSS 유효성 검사:** [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)
- **JavaScript 린팅:** [ESLint](https://eslint.org/)
- **퍼포먼스 테스트:** [Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

