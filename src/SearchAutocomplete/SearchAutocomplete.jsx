import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import CustomButton from "../CustomButton/CustomButton";
import { PokemonContext } from "../context/FavoriteContext";

export default function SearchAutocomplete() {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { searchPokemon } = useContext(PokemonContext);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleSearch = async (inputValue) => {
    setLoading(true); 
    await searchPokemon(inputValue);
    setLoading(false); 
  };
  return (
    <div style={{display:"flex",alignItems:"center", width:"30%", justifyContent:"space-between"}}>
      <TextField
        label="Pokemon"
        variant="outlined"
        sx={{ width: 300 }}
        onChange={handleInputChange}
      />
      <CustomButton name="Buscar" onClick={() => handleSearch(inputValue)} loading={loading} />
    </div>
  );
}
