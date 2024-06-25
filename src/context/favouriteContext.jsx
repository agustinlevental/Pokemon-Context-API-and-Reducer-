import { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";

const PokemonContext = createContext();

const pokemonsReducer = (state, action) => {
  switch (action.type) {
    case "addToFavourites": {
      const isPokemonInFavourites = state.favourites.some(
        (favPokemon) => favPokemon.id === action.pokemon.id
      );

      if (!isPokemonInFavourites) {
        const nextFavourites = [...state.favourites, action.pokemon];

        localStorage.setItem("favourites", JSON.stringify(nextFavourites));
        return { ...state, favourites: nextFavourites };
      } else {
        const newFavourites = state.favourites.filter(
          (p) => p.id !== action.pokemon.id
        );

        return { ...state, favourites: newFavourites };
      }
    }
    case "deleteFromFavourites": {
      const newFavourites = state.favourites.filter(
        (p) => p.id !== action.pokemon.id
      );
      localStorage.setItem("favourites", JSON.stringify(newFavourites));
      return { ...state, favourites: newFavourites };
    }
    case "editPokemon": {
      const updatedPokemons = state.pokemons.map((pokemon) =>
        pokemon.id === action.pokemon.id ? action.pokemon : pokemon
      );
      localStorage.setItem("pokemons", JSON.stringify(updatedPokemons));
      return {
        ...state,
        pokemons: updatedPokemons,
        filteredPokemons: updatedPokemons,
      };
    }
    case "setPokemons": {
      localStorage.setItem("pokemons", JSON.stringify(action.pokemons));
      return {
        ...state,
        pokemons: action.pokemons,
      };
    }
    case "setFilteredPokemons": {
      return {
        ...state,
        filteredPokemons: action.filteredPokemons, 
      };
    }
    default:
      return state;
  }
};

const PokemonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pokemonsReducer, {
    pokemons: getPokemons(),
    filteredPokemons: getPokemons(),
    favourites: getFavourites(),
  });
  const [error, setError] = useState(null);

  function getPokemons() {
    const savedPokemons = localStorage.getItem("pokemons");

    return savedPokemons ? JSON.parse(savedPokemons) : [];
  }
  function getFavourites() {
    const savedFavourites = localStorage.getItem("favourites");

    return savedFavourites ? JSON.parse(savedFavourites) : [];
  }
 

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
          type: response.data.types[0].type.name
        }));

        if (state.pokemons.length === 0) {
       
          dispatch({ type: "setPokemons", pokemons: pokemonDetails });
          dispatch({ type: "setFilteredPokemons", pokemons: pokemonDetails });
        }
      } catch (e) {
        setError("Error al obtener los pokemones");
        console.log(e);
      }
    };

    fetchPokemons();
  }, []);

  const searchPokemon = async (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    try {
      const response = await axios.get(url);
      console.log(response,"response")
      const pokemonDetails = {
        id: response.data.id,
        name: response.data.name,
        imgSrc: response.data.sprites.front_default,
        ability: response.data.abilities[0].ability.name,
        weight: response.data.weight,
        type: response.data.types[0].type.name
      }
      console.log(pokemonDetails,"pokemonDetails")
      dispatch({ type: "setFilteredPokemons", filteredPokemons: [pokemonDetails] });
  }
  catch (e) {
    setError("Error al obtener los pokemones");
    console.log(e);
  }}

  return (
    <PokemonContext.Provider value={{ state, dispatch, error, searchPokemon }}>
      {children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };
