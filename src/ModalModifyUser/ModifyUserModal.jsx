import { useContext, useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { PokemonContext } from "../context/FavoriteContext";
import styles from "./modifyUserModal.module.css";

export default function ModifyUserModal({
  open,
  onClose,
  onUserModified,
  user,
}) {
  const { setUser } = useContext(PokemonContext);
  const [name, setName] = useState(`${user.name}`);
  const [age, setAge] = useState(`${user.age}`);
  const [nameError, setNameError] = useState("");
  const [ageError, setAgeError] = useState("");

  const validateName = (name) => {
    if (!/^[A-Za-z]{3,}$/.test(name)) {
      setNameError("Name must contain at least 3 letters and no spaces.");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateAge = (age) => {
    const ageNumber = parseInt(age);
    if (!/^\d+$/.test(age) || ageNumber < 18 || ageNumber > 99) {
      setAgeError("Age must be a number between 18 and 99.");
      return false;
    }
    setAgeError("");
    return true;
  };

  const handleModifyUser = async () => {
    const url = `https://leventalpokeapi.somee.com/api/User/${user.id}`;
    const data = {
      id: user.id,
      name: name,
      age: age,
      favoritesPokemons: user.favoritesPokemons,
    };

    axios.put(url, data).then((result) => {
      onClose();
      setUser(data);
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
   <Box className={styles.modalBox}>
   <h2 className={styles.modalTitle}>Create User</h2>
   <div className={styles.containerTextFields}>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => validateName(name)}
          margin="normal"
          className={styles.textField}
        />
        {nameError && (
          <Typography sx={{ fontSize: "10px", color: "red" }}>
            {nameError}
          </Typography>
        )}

        <TextField
          fullWidth
          label="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          onBlur={() => validateAge(age)}
          margin="normal"
          className={styles.textField}
        />
        </div>
        {ageError && (
          <Typography sx={{ fontSize: "10px", color: "red" }}>
            {ageError}
          </Typography>
        )}
       <div className={styles.flexEnd}>
       <div className={styles.buttonsContainer}>
            <Button
              onClick={handleModifyUser}
              variant="contained"
              color="primary"
              sx={{ marginTop: "15px" }}
            >
              Modify User
            </Button>
            <Button
              onClick={onClose}
              variant="contained"
              sx={{ marginTop: "15px", width: "130px" }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
