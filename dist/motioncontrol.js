(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function () {
      return (root.returnExportsGlobal = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['motioncontrol'] = factory();
  }
}(this, function () {

  /*! motioncontrol.js - v0.1.3
   *  Release on: 2014-12-28
   *  Copyright (c) 2014 Stéphane Bachelier
   *  Licensed MIT */
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

        if (!resolver) {
          // we can safely return as the resolver is only set to null
          // in the event listener. It should only occur when the timeout
          // fired while the transitionend has already fired, or it the user
          // has set the timeout to a value lower than the animation time.
          return;
        }

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

      // add motion end control detector function
      if (event) {
        // add listeners
        el.addEventListener(event, motionComplete, false);
      }
      else {
        // add a timeout in case where the transitionend event would not be fired
        // which basically make this library :
        // * fake non CSS3 browsers or
        // * fake a transition end if the property is removed
        setTimeout(motionComplete, timeout);
      }

      if (trigger) {
        trigger();
      }

      return motion;
    };
  })();


  return motioncontrol;


}));
