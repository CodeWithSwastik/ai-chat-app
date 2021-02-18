import React from "react";

export default function ChatMessage(props) {
  const { text, uid } = props.message;

  const messageClass = uid === 1 ? "sent" : "received";
  const imageURL =
    uid === 1
      ? "https://www.flaticon.com/svg/vstatic/svg/826/826910.svg?token=exp=1613625262~hmac=2f2c8da1adc4e1cd9b5c4d61cb3b99d7"
      : "https://www.flaticon.com/svg/vstatic/svg/2371/2371561.svg?token=exp=1613625324~hmac=5cdb29e06e209aec972aa4359452e4d9";

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
