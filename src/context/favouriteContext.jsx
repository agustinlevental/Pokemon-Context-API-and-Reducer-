import  { createContext, useContext, useState } from 'react';


const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

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
    <FavouritesContext.Provider value={{ favourites, handleAddToFavourites, handleDeleteFromFavourites }}>
      {children}
    </FavouritesContext.Provider>
  );
};


export const useFavourites = () => {
  return useContext(FavouritesContext);
};