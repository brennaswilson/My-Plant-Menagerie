import { Routes, Route } from "react-router-dom";

// custom components
import WateringEventsTable from "../components/WateringEvents/WateringEventsTable";
import AddWateringEvent from "../components/WateringEvents/ModalAddWateringEvent";
import UpdateWateringEvents from '../components/WateringEvents/UpdateWateringEvents';

// Code in this function adapted from the CS340 starter code.
// Date Accessed: 4 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app


function WateringEventsPage(){
    return (
        <>

        {/* display either the route is needed for the edit function */}
        <Routes>
            <Route path="/edit/:id" element={<UpdateWateringEvents />} />
  
            <Route path="/" element={
                <>
                
                {/* header & description */}
                <h2>Watering Event Log</h2>
                <p>Keep a record of every time that a plant gets watered.</p>

                {/* render the table */}
                <WateringEventsTable />
                <br/>

                {/* display the add new soil button */}
                <AddWateringEvent />
                </> 
            } />

        </Routes>
        

        </>
    );
}



export default WateringEventsPage;
