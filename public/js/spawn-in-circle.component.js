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