'use strict';

/* From Modernizr */
// animation events
var animationEvents = {
  animation: 'animationend',
  OAnimation: 'oAnimationEnd',
  MozAnimation: 'animationend',
  WebkitAnimation: 'webkitAnimationEnd',
  MSAnimation: 'MSAnimationEnd'
};

// transition events
var transitionEvents = {
  transition: 'transitionend',
  OTransition: 'oTransitionEnd',
  MozTransition: 'transitionend',
  WebkitTransition: 'webkitTransitionEnd'
};

var findEvent = function (eventMap) {
  var property;
  var el = document.createElement('fakeelement');

  for (property in eventMap) {
    if (undefined !== el.style[property]) {
      return eventMap[property];
    }
  }
};

var isFunction = function (fn) {
  return fn && ('function' === typeof fn);
};

var motioncontrol = (function () {
  var addEventsListener = function (el, callback, events) {
    for (var event in events) {
      el.addEventListener(event, callback, false);
    }
  };

  var removeEventsListener = function (el, callback, events) {
    for (var event in events) {
      el.removeEventListener(event, callback, false);
    }
  };

  return function (el, options) {
    var resolver = {};
    var opts = options || {};
    var trigger = opts.trigger && isFunction (opts.trigger) ? opts.trigger :  null;
    var timeout = opts.timeout || 1000;

    var events = [findEvent(transitionEvents), findEvent(animationEvents)];

    var motionComplete = function () {
      if (events) {
        removeEventsListener(el, motionComplete, events);
      }

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
    if (events) {
      // add listeners
      addEventsListener(el, motionComplete, events);
    }

    // add a timeout in case where the transitionend event would not be fired
    // which basically make this library :
    // * fake non CSS3 browsers or
    // * fake a transition end if the property is removed
    setTimeout(motionComplete, timeout);

    if (trigger) {
      // enable abortion if trigger return false
      // in other word returning false means that animation will not be played. It enable a conditional launch
      // of the animation based on whatever use case criteria
      if (false === trigger()) {
        motionComplete();
      }
    }

    return motion;
  };
})();
