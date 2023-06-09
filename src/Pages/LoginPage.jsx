import SideBar from "../Components/SideBar";
import "../Styles/LoginPage.css"
import LoginCredsComponent from "../Components/LoginCredsComponent";
function LoginPage(){
    return (
        <div id={"LoginPageMainDiv"}>
            <LoginCredsComponent/>
        </div>
    )
}

export default LoginPage