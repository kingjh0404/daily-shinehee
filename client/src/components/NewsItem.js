// import "../styles/components.css";


// export default function NewsItem({ article, onSummarize }) {
//   const { title, description, publishedAt, urlToImage, content, url } = article;

//   const fullText = `${title || ""}\n\n${description || ""}\n\n${content || ""}`;

//   return (
//     <div className="news-card">
//       {urlToImage && <img src={urlToImage} alt="썸네일" className="thumbnail" />}
//       <h2>{title}</h2>
//       <p className="date">{publishedAt?.slice(0, 10)}</p>
//       <p>{description}</p>
//       <button
//         onClick={() => {
//           console.log("📰 요약 대상 기사 전체:\n", fullText); // 프론트 콘솔 로그
//           // 여기서 url도 함께 onSummarize로 전달
//           onSummarize(fullText, url);
//         }}
//       >
//         요약하기
//       </button>
//     </div>
//   );
// }




// NewsItem.js
import "../styles/components.css";

export default function NewsItem({ article, onSummarize }) {
  const { title, description, publishedAt, urlToImage, content, url } = article;
  const fullText = `${title || ""}\n\n${description || ""}\n\n${content || ""}`;

  return (
    <div className="news-card">
      {urlToImage && <img src={urlToImage} alt="썸네일" className="thumbnail" />}
      <h2>{title}</h2>
      <p className="date">{publishedAt?.slice(0, 10)}</p>
      <p>{description}</p>
      <button
        onClick={() => {
          // 요약하기 버튼 클릭 시, urlToImage도 함께 전달
          onSummarize(fullText, url, urlToImage);
        }}
      >
        요약하기
      </button>
    </div>
  );
}
