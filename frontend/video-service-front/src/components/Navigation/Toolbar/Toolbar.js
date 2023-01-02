import React from 'react';
import { NavLink } from 'react-router-dom';

import NavBar from "react-bootstrap/Navbar";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import SearchInput from "../SearchInput/SearchInput";
import UserBadge from '../../UI/User/UserBadge/UserBadge';
import DefaultIcon from '../../../assets/images/default-user-icon.svg';

import './Toolbar.css';


const toolbar = (props) => (
    // TODO: Wrapper for User section (Name + Icon = new Element)
    <header>
        <NavBar sticky="top">
            <DrawerToggle clicked={props.drawerToggleClicked}/>
            <NavBar.Brand>VideoService</NavBar.Brand>

            <Container className='d-flex'>
                <SearchInput />
                { props.isAuthenticated ? 
                    <UserBadge 
                        name={props.userName} /> :
                    <Button 
                        variant='success'
                        onClick={props.authModalRequested}>Sign In/ Sign Up</Button>
                } 
            </Container>

        </NavBar>
    </header>
);

export default toolbar;
