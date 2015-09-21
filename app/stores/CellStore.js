import Reflux from 'reflux';
import uuid from 'uuid';
import CellActions from '../actions/CellActions';

export default Reflux.createStore({
    listenables: CellActions,

    onCreateCell(insertAfterIndex, cell) {
        cell.id = uuid.v1();
        this.cells.splice(insertAfterIndex + 1, 0, cell);
        this.recalculateLineNumbers();
        this.updateList();
    },

    onRemoveCell(index) {
        this.cells.splice(index, 1);
        this.recalculateLineNumbers();
        this.updateList();
    },

    onUpdateCellContent(cell, content) {
        cell.content = content;
        this.recalculateLineNumbers();
        this.updateList();
    },

    onEvaluateCell(cell) {
        // TODO: implement
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