import { Routes, Route } from "react-router-dom";

// custom components
import PlantsTable from "../components/Plants/PlantsTable";
import AddPlant from "../components/Plants/ModalAddPlant";
import UpdatePlants from '../components/Plants/UpdatePlants';

// Code in this function adapted from the CS340 starter code.
// Date Accessed: 4 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app


function PlantsPage(){
    return (
        <>

        {/* display either the route is needed for the edit function */}
        <Routes>
            <Route path="/edit/:id" element={<UpdatePlants />} />

            <Route path="/" element={
                <>
                
                {/* header & description */}
                <h2>Your Plants</h2>
                <p>Keep a record of every plant you have.</p>

                {/* render the table */}
                <PlantsTable />
                <br/>

                {/* display the add new soil button */}
                <AddPlant />
                </> 
            } />

        </Routes>
        

        </>
    );
}



export default PlantsPage;
