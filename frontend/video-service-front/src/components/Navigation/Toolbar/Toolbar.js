import React from "react"

import NavBar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"

import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle"
import SearchInput from "../SearchInput/SearchInput"
import UserBadge from "../../UI/User/UserBadge/UserBadge"

import "./Toolbar.css"

const toolbar = props => (
   // TODO: Wrapper for User section (Name + Icon = new Element)
   <header className="Toolbar">
      <NavBar
         fixed="top"
         className="d-flex">
         <DrawerToggle clicked={props.drawerToggleClicked} />
         <NavBar.Brand>VideoService</NavBar.Brand>

         <Col md="5">
            <SearchInput searchHandler={props.searchHandler} />
         </Col>
         <Col>
            <Button
               className="mx-2"
               variant="outline-info"
               onClick={props.filterOptionsClicked}>
               Filter
            </Button>
         </Col>
         <Col md="2">
            {props.isAuthenticated ? (
               <UserBadge
                  name={props.userName}
                  avatarId={props.avatarId}
               />
            ) : (
               <Button
                  variant="success"
                  onClick={props.authModalRequested}>
                  Sign In/ Sign Up
               </Button>
            )}
         </Col>
      </NavBar>
   </header>
)

export default toolbar
