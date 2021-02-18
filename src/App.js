import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./components/chat";
import axios from "axios";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Talk with AI</h1>
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
    axios
      .get(`https://api.pgamerx.com/ai/response?message=${msg}?language=en`)
      .then((response) => {
        // handle success
        const airesp = response.data[0];
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
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
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
  );
}

export default App;
