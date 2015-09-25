import Reflux from 'reflux';

export default Reflux.createActions({
    createCell: {},
    removeCell: {},
    updateCellContent: {},
    updateCellResult: {},
    evaluateCell: {asyncResult: true}
})
