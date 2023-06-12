import React, {useEffect, useState} from "react";
import "../Styles/ManageLogsTable.css"
import {baseURL} from "../Constants";
import secureLocalStorage from "react-secure-storage";

function ManageLogsTable(props){
    const [selectedLockID, setSelectedLockID] = useState("");
    const [allLogs, setAllLogs] = useState([])
    const [isHovering, setIsHovering] = useState(false)
    const [xPopUpPos, setXPopUpPos] = useState(0)
    const [yPopUpPos, setYPopUpPos] = useState(0)
    const [popUpValue, setPopUpValue] = useState("Default value")
    const directions = {
        In: 0,
        Out: 1
    }

    useEffect(() =>{
        console.log(props.selectedLockID)
        setSelectedLockID(props.selectedLockID)
        //Query the backend for all logs of this lock
        var completeURL = baseURL + "api/v1/lock/logs/" + props.selectedLockID
        console.log(completeURL)
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': secureLocalStorage.getItem('sessionToken')
            },
        }

        fetch(completeURL, requestOptions)
            .then(response => response.json())
            .then(data =>{
                data.forEach(row =>{
                    const dateString = row['date']
                    const dateObject = new Date(dateString);

                    // Extracting different parts of the date
                    const year = dateObject.getFullYear();
                    const month = dateObject.getMonth() + 1; // months are zero-indexed
                    const day = dateObject.getDate();
                    const hours = dateObject.getHours();
                    const minutes = dateObject.getMinutes();
                    const seconds = dateObject.getSeconds();

                    row['year'] = year
                    row['month'] = parseInt(month)<10?"0"+month:month
                    row['day'] = parseInt(day)<10?"0"+day:day
                    row['hours'] = parseInt(hours)<10?"0"+hours:hours
                    row['minutes'] = parseInt(minutes)<10?"0"+minutes:minutes
                    row['seconds'] = parseInt(seconds)<10?"0"+seconds:seconds

                    row['formattedDate'] = `${row['hours']}:${row['minutes']}:${row['seconds']} || ${row['day']}:${row['month']}:${row['year']}`
                })
                console.log(data)
                setAllLogs(data)
            })
    }, [])

    function OnHoverHandler(event, direction, value){

        if(direction === directions.In){
            setIsHovering(true)
        }else if(direction === directions.Out){
            setIsHovering(false)
        }
        var targetCoordinates = event.target.getBoundingClientRect()
        setXPopUpPos(targetCoordinates.x)
        //the popup should be 10 pixels below the target
        setYPopUpPos(targetCoordinates.y + targetCoordinates.height + 10)
        setPopUpValue(value)
    }

    return (
        <div id={"MainDivManageLogsTable"}>
            <table id={"ManageLogsTableElement"}>
                <thead>
                <tr id={"ManageLogsTableHeaderRow"}>
                    <th>LogID</th>
                    <th>LockID</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {
                    allLogs.map((eachLogRow, index) =>(
                        <tr key={index} id={"LogsTableBodyRow"}
                            className={index%2===0?"EvenRow":"OddRow"}
                            onMouseOver={(event) => OnHoverHandler(event, directions.In, eachLogRow['message'])}
                            onMouseOut={(event) => OnHoverHandler(event, directions.Out, eachLogRow['message'])}
                        >
                            <td>{eachLogRow['_id']}</td>
                            <td>{eachLogRow['lock']}</td>
                            <td>{eachLogRow['formattedDate']}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            {isHovering && (
                <div
                    className="popup"
                    style={{ left: xPopUpPos, top: yPopUpPos }}>
                    {popUpValue}
                </div>
            )}
        </div>
    )
}

export default ManageLogsTable