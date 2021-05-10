import React from 'react';
import NavBarWrapper from "./components/NavBarWrapper";
import {Card, Col, Container, Row} from "react-bootstrap";

const Features = () => {

    return (
        <NavBarWrapper>
                <Row>
                    <Col>
                        <Card border="dark">
                            <Card.Body>
                                <Card.Title>Brief description of the data:</Card.Title>
                                <Card.Text>
                                    features.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
        </NavBarWrapper>
    );
};

export default Features;