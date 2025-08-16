import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Link,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

 const handleSubmit = async () => {
   setError(null);
   setLoading(true);

   try {
     await login({ email, password });
     navigate("/");
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   } catch (err: any) {
     const errorMap: Record<string, string> = {
       MISSING_FIELDS: "Email and password are required",
       INVALID_CREDENTIALS: "Invalid email or password",
       SERVER_ERROR: "Server error. Please try again later",
     };

     setError(
       errorMap[err.response?.data?.error] || "Login failed. Please try again."
     );
   } finally {
     setLoading(false);
   }
 };
  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        error={!!error && !email}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        error={!!error && !password}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Login"}
      </Button>
      <Typography sx={{ mt: 2 }}>
        Don't have an account? <Link href="/register">Register</Link>
      </Typography>
    </Container>
  );
};
