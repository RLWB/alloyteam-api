const express = require("express");
const cors = require("cors");
const app = express();
const news = require("./data/mock.json");



app.use(express.json());
app.use(express.urlencoded());
//app.use(cors());
app.get("/articles", (req, res) => {
  try {
    const { page, limit } = req.query;
    if (!page || !limit) throw new Error("page或者limit必须为数字");
    const total = news.length;
    const index = (page - 1) * limit;
    const result = [...news].splice(index, limit);
    res.send({ data: result, total, page, limit, code: 200 });
  } catch (error) {
    res.send({
      code: 400,
      msg: error.message,
    });
  }
});
app.post("/articles/:id", (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("id不能为空");
    const detail = news.find((item) => item.id == id);
    if (!detail) throw new Error("文章不存在");
    res.send({ data: detail, code: 200 });
  } catch (error) {
    res.send({
      code: 400,
      msg: error.message,
    });
  }
});

app.listen(3001, () => {
  console.log("Server is running in http://localhost:3001");
});
