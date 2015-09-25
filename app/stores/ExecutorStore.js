import Reflux from 'reflux';
import remote from 'remote';
import uuid from 'uuid';
import ipc from 'ipc';
import ExecutorActions from '../actions/ExecutorActions';
import CellActions from '../actions/CellActions';

export default Reflux.createStore({
    listenables: ExecutorActions,

    init() {
        ipc.on('executor.log.stdout', (data) => {
            console.log('STDOUT: ', data);
        });
        ipc.on('executor.log.stderr', (data) => {
            console.log('STDERR: ', data);
        });
        ipc.on('executor.stopped', () => {
            this.kernel.status = 'exited';
            this.trigger(this.kernel);
            console.log('exited');
        });
    },

    onEvaluateCell(cell) {
        if (this.kernel.status == 'stopped') {
            console.log('Caching eval and starting kernel');
            this.postponedEvals.push(cell);
            ExecutorActions.startKernel();
            return;
        }
        console.log('Evaluating cell', cell);
        ExecutorActions.evaluateCell.promise(
            this.executor.evaluateCell(cell)
        );
    },

    onEvaluateCellCompleted(cell) {
        console.log('Cell evaluated', cell);
        CellActions.updateCellResult(cell, cell.result, true);
    },

    onEvaluateCellFailed(cell) {
        console.log('Cell evaluate failed', cell);
        CellActions.updateCellResult(cell, cell.result, false);
    },

    onStartKernel() {
        console.log('Starting kernel');
        ExecutorActions.startKernel.promise(
            this.executor.startKernel()
        );
    },

    onStartKernelCompleted() {
        console.log('Start kernel ok, running queued evals');
        this.kernel.status = 'running';
        this.trigger(this.kernel);
        this.postponedEvals.forEach((cell) => {
            ExecutorActions.evaluateCell(cell);
        });
    },

    getInitialState() {
        console.log('Initializing executor store');
        this.executor = remote.getCurrentWindow()._executor;
        this.postponedEvals = [];
        return this.kernel = {
            status: this.executor.status,
            logLines: []
        };
    }
});