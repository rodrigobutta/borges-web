import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { SettingOutlined, WindowsOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const { SubMenu } = Menu;

const MENU_ITEMS = [
  {
    to: `/inicio`,
    label: 'Início',
    icon: <WindowsOutlined />,
  },
  {
    to: `/users`,
    label: 'Usuarios',
    icon: <UserOutlined />,
  },
  {
    to: `/preferences`,
    label: 'Preferências',
    icon: <SettingOutlined />,
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed: boolean) => setCollapsed(collapsed);

  return (
    <Sider collapsible collapsed={collapsed} width={220} onCollapse={onCollapse} className={'sidebar'}>
      <Menu mode='inline'>
        {MENU_ITEMS.map((x: any) => {
          if (x.children) {
            return (
              <SubMenu key={x.to} icon={x.icon} title={x.label}>
                {x.children.map((x: any) => {
                  return (
                    <Menu.Item key={x.to}>
                      <Link to={x.to}>{x.label}</Link>
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            );
          }

          return (
            <Menu.Item icon={x.icon} key={x.to}>
              <Link to={x.to}>{x.label}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
