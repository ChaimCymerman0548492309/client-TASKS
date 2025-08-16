import { useForm } from "react-hook-form";
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
import { register } from "../services/api";
import { useState } from "react";

type FormData = {
  username: string;
  email: string;
  password: string;
};

export const Register = () => {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const [error, setError] = useState("");
  const navigate = useNavigate();

const onSubmit = async (data: FormData) => {
  try {
    setError("");
    await register(data);
    navigate("/login"); // Redirect to login after successful registration
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const errorMap: Record<string, string> = {
      "username already exists": "Username is already taken",
      "email already exists": "Email is already registered",
      ValidationError: "Invalid registration data",
    };
    setError(
      errorMap[err.response?.data?.error] ||
        err.message ||
        "Registration failed"
    );
  }
};

  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>

      {error && (
        <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          error={!!errors.username}
          helperText={errors.username?.message}
          {...formRegister("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
          })}
        />

        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...formRegister("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...formRegister("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={24} /> : "Register"}
        </Button>
      </form>

      <Typography sx={{ mt: 2 }}>
        Already have an account? <Link href="/login">Login</Link>
      </Typography>
    </Container>
  );
};
