const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// ✅ 요약 API
app.post("/api/summarize", (req, res) => {
  const { content } = req.body;
  console.log("요약 요청 받은 내용:", content);

  // GPT 연동 전: 임시 응답
  res.json({ summary: "이것은 요약된 뉴스 내용입니다." });
});

// ✅ 뉴스 API
const NEWS_API_KEY = "d17e39c3c9b94e4599033da62bc35caa";

app.get("/api/news", async (req, res) => {
  const koreanCategory = req.query.category || "사회"; // 기본값: 사회

  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: koreanCategory, // 핵심 포인트! 검색어로 사용
        language: "ko", // 한국어 뉴스만
        sortBy: "publishedAt", // 최신순 정렬
        pageSize: 10,
        apiKey: NEWS_API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("❌ 뉴스 로딩 실패:", error.message);
    res.status(500).json({ error: "뉴스 로딩 실패" });
  }
});

// ✅ 실시간 검색어 생성 API
// app.get("/api/trending", async (req, res) => {
//   try {
//     const response = await axios.get("https://newsapi.org/v2/everything", {
//       params: {
//         q: "한국",
//         language: "ko",
//         sortBy: "publishedAt",
//         pageSize: 30,
//         apiKey: NEWS_API_KEY,
//       },
//     });

//     const articles = response.data.articles || [];
//     const allText = articles
//       .map((a) => `${a.title} ${a.description || ""}`)
//       .join(" ");

//     const keywords = getTopKeywords(allText);

//     // ✅ 여기!
//     console.log("🔥 추출된 키워드:", keywords);

//     res.json({ keywords });
//   } catch (error) {
//     console.error("실시간 키워드 생성 실패 ❌", error.message);
//     res.status(500).json({ error: "트렌드 생성 실패" });
//   }
// });

app.get("/api/trending", async (req, res) => {
  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: "한국",
        language: "ko",
        sortBy: "publishedAt",
        pageSize: 30,
        apiKey: NEWS_API_KEY,
      },
    });

    const articles = response.data.articles || [];

    // ✅ 제목 or 요약에서 문장 1개씩만 뽑기
    const keywords = articles
      .map((a) => a.title || a.description || "")
      .filter((s) => s.length >= 10)
      .slice(0, 5); // 상위 5개만

    res.json({ keywords }); // 프론트에는 그대로 넘기기
  } catch (error) {
    console.error("실시간 트렌드 생성 실패:", error.message);
    res.status(500).json({ error: "트렌드 생성 실패" });
  }
});



// ✅ 텍스트에서 단어별 등장 횟수 세는 함수
function getTopKeywords(text, count = 5) {
  const stopwords = ["있다", "있습니다", "합니다", "대한", "그리고", "했다"];

  const words = text
    .replace(/[^가-힣a-zA-Z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length >= 2 && !stopwords.includes(w)); // ← 여기

  const frequency = {};
  words.forEach((word) => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([word]) => word);
}




app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
