import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Post {
    _id: string;
    title: string;
    description?: string;
    image?: string;
    user: {
        _id: string;
        username: string;
    };
    createdAt: string;
}

interface PostsState {
    items: Post[];
    loading: boolean;
}

const initialState: PostsState = {
    items: [],
    loading: false,
};

export const fetchPosts = createAsyncThunk('posts/fetch', async () => {
    const response = await axios.get('http://localhost:8000/posts');
    return response.data;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchPosts.pending, state => {
                state.loading = true;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            });
    },
});

export default postsSlice.reducer;