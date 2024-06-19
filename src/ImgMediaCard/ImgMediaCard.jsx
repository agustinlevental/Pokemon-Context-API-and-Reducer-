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

export default function ImgMediaCard({
  pokemon, onAddToFavourite, isFavourite ,onEditPokemon
}) {
  const [showModifyOptions, setShowModifyOptions] = useState(false);
  const [inputChangedname, setInputChangedname] = useState(pokemon.name);
  

  const handleChangeNameClick = () => {
    const newPokemon = {
      id: pokemon.id,
      name: inputChangedname ,
      imgSrc: pokemon.imgSrc,
      ability: pokemon.ability,
      weight: pokemon.weight,
    };
    onEditPokemon(newPokemon);
    setShowModifyOptions(false);
    
  };
  const handleCancel = () => {
    setInputChangedname(pokemon.name);
    setShowModifyOptions(false);
  };
  const handleAddToFavourite = (pokemon) => {
    onAddToFavourite(pokemon);
   
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
        <IconButton onClick={() => handleAddToFavourite(pokemon)}>
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
