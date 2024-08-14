import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


// import styling (custom & bootstrap)
import './App.scss'

// import components
import NavBar from './components/navigation.jsx';
import Footer from './components/footer.jsx';

// import individual pages
import Home from './pages/Home.jsx';
import PlantsPage from './pages/Plants.jsx';
import PlantTypesPage from './pages/PlantTypes.jsx';
import SoilTypesPage from './pages/SoilTypes.jsx'
import WateringEventsPage from './pages/WateringEvents.jsx'
import FertilizingEventsPage from './pages/FertilizingEvents.jsx'
import PlantSoilsPage from './pages/PlantSoils.jsx'
import AboutPage from './pages/About.jsx';

function App() {
 
  return (
    <>
    <BrowserRouter>
  
    <NavBar />
    <main className="main-content">
      <section>
        <Routes> 
          <Route path="/*" element={<Home />} />
          <Route path="/plants/*" element={<PlantsPage />} />
          <Route path="/plantTypes/*" element={<PlantTypesPage />} />
          <Route path="/soilTypes/*" element={<SoilTypesPage />} />  
          <Route path="/wateringEvents/*" element={<WateringEventsPage />} />
          <Route path="/fertilizingEvents/*" element={<FertilizingEventsPage />} />
          <Route path="/plantSoils/*" element={<PlantSoilsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>   
      </section>
    </main>
    
    <Footer />

    </BrowserRouter>
    </>
  );
}

export default App
