/*
Originally written by A-Frame Community, modified by Tyson Moll

This is a modified version of the built-in wasd-controls.js file in A-Frame.
It currently has not been accepted to the active A-Frame build.
https://github.com/vulture-boy/aframe/blob/master/src/components/wasd-controls.js

The purpose is to to allow users to dynamically change their axes during runtime.

I made this to add the 'sink-float' component which is included at the bottom of this document,
so that users can change between moving forward and moving vertically.
*/

var KEYCODE_TO_CODE = {
  // Tiny KeyboardEvent.code polyfill.
  KEYCODE_TO_CODE: {
    '38': 'ArrowUp',
    '37': 'ArrowLeft',
    '40': 'ArrowDown',
    '39': 'ArrowRight',
    '87': 'KeyW',
    '65': 'KeyA',
    '83': 'KeyS',
    '68': 'KeyD'
  }
};

function bind (fn, ctx/* , arg1, arg2 */) {
  return (function (prependedArgs) {
    return function bound () {
      // Concat the bound function arguments with those passed to original bind
      var args = prependedArgs.concat(Array.prototype.slice.call(arguments, 0));
      return fn.apply(ctx, args);
    };
  })(Array.prototype.slice.call(arguments, 2));
};

function shouldCaptureKeyEvent (event) {
  if (event.metaKey) { return false; }
  return document.activeElement === document.body;
};

var CLAMP_VELOCITY = 0.00001;
var MAX_DELTA = 0.2;
var KEYS = [
  'KeyW', 'KeyA', 'KeyS', 'KeyD',
  'ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown'
];

/**
 * WASD component to control entities using WASD keys.
 */
AFRAME.registerComponent('wasd-controls-alt', {
  schema: {
    acceleration: {default: 65},
    adAxis: {default: 'x', oneOf: ['x', 'y', 'z']},
    adEnabled: {default: true},
    adInverted: {default: false},
    enabled: {default: true},
    fly: {default: false},
    wsAxis: {default: 'z', oneOf: ['x', 'y', 'z']},
    wsEnabled: {default: true},
    wsInverted: {default: false}
  },

  init: function () {
    // To keep track of the pressed keys.
    this.keys = {};
    this.easing = 1.1;
    
    // NEW
    this.lastWSAxis = this.data.wsAxis;
    this.lastADAxis = this.data.adAxis;

    this.velocity = new THREE.Vector3();

    // Bind methods and add event listeners.
    this.onBlur = bind(this.onBlur, this);
    this.onContextMenu = bind(this.onContextMenu, this);
    this.onFocus = bind(this.onFocus, this);
    this.onKeyDown = bind(this.onKeyDown, this);
    this.onKeyUp = bind(this.onKeyUp, this);
    this.onVisibilityChange = bind(this.onVisibilityChange, this);
    this.attachVisibilityEventListeners();
  },

  tick: function (time, delta) {
    var data = this.data;
    var el = this.el;
    var velocity = this.velocity;

    if (!velocity[data.adAxis] && !velocity[data.wsAxis] &&
        isEmptyObject(this.keys)) { return; }

    // Update velocity.
    delta = delta / 1000;
    this.updateVelocity(delta);

    if (!velocity[data.adAxis] && !velocity[data.wsAxis]) { return; }

    // Get movement vector and translate position.
    el.object3D.position.add(this.getMovementVector(delta));
  },

  remove: function () {
    this.removeKeyEventListeners();
    this.removeVisibilityEventListeners();
  },

  play: function () {
    this.attachKeyEventListeners();
  },

  pause: function () {
    this.keys = {};
    this.removeKeyEventListeners();
  },

  updateVelocity: function (delta) {
    var acceleration;
    var adAxis;
    var adSign;
    var data = this.data;
    var keys = this.keys;
    var velocity = this.velocity;
    var wsAxis;
    var wsSign;

    adAxis = data.adAxis;
    wsAxis = data.wsAxis;
	
	// NEW: If a control axis was changed, reset its old velocity
	if (adAxis != this.lastADAxis) {
		velocity[this.lastADAxis] = 0;		
		this.lastADAxis = adAxis;
	}
	if (wsAxis != this.lastWSAxis) {
		velocity[this.lastWSAxis] = 0;
		this.lastWSAxis = wsAxis;
	}

    // If FPS too low, reset velocity.
    if (delta > MAX_DELTA) {
      velocity[adAxis] = 0;
      velocity[wsAxis] = 0;
      return;
    }
	
    // https://gamedev.stackexchange.com/questions/151383/frame-rate-independant-movement-with-acceleration
    var scaledEasing = Math.pow(1 / this.easing, delta * 60);
    // Velocity Easing.
    if (velocity[adAxis] !== 0) {
      velocity[adAxis] = velocity[adAxis] * scaledEasing;
    }
    if (velocity[wsAxis] !== 0) {
      velocity[wsAxis] = velocity[wsAxis] * scaledEasing;
    }

    // Clamp velocity easing.
    if (Math.abs(velocity[adAxis]) < CLAMP_VELOCITY) { velocity[adAxis] = 0; }
    if (Math.abs(velocity[wsAxis]) < CLAMP_VELOCITY) { velocity[wsAxis] = 0; }

    if (!data.enabled) { return; }

    // Update velocity using keys pressed.
    acceleration = data.acceleration;
    if (data.adEnabled) {
      adSign = data.adInverted ? -1 : 1;
      if (keys.KeyA || keys.ArrowLeft) { velocity[adAxis] -= adSign * acceleration * delta; }
      if (keys.KeyD || keys.ArrowRight) { velocity[adAxis] += adSign * acceleration * delta; }
    }
    if (data.wsEnabled) {
      wsSign = data.wsInverted ? -1 : 1;
      if (keys.KeyW || keys.ArrowUp) { velocity[wsAxis] -= wsSign * acceleration * delta; }
      if (keys.KeyS || keys.ArrowDown) { velocity[wsAxis] += wsSign * acceleration * delta; }
    }
  },

  getMovementVector: (function () {
    var directionVector = new THREE.Vector3(0, 0, 0);
    var rotationEuler = new THREE.Euler(0, 0, 0, 'YXZ');

    return function (delta) {
      var rotation = this.el.getAttribute('rotation');
      var velocity = this.velocity;
      var xRotation;

      directionVector.copy(velocity);
      directionVector.multiplyScalar(delta);

      // Absolute.
      if (!rotation) { return directionVector; }

      xRotation = this.data.fly ? rotation.x : 0;

      // Transform direction relative to heading.
      rotationEuler.set(THREE.Math.degToRad(xRotation), THREE.Math.degToRad(rotation.y), 0);
      directionVector.applyEuler(rotationEuler);
      return directionVector;
    };
  })(),

  attachVisibilityEventListeners: function () {
    window.oncontextmenu = this.onContextMenu;
    window.addEventListener('blur', this.onBlur);
    window.addEventListener('focus', this.onFocus);
    document.addEventListener('visibilitychange', this.onVisibilityChange);
  },

  removeVisibilityEventListeners: function () {
    window.removeEventListener('blur', this.onBlur);
    window.removeEventListener('focus', this.onFocus);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
  },

  attachKeyEventListeners: function () {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  },

  removeKeyEventListeners: function () {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  },

  onContextMenu: function () {
    var keys = Object.keys(this.keys);
    for (var i = 0; i < keys.length; i++) {
      delete this.keys[keys[i]];
    }
  },

  onBlur: function () {
    this.pause();
  },

  onFocus: function () {
    this.play();
  },

  onVisibilityChange: function () {
    if (document.hidden) {
      this.onBlur();
    } else {
      this.onFocus();
    }
  },

  onKeyDown: function (event) {
    var code;
    if (!shouldCaptureKeyEvent(event)) { return; }
    code = event.code || KEYCODE_TO_CODE[event.keyCode];
    if (KEYS.indexOf(code) !== -1) { this.keys[code] = true; }
  },

  onKeyUp: function (event) {
    var code;
    code = event.code || KEYCODE_TO_CODE[event.keyCode];
    delete this.keys[code];
  }
});

function isEmptyObject (keys) {
  var key;
  for (key in keys) { return false; }
  return true;
}

// Since we're overriding the basic wasd-controls, this helps identify/replace the target component
var wasdComponent = 'wasd-controls-alt';

/* sink-float
Change axis dynamically to allow for movement in vertical axis instead of forward axis
*/
AFRAME.registerComponent('sink-float',{
  schema: {
    inputKey: {type: 'string', default: " "},
  },

  init: function() {
    var el = this.el;
    document.addEventListener('keydown', (event) => {
      var name = event.key;
      var code = event.code;
      
      if (name === this.data.inputKey) {
        el.setAttribute(wasdComponent, {wsAxis: 'y', wsInverted: true})
      }
    }, false);
    
    document.addEventListener('keyup', (event) => {
      var name = event.key;
      var code = event.code;
      
      if (name === this.data.inputKey) {
        el.setAttribute(wasdComponent, {wsAxis: 'z', wsInverted: false})
      }
    }, false);
    
  }
});

/* speed-shift
Increase wasd-controls speed by multiplier
*/
AFRAME.registerComponent('speed-shift',{
  schema: {
    inputKey: {type: 'string', default: "Shift"},
    multiplier: {type: 'number', default: 2}
  },

  init: function() {
    var el = this.el;
    var baseAcceleration = el.getAttribute(wasdComponent).acceleration;
    
    document.addEventListener('keydown', (event) => {
      var name = event.key;
      var code = event.code;
      
      if (name === this.data.inputKey) {
        el.setAttribute(wasdComponent, {acceleration: baseAcceleration * this.data.multiplier})
      }
    }, false);
    
    document.addEventListener('keyup', (event) => {
      var name = event.key;
      var code = event.code;
      
      if (name === this.data.inputKey) {
        el.setAttribute(wasdComponent, {acceleration: baseAcceleration})
      }
    }, false);
    
  }
});
