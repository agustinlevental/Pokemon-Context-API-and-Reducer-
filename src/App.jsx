import { useContext, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SearchAutocomplete from "./SearchAutocomplete/SearchAutocomplete";
import ImgMediaCard from "./ImgMediaCard/ImgMediaCard";
import styles from "./app.module.css";
import { Pagination } from "@mui/material";
import { PokemonContext } from "./context/FavoriteContext";

export default function App() {
  const { state, dispatch, fetchPokemons } = useContext(PokemonContext);


  const handlePageChange = (event, value) => {
    dispatch({ type: "setPage", page: value });
  };

  useEffect(() => {
    if (!state.localDataLoaded) {
      fetchPokemons();
    }
  }, [state.page, dispatch]);

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
                isFavourite={state.user?.favoritesPokemons?.some(
                  (favPokemon) => favPokemon.id === pokemon.id
                )}
              />
            </Box>
          ))}
        </Box>
      </Box>
     
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "auto",
          padding: 0,
          margin: 0,
        }}
      >
        <Pagination
          count={Math.ceil(state.totalPokemons / state.limit)}
          page={state.page}
          onChange={handlePageChange}
          color="primary"
          sx={{ margin: 0 }}
        />
      </Box>
    </Box>
  );
}
