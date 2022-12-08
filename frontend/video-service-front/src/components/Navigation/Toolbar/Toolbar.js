import React from 'react';
import { NavLink } from 'react-router-dom';

import NavBar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import SearchInput from "../SearchInput/SearchInput";
import UserIcon from "../../UI/User/UserIcon/UserIcon";
import UserName from "../../UI/User/UserName/UserName";

import './Toolbar.css';


const toolbar = (props) => (
    // TODO: Wrapper for User section (Name + Icon = new Element)
    <header>
        <NavBar sticky="top">
            <DrawerToggle clicked={props.drawerToggleClicked}/>
            <NavBar.Brand>VideoService</NavBar.Brand>

            <Container className='d-flex'>
                <SearchInput />
                {props.isAuthenticated ? "I am signed in" : <UserName />}
            </Container>

        </NavBar>
    </header>
);

export default toolbar;
