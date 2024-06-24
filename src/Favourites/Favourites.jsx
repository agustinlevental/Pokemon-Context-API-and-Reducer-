import { useContext } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { PokemonContext } from "../context/favouriteContext";
import styles from "./favourites.module.css";
import ImgMediaCard from "../ImgMediaCard/ImgMediaCard";

export default function Favourites() {
  const { state, dispatch } = useContext(PokemonContext);

  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        {state.favourites.map((pokemon) => (
          <ImgMediaCard
            key={pokemon.id}
            pokemon={pokemon}
            id={pokemon.id}
            isFavourite={state.favourites.some((fav) => fav.id === pokemon.id)}
          />
        ))}
      </div>
    </div>
  );
}
