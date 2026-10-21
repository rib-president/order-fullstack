# order-fullstack

상품 조회부터 장바구니, 주문까지 처리하는 주문 서비스를 클라이언트와 서버 모두 직접 구현한 프로젝트입니다.

## 구성

- **client**: React 19, Vite, Tailwind CSS, React Router, TanStack Query 기반 웹 화면
- **server**: Node.js, Express 5 기반 API 서버

## 주요 기능

- 상품 목록: 상품명, 상품 번호 검색, 가격 범위 필터, 가격순, 최신순 정렬, 페이징
- 상품 상세 조회
- 장바구니 담기, 수량 변경, 삭제 (express-session 세션에 저장)
- 장바구니 상품 주문: 재고 확인 후 차감, 주문한 상품은 장바구니에서 제거

## API

| Method | Endpoint | 설명 |
| --- | --- | --- |
| GET | `/products` | 상품 목록 (`type`, `keyword`, `min`, `max`, `sort`, `page`, `size`) |
| GET | `/products/:id` | 상품 상세 |
| GET | `/cart` | 장바구니 조회 |
| POST | `/cart` | 장바구니 담기 |
| PATCH | `/cart/:id` | 장바구니 수량 변경 |
| DELETE | `/cart/:id` | 장바구니 삭제 |
| POST | `/order` | 주문 |

## 데이터 저장

별도 DB는 사용하지 않았습니다.

- 상품: `server/data/products.js`를 파일 DB처럼 사용
- 장바구니: 세션에 저장 (`server/index.js`)

## 실행 방법

```bash
# server (http://localhost:4000)
cd server
npm install
node index.js

# client (http://localhost:5173)
cd client
npm install
npm run dev
```
