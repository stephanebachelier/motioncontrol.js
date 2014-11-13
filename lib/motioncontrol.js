(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return factory();
    });
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    root.motioncontrol = factory();
  }

}(this, function () {
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
  
  var motioncontrol = function (el, options) {
    var resolver = {};
    var opts = options || {};
    var trigger = opts.trigger && _.isFunction (opts.trigger) ? opts.trigger :  null;

    var event = transitionEvent();

    var motionComplete = function () {
      el.removeEventListener(event, motionComplete, false);

      // resolve promise
      resolver.resolve();

      // clean references
      resolver = null;
    };

    var motion = new Promise(function (resolve, reject) {
      resolver = {
        resolve: resolve,
        reject: reject
      };

      // add listeners
      el.addEventListener(event, motionComplete, false);

      if (trigger) {
        trigger();
      }
    });

    return motion;
  };

  return motioncontrol;
}));
