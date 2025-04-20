// import "../styles/components.css";
// import logo from "../assets/logo.png";
// import { useState } from "react";

// export default function Header({ trending = [], onRefreshTrending, onSearch }) {
//   const [searchValue, setSearchValue] = useState("");

//   const handleInputChange = (e) => {
//     setSearchValue(e.target.value);
//     onSearch(e.target.value);
//   };

//   const handleSearchClick = () => {
//     // 검색 버튼 클릭 시 onRefreshTrending() 호출 (필요에 따라 다른 동작 추가 가능)
//     onRefreshTrending();
//   };

//   return (
//     <header className="header">
//       <img src={logo} alt="로고" className="header-logo" />
//       <div className="search-container">
//         <div className="search-box">
//           <input
//             type="text"
//             placeholder="검색어 입력"
//             value={searchValue}
//             onChange={handleInputChange}
//           />
//           <button onClick={handleSearchClick}>검색</button>
//         </div>
//         <h4 className="trending-title">실시간 검색 순위</h4>
//         <ul className="trending-list">
//           {trending.map((item, index) => (
//             <li key={index} className="trending-item">
//               {index + 1}위 - {item.length > 17 ? item.slice(0, 25) + "..." : item}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </header>
//   );
// }







import "../styles/components.css";
import { useState } from "react";
import { Newspaper, Search } from "lucide-react"; // ✅ 아이콘 추가

export default function Header({ trending = [], onRefreshTrending, onSearch }) {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    onSearch(e.target.value);
  };

  const handleSearchClick = () => {
    onRefreshTrending();
  };

  return (
    <header className="header">
      {/* 말풍선 스타일 헤더 */}
      <div className="header-left">
      <img src="/images/reproter.png" alt="기자 캐릭터" className="header-character" />

        <div className="speech-bubble">
          <span className="header-title">Daily Shinehee</span>
        </div>
        <img src="/images/icon.png" alt="기자 이아콘" className="header-icon" />
      </div>

      {/* 검색 및 실시간 검색어 */}
      <div className="search-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="검색어 입력"
            value={searchValue}
            onChange={handleInputChange}
          />
          <button onClick={handleSearchClick}>
            <Search size={18} style={{ marginRight: 4 }} /> 검색
          </button>
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
