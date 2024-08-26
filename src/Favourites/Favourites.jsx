import { useContext } from "react";
import styles from "./favourites.module.css";
import ImgMediaCard from "../ImgMediaCard/ImgMediaCard";
import { PokemonContext } from "../context/FavoriteContext";
import { User } from "../User/User";


export default function Favourites() {
  const { state } = useContext(PokemonContext);
  const { user } = state;


  if (!user || !user.favoritesPokemons) {
    return <div>No hay favoritos disponibles.</div>;
  }

  return (
    <div style={{marginTop:"20px"}}>
 
     <User userId={user.Id} ></User>

      <div className={styles.container}>
      <div className={styles.cards}>
        {user.favoritesPokemons.map((pokemon) => (
          <ImgMediaCard
          className={styles.card}
            key={pokemon.id}
            pokemon={pokemon}
            id={pokemon.id}
            isFavourite={user.favoritesPokemons.some((fav) => fav.id === pokemon.id)}
          />
        ))}
      </div>
      </div>
    </div>
  );
}
