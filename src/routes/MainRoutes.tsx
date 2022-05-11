import React from 'react';
import { Layout } from 'antd';
import { Route, Routes } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import User from '../pages/user/User';
import { ToastContainer } from 'react-toastify';
import Preferences from '../pages/preferences/Preferences';
import PreferencesGeneral from '../pages/preferences/PreferencesGeneral';
import PreferencesFiles from '../pages/preferences/PreferencesFiles';

import 'react-toastify/dist/ReactToastify.css';
import UsersRoutes from './UserRoutes';
import UserList from '../pages/user/UserList';
import Sidebar from '../components/layout/Sidebar';
import AppHeader from '../components/layout/AppHeader';

const { Content } = Layout;

export default function MainRoutes() {
  return (
    <>
      <Layout>
        <AppHeader />
      </Layout>
      <Layout className='body'>
        <Layout>
          <Sidebar />
          <Content className='main-content p-2'>
            <ToastContainer />
            <Routes>
              <Route path={'/'} element={<Dashboard />} />
              <Route path='/preferences' element={<Preferences />}>
                <Route path='' element={<PreferencesGeneral />} />
                <Route path='documents' element={<PreferencesFiles />} />
              </Route>
              <Route path='/inicio' element={<Dashboard />} />
              <Route path='/usuarios/:entityId' element={<User />} />
              <Route path={'users'} element={<UsersRoutes />}>
                <Route path='' element={<UserList />} />
                <Route path=':uuid' element={<User />} />
              </Route>
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
