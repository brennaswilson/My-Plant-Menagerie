import { Routes, Route } from "react-router-dom";

// custom components
import PlantTypesTable from "../components/PlantTypes/PlantTypesTable";
import AddPlantType from "../components/PlantTypes/ModalAddPlantType";
import UpdatePlantTypes from '../components/PlantTypes/UpdatePlantTypes';

// Code in this function adapted from the CS340 starter code.
// Date Accessed: 4 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

function PlantTypesPage(){
    return (
        <>

        {/* display either the route is needed for the edit function */}
        <Routes>
            <Route path="/edit/:id" element={<UpdatePlantTypes />} />
            
            <Route path="/" element={
                <>
                
                {/* header & description */}
                <h2>Plant Types</h2>
                <p>Describes a type of plant in detail, including its common name, toxicity to common household pets, light preferences.</p>

                {/* render the table */}
                <PlantTypesTable />
                <br/>

                {/* display the add new soil button */}
                <AddPlantType />
                </> 
            } />

        </Routes>
        
        </>
    );
}

export default PlantTypesPage;
