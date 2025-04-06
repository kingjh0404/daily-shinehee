// // components/Header.js
// import "../styles/components.css";
// import logo from "../assets/logo.png";

// export default function Header({ trending = [], onRefreshTrending }) {
//   const handleSearchClick = () => {
//     onRefreshTrending();
//   };

//   return (
//     <header className="header">
//       <img src={logo} alt="로고" className="header-logo" />
//       <div className="search-container">
//         <div className="search-box">
//           <input type="text" placeholder="검색어 입력" />
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
import logo from "../assets/logo.png";
import { useState } from "react";

export default function Header({ trending = [], onRefreshTrending, onSearch }) {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    onSearch(e.target.value);
  };

  const handleSearchClick = () => {
    // 검색 버튼 클릭 시 onRefreshTrending() 호출 (필요에 따라 다른 동작 추가 가능)
    onRefreshTrending();
  };

  return (
    <header className="header">
      <img src={logo} alt="로고" className="header-logo" />
      <div className="search-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="검색어 입력"
            value={searchValue}
            onChange={handleInputChange}
          />
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
