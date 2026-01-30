import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

import {
  UncontrolledDropdown,
  DropdownToggle,
  IconWithBadge,
  Badge,
} from "./../../components";

/*eslint-enable */

const NavbarActivityFeed = (props) => (
  <UncontrolledDropdown nav inNavbar {...props}>
    <DropdownToggle nav>
      <IconWithBadge
        badge={
          <Badge pill color="primary">
            2
          </Badge>
        }
      >
        <i className="fa fa-bell-o fa-fw" />
      </IconWithBadge>
    </DropdownToggle>
  </UncontrolledDropdown>
);
NavbarActivityFeed.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

export { NavbarActivityFeed };
