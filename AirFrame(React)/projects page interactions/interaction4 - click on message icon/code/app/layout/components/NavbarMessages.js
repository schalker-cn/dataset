import React from "react";
import _ from "lodash";
import MESSAGE_MOCK from "../../mocks/MESSAGE_MOCK.json";
import PropTypes from "prop-types";

import {
  Avatar,
  UncontrolledDropdown,
  DropdownToggle,
  IconWithBadge,
  Badge,
  ExtendedDropdown,
  ListGroup,
  ListGroupItem,
  Media,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
} from "./../../components";

const avatarImg = "https://dummyimage.com/1080x1080/0606fc/0606fc&text=1";

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
    <ExtendedDropdown right>
      <ExtendedDropdown.Section className="d-flex justify-content-between align-items-center">
        <h6 className="mb-0">Messages</h6>
        <ExtendedDropdown.Link>
          <i className="fa fa-pencil" />
        </ExtendedDropdown.Link>
      </ExtendedDropdown.Section>
      <ExtendedDropdown.Section>
        <InputGroup>
          <Input placeholder="Search Messages..." />
          <InputGroupAddon addonType="append">
            <Button color="secondary" outline>
              <i className="fa fa-search" />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </ExtendedDropdown.Section>

      <ExtendedDropdown.Section list>
        <ListGroup>
          {MESSAGE_MOCK.messages.map((msg, index) => (
            <ListGroupItem
              tag={ExtendedDropdown.Link}
              key={index}
              action
            >
              <Media>
                <Media left>
                  <Avatar.Image src={avatarImg} className="mr-4" />
                </Media>
                <Media body>
                  <span className="d-flex justify-content-start">
                    <i
                      className={`fa fa-circle small ${msg.statusColor} mr-2 d-flex align-items-center`}
                    />
                    <span className="h6 pb-0 mb-0 d-flex align-items-center">
                      {msg.firstName} {msg.lastName}
                    </span>

                    <span className="ml-1 small">({msg.unreadCount})</span>
                    <span className="ml-auto small">{msg.time}</span>
                  </span>
                  <p className="mt-2 mb-1">
                    {`${msg.title}: "${msg.content}".`}
                  </p>
                </Media>
              </Media>
            </ListGroupItem>
          ))}
        </ListGroup>
      </ExtendedDropdown.Section>

      <ExtendedDropdown.Section
        className="text-center"
        tag={ExtendedDropdown.Link}
      >
        View All
        <i className="fa fa-angle-right fa-fw ml-2" />
      </ExtendedDropdown.Section>
    </ExtendedDropdown>
  </UncontrolledDropdown>
);
NavbarMessages.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

export { NavbarMessages };
