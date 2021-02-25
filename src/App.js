import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./components/chat";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Made with ❤️ by Swas.py </h1>
      </header>

      <section>
        <ChatRoom />
      </section>
    </div>
  );
}

function ChatRoom() {
  const dummy = useRef(null);
  const [messages, setMessage] = useState([]);
  const [formValue, setFormValue] = useState("");

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.uid === 1) {
      const placeHolder = {
        id: "_" + Math.random().toString(36).substr(2, 9),
        text: "thinking...",
        uid: 2,
      };
      setMessage([...messages, placeHolder]);
      dummy.current.scrollIntoView({ behavior: "smooth" });
      message(lastMsg.text);
    }
  });

  const message = async (msg) => {
    let res = await fetch(`https://api.pgamerx.com/ai/response?message=${msg}`)
    let json = await res.json()
    const airesp = json[0];
    const uid = 2;

     setMessage([
          ...messages,
          {
            id: "_" + Math.random().toString(36).substr(2, 9),
            text: airesp,
            uid,
          },
        ]);
        dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    let uid = 1;

    const newMsg = {
      id: "_" + Math.random().toString(36).substr(2, 9),
      text: formValue,
      uid,
    };

    setMessage([...messages, newMsg]);
    setFormValue("");

    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <p></p>
        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Type your text here!"
        />

        <button type="submit" disabled={!formValue}>
          ➤
        </button>
      </form>
    </>
  );}

export default App;
