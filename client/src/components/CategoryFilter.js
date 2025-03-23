import "../styles/components.css";

const categories = ["정치", "경제", "사회", "스포츠", "문화", "국제"];

export default function CategoryFilter() {
  return (
    <div className="category-bar">
      {categories.map((cat) => (
        <button key={cat}>{cat}</button>
      ))}
    </div>
  );
}
