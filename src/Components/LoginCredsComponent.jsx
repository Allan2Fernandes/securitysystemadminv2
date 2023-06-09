import "../Styles/LoginCredsComponent.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUnlock, faKey } from '@fortawesome/free-solid-svg-icons'
import {useState} from "react";
import {baseURL} from "../Constants";
import {useNavigate} from "react-router-dom";

function LoginCredsComponent(){
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [validDetailsReturned, setValidDetailsReturned] = useState(false);
    const [displayMessageInvalidCredentials, setDisplayMessageInvalidCredentials] = useState(false);
    const invalidDetailsErrorMessage = "Invalid credentials supplied";
    const navigate = useNavigate();

    function handleUserNameChange(event){
        setUserName(event.target.value)
    }

    function handlePasswordChange(event){
        setPassword(event.target.value)
    }

    function handleLoginButtonClick(){
        var completeURL = baseURL + "api/v1/Login"
        var requestBody = {
            email: userName,
            password: password
        }
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }
        fetch(completeURL, requestOptions)
            .then(response => {
                if(response.status === 200){
                    setValidDetailsReturned(true);
                    console.log("Okay to add session token")
                    setDisplayMessageInvalidCredentials(false)
                }else{
                    setValidDetailsReturned(false);
                    setDisplayMessageInvalidCredentials(true)
                }
                return response.json()
            })
            .then(data => {
                setValidDetailsReturned(prevValidDetailsReturned =>{
                    if(prevValidDetailsReturned){
                        localStorage.setItem('sessionToken', data['token']);
                        navigate("/Administrateusers");
                    }
                    return prevValidDetailsReturned
                })
            });
    }

    function handleEnterButtonClickedToLogin(event){
        if(event.key === "Enter"){
            handleLoginButtonClick()
        }
    }

    return (
        <div id={"MainLoginCredsComponentDiv"}>
            <center>
                <label id={"TitleLabel"}>Admin Login</label>
                <div id={"UsernameDiv"}>
                    <FontAwesomeIcon id={"UsernameIcon"} icon={faUser}/>
                    <input
                        id={"UsernameInput"}
                        type={"text"}
                        placeholder={"Username"}
                        onChange={(event) => handleUserNameChange(event)}
                        value={userName}
                        onKeyUp={(event)=>handleEnterButtonClickedToLogin(event)}
                    />
                </div>
                <div id={"PasswordDiv"}>
                    <FontAwesomeIcon id={"LockIcon"} icon={faUnlock}/>
                    <input
                        id={"PasswordInput"}
                        type={"password"}
                        placeholder={"Password"}
                        value={password}
                        onChange={(event) => handlePasswordChange(event)}
                        onKeyUp={(event)=>handleEnterButtonClickedToLogin(event)}
                    />
                </div>

                <button onClick={() => handleLoginButtonClick()}
                    id={"LoginButton"}>
                    <FontAwesomeIcon id={"LoginKeyIcon"} icon={faKey}/>
                </button>
                <div id={"InvalidCredsDiv"}>
                    {displayMessageInvalidCredentials &&
                        <label>{invalidDetailsErrorMessage}</label>
                    }
                </div>
            </center>

        </div>
    )
}

export default LoginCredsComponent