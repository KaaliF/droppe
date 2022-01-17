import React from 'react';
import { Navigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
function RouteModule() {
  //Routes are handled here we can add login functionality in future.
  return (
    <div>
      <Routes >
        <Route path={'/carts'} element={<Layout />} />
        <Route path="/" element={<Navigate replace to='/carts' />} />

      </Routes >
    </div>
  );
}

export default RouteModule;
