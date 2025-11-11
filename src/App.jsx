import HomePage from "@/pages/HomePage.jsx";
import FrontEndGallery from "@/pages/FrontEndGallery.jsx";
import AboutMe from "@/pages/AboutMe.jsx";
import ContactPage from "@/pages/ContactPage.jsx"
import NotFoundPage from "@/pages/NotFoundPage.jsx"

import { Routes, Route } from "react-router";
import './App.css'

function App() {

  return (
      <>
          <Routes>
              <Route index  element={<HomePage/>} />
              <Route path="/about" element={<AboutMe/>} />
              <Route path="/contact" element={<ContactPage/>} />
              <Route path="/frontend_gallery" element={<FrontEndGallery/>} />
              <Route path="/*" element={<NotFoundPage/>} />
          </Routes>
      </>
  )
}

export default App
