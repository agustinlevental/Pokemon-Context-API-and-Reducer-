import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SearchAutocomplete from "./SearchAutocomplete/SearchAutocomplete";
import ImgMediaCard from "./ImgMediaCard/ImgMediaCard";
import { useFavourites } from "./context/favouriteContext";
import BasicPagination from "./Pagination/Pagination";
import styles from "./app.module.css";

export default function App() {
  const [error, setError] = useState(null);
  const {
    favourites,
    pokemons,
    filteredPokemons,

  } = useFavourites();

  return (
    <Box className={styles.appContainer}>
      <Box className={styles.searchAutocomplete}>
        <SearchAutocomplete
          options={pokemons}
        
        />
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      <Box className={styles.filteredPokemons}>
        <div className={styles.pokemonList}>
          {filteredPokemons.map((pokemon) => (
            <ImgMediaCard
              key={pokemon.id}
              pokemon={pokemon}
              id={pokemon.id}
              isFavourite={favourites.some((fav) => fav.id === pokemon.id)}
            />
          ))}
        </div>
      </Box>
      <BasicPagination />
    </Box>
  );
}
