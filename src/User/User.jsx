import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { PokemonContext } from "../context/FavoriteContext";
import { Card, CardContent, Avatar, Typography, Box, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PersonIcon from '@mui/icons-material/Person';

export const User = ({ userId }) => {
    const { setUser, state } = useContext(PokemonContext);
    const { user } = state;
    const theme = useTheme();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://localhost:44337/api/User/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user", error);
            }
        };

        fetchUser();
    }, [userId, setUser]);

    if (!user) return <div>Cargando usuario...</div>;

    return (
        <Box sx={{  display: 'flex',justifyContent: 'flex-start', alignItems: 'center', paddingLeft:"30px" }}>
            <Card sx={{ width: 'auto', borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent:"space-around" }}>
                        <Avatar sx={{ width: "auto", height: "auto"}}>
                            <PersonIcon sx={{ fontSize: 100 }} />
                        </Avatar>
                        <div style={{display: "flex", flexDirection: "column", marginLeft:"10px"}}>
                        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                            {user.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Edad: {user.age}
                        </Typography>
                        </div>
                    </Box>
              
                </CardContent>
            </Card>
        </Box>
    );
};
