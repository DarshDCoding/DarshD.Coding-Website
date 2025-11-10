import HomePage from "@/pages/HomePage.jsx";
import AboutMe from "@/pages/AboutMe.jsx";
import { Routes, Route } from "react-router";
import './App.css'

function App() {

  return (
      <>
          <Routes>
              <Route index  element={<HomePage/>} />
              <Route path="/about" element={<AboutMe/>} />
          </Routes>
      </>
  )
}

export default App
