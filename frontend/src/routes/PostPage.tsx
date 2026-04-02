import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, CardMedia, TextField, Button, CircularProgress, Box } from '@mui/material';
import dayjs from 'dayjs';
import { useAppSelector } from '../app/hooks';
import type { SyntheticEvent } from 'react';

const PostPage = () => {
    const { id } = useParams();
    const user = useAppSelector(state => state.users.user);

    const [post, setPost] = useState<any>(null);
    const [comments, setComments] = useState<any[]>([]);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchPost = async () => {
        const res = await axios.get(`http://localhost:8000/posts/${id}`);
        setPost(res.data);
    };

    const fetchComments = async () => {
        const res = await axios.get(`http://localhost:8000/comments/${id}`);
        setComments(res.data);
    };

    const addComment = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (!text || !user) return;
        setLoading(true);
        try {
            await axios.post(
                'http://localhost:8000/comments',
                { text, postId: id },
                { headers: { Authorization: user.token } }
            );
            setText('');
            fetchComments();
        } catch (err: any) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, [id]);

    if (!post) return <div>Loading...</div>;

    return (
        <div>
            <Card sx={{ marginBottom: 2 }}>
                {post.image && (
                    <CardMedia
                        component="img"
                        image={`http://localhost:8000/${post.image}`}
                        sx={{ maxHeight: 400, objectFit: 'contain' }}
                    />
                )}
                <CardContent>
                    <Typography variant="h5">{post.title}</Typography>
                    <Typography>
                        {post.user.username} • {dayjs(post.createdAt).format('DD.MM.YYYY HH:mm')}
                    </Typography>
                    {post.description && <Typography>{post.description}</Typography>}
                </CardContent>
            </Card>

            <Typography variant="h6">Comments</Typography>

            {comments.map(c => (
                <Card key={c._id} sx={{ marginBottom: 1 }}>
                    <CardContent>
                        <Typography>{c.user.username}</Typography>
                        <Typography>{c.text}</Typography>
                    </CardContent>
                </Card>
            ))}

            {user && (
                <form onSubmit={addComment}>
                    <TextField
                        fullWidth
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="Write comment"
                        sx={{ marginTop: 2 }}
                    />
                    <Box sx={{ position: 'relative', marginTop: 1 }}>
                        <Button type="submit" variant="contained" disabled={loading}>
                            Add Comment
                        </Button>
                        {loading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px'
                                }}
                            />
                        )}
                    </Box>
                </form>
            )}
        </div>
    );
};

export default PostPage;