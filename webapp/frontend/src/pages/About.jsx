
function AboutPage(){
    return(
        <>
        <h1 style={{fontSize:'40px'}}> About</h1>
        <br/>
        <br/>
        <h2 align="left">Overview</h2>

        <p align="left">
        Tired of killing all your houseplants? Looking to optimize yield in your vegetable garden? Gardening is a fantastic hobby for millions of people worldwide, but the more you delve into the hobby, the harder it is to keep track of all your plants' needs. Your Plant Menagerie tracks the care and upkeep of people's plants, so they focus more on their gardening hobby and less on their plant schedules. Information such as the soil a plant has been in or is currently in, a plant's currentLight versus its preferred light, and if its due to be watered are just some ways in which you can populate and utilize the database for future plant care ease. Track the UpkeepEvents of your Plants in multiple locations with the web-based database application. The application will be able to keep track of up to 500 of your houseplants and garden plants, to make sure you never have to guess when your plant needs care.         </p>
        
        <h2 align="left">Assumptions</h2>
        <p align="left">
            This database tracks last watered and last fertilized events, but as each plant may have different needs, the database does not necessarily advise when the next watering or fertilizing event is due. The intervals of these events are set at an individual Plant basis, not necessarily with a PlantType as the location and light levels that an individual plant receives are significant factors. We also assume that the user has access to a computer or tablet.
        </p>
        <h2 align="left">Limitations and Scalability</h2>
        
        <p align="left">
            For now, the database does not have multiple users as an option, so someone could not see who watered the plant last. Also, plants cannot be grouped by location in a person's house.
        </p>
        
        
        </>
    );
}

export default AboutPage;