import React from "react";
import SideBar from "../Components/SideBar";
import AdminUsersTableComponent from "../Components/AdminUsersTableComponent";
import "../Styles/AdministrateUsersPage.css"

function AdministrateUsersPage(){
    return (
        <div id={"MainAdministrateUsersPageDiv"}>
            <SideBar/>
            <h1 id={"ManageUsersPageTitle"}>Manage Users</h1>
            <AdminUsersTableComponent/>
        </div>
    )
}

export default AdministrateUsersPage