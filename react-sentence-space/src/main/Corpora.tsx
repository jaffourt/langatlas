import React from 'react';
import NavBarWrapper from "./components/NavBarWrapper";
import {Card, Col, Container, Row} from "react-bootstrap";

const Corpora = () => {

    return (
        <NavBarWrapper>
                <Row>
                    <Col>
                        <Card border="dark">
                            <Card.Body>
                                <Card.Title>Brief description of the corpora:</Card.Title>
                                <Card.Text>
                                    Corpora.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
        </NavBarWrapper>
    );
};

export default Corpora;