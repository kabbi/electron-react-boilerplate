import React from 'react';
import CellActions from '../actions/CellActions';
import AceEditor from './AceEditor';

export default class EditorCell extends React.Component {
    static propTypes = {
        cell: React.PropTypes.object,
        mode: React.PropTypes.string.isRequired,
        showGutter: React.PropTypes.bool.isRequired
    }

    state = {
        value: this.props.cell.content
    }

    handleLoad(editor) {
        editor.commands.addCommand({
            name: 'execute',
            bindKey: {
                win: 'Ctrl-Enter',
                mac: 'Command-Enter',
                sender: 'editor|cli'
            },
            exec: (env, args, request) => {
                CellActions.evaluateCell(this.props.cell);
            }
        });
    }

    handleChange(value) {
        if (this.state.value != value) {
            CellActions.updateCellContent(this.props.cell, value);
        }
        this.setState({value});
    }

    render() {
        return (
            <AceEditor
                fontSize={15}
                highlightActiveLine={false}
                firstLineNumber={this.props.cell.firstLine}
                showGutter={this.props.showGutter}
                mode={this.props.mode}
                name={this.props.cell.id}
                value={this.state.value}
                onLoad={::this.handleLoad}
                onChange={::this.handleChange}
                theme="tomorrow"
                maxLines={Infinity}
                width="100%"/>
        );
    }
}
