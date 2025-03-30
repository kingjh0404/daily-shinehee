// // components/NewsList.js
// import React, { useEffect, useState } from "react";
// import NewsItem from "./NewsItem";
// import "../styles/components.css";

// export default function NewsList({ onSummarize }) {
//   const [articles, setArticles] = useState([]);

//   useEffect(() => {
//     // 기본: '경제' 카테고리 뉴스 가져오기
//     fetch("http://localhost:5001/api/news?category=경제")
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.articles) {
//           setArticles(data.articles);
//         }
//       })
//       .catch((err) => console.error("뉴스 로딩 실패:", err));
//   }, []);

//   return (
//     <div className="news-grid">
//       {articles.length === 0 ? (
//         <p>로딩 중이거나 뉴스가 없습니다.</p>
//       ) : (
//         articles.map((article, index) => (
//           <NewsItem key={index} article={article} onSummarize={onSummarize} />
//         ))
//       )}
//     </div>
//   );
// }



// components/NewsList.js
import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import "../styles/components.css";

export default function NewsList({ category, onSummarize }) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/news?category=${category}`);
        const data = await res.json();
        setNews(data.articles);
      } catch (error) {
        console.error("뉴스 로딩 실패:", error);
      }
    };

    fetchNews();
  }, [category]);

  return (
    <div className="news-grid">
      {news.map((item, index) => (
        <NewsItem key={index} onSummarize={onSummarize} article={item} />
      ))}
    </div>
  );
}
