// Spawn-in-Circle component originally by Michael McAnally
// Sourced from https://michael-mcanally.medium.com/multi-user-vr-office-space-using-a-frame-and-naf-cab1409800ce
// an extension for Networked A-Frame solution

AFRAME.registerComponent('spawn-in-circle', {
  schema: {
    radius: {type: 'number', default: 1},
    model: {type: 'string', default: 'player'}
  },

  init: function() {
    var el = this.el;
    var center = el.getAttribute('position');

    var angleRad = this.getRandomAngleInRadians();
    var circlePoint = this.randomPointOnCircle(this.data.radius, angleRad);
    var worldPoint = {x: circlePoint.x + center.x, y: center.y, z: circlePoint.y + center.z};
    el.setAttribute('position', worldPoint);
    // console.log('world point', worldPoint);

    var angleDeg = angleRad * 180 / Math.PI;
    var angleToCenter = angleDeg + 180;
    var angleRad = angleToCenter * Math.PI /180;
    
    
    // Affect Rotation
    // Doesn't seem to work as intended at present; can't affect camera rotation
    /*
    var model = document.getElementById(this.data.model)
    console.log('model obj', model);
    var yOffset = model.getAttribute('rotation').y
    console.log('model y angle offset', yOffset);
    yOffset = 0;
    //cam.setAttribute('rotation', {x: 0, y: angleDeg + yOffset, z: 0});
    //model.object3D.rotation.set(0, angleToCenter, 0);
    this.el.setAttribute('rotation', {
        x: this.el.object3D.rotation.x ,
        y: this.el.object3D.rotation.y + angleToCenter,
        z: this.el.object3D.rotation.z });
    
    
    console.log('angle deg', angleDeg);
    console.log('model obj', model);
    */
  },

  getRandomAngleInRadians: function() {
    return Math.random()*Math.PI*2;
  },

  randomPointOnCircle: function (radius, angleRad) {
    var x = Math.cos(angleRad)*radius;
    var y = Math.sin(angleRad)*radius;
    return {x: x, y: y};
  }
});