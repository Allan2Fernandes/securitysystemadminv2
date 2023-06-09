import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {baseURL} from "../Constants";
import SideBar from "../Components/SideBar";
import "../Styles/ManageLocksPage.css"
import AdminLocksTableComponent from "../Components/AdminLocksTableComponent";


function ManageUsersLocksPage(){
    const location = useLocation();
    const [userID, setUserID] = useState("");
    const [usersEmail, setUsersEmail] = useState("");
    const [lockIDs, setLockIDs] = useState([]);
    const [locksInformation, setLocksInformation] = useState([])

    useEffect(()=>{
        setUserID(location.state.userId)
        setLockIDs(location.state.lockIDs)
        setUsersEmail(location.state.usersEmail)
        fetchLockInformation()

    }, [location.state.id, location.state.lockIDs])

    function fetchLockInformation(){
        //Fetch all information about the lock ids
        var completeURL = baseURL + "api/v1/lock";

        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': localStorage.getItem('sessionToken')
            }
        }

        fetch(completeURL, requestOptions)
            .then(response => response.json())
            .then(data =>{
                var filteredData = data.filter(row => location.state.lockIDs.includes(row['_id']))
                setLocksInformation(filteredData)
            })
    }

    return (
        <div id={"MainManageLocksPageDiv"}>
            <SideBar/>
            <h1 id={"ManageUsersLocksPageTitle"}>{usersEmail + "'s access"}</h1>
            <AdminLocksTableComponent
                locksInformation={locksInformation}
                usersEmail={usersEmail}
                fetchLockInformation={fetchLockInformation}
                userID={userID}
            />
        </div>
    )
}

export default ManageUsersLocksPage