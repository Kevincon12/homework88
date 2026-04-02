import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';
import { useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
    const user = useAppSelector(state => state.users.user);
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const submit = async () => {
        if (!title) return alert('Title required');
        if (!description && !image) return alert('Fill description or image');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (image) formData.append('image', image);

        await axios.post('http://localhost:8000/posts', formData, {
            headers: {
                Authorization: user?.token,
            },
        });

        navigate('/');
    };

    return (
        <Box sx={{ maxWidth: 500, marginLeft: 4 }}>
            <TextField
                fullWidth
                label="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                sx={{ marginBottom: 2 }}
            />

            <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
                sx={{ marginBottom: 2 }}
            />

            <input
                type="file"
                onChange={e => setImage(e.target.files?.[0] || null)}
            />

            <Button variant="contained" onClick={submit} sx={{ marginTop: 2 }}>
                Create Post
            </Button>
        </Box>
    );
};

export default AddPost;