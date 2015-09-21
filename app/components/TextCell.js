import React from 'react';
import EditorCell from './EditorCell';

export default class TextCell extends React.Component {
    static propTypes = {
        cell: React.PropTypes.object
    }

    render() {
        return (
            <EditorCell cell={this.props.cell}
                        mode="plain_text"
                        showGutter={false} />
        );
    }
}
