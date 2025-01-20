# Boilerplate

## Intro

**Minikit** 및 **Midkit** 보일러플레이트는 경량의 이벤트, 캠페인, 랜딩 페이지를 빠르게 개발하기 위한 템플릿입니다.
- **Minikit**: 단일 페이지 이벤트/캠페인에 최적화.
- **Midkit**: 다중 페이지 기반의 소규모 웹사이트 제작에 적합.

이 템플릿은 개발 생산성을 높이고 유지보수를 용이하게 하며, 번들러나 프레임워크 없이 기본적인 HTML, CSS, JavaScript만으로 구성되었습니다.

---

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Project Naming Convention](#프로젝트-제목-컨벤션-🐈)
3. [Minikit Features](#minikit-특징-🌟)
4. [Midkit Features](#midkit-특징-🐉)
5. [Directory Structure](#디렉토리-구조-🧱)
   - [Minikit Structure](#minikit)
   - [Midkit Structure](#midkit)

---

## 프로젝트 제목 컨벤션 🐈

- 디렉토리 이름은 다음 형식을 따릅니다:
  - Minikit: **[날짜_프로젝트이름]**
  - Midkit: **[프로젝트이름]**
- 예시:
  - Minikit: `202411_awards`
  - Midkit: `climate-change`

---

## Minikit 특징 🌟
- **Lightweight Single Page**: 단일 페이지 캠페인/이벤트 개발에 최적화.
- **Simple CSS Management**: `globals.css`로 전역 스타일 관리.
- **No Build Tools**: 번들러와 트랜스파일러 없이 개발 가능.

---

## Midkit 특징 🐉

- **Multi-Page Support**: 다중 페이지 기반의 소규모 프로젝트 지원.
- **Component-Based Structure**: `components-test` 디렉토리를 통한 재사용 가능한 컴포넌트 관리.
- **CDN Preferred**: 외부 리소스는 CDN 활용, 필요 시 로컬 사용 가능.

---

## 디렉토리 구조 🧱

### Minikit
```
📦 Minikit
 ├── 📂 assets
 │   ├── 📂 styles               # CSS 파일 저장소
 │   ├── 📂 scripts              # JavaScript 파일 저장소
 │   └── 📂 images               # 이미지 리소스 저장소
 ├── 📄 index.html               # 메인 HTML 파일
 └── 📄 README.md                # 프로젝트 설명 파일

```

### Midkit
```
📦 Midkit
 ├── 📂 assets                   # 정적 리소스 (폰트, 이미지 등)
 ├── 📂 docs                     # 가이드 문서
 ├── 📂 components-test          # 테스트용 컴포넌트 디렉토리
 ├── 📂 css                      # CSS 스타일 관리 디렉토리
 ├── 📂 js                       # JavaScript 관리 디렉토리
 ├── 📂 pages                    # 각 페이지별 HTML, CSS, JS 관리
 ├── 📄 index.html               # 메인 HTML 파일
 └── 📄 README.md                # 프로젝트 설명 파일

```