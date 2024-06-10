const fs = require("fs");
const Data = require("../models/dataModel");
const { random, mean, std } = require("mathjs");

exports.processData = (req, res) => {
  const filePath = req.file.path;
  fs.readFile(filePath, "utf8", async (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("파일 읽기 오류.");
    }

    const lines = data.split("\n").filter((line) => line.trim() !== "");

    const dataToSave = lines
      .map((line) => {
        if (line.trim().startsWith("task")) {
          return null;
        }

        const parts = line.trim().split(/\s+/);
        if (parts.length < 6) {
          console.error("데이터 형식 오류:", line);
          return null;
        }

        const numbers = parts.slice(1).map(Number);

        if (numbers.some(isNaN)) {
          console.error("유효하지 않은 숫자가 포함된 라인:", line);
          return null;
        }

        return {
          core: parts[0],
          task1: numbers[0],
          task2: numbers[1],
          task3: numbers[2],
          task4: numbers[3],
          task5: numbers[4],
        };
      })
      .filter((item) => item !== null);

    const tasks = ["task1", "task2", "task3", "task4", "task5"];
    const stats = tasks.map((task) => {
      const values = dataToSave.map((d) => d[task]);
      return {
        task,
        mean: mean(values),
        stdDev: std(values),
      };
    });

    res.render("upload", { data: dataToSave, stats });
  });
};

exports.getDataAndStats = async (req, res) => {
  try {
    const data = await Data.find({});
    const tasks = ["task1", "task2", "task3", "task4", "task5"];

    const stats = tasks.map((task) => {
      const values = data.map((d) => d[task]);
      return {
        task,
        mean: mean(values),
        stdDev: std(values),
      };
    });

    res.json({ data, stats });
  } catch (error) {
    res.status(500).send("데이터를 불러오는데 실패했습니다: " + error.message);
  }
};

exports.generateLargeData = async (req, res) => {
  const numEntries = 10000;
  const dataToSave = [];

  for (let i = 0; i < numEntries; i++) {
    dataToSave.push({
      core: `core${(i % 5) + 1}`,
      task1: random(300, 1500),
      task2: random(300, 1500),
      task3: random(300, 1500),
      task4: random(300, 1500),
      task5: random(300, 1500),
    });
  }

  try {
    await Data.insertMany(dataToSave);
    res.send("대규모 데이터가 생성되어 DB에 저장됨");
  } catch (saveError) {
    console.error(saveError);
    res.status(500).send("대규모 데이터 저장 오류: " + saveError.message);
  }
};
