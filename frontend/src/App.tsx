import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';

const App = () => (
    <>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts/:id" element={<div>Post Page</div>} />
        </Routes>
    </>
);

export default App;