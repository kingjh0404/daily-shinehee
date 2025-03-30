import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import NewsList from "./components/NewsList";
import SummaryModal from "./components/SummaryModal";

export default function App() {
  const [summary, setSummary] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState("사회"); // 기본값
  const [trendingKeywords, setTrendingKeywords] = useState([]);

  const handleSummarize = async (content) => {
    try {
      const res = await fetch("http://localhost:5001/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      setSummary(data.summary);
      setShowModal(true);
    } catch (error) {
      console.error("요약 요청 실패:", error);
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
       <Header trending={trendingKeywords} onRefreshTrending={fetchTrendingKeywords} />
      <CategoryFilter selectedCategory={category} onSelectCategory={setCategory} />
<NewsList category={category} onSummarize={handleSummarize} />
      {showModal && (
        <SummaryModal summary={summary} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
