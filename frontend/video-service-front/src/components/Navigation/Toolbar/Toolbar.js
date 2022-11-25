import React from "react";

import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import SearchInput from "../SearchInput/SearchInput";
import UserIcon from "../../UI/User/UserIcon/UserIcon";
import UserName from "../../UI/User/UserName/UserName";

import './Toolbar.css';

const toolbar = (props) => {

    // TODO: do something with User-section (wrapper component ?)
    return (
        <header>
            <nav className="navbar">
                <DrawerToggle clicked={props.drawerToggleClicked}/>
                <SearchInput />
                
                <div className="d-flex me-2">
                    <UserIcon />
                    <UserName />
                </div>
            </nav>

        </header>
    );
};

export default toolbar;
