import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
    _id: string;
    username: string;
    token: string;
}

interface UsersState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    user: null,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    'users/login',
    async ({ username, password }: { username: string; password: string }) => {
        const response = await axios.post('http://localhost:8000/users/login', { username, password });
        return response.data;
    }
);

export const registerUser = createAsyncThunk(
    'users/register',
    async ({ username, password }: { username: string; password: string }) => {
        const response = await axios.post('http://localhost:8000/users/register', { username, password });
        return response.data;
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loginUser.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Login failed';
            })
            .addCase(registerUser.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Registration failed';
            });
    },
});

export const { logout } = usersSlice.actions;
export default usersSlice.reducer;