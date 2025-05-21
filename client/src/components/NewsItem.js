// // src/components/NewsItem.js

// import "../styles/components.css";
// import TTSButton from "./TTSButton";

// export default function NewsItem({ article, onSummarize, onToggleBookmark, isBookmarked }) {
//   const { title, description, content, urlToImage, publishedAt, url } = article;
//   const fullText = `${title}\n\n${description}\n\n${content}`;

//   return (
//     <div className="news-card">
//       {urlToImage && <img src={urlToImage} className="thumbnail" alt="썸네일" />}
//       <h2>{title}</h2>
//       <p className="date">{publishedAt?.slice(0, 10)}</p>
//       <p>{description}</p>

//       <div className="news-actions">
//         <button onClick={() => onSummarize(fullText, url, urlToImage)} className="action-btn">
//           요약하기
//         </button>
//       {/* TTS 버튼 */}
//       <TTSButton text={fullText} />

//         <button
//           onClick={() => onToggleBookmark(article)}
//           className={`bookmark-btn ${isBookmarked ? "bookmarked" : ""}`}
//         >
//           {isBookmarked ? "⭐" : "☆"}
//         </button>
//       </div>
//     </div>
//   );
// }




import "../styles/components.css";
import TTSButton from "./TTSButton";

export default function NewsItem({
  article,
  onSummarize,
  onToggleBookmark,
  isBookmarked,
  onMarkRead,
  isRead
}) {
  const { title, description, content, urlToImage, publishedAt, url } = article;
  const fullText = `${title}\n\n${description}\n\n${content}`;

  return (
    <div className={`news-card ${isRead ? "read" : ""}`}>
      {/* 읽음 뱃지 */}
      {isRead && <span className="read-badge">읽음</span>}

      {urlToImage && <img src={urlToImage} className="thumbnail" alt="썸네일" />}
      <h2>{title}</h2>
      <p className="date">{publishedAt?.slice(0, 10)}</p>
      <p>{description}</p>

      <div className="news-actions">
        <button
          onClick={() => {
            onMarkRead(article);
            onSummarize(fullText, url, urlToImage);
          }}
          className="action-btn"
        >
          요약하기
        </button>

        {/* TTS 버튼 */}
        <TTSButton text={fullText} />

        <button
          onClick={() => onToggleBookmark(article)}
          className={`bookmark-btn ${isBookmarked ? "bookmarked" : ""}`}
        >
          {isBookmarked ? "⭐" : "☆"}
        </button>
      </div>
    </div>
  );
}
