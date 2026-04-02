import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchPosts } from '../features/posts/postsSlice';
import { Card, CardContent, Typography } from '@mui/material';

const Home = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(state => state.posts.items);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <div>
            {posts.map(post => (
                <Card key={post._id} sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Typography variant="h6">{post.title}</Typography>
                        <Typography>{post.user.username}</Typography>
                        {post.description && (
                            <Typography>{post.description}</Typography>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default Home;