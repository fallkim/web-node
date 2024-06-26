# 데이터 분석 대시보드

## 프로젝트 설명

Node.js와 MongoDB를 사용하여 구축된 데이터 분석 프로젝트입니다. 웹 인터페이스를 통해 데이터 파일을 업로드하고, 처리하며, 다양한 차트를 통해 데이터를 시각화할 수 있습니다. Docker를 사용하여 컨테이너화되어 있습니다.

## 주요 기능

- **데이터 업로드**: 사용자는 웹 인터페이스를 통해 데이터 파일을 업로드할 수 있습니다.
- **데이터 처리**: 업로드된 파일은 서버에서 처리되며 MongoDB에 저장됩니다.
- **데이터 시각화**: 사용자는 다양한 차트를 통해 데이터를 시각화할 수 있습니다.
- **Docker 지원**: Docker와 Docker Compose를 사용하여 서비스를 관리하고 실행합니다.
- **API 문서화**: Swagger를 통해 API를 문서화하고 관리할 수 있습니다.

## 설치 방법

이 프로젝트를 로컬 환경에서 설정하고 실행하는 방법을 설명합니다.

### 사전 요구 사항

- Git
- Docker
- Docker Compose

### 설치 절차

1. **레포지토리 클론하기**
   ```bash
   $ git clone https://github.com/fallkim/web-node.git
   ```
   ```bash
   $ cd web-node
   ```
3. **Docker를 이용하여 서비스 실행하기**
   ```bash
   $ docker-compose up --build
   ```

### 사용방법

- 웹 인터페이스 접속: 브라우저에서 http://localhost:3000 주소로 접속합니다.
- 데이터 업로드는 '파일 선택' 버튼을 클릭하여 데이터 파일을 업로드합니다.
- 업로드된 데이터를 바탕으로 차트를 확인하고 분석할 수 있습니다.

### API 문서

<img width="800" src="https://github.com/fallkim/web-node/assets/134408891/209fbaed-c648-4891-a453-eb0219d109b4">
