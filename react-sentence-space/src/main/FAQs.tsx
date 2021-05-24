import React from 'react';
import NavBarWrapper from "./components/NavBarWrapper";
import {Card, Col, Container, Row} from "react-bootstrap";

const FAQs = () => {

    return (
        <NavBarWrapper>
                <Row>
                    <Col>
                        <Card border="dark">
                            <Card.Body>
                                <Card.Title>FAQs</Card.Title>
                                <Card.Text>
                                    FAQs.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
        </NavBarWrapper>
    );
};

export default FAQs;