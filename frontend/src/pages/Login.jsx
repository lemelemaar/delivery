import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button, Typography, Box, Alert, Paper } from "@mui/material";


function getCookie(name) {
    const cookieValue = document.cookie.split("; ").find((row) => row.startsWith(name + "="))?.split("=")[1];
    return cookieValue;
}


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/csrf/", { withCredentials: true });
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setMsg("");
        setError(false);
        try {
            const response = await axios.post("http://localhost:8000/api/login/", 
                { username, password },
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                }
            );
            setMsg(response.data.message);
            navigate("/delivery");
        } catch (err) {
            setMsg(err.response?.data?.error || "Ошибка входа");
            setError(true);
        }
    };

    return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom>Вход в систему</Typography>
            <Box component="form" onSubmit={handleLogin}>
                <TextField
                fullWidth
                margin="normal"
                label="Логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                fullWidth
                margin="normal"
                label="Пароль"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <Button fullWidth variant="contained" type="submit" sx={{ mt: 2, borderRadius: 2 }}>Войти</Button>
            </Box>
            {msg && (
                <Alert severity={error ? "error" : "success"} sx={{ nt: 2 }}>
                    {msg}
                </Alert>
            )}
        </Paper>
    </Container>
    );
}

export default Login;
