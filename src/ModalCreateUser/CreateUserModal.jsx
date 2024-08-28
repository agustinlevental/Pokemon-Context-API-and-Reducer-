import { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from "./createUserModal.module.css"

export default function CreateUserModal({ open, onClose, onUserCreated,user }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [nameError, setNameError] = useState('');
  const [ageError, setAgeError] = useState('');

  const validateName = (name) => {
    if (!/^[A-Za-z]{3,}$/.test(name)) {
      setNameError('Name must contain at least 3 letters and no spaces.');
      return false;
    }
    setNameError('');
    return true;
  };

  const validateAge = (age) => {
    const ageNumber = parseInt(age);
    if (!/^\d+$/.test(age) || ageNumber < 18 || ageNumber > 99) {
      setAgeError('Age must be a number between 18 and 99.');
      return false;
    }
    setAgeError('');
    return true;
  };

  const handleCreateUser = async () => {
    const isNameValid = validateName(name);
    const isAgeValid = validateAge(age);

    if (!isNameValid || !isAgeValid) {
      return;
    }

    try {
      const response = await axios.post('https://leventalpokeapi.somee.com/api/User', {
        name,
        age: parseInt(age),
        favoritesPokemons: []
      });
      onUserCreated(response.data);
      onClose();
      Swal.fire({
        title: "Good job!",
        text: "You can now add favorite Pokemon",
        icon: "success"
      });
    } catch (error) {
      console.error('Error creating user:', error);
    }
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
        {nameError && <Typography sx={{ fontSize: '10px', color: 'red' }}>{nameError}</Typography>}
        
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
        {ageError && <Typography sx={{ fontSize: '10px', color: 'red' }}>{ageError}</Typography>}
<div className={styles.flexEnd}>
        <div className={styles.buttonsContainer}>
       
          <Button onClick={handleCreateUser} variant="contained" color="primary" sx={{ marginTop: "15px",  }}>
            Create User
          </Button>
          <Button onClick={onClose} variant="contained"   sx={{ marginTop: "15px", width: "130px" }}>
           Cancel
          </Button>
        </div>
        </div>
      </Box>
    </Modal>
  );
}
