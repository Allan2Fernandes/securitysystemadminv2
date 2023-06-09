import React, {useEffect, useState} from "react";
import "../Styles/ExpandedLocksRowForm.css"
import {baseURL} from "../Constants";

function ExpandedLocksRowForm(props){
    const [allUsersData, setAllUsersData] = useState([])
    const [userID, setUserID] = useState("")
    const [lockInformation, setLockInformation] = useState({
        active: false,
        expandDetails: false,
        lock_access: [],
        name: "",
        owner: "",
        serial: "",
        _id: ""
    })

    useEffect(() =>{
        setLockInformation(props.eachRow)
        setUserID(props.userID)
        //Get all users data
        var completeURL = baseURL + "api/v1/user"
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': localStorage['sessionToken']
            },
        }
        fetch(completeURL, requestOptions)
            .then(response => response.json())
            .then(data =>{
                setAllUsersData(data)
            })
    }, [props])

    function handleSelectionChange(event){
        var newLockInformation = structuredClone(lockInformation)
        newLockInformation['owner'] = event.target.value
        setLockInformation(newLockInformation)
    }

    function handleLockNameChange(event){
        var newLockInformation = structuredClone(lockInformation)
        newLockInformation['name'] = event.target.value
        setLockInformation(newLockInformation)
    }

    function handleLockSerialChange(event){
        var newLockInformation = structuredClone(lockInformation)
        newLockInformation['serial'] = event.target.value
        setLockInformation(newLockInformation)
    }

    function UpdateLockDetails(){
        var completeURL = baseURL + "api/v1/lock"
        var requestBody = {
            //lock_access: [],
            name: lockInformation['name'],
            owner: lockInformation['owner'],
            serial: lockInformation['serial'],
            _id: lockInformation['_id']
        }
        console.log(requestBody)
        const requestOptions = {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': localStorage['sessionToken']
            },
            body: JSON.stringify(requestBody)
        }
        fetch(completeURL, requestOptions)
            .then(response => response.json())
            .then(data=>{
                console.log(data)
                props.FetchLockInformationAgain();
            })
    }

    function handleOnClickRemoveLockAccess(){
        var token = localStorage.getItem('sessionToken')
        var lock_id = lockInformation['_id']
        var guest_id = userID

        var completeURL = baseURL + "api/v1/lock/remove_access"
        var requestBody = {
            //lock_access: [],
            lock_id: lock_id,
            user_id: guest_id
        }
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': localStorage['sessionToken']
            },
            body: JSON.stringify(requestBody)
        }
        fetch(completeURL, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                props.FetchLockInformationAgain();
            })

    }

    return (
        <div id={"MainExpandedLocksRowFormDiv"}>
            <select value={lockInformation['owner']} onChange={(event) => handleSelectionChange(event)}>
                {
                    allUsersData.map((eachRow, index) =>(
                        <option value={eachRow['_id']} key={index}>{eachRow['email']}</option>
                    ))
                }
            </select>
            <input type={"text"} value={lockInformation['name']} onChange={(event) => handleLockNameChange(event)}/>
            <input type={"text"} value={lockInformation['serial']} onChange={(event) => handleLockSerialChange(event)}/>
            <button onClick={UpdateLockDetails}>Update details</button>
            {
                lockInformation['access_type'] !=="Owner" &&
                <button id={"AbandonLockButton"} onClick={handleOnClickRemoveLockAccess}>Abandon Lock</button>
            }
        </div>
    )
}

export default ExpandedLocksRowForm