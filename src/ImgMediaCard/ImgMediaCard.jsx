import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { IconButton, TextField } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useFavourites } from "../context/favouriteContext";
import styles from "./imgMediaCard.module.css";

export default function ImgMediaCard({ pokemon, isFavourite }) {
  const [showModifyOptions, setShowModifyOptions] = useState(false);
  const [inputChangedname, setInputChangedname] = useState(pokemon.name);
  const {
    handleEditPokemon,
    handleDeleteFromFavourites,
    handleAddToFavourites,
  } = useFavourites();

  const handleChangeNameClick = () => {
    const newPokemon = {
      id: pokemon.id,
      name: inputChangedname,
      imgSrc: pokemon.imgSrc,
      ability: pokemon.ability,
      weight: pokemon.weight,
    };
    handleEditPokemon(newPokemon);
    setShowModifyOptions(false);
  };

  const handleCancel = () => {
    setInputChangedname(pokemon.name);
    setShowModifyOptions(false);
  };

  const handleAddToFavourite = (pokemon) => {
    handleAddToFavourites(pokemon);
  };

  const handleAddOrRemoveFromFavourites = () => {
    !isFavourite
      ? handleAddToFavourites(pokemon)
      : handleDeleteFromFavourites(pokemon);
  };

  return (
    <Card sx={{ width: 200, margin: 2 }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CardMedia
          component="img"
          alt={`${pokemon.name} img`}
          height="140"
          image={pokemon.imgSrc}
        />
      </div>

      {/* Aplicando Flexbox a CardContent para centrar todo el contenido */}
      <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Typography gutterBottom variant="h5" component="div">
          {inputChangedname || pokemon.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ability: {pokemon.ability}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Weight: {pokemon.weight}
        </Typography>

        <div
          className={showModifyOptions ? styles.cardWithTextfield : styles.card}
        >
          {showModifyOptions && (
            <div className={styles.modifyOptions}>
              <TextField
                label="Nuevo nombre"
                value={inputChangedname}
                onChange={(e) => setInputChangedname(e.target.value)}
              />
              <Button onClick={handleChangeNameClick}>Guardar</Button>
              <Button onClick={handleCancel}>Cancelar</Button>
            </div>
          )}
        </div>
      </CardContent>

      {!showModifyOptions&&(<div style={{ display: "flex", justifyContent: "center" }}>
        <CardActions>
          <IconButton onClick={handleAddOrRemoveFromFavourites}>
            {isFavourite ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
          <Button size="small" onClick={() => setShowModifyOptions(true)}>
            Change name
          </Button>
        </CardActions>
      </div>)}
    </Card>
  );
}