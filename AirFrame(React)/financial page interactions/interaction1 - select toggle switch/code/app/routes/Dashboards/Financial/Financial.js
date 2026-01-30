import React from 'react';
import {
    Container,
    Row,
    Card,
    CardBody,
    CustomInput,
    CardTitle,
    ListGroup,
    ListGroupItem,
    Col
} from './../../../components';
import { setupPage } from './../../../components/Layout/setupPage';

import { HeaderMain } from "../../components/HeaderMain";

import {
    StackedAreaChart
} from "../../components/Financial/StackedAreaChart"

/*eslint-enable */

const Financial = () => (
    <Container>
        <Row className="mb-2">
            <Col lg={ 12 }>
                <HeaderMain 
                    title="Financial"
                    className="mb-4 mb-lg-3"
                />

            </Col>
        </Row>
        <Row>
            <Col lg={ 12 }>
                <div className="hr-text hr-text-center mt-4 mb-4">
                    <span>Your Cash</span>
                </div>
            </Col>
            <Col lg={ 3 }>
                <Card className="mb-3">
                    <CardBody>
                        <CardTitle tag="h6" className="mb-4">
                            Main Fundings
                        </CardTitle>
                        <div>
                            <div className="mb-3">
                                <h2>$ 188.00</h2>
                            </div>
                            <div>
                                <i className="fa fa-caret-down fa-fw text-danger"></i> $464.00
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col lg={ 3 }>
                <Card className="mb-3">
                    <CardBody>
                        <CardTitle tag="h6" className="mb-4">
                            Invoices
                        </CardTitle>
                        <div>
                            <div className="mb-3">
                                <h2>$ 553.00</h2>
                            </div>
                            <div>
                                <i className="fa fa-caret-down fa-fw text-danger"></i> $994.00
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col lg={ 3 }>
                <Card className="mb-3">
                    <CardBody>
                        <CardTitle tag="h6" className="mb-4">
                            Accounts Receivable
                        </CardTitle>
                        <div>
                            <div className="mb-3">
                                <h2>$ 451.00</h2>
                            </div>
                            <div>
                                <i className="fa fa-caret-up fa-fw text-success"></i> $938.00
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col lg={ 3 }>
                <Card className="mb-3">
                    <CardBody>
                        <CardTitle tag="h6" className="mb-4">
                            Accounts Receivable
                        </CardTitle>
                        <div>
                            <div className="mb-3">
                                <h2>$ 194.00</h2>
                            </div>
                            <div>
                                <i className="fa fa-caret-up fa-fw text-success"></i> $519.00
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col lg={ 8 }>
                <Card className="mb-3">
                    <CardBody>
                        <CardTitle className="mb-4 d-flex">
                            <h6>Account Performance</h6>
                        </CardTitle>
                        <div className="d-flex justify-content-center">
                            <StackedAreaChart />
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col lg={ 4 }>
                <Card className="mb-3">
                    <CardBody>
                        <CardTitle className="mb-1">
                            <h6 className="mb-0">Settings</h6>
                        </CardTitle>
                    </CardBody>
                    <ListGroup flush>
                        <ListGroupItem className="d-flex">
                            <span>My Cash</span>
                            <CustomInput type="switch" id="exampleCustomSwitch" name="customSwitch" label="" className="ml-auto" />
                        </ListGroupItem>
                        <ListGroupItem className="d-flex">
                            <span>My Cap</span>
                            <CustomInput type="switch" id="exampleCustomSwitch1" name="customSwitch" label="" className="ml-auto" defaultChecked />
                        </ListGroupItem>
                        <ListGroupItem className="d-flex">
                            <span>Client List</span>
                            <CustomInput type="switch" id="exampleCustomSwitch2" name="customSwitch" label="" className="ml-auto" defaultChecked />
                        </ListGroupItem>
                        <ListGroupItem className="d-flex">
                            <span>Recent Fundings</span>
                            <CustomInput type="switch" id="exampleCustomSwitch3" name="customSwitch" label="" className="ml-auto" />
                        </ListGroupItem>
                        <ListGroupItem className="d-flex">
                            <span>Invoice Creator</span>
                            <CustomInput type="switch" id="exampleCustomSwitch4" name="customSwitch" label="" className="ml-auto" />
                        </ListGroupItem>
                        <ListGroupItem className="d-flex">
                            <span>Sales Lead</span>
                            <CustomInput type="switch" id="exampleCustomSwitch5" name="customSwitch" label="" className="ml-auto" defaultChecked />
                        </ListGroupItem>
                        <ListGroupItem className="d-flex">
                            <span>Q&A</span>
                            <CustomInput type="switch" id="exampleCustomSwitch6" name="customSwitch" label="" className="ml-auto" defaultChecked />
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </Container>
);

export default setupPage({
    pageTitle: 'Financial'
})(Financial);