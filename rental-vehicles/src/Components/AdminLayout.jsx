import { CarOutlined, PullRequestOutlined, SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { RequestStatus, RequestStatusIndex } from '../Constants/constants';
import { AdminVehicles, AdminRequests, UserSettings } from '../Pages';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const views = {
  Vehicles: <AdminVehicles />,
  PendingRequests: <AdminRequests type={RequestStatus[RequestStatusIndex.Pending]}/>,
  AcceptedRequests: <AdminRequests type={RequestStatus[RequestStatusIndex.Accepted]}/>,
  UserSettings: <UserSettings />
}

const MapItemsToViews = {
  '1': views.Vehicles,
  '2': views.PendingRequests,
  '3': views.AcceptedRequests,
  '4': views.UserSettings
}

const MapItemsToSections = {
  '1': 'Vehicles',
  '2': 'Pending requests',
  '3': 'Accepted requests',
  '4': 'Settings'
}

const items = [
  getItem('Vehicles', '1', <CarOutlined />),
  getItem('Requests', 'sub1', <PullRequestOutlined />, [
    getItem('Pending', '2'),
    getItem('Accepted', '3'),
  ]),
  getItem('Account', '4', <SettingOutlined />)
];

const AdminLayout = () => {

  const [currentView, setCurrentView] = useState(views.PendingRequests);
  const [currentSection, setCurrentSection] = useState('Vehicles');
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu
          onClick={(item) => {
            setCurrentView(MapItemsToViews[item.key]);
            setCurrentSection(MapItemsToSections[item.key]);
          }}
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            paddingLeft: 20,
          }}
        >
          <h1>RentalVehicles</h1>
        </Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>{ currentSection }</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {currentView}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            fontSize:12
          }}
        >
          Rental Vehicles ©2022 Created by <a href='https://github.com/DanielVillota16'>@DanielVillota16</a>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;