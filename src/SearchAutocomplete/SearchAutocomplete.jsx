import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import { PokemonContext } from "../context/favouriteContext";

export default function SearchAutocomplete() {
  const [inputValue, setInputValue] = useState("");
  const { searchPokemon } = useContext(PokemonContext);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleSearch = () => {
    if (inputValue) {
      searchPokemon(inputValue);
    }
  };
  return (
    <div>
      <TextField
        label="Pokemon"
        variant="outlined"
        sx={{ width: 300 }}
        onChange={handleInputChange}
      />
      <Button onClick={handleSearch}>Buscar</Button>
    </div>
  );
}
