import React from 'react';
import { Router } from 'react-router';
import routes from './routes/routes';
import './app.css';

React.render(
    <Router>{routes}</Router>
, document.getElementById('react-root'));
