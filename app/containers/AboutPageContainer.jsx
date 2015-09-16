import React from 'react';
import { Link } from 'react-router';

export default class AboutPageContainer extends React.Component {
    state = {
        counter: 42
    }

    onClicked() {
        this.setState({
            counter: this.state.counter + 2
        });
    }

    render() {
        return (
            <div>
                <h2>About Page</h2>
                <p>About us. {this.state.counter} hh</p>
                <button onClick={this.onClicked.bind(this)}>test</button>
                <Link to="/">back Home</Link>
            </div>
        );
    }
}
