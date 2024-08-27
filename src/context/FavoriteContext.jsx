import { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";

const PokemonContext = createContext();

const pokemonsReducer = (state, action) => {
  switch (action.type) {
    case "setUser":
      return {
        ...state,
        user: action.user,
      };

    case "clearUser":
      return {
        ...state,
        user: null,
      };
      case "addToFavourites": {
        
        const isPokemonInFavourites = state.user.favoritesPokemons.some(
          (favPokemon) => favPokemon.id === action.pokemon.id
        );
      
        let updatedFavorites;
      
        if (!isPokemonInFavourites) {
     
          updatedFavorites = [...state.user.favoritesPokemons, action.pokemon];   
        } else {
  
          updatedFavorites = state.user.favoritesPokemons.filter(
            (p) => p.id !== action.pokemon.id
          );
        }
      
     
        localStorage.setItem("favoritesPokemons", JSON.stringify(updatedFavorites));
      
    
        return {
          ...state,
          user: {
            ...state.user,
            favoritesPokemons: updatedFavorites,
          },
        };
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
        localDataLoaded: true,
      };
    }

    case "setPokemons":
      localStorage.setItem("pokemons", JSON.stringify(action.pokemons));
      return {
        ...state,
        pokemons: action.pokemons,
        filteredPokemons: action.pokemons,
        localDataLoaded: true,
      };

    case "setFilteredPokemons":
      return {
        ...state,
        filteredPokemons: action.filteredPokemons,
        localDataLoaded: true,
      };

    case "setPreviousURL":
      return {
        ...state,
        previousURL: action.previousURL,
      };

    case "setNextURL":
      return {
        ...state,
        nextURL: action.nextURL,
      };

    case "setPage":
      return {
        ...state,
        page: action.page,
      };

    default:
      return state;
  }
};

const PokemonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pokemonsReducer, {
    user: null, 
    pokemons: getPokemons(),
    filteredPokemons: getPokemons(),
    favourites: getFavourites(),
    page: 1,
    totalPokemons: 1118,
    limit: 20,
    previousURL: "",
    nextURL: "",
    localDataLoaded: false,
  });
  const [error, setError] = useState(null);

  const setUser = (user) => {
    dispatch({ type: "setUser", user });
  };
  
  const clearUser = () => {
    dispatch({ type: "clearUser" });
  };

  function getPokemons() {
    const savedPokemons = localStorage.getItem("pokemons");
    return savedPokemons ? JSON.parse(savedPokemons) : [];
  }

  function getFavourites() {
    const savedFavourites = localStorage.getItem("favourites");
    return savedFavourites ? JSON.parse(savedFavourites) : [];
  }

  useEffect(() => {

    fetchPokemons(state.page);

  }, [state.page]);

  const fetchPokemons = async () => {
    const offset = (state.page - 1) * state.limit;
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${state.limit}`;
    try {
      const response = await axios.get(url);
      const pokemonDetailsPromises = response.data.results.map((pokemon) =>
        axios.get(pokemon.url)
      );
      const pokemonDetailsResponses = await Promise.all(pokemonDetailsPromises);
      const pokemonDetails = pokemonDetailsResponses.map((response) => ({
        id: response.data.id,
        name: response.data.name,
        imgSrc: response.data.sprites.front_default,
        ability: response.data.abilities[0].ability.name,
        weight: response.data.weight,
        type: response.data.types[0].type.name,
      }));

      dispatch({ type: "setPokemons", pokemons: pokemonDetails });
      dispatch({
        type: "setPreviousURL",
        previousURL: response.data.previous,
      });
      dispatch({ type: "setNextURL", nextURL: response.data.next });
    } catch (e) {
      setError("Error al obtener los pokemones");
      console.log(e);
    }
  };
  const searchPokemon = async (inputValue) => {
    let url = `https://pokeapi.co/api/v2/pokemon/${inputValue}`;
  
    try {
      const response = await axios.get(url);
      const pokemon = response.data;
      const objectPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        imgSrc: pokemon.sprites.front_default,
        ability: pokemon.abilities[0].ability.name,
        weight: pokemon.weight,
        type: pokemon.types[0].type.name,
      };
  
      const filteredPokemons = [objectPokemon];
  
      dispatch({ type: "setFilteredPokemons", filteredPokemons });
      return { success: true };
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return { success: false, status: 404 };
      } else {
        return { success: false, status: error.response ? error.response.status : 500 };
      }
    }
  };
  const handlePaginationClick = async (url) => {
    if (!url) return;
    try {
      const response = await axios.get(url);
      const pokemonDetailsPromises = response.data.results.map((pokemon) =>
        axios.get(pokemon.url)
      );
      const pokemonDetailsResponses = await Promise.all(pokemonDetailsPromises);
      const pokemonDetails = pokemonDetailsResponses.map((response) => ({
        id: response.data.id,
        name: response.data.name,
        imgSrc: response.data.sprites.front_default,
        ability: response.data.abilities[0].ability.name,
        weight: response.data.weight,
        type: response.data.types[0].type.name,
      }));

      dispatch({
        type: "setFilteredPokemons",
        filteredPokemons: pokemonDetails,
      });
      dispatch({ type: "setPreviousURL", previousURL: response.data.previous });
      dispatch({ type: "setNextURL", nextURL: response.data.next });
    } catch (e) {
      setError("Error al obtener los pokemones");
      console.log(e);
    }
  };

  return (
    <PokemonContext.Provider
      value={{
        state,
        dispatch,
        error,
        handlePaginationClick,
        fetchPokemons,
        searchPokemon,
        setUser,       
      clearUser,   
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };
