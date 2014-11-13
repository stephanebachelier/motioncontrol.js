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


## License

Copyright (c) 2014 Stéphane Bachelier - MIT
