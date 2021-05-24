import React from 'react';
import NavBarWrapper from "./components/NavBarWrapper";
import {Card, Col, Container, Row} from "react-bootstrap";

const HowTo = () => {

    return (
        <NavBarWrapper>
                <Row>
                    <Col>
                        <Card border="dark">
                            <Card.Body>
                                <Card.Title>HowTo</Card.Title>
                                <Card.Text>
                                    HowTo.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
        </NavBarWrapper>
    );
};

export default HowTo;