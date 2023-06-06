import React from "react";
import LoginPage from "../Pages/LoginPage";
import AdministrateUsersPage from "../Pages/AdministrateUsersPage";
import ManageLocksPage from "../Pages/ManageLocksPage";
import {
    BrowserRouter as Router,
    Routes ,
    Route,
    Link
} from "react-router-dom";


function App(){
    return (
        <Router>
            <div>
                <Routes>
                    <Route path={"/"} element={<LoginPage/>}/>
                    <Route path={"/Administrateusers"} element={<AdministrateUsersPage/>}/>
                    <Route path={"/ManageLocksPage"} element={<ManageLocksPage/>}/>
                </Routes>

            </div>
        </Router>
    )
}

export default App