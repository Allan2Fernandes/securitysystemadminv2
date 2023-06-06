import TopBar from "../Components/TopBar";
import "../Styles/LoginPage.css"
import LoginCredsComponent from "../Components/LoginCredsComponent";
function LoginPage(){
    return (
        <div id={"LoginPageMainDiv"}>
            <TopBar/>
            <LoginCredsComponent/>
        </div>
    )
}

export default LoginPage