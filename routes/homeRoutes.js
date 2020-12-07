const router = require("express").Router(),
  fs = require("fs"),
  imagesController = require("../controllers/imagesController"),
  React = require("react");
import ReactDOMServer from "react-dom/server"; //MUST BE transpiled (I use Babel)
import App from "../src/App";
const index = fs.readFileSync(__dirname + "/../public/index.html", "utf8"); //__dirname referes to the directory of this file

//Home page
router.get("/", imagesController.index, (req, res) => {
  let props = {
    user: res.locals,
    allImages: res.locals.allImages,
    route: "/",
  };
  const html = ReactDOMServer.renderToString(<App {...props} />);
  const finalHtml = index.replace("<!-- ::INDEX:: -->", html);
  res.send(finalHtml);
});

module.exports = router;
