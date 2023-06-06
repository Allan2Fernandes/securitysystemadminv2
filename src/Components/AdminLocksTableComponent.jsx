import React, {useEffect, useState} from "react";
import "../Styles/AdminLocksTableComponent.css"
import ExpandedLocksRowForm from "./ExpandedLocksRowForm";

function AdminLocksTableComponent(props){
    const [allLockData, setAllLockData] = useState([]);

    useEffect(()=>{
        props.locksInformation.forEach(row => row['expandDetails'] = false)
        setAllLockData(props.locksInformation)

    }, [props])

    function onClickHandlerExpandDetails(index){
        var newAllLockData = [...allLockData]
        newAllLockData.forEach((row, everyIndex) => {
            if(everyIndex === index) return;
            row['expandDetails'] = false;
        })
        newAllLockData[index]['expandDetails'] = !newAllLockData[index]['expandDetails'];
        setAllLockData(newAllLockData)
    }

    return (
        <div id={"MainAdminLocksTableComponentDiv"}>
            <table id={"AdministerLocksTable"}>
                <thead>
                <tr id={"AdminLocksTableHeaderRow"}>
                    <th>Lock ID</th>
                    <th>Lock Name</th>
                    <th>Lock Serial Number</th>
                    <th>Active status</th>
                </tr>
                </thead>
                <tbody id={"AdminLocksTableBody"}>
                {allLockData.map((eachRow, index) =>(
                   <React.Fragment key={index}>
                       <tr className={index%2===0?"EvenAdminUsersRow":"OddAdminUsersRow"} onClick={() => onClickHandlerExpandDetails(index)}>
                           <td>
                               {eachRow['_id']}
                           </td>
                           <td>
                               {eachRow['name']}
                           </td>
                           <td>
                               {eachRow['serial']}
                           </td>
                           <td>
                               <input type={"checkbox"} checked={eachRow['active']} disabled={true}/>
                           </td>
                       </tr>
                       {
                           eachRow['expandDetails'] &&
                           <tr>
                               <td colSpan={4}>
                                   <ExpandedLocksRowForm eachRow={eachRow}/>
                               </td>
                           </tr>
                       }
                   </React.Fragment>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminLocksTableComponent