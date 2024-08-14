// Code in this function adapted from the CS340 starter code.
// Date Accessed: 4 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

/* eslint-disable react/prop-types */
const HomeTableRowFertilizing = ({ PlantsDueFertilizing }) => {
    const nextFertilizingDate = PlantsDueFertilizing.NextFertilizingDate.slice(0,10);
    const todayDate = new Date().toISOString().slice(0,10);
    const pastDue = nextFertilizingDate < todayDate;

  return (
    <>

    {/* anything that is overdue, make red via css */}
    {pastDue && 
    <tr >
      <td class="pastDueRow">{PlantsDueFertilizing.displayName}</td>

      {PlantsDueFertilizing.LastFertilizedDate && <td class="pastDueRow" >{PlantsDueFertilizing.LastFertilizedDate.slice(0,10)}</td>}
      {!PlantsDueFertilizing.LastFertilizedDate && <td class="pastDueRow" >none</td>}

      {PlantsDueFertilizing.NextFertilizingDate && <td class="pastDueRow">{PlantsDueFertilizing.NextFertilizingDate.slice(0,10)}</td>}
      {!PlantsDueFertilizing.NextFertilizingDate && <td class="pastDueRow" >none</td>}

    </tr>
    }

    {/* anything not overdue, but upcoming, do not make red */}
    {!pastDue && 
        <tr >
          <td>{PlantsDueFertilizing.displayName}</td>
    
          {PlantsDueFertilizing.LastFertilizedDate && <td>{PlantsDueFertilizing.LastFertilizedDate.slice(0,10)}</td>}
          {!PlantsDueFertilizing.LastFertilizedDate && <td>none</td>}
    
          {PlantsDueFertilizing.NextFertilizingDate && <td>{PlantsDueFertilizing.NextFertilizingDate.slice(0,10)}</td>}
          {!PlantsDueFertilizing.NextFertilizingDate && <td>none</td>}
    
        </tr>
      }
    </>
  );
};

export default HomeTableRowFertilizing;
