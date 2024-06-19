import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";

export default function SearchAutocomplete({ options, onFilterChange }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    const filtered = options.filter((option) => option.name === newInputValue);

    if (filtered != "") {
      onFilterChange(filtered);
    } else {
      onFilterChange(options);
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
