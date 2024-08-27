import { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

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
      const response = await axios.post('https://localhost:44337/api/User', {
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
      <Box sx={{ width: 400, margin: 'auto', marginTop: '15%', padding: 3, backgroundColor: 'white', borderRadius: 2 }}>
        <h2>Create User</h2>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => validateName(name)}
          margin="normal"
        />
        {nameError && <Typography sx={{ fontSize: '10px', color: 'red' }}>{nameError}</Typography>}
        
        <TextField
          fullWidth
          label="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          onBlur={() => validateAge(age)}
          margin="normal"
        />
        {ageError && <Typography sx={{ fontSize: '10px', color: 'red' }}>{ageError}</Typography>}
<div style={{ width:"100%", display: "flex", justifyContent: "flex-end" }}>
        <div style={{ width:"70%", display: "flex", justifyContent: "space-between" }}>
       
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
