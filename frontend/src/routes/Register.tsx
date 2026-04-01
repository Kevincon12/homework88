import { useState } from 'react';
import { Box, Button, TextField, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { registerUser } from '../features/users/usersSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = useAppSelector(state => state.users.loading);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(registerUser({ username, password }));
        if (result.meta.requestStatus === 'fulfilled') navigate('/');
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField label="Username" fullWidth margin="normal" value={username} onChange={e => setUsername(e.target.value)} />
            <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
            <Button type="submit" variant="contained" fullWidth disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Register'}
            </Button>
        </Box>
    );
};

export default Register;