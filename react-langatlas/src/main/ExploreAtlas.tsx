import React from 'react';
import MainWrapper from "./components/MainWrapper";
import {Card, Row, Col} from 'react-bootstrap';
import Brain3D from "./components/Brain3D_obj";
// import Brain3D from "./components/Brain3D";
import {Button} from "react-bootstrap";

const ExploreAtlas = () => {

    return (
        <MainWrapper>
            <br/>
            <main className="container">
                <Row xs={10} md={2} lg={2}>
                    <Col>
                        <Card bg="light" text="dark" border="dark">
                            <Card.Body>
                                <Card.Title><h2 className="border-bottom pb-2 mb-0">Volume</h2></Card.Title>
                                    {/*<div id='ParentID_1'/>*/}
                                    <Brain3D parentID='ParentID_2' objFile='SPM_cortex_20484_atlas.obj'/>
                            </Card.Body>
                            {/*<Button size={'sm'} variant={'danger'}>Hello</Button>*/}
                        </Card>
                    </Col>
                    <Col>
                        <Card bg="dark" text="white" border="none">
                            <Card.Body>
                                <Card.Text>
                                    More than likely some descriptive information would go here.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br/>
                <Row xs={8} md={2} lg={2}>
                    <Col>
                          <Card bg="light" text="dark" border="dark">
                            <Card.Body>
                                <Card.Title><h2 className="border-bottom pb-2 mb-0">Surface</h2></Card.Title>
                                    {/*<div id='ParentID_2'/>*/}
                                    <Brain3D parentID='ParentID_1' objFile='FS_fsaverage_pial_atlas.obj'/>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card bg="dark" text="white" border="none">
                            <Card.Body>
                                <Card.Text>
                                    And maybe a graph or some type of interactive UI.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </main>
        </MainWrapper>
    );
};

export default ExploreAtlas;


