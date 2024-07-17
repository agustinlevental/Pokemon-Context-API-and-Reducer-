import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useContext } from "react";
import CustomButton from "../CustomButton/CustomButton";
import { PokemonContext } from "../context/FavoriteContext";

export default function ImgMediaCard({ pokemon, isFavourite }) {
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [filteredPokemonName, setFilteredPokemonName] = useState("");
  const [myPokemon, setMyPokemon] = useState({
    id: pokemon.id,
    name: pokemon.name,
    imgSrc: pokemon?.sprites?.front_default || pokemon.imgSrc,
    ability: pokemon?.abilities?.[0]?.ability?.name,
    type: pokemon?.types?.[0]?.type?.name,
    weight: pokemon.weight,
  });

  const { state, dispatch } = useContext(PokemonContext);

  useEffect(() => {
    state.filteredPokemons.map((filteredPokemon) => {
      if (filteredPokemon.id === myPokemon.id) {
        setFilteredPokemonName(filteredPokemon.name);
      }
    });
  }, [state.filteredPokemons]);

  const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  };

  useEffect(() => {
 if(state.filteredPokemons){
      setBackgroundColor(
        typeColors[pokemon.type || myPokemon.type || "#FFFFFF"]
      );}
    
  }, [state.filteredPokemons]);
 

  const handleAddToFavourites = (pokemon) => {
    dispatch({ type: "addToFavourites", pokemon: pokemon });
  };


 

  return (
    <Card
      sx={{
        width: 200,
        margin: 2,
        borderRadius: "10%",
        backgroundColor: "#D3D3D3",
      }}
    >
      <CardMedia
        component="img"
        alt={`${name} img`}
        height="140"
        image={myPokemon.imgSrc}
        sx={{ backgroundColor: { backgroundColor } }}
      />
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          paddingBottom: 0,
          backgroundColor: "	#D3D3D3",
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {filteredPokemonName || myPokemon.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ability: {myPokemon.ability}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Weight: {myPokemon.weight}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: 0,
          backgroundColor: "#D3D3D3",
        }}
      >
        <IconButton onClick={() => handleAddToFavourites(pokemon)}>
          {isFavourite ? (
            <StarIcon sx={{ color: "grey" }} />
          ) : (
            <StarBorderIcon />
          )}
        </IconButton>
    
          
        
      </CardActions>
    </Card>
  );
}
