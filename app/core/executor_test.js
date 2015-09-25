var cp = require('child_process');

var child = cp.spawn('node', ['./kernel.js'], {
    stdio: ['ipc', 'pipe', 'pipe']
});
child.stdout.on('data', function(data) {
    console.log('STDOUT: ', data.toString('utf8'));
});
child.stderr.on('data', function(data) {
    console.log('STDERR: ', data.toString('utf8'));
});
child.on('message', function(message) {
    console.log(JSON.stringify(message));
});
child.on('exit', function(code, signal) {
    console.log('Process exited', code, signal);
});
