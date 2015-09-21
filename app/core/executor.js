var cp = require('child_process');
var esprima = require('esprima');
var escodegen = require('escodegen');

var Executor = exports.Executor = function() {

};

var tree = esprima.parse('function test() {return 42};test() == 42');

if (tree.body.length) {
    var lastExpressionIdx = tree.body.length - 1;
    var lastExpression = tree.body[lastExpressionIdx].expression;
    tree.body[lastExpressionIdx] = {
        type: 'ExpressionStatement',
        expression: {
            type: 'CallExpression',
            callee: {
                type: 'Identifier',
                name: 'publishResult'
            },
            arguments: [
                lastExpression
            ]
        }
    };
}

console.log(JSON.stringify(tree, null, 4));
console.log(escodegen.generate(tree));
