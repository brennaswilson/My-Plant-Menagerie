// Code in this function heavily modified based on the logic for populating table rows in the CS340 starter code.
// Date Accessed: 4 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app



/* eslint-disable react/prop-types */
export const SoilSelectorOption = ({ SoilType }) => {

  return (
    // displays the Soil's name but sets the value equal to the Soil's primary key
    <option value={SoilType.soilID}>{SoilType.soilType}</option>
    
  );
},

SoilSelectorDefaultOption = ({ SoilType }) => {

  return (
    // displays the Soil's name but sets the value equal to the Soil's primary key
    <option selected value={SoilType.soilID}>{SoilType.soilType}</option>
  );
};


