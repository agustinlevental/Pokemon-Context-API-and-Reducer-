import { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SearchAutocomplete from "./SearchAutocomplete/SearchAutocomplete";
import ImgMediaCard from "./ImgMediaCard/ImgMediaCard";
import { useFavourites } from "./context/favouriteContext";

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [error, setError] = useState(null);
  const { favourites, handleAddToFavourites } = useFavourites();

  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/pokemon";

    const fetchPokemons = async () => {
      try {
        const response = await axios.get(url);
        const pokemonDetailsPromises = response.data.results.map((pokemon) =>
          axios.get(pokemon.url)
        );
        const pokemonDetailsResponses = await Promise.all(
          pokemonDetailsPromises
        );
        const pokemonDetails = pokemonDetailsResponses.map((response) => ({
          id: response.data.id,
          name: response.data.name,
          imgSrc: response.data.sprites.front_default,
          ability: response.data.abilities[0].ability.name,
          weight: response.data.weight,
        }));

        setPokemons(pokemonDetails);
        setFilteredPokemons(pokemonDetails);
      } catch (e) {
        setError("Error al obtener los pokemones");
        console.log(e);
      }
    };

    fetchPokemons();
  }, []);

  const handleFilterChange = (filtered) => {
    setFilteredPokemons(filtered);
  };

  const handleEditPokemon = (newPokemon) => {
    const updatedPokemons = pokemons.map((pokemon) =>
      pokemon.id === newPokemon.id ? newPokemon : pokemon
    );
    setPokemons(updatedPokemons);
    setFilteredPokemons(updatedPokemons);
  };

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
        <SearchAutocomplete
          options={pokemons}
          onFilterChange={handleFilterChange}
        />
        {error && <Typography color="error">{error}</Typography>}
        {filteredPokemons.map((pokemon) => (
          <ImgMediaCard
            key={pokemon.id}
            pokemon={pokemon}
            id={pokemon.id}
            onEditPokemon={handleEditPokemon}
            onAddToFavourite={handleAddToFavourites}
            isFavourite={favourites.some(fav => fav.id === pokemon.id)}
          />
        ))}
      </Box>
    </Box>
  );
}
