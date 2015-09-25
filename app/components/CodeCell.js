import React from 'react';
import { Panel } from 'react-bootstrap';
import EditorCell from './EditorCell';

export default class CodeCell extends React.Component {
    static propTypes = {
        cell: React.PropTypes.object
    }

    render() {
        return (
            <div>
                <EditorCell cell={this.props.cell}
                            mode="javascript"
                            showGutter/>
                <br/>
                <Panel bsStyle={this.props.cell.status ? 'default' : 'danger'} bsSize="xsmall">
                    <code>{JSON.stringify(this.props.cell.result, null, 4)}</code>
                </Panel>
            </div>
        );
    }
}
