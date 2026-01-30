import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Card,
  CardBody,
  CardTitle,
  Button,
  InputGroup,
  InputGroupAddon,
  Input,
  ListGroup,
  ListGroupItem,
  Col,
} from "./../../../components";
import { setupPage } from "./../../../components/Layout/setupPage";

import { HeaderMain } from "../../components/HeaderMain";

import { TasksMedia } from "../../components/ProjectsDashboards/TasksMedia";
import { TimelineMini } from "../../components/Timeline/TimelineMini";
import { DraggableProjects } from "./DraggableProjects";

import TIMELINE_MOCK from "../../../mocks/TIMELINE_MOCK.json";

const ProjectsDashboard = () => (
  <Container>
    <Row className="mb-5">
      <Col lg={12}>
        <HeaderMain title="Projects" className="mb-4 mb-lg-5" />
      </Col>
    </Row>
    <Row>
      <Col lg={4}>
        <Card className="mb-3">
          <CardBody>
            <CardTitle tag="h6" className="mb-3">
              Tasks
            </CardTitle>
            <InputGroup>
              <Input placeholder="Search Tasks..." />
              <InputGroupAddon addonType="append">
                <Button
                  color="secondary"
                  outline
                  tag={Link}
                >
                  <i className="fa fa-search"></i>
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </CardBody>
          <ListGroup flush>
            <ListGroupItem>
              <TasksMedia iconColor="success" id="1"/>
            </ListGroupItem>
            <ListGroupItem>
              <TasksMedia iconColor="danger" id="2" />
            </ListGroupItem>
            <ListGroupItem>
              <TasksMedia iconColor="warning" id="3" />
            </ListGroupItem>
            <ListGroupItem
              tag={Link}
              className="text-center"
            >
              View All Tasks
              <i className="fa fa-angle-right ml-2"></i>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
      <Col lg={4}>
        <Card className="mb-3">
          <CardBody>
            <CardTitle tag="h6">Timeline Mini</CardTitle>
            {TIMELINE_MOCK.timeline.map((item, index) => (
              <TimelineMini
                key={index}
                showPillDate={item.showPillDate}
                pillDate={item.pillDate}
                icon={item.icon}
                iconClassName={item.iconClassName}
                badgeTitle={item.badgeTitle}
                badgeColor={item.badgeColor}
                content={item.content}
                date={item.date}
              />
            ))}
          </CardBody>
          <ListGroup flush>
            <ListGroupItem
              tag={Link}
              className="text-center"
            >
              Timeline Details
              <i className="fa fa-angle-right ml-2"></i>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
      <Col lg={4}>
        <Card className="mb-3">
          <CardBody>
            <CardTitle tag="h6" className="mb-3">
              Projects
            </CardTitle>
            <InputGroup>
              <Input placeholder="Search Projects..." />
              <InputGroupAddon addonType="append">
                <Button
                  color="secondary"
                  outline
                  tag={Link}
                >
                  <i className="fa fa-search"></i>
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </CardBody>
          <DraggableProjects />
        </Card>
      </Col>
    </Row>
  </Container>
);

export default setupPage({
  pageTitle: "Projects Dashboard",
})(ProjectsDashboard);
