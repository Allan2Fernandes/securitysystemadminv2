import React, {useEffect, useState} from "react";
import "../Styles/AdminInvitationsTableComponent.css"
import {baseURL} from "../Constants";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

function AdminInvitationsTableComponent(){
    const [allInvitesInfo, setAllInvitesInfo] = useState([])

    useEffect(() =>{
       fetchInvitesData();
    }, [])

    function fetchInvitesData(){
        var completeURL = baseURL + "api/v1/invite"
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
            .then((data) =>{
                setAllInvitesInfo(data)
                console.log(data)
            })
    }

    function deleteInvitation(event, index, eachRow){
        console.log(eachRow)
    }

    return(
        <div id={"MainDivInvitationsTable"}>
            <table id={"InvitationsTable"}>
                <thead>
                    <tr id={"InvitationsTableHeaderRow"}>
                        <th>Time</th>
                        <th>From</th>
                        <th>To</th>
                        <th>LockID</th>
                        <th>Accepted</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {
                    allInvitesInfo.map((eachRow, index) =>(
                        <tr key={index} id={"InvitationsTableBodyRow"} className={index%2===0?"EvenRow":"OddRow"}>
                            <td>
                                {eachRow['date']}
                            </td>
                            <td>
                                {eachRow['from']}
                            </td>
                            <td>
                                {eachRow['to']}
                            </td>
                            <td>
                                {eachRow['lock']}
                            </td>
                            <td>
                                <input type={"checkbox"} disabled={true} checked={eachRow['accepted']}/>
                            </td>
                            <td>
                                <button id={"DeleteButton"} onClick={(event) => deleteInvitation(event, index, eachRow)}>
                                    <FontAwesomeIcon id={"DeleteIcon"} icon={faTrash}/>
                                </button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default AdminInvitationsTableComponent