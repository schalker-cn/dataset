import React from "react";
import { Link } from "react-router-dom";

import {
  Sidebar,
  UncontrolledButtonDropdown,
  Avatar,
  AvatarAddOn,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "./../../../components";

const avatarImg = "https://dummyimage.com/1080x1080/0606fc/0606fc&text=1";


const SidebarTopA = () => (
  <React.Fragment>
    {/* START: Sidebar Default */}
    <Sidebar.HideSlim>
      <Sidebar.Section className="pt-0">
        <Link className="d-block">
          <Sidebar.HideSlim>
            <Avatar.Image
              size="lg"
              src={avatarImg}
              addOns={[
                <AvatarAddOn.Icon
                  className="fa fa-circle"
                  color="white"
                  key="avatar-icon-bg"
                />,
                <AvatarAddOn.Icon
                  className="fa fa-circle"
                  color="success"
                  key="avatar-icon-fg"
                />,
              ]}
            />
          </Sidebar.HideSlim>
        </Link>

        <UncontrolledButtonDropdown>
          <DropdownToggle
            color="link"
            className="pl-0 pb-0 btn-profile sidebar__link"
          >
            Isabella Rossi
            <i className="fa fa-angle-down ml-2"></i>
          </DropdownToggle>
        </UncontrolledButtonDropdown>
        <div className="small sidebar__link--muted">
          Software Engineer
        </div>
      </Sidebar.Section>
    </Sidebar.HideSlim>
    {/* END: Sidebar Default */}

    {/* START: Sidebar Slim */}
    <Sidebar.ShowSlim>
      <Sidebar.Section>
        <Avatar.Image
          size="sm"
          src={avatarImg}
          addOns={[
            <AvatarAddOn.Icon
              className="fa fa-circle"
              color="white"
              key="avatar-icon-bg"
            />,
            <AvatarAddOn.Icon
              className="fa fa-circle"
              color="success"
              key="avatar-icon-fg"
            />,
          ]}
        />
      </Sidebar.Section>
    </Sidebar.ShowSlim>
    {/* END: Sidebar Slim */}
  </React.Fragment>
);

export { SidebarTopA };
