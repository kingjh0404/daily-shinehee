// // import { useEffect, useState } from "react";
// // import NewsItem from "./NewsItem";
// // import "../styles/components.css";

// // export default function NewsList({ category, searchQuery, onSummarize }) {
// //   const [news, setNews] = useState([]);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchNews = async () => {
// //       try {
// //         setError(null);
// //         const queryParam = searchQuery 
// //           ? `query=${encodeURIComponent(searchQuery)}` 
// //           : `category=${encodeURIComponent(category)}`;
// //         const res = await fetch(`http://localhost:5001/api/news?${queryParam}`);
// //         if (!res.ok) {
// //           throw new Error(`Request failed with status ${res.status}`);
// //         }
// //         const data = await res.json();
// //         setNews(data.articles || []);
// //       } catch (error) {
// //         console.error("뉴스 로딩 실패:", error);
// //         setNews([]);
// //         setError("뉴스를 불러올 수 없습니다.");
// //       }
// //     };

// //     fetchNews();
// //   }, [category, searchQuery]);

// //   return (
// //     <div className="news-grid">
// //       {news.length > 0 ? (
// //         news.map((item, index) => (
// //           <NewsItem key={index} article={item} onSummarize={onSummarize} />
// //         ))
// //       ) : (
// //         <div className="news-fallback">
// //           {/* {error ? error : "현재 보여줄 뉴스가 없습니다."} */}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }







// // src/components/NewsList.js
// import { useEffect, useState } from "react";
// import NewsItem from "./NewsItem";
// import "../styles/components.css";

// export default function NewsList({ category, searchQuery, onSummarize }) {
//   const [news, setNews] = useState([]);
//   const [error, setError] = useState(null);
  
//   // ① 로컬스토리지에서 초기 북마크 불러오기
//   const [bookmarks, setBookmarks] = useState(() => {
//     const saved = localStorage.getItem("bookmarks");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // ② 뉴스 가져오기
//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         setError(null);
//         const queryParam = searchQuery
//           ? `query=${encodeURIComponent(searchQuery)}`
//           : `category=${encodeURIComponent(category)}`;
//         const res = await fetch(
//           `http://localhost:5001/api/news?${queryParam}`
//         );
//         if (!res.ok) throw new Error(`${res.status}`);
//         const data = await res.json();
//         setNews(data.articles || []);
//       } catch (err) {
//         console.error("뉴스 로딩 실패:", err);
//         setNews([]);
//         setError("뉴스를 불러올 수 없습니다.");
//       }
//     };
//     fetchNews();
//   }, [category, searchQuery]);

//   // ③ 북마크 토글 함수
//   const toggleBookmark = (article) => {
//     setBookmarks((prev) => {
//       const exists = prev.some((item) => item.url === article.url);
//       const updated = exists
//         ? prev.filter((item) => item.url !== article.url)
//         : [...prev, article];

//       localStorage.setItem("bookmarks", JSON.stringify(updated));
//       return updated;
//     });
//   };

//   return (
//     <div className="news-grid">
//       {news.length > 0 ? (
//         news.map((item, idx) => (
//           <NewsItem
//             key={idx}
//             article={item}
//             onSummarize={onSummarize}
//             onToggleBookmark={toggleBookmark}
//             isBookmarked={bookmarks.some((b) => b.url === item.url)}
//           />
//         ))
//       ) : (
//         <div className="news-fallback">
//           {error || "현재 보여줄 뉴스가 없습니다."}
//         </div>
//       )}
//     </div>
//   );
// }





import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import "../styles/components.css";

export default function NewsList({ category, searchQuery, onSummarize }) {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  // ─── 읽음(article.url) 상태 관리 ───
  const [reads, setReads] = useState(() => {
    const saved = localStorage.getItem("reads");
    return saved ? JSON.parse(saved) : [];
  });

  // ─── 북마크(article 객체) 상태 관리 ───
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("bookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  // ─── 뉴스 데이터 로딩 ───
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setError(null);
        const queryParam = searchQuery
          ? `query=${encodeURIComponent(searchQuery)}`
          : `category=${encodeURIComponent(category)}`;
        const res = await fetch(
          `http://localhost:5001/api/news?${queryParam}`
        );
        if (!res.ok) throw new Error(`${res.status}`);
        const data = await res.json();
        setNews(data.articles || []);
      } catch (err) {
        console.error("뉴스 로딩 실패:", err);
        setNews([]);
        setError("뉴스를 불러올 수 없습니다.");
      }
    };
    fetchNews();
  }, [category, searchQuery]);

  // ─── 북마크 토글 ───
  const toggleBookmark = (article) => {
    setBookmarks((prev) => {
      const exists = prev.some((item) => item.url === article.url);
      const updated = exists
        ? prev.filter((item) => item.url !== article.url)
        : [...prev, article];
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      return updated;
    });
  };

  // ─── 읽음 표시(mark) ───
  const markRead = (article) => {
    setReads((prev) => {
      if (prev.includes(article.url)) return prev;
      const updated = [...prev, article.url];
      localStorage.setItem("reads", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="news-grid">
      {news.length > 0 ? (
        news.map((item, idx) => (
          <NewsItem
            key={idx}
            article={item}
            onSummarize={(fullText, url, img) => {
              markRead(item);
              onSummarize(fullText, url, img);
            }}
            onToggleBookmark={toggleBookmark}
            isBookmarked={bookmarks.some((b) => b.url === item.url)}
            onMarkRead={markRead}
            isRead={reads.includes(item.url)}
          />
        ))
      ) : (
        <div className="news-fallback">
          {error || "현재 보여줄 뉴스가 없습니다."}
        </div>
      )}
    </div>
  );
}
