import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import { PokemonContext } from "../context/favouriteContext";
import CustomButton from "../CustomButton/CustomButton";

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
    <div style={{display:"flex",alignItems:"center", width:"30%", justifyContent:"space-between"}}>
      <TextField
        label="Pokemon"
        variant="outlined"
        sx={{ width: 300 }}
        onChange={handleInputChange}
      />
      <CustomButton name={"Buscar"} onClick={handleSearch}/>
    </div>
  );
}
