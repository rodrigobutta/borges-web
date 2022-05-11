import React from 'react';

import { Col, Dropdown, Layout, Menu, Avatar } from 'antd';
import { useNavigate, useLocation } from 'react-router';
import { useKeycloak } from '@react-keycloak/web';
import { useAuth } from '../../providers/AuthProvider';
import settings from '../../settings';
import { CONSUMER_ACCOUNT_ID, PANEL_ACCOUNT_ID } from '../../constants';
import { Profile } from '../../models/Profile';

const { Header } = Layout;

const AppHeader = () => {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, setCurrentProfile } = useAuth();

  const handleLogoutClick = async () => {
    keycloak.logout({
      redirectUri: `${settings.url}`,
    });
  };

  const handleChangeProfile = (profile: Profile) => {
    setCurrentProfile(profile);

    console.log('location.pathname', location.pathname);
    // navigate(location.pathname);
    navigate(`/?goto=${location.pathname}`);
    // navigate(`${location.pathname}`);
  };

  const menuItems = () => {
    const items = [];

    if (auth && auth.profiles) {
      auth.profiles
        .filter((p: Profile) => p.accountId !== CONSUMER_ACCOUNT_ID && p.accountId !== PANEL_ACCOUNT_ID)
        .forEach((i: Profile, ix: number) =>
          items.push(
            <Menu.Item key={ix} onClick={() => handleChangeProfile(i)}>
              {i.name}
            </Menu.Item>,
          ),
        );
    }

    items.push(<Menu.Divider />);
    items.push(
      <Menu.Item key='logout' onClick={handleLogoutClick}>
        Sair
      </Menu.Item>,
    );

    return items;
  };

  return (
    <>
      <title>{(auth && auth.profile?.name) || 'Centro de control'} | Aracar Brasil</title>
      <Header
        className={'user-menu'}
        style={{
          // position: 'fixed',
          // zIndex: 1001,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Col xs={20}>
          <div style={{ display: 'flex' }}></div>
        </Col>
        <Col className='user' xs={4}>
          <Dropdown overlay={<Menu>{menuItems()}</Menu>} trigger={['click']}>
            <div>
              {/* <Avatar>
								{(auth.user.firstName[0] + auth.user.lastName[0]).toUpperCase()}
							</Avatar> */}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  margin: '0px',
                  padding: '0px',
                  flexFlow: 'wrap',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              >
                <Avatar style={{ marginRight: '10px' }}>
                  {(auth.user.firstName[0] + auth.user.lastName[0]).toUpperCase()}
                </Avatar>

                <div style={{ textTransform: 'uppercase' }}>
                  <div style={{ color: '#FFFFFF' }}>{auth.user.firstName}</div>
                  {auth.profile && <div style={{ color: '#33bbe1', display: 'block' }}>{auth.profile.name}</div>}
                </div>
              </div>

              {/* <Button ghost={true} icon={<DownOutlined />}>
								{auth.user.firstName}
							</Button> */}
            </div>
          </Dropdown>
        </Col>
      </Header>
    </>
  );
};

export default AppHeader;
