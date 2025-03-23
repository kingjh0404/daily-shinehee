// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;






import React, { useState } from "react";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import NewsList from "./components/NewsList";
import SummaryModal from "./components/SummaryModal";

export default function App() {
  const [summary, setSummary] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSummarize = async (content) => {
    try {
      const res = await fetch("http://localhost:5001/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();
      setSummary(data.summary);
      setShowModal(true);
    } catch (error) {
      console.error("요약 요청 실패:", error);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <CategoryFilter />
      <NewsList onSummarize={handleSummarize} />
      {showModal && (
        <SummaryModal summary={summary} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}