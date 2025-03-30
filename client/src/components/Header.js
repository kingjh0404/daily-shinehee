// import "../styles/components.css";
// import logo from "../assets/logo.png"; 
// export default function Header() {
//   const trending = [
//     "1위 - 경제 위기",
//     "2위 - 인공지능 윤리",
//     "3위 - 대통령 연설",
//     "4위 - 날씨 대혼란",
//     "5위 - 챗GPT 활용법"
//   ];

//   return (
//     <header className="header">
//       <img src={logo} alt="로고" className="header-logo" />
//       <div className="search-container">
//         <div className="search-box">
//           <input type="text"  />
//           <button>검색</button>
//           </div>
//         <h4 className="trending-title">실시간 검색 순위</h4>
//         <ul className="trending-list">
//           {trending.map((item, index) => (
//             <li key={index} className="trending-item">{item}</li>
//           ))}
//         </ul>
//       </div>
//     </header>
//   );
// }



// components/Header.js
import "../styles/components.css";
import logo from "../assets/logo.png";

export default function Header({ trending = [], onRefreshTrending }) {
  const handleSearchClick = () => {
    onRefreshTrending();
  };

  return (
    <header className="header">
      <img src={logo} alt="로고" className="header-logo" />
      <div className="search-container">
        <div className="search-box">
          <input type="text" placeholder="검색어 입력" />
          <button onClick={handleSearchClick}>검색</button>
        </div>
        <h4 className="trending-title">실시간 검색 순위</h4>
        <ul className="trending-list">
          {trending.map((item, index) => (
            <li key={index} className="trending-item">
              {index + 1}위 - {item.length > 17 ? item.slice(0, 25) + "..." : item}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
