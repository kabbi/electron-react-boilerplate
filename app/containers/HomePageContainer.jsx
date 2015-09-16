import React from 'react';
import { Link } from 'react-router';

export default class HomePageContainer extends React.Component {
    render() {
        return (
            <div>
                <h2>Home Page</h2>
                <p>This is the homepage.</p>
                <Link to="/about">to About</Link>
                <p>React version: {React.version}</p>
            </div>
        );
    }
}
