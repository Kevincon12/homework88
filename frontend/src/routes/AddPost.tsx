import { useState } from 'react';
import { useAppSelector } from '../app/hooks';
import axios from 'axios';
import { TextField, Button, CircularProgress, Box } from '@mui/material';
import type { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
    const user = useAppSelector(state => state.users.user);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) return;
        if (!title) return setError('Title is required');
        setLoading(true);
        setError('');
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            if (image) formData.append('image', image);

            await axios.post('http://localhost:8000/posts', formData, {
                headers: { Authorization: user.token, 'Content-Type': 'multipart/form-data' },
            });

            setTitle('');
            setDescription('');
            setImage(null);

            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Error creating post');
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: '20px auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <TextField
                label="Title"
                value={title}
                onChange={e => setTitle(e.target.value)} required
            />
            <TextField
                label="Description"
                multiline minRows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <Button variant="contained" component="label">
                Choose Image
                <input
                    type="file"
                    hidden
                    onChange={e => setImage(e.target.files?.[0] || null)}
                />
            </Button>
            {image && <Box>{image.name}</Box>}
            <Box sx={{ position: 'relative' }}>
                <Button type="submit" variant="contained" disabled={loading} fullWidth>
                    Create Post
                </Button>
                {loading && <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} />}
            </Box>
            {error && <Box color="red">{error}</Box>}
        </form>
    );
};

export default AddPost;