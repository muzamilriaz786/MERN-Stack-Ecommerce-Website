import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/home";
import CartList from "./pages/productCart";
import Register from './pages/register'
import Login from './pages/login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/CartList" element={<CartList />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
