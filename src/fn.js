define(function() {
  var keys = function(o) {
    var keys = [],
        key;

    for (key in o) {
      if (o.hasOwnProperty(key)) {
        keys.push(key);
      }
    }

    return keys;
  };

  var isArray = function(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
  };

  var map = function(list, mapper, context) {
    var i,
        length,
        acc,
        ks,
        k;

    if (typeof mapper !== 'function') {
      return list;
    }

    context = context || list;

    if (isArray(list)) {
      length = list.length;
    } else {
      ks = keys(list);
      length = ks.length;
    }

    acc = [];
    for (i = 0; i < length; ++i) {
      k = ks ? ks[i] : i;
      acc.push(mapper.call(context, list[k], k));
    }

    return acc;
  };

  return {
    isArray: isArray,
    keys: keys,
    map: map
  };
});