const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.post("/api/summarize", (req, res) => {
  const { content } = req.body;
  console.log("요약 요청 받은 내용:", content);

  // GPT 연동 전: 임시 응답
  res.json({ summary: "이것은 요약된 뉴스 내용입니다." });
});

app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
