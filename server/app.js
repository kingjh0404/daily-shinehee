const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config(); // 꼭 있어야 .env 파일 불러와짐

const OpenAI = require("openai"); // ← v4 방식
const he = require("he");
const cheerio = require("cheerio"); // 새로 추가된 부분

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// ✅ OpenAI 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * URL에서 전체 기사 전문을 스크래핑하는 함수.
 * 여러 후보 CSS 선택자를 순차적으로 시도합니다.
 * @param {string} url 기사 URL
 * @returns {Promise<string|null>} 기사 전문 또는 실패 시 null 반환
 */
async function fetchArticleContent(url) {
  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    // 여러 후보 선택자들을 순차적으로 시도
    let content = $("article").text().trim();
    if (!content) {
      content = $(".article-body").text().trim();
    }
    if (!content) {
      content = $(".news-content").text().trim();
    }
    if (!content) {
      // 추가 선택자 예시: ID 선택자나 클래스 조합
      content = $("#articleBody, .article-content, .post-content").text().trim();
    }
    if (!content) {
      // 마지막으로, 모든 <p> 태그의 텍스트를 합침
      content = $("p").map((i, el) => $(el).text()).get().join("\n").trim();
    }

    return content;
  } catch (error) {
    console.error("❌ 기사 전문 스크래핑 실패:", error.message);
    return null;
  }
}

// ✅ GPT 요약 라우터
app.post("/api/summarize", async (req, res) => {
  let { content, articleUrl } = req.body;

  // articleUrl이 제공되면 해당 URL에서 기사 전문 스크래핑
  if (articleUrl) {
    console.log("📰 기사 URL로부터 전문 스크래핑:", articleUrl);
    const scrapedContent = await fetchArticleContent(articleUrl);
    if (scrapedContent) {
      content = scrapedContent;
    }
  }

  // 엔터티 디코딩 처리
  const cleanText = he.decode(content);
  console.log("📩 백엔드 수신 내용 ↓↓↓");
  console.dir(cleanText, { maxStringLength: null });

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "다음 뉴스 기사를 한국어로 자세히 요약해줘." },
        { role: "user", content: cleanText },
      ],
    });

    const summary = chatCompletion.choices[0].message.content.trim();
    console.log("✅ 요약 결과:", summary);
    res.json({ summary });
  } catch (error) {
    console.error("❌ GPT 요약 실패:", error.message);
    res.status(500).json({ error: "요약 실패" });
  }
});

// ✅ 뉴스 API (NewsAPI 사용)
// const NEWS_API_KEY = "d17e39c3c9b94e4599033da62bc35caa";


const NEWS_API_KEY = "1bbe7dd0215647ec8568adc55a0f5cc9";
// app.get("/api/news", async (req, res) => {
//   const koreanCategory = req.query.category || "사회";

//   try {
//     const response = await axios.get("https://newsapi.org/v2/everything", {
//       params: {
//         q: koreanCategory,
//         language: "ko",
//         sortBy: "publishedAt",
//         pageSize: 10,
//         apiKey: NEWS_API_KEY,
//       },
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error("❌ 뉴스 로딩 실패:", error.message);
//     res.status(500).json({ error: "뉴스 로딩 실패" });
//   }
// });


app.get("/api/news", async (req, res) => {
  // 'query' 파라미터가 있으면 검색어로, 없으면 'category' 또는 기본값 "사회"를 사용
  const searchTerm = req.query.query || req.query.category || "사회";

  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: searchTerm,
        language: "ko",
        sortBy: "publishedAt",
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


// ✅ 실시간 검색어 생성 API (간단한 문장 기반)
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

    // 제목 또는 요약 중 길이 있는 문장만 추출
    const keywords = articles
      .map((a) => a.title || a.description || "")
      .filter((s) => s.length >= 10)
      .slice(0, 5);

    res.json({ keywords });
  } catch (error) {
    console.error("실시간 트렌드 생성 실패:", error.message);
    res.status(500).json({ error: "트렌드 생성 실패" });
  }
});

// ✅ (보조 함수) 텍스트에서 단어 빈도수 기반 키워드 추출
function getTopKeywords(text, count = 5) {
  const stopwords = ["있다", "있습니다", "합니다", "대한", "그리고", "했다"];

  const words = text
    .replace(/[^가-힣a-zA-Z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length >= 2 && !stopwords.includes(w));

  const frequency = {};
  words.forEach((word) => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([word]) => word);
}




// ✅ 서버 시작
app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
