import React, {useEffect, useState} from "react";
import "../Styles/ExpandedDivAllLocksPage.css"
import {baseURL} from "../Constants";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

function ExpandedDivAllLocksPage(props){
    const navigate = useNavigate();
    const [lockInfo, setLockInfo] = useState({
        active: false,
        expandDetails: false,
        lock_access: [],
        name: "",
        owner: "",
        serial: "",
        _id: ""
    })
    const [ownerInfo, setOwnerInfo] = useState({
        email: "",
        encoding_path: "",
        image: "",
        is_admin: "",
        name: "",
        photo_path: "",
        user_access: [],
        verified: false,
        _id: ""
    })

    useEffect(() =>{
        setLockInfo(props.lockInfo)
        var ownerID = props.lockInfo['owner']

        //fetch owner details
        var completeURL = baseURL + "api/v1/user/" + ownerID
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
            .then(data=>{
                setOwnerInfo(data)
            })
    }, [props.lockInfo])

    function handleOnChangeLockProperty(event, property){
        var newLockInfo = structuredClone(lockInfo)
        newLockInfo[property] = event.target.value;
        setLockInfo(newLockInfo)
    }

    function SaveLockDetails(){
        var completeURL = baseURL + "api/v1/lock";

        var requestBody = {
            _id: lockInfo['_id'],
            name: lockInfo['name'],
            serial: lockInfo['serial'],
            lock_access: lockInfo['lock_access']
        }

        const requestOptions = {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': secureLocalStorage.getItem('sessionToken')
            },
            body: JSON.stringify(requestBody)
        }
        fetch(completeURL, requestOptions)
            .then(response => response.json())
            .then(props.fetchLockInformationAgain())
    }

    function handleDeleteGuestUser(event, index){
        var newLockInfo = structuredClone(lockInfo)
        newLockInfo['lock_access'].splice(index, 1);
        setLockInfo(newLockInfo)
    }

    function navigateToLogsPage(){
        navigate("/ManageAllLogsPage", {
            state: {
                lockInfo: lockInfo
            }
        })
    }

    return (
        <div id={"MainDivExpandedDivAllLocksPage"}>
            <div id={"LockOwnerDiv"}>
                <label>{"Lock owner: " + ownerInfo['name']}</label>
            </div>
            <div id={"LockNameDiv"}>
                <label>Lock Name</label>
                <input type={'text'} value={lockInfo['name']} onChange={(event) => handleOnChangeLockProperty(event, 'name')}/>
            </div>
            <div id={"LockSerialDiv"}>
                <label>Lock Serial</label>
                <input type={"text"} value={lockInfo['serial']} onChange={(event) => handleOnChangeLockProperty(event, 'serial')}/>
            </div>
            <div id={"UpdateLockDetailsDiv"}>
                <button onClick={SaveLockDetails}>Save</button>
                <button onClick={navigateToLogsPage}>View Logs</button>
            </div>
            {
                lockInfo['lock_access'].length !== 0 &&
                <div id={"ListOfGuestUsersDiv"}>
                    <table id={"ListOfGuestsTable"}>
                        <thead>
                        <tr>
                            <th>
                                Guests
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            lockInfo['lock_access'].map((eachUserID, index) =>(
                                <tr className={index% 2===0?"EvenRow":"OddRow"} key={index}>
                                    <td>
                                        <div>
                                            {eachUserID}
                                            <button id={"DeleteButton"} onClick={(event) => handleDeleteGuestUser(event, index)}>
                                                <FontAwesomeIcon icon={faTrash} id={"DeleteIcon"}/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>

                </div>
            }

        </div>
    )
}

export default ExpandedDivAllLocksPage