// src/components/Layout.tsx
import { useAtom } from "jotai";
import { themeAtom } from "../contexts/theme";
import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
  showThemeToggle?: boolean;
}

export const Layout = ({ children, showThemeToggle = true }: LayoutProps) => {
  const [theme, setTheme] = useAtom(themeAtom);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <Box>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Task Manager
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {showThemeToggle && (
              <IconButton
                onClick={toggleTheme}
                color="inherit"
                aria-label="toggle theme"
              >
                {theme === "dark" ? <LightMode /> : <DarkMode />}
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};
