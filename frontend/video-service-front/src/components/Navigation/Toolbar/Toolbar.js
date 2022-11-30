import React from "react";
import { NavLink } from 'react-router-dom';

import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import SearchInput from "../SearchInput/SearchInput";
import UserIcon from "../../UI/User/UserIcon/UserIcon";
import UserName from "../../UI/User/UserName/UserName";

import './Toolbar.css';


const toolbar = (props) => (
    // TODO: Wrapper for User section

    <header>
        <nav className="navbar">
            <DrawerToggle clicked={props.drawerToggleClicked}/>
            <SearchInput />
            
            <NavLink 
                className="d-flex me-2 text-decoration-none text-dark"
                to="/profile">
                <UserIcon />
                <UserName />
            </NavLink>
        </nav>

    </header>
);

export default toolbar;
