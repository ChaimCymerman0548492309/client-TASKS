import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { Provider, useAtom } from "jotai";
import { themeAtom } from "./contexts/theme";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";


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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
