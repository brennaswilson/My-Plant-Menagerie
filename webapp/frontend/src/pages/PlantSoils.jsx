import { Routes, Route } from "react-router-dom";

// custom components
import PlantSoilsTable from "../components/PlantSoils/PlantSoilsTable";
import AddPlantSoil from "../components/PlantSoils/ModalAddPlantSoil";
import UpdatePlantSoils from '../components/PlantSoils/UpdatePlantSoils';

// Code in this function adapted from the CS340 starter code.
// Date Accessed: 4 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app


function PlantSoilsPage(){
    return (
        <>

        {/* display either the route is needed for the edit function */}
        <Routes>
            <Route path="/edit/:id" element={<UpdatePlantSoils />} />
            
            <Route path="/" element={
                <>
                
                {/* header & description */}
                <h2>Plant Soils Log</h2>
                <p>Keep a record of all plant and soil relationships.</p>

                {/* render the table */}
                <PlantSoilsTable />
                <br/>

                {/* display the add new soil button */}
                <AddPlantSoil />
                </> 
            } />

        </Routes>
        

        </>
    );
}



export default PlantSoilsPage;
