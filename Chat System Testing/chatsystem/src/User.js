import { useState, useEffect } from "react";
import axios from "axios";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 1000); // fetch messages every second

    return () => clearInterval(interval); // clear interval on component unmount
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/get_messages");
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    try {
      await axios.post("http://localhost:5000/send_message", { text: input });
      setInput("");
      // No need to call fetchMessages here because the interval will auto-fetch
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div style={{ height: "400px", overflowY: "scroll", border: "1px solid gray", padding: "10px" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
            <b>{msg.sender === "user" ? "You" : "Admin"}:</b> {msg.text}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "10px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          style={{ width: "70%", marginRight: "10px" }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
