import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import PostPage from "./routes/PostPage.tsx";
import AddPost from "./routes/AddPost.tsx";

const App = () => (
    <>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts/:id" element={<PostPage />} />
            <Route path="/add-post" element={<AddPost />} />
        </Routes>
    </>
);

export default App;