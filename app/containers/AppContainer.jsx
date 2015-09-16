import React from 'react';

export default class AppContainer extends React.Component {
    static propTypes = {
        children: React.PropTypes.node.isRequired
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
