// using jsdom module
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var xml;
// Define the XML namespace for the KML library
const libraryNS = "http://www.opengis.net/kml/2.2";

// XML FILE FUNCTION
async function loadLibraries() {
  if (xml == undefined) {
    // fetch the url xml file torontopubliclibrary
    let response = await fetch(
      "http://www.torontopubliclibrary.ca/data/library-data.kml",
      {
        method: "get",
        headers: {
          "Content-Type": "application/xml",
        },
      }
    );
    //convert XML string to XML DOM document  OR text file --> xml file
    data = new JSDOM(await response.text(), { contentType: "application/xml" });
    //console.log(data);
    //set the xml to the XML DOM document which we can query using DOM methods
    xml = data.window.document;
  }
  return xml;
}

//return all the 'Placemark' from xml file
async function loadPlacemarks() {
  xml = await loadLibraries();
  return xml.querySelectorAll("Placemark");
}
// fetching Placemark by id
async function getLibraryById(id) {
  xml = await loadLibraries();
  let result = xml.getElementById(`${id}`);
  //console.log(result);
  return result;
}

module.exports = {
  loadLibraries,
  loadPlacemarks,
  getLibraryById,
};
