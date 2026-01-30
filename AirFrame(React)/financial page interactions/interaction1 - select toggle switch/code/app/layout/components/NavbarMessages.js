import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

import {
  Avatar,
  UncontrolledDropdown,
  DropdownToggle,
  IconWithBadge,
  Badge,
} from "./../../components";


const NavbarMessages = (props) => (
  <UncontrolledDropdown nav inNavbar {...props}>
    <DropdownToggle nav>
      <IconWithBadge
        badge={
          <Badge pill color="secondary">
            3
          </Badge>
        }
      >
        <i className="fa fa-envelope-o fa-fw" />
      </IconWithBadge>
    </DropdownToggle>
  </UncontrolledDropdown>
);
NavbarMessages.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

export { NavbarMessages };
