import "../styles/components.css";

export default function NewsItem({ article, onSummarize }) {
  const { title, description, publishedAt, urlToImage, content } = article;

  return (
    <div className="news-card">
      {urlToImage && <img src={urlToImage} alt="썸네일" className="thumbnail" />}
      <h2>{title}</h2>
      <p className="date">{publishedAt?.slice(0, 10)}</p>
      <p>{description}</p>
      <button onClick={() => onSummarize(content)}>요약하기</button>
    </div>
  );
}
