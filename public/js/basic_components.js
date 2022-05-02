/* Basic component functions 
TM 2021

These are included to provide some basic animated transformations.
They can be combined and remixed for more complex functionality.

More components may be added in the future.

Sample usage:
<a-entity
  (other attributes)
  delayed-transform="timeStart:5; timeTransform:6"
  (other attributes?)
  >
</a-entitiy>
*/

/*  rotate-time
    Simple rotation over time in 3 axes
*/
AFRAME.registerComponent('rotate-time', {
  schema: {
    rotationSpeed: {type: 'vec3', default: {x:0, y:0.01, z:0}},
    sine: {type:'boolean', default: false} // WIP feature
  },

  tick: function(time, timeDelta) {
    // Rotate over time around y axis
    
    if (this.data.sine == false) {
      this.el.setAttribute('rotation', {
        x: this.el.object3D.rotation.x + this.data.rotationSpeed.x*time,
        y: this.el.object3D.rotation.y + this.data.rotationSpeed.y*time,
        z: this.el.object3D.rotation.z + this.data.rotationSpeed.z*time});
      }
    else {
      
    }
  }
});

/*  translate-time
    Simple movement over time in 3 axes
*/
AFRAME.registerComponent('transform-time', {
  schema: {
    positionSpeed: {type: 'vec3', default: {x:0.01, y:0, z:0}}
  },

  tick: function(time, timeDelta) {
    // Rotate over time around y axis
    
    this.el.setAttribute('position', {
      x: this.el.object3D.position.x + this.data.positionSpeed.x*timeDelta,
      y: this.el.object3D.position.y + this.data.positionSpeed.y*timeDelta,
      z: this.el.object3D.position.z + this.data.positionSpeed.z*timeDelta});
  }
});


/*  scale-time
    Simple scaling over time in 3 axes
*/
AFRAME.registerComponent('scale-time', {
  schema: {
    scaleSpeed: {type: 'vec3', default: {x:0, y:0, z:0.01}}
  },

  tick: function(time, timeDelta) {
    // Rotate over time around y axis
    
    this.el.setAttribute('scale', {
      x: this.el.object3D.scale.x + this.data.scaleSpeed.x*time,
      y: this.el.object3D.scale.y + this.data.scaleSpeed.y*time,
      z: this.el.object3D.scale.z + this.data.scaleSpeed.z*time});
  }
});

/* hotspot-hyperlink
    Opens a hyperlink when a particular id'd object enters a region relative to this entity's position
*/
AFRAME.registerComponent('hotspot-hyperlink', {
  schema: {
    url: {type: 'string', default: "/index.html"},  // Hyperlink to open
    detectionBox: {type: 'vec3', default: {x:1, y:1, z:1}},    // Region of detection relative to this entity
    target: {type: 'string', default: "_self"},  // Use "_blank" for a new window
    teleportee: {type: 'string', default: "player"} // Object to trigger hyperlink
  },
  
  init: function() {
    var teleportable = document.getElementById(this.data.teleportee);
    if (teleportable) {
      this.teleportable = teleportable.object3D;
    } else {
      console.log("The teleportable object was not found.")
      this.el.removeAttribute(this);
    }
    this.windowOpened = false;
  },
  
  tick: function(time, timeDelta) {
    // Open the url if the player is in the hotspot & popups are permitted
    if (!this.windowOpened && this.inDetectionBox() ) {
      var win = window.open(this.data.url, this.data.target);
      if (win != null) {win.focus();}
      this.windowOpened = true;  // Prevents infinite window opening; one-use
    }
  },
  
  inRange: function(l, r, x) {
    return (l <= x && r >= x);
  },
  
  inDetectionBox: function() {
    
    // Get world position
    var worldPos = new THREE.Vector3();
    worldPos.setFromMatrixPosition(this.el.object3D.matrixWorld);
    
    if (
        this.inRange(worldPos.x - this.data.detectionBox.x/2, 
                worldPos.x + this.data.detectionBox.x/2,
                this.teleportable.position.x
               ) &&
        this.inRange(worldPos.y - this.data.detectionBox.y/2, 
                worldPos.y + this.data.detectionBox.y/2,
                this.teleportable.position.y
               ) &&
        this.inRange(worldPos.z - this.data.detectionBox.z/2, 
                  worldPos.z + this.data.detectionBox.z/2,
                  this.teleportable.position.z
                 )
        ) {
      return true;
    }
    return false;
  },
});


/* hotspot-teleport
    Alters the player's position. Don't teleport to the location of the object using this.
*/
AFRAME.registerComponent('hotspot-teleport', {
  schema: {
    detectionBox: {type: 'vec3', default: {x:1, y:1, z:1}},    // Region of detection relative to this entity
    targetPos: {type: 'vec3', default: {x:0, y:0, z:0}},  // Use "_blank" for a new window
    teleportee: {type: 'string', default: "player"} // Object to teleport
  },
  
  init: function() {
    var teleportable = document.getElementById(this.data.teleportee);
    if (teleportable) {
      this.teleportable = teleportable.object3D;
    } else {
      console.log("The teleportable object was not found.")
      this.el.removeAttribute(this);
    }
  },
  
  tick: function(time, timeDelta) {
    // Open the url if the player is in the hotspot & popups are permitted
    
    // Move to position
    if (this.inDetectionBox() ) {
      this.teleportable.position.x = this.data.targetPos.x;
      this.teleportable.position.y = this.data.targetPos.y;
      this.teleportable.position.z = this.data.targetPos.z;
    }
  },
  
  inRange: function(l, r, x) {
    return (l <= x && r >= x);
  },
  
  inDetectionBox: function() {
    
    // Get world position
    var worldPos = new THREE.Vector3();
    worldPos.setFromMatrixPosition(this.el.object3D.matrixWorld);
    
    if (
        this.inRange(worldPos.x - this.data.detectionBox.x/2, 
                worldPos.x + this.data.detectionBox.x/2,
                this.teleportable.position.x
               ) &&
        this.inRange(worldPos.y - this.data.detectionBox.y/2, 
                worldPos.y + this.data.detectionBox.y/2,
                this.teleportable.position.y
               ) &&
        this.inRange(worldPos.z - this.data.detectionBox.z/2, 
                  worldPos.z + this.data.detectionBox.z/2,
                  this.teleportable.position.z
                 )
        ) {
      return true;
    }
    return false;
  },
});


/*  delayed-scale:
    Delays a scale command until a particular time,
      then performs the transformation over a number of seconds.
    
    This example scales the object uniformly by a factor defined in 'scaleTargetSize'
*/
AFRAME.registerComponent('delayed-scale', {
  schema: {
    timeStart: {type: 'number', default: 4},        // Time until transformations start
    timeTransform: {type: 'number', default: 3},    // Length of time to transform between states
    scaleTargetSize: {type: 'number', default: 3},  // Scaling factor Goal
    startVisible: {type: 'boolean', default: false} // Begin visible?
  },

  init: function() {
    this.sizeInitial = {x: this.el.object3D.scale.x, // Grab the original size
                       y: this.el.object3D.scale.y,
                       z: this.el.object3D.scale.z};    
    this.wakeTime = 0;  // When the function starts running
    this.visible = this.data.startVisible;  // Whether to start visible
  },

  tick: function(time, timeDelta) {
    // Loop waits until a specific time has passed (in seconds)

    if (this.wakeTime == 0) {this.wakeTime = time;} // Get initial time
    var timelineDelta = (time - this.wakeTime) / 1000;  // Determine time passed in seconds since initial
    
    // Whether time is in the transformation window
    if (timelineDelta >= this.data.timeStart && timelineDelta <= this.data.timeStart + this.data.timeTransform) {  
      
      this.visible = true;
      timelineDelta -= this.data.timeStart; // Time remaining after removing start time 
      this.el.object3D.scale.set(    // Lerp the scale of the object from initial to target
        this.lerp(this.sizeInitial.x, 
                  this.data.scaleTargetSize*this.sizeInitial.x, 
                  timelineDelta/this.data.timeTransform),  // x
        this.lerp(this.sizeInitial.y, 
                  this.data.scaleTargetSize*this.sizeInitial.y, 
                  timelineDelta/this.data.timeTransform),  // y
        this.lerp(this.sizeInitial.z, 
                  this.data.scaleTargetSize*this.sizeInitial.z, 
                  timelineDelta/this.data.timeTransform)   // z
      );
    }  
  },
  
  /* lerp: Lerp between values 
     get a value between minVal and maxVal
        
    Think of amount like the % of the distance from min to max,
      kind of like a slider.
  */
  lerp: function(minVal, maxVal, amount) {  
        amount = amount < 0 ? 0 : amount;  // Clamp 'amount' between 0 and 1.
        amount = amount > 1 ? 1 : amount;  
        return minVal + (maxVal - minVal) * amount;
    }
});

/* randomize-color
    Randomizes the color between min and max for r,g,b
*/
AFRAME.registerComponent('randomize-color', {
  schema: {
    min: {type: 'vec3', default: {x: 0, y:0, z:0}},
    max: {type: 'vec3', default: {x: 255, y:255, z:255}}
  },
  
  init: function() {
    var col = this.randomColor();
    this.el.setAttribute('material', 'color', col);
  },
    
  randomColor: function() {
    var o = Math.round;
    var r = o(Math.random()*(this.data.max.x-this.data.min.x) + this.data.min.x);
    var g = o(Math.random()*(this.data.max.y-this.data.min.y) + this.data.min.y);
    var b = o(Math.random()*(this.data.max.z-this.data.min.z) + this.data.min.z);
    return "#" + (r).toString(16) + (g).toString(16) + (b).toString(16);
  }
});

/* media-control
  Pause / Play Audio or Video and set their start and current time
*/
AFRAME.registerComponent('media-control',{
  schema: {
    id_media: {type: 'string'},
    isPlaying: {type: 'boolean', default: true},
    startTime: {type: 'float', default: 0},
  },
  
  init: function() {
    // Get video reference, ideally as part of this element
    this.media_el = document.getElementById(this.data.id_media);
    
    // Sync play/pause
    if (this.data.isPlaying) {
      this.media_el.play();
    } else {
      this.media_el.pause();
    }
    
    // Force load to ensure metadata is ready
    this.media_el.load();
    // Set current video time
    this.changeTime(this.data.startTime);
  },
  
  // Function for changing the video time
  changeTime: function(newTime) {
    this.media_el.currentTime = newTime;
  },  
  
  // Restart video
  reset: function() {
    this.media_el.pause();
    this.media_el.play();
  }
});