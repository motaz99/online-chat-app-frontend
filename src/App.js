import io from "socket.io-client";
import Chat from "./components/Chat";

const socket = io.connect("http://localhost:8080");

function App() {
  return (
    <>
      <Chat socket={socket} />
    </>
  );
}

export default App;
