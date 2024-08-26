import  { useContext, useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
      import Swal from 'sweetalert2';

export default function CreateUserModal({ open, onClose, onUserCreated }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  

  const handleCreateUser = async () => {
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
        text: "Ya puedes agregar pokemones a favoritos",
        icon: "success"
      });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (

    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: 400, margin: 'auto', marginTop: '15%', padding: 3, backgroundColor: 'white', borderRadius: 2 }}>
        <h2 style={{color:"black", display:"flex", justifyContent:"center"}}>Create User</h2>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
      
        <TextField
          fullWidth
          label="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        
          margin="normal"
        />
        <div style={{display:"flex", justifyContent:"flex-end"}}>
        <Button onClick={handleCreateUser} variant="contained" color="primary" fullWidth sx={{marginTop:"15px" ,width:"130px"}}>
          Create User
        </Button>
        </div>
      </Box>
    </Modal>
  );
}
