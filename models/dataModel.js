const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  core: String,
  task1: Number,
  task2: Number,
  task3: Number,
  task4: Number,
  task5: Number,
});

module.exports = mongoose.model("Data", dataSchema);
