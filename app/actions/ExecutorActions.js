import Reflux from 'reflux';

export default Reflux.createActions({
    evaluateCell: {asyncResult: true},
    startKernel: {asyncResult: true},
    stopKernel: {asyncResult: true},
    killKernel: {asyncResult: true}
})
