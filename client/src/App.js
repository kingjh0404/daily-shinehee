// // App.js
// import React, { useState, useEffect } from "react";
// import Header from "./components/Header";
// import CategoryFilter from "./components/CategoryFilter";
// import NewsList from "./components/NewsList";
// import SummaryModal from "./components/SummaryModal";
// import "./styles/components.css";

// export default function App() {
//   const [summary, setSummary] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [articleUrl, setArticleUrl] = useState("");
//   const [imageUrl, setImageUrl] = useState(""); // 추가: 이미지 URL 상태
//   const [category, setCategory] = useState("사회");
//   const [trendingKeywords, setTrendingKeywords] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   // 요약 요청 함수 (기사 내용, 기사 URL, 이미지 URL을 함께 전달)
//   const handleSummarize = async (content, url, urlToImage) => {
//     console.log("📤 요약 요청 기사 본문:", content);
//     console.log("📤 기사 URL:", url);
//     console.log("📤 기사 이미지 URL:", urlToImage);

//     setArticleUrl(url);
//     setImageUrl(urlToImage); // 이미지 URL도 저장

//     try {
//       const res = await fetch("http://localhost:5001/api/summarize", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
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
//         onSearch={setSearchQuery}
//       />
//       <CategoryFilter
//         selectedCategory={category}
//         onSelectCategory={(newCategory) => {
//           setCategory(newCategory);
//           setSearchQuery("");
//         }}
//       />
//       <NewsList
//         category={category}
//         searchQuery={searchQuery}
//         onSummarize={handleSummarize}
//       />
//       {showModal && (
//         <SummaryModal
//           summary={summary}
//           articleUrl={articleUrl}
//           imageUrl={imageUrl}  
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
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("사회");
  const [trendingKeywords, setTrendingKeywords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ✨ 추가: 로딩 상태

  // const handleSummarize = async (content, url, urlToImage) => {
  //   console.log("📤 요약 요청 기사 본문:", content);
  //   console.log("📤 기사 URL:", url);
  //   console.log("📤 기사 이미지 URL:", urlToImage);

  //   setArticleUrl(url);
  //   setImageUrl(urlToImage);
  //   setIsLoading(true); // ✨ 요약 시작할 때 로딩 켜기

  //   try {
  //     const res = await fetch("http://localhost:5001/api/summarize", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ content, articleUrl: url }),
  //     });

  //     const data = await res.json();
  //     console.log("📥 GPT 응답:", data);

  //     setSummary(data.summary);
  //     setShowModal(true);
  //   } catch (error) {
  //     console.error("❌ 요약 요청 실패:", error);
  //   } finally {
  //     setIsLoading(false); // ✨ 요청 끝나면 로딩 끄기
  //   }
  // };

  const handleSummarize = async (content, url, urlToImage) => {
    console.log("📤 요약 요청 기사 본문:", content);
    console.log("📤 기사 URL:", url);
    console.log("📤 기사 이미지 URL:", urlToImage);
  
    setArticleUrl(url);
    setImageUrl(urlToImage);
    setIsLoading(true);
    setShowModal(true);  // ✨ 요약 시작하자마자 모달 먼저 띄운다
  
    try {
      const res = await fetch("http://localhost:5001/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, articleUrl: url }),
      });
  
      const data = await res.json();
      console.log("📥 GPT 응답:", data);
  
      setSummary(data.summary);
    } catch (error) {
      console.error("❌ 요약 요청 실패:", error);
      setSummary("요약에 실패했습니다. 다시 시도해주세요.");  // 에러 메시지 띄우기
    } finally {
      setIsLoading(false); // ✨ 요약 끝나면 로딩 끈다
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
          isLoading={isLoading} // ✨ 추가
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
