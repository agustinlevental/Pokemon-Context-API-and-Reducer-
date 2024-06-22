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
        console.log(nextFavourites,"next favourites no estaba en favoritos")
        return { ...state, favourites: nextFavourites };
        
      } else {
        const newFavourites = state.favourites.filter(
          (p) => p.id !== action.pokemon.id
        );
        console.log(newFavourites,"next favourites SI estaba en favoritos")
        return { ...state, favourites: newFavourites };
      }
   
    }
    case "deleteFromFavourites": {
      const newFavourites = state.favourites.filter(
        (p) => p.id !== action.pokemon.id
      );
      return { ...state, favourites: newFavourites };
    }
    case "editPokemon": {
      const updatedPokemons = state.pokemons.map((pokemon) =>
        pokemon.id === action.pokemon.id ? action.pokemon : pokemon
      );
      return {
        ...state,
        pokemons: updatedPokemons,
        filteredPokemons: updatedPokemons,
      };
    }
    case "setPokemons": {
      return {
        ...state,
        pokemons: action.pokemons,
        
      };
    }
    case "setFilteredPokemons": {
      return {
        ...state,
        filteredPokemons: action.pokemons,
      };
    }
    default:
      return state;
  }
};

const PokemonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pokemonsReducer, {
    pokemons: [],
    filteredPokemons: [],
    favourites: [],
  });
  const [error, setError] = useState(null);

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

        dispatch({ type: "setPokemons", pokemons: pokemonDetails });
        dispatch({ type: "setFilteredPokemons", pokemons: pokemonDetails });
      } catch (e) {
        setError("Error al obtener los pokemones");
        console.log(e);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <PokemonContext.Provider value={{ state, dispatch, error }}>
      {children}
    </PokemonContext.Provider>
  )
};

export {PokemonContext,PokemonProvider}

