// from jayferd's limbo.js
var Class = (function(slice, prototype, hasOwnProperty, undefined) {
  function isObject(o) { return o && typeof o === 'object'; }
  function isFunction(f) { return f && typeof f === 'function'; }

  function Class(_superclass, definition) {
    function Noop() {}

    if (definition === undefined) {
      definition = _superclass;
      _superclass = Object;
    }
    else if (isObject(_superclass[prototype])) {
      Noop[prototype] = new _superclass;
    }

    var proto = Noop[prototype]
      , _super = _superclass[prototype]
      , extensions = {}
    ;

    proto.constructor = Noop;

    if (isFunction(definition)) {
      extensions = definition.call(Noop, proto, _super, Noop, _superclass);
    }
    else if (isObject(definition)) {
      extensions = definition;
    }

    if (isObject(extensions)) {
      for (var ext in extensions) {
        if (hasOwnProperty.call(extensions, ext)) {
          proto[ext] = extensions[ext];
        }
      }
    }

    return Noop;
  }

  Class.create = function create(klass /*, args... */) {
    var args = slice.call(arguments, 1)
      , obj = new klass
    ;

    if (isFunction(obj.init)) obj.init.apply(obj, args);

    return obj;
  };

  return Class;
})([].slice, 'prototype', ({}).hasOwnProperty);

var create = Class.create;
