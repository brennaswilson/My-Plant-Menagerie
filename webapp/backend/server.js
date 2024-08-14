// This module adapted from the CS340 starter code.
// Date Accessed: 1 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8500; // will use PORT declared in .env but if nothing declared, defaults to 8500

// Middleware:

// If on FLIP, use cors() middleware to allow cross-origin requests from the frontend with your port number:
// EX (local): http://localhost:5173 
// EX (FLIP/classwork) http://flip3.engr.oregonstate.edu:5173

app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());

// API Routes for backend CRUD:
app.use("/api/soilTypes", require("./routes/SoilTypesRoutes.js"));
app.use("/api/WateringEvents", require("./routes/WateringEventsRoutes.js"));
app.use("/api/FertilizingEvents", require("./routes/FertilizingEventsRoutes.js"));
app.use("/api/plantTypes", require("./routes/PlantTypesRoutes.js"));
app.use("/api/Plants", require("./routes/PlantsRoutes.js"));
app.use("/api/PlantSoils", require("./routes/PlantSoilsRoutes.js"));
app.use("/api/NextWateringDate", require("./routes/HomeRoutesWatering.js"));
app.use("/api/NextFertilizingDate", require("./routes/HomeRoutesFertilizing.js"));



// Match to your database config route
const db = require('./database/config.js');


// Citation for how to dynamically change the hostname in the log output
// DATE ACCESSED: 3 August 2024
// URL: https://stackoverflow.com/questions/20553554/node-js-return-hostname
const os = require("os");
const hostname = os.hostname();

// changed this back to PORT, this shouldn't be hardcoded because it'll automatically use whatever we set in the .env
app.listen(PORT, () => {
  console.log(`Server running on http://${hostname}:${PORT}...`);
});