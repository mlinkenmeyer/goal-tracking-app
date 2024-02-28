import React from "react";
import { Outlet, NavLink } from "react-router-dom";

function NavBar() {

    return (
        <div>
            <div style={{ float: "left", position: "relative", width: "50%" }}>
                <h1>
                    <nav>
                        <NavLink style={{ color: "black", textDecoration: "none", padding: "10px" }} to="/">
                            Goal Tracking App
                        </NavLink>
                    </nav>
                </h1>
            </div>
            <div style={{ float: "right", position: "relative", padding: "15px" }}>
                <nav>
                    {/* <NavLink style={{ padding: "10px" }} to="/">Home</NavLink> | */}
                    <NavLink style={{ color: "black", padding: "10px" }} to="/users">Users</NavLink> |
                    <NavLink style={{ color: "black", padding: "10px" }} to="/goals">Goals</NavLink> |
                    <NavLink style={{ color: "black", padding: "10px" }} to="/journals">Journals</NavLink>
                </nav>
            </div>
            <div style={{ float: "left", position: "relative", width: "100%" }}>
                <Outlet />
            </div>
        </div>
    )
}

export default NavBar;