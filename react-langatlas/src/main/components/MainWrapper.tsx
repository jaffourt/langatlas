import React, { PropsWithChildren } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

const MainWrapper = (props: PropsWithChildren<any>) => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" fixed="top" variant="dark">
                <Navbar.Brand href={'/'}>EvLab Language Atlas</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Explore" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href={'/atlas'}>Atlases</NavDropdown.Item>
                            <NavDropdown.Item href={'/subjects'}>Individual Subjects</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href={"/paradigm"}>Paradigm</Nav.Link>
                        <Nav.Link href={"/download"}>Download</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {props.children}
            {/*<footer className="footer mt-auto py-3 bg-light">*/}
            {/*    <div className="container d-flex justify-content-between">*/}
            {/*        <span className="text-muted">EvLab 2021</span>*/}
            {/*        <span className="text-muted"><a href="mailto:jaffourt@mit.edu">Contact Us</a></span>*/}
            {/*    </div>*/}
            {/*</footer>*/}
        </>

    );
}
export default MainWrapper;