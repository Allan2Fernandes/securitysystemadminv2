import React, {useEffect, useState} from "react";
import {baseURL} from "../Constants";
import "../Styles/AdminUsersTableComponent.css"
import ExpandedRowForm from "./ExpandedRowForm";

function AdminUsersTableComponent(){
    const [allUserData, setAllUserData] = useState([])

    useEffect(() =>{
        fetchDetails();
    }, [])

    function fetchDetails(){
        var token = localStorage.getItem('sessionToken')
        var completeURL = baseURL + "api/v1/user"
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': token
            },
        }
        fetch(completeURL, requestOptions)
            .then(response => response.json())
            .then(data =>{
                data.forEach(row => {
                    row['expandDetails'] = false
                })
                setAllUserData(data)
            })
    }

    function onClickHandlerExpandDetails(index){
        var newUserData = [...allUserData]
        newUserData.forEach((row, every_index) => {
            if(every_index === index) return;
            row['expandDetails'] = false
        })
        newUserData[index]['expandDetails'] = !allUserData[index]['expandDetails'];
        setAllUserData(newUserData)
    }

    return (
        <div id={"MainAdminUsersTableComponent"}>
            <table id={"AdministerusersTable"}>
                <thead>
                <tr id={"AdminUsersTableHeaderRow"}>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Verified</th>
                </tr>
                </thead>
                <tbody id={"AdminUsersTableBody"}>
                {
                    allUserData.map((userRow, index) =>(
                        <React.Fragment key={index}>
                            <tr className={index%2===0?"EvenAdminUsersRow":"OddAdminUsersRow"} onClick={() => onClickHandlerExpandDetails(index)}>
                                <td>
                                    {userRow['name']}
                                </td>
                                <td>
                                    {userRow['email']}
                                </td>
                                <td>
                                    {userRow['is_admin']===true?"Admin":"Guest"}
                                </td>
                                <td>
                                    <input type={"checkbox"} checked={userRow['verified']} disabled={true}/>
                                </td>
                            </tr>
                            {userRow['expandDetails'] &&
                                <tr>
                                    <td colSpan={4}>
                                        <ExpandedRowForm userRow={userRow} fetchDetails={fetchDetails}/>
                                    </td>
                                </tr>
                            }
                        </React.Fragment>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default AdminUsersTableComponent