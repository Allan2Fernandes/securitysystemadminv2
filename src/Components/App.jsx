import React from "react";
import LoginPage from "../Pages/LoginPage";
import AdministrateUsersPage from "../Pages/AdministrateUsersPage";
import ManageUsersLocksPage from "../Pages/ManageUsersLocksPage";
import {
    BrowserRouter as Router,
    Routes ,
    Route,
    Link
} from "react-router-dom";
import AdministerAllLocksPage from "../Pages/AdministerAllLocksPage";
import AdministerAllInvitationsPage from "../Pages/AdministerAllInvitationsPage";
import ManageAllLogsPage from "../Pages/ManageAllLogsPage";


function App(){
    return (
        <Router>
            <div>
                <Routes>
                    <Route path={"/"} element={<LoginPage/>}/>
                    <Route path={"/Administrateusers"} element={<AdministrateUsersPage/>}/>
                    <Route path={"/ManageUsersLocksPage"} element={<ManageUsersLocksPage/>}/>
                    <Route path={"/AdministerAllLocksPage"} element={<AdministerAllLocksPage/>}/>
                    <Route path={"/AdministerAllInvitations"} element={<AdministerAllInvitationsPage/>}/>
                    <Route path={"/ManageAllLogsPage"} element={<ManageAllLogsPage/>}/>
                </Routes>
            </div>
        </Router>
    )
}

export default App