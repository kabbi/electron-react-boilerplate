var cp = require('child_process');
var esprima = require('esprima');
var escodegen = require('escodegen');
var bugger = require('bugger-v8-client');
var ipc = require('ipc');

var Executor = exports.Executor = function(window) {
    this.window = window;
    this.child = null;
    this.status = 'stopped';
};

Executor.prototype.destroy = function() {
    if (!this.child) {
        return;
    }

    // Wrap all destroy thing in try block, as we can't
    // afford throwing exceptions at the time when window
    // is already dead
    try {
        // Disable all our listeners as window is already dead
        this.child.removeAllListeners('exit');
        this.child.stdout.removeAllListeners('data');
        this.child.stderr.removeAllListeners('data');

        // Force kill everything, and don't even wait
        this.debugger.close();
        this.child.kill();
        this.child = null;
    } catch (e) {
        console.log('Fatal exception during shutdown:', e);
    }
};

Executor.prototype.getWebContents = function() {
    return this.window.webContents;
};

Executor.prototype.startKernel = function(event, proc) {
    if (this.child) {
        return;
    }

    var self = this;
    this.child = cp.spawn('node', ['--debug', '--debug-brk', './app/core/kernel.js'], {
        stdio: ['pipe', 'pipe', 'pipe']
    });
    this.child.stdout.on('data', function(data) {
        self.getWebContents().send('executor.log.stdout', data.toString('utf8'));
    });
    this.child.stderr.on('data', function(data) {
        self.getWebContents().send('executor.log.stderr', data.toString('utf8'));
    });
    this.child.on('exit', function(code, signal) {
        self.status = 'exited';
        self.child = null;
        self.debugger = null;
        self.getWebContents().send('executor.stopped', code, signal);
    });
    this.status = 'running';
    this.debugger = bugger.createDebugClient();
    return this.debugger.connect();
};

Executor.prototype.killKernel = function() {
    if (!this.child) {
        return;
    }

    return this.debugger.disconnect().finally(function() {
        this.child.kill();
        this.child = null;
        this.status = 'killed';
    });
};

Executor.prototype.evaluateCell = function(cell) {
    return this.debugger.evalSimple(cell.content).then(function(result) {
        cell.result = result;
        return cell;
    }, function(fail) {
        cell.result = fail;
        return cell;
    });
};

// var prefix = 'function publishResult() {process.send()}';
//
// var tree = esprima.parse('function test() {return 42};test() == 42');
//
// if (tree.body.length) {
//     var lastExpressionIdx = tree.body.length - 1;
//     var lastExpression = tree.body[lastExpressionIdx].expression;
//     tree.body[lastExpressionIdx] = {
//         type: 'ExpressionStatement',
//         expression: {
//             type: 'CallExpression',
//             callee: {
//                 type: 'Identifier',
//                 name: 'publishResult'
//             },
//             arguments: [
//                 lastExpression
//             ]
//         }
//     };
// }
//
// console.log(JSON.stringify(tree, null, 4));
// console.log(escodegen.generate(tree));

