import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { useFavourites } from "../context/favouriteContext";


export default function SearchAutocomplete({ options }) {
  const { handleFilterChange } = useFavourites();
  const [inputValue, setInputValue] = useState("");

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
      inputValue={inputValue}
      onInputChange={handleInputChange}
      renderInput={(params) => <TextField {...params} label="Pokemon" />}
    />
  );
}
