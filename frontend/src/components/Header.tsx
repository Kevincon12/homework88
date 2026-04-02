import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { logout } from '../features/users/usersSlice';

export const Header = () => {
    const user = useAppSelector(state => state.users.user);
    const dispatch = useAppDispatch();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1, cursor: 'pointer' }}
                    component={Link}
                    to="/"
                    color="inherit"
                    style={{ textDecoration: 'none' }}
                >
                    My App
                </Typography>

                {!user ? (
                    <>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/register">Register</Button>
                    </>
                ) : (
                    <Button color="inherit" onClick={() => dispatch(logout())}>Logout</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};