import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import RouteModule from './Routes';
import './index.css';
//Router is added at this stage.
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter >
      <RouteModule />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


