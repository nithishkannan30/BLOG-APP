import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <main>
      <Header />
      {/* The <Outlet> component is where the child routes will be rendered. It acts as a placeholder in the layout component where the matched child route components will be displayed. */}
      <Outlet />
    </main>
  );
};

export default Layout;
