# motioncontrol.js

[![Build Status](https://secure.travis-ci.org/stephanebachelier/motioncontrol.js.png?branch=master)](http://travis-ci.org/stephanebachelier/motioncontrol.js)

An utility to know when your CSS transitions has ended, based on Promise with a fallback with timeout.

## Installation

```
$ npm install --save motioncontrol.js
```

```
$ bower install --save motioncontrol.js
```

## Usage

### CommonJS
```js
var motioncontrol = require('motioncontrol');
motioncontrol(el, options).then(function () {
  // do something
});
```

### AMD
```js
define(['motioncontrol', function (motioncontrol) {

  motioncontrol(el, options).then(function () {
    // do something
  });
});
```

## Options

### trigger

Type: `function`
Default: `undefined`

This function, if provided, will be called. This should be used if you need a callback to start the animation.

### timeout

Type: `integer`
Default: `1000`

It's the number of milliseconds before the timout will be fired. Internally it will call the `transitionend` event listener

## Documentation

The idea of this library is to have a promise that tells you when a CSS animation has ended. It uses the native promise or any implementation you provide which means that you should be able to use this microlib everywhere.

```js
var motioncontrol = require('motioncontrol');
var Promise = require('bluebird'); // or Q, when, RSVP, jarchibal polyfill ...

// add the promise constructor to the motioncontrol instance
motioncontrol.Promise = Promise;

motioncontrol(el, {/* options */});
```

### Timing issue

While this library support animation end with a fallback to timeout your code should not be in a forever waiting state. But on the other end, you should pay a little attention about timing issue. If your animation time is longer than the default timeout or any value you provide, the result won't be the one expected. The consequence might vary from undetected to bad user experience. What I mean is that if your promise resolution is used to destroy an animated view, and the timeout fired before the animation has been completed, the user will seen an interrupted animation. It should only be unpleasant. But it could also lead to runtime error depending on what you do in the promise resolution.

## License

Copyright (c) 2014 Stéphane Bachelier - MIT
