import React, { PropsWithChildren } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const MainWrapper = (props: PropsWithChildren<any>) => {
    return (
        <>
            <header className="nav justify-content-center">
              <Navbar>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Nav className="mr-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/Features">Features</Nav.Link>
                  <Nav.Link href="/Corpora">Corpora</Nav.Link>
                  <Nav.Link href="/HowTo">HowTo</Nav.Link>
                  <Nav.Link href="/FAQs">FAQs</Nav.Link>
                  <Nav.Link href="/About">About</Nav.Link>
                </Nav>
              </Navbar>
           </header>
        {props.children}
       </>
    );
}
export default MainWrapper;