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
import Swal from 'sweetalert2';
import CreateUserModal from "../ModalCreateUser/CreateUserModal";

export default function ImgMediaCard({ pokemon, isFavourite }) {
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [filteredPokemonName, setFilteredPokemonName] = useState("");
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);

  const { state,setUser, dispatch } = useContext(PokemonContext);
  const { user } = state;

  useEffect(() => {
    state.filteredPokemons.map((filteredPokemon) => {
      if (filteredPokemon.id === pokemon.id) {
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
        typeColors[pokemon.type]
      );}
    
  }, [state.filteredPokemons]);
 

  const handleAddToFavourites = (pokemon) => {
    if (!user) {
      Swal.fire({
        title: 'Para agregar Pokemons a favoritos debe tener un usuario, ¿desea crear un usuario?',
        showCancelButton: true,
        confirmButtonText: 'Crear usuario',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: "rgb(25, 118, 210)",
        cancelButtonColor: "rgb(25, 118, 210)",
      }).then((result) => {
        if (result.isConfirmed) {
          setOpenCreateUserModal(true);
        }  });
      }else{
        dispatch({ type: "addToFavourites", pokemon: pokemon });
      }
    
  };
  const handleUserCreated = (user) => {
    setUser(user);
    console.log("user", user)
    handleClose();
  };
const handleClose=()=>{
  setOpenCreateUserModal(false)
}

  return (
    <div>
    <CreateUserModal
        open={openCreateUserModal}
        onClose={handleClose}
        onUserCreated={handleUserCreated}
      />
    <Card
      sx={{
        width: 200,
        margin: 2,
        borderRadius: "10%",
        backgroundColor: "white",
        boxShadow: 5,
      }}
    >
      <CardMedia
        component="img"
        alt={`${pokemon.name} img`}
        height="140"
        image={pokemon.imgSrc}
        sx={{ backgroundColor: { backgroundColor } }}
      />
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          paddingBottom: 0,
          backgroundColor: "white",
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {filteredPokemonName || pokemon.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ability: {pokemon.ability}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Weight: {pokemon.weight}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: 0,
          backgroundColor: "white",
        }}
      >
        <IconButton onClick={() => handleAddToFavourites(pokemon)}>
          {isFavourite ? (
            <StarIcon sx={{ color: "#FFD700" }} />
          ) : (
            <StarBorderIcon />
          )}
        </IconButton>
    
          
        
      </CardActions>
    </Card>
    </div>
  );
}
