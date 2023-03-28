const express = require("express");
const path = require("path");
// using libraries.js
const libraries = require("./components/libraries");

const app = express();
const port = process.env.PORT || "8888";
// using view engine 'pug'
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// set up page routers
app.get("/", async (request, response) => {
  // using loadPlacemarks() function
  let libraryList = await libraries.loadPlacemarks();
  //response.render("index", { title: "Home", libraries: data });
  response.render("index", { title: "Home", libraries: libraryList });
});

// retrieve by libraryId
app.get("/library/:libraryId", async (request, response) => {
  let libraryData = await libraries.getLibraryById(request.params.libraryId);
  response.render("library", { title: "Library", library: libraryData });
});

//server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
