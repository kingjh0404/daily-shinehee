// // frontend/src/App.js
// import React, { useState, useEffect } from "react";
// import Header from "./components/Header";
// import CategoryFilter from "./components/CategoryFilter";
// import NewsList from "./components/NewsList";
// import SummaryModal from "./components/SummaryModal";
// import "./styles/components.css";

// export default function App() {
//   const [summary, setSummary] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [articleUrl, setArticleUrl] = useState(""); // 기사 원문 URL 상태 추가
//   const [category, setCategory] = useState("사회"); // 기본 카테고리
//   const [trendingKeywords, setTrendingKeywords] = useState([]);
//   const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태

//   // 뉴스 요약 요청 함수 (기사 내용과 URL을 함께 전달)
//   const handleSummarize = async (content, url) => {
//     console.log("📤 요약 요청 보내는 내용:", content);
//     console.log("📤 기사 URL:", url);

//     // 기사 URL을 상태에 저장
//     setArticleUrl(url);

//     try {
//       const res = await fetch("http://localhost:5001/api/summarize", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ content, articleUrl: url }),
//       });

//       const data = await res.json();
//       console.log("📥 GPT 응답:", data);
//       setSummary(data.summary);
//       setShowModal(true);
//     } catch (error) {
//       console.error("❌ 요약 요청 실패:", error);
//     }
//   };

//   const fetchTrendingKeywords = () => {
//     fetch("http://localhost:5001/api/trending")
//       .then((res) => res.json())
//       .then((data) => setTrendingKeywords(data.keywords || []))
//       .catch((err) => console.error("실시간 검색어 로딩 실패", err));
//   };

//   useEffect(() => {
//     fetchTrendingKeywords();
//   }, []);

//   return (
//     <div className="app-container">
//       <Header
//         trending={trendingKeywords}
//         onRefreshTrending={fetchTrendingKeywords}
//         onSearch={setSearchQuery} // 통일된 prop 이름 사용
//       />
//       <CategoryFilter
//         selectedCategory={category}
//         onSelectCategory={(newCategory) => {
//           setCategory(newCategory);
//           setSearchQuery(""); // 카테고리 변경 시 검색어 초기화(선택사항)
//         }}
//       />
//       {/* NewsList에 검색어와 카테고리 모두 전달 */}
//       <NewsList
//         category={category}
//         searchQuery={searchQuery}
//         onSummarize={handleSummarize}
//       />
//       {showModal && (
//         <SummaryModal
//           summary={summary}
//           articleUrl={articleUrl} // 원문 링크 전달
//           onClose={() => setShowModal(false)}
//         />
//       )}
//     </div>
//   );
// }






// App.js
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import NewsList from "./components/NewsList";
import SummaryModal from "./components/SummaryModal";
import "./styles/components.css";

export default function App() {
  const [summary, setSummary] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [articleUrl, setArticleUrl] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // 추가: 이미지 URL 상태
  const [category, setCategory] = useState("사회");
  const [trendingKeywords, setTrendingKeywords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // 요약 요청 함수 (기사 내용, 기사 URL, 이미지 URL을 함께 전달)
  const handleSummarize = async (content, url, urlToImage) => {
    console.log("📤 요약 요청 기사 본문:", content);
    console.log("📤 기사 URL:", url);
    console.log("📤 기사 이미지 URL:", urlToImage);

    setArticleUrl(url);
    setImageUrl(urlToImage); // 이미지 URL도 저장

    try {
      const res = await fetch("http://localhost:5001/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, articleUrl: url }),
      });

      const data = await res.json();
      console.log("📥 GPT 응답:", data);

      setSummary(data.summary);
      setShowModal(true);
    } catch (error) {
      console.error("❌ 요약 요청 실패:", error);
    }
  };

  const fetchTrendingKeywords = () => {
    fetch("http://localhost:5001/api/trending")
      .then((res) => res.json())
      .then((data) => setTrendingKeywords(data.keywords || []))
      .catch((err) => console.error("실시간 검색어 로딩 실패", err));
  };

  useEffect(() => {
    fetchTrendingKeywords();
  }, []);

  return (
    <div className="app-container">
      <Header
        trending={trendingKeywords}
        onRefreshTrending={fetchTrendingKeywords}
        onSearch={setSearchQuery}
      />
      <CategoryFilter
        selectedCategory={category}
        onSelectCategory={(newCategory) => {
          setCategory(newCategory);
          setSearchQuery("");
        }}
      />
      <NewsList
        category={category}
        searchQuery={searchQuery}
        onSummarize={handleSummarize}
      />
      {showModal && (
        <SummaryModal
          summary={summary}
          articleUrl={articleUrl}
          imageUrl={imageUrl}  
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
