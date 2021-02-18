import React from "react";

export default function ChatMessage(props) {
  const { text, uid } = props.message;

  const messageClass = uid === 1 ? "sent" : "received";
  const imageURL =
    uid === 1
      ? "https://img.icons8.com/color/48/000000/fox.png"
      : "https://img.icons8.com/fluent/48/000000/bird.png";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={imageURL} />
        {text === "thinking..." ? <Typing /> : <p>{text}</p>}
      </div>
    </>
  );
}

const Typing = () => (
  <div className="typing">
    <div className="typing__dot"></div>
    <div className="typing__dot"></div>
    <div className="typing__dot"></div>
  </div>
);
