/* Content for populating the sitemap and neighbour navigation using gallerymap.js 
TM - December 2021

Dependencies:
1. Must be called by a HTML document with "myPageID" defined as one of the 
  5-letter codes in gallerymap.js (located near the title tag in the gallery template)
2. gallerymap.js must be included in the HTML document first
*/

/* Prepares a hyperlink list of all galleries in the gallerymap.js
     and adds it to the item with id 'tourListing'*/
function populateTourListing() {
  
  // Prepare a container
  const newDiv = document.createElement("div");
  
  // For each gallery item
  for (let i=0; i < galleries.length; i++) {
    var anchor = document.createElement("a");  // Prepare anchor
    anchor.setAttribute('href', galleries[i][0]);  // Insert hyperlink
    
    // Describe the link
    var textName = document.createTextNode(galleries[i][2] + " - " + galleries[i][1]);
    anchor.appendChild(textName); // name -> anchor
    newDiv.appendChild(anchor);  // anchor -> listing div
    newDiv.appendChild(document.createElement("br"));  // linebreak
  }
  
  // Find the tour listing target in the document
  const listingDiv = document.getElementById("tourListing");
  listingDiv.appendChild(newDiv);  // Add our list to the tour listing
}

/* Change the home button to match the hubURL*/
function swapHome() {
  var hButton = document.getElementById("homeButton");
  hButton.setAttribute("href", hubURL);
}

/* Left and right sequential navigation */
function neighbourNavigation() {
  
  // Find the current gallery item
    // For each gallery item
  for (let i=0; i < galleries.length; i++) {
    
    // Check if the item matches this page's ID
    // NOTE: myPageID must be defined in the calling HTML document
    if (galleries[i][3] == myPageID) {
    
      // Get previous and next index
      var iPrev = i - 1;
      if (iPrev < 0) {iPrev = galleries.length - 1;}
      var iNext = i + 1;
      if (iNext >= galleries.length) {iNext = 0;}
      
      // Prepare containers
      const navRow = document.createElement("div");
      
      navRow.setAttribute("id", "neighbourRow");
      const leftChev = document.createElement("div");
      leftChev.setAttribute("class", "col-1");
      leftChev.setAttribute("id", "neighLeftChev");
      const leftDiv = document.createElement("div");
      leftDiv.setAttribute("class", "col");
      leftDiv.setAttribute("id", "neighLeftDiv");
      const rightDiv = document.createElement("div");
      rightDiv.setAttribute("class", "col");
      rightDiv.setAttribute("id", "neighRightDiv");
      const rightChev = document.createElement("div");
      rightChev.setAttribute("class", "col-1");
      rightChev.setAttribute("id", "neighRightChev");
      navRow.appendChild(leftChev);
      navRow.appendChild(leftDiv);
      navRow.appendChild(rightDiv);
      navRow.appendChild(rightChev);
      navRow.setAttribute("class", "row align-items-center");
      
      // Left
      var icon = document.createElement("i");  // Left Chevron
      icon.setAttribute('class', 'fas fa-angle-left fa-2x');
      leftChev.appendChild(icon);
      
      var anchor = document.createElement("a");  // Prepare anchor
      anchor.setAttribute('href', galleries[iPrev][0]);  // Insert hyperlink
      
      textName = document.createTextNode(galleries[iPrev][2])  // Work Label
      anchor.appendChild(textName); // name -> anchor
      anchor.setAttribute("class", "workLabel");
      
      anchor.appendChild(document.createElement("br"));  // linebreak
      
      textName = document.createTextNode("- " + galleries[iPrev][1]);  // Artist Name
      anchor.appendChild(textName); // name -> anchor
      
      leftDiv.appendChild(anchor);  // anchor -> left div
      
      // Right
      var icon = document.createElement("i");  // Right Chevron
      icon.setAttribute('class', 'fas fa-angle-right fa-2x');
      rightChev.appendChild(icon);
      
      anchor = document.createElement("a");  // Prepare anchor
      anchor.setAttribute('href', galleries[iNext][0]);  // Insert hyperlink
      
      textName = document.createTextNode(galleries[iNext][2])  // Work Label
      anchor.appendChild(textName); // name -> anchor
      anchor.setAttribute("class", "workLabel");
      
      anchor.appendChild(document.createElement("br"));  // linebreak
      
      textName = document.createTextNode(galleries[iNext][1] + " -");  // Artist Name
      anchor.appendChild(textName); // name -> anchor
      
      rightDiv.appendChild(anchor);  // anchor -> left div
      
      // Find the target container
      var neighbourContainer = document.getElementById("neighbours");
      neighbourContainer.appendChild(navRow);
      break;
    }
  }
  
  // Note: nothing will be prepared if the ID match is not found
}

// Fullscreen toggle function
var full = false;
function toggleFullscreen() {
  if (full) {
    closeFullscreen();
  } else {
    openFullscreen();
  }
  full = !full;
}

// see https://www.w3schools.com/howto/howto_js_fullscreen.asp
function openFullscreen() {
  var elem = document.documentElement;
  
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  var elem = document.documentElement;
  
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}