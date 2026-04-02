import { useState, useEffect } from 'react';
import { TextField, Button, CircularProgress, Box } from '@mui/material';
import type { SyntheticEvent } from 'react';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { registerUser } from "../features/users/usersSlice";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const dispatch = useAppDispatch();
    const { loading, error, user } = useAppSelector(state => state.users);
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(registerUser({ username, password }));
    };

    useEffect(() => {
        if (user) navigate('/');
    }, [user, navigate]);

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '20px auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <TextField
                label="Username"
                value={username}
                onChange={e => setUsername(e.target.value)} required
            />
            <TextField
                type="password"
                label="Password"
                value={password} onChange={e => setPassword(e.target.value)} required
            />
            <Box sx={{ position: 'relative' }}>
                <Button type="submit" variant="contained" disabled={loading} fullWidth>
                    Register
                </Button>
                {loading && <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} />}
            </Box>
            {error && <Box color="red">{error}</Box>}
        </form>
    );
};

export default Register;