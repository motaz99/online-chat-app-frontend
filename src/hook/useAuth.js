import { useEffect, useState } from "react";

// Example custom hook to check authentication status
function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated (e.g., check JWT token in cookie)
    const isAuthenticated = !!localStorage.getItem("token"); // Check for token in local storage
    setAuthenticated(isAuthenticated);
  }, []);

  return authenticated;
}

export default useAuth;
