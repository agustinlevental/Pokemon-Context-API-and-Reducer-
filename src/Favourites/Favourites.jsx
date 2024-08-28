import { useContext } from "react";
import styles from "./favourites.module.css";
import ImgMediaCard from "../ImgMediaCard/ImgMediaCard";
import { PokemonContext } from "../context/FavoriteContext";
import { User } from "../User/User";
import { Box } from "@mui/material";

export default function Favourites() {
  const { state } = useContext(PokemonContext);
  const { user } = state;

  if (!user || !user.favoritesPokemons) {
    return (
      <div>
        <p style={{ marginTop: "10px" }}>Aún no hay favoritos para mostrar. </p>
        ;
        <p>
          Haz click en la estrella de la tarjeta Pokemon para agregarla a
          Favoritos
        </p>
        ;
      </div>
    );
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <div className={styles.userContainer}>
  
        <User userId={user.Id}></User>
      </div>

      <div className={styles.container}>
        <div className={styles.cards}>
          {user.favoritesPokemons.map((pokemon) => (
            <Box className={styles.card} key={pokemon.id}>
              <ImgMediaCard
                key={pokemon.id}
                pokemon={pokemon}
                id={pokemon.id}
                isFavourite={user.favoritesPokemons.some(
                  (fav) => fav.id === pokemon.id
                )}
              />
            </Box>
          ))}
        </div>
      </div>
    </div>
  );
}
