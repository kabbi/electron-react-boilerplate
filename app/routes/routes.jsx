import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppContainer from '../containers/AppContainer';
import HomePageContainer from '../containers/HomePageContainer';
import AboutPageContainer from '../containers/AboutPageContainer';

export default (
    <Route component={AppContainer} path="/">
        <IndexRoute component={HomePageContainer} />
        <Route component={AboutPageContainer} path="about" />
    </Route>
);
