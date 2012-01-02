// from jayferd's limbo.js
var Class = (function(slice, prototype, hasOwnProperty, undefined) {
  function isObject(o) { return o && typeof o === 'object'; }
  function isFunction(f) { return f && typeof f === 'function'; }

  function Class(_superclass, definition) {
    function C(args) {
      if (!(this instanceof C)) return new C(arguments);

      if (isFunction(this.init)) this.init.apply(this, args);
    }

    if (definition === undefined) {
      definition = _superclass;
      _superclass = Object;
    }
    else if (isObject(_superclass[prototype])) {
      C[prototype] = new _superclass;
    }

    var proto = C[prototype]
      , _super = _superclass[prototype]
      , extensions = {}
    ;

    proto.constructor = C;

    if (isFunction(definition)) {
      extensions = definition.call(C, proto, _super, C, _superclass);
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

    return C;
  }

  return Class;
})([].slice, 'prototype', ({}).hasOwnProperty);

