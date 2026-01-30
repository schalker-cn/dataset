import React from 'react';

import { SidebarMenu } from './../../components';

export const SidebarMiddleNav = () => (
    <SidebarMenu>
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-home"></i>}
            title="Dashboards"
        >
            <SidebarMenu.Item title="Analytics"/>
            <SidebarMenu.Item title="Projects"/>
            <SidebarMenu.Item title="Financial" to='/dashboards/financial' exact />
        </SidebarMenu.Item>
    </SidebarMenu >
);
