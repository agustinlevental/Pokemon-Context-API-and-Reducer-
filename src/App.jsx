import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SearchAutocomplete from "./SearchAutocomplete/SearchAutocomplete";
import ImgMediaCard from "./ImgMediaCard/ImgMediaCard";
import { useContext } from "react";
import { PokemonContext } from "./context/favouriteContext";

export default function App() {
  const { state } = useContext(PokemonContext);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Box className="home">
        <SearchAutocomplete options={state.pokemons} />
        {state.error && <Typography color="error">{state.error}</Typography>}
        {state.filteredPokemons.map((pokemon) => (
          <ImgMediaCard
            key={pokemon.id}
            pokemon={pokemon}
            id={pokemon.id}
            isFavourite={state.favourites.some((fav) => fav.id === pokemon.id)}
          />
        ))}
      </Box>
    </Box>
  );
}
