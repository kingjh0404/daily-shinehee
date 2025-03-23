import "../styles/components.css";

export default function SummaryModal({ summary, onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h2>📝 요약 결과</h2>
        <p>{summary}</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}
