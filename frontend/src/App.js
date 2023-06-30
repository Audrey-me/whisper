import Home from "./components/Home";
import Transcribe from "./components/Transcribe"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React,{useEffect, useState} from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/transcribe")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  
  

  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route exact path="/" index element={<Home />} />
          <Route path="/translate-audio" index element={<Transcribe message={{ message: message }} />} />
        </Routes>
    </BrowserRouter>
    </>
  );
}
export default App;
