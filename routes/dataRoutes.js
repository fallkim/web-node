const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  processData,
  getDataAndStats,
  generateLargeData,
} = require("../services/dataService");

const router = express.Router();

/**
 * @openapi
 * /data/upload:
 *   post:
 *     summary: 데이터 파일 업로드
 *     description: 파일을 업로드하고 데이터베이스에 저장하기 위해 처리합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: 업로드할 데이터 파일.
 *     responses:
 *       200:
 *         description: 파일이 업로드되었고 데이터가 성공적으로 처리되었습니다.
 *       400:
 *         description: 파일 업로드 중 오류가 발생했습니다.
 */
router.post("/upload", upload.single("file"), processData);

/**
 * @openapi
 * /data:
 *   get:
 *     summary: 모든 데이터 검색
 *     description: 데이터베이스에서 모든 데이터 항목을 검색합니다.
 *     responses:
 *       200:
 *         description: 데이터가 성공적으로 검색되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       core:
 *                         type: string
 *                         description: 핵심 식별자.
 *                       task1:
 *                         type: number
 *                         description: 작업 1의 값.
 *                       task2:
 *                         type: number
 *                         description: 작업 2의 값.
 *                       task3:
 *                         type: number
 *                         description: 작업 3의 값.
 *                       task4:
 *                         type: number
 *                         description: 작업 4의 값.
 *                       task5:
 *                         type: number
 *                         description: 작업 5의 값.
 *                 stats:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       task:
 *                         type: string
 *                         description: 작업 이름.
 *                       mean:
 *                         type: number
 *                         description: 작업의 평균값.
 *                       stdDev:
 *                         type: number
 *                         description: 작업의 표준편차.
 *       500:
 *         description: 데이터베이스에서 데이터를 검색하는 동안 오류가 발생했습니다.
 */
router.get("/", getDataAndStats);

router.get("/generate-large-data", generateLargeData);

module.exports = router;
