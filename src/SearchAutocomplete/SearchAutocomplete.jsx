import { Autocomplete, Box, TextField } from "@mui/material";
import CustomButton from "../CustomButton/CustomButton";
import { useContext, useState } from "react";
import { PokemonContext } from "../context/FavoriteContext";
import Swal from "sweetalert2";
import styles from "./searchAutoComplete.module.css"

export default function SearchAutocomplete() {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { searchPokemon, state, dispatch } = useContext(PokemonContext);

  const handleInputChange = (event, value) => {
    setInputValue(event.target.value);
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
    setInputValue("")
  };

  return (
    <div className={styles.SearchContainer}>
      <Autocomplete
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
        style={{ marginRight: "10px" }}
      />
      <CustomButton name="Buscar" onClick={handleSearch} loading={loading} />
      <Box sx={{ marginLeft: "10px" }}>
        {state.filteredPokemons.length === 1 && (
          <CustomButton name={"Limpiar Búsqueda"} onClick={handleCleanSearch} />
        )}
      </Box>
    </div>
  );
}
