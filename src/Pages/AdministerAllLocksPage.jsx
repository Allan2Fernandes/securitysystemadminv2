import React, {useEffect, useState} from "react";
import "../Styles/AdministerAllLocksPage.css"
import SideBar from "../Components/SideBar";
import {baseURL} from "../Constants";
import ExpandedDivAllLocksPage from "../Components/ExpandedDivAllLocksPage";
import secureLocalStorage from "react-secure-storage";

function AdministerAllLocksPage(){
    const [allLocksInformation, setAllLocksInformation] = useState([]);
    const [expandDetails, setExpandDetails] = useState(false)


    useEffect(() =>{
        fetchLockInformation()
    }, [])


    function fetchLockInformation(){
        //Fetch all information about the lock ids
        var completeURL = baseURL + "api/v1/lock";

        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': secureLocalStorage.getItem('sessionToken')
            }
        }

        fetch(completeURL, requestOptions)
            .then(response => response.json())
            .then(data =>{
                data.forEach((eachRow)=> eachRow['expandDetails'] = false)
                setAllLocksInformation(data)
            })
    }

    function onClickHandlerExpandDetails(index){
        var newAllLockData = [...allLocksInformation]
        newAllLockData.forEach((row, everyIndex) => {
            if(everyIndex === index) return;
            row['expandDetails'] = false;
        })
        newAllLockData[index]['expandDetails'] = !newAllLockData[index]['expandDetails'];
        setAllLocksInformation(newAllLockData)
    }

    return (
        <div id={"MainAdministerAllLocksPageDiv"}>
            <SideBar/>
            <h1 id={"ManageAllLocksPageTitle"}>Manage All Locks</h1>
            <div id={"AdministerTableAllLocksPageTableDiv"}>
                <table id={"AdministerTableAllLocksPageTable"}>
                    <thead>
                    <tr id={"AdminLocksTableHeaderRow"}>
                        <th>Lock ID</th>
                        <th>Lock Name</th>
                        <th>Lock Serial Number</th>
                        <th>Active status</th>
                        <th>Owner ID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        allLocksInformation.map((eachLock, index) =>(
                            <React.Fragment key={index}>
                                <tr className={index%2===0?"EvenAdminUsersRow":"OddAdminUsersRow"} onClick={() => onClickHandlerExpandDetails(index)}>
                                    <td>
                                        {eachLock['_id']}
                                    </td>
                                    <td>
                                        {eachLock['name']}
                                    </td>
                                    <td>
                                        {eachLock['serial']}
                                    </td>
                                    <td>
                                        <input type={"checkbox"} disabled={true} checked={eachLock['active']}/>
                                    </td>
                                    <td>
                                        {eachLock['owner']}
                                    </td>
                                </tr>
                                {
                                    eachLock['expandDetails'] &&
                                    <tr>
                                        <td colSpan={5}>
                                            <ExpandedDivAllLocksPage lockInfo={eachLock} fetchLockInformationAgain={fetchLockInformation}/>
                                        </td>
                                    </tr>
                                }
                            </React.Fragment>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdministerAllLocksPage