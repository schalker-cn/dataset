import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {
  Container,
  ButtonToolbar,
  ButtonGroup,
  UncontrolledButtonDropdown,
  DropdownToggle,
  FloatGrid as Grid,
  Card,
  CardBody,
  Button,
  CardHeader,
} from "./../../../components";
import { applyColumn } from "./../../../components/FloatGrid";

import { HeaderMain } from "../../components/HeaderMain";
import { AudienceMetricsChart } from "./components/AudienceMetricsChart";

import classes from "./Analytics.scss";

const LAYOUT = {
  "metric-v-target-users": { h: 6, md: 4 },
  "metric-v-target-sessions": { h: 6, md: 4 },
  "metric-v-target-pageviews": { h: 6, md: 4 },
  "analytics-audience-metrics": { h: 9, minH: 7 },
  "traffic-channels": { md: 6, h: 6 },
  sessions: { md: 6, h: 6, maxH: 9, minW: 3 },
  spend: { md: 6, h: 7 },
  "website-performance": { md: 6, h: 11 },
  "organic-traffic": { md: 6, h: 10 },
};

const SessionByDevice = (props) => (
  <div className={classes["session"]}>
    <div className={classes["session__title"]}>{props.title}</div>
    <div className={classes["session__values"]}>
      <div className={`${classes["session__percentage"]} text-${props.color}`}>
        {props.valuePercent}%
      </div>
      <div className={`${classes["session__value"]} text-${props.color}`}>
        {props.value}
      </div>
    </div>
  </div>
);
SessionByDevice.propTypes = {
  title: PropTypes.node,
  color: PropTypes.string,
  valuePercent: PropTypes.string,
  value: PropTypes.string,
};

export class Analytics extends React.Component {
  state = {
    layouts: _.clone(LAYOUT),
  };

  _resetLayout = () => {
    this.setState({
      layouts: _.clone(LAYOUT),
    });
  };

  render() {
    const { layouts } = this.state;

    return (
      <React.Fragment>
        <Container fluid={false}>
          <div className="d-flex mt-3 mb-5">
            <HeaderMain title="Analytics" className="mt-0" />
            <ButtonToolbar className="ml-auto">
              <ButtonGroup className="align-self-start mr-2">
                <UncontrolledButtonDropdown className="ml-auto flex-column">
                  <DropdownToggle
                    color="link"
                    className="text-left pl-0 text-decoration-none mb-2"
                  >
                    <i className="fa fa-globe text-body mr-2"></i>
                    www.webkom.co
                    <i className="fa fa-angle-down text-body ml-2" />
                  </DropdownToggle>
                </UncontrolledButtonDropdown>
              </ButtonGroup>
              <ButtonGroup className="align-self-start mr-2">
                <UncontrolledButtonDropdown className="ml-auto flex-column">
                  <DropdownToggle
                    color="link"
                    className="text-left pl-0 text-decoration-none mb-2"
                  >
                    <i className="fa fa-calendar-o text-body mr-2"></i>
                    Last Month
                    <i className="fa fa-angle-down text-body ml-2" />
                  </DropdownToggle>
                  <div className="small">Jan 01, 2017 to Jan 31, 2017</div>
                </UncontrolledButtonDropdown>
              </ButtonGroup>
              <ButtonGroup className="align-self-start mr-2">
                <UncontrolledButtonDropdown className="ml-auto flex-column">
                  <DropdownToggle
                    color="link"
                    className="text-left pl-0 text-decoration-none mb-2"
                  >
                    <i className="fa fa-calendar-o text-body mr-2"></i>
                    Previous Period
                    <i className="fa fa-angle-down text-body ml-2" />
                  </DropdownToggle>
                  <div className="small">Jan 01, 2017 to Jan 31, 2017</div>
                </UncontrolledButtonDropdown>
              </ButtonGroup>
              <ButtonGroup className="align-self-start">
                <Button color="primary" className="mb-2 mr-2 px-3">
                  Apply
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button
                  color="link"
                  className="mb-2 text-decoration-none align-self-start"
                  onClick={this._resetLayout}
                >
                  Reset
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          </div>
        </Container>

        <Grid>
          <Grid.Row
            onLayoutChange={(layouts) => this.setState({ layouts })}
            columnSizes={this.state.layouts}
            rowHeight={55}
          >
            <Grid.Col {...applyColumn("analytics-audience-metrics", layouts)}>
              <Card>
                <CardHeader className="bb-0 pt-3 pb-4 bg-none" tag="h6">
                  <i className="fa fa-ellipsis-v mr-2 text-body"></i> Analytics
                  Audience Metrics
                </CardHeader>
                <CardBody className="d-flex flex-column">
                  <Grid.Ready>
                    <AudienceMetricsChart height="100%" className="flex-fill" />
                  </Grid.Ready>
                </CardBody>
              </Card>
            </Grid.Col>

          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}
