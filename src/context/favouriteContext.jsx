import { createContext, useContext, useEffect, useReducer } from "react";

import { fetchPokemons } from "../service/pokemonService";

const FavouritesContext = createContext();

const actionTypes = {
  ADD_TO_FAVOURITES: "ADD_TO_FAVOURITES",
  DELETE_FROM_FAVOURITES: "DELETE_FROM_FAVOURITES",
  EDIT_POKEMON: "EDIT_POKEMON",
  SET_INITIAL_POKEMONS: "SET_INITIAL_POKEMONS",
  FILTER_POKEMONS: "FILTER_POKEMONS",
};

const favouritesReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_FAVOURITES:{
      const isPokemonInFavourites = state.favourites.some(
        (favPokemon) => favPokemon.id === action.payload.id
      );
      if (!isPokemonInFavourites) {
        return {
          ...state,
          favourites: [...state.favourites, action.payload],
        };
      }
      return state;}

    case actionTypes.DELETE_FROM_FAVOURITES:{
      const newFavourites = state.favourites.filter(
        (pokemon) => pokemon.id !== action.payload.id
      );
      return {
        ...state,
        favourites: newFavourites,}
      };

    case actionTypes.EDIT_POKEMON:{
      const updatedPokemons = state.pokemons.map((pokemon) =>
        pokemon.id === action.payload.id ? action.payload : pokemon
      );
      return {
        ...state,
        pokemons: updatedPokemons,
        filteredPokemons: updatedPokemons,
      };}

    case actionTypes.SET_INITIAL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        filteredPokemons: action.payload,
      };
      case actionTypes.FILTER_POKEMONS:
        return {
          ...state,
          filteredPokemons: action.payload,
        };

    default:
      return state;
  }
};

export const FavouritesProvider = ({ children }) => {
  const initialState = {
    pokemons: [],
    filteredPokemons: [],
    favourites: [],
  };

  const [state, dispatch] = useReducer(favouritesReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedPokemons = localStorage.getItem("pokemon");

        if (storedPokemons) {
          const parsedPokemons = JSON.parse(storedPokemons);
          dispatch({ type: actionTypes.SET_INITIAL_POKEMONS, payload: parsedPokemons.results });
        } else {
          const pokemonDetails = await fetchPokemons();
          dispatch({ type: actionTypes.SET_INITIAL_POKEMONS, payload: pokemonDetails });
          localStorage.setItem("pokemon", JSON.stringify({ results: pokemonDetails }));
        }
      } catch (error) {
        console.error("Error fetching initial pokemons:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddToFavourites = (pokemon) => {
    dispatch({ type: actionTypes.ADD_TO_FAVOURITES, payload: pokemon });
  };

  const handleDeleteFromFavourites = (pokemon) => {
    dispatch({ type: actionTypes.DELETE_FROM_FAVOURITES, payload: pokemon });
  };

  const handleEditPokemon = (newPokemon) => {
    dispatch({ type: actionTypes.EDIT_POKEMON, payload: newPokemon });
    localStorage.setItem("pokemon", JSON.stringify({ results: state.pokemons }));
  };

  const handleFilterChange = (filtered) => {
    dispatch({ type: actionTypes.FILTER_POKEMONS, payload: filtered });
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites: state.favourites,
        pokemons: state.pokemons,
        filteredPokemons: state.filteredPokemons,
        handleAddToFavourites,
        handleDeleteFromFavourites,
        handleEditPokemon,
        handleFilterChange
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  return useContext(FavouritesContext);
};
