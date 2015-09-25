import Reflux from 'reflux';
import uuid from 'uuid';
import CellActions from '../actions/CellActions';
import ExecutorActions from '../actions/ExecutorActions';

export default Reflux.createStore({
    listenables: CellActions,

    getCellById(id) {
        return this.cells.filter((cell) => cell.id === id)[0];
    },

    onCreateCell(insertAfterIndex, cell) {
        console.log('Creating cell at', insertAfterIndex, cell);
        cell.id = uuid.v1();
        this.cells.splice(insertAfterIndex + 1, 0, cell);
        this.recalculateLineNumbers();
        this.updateList();
    },

    onRemoveCell(index) {
        console.log('Removing cell at', index);
        this.cells.splice(index, 1);
        this.recalculateLineNumbers();
        this.updateList();
    },

    onUpdateCellContent(cell, content) {
        this.getCellById(cell.id).content = content;
        this.recalculateLineNumbers();
        this.updateList();
    },

    onUpdateCellResult(cell, result, successOrFail) {
        console.log('Updating cell result', cell.id, result);
        var cell = this.getCellById(cell.id);
        cell.result = result;
        cell.status = successOrFail ? 'success' : 'fail';
        this.updateList();
    },

    onEvaluateCell(cell) {
        console.log('Sending cell to evaluation', cell);
        CellActions.evaluateCell.promise(
            ExecutorActions.evaluateCell.triggerPromise(cell)
        );
    },

    recalculateLineNumbers() {
        let currentLine = 1;
        this.cells.forEach((cell) => {
            if (cell.type != 'code') {
                return;
            }
            cell.firstLine = currentLine;
            currentLine += cell.content.split('\n').length;
        });
    },

    updateList() {
        this.trigger(this.cells);
    },

    getInitialState() {
        return this.cells = [{
            id: uuid.v1(),
            type: 'text',
            content: 'Welcome!'
        }, {
            id: uuid.v1(),
            type: 'code',
            firstLine: 1,
            content: '' +
                'var result = 6 * 7;\n' +
                'function test() {\n' +
                '    return 42;\n' +
                '}\n' +
                'test() == result;'
        }];
    }
});