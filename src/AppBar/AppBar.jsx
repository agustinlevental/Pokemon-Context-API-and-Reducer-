import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import { ThemeProvider } from '@mui/material/styles';
import PikachuIcon from "./PikachuIcon";
import styles from './AppBar.module.css';
// import { createTheme } from "@mui/material";
import { Link } from "react-router-dom";

// const theme = createTheme({
//   components: {
//     MuiAppBar: {
//       styleOverrides: {
//         root: {
//           backgroundColor: "red",
//         },
//       },
//     },
//   },
// });

export default function CustomAppBar() {
  const [isStarClicked, setIsStarClicked] = useState(false);
  const [isHomeClicked, setIsHomeClicked] = useState(true);

  const handleStarClick = () => {
    setIsStarClicked(true);
    setIsHomeClicked(false);
 
  };

  const handleHomeClick = () => {
    setIsHomeClicked(true);
    setIsStarClicked(false);
    
  };

  return (
    // <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{backgroundColor:"#DC143C"}}>
        <Toolbar className={styles.toolbar}>
        <p></p>
          <PikachuIcon className={styles.pikachuIcon} />
          <div className={styles.iconButtonGroup}>
          
            <Link to="home">
              <IconButton  onClick={handleHomeClick}>
                {isHomeClicked ? <HomeIcon  /> : <HomeOutlinedIcon  />}
              </IconButton>
            </Link>
            <Link to="favourites">
              <IconButton  onClick={handleStarClick}>
                {isStarClicked ? <StarIcon /> : <StarBorderIcon  />}
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    // </ThemeProvider>
  );
}
