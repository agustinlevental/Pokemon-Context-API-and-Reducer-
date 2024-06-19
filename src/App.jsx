import { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SearchAutocomplete from "./SearchAutocomplete/SearchAutocomplete";
import ImgMediaCard from "./ImgMediaCard/ImgMediaCard";
import Favourites from "./Favourites/Favourites";
import CustomAppBar from "./AppBar/AppBar";

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [error, setError] = useState(null);
 const [showHome,setShowHome]=useState(true)
 const [showFavourites,setShowFavourites]=useState(false)

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

  const handleShowFavourites = ()=>{
    setShowFavourites(true)
    setShowHome(false)
  }
  const handleShowHome = ()=>{
    setShowFavourites(false)
    setShowHome(true)
  }
  const handleFilterChange = (filtered) => {
    setFilteredPokemons(filtered);
  };
  const handleEditPokemon = (newPokemon) => {
    const updatedPokemons = pokemons.map((pokemon) =>
      pokemon.id === newPokemon.id ? newPokemon : pokemon
    );
    setPokemons(updatedPokemons);
    setFilteredPokemons(updatedPokemons);

    setFavourites(
      favourites.map((pokemon) =>
        pokemon.id === newPokemon.id ? newPokemon : pokemon
      )
    );
  };
  const handleAddToFavourites = (pokemon) => {
    const isPokemonInFavourites = favourites.some(
      (favPokemon) => favPokemon.id === pokemon.id
    );

    if (!isPokemonInFavourites) {
      const nextFavourites = [...favourites, pokemon];
      setFavourites(nextFavourites);
    } else {
      handleDeleteFromFavourites(pokemon);
    }
  };

  const handleDeleteFromFavourites = (pokemon) => {
    const newFavourites = favourites.filter((p) => p.id !== pokemon.id);
    setFavourites(newFavourites);
  };
  return (
    <Box
      sx={{
        width: "100%",
        height:"100%",
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        justifyContent: "center",
        padding: 2,
      }}
    >
      <CustomAppBar onShowFavourites={handleShowFavourites} onShowHome={handleShowHome}/>
     { showHome&&(<Box className="home">
        <SearchAutocomplete
          options={pokemons}
          onFilterChange={handleFilterChange}
        />
        {error && <Typography color="error">{error}</Typography>}
        {filteredPokemons.map((pokemon, i) => (
          <ImgMediaCard
            key={pokemon.id}
            pokemon={pokemon}
            id={pokemon.id}
            onEditPokemon={handleEditPokemon}
            onAddToFavourite={handleAddToFavourites}
          />
        ))}
      </Box>)}

    {showFavourites&&(  <Box className="Favourites">
        <Favourites
          favourites={favourites}
          onDeletePokemon={handleDeleteFromFavourites}
        />
      </Box>)}
    </Box>
  );
}
