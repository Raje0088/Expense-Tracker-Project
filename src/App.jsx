import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Header from "./components/Header";
import { Routes,Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Header />} />
    </Routes>
      
    </>
  );
}

export default App;
