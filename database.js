const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/dataAnalyticsDB")
  .then(() => console.log("MongoDB 연결 성공"))
  .catch((err) => console.error("MongoDB 연결 실패:", err));

module.exports = mongoose;
