import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { Provider, useAtom } from "jotai";
import { themeAtom } from "./contexts/theme";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";

function AppWrapper() {
  const [theme] = useAtom(themeAtom);

  const muiTheme = createTheme({
    palette: {
      mode: theme,
      primary: { main: "#1976d2" },
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <Layout showThemeToggle={true}>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout showThemeToggle={true}>
                <Register />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <Provider>
      <AppWrapper />
    </Provider>
  );
}
