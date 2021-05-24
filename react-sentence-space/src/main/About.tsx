import React from 'react';
import NavBarWrapper from "./components/NavBarWrapper";
import {Card, Col, Container, Row} from "react-bootstrap";

const About = () => {

    return (
        <NavBarWrapper>
                <Row>
                    <Col>
                        <Card border="dark">
                            <Card.Body>
                                <Card.Title>About</Card.Title>
                                <Card.Text>
                                    About it.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
        </NavBarWrapper>
    );
};

export default About;