import "../Styles/SideBar.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom";

function SideBar(){
    const navigate = useNavigate();

    function navigateToPage(page){
        navigate(page)
    }

    return (
        <div id={"TopBarMainDiv"}>
            <center>
                <FontAwesomeIcon icon={faLock} id={"LockLogo"} onClick={() => navigateToPage("/Administrateusers")}/>
            </center>
            <div id={"NavigateToUsersPageDiv"}>
                <button id={"NavigateToUsersPageButton"} onClick={() => navigateToPage("/Administrateusers")}>Users</button>

            </div>
            <div id={"NavigateToLocksPageDiv"}>
                <button id={"NavigateToLocksPageButton"} onClick={ () => navigateToPage("/AdministerAllLocksPage")}>Locks</button>
            </div>
            <div id={"NavigateToInvitationsPageDiv"}>
                <button id={"NavigateToInvitationsPageButton"} onClick={() => navigateToPage("/AdministerAllInvitations")}>Invitations</button>
            </div>
            <div id={"NavigateToLogsPageDiv"}>
                <button id={"NavigateToLogsPageButton"} onClick={() => navigateToPage("/ManageAllLogsPage")}>Logs</button>
            </div>

        </div>
    )
}

export default SideBar