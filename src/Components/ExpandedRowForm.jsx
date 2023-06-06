import React, {useEffect, useState} from "react";
import "../Styles/ExpandedRowForm.css"
import stockImage from "../Images/defaultImage.jpg"
import {baseURL} from "../Constants";
import {useNavigate} from "react-router-dom";

function ExpandedRowForm(props){
    const [userData, setUserData] = useState([])
    const [usersName, setUsersName] = useState("")
    const [usersEmail, setUsersEmail] = useState("")
    const [userIsAdmin, setUserIsAdmin] = useState(false)
    const [userVerified, setUserVerified] = useState(false)
    const [imageB64Encoding, setImageB64Encoding] = useState("")
    const [userID, setUserID] = useState("");
    const [lockIDs, setLockIDs] = useState([])
    const navigate = useNavigate();

    useEffect(() =>{
        setUserData(props.userRow)
        setUsersName(props.userRow['name'])
        setUsersEmail(props.userRow['email'])
        setUserIsAdmin(props.userRow['is_admin'])
        setUserVerified(props.userRow['verified'])
        setUserID(props.userRow['_id'])
        setLockIDs(props.userRow['user_access'])
        var token = localStorage.getItem('sessionToken')
        var completeURL = baseURL + "api/v1/user/" + props.userRow['_id']
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
            .then(data => {
                console.log(data)
                setImageB64Encoding(data['image'])
            })


    }, [props.userRow])

    function updateName(event){
        setUsersName(event.target.value)
    }

    function updateEmail(event){
        setUsersEmail(event.target.value)
    }

    function updateAdminStatus(event){
        setUserIsAdmin(event.target.checked)
    }

    function updateVerificationStatus(event){
        setUserVerified(event.target.checked)
    }

    function updateDetailsInDatabase(){
        var completeURL = baseURL + "api/v1/user";
        var requestBody = {
            is_admin: userIsAdmin,
            email: usersEmail,
            _id: userID,
            verified: userVerified
        }
        if(!(props.userRow['name'] === undefined && (usersName === undefined || usersName ===""))){
            requestBody = {
                ...requestBody,
                name: usersName
            }
            console.log("Updating name")
        }

        if(!(props.userRow['image'] === undefined && (imageB64Encoding === undefined || imageB64Encoding ===""))){
            requestBody = {
                ...requestBody,
                image: imageB64Encoding
            }
            console.log("Updating image")
        }
        const requestOptions = {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': localStorage.getItem('sessionToken')
            },
            body: JSON.stringify(requestBody)
        }
        fetch(completeURL, requestOptions)
            .then(response => {
                return response.json()
            })
            .then(data=>{
                props.fetchDetails();
            })
    }

    function GetSelectedImage(event){
        var image_file = event.target.files[0]
        if(image_file === undefined){
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageB64Encoding(reader.result);
        };
        reader.readAsDataURL(image_file);
    }

    function NavigateToLocksPageClickHandler(){
        navigate("/ManageLocksPage", {
            state: {
                userId: userID,
                lockIDs: lockIDs,
                usersEmail: usersEmail
            }
        })
    }

    return (
        <div id={"MainExpandedRowFormDiv"}>
            <div id={"InputNameDiv"}>
                <input type={"text"} value={usersName===undefined?"":usersName} onChange={(event) => updateName(event)}/>
            </div>
            <div id={"InputEmailDiv"}>
                <input type={"text"} value={usersEmail} onChange={(event) => updateEmail(event)}/>
            </div>
            <div id={"AdminStatusDiv"}>
                <label>Admin</label>
                <input type={"checkbox"} checked={userIsAdmin} onChange={(event) => updateAdminStatus(event)}/>
            </div>
            <div id={"VerifiedStatusDiv"}>
                <label>Verified</label>
                <input type={"checkbox"} checked={userVerified} onChange={(event) => updateVerificationStatus(event)}/>
            </div>
            <div id={"UserImageDiv"}>
                <img src={imageB64Encoding===undefined?stockImage:imageB64Encoding}/>
            </div>
            <div id={"UpdateButtonDiv"}>
                <button onClick={updateDetailsInDatabase}>Save</button>
            </div>
            <div id={"ManageLocksButtonDiv"}>
                <button onClick={NavigateToLocksPageClickHandler}>Manage locks</button>
            </div>
            <div id={"ButtonsDiv"}>
                <input type={"file"} id={"UploadNewImageButton"} onChange={(event) => GetSelectedImage(event)}/>
                <label id={"UploadNewImageLabel"} htmlFor={"UploadNewImageButton"}>Upload image</label>
            </div>
        </div>
    )
}

export default ExpandedRowForm