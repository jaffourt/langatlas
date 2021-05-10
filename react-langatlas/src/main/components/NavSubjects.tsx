import React, {PropsWithChildren} from 'react';
import {Link} from "react-router-dom";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

const NavSubjects = (props: PropsWithChildren<any>) => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" fixed="top" variant="dark">
                <Navbar.Brand href={'/'}>EvLab Language Atlas</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/explore">Explore</Nav.Link>
                        <Nav.Link href="/subjects">Subjects</Nav.Link>
                        <NavDropdown title="Information" id="collapsible-nav-dropdown">
                            <Link to={'/info'} className="dropdown-item" href="#">About</Link>
                            <Link to={'/info'} className="dropdown-item" href="#">FAQs</Link>
                            <Link to={'/info'} className="dropdown-item" href="#">Citation</Link>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/info#contact">Contact Us</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">Download Selected</Nav.Link>
                        <Nav.Link href="#memes">Download All</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
        // <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        //     <Link to='/' className="navbar-brand col-md-3 col-lg-2 me-0 px-3">EvLab Language Atlas</Link>
        //     <button className="navbar-toggler position-absolute d-md-none collapsed" type="button"
        //             data-bs-toggle="collapse"
        //             data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
        //             aria-label="Toggle navigation">
        //         <span className="navbar-toggler-icon"></span>
        //     </button>
        //
        //     {props.children}
        //
        //     <ul className="navbar-nav px-3">
        //         <li className="nav-item text-nowrap">
        //             {/*<a className="nav-link" href="#"> Sign Out </a>*/}
        //         </li>
        //     </ul>
        // </header>
    );
};

export default NavSubjects;