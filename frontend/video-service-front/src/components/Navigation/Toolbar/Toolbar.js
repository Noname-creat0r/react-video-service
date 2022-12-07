import React from 'react';
import { NavLink } from 'react-router-dom';

import NavBar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import SearchInput from "../SearchInput/SearchInput";
import UserIcon from "../../UI/User/UserIcon/UserIcon";
import UserName from "../../UI/User/UserName/UserName";

import './Toolbar.css';


const toolbar = (props) => (
    // TODO: Wrapper for User section
    <header>
        <NavBar sticky="top">
            <DrawerToggle clicked={props.drawerToggleClicked}/>
            <NavBar.Brand>VideoService</NavBar.Brand>

            <Container>
                <SearchInput className="d-flex" />
                <NavLink 
                    className="d-flex text-decoration-none text-dark"
                    to="/auth">
                    <UserIcon />
                    <span>Sign In/SignUp</span>
                </NavLink>
            </Container>

        </NavBar>
    </header>
);

export default toolbar;
