import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  styled,
} from "@mui/material";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: theme.spacing(8),
}));

const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

const StyledSubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    console.log({ username, password });
    navigate("/chat");
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <StyledForm onSubmit={handleLogin}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledSubmitButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Login
        </StyledSubmitButton>
      </StyledForm>
      <Typography variant="body2">
        Don't have an account?{" "}
        <Link component={RouterLink} to="/signup">
          Sign up
        </Link>
      </Typography>
    </StyledContainer>
  );
}

export default Login;
