import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { ThemeProvider } from "styled-components";
import PikachuIcon from "./PikachuIcon";
import styles from './AppBar.module.css';
import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "red",
        },
      },
    },
  },
});

export default function CustomAppBar({ onShowFavourites,onShowHome }) {
  const [isStarClicked, setIsStarClicked] = useState(false);
  const [isHomeClicked, setIsHomeClicked] = useState(true);

  const handleStarClick = () => {
    setIsStarClicked(true);
    setIsHomeClicked(false);
    onShowFavourites()
  };

  const handleHomeClick = () => {
    setIsHomeClicked(true);
    setIsStarClicked(false);
    onShowHome()
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar className={styles.toolbar}>
        <p></p>
          <PikachuIcon className={styles.pikachuIcon} />
          <div className={styles.iconButtonGroup}>
            <IconButton color="inherit" onClick={handleStarClick}>
              {isStarClicked ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
            <IconButton color="inherit" onClick={handleHomeClick}>
              {isHomeClicked ? <HomeIcon /> : <HomeOutlinedIcon />}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
