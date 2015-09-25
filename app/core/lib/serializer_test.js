var serializer = require('./serializer');
var util = require('util');

function Animal() {
    this.type = 'very strange';
    this.name = 'unnamed (track #1)';
}
Animal.prototype.saySomething = function() {
    throw new Error('no voice detected');
};

function Dog() {
    this.name = 'Doggy The Jake';
}
Dog.prototype.saySomething = function() {
    console.log('Bark! Bark!');
};

function Cat(rank) {
    this.name = 'Kitty The Cat #' + rank;
}
Cat.prototype.saySomething = function() {
    console.log('Meeeowww');
};

var circularData = {
    self: null
};
circularData.self = circularData;

var data = {
    date: new Date(),
    str: 'hello',
    obj: {prop: true},
    options: [{
        asd: 'qwe'
    },
        '42 + 43'
    ],
    nativeMethod: console.log,
    simpleMethod: function() {
        return 42;
    },
    regexp: /[asd]/,
    // buffer: new Buffer('112233', 'hex'),
    // classObject: Animal,
    // maybeEvenFunction: Dog,
    // baseInstance: new Animal(),
    // catInstance: new Cat('wheee'),
    // dogInstance: new Dog(),
    // someInternalStuff: process,
    // handle: process.stdin,
    socket: null,
    emptyField: undefined,
    // nonEnumerableTest: 'xxx',
    // circular: circularData
};

console.log(util.inspect(serializer(data), {depth: null, colors: true}));
