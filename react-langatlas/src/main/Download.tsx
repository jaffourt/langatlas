import React, {PropsWithChildren} from 'react';
import MainWrapper from "./components/MainWrapper";
import {Card, Button, Container, Row, Col} from "react-bootstrap";
import {Link} from 'react-router-dom';


// TODO:
// update download links to make get request through DownloadView
// update 'ALL' links to download sequential requests... (should this be a backend feature?)
// react-ify all the html
// update placeholder text

// https://eu-galioto.medium.com/the-simplest-server-configuration-for-your-aws-amplify-cognito-app-a074c01c743d

const Download = (props: PropsWithChildren<any>) => {
    //
    // const testFunction = (key: string) =>
    // {
    //     const download = async () => {
    //         await fetch(`http://localhost:8000/api/products/${key}`)
    //             .then((response) => console.log(response, key))
    //     }
    // }

    const downloadFunction = async (id: string) => {
        window.open(
            await fetch(`http://localhost:8000/api/download/${id}`)
                .then(response =>  response.json())
                .catch(e => console.error(e)), '_blank')
    }

    return (
        <MainWrapper>
            <br/>
            <main className="container">
                <Card border="dark">
                    <Card.Body>
                        <Card.Title><h2 className="border-bottom pb-2 mb-0">Atlas</h2></Card.Title>
                        <Card.Text>
                            <div className="d-flex text-muted pt-3">
                                <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                    <div className="d-flex justify-content-between">
                                        <h4><strong className="text-gray-dark">Volume</strong></h4>
                                        <Button variant="link" onClick={() => downloadFunction('p')}>Download</Button>
                                    </div>
                                    <span className="d-block">Placeholder text that can be used for some description.</span>
                                </div>
                            </div>
                            <div className="d-flex text-muted pt-3">

                                <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                    <div className="d-flex justify-content-between">
                                        <h4><strong className="text-gray-dark">Surface</strong></h4>
                                        <Button variant="link" onClick={() => downloadFunction('p')}>Download</Button>
                                    </div>
                                    <span className="d-block">Placeholder text that can be used for some description.</span>
                                </div>
                            </div>
                            <br/>
                            <Container>
                                <Row xs={2} md={4} lg={6}>
                                    <Col><Link to='/atlas'><Button variant="link">Explore</Button></Link></Col>
                                    <Col><Button variant="link" onClick={() => downloadFunction('p')}>Download All</Button></Col>
                                </Row>
                            </Container>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <br/>
                <Card border="dark">
                    <Card.Body>
                        <Card.Title><h2 className="border-bottom pb-2 mb-0">Individual Data</h2></Card.Title>
                        <Card.Text>
                            <div className="d-flex text-muted pt-3">

                                <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                    <div className="d-flex justify-content-between">
                                        <h4><strong className="text-gray-dark">Volume</strong></h4>
                                        <Button variant="link" onClick={() => downloadFunction('LanA_SPM')}>Download</Button>
                                    </div>
                                    <span className="d-block">Placeholder text that can be used for some description.</span>
                                </div>
                            </div>
                            <div className="d-flex text-muted pt-3">
                                <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                    <div className="d-flex justify-content-between">
                                        <h4><strong className="text-gray-dark">Surface</strong></h4>
                                        <Button variant="link" onClick={() => downloadFunction('LanA_FS')}>Download</Button>
                                    </div>
                                    <span className="d-block">Placeholder text that can be used for some description.</span>
                                </div>
                            </div>
                            <br/>
                            <Container>
                                <Row xs={2} md={4} lg={6}>
                                    <Col><Link to='/subjects'><Button variant="link">Explore</Button></Link></Col>
                                    <Col><Button variant="link" onClick={() => downloadFunction('p')}>Download All</Button></Col>
                                </Row>
                            </Container>
                        </Card.Text>
                    </Card.Body>
                </Card>

            </main>
        </MainWrapper>
    );
};

export default Download;


