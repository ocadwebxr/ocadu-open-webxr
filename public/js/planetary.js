/* PLANETARY - A Gallery Hub for OCAD U WebXR

Design by Ernesto Ramirez, Developed with P5.js by Tyson Moll
December 2021

DEPENDENT ON gallerymap.js
*/

function preload() {
  
  // Load planet image options
  //sphere1 = loadImage('https://cdn.glitch.me/06e25459-7547-47e5-9d1d-9ea50f5cb1df%2Fsphere_0001_Layer-6.png?v=1638905525089');
  sphere2 = loadImage('https://cdn.glitch.me/06e25459-7547-47e5-9d1d-9ea50f5cb1df%2Fsphere_0006_Layer-2.png?v=1638905525090');
  //sphere3 = loadImage('https://cdn.glitch.me/06e25459-7547-47e5-9d1d-9ea50f5cb1df%2Fsphere_0003_Layer-5.png?v=1638905525090');
  //sphere4 = loadImage('https://cdn.glitch.me/06e25459-7547-47e5-9d1d-9ea50f5cb1df%2Fsphere_0007_Layer-1.png?v=1638905525090');
  //sphere5 = loadImage('https://cdn.glitch.me/06e25459-7547-47e5-9d1d-9ea50f5cb1df%2Fsphere_0000_Layer-7.png?v=1638905525090');
  //sphere6 = loadImage('https://cdn.glitch.me/06e25459-7547-47e5-9d1d-9ea50f5cb1df%2Fsphere_0002_Sphere.png?v=1638905525090');
  //sphere7 = loadImage('https://cdn.glitch.me/06e25459-7547-47e5-9d1d-9ea50f5cb1df%2Fsphere_0005_Layer-3.png?v=16389055250890');
  //sphere8 = loadImage('https://cdn.glitch.me/06e25459-7547-47e5-9d1d-9ea50f5cb1df%2Fsphere_0004_Layer-4.png?v=1638905525090');
}

function setup() {
  
  // Prepare Canvas and canvas-related variables
  cnv = createCanvas(windowWidth, windowHeight); 
  resetWindowValues();
  
  // Sun and Planet Images 
  sunSphere = sphere2;
  planetSphere = sphere2;
  
  // Setup Planets
  
  totalCircles = galleries.length; // Number of Planets
  pSize = 80; // Size of Planet
  circles = [];
  for (i=0; i< totalCircles; i++) {
    
    let c;
    if (galleries[i][4] == "") {
      c = color(random(255), random(255), random(255), 255);  
    } else {
      c = color(galleries[i][4]);
    }
    
    circles.push([0,0, c]);
  }
  
  // Ambient wiggling parameters
  floatX = 14;
  floatY = 14;
  wiggleAmount = 0.2;

  // Mouse in planet range
  mousePlanet = -1;  // Set to index of planet selected
}

function draw() {
  background(0);
  noStroke();
  mouseHoverCheck();  // Check if in hyperlink region

  // Sun (currently hidden)
  tint(255);
  //image(sunSphere, cx - pSize/2, cy - pSize/2, pSize, pSize);

  // Planets
  for (i=0; i<totalCircles; i++) {
    
    // Draw Planet around sun
    c = circles[i][2];
    fill(c);
    p = planetPosition(i);
    tint(c)
    
    // Inflate size on hover
    if (mousePlanet == i) {
      dSize = pSize * 1.2;
    } else {
      dSize = pSize;
    }
    
    // Draw planet image
    image(planetSphere, p[0] - dSize/2, p[1] - dSize/2, dSize, dSize);
    
    // Wiggle
    wx = (random() * 2 - 1) * wiggleAmount;
    wy = (random() * 2 - 1) * wiggleAmount;
    circles[i][0] += wx;
    circles[i][1] += wy;
    circles[i] = [clamp(circles[i][0], -floatX, floatX), 
                  clamp(circles[i][1], -floatY, floatY),
                 circles[i][2]];
    
  }
  
  // Text (drawn overtop of planets)
  for (i=0; i<totalCircles; i++) {
    
    p = planetPosition(i);
    // Floating Text
    textSize(16);
    fill(255)
    .strokeWeight(0);
    textFont('Helvetica');
    
    // BL Side
    
    /*
    textAlign('left');
    text(galleries[i][1], p[0] + pSize / 2 + 10, p[1] + pSize/2 -5);
    text(galleries[i][2], p[0] + pSize / 2 + 10, p[1] + pSize/5);
    */
    
    // Bottom Centered
    textAlign('center');
    text(galleries[i][1], p[0], p[1] + pSize);
    text(galleries[i][2], p[0], p[1] + pSize - pSize/4);
  }
}

// Changes the mouse to a pointer when in a clickable region
function mouseHoverCheck() {
  
  mo = false;
  
  // For each planet
  for (i=0; i<totalCircles; i++) {
    
    // Check if mouse is within planet region
    p = planetPosition(i);
    if (pointWithin(mouseX, p[0] - pSize/2, p[0] + pSize/2)
       && pointWithin(mouseY, p[1] - pSize/2, p[1] + pSize/2)) {

      cursor('pointer');
      mo = true;
      mousePlanet = i;
    }    
    
  }
  
  if (!mo) {
    cursor('default');
    mousePlanet = -1;
  }
}

function mouseReleased() {
  
  // For each planet
  for (i=0; i<totalCircles; i++) {
    
    // Check if mouse is within planet region
    p = planetPosition(i);
    if (pointWithin(mouseX, p[0] - pSize/2, p[0] + pSize/2)
       && pointWithin(mouseY, p[1] - pSize/2, p[1] + pSize/2)) {
      
      // Open the link associated with the planet
      //window.open(galleries[i][0], "_self").focus(); // Open here
      cursor('pointer');
      window.open(galleries[i][0], "_blank").focus();  // Open in new tab
      console.log("in region");
    }    
    
  }
  
}
  
function planetPosition(index) {
    angle = (2*PI / totalCircles) * index;  // Angle around orbit
    angle -= millis() / 30000;  // Rotate over time
    px = cx + sin(angle) * (spaceX + circles[index][0]);
    py = cy - cos(angle) * (spaceY + circles[index][1]);
  return [px, py];
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); 
  resetWindowValues();
}

function resetWindowValues() {
  cx = windowWidth/2;
  cy = windowHeight/2;
  spaceX = windowWidth/3;
  spaceY = windowHeight/3;
}

/* Utilities */

function clamp(value, min, max) {
  var p;
  p = Math.max(value, min);
  p = Math.min(value, max);
  return p;
}

function pointWithin(value, left, right) {
  return value >= left && value <= right;
}