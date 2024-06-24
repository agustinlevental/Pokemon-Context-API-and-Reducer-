import { useContext } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SearchAutocomplete from "./SearchAutocomplete/SearchAutocomplete";
import ImgMediaCard from "./ImgMediaCard/ImgMediaCard";
import { PokemonContext } from "./context/favouriteContext";
import styles from "./app.module.css";

export default function App() {
  const { state } = useContext(PokemonContext);

  return (
    <Box className={styles.container}>
      <Box className={styles.home}>
        <SearchAutocomplete options={state.pokemons} />
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
    </Box>
  );
}
