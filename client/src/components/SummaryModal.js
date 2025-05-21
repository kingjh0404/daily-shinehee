import "../styles/components.css";

export default function SummaryModal({ summary, articleUrl, imageUrl, isLoading, onClose }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(summary)
      .then(() => alert("✅ 요약 내용이 복사되었습니다."))
      .catch((err) => console.error("❌ 복사 실패:", err));
  };

  const shareUrl = encodeURIComponent(articleUrl || window.location.href);
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${shareUrl}`;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        {imageUrl && (
          <div className="image-container">
            <img src={imageUrl} alt="기사 이미지" />
          </div>
        )}

        <div className="summary-container">
          {isLoading ? (
            <div className="loading">
              <img src="/images/loading.gif" alt="로딩 중" className="loading-gif" />
              <p>요약 중입니다...</p> {/* ✨ 원하면 이 글자 지워도 됨 */}
            </div>
          ) : (
            <div className="modal-summary">{summary}</div>
          )}
        </div>

        {!isLoading && (
          <div className="modal-actions">
  <button onClick={handleCopy} className="action-btn">
    복사하기
  </button>
  <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="action-btn">
    트위터 공유
  </a>
  {articleUrl && (
    <a href={articleUrl} target="_blank" rel="noopener noreferrer" className="action-btn">
      원문 보기
    </a>
  )}
</div>

        )}
      </div>
    </div>
  );
}
