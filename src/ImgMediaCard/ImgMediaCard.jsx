import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useContext } from "react";
import { PokemonContext } from "../context/favouriteContext";
import CustomButton from "../CustomButton/CustomButton";

export default function ImgMediaCard({ pokemon, isFavourite }) {
  const [showModifyOptions, setShowModifyOptions] = useState(false);
  const [inputChangedname, setInputChangedname] = useState(pokemon.name);
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

  const handleChangeNameClick = () => {
    const newPokemon = {
      id: myPokemon.id,
      name: inputChangedname,
      imgSrc: myPokemon.imgSrc,
      ability: myPokemon.ability,
      weight: myPokemon.weight,
      type: myPokemon.type,
    };
    dispatch({ type: "editPokemon", pokemon: newPokemon });
    setShowModifyOptions(false);
  };
  const handleCancel = () => {
    setInputChangedname(myPokemon.name);
    setShowModifyOptions(false);
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
        {showModifyOptions && (
          <div style={{ margin: "20px 0 0 0" }}>
            <TextField
              label="Nuevo nombre"
              value={inputChangedname}
              onChange={(e) => setInputChangedname(e.target.value)}
            />
            <div style={{ display: "flex" }}>
              <CustomButton  name ={"Guardar"} onClick={handleChangeNameClick}/>
              <CustomButton name={"Cancelar"} onClick={handleCancel}/>
            </div>
          </div>
        )}
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
        <CustomButton
          size="small"
          onClick={() => {
            setShowModifyOptions(true);
          }}
          name={"Change name"}
        />
          
        
      </CardActions>
    </Card>
  );
}
