// Code in this function adapted from the CS340 starter code.
// Date Accessed: 4 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app



/* eslint-disable react/prop-types */
const HomeTableRowWatering = ({ PlantsDueWatering }) => {

  const NextWateringDate = PlantsDueWatering.NextWateringDate.slice(0,10);
  const todayDate = new Date().toISOString().slice(0,10);
  const pastDue = NextWateringDate < todayDate;


  return (
    <>
    
    {/* anything that is overdue, make red via css */}
    {pastDue && 
    <tr key={PlantsDueWatering.plantID}>
      <td class="pastDueRow"> {PlantsDueWatering.displayName}</td>

      {PlantsDueWatering.LastWateredDate && <td class="pastDueRow">{PlantsDueWatering.LastWateredDate.slice(0,10)}</td> }
      {!PlantsDueWatering.LastWateredDate && <td class="pastDueRow">none</td> }

      {PlantsDueWatering.NextWateringDate && <td class="pastDueRow">{PlantsDueWatering.NextWateringDate.slice(0,10)}</td>}
      {!PlantsDueWatering.NextWateringDate && <td class="pastDueRow">none</td>}
    </tr>
    }

    {/* anything not overdue, but upcoming, do not make red */}
    {!pastDue && 
    <tr key={PlantsDueWatering.plantID}>
      <td>{PlantsDueWatering.displayName}</td>

      {PlantsDueWatering.LastWateredDate && <td>{PlantsDueWatering.LastWateredDate.slice(0,10)}</td> }
      {!PlantsDueWatering.LastWateredDate && <td>none</td> }

      {PlantsDueWatering.NextWateringDate && <td>{PlantsDueWatering.NextWateringDate.slice(0,10)} </td>}
      {!PlantsDueWatering.NextWateringDate && <td>none</td>}
    </tr>
    } 

    </>
  );
};

export default HomeTableRowWatering;
