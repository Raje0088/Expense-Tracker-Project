import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Header from "./components/Header";
import Profile from "./components/Profile";
import { Routes, Route } from "react-router-dom";
import Expense from "./components/Expense";
import AddCart from "./components/AddCart"


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Header />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/expense" element={<Expense />} /> 
        <Route path="/cart" element={<AddCart />} />
      </Routes>
    </>
  );
}

export default App;
