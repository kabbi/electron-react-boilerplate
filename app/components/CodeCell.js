import React from 'react';
import EditorCell from './EditorCell';

export default class CodeCell extends React.Component {
    static propTypes = {
        cell: React.PropTypes.object
    }

    render() {
        return (
            <EditorCell cell={this.props.cell}
                        mode="javascript"
                        showGutter/>
        );
    }
}
