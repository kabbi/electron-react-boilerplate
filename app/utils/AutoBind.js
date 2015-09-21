let propSymbol = 'asd';//Symbol('auto bind list');

export default function AutoBind(clazz, method) {
    console.log('auto-bind', clazz, method, typeof clazz);
    // Add it to the object, if it was already wrapped,
    // or wrap it with our binder constructor otherwise
    if (propSymbol in clazz) {
        console.log('already overriden, appending');
        clazz[propSymbol].push(method);
    } else {
        console.log('initial overriding');
        class overriden extends clazz {
            constructor() {
                super();
                for (let method of clazz[propSymbol]) {
                    console.log('auto-binding', method);
                }
            }
        }
        // Init empty array for methods to bind
        overriden[propSymbol] = [method];
    }
}
