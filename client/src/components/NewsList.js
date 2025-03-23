// components/NewsList.js
import NewsItem from "./NewsItem";
import "../styles/components.css";

export default function NewsList({ onSummarize }) {
  return (
    <div className="news-grid">
      {[1, 2, 3, 4, 5, 6,7,8].map((id) => (
        <NewsItem key={id} onSummarize={onSummarize} />
      ))}
    </div>
  );
}