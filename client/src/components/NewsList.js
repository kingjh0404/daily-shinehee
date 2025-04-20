// // components/NewsList.js
// import { useEffect, useState } from "react";
// import NewsItem from "./NewsItem";
// import "../styles/components.css";

// export default function NewsList({ category, onSummarize }) {
  
//   const [news, setNews] = useState([]);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const res = await fetch(`http://localhost:5001/api/news?category=${category}`);
//         const data = await res.json();
//         setNews(data.articles);
//       } catch (error) {
//         console.error("뉴스 로딩 실패:", error);
//       }
//     };

//     fetchNews();
//   }, [category]);


// return (
//   <div className="news-grid">
//     {news.map((item, index) => (
//       <NewsItem
//         key={index}
//         article={item}
//         onSummarize={onSummarize}
//       />
//     ))}
//   </div>
// );
// }





// // frontend/src/components/NewsList.js
// import { useEffect, useState } from "react";
// import NewsItem from "./NewsItem";
// import "../styles/components.css";

// export default function NewsList({ category, searchQuery, onSummarize }) {
//   const [news, setNews] = useState([]);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         // 검색어가 있으면 query 파라미터, 없으면 카테고리로 검색
//         const queryParam = searchQuery ? `query=${encodeURIComponent(searchQuery)}` : `category=${encodeURIComponent(category)}`;
//         const res = await fetch(`http://localhost:5001/api/news?${queryParam}`);
//         const data = await res.json();
//         setNews(data.articles);
//       } catch (error) {
//         console.error("뉴스 로딩 실패:", error);
//       }
//     };

//     fetchNews();
//   }, [category, searchQuery]);

//   return (
//     <div className="news-grid">
//       {news.map((item, index) => (
//         <NewsItem key={index} article={item} onSummarize={onSummarize} />
//       ))}
//     </div>
//   );
// }







import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import "../styles/components.css";

export default function NewsList({ category, searchQuery, onSummarize }) {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setError(null);
        const queryParam = searchQuery 
          ? `query=${encodeURIComponent(searchQuery)}` 
          : `category=${encodeURIComponent(category)}`;
        const res = await fetch(`http://localhost:5001/api/news?${queryParam}`);
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const data = await res.json();
        setNews(data.articles || []);
      } catch (error) {
        console.error("뉴스 로딩 실패:", error);
        setNews([]);
        setError("뉴스를 불러올 수 없습니다.");
      }
    };

    fetchNews();
  }, [category, searchQuery]);

  return (
    <div className="news-grid">
      {news.length > 0 ? (
        news.map((item, index) => (
          <NewsItem key={index} article={item} onSummarize={onSummarize} />
        ))
      ) : (
        <div className="news-fallback">
          {/* {error ? error : "현재 보여줄 뉴스가 없습니다."} */}
        </div>
      )}
    </div>
  );
}
