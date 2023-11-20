import React from "react";
import { useRef, useEffect } from "react";
export default function Message({ text, status }) {
  const messageRef = useRef(null);

  useEffect(() => {
    // Scrolling to the bottom when the component is first rendered or when new messages are added
    messageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);
  return (
    <div className={`message ${status}`} ref={messageRef}>
      <div className="message-bubble">{text}</div>
    </div>
  );
}
