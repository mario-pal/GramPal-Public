const router = require("express").Router(),
  usersController = require("../controllers/usersController"),
  imagesController = require("../controllers/imagesController");
const fs = require("fs");

import React from "react";
import ReactDOMServer from "react-dom/server";
import SignUp from "../src/users/SignUp";
import SignIn from "../src/users/SignIn";
import Home from "../src/users/Home";
import Edit from "../src/users/Edit";
import { nextTick } from "process";

const index = fs.readFileSync(__dirname + "/../public/users/new.html", "utf8");

router.get("/new", (req, res) => {
  const html = ReactDOMServer.renderToString(<SignUp />);
  const finalHtml = index.replace("<!-- ::SIGN UP:: -->", html);
  res.send(finalHtml);
});

router.post(
  "/create",
  usersController.validate, //handle requests before they reach the create action
  usersController.create,
  //(error) => console.log(error),
  //usersController.redirectView
  usersController.authenticate
);

const loginPage = fs.readFileSync(
  __dirname + "/../public/users/login.html",
  "utf8"
);

router.get("/login", (req, res) => {
  const html = ReactDOMServer.renderToString(<SignIn />);
  const finalHtml = loginPage.replace("<!-- ::LOGIN:: -->", html);
  res.send(finalHtml);
}); //route to view login page

router.post("/login", usersController.authenticate);

//router.post("/login", usersController.authenticate);
router.get("/logout", usersController.logout, usersController.redirectView);

router.get(
  "/cloudinarySync",
  usersController.checkLogInStatus,
  usersController.redirectView
);
router.post(
  "/cloudinarySync",
  usersController.checkLogInStatus,
  usersController.redirectView,
  usersController.pairImageWithUser,
  usersController.redirectView
);

router.get(
  "/cloudinarySyncProfileImage",
  usersController.checkLogInStatus,
  usersController.redirectView
);

router.post(
  "/cloudinarySyncProfileImage",
  usersController.checkLogInStatus,
  usersController.redirectView,
  usersController.updateUserProfilePicture,
  usersController.redirectView
);

const userAccountEdit = fs.readFileSync(
  __dirname + "/../public/users/edit.html",
  "utf8"
);

router.delete(
  "/account/delete",

  usersController.deleteAccount,
  usersController.redirectView
);

router.get(
  "/account/edit",
  usersController.checkLogInStatus,
  usersController.redirectView,
  (req, res) => {
    //PERHAPS THERES NO NEED FOR usersControllers.show since res.currentUser already knows the user id
    const html = ReactDOMServer.renderToString(<Edit user={res.locals} />); //make sure to pass in arguments to UserHome
    const finalHtml = userAccountEdit.replace("<!-- ::EDIT:: -->", html);
    res.send(finalHtml);
  }
);

router.put(
  "/account/update/user",
  usersController.validateEdit,
  usersController.redirectView,
  usersController.update,
  usersController.redirectView
);
router.put(
  "/account/update/user/password",
  usersController.validatePasswordEdit,
  usersController.redirectView,
  usersController.updatePassword,
  usersController.redirectView
);

const userHome = fs.readFileSync(
  __dirname + "/../public/users/home.html",
  "utf8"
);

router.get(
  "/home",
  usersController.checkLogInStatus,
  usersController.redirectView,
  //usersController.getAllUserImages,
  (req, res, next) => {
    res.locals.redirect = `/users/${req.user.userName}`;
    console.log(res.locals.redirect);
    next();
    /*let props = {
      user: res.locals,
      allImages: res.locals.allImages,
    };

    const html = ReactDOMServer.renderToString(<Home {...props} />); //make sure to pass in arguments to UserHome
    const finalHtml = userHome.replace("<!-- ::USERHOME:: -->", html);
    res.send(finalHtml);*/
  },
  usersController.redirectView
);

router.get(
  "/:username",
  usersController.getAllUserImages,
  usersController.redirectView,
  (req, res) => {
    let props = {
      user: res.locals,
      allImages: res.locals.allImages,
      showDeleteButton:
        req.isAuthenticated() && req.params.username == req.user.userName
          ? true
          : false,
      route: `/users/${req.params.username}`,
    };

    const html = ReactDOMServer.renderToString(<Home {...props} />); //make sure to pass in arguments to UserHome
    const finalHtml = userHome.replace("<!-- ::USERHOME:: -->", html);
    res.send(finalHtml);
  }
);
module.exports = router;
