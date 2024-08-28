import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { PokemonContext } from "../context/FavoriteContext";
import Swal from "sweetalert2";
import styles from "./searchAutoComplete.module.css";
import SearchIcon from '@mui/icons-material/Search';
import ReplayIcon from '@mui/icons-material/Replay';

export default function SearchAutocomplete() {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { searchPokemon, state, dispatch } = useContext(PokemonContext);

  const handleInputChange = (event, value) => {
    setInputValue(value);
  };

  const handleChange = (event, newValue) => {
    if (newValue) {
      setInputValue(newValue);
    }
  };

  const handleSearch = async () => {
    if (!inputValue.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debe ingresar el nombre de un Pokémon para realizar la búsqueda.",
      });
      return;
    }

    setLoading(true);
    const result = await searchPokemon(inputValue);

    if (result.status === 404) {
      Swal.fire({
        icon: "error",
        title: "No encontrado",
        text: `No se encontró un Pokémon cuyo nombre completo sea ${inputValue}.`,
      });
    }

    setLoading(false);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      await handleSearch();
    }
  };

  const handleCleanSearch = () => {
    dispatch({ type: "setFilteredPokemons", filteredPokemons: state.pokemons });
    setInputValue(""); 
  };

  return (
    <div className={styles.SearchContainer}>
      <Autocomplete
        value={inputValue}  
        options={state.pokemons.map((pokemon) => pokemon.name)}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Pokemon"
            variant="outlined"
            onKeyDown={handleKeyDown}
            placeholder="Enter a Pokemon full name"
          />
        )}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />
      <Button 
        onClick={handleSearch} 
        loading={loading} 
        className={styles.iconButton}
      >
        <SearchIcon />
      </Button>
      <Box>
        {state.filteredPokemons.length === 1 && (
          <Button 
            onClick={handleCleanSearch} 
            className={styles.iconButton}
          >
            <ReplayIcon />
          </Button>
        )}
      </Box>
    </div>
  );
}
