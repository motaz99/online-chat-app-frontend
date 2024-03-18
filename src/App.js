import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:8080");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    const newMessage = {
      sender: socket.id,
      message: message,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    socket.emit("send_message", { message, client: socket.id });

    setMessage("");
  };

  return (
    <div className="App">
      <div>
        <h1>Chat App</h1>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.client || msg.sender}: </strong> {msg.message}
          </div>
        ))}
      </div>
      <input
        placeholder="Message..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button onClick={sendMessage}> Send Message</button>
    </div>
  );
}

export default App;
