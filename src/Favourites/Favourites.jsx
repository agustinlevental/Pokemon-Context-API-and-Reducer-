import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useFavourites } from "../context/favouriteContext";

export default function Favourites() {
  const { favourites, handleDeleteFromFavourites } = useFavourites();

  return favourites.map((pokemon) => (
    <Card sx={{ width: 200, margin: 2 }} key={pokemon.id}>
      <CardMedia
        component="img"
        alt={`${pokemon.name} img`}
        height="140"
        image={pokemon.imgSrc}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pokemon.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ability: {pokemon.ability}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Weight: {pokemon.weight}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => handleDeleteFromFavourites(pokemon)}
        >
          Eliminar de Favoritos
        </Button>
      </CardActions>
    </Card>
  ));
}
