import React from "react";
import "../Styles/AdministerAllInvitationsPage.css"
import SideBar from "../Components/SideBar";
import AdminInvitationsTableComponent from "../Components/AdminInvitationsTableComponent";

function AdministerAllInvitationsPage(){
    return (
        <div id={"MainAdministerAllInvitationsPageDiv"}>
            <SideBar/>
            <h1 id={"InvitationsPageTitle"}>Administer Invitations</h1>
            <AdminInvitationsTableComponent/>
        </div>
    )
}

export default AdministerAllInvitationsPage