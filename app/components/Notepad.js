import React from 'react';
import Reflux from 'reflux';
import {
    Glyphicon,
    ButtonToolbar,
    Button
} from 'react-bootstrap';
import Mixin from '../utils/Mixin';
import CellActions from '../actions/CellActions';
import CellStore from '../stores/CellStore';
import Toolbar from './Toolbar';
import CodeCell from './CodeCell';
import TextCell from './TextCell';

import 'brace/theme/tomorrow';
import 'brace/mode/javascript';
import 'brace/mode/plain_text';

// @Mixin(Reflux.connect(CellStore, 'cells'))
export default class Notepad extends React.Component {
    static cellTypes = {
        text: {
            component: TextCell,
            help: 'you can type any text here'
        },
        code: {
            component: CodeCell,
            help: 'you can type code here, cmd + enter to run'
        }
    }

    state = {
        cells: CellStore.getInitialState()
    }

    componentDidMount() {
        this.unsubscribe = CellStore.listen(::this.handleCellsUpdate);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleCellsUpdate(cells) {
        this.setState({cells});
    }

    handleNewCell(index, type) {
        CellActions.createCell(index, {
            content: '',
            type
        });
    }

    handleRemoveCell(index) {
        CellActions.removeCell(index);
    }

    handleHover(cell, hovered) {
        cell.visible = hovered;
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <h3 className="page-header">
                    Project name here
                </h3>
                {this.state.cells.map((cell, index) => {
                    let CellComponent = Notepad.cellTypes[cell.type].component;
                    return (
                        <div key={cell.id}
                             onMouseOver={this.handleHover.bind(this, cell, true)}
                             onMouseOut={this.handleHover.bind(this, cell, false)}>

                            <CellComponent cell={cell}/>

                            <div style={{visibility: cell.visible ? 'visible' : 'hidden'}}>
                                <strong className="text-muted">{Notepad.cellTypes[cell.type].help}</strong>
                                <ButtonToolbar className="pull-right">
                                    <Button bsStyle="link" bsSize="xsmall" onClick={this.handleNewCell.bind(this, index, 'code')}>
                                        <Glyphicon glyph="grain"/>
                                    </Button>
                                    <Button bsStyle="link" bsSize="xsmall" onClick={this.handleNewCell.bind(this, index, 'code')}>
                                        <Glyphicon glyph="console"/>
                                    </Button>
                                    <Button bsStyle="link" bsSize="xsmall" onClick={this.handleNewCell.bind(this, index, 'text')}>
                                        <Glyphicon glyph="pencil"/>
                                    </Button>
                                    <Button bsStyle="link" bsSize="xsmall" onClick={this.handleRemoveCell.bind(this, index)} disabled={this.state.cells.length == 1}>
                                        <Glyphicon glyph="remove"/>
                                    </Button>
                                </ButtonToolbar>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
