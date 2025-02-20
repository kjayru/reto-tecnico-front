import React from 'react';
import { Layout, Menu, Avatar, Space } from 'antd';
import { DashboardOutlined, TeamOutlined, AppstoreOutlined, LineChartOutlined, BellOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import './styles.less';

const { Header } = Layout;

const NavHeader = () => {
    return (
      <Header style={{ backgroundColor: '#2490ff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ backgroundColor: '#2490ff', flex: 1 }}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>Dashboard</Menu.Item>
          <Menu.Item key="2" icon={<TeamOutlined />}>Organización</Menu.Item>
          <Menu.Item key="3" icon={<AppstoreOutlined />}>Modelos</Menu.Item>
          <Menu.Item key="4" icon={<LineChartOutlined />}>Seguimiento</Menu.Item>
        </Menu>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Space size="large">
          <BellOutlined style={{ fontSize: '20px', color: 'white' }} />
          <QuestionCircleOutlined style={{ fontSize: '20px', color: 'white' }} />
          <Avatar style={{ backgroundColor: '#edacae', color: 'white' }}>A</Avatar>
          <span style={{ color: 'white' }}>Administrador</span>
        </Space>
      </div>
    </Header>
    );   
};
export default NavHeader;