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
import { useContext } from "react";
import { PokemonContext } from "../context/favouriteContext";

export default function ImgMediaCard({
  pokemon, isFavourite 
}) {
  const [showModifyOptions, setShowModifyOptions] = useState(false);
  const [inputChangedname, setInputChangedname] = useState(pokemon.name);
  const { state, dispatch } = useContext(PokemonContext);

  const handleEditPokemon = (newPokemon) => {
    dispatch({ type: "editPokemon", pokemon: newPokemon });
  };

  const handleAddToFavourites = (pokemon) => {
    dispatch({ type: "addToFavourites", pokemon: pokemon });
  };
  

  const handleChangeNameClick = () => {
    const newPokemon = {
      id: pokemon.id,
      name: inputChangedname ,
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
 
  return (
    <Card sx={{ width: 200, margin: 2 }}>
      <CardMedia
        component="img"
        alt={`${name} img`}
        height="140"
        image={pokemon.imgSrc}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {inputChangedname || pokemon.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ability: {pokemon.ability}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Weight: {pokemon.weight}
        </Typography>
        {showModifyOptions && (
          <div>
            <TextField
              label="Nuevo nombre"
              value={inputChangedname}
              onChange={(e) => setInputChangedname(e.target.value)}
            />
            <Button onClick={handleChangeNameClick}>Guardar</Button>
            <Button onClick={handleCancel}>Cancelar</Button>
          </div>
        )}
      </CardContent>
      <CardActions>
        <IconButton onClick={() => handleAddToFavourites(pokemon)}>
        {isFavourite ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
        <Button
          size="small"
          onClick={() => {
            setShowModifyOptions(true);
          }}
        >
          Change name
        </Button>
      </CardActions>
    </Card>
  );
}
