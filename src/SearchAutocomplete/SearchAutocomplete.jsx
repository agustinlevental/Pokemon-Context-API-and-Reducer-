import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import { PokemonContext } from "../context/favouriteContext";

export default function SearchAutocomplete({ options }) {
  const [inputValue, setInputValue] = useState("");
  const { state, dispatch } = useContext(PokemonContext)

  const handleFilterChange = (filtered) => {
    dispatch({ type: "setFilteredPokemons", filteredPokemons: filtered });
  };;


  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    const filtered = options.filter((option) => option.name === newInputValue);

    if (filtered != "") {
      handleFilterChange(filtered);
    } else {
      handleFilterChange(options);
    }
  };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      getOptionLabel={(option) => option.name}
      sx={{ width: 300 }}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      renderInput={(params) => <TextField {...params} label="Pokemon" />}
    />
  );
}
