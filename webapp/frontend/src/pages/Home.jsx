import { Routes, Route, Link } from "react-router-dom";

// custom components
import HomeTableWatering from "../components/Home/HomeTableWatering";
import HomeTableFertilzing from "../components/Home/HomeTableFertilizing";

// Code in this function adapted from the CS340 starter code.
// Date Accessed: 4 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app


function HomePage(){
    return (
        <>

        {/* display either the route is needed for the edit function */}
        <Routes>

            
            <Route path="/" element={
                <>
                
                {/* header & description */}
                <h2>Your Plant Menagerie</h2>

            <p>A database driven web app to help you care for your house plants. <br/> For more information about this project click <Link to="/about">here</Link>.
            </p>
            <br/>


                <p align='left'><strong>Watering Schedule </strong> </p>

                {/* render the table */}
                <HomeTableWatering />
                <p align='left'>* Red Highlight means your plant is overdue for a watering.</p>
                <p>*Plants that have not been watered won't show up until they have at least one event logged.</p>
                <br/>
                <br/>

                <p align='left'><strong>Fertilizing Schedule </strong></p>

                {/* render the table */}
                <HomeTableFertilzing />
                <p align='left'>* Red Highlight means your plant is overdue for a fertilizing.</p>
                <p>*Plants that have not been fertilized won't show up until they have at least one event logged.</p>

                </> 
            } />

        </Routes>
        

        </>
    );
}



export default HomePage;
