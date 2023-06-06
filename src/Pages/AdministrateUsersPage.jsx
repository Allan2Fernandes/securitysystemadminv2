import React from "react";
import TopBar from "../Components/TopBar";
import AdminUsersTableComponent from "../Components/AdminUsersTableComponent";
import "../Styles/AdministrateUsersPage.css"

function AdministrateUsersPage(){
    return (
        <div id={"MainAdministrateUsersPageDiv"}>
            <TopBar/>
            <AdminUsersTableComponent/>
        </div>
    )
}

export default AdministrateUsersPage