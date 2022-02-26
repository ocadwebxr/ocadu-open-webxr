/* Reference file for describing galleries in this project 


Loaded from each HTML document that depends on this particular sitemap.

If you want to make your own sitemap registry,
Make a copy of this and change the domain for the sitemap.js file in each HTML document associated with your sitemap.

For galleries to link back to your gallery hub and collect information from this document, make sure that they reference this particular JS file in their respective <gallery>.html pages.
*/

const hubURL = "/index.html";
//const hubURL = "/index_canvas.html";  // For using the planetary gallery homepage

/* Array of arrays containing gallery page information
  1) URL of Gallery
  2) Artist Name 
  3) Gallery / Work Name
  4) 5 Letter Label (unique to each HTML gallery page; check the header of your gallery)
  5) Color Preference ("" = random or default)

*/
const galleries = [
  
  ["/gallery_template.html",
  "TM",
  "Gallery Template",
  "YELLO",
  "#f5d442"],
  
  // Replace these with gallery pages of your choosing
  ["/gallery_template.html",
  "TM",
  "Gallery Template",
  "YELLO",
  ""],
  
  ["/gallery_template.html",
  "TM",
  "Gallery Template",
  "YELLO",
  ""],
];