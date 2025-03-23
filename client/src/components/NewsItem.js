import "../styles/components.css";

export default function NewsItem({ onSummarize }) {
  return (
    <div className="news-card">
      <h2>뉴스 제목 예시입니다.</h2>
      <p className="date">2025.03.23</p>
      <button onClick={() => onSummarize("이것은 뉴스 본문 내용입니다.")}>요약하기</button>
    </div>
  );
}