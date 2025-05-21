// src/components/TTSButton.js
import { useState, useEffect } from "react";

export default function TTSButton({ text }) {
  const [speaking, setSpeaking] = useState(false);
  let utterance = null;

  const handleToggle = () => {
    if (!window.speechSynthesis) return alert("이 브라우저에서는 지원되지 않습니다.");

    if (speaking) {
      // 재생 중이면 중지
      window.speechSynthesis.cancel();
      setSpeaking(false);
    } else {
      // 새로 읽기 시작
      utterance = new SpeechSynthesisUtterance(text);
      // (선택) 한국어 목소리 찾기
      const voices = window.speechSynthesis.getVoices();
      const koVoice = voices.find((v) => v.lang.startsWith("ko")) || voices[0];
      utterance.voice = koVoice;
      utterance.rate = 1;      // 재생 속도 (0.1~10)
      utterance.pitch = 1;     // 음높이 (0~2)

      utterance.onstart = () => setSpeaking(true);
      utterance.onend   = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  // 크로스-브라우저를 위해 목소리 목록이 로드된 직후 갱신
  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      /* no-op, but 트리거됨 */
    };
  }, []);

  return (
    <button onClick={handleToggle} className="action-btn">
      {speaking ? "🔈" : "🔊"}
    </button>
  );
}
