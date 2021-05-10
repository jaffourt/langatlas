import React from 'react';
import MainWrapper from "./components/MainWrapper";
import {Card, Col, Container, Row} from "react-bootstrap";

const Home = () => {

    return (
        <MainWrapper>
            <Container>
                <br/>
                <Row>
                    <Col>
                        <h1><strong>Welcome to <span style={{color:'red'}}>LanA</span>!</strong></h1>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <h2><strong>LanA is the Fedorenko Lab <span style={{color:'red'}}>Lan</span>guage <span style={{color:'red'}}>A</span>tlas created based on language localizer data from {'>'}800 individuals.</strong></h2>
                    </Col>
                </Row>
                <br/>

                <Row>
                    <Col><Card className="bg-dark text-white border-dark">
                        <Card.Img src={process.env.PUBLIC_URL + '/SPM.gif'} alt="Card image" />
                        {/*<Card.Img src={'https://langatlas.s3.amazonaws.com/SPM.gif'} alt={'SPM atlas'}/>*/}
                        <Card.ImgOverlay>
                            <Card.Title>Volume-based LanA</Card.Title>
                        </Card.ImgOverlay>
                    </Card></Col>
                    <Col><Card className="bg-dark text-white border-dark">
                        <Card.Img src={process.env.PUBLIC_URL + '/FS.gif'} alt="Card image" />
                        <Card.ImgOverlay>
                            <Card.Title>Surface-based LanA</Card.Title>
                        </Card.ImgOverlay>
                    </Card></Col>
                </Row>

                <br/>

                <Row>
                    <Col>
                        <Card border="dark">
                            <Card.Body>
                                <Card.Title>Affourtit et al. 2021</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.<br/>
                                    <a href={process.env.PUBLIC_URL + '/Affourtit_2021.pdf'} download>The 800LanA Dataset: language atlas paper.</a>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br/>

                <Row>
                    <Col>
                        <Card border="dark">
                            <Card.Body>
                                <Card.Title>About this project:</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Card border="dark">
                            <Card.Body>
                                <Card.Title>Brief description of the data:</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br/>
            </Container>
        </MainWrapper>
    );
};

export default Home;