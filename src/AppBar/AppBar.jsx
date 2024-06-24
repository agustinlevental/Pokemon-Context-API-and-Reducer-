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
      <AppBar position="static" sx={{backgroundColor:"wheat"}}>
        <Toolbar className={styles.toolbar}>
        <p></p>
          <PikachuIcon className={styles.pikachuIcon} />
          <div className={styles.iconButtonGroup}>
          <Link to="favourites">
              <IconButton color="inherit" onClick={handleStarClick}>
                {isStarClicked ? <StarIcon sx={{color:"grey"}}/> : <StarBorderIcon sx={{color:"grey"}} />}
              </IconButton>
            </Link>
            <Link to="home">
              <IconButton color="inherit" onClick={handleHomeClick}>
                {isHomeClicked ? <HomeIcon  sx={{color:"grey"}}/> : <HomeOutlinedIcon sx={{color:"grey"}} />}
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    // </ThemeProvider>
  );
}
