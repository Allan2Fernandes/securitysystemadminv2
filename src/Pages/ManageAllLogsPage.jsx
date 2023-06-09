import React, {useEffect, useState} from "react";
import "../Styles/ManageAllLogsPage.css"
import SideBar from "../Components/SideBar";
import ManageLogsTable from "../Components/ManageLogsTable";
import {useLocation} from "react-router-dom";

function ManageAllLogsPage(){
    const [selectedLockID, setSelectedLockID] = useState("")
    const [lockInfo, setLockInfo] = useState({
        active: false,
        expandDetails: false,
        lock_access: [],
        name: "",
        owner: "",
        serial: "",
        _id: ""
    })
    const location = useLocation()

    useEffect(() =>{
        try{
            setLockInfo(location.state.lockInfo);
            setSelectedLockID(location.state.lockInfo['_id'])
            console.log(location.state.lockInfo['_id'])
        }catch (err){
            console.log("Location doesnt exist")
        }
    }, [])

    return (
        <div id={"MainDivManageAllLogsPage"}>
            <SideBar/>
            <h1 id={"ManageLogsTitle"}>{"View logs for Lock: " + selectedLockID}</h1>
            {
                selectedLockID !== "" &&
                <ManageLogsTable selectedLockID={selectedLockID}/>
            }

        </div>
    )
}

export default ManageAllLogsPage