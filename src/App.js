import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./components/Chat";
import useAuth from "./hook/useAuth";

function ProtectedRoute({ element, ...rest }) {
  const isAuthenticated = useAuth();

  return isAuthenticated ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<ProtectedRoute element={<Chat />} />} />
      </Routes>
    </Router>
  );
}

export default App;
