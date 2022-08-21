import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';

const NavigationMenu = () =>{
   
    return(
        <Navbar bg="light" expand="lg">
            <Container>
               
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/home" to="/home" as= { NavLink } >Expenses Home</Nav.Link>
                    <Nav.Link href="/add" to="/add" as= { NavLink } >Add Expenses</Nav.Link>
                     
                </Nav>
                
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationMenu;