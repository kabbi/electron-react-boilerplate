process.on('message', function(m) {
    console.log('child got message:', m);
});

process.send({
    foo: 'bar'
});

setTimeout(function() {
    console.log('exiting');
}, 1000);