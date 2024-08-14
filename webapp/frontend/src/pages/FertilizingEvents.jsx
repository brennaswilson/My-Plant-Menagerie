import { Routes, Route } from "react-router-dom";

// custom components
import FertilizingEventsTable from "../components/FertilizingEvents/FertilizingEventsTable";
import AddFertilizingEvent from "../components/FertilizingEvents/ModalAddFertilizingEvent";
import UpdateFertilizingEvents from '../components/FertilizingEvents/UpdateFertilizingEvents';

// Code in this function adapted from the CS340 starter code.
// Date Accessed: 4 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app


function FertilizingEventsPage(){
    return (
        <>

        {/* display either the route is needed for the edit function */}
        <Routes>
            <Route path="/edit/:id" element={<UpdateFertilizingEvents />} />
            
            <Route path="/" element={
                <>
                
                {/* header & description */}
                <h2>Fertilizing Event Log</h2>
                <p>Keep a record of every time that a plant gets fertilized.</p>

                {/* render the table */}
                <FertilizingEventsTable />
                <br/>

                {/* display the add new soil button */}
                <AddFertilizingEvent />
                </> 
            } />

        </Routes>
        

        </>
    );
}



export default FertilizingEventsPage;
