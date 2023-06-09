import React, {useEffect, useState} from "react";
import "../Styles/AdminLocksTableComponent.css"
import ExpandedLocksRowForm from "./ExpandedLocksRowForm";

function AdminLocksTableComponent(props){
    const [allLockData, setAllLockData] = useState([]);
    const [userID, setUserID] = useState("");

    useEffect(()=>{
        setUserID(props.userID)
        props.locksInformation.forEach(row => {
            row['expandDetails'] = false
            if(row['owner'] === props.userID){
                row['access_type'] = "Owner"
            }else{
                row['access_type'] = "Guest"
            }
        })
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

    function FetchLockInformationAgain(){
        props.fetchLockInformation();
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
                    <th>Owner</th>
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
                           <td>
                               <input type={"checkbox"} checked={eachRow['access_type'] === "Owner"} disabled={true}/>
                           </td>
                       </tr>
                       {
                           eachRow['expandDetails'] &&
                           <tr>
                               <td colSpan={4}>
                                   <ExpandedLocksRowForm
                                       eachRow={eachRow}
                                       FetchLockInformationAgain={FetchLockInformationAgain}
                                       userID={userID}
                                   />
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