const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const { mean, std } = require("mathjs");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 스웨거 설정
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "데이터 분석 API",
      version: "1.0.0",
      description: "데이터 파일을 업로드하고 처리하는 간단한 API",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "로컬 서버",
      },
    ],
  },
  apis: ["./routes/*.js"], // 파일 경로는 실제 파일 구조에 맞춰서 설정하세요
};

const swaggerSpec = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 업로드한 파일 처리 및 시각화 페이지 렌더링
app.post("/upload", upload.single("file"), (req, res) => {
  const filePath = req.file.path;
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("파일 읽기 오류.");
    }

    const lines = data.split("\n").filter((line) => line.trim() !== "");
    const dataToRender = lines
      .filter((line) => !line.trim().startsWith("task"))
      .map((line) => {
        const parts = line.trim().split(/\s+/);
        if (parts.length < 6) {
          console.error("데이터 형식 오류:", line);
          return null;
        }
        return {
          core: parts[0],
          task1: parseFloat(parts[1]),
          task2: parseFloat(parts[2]),
          task3: parseFloat(parts[3]),
          task4: parseFloat(parts[4]),
          task5: parseFloat(parts[5]),
        };
      })
      .filter(Boolean);

    // 중복된 core를 그룹화하고 평균 값 계산
    const groupedData = {};
    dataToRender.forEach((entry) => {
      if (!groupedData[entry.core]) {
        groupedData[entry.core] = {
          task1: [],
          task2: [],
          task3: [],
          task4: [],
          task5: [],
        };
      }
      groupedData[entry.core].task1.push(entry.task1);
      groupedData[entry.core].task2.push(entry.task2);
      groupedData[entry.core].task3.push(entry.task3);
      groupedData[entry.core].task4.push(entry.task4);
      groupedData[entry.core].task5.push(entry.task5);
    });

    const averagedData = Object.keys(groupedData).map((core) => {
      const tasks = groupedData[core];
      return {
        core,
        task1: mean(tasks.task1),
        task2: mean(tasks.task2),
        task3: mean(tasks.task3),
        task4: mean(tasks.task4),
        task5: mean(tasks.task5),
      };
    });

    const tasks = ["task1", "task2", "task3", "task4", "task5"];
    const stats = tasks.map((task) => {
      const values = averagedData.map((d) => d[task]);
      return {
        task,
        mean: mean(values),
        stdDev: std(values),
      };
    });

    res.render("upload", { data: averagedData, stats: stats });
  });
});

// 업로드 페이지 렌더링
app.get("/", (req, res) => {
  res.render("upload", { data: [], stats: [] });
});
