import "../styles/components.css";

export default function SummaryModal({ summary, articleUrl, imageUrl, onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        {/* 큰 X 버튼은 그대로 */}
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        
        {/* 제목 제거 */}

        {/* 이미지가 있다면 표시 */}
        {imageUrl && (
          <div className="image-container">
            <img src={imageUrl} alt="기사 이미지" />
          </div>
        )}

        <div className="summary-container">
          <div className="modal-summary">{summary}</div>
        </div>

        <div className="modal-actions">
          {articleUrl && (
            <a href={articleUrl} target="_blank" rel="noopener noreferrer">
              원문 보기
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
