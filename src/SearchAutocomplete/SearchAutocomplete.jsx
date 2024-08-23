import { Autocomplete, TextField } from "@mui/material";
import { useState, useContext } from "react";
import CustomButton from "../CustomButton/CustomButton";
import { PokemonContext } from "../context/FavoriteContext";

export default function SearchAutocomplete() {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { searchPokemon, state } = useContext(PokemonContext);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
 
  };

  const handleSearch = async () => {
    setLoading(true); 
    await searchPokemon(inputValue);
    setLoading(false); 
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      await searchPokemon(inputValue);
    }
  };

  return (
    <div style={{display: "flex", alignItems: "center", width: "30%"}}>
      <Autocomplete
        options={state.pokemons.map((pokemon) => pokemon.name)}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField 
            {...params} 
            label="Pokemon" 
            variant="outlined"
            onKeyDown={handleKeyDown}
          />
        )}
        onInputChange={handleInputChange} 
        style={{marginRight:"10px"}}
      />
      <CustomButton name="Buscar" onClick={handleSearch} loading={loading} />
    </div>
  );
}
