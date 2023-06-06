import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {baseURL} from "../Constants";
import TopBar from "../Components/TopBar";
import "../Styles/ManageLocksPage.css"
import AdminLocksTableComponent from "../Components/AdminLocksTableComponent";


function ManageLocksPage(){
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
            <TopBar/>
            <center>
                <h1>{"Locks of " + usersEmail}</h1>
            </center>
            <AdminLocksTableComponent locksInformation={locksInformation} usersEmail={usersEmail} fetchLockInformation={fetchLockInformation}/>
        </div>
    )
}

export default ManageLocksPage