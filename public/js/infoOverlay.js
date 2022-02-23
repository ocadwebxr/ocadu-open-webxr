/* 
Simple Show / Hide Display functions 
TM 2021
*/
/* add attribute ' onclick="closeElement('elementID')" ' to use these with buttons */

let panelClass = 'overlayPanel'; // The class for all panels

// Toggle Open Window
function toggleElement(elementID) {
  var element = document.getElementById(elementID);
  if (element.style.display == "block") {
    element.style.display = "none";
  } else {
    closeClass(panelClass);
    element.style.display = "block";
  }
};

// Show Window Function
function openElement(elementID) {
  var element = document.getElementById(elementID);
  closeClass(panelClass);
  element.style.display = "block";
};

// Hide Window Function
function closeElement(elementID) {
  var element = document.getElementById(elementID);
  element.style.display = "none";
};

// Close all items with the same className
function closeClass(className) {
  var classItems = document.getElementsByClassName(className);
  for (var i =0; i< classItems.length; i++) {
    classItems[i].style.display = "none";
  }
}