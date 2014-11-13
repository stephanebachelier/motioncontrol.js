'use strict';

/* From Modernizr */
var transitionEvent = function () {
  var t;
  var el = document.createElement('fakeelement');
  var transitions = {
    transition:'transitionend',
    OTransition:'oTransitionEnd',
    MozTransition:'transitionend',
    WebkitTransition:'webkitTransitionEnd'
  };

  for (t in transitions) {
    if (undefined !== el.style[t]) {
      return transitions[t];
    }
  }
};

var isFunction = function (fn) {
  return fn && ('function' === typeof fn);
};

var motioncontrol = (function () {
  return function (el, options) {
    var resolver = {};
    var opts = options || {};
    var trigger = opts.trigger && isFunction (opts.trigger) ? opts.trigger :  null;
    var timeout = opts.timeout || 1000;

    var event = transitionEvent();

    var motionComplete = function () {
      el.removeEventListener(event, motionComplete, false);

      // resolve promise
      resolver.resolve();

      // clean references
      resolver = null;
    };

    // search for an existing promise
    var PromiseFn = motioncontrol.Promise || (null !== typeof Promise && Promise);

    var motion = PromiseFn && new PromiseFn(function (resolve, reject) {
      resolver = {
        resolve: resolve,
        reject: reject
      };
    });

    // add listeners
    el.addEventListener(event, motionComplete, false);

    if (trigger) {
      trigger();
    }

    // add a timeout in case where the transitionend event would not be fired
    // which basically make this library :
    // * fake non CSS3 browsers or
    // * fake a transition end if the property is removed
    setTimeout(motionComplete, timeout);

    return motion;
  };
})();
