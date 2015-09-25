import React from 'react';
import Reflux from 'reflux';
import {
    Glyphicon,
    ButtonToolbar,
    OverlayTrigger,
    DropdownButton,
    MenuItem,
    Tooltip,
    Button
} from 'react-bootstrap';
import Mixin from '../utils/Mixin';
import CellActions from '../actions/CellActions';
import CellStore from '../stores/CellStore';
import ExecutorStore from '../stores/ExecutorStore';
import IconizedButton from './IconizedButton';
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
        cells: CellStore.getInitialState(),
        kernel: ExecutorStore.getInitialState()
    }

    componentDidMount() {
        this.unsubscribe = [
            CellStore.listen(::this.handleCellsUpdate),
            ExecutorStore.listen(::this.handleExecutorUpdate),
        ];
    }

    componentWillUnmount() {
        this.unsubscribe.forEach((item) => item());
    }

    handleCellsUpdate(cells) {
        this.setState({cells});
    }

    handleExecutorUpdate(kernel) {
        this.setState(kernel);
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

    getKernelState() {
        const statusToClass = {
            running: 'success',
            exited: 'warning',
            stopped: 'default'
        };
        return statusToClass[this.state.kernel.status];
    }

    render() {
        return (
            <div>
                <h3 className="page-header">
                    <ButtonToolbar className="pull-right">
                        <DropdownButton bsStyle={this.getKernelState()} bsSize="small" id="kernelDropdown"
                                        title={'kernel: ' + this.state.kernel.status}>
                            <MenuItem disabled={!this.state.kernel.running}>
                                Start
                            </MenuItem>
                            <MenuItem disabled={!this.state.kernel.running}>
                                Kill
                            </MenuItem>
                            <MenuItem>
                                Log
                            </MenuItem>
                        </DropdownButton>
                    </ButtonToolbar>
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
                                    <IconizedButton icon="grain" label="Coffee / JS"
                                        onClick={() => {}}/>
                                    <IconizedButton icon="console" label="New code cell"
                                        onClick={this.handleNewCell.bind(this, index, 'code')}/>
                                    <IconizedButton icon="pencil" label="New text cell"
                                        onClick={this.handleNewCell.bind(this, index, 'text')}/>
                                    <IconizedButton icon="remove" label="Remove this cell"
                                        onClick={this.handleRemoveCell.bind(this, index)}/>
                                </ButtonToolbar>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
