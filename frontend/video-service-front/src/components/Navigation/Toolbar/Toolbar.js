import React from "react";
import { Navigate } from 'react-router-dom';

import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import SearchInput from "../SearchInput/SearchInput";
import UserIcon from "../../UI/User/UserIcon/UserIcon";
import UserName from "../../UI/User/UserName/UserName";

import './Toolbar.css';

const userClickHandler = () => {
    <Navigate to="/auth" replace={true}/>;
};

const toolbar = (props) => (
    // TODO: Wrapper for User section

    <header>
        <nav className="navbar">
            <DrawerToggle clicked={props.drawerToggleClicked}/>
            <SearchInput />
            
            <div className="d-flex me-2"
                onClick={() => userClickHandler}>
                <UserIcon />
                <UserName />
            </div>
        </nav>

    </header>
);

export default toolbar;
