import "../Styles/SideBar.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom";

function SideBar(){
    const navigate = useNavigate();

    function navigateToHomePage(){
        navigate("/Administrateusers")
    }

    function navigateToAllUsersPage(){
        navigate("/Administrateusers")
    }

    function navigateToAllLocksPage(){
        navigate("/AdministerAllLocksPage")
    }

    function navigateToAllInvitationsPage(){
        navigate("/AdministerAllInvitations")
    }

    function navigateToAllLogsPage(){
        navigate("/ManageAllLogsPage")
    }

    return (
        <div id={"TopBarMainDiv"}>
            <center>
                <FontAwesomeIcon icon={faLock} id={"LockLogo"} onClick={navigateToHomePage}/>
            </center>
            <div id={"NavigateToUsersPageDiv"}>
                <button id={"NavigateToUsersPageButton"} onClick={navigateToAllUsersPage}>Users</button>

            </div>
            <div id={"NavigateToLocksPageDiv"}>
                <button id={"NavigateToLocksPageButton"} onClick={navigateToAllLocksPage}>Locks</button>
            </div>
            <div id={"NavigateToInvitationsPageDiv"}>
                <button id={"NavigateToInvitationsPageButton"} onClick={navigateToAllInvitationsPage}>Invitations</button>
            </div>
            <div id={"NavigateToLogsPageDiv"}>
                <button id={"NavigateToLogsPageButton"} onClick={navigateToAllLogsPage}>Logs</button>
            </div>

        </div>
    )
}

export default SideBar