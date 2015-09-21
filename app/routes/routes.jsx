import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppContainer from '../containers/AppContainer';
// import HomePageContainer from '../containers/HomePageContainer';
import AboutPageContainer from '../containers/AboutPageContainer';
import DocumentContainer from '../containers/DocumentContainer';

export default (
    <Route component={AppContainer} path="/">
        <IndexRoute component={DocumentContainer} />
        <Route component={AboutPageContainer} path="about" />
    </Route>
);
