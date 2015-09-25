module.exports = function(data) {
    var pathCache = new Map();
    function serializeObject(result, currentPath, data) {

        console.log('descending', currentPath, data, pathCache);

        if (data === undefined) {
            result.undefined = true;
            return;
        } else if (data === null) {
            result.null = true;
            return;
        }

        // Resolve circulars
        var cachedPath = pathCache.get(data);
        if (cachedPath) {
            result.ref = cachedPath;
            return;
        }
        pathCache.set(data, currentPath);

        if (typeof data == 'function') {
            result.code = data.toString();
        } else if (typeof data != 'object') {
            result.primitive = true;
            result.value = data;
            data = new Object(data);
        }

        // Just to be true
        result.string = data.toString();

        // Properties
        result.properties = {};
        var properties = Object.getOwnPropertyNames(data);
        properties.forEach(function(name) {
            var desc = Object.getOwnPropertyDescriptor(data, name);
            result.properties[name] = {
                writable: desc.writable,
                configurable: desc.configurable,
                enumerable: desc.enumerable,
                get: {},
                set: {},
                value: {}
            };
            serializeObject(result.properties[name].get, currentPath + '.' + name + '$get', desc.get);
            serializeObject(result.properties[name].set, currentPath + '.' + name + '$set', desc.set);
            serializeObject(result.properties[name].value, currentPath + '.' + name, desc.value);
        });

        // And prototypes
        result.prototypeOf = {};
        
    }
    var result = {};
    serializeObject(result, '', data);
    return result;
};
