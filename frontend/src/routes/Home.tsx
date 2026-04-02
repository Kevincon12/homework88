import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchPosts } from '../features/posts/postsSlice';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(state => state.posts.items);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <div>
            {posts.map(post => (
                <Card
                    key={post._id}
                    sx={{ marginBottom: 2, cursor: 'pointer' }}
                    onClick={() => navigate(`/posts/${post._id}`)}
                >
                    {post.image && (
                        <CardMedia
                            component="img"
                            height="200"
                            image={`http://localhost:8000/${post.image}`}
                        />
                    )}
                    <CardContent>
                        <Typography variant="h6">{post.title}</Typography>
                        <Typography variant="body2">
                            {post.user.username} • {dayjs(post.createdAt).format('DD.MM.YYYY HH:mm')}
                        </Typography>
                        {!post.image && post.description && (
                            <Typography>{post.description}</Typography>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default Home;