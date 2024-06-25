import { useContext } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SearchAutocomplete from "./SearchAutocomplete/SearchAutocomplete";
import ImgMediaCard from "./ImgMediaCard/ImgMediaCard";
import { PokemonContext } from "./context/favouriteContext";
import styles from "./app.module.css";
import { Button } from "@mui/material";

export default function App() {
  const { state, dispatch , handlePaginationClick} = useContext(PokemonContext);

  const handleCleanSearch = () => {
    dispatch({ type: "setFilteredPokemons", filteredPokemons: state.pokemons });
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.home}>
        <SearchAutocomplete />
        {state.error && <Typography color="error">{state.error}</Typography>}
        <Box className={styles.cards}>
          {state.filteredPokemons.map((pokemon) => (
            <Box className={styles.card} key={pokemon.id}>
              <ImgMediaCard
                pokemon={pokemon}
                id={pokemon.id}
                isFavourite={state.favourites.some(
                  (fav) => fav.id === pokemon.id
                )}
              />
            </Box>
          ))}
        </Box>
      </Box>
      <Box>
        {state.filteredPokemons.length === 1 && (
          <Button onClick={handleCleanSearch}>Limpiar Búsqueda</Button>
        )}
      </Box>
      <Box>
        <Button onClick={() => handlePaginationClick(state.previousURL)} disabled={!state.previousURL}>Anterior</Button>
        <Button onClick={() => handlePaginationClick(state.nextURL)}>Siguiente</Button>
      </Box>
    </Box>
  );
}
