const User = require("../models/User.js"),
  Image = require("../models/Image.js"),
  passport = require("passport");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
ObjectId = mongoose.Types.ObjectId;

const getUserParams = (body) => {
  //create a custom function to pull subscriber data from the request
  return {
    userName: body.userName,
    //email: body.email,
    //zipCode: parseInt(body.zipCode)
  };
};

module.exports = {
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) {
      res.redirect(redirectPath);
    } else next();
  },
  //validating user data entered in web page form
  validate: (req, res, next) => {
    const valid = (input) =>
      input.split(" ").every(function (str) {
        return str.match("[A-Za-z0-9]"); //isAlphaNumeric(str);
      });

    //validate
    req
      .check("userName", "Username is invalid")
      .notEmpty()
      .isLength({ min: 1, max: 20 }); //else //return true; //  }); //sanitize

    req.check("userName", "Username is invalid").custom((username) => {
      if (valid(username)) return true; //return false;
      /*throw new Error(
            "Characters are not alphanumeric or you have extra leading or trailing whitespace"
    );*/
    });
    /*req
      .sanitizeBody("email")
      .normalizeEmail({
        all_lowercase: true,
      })
      .trim(); //remove whitespace with the trim method
    //validate
    req.check("email", "Email is invalid").notEmpty().isEmail();*/

    //validate
    req
      .check("password", "Password cannot be empty")
      .notEmpty()
      .isLength({ min: 6, max: 20 })
      .isAlphanumeric();

    req
      .check("passwordConfirmation", "Password confirmation cannot be empty")
      .notEmpty()
      .isLength({ min: 6, max: 20 })
      .isAlphanumeric();

    req
      .check(
        "passwordConfirmation",
        "Password confirmation does not match password"
      )
      .custom((passwordValidation) => {
        if (passwordValidation === req.body.password) {
          //throw new Error("Password confirmation does not match password");
          //return false;
          return true;
        }

        // Indicates the success of this synchronous custom validator
        //return true;
      });
    //req.check("passwordConfirmation").withMessage("passwords dont match");

    req.getValidationResult().then((error) => {
      if (!error.isEmpty()) {
        let messages = error.array().map((e) => e.msg);
        req.skip = true;
        req.flash("error", messages.join(" and "));
        res.locals.redirect = "/users/new";
        console.log(messages.join(" and "));
        next();
      } else {
        next();
      }
    });
  },
  create: (req, res, next) => {
    if (req.skip) {
      //refer to the validate action that sets this custom property to true if there was a problem with user data validation

      next();
    } else {
      //wihtout this else, even if req.skip is true, the invalid user is still added!!!and you get redirection erros
      let newUser = new User(getUserParams(req.body));
      newUser.bio = `Hello, I'm ${req.body.userName}`;
      newUser.profileImage = "/images/defaultUserProfileImage.png";
      newUser.profileImageThumb = "/images/defaultProfileThumb.png";
      User.register(newUser, req.body.password, (error, user) => {
        if (user) {
          req.flash(
            "success",
            `${user.userName}'s account created successfully!`
          );
          console.log(`${user}'s account created successfully!`);
          res.locals.redirect = "/";
          next();
        } else {
          req.flash(
            "error",
            `Failed to create user account because: ${error.message}.`
          );
          res.locals.redirect = "/users/new";
          console.log(
            `Failed to create user account because: ${error.message}.`
          );
          next();
        }
      });
    }
  },

  validateEdit: (req, res, next) => {
    const valid = (input) =>
      //YOU MAY NEED TO CHANGE THIS TO REDUCE INSTEAD OF EVERY
      input.split(" ").every(function (str) {
        return str.match("[A-Za-z0-9]"); //isAlphaNumeric(str);
      });

    //validate
    req
      .check("userName", "Username is invalid")
      .notEmpty()
      .isLength({ min: 1, max: 20 }); //else //return true; //  }); //sanitize

    req.check("userName", "Username is invalid").custom((username) => {
      if (valid(username)) return true; //return false;
      /*throw new Error(
            "Characters are not alphanumeric or you have extra leading or trailing whitespace"
    );*/
    });

    //validate

    req.check("bio", "bio is too long").isLength({ min: 0, max: 100 }); //else //return true; //  }); //sanitize

    /*req
      .check(
        "bio",
        "bio has non-alphanumeric characters or more than one whitespace between words"
      )
      .custom((bio) => {
        if (valid(bio)) return true;
      });*/
    //before implementing the 2nd bio check, i need to research more on how injections occur in Mongo (like SQL injections)

    req.getValidationResult().then((error) => {
      if (!error.isEmpty()) {
        let messages = error.array().map((e) => e.msg);
        req.skip = true;
        req.flash("error", messages.join(" and "));
        res.locals.redirect = "/users/account/edit";
        console.log(messages.join(" and "));
        next();
      } else {
        next();
      }
    });
  },

  validatePasswordEdit: (req, res, next) => {
    //validate
    req
      .check("password", "Password cannot be empty")
      .notEmpty()
      .isLength({ min: 6, max: 20 })
      .isAlphanumeric();

    req
      .check("passwordConfirmation", "Password confirmation cannot be empty")
      .notEmpty()
      .isLength({ min: 6, max: 20 })
      .isAlphanumeric();

    req
      .check(
        "passwordConfirmation",
        "Password confirmation does not match password"
      )
      .custom((passwordValidation) => {
        if (passwordValidation === req.body.password) {
          //throw new Error("Password confirmation does not match password");
          //return false;
          return true;
        }

        // Indicates the success of this synchronous custom validator
        //return true;
      });
    //req.check("passwordConfirmation").withMessage("passwords dont match");

    req.getValidationResult().then((error) => {
      if (!error.isEmpty()) {
        let messages = error.array().map((e) => e.msg);
        req.skip = true;
        req.flash("error", messages.join(" and "));
        res.locals.redirect = "/users/account/edit";
        console.log(messages.join(" and "));
        next();
      } else {
        next();
      }
    });
  },

  /*edit: (req, res, next) => {
    let userId = res.locals.currentUser._id;
    User.findById(userId)
      .then(user => {
        res.render("users/edit", {
          user: user
        });
      })
      .catch(error => {
        console.error(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },*/
  update: (req, res, next) => {
    //let userId = req.params.id,
    let userId = req.user._id,
      userParams = {
        /*name: {
          first: req.body.first,
          last: req.body.last,
        },*/
        userName: req.body.userName,
        bio: req.body.bio,
        //email: req.body.email,
        //password: req.body.password,
        //zipCode: req.body.zipCode,
      };
    User.findByIdAndUpdate(userId, { $set: userParams }) //mongoose method
      .then((user) => {
        res.locals.redirect = "/users/home"; // `/users/${userId}`;
        res.locals.user = user;
        next();
      })
      .catch((error) => {
        console.log(`Error updating user by ID: ${error.message}`);
        next(error);
      });
  },
  updatePassword: (req, res, next) => {
    //let userId = req.user._id;
    /*userParams = {
        password: req.body.password,
      };*/
    //source:https://stackoverflow.com/questions/17828663/passport-local-mongoose-change-password
    req.user.setPassword(req.body.password, () => {
      req.user
        .save() //MY GUESS: .save() returns a promise that contains the
        //mongodb document object and the "then" unwraps the promise to retirive the mongodb document object
        .then((user) => {
          res.locals.redirect = "/users/home"; // `/users/${userId}`;
          res.locals.user = user;
          //PERHAPS YOU CAN ADD A FLASH MESSAGE HERE TO INDICATE SUCCESSFUL PASSWORD UPDATE!
          next();
        })
        .catch((error) => {
          console.log(`Error updating user by ID: ${error.message}`);
          //PERHAPS YOU CAN ADD A FLASH MESSAGE HERE TO INDICATE UNSUCCESSFUL PASSWORD UPDATE!
          next(error);
        });
    });

    /*User.findByIdAndUpdate(userId, { $set: userParams }) //mongoose method
      .then((user) => {
        res.locals.redirect = "/users/home"; // `/users/${userId}`;
        res.locals.user = user;
        next();
      })
      .catch((error) => {
        console.log(`Error updating user by ID: ${error.message}`);
        next(error);
      });*/
  },
  authenticate: passport.authenticate("local", {
    //Remember to turn on browser cookies for passport to work, even if authentication is successful.
    //authenticating via the "local" strategy
    failureRedirect: "/users/login",
    failureFlash: "Failed to login",
    successRedirect: "/users/home",
    successFlash: "Logged in!",
  }),

  checkLogInStatus: (req, res, next) => {
    if (!res.locals.loggedIn) {
      res.locals.redirect = "/users/login";
      next();
    } else next();
  },

  /*show: (req, res, next) => {
    //known as "show" in the parent project Wexler's Getting started with nodejs unit6
    let userId = req.params.id;
    User.findById(userId)
      .then((user) => {
        res.locals.user = user; //pass the user through the res object to the next middleware function
        next();
      })
      .catch((error) => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },*/

  logout: (req, res, next) => {
    req.logout(); //this uses the logout method provided by passport.js; it clears the current user's session
    req.flash("success", "You have been logged out!");
    res.locals.redirect = "/";
    next();
  },

  updateUserProfilePicture: (req, res, next) => {
    if (req.user.profileImageID) {
      //if the user does not have the default profile image
      Image.findByIdAndRemove(req.user.profileImageID)
        .then((image) => {
          cloudinary.uploader.destroy(
            `${image.cloudinaryPublicID}`,

            function (error, result) {
              console.log("Cloudinary callback message: ", result, error);
            }
          );
        })
        .catch((error) => {
          console.log(`Error destroying user profile image: ${error.message}`);
          next(error);
        });
    }
    Image.create({
      url: req.body.image,
      urlProfile: req.body.imageProfile,
      urlThumb: req.body.imageThumbnail,
      cloudinaryPublicID: req.body.cloudinaryPublicID,
      isProfilePicture: true,
      user: req.user._id,
    })
      .then((image) => {
        req.flash("success", `profile image created successfully!`);

        User.findByIdAndUpdate(req.user._id, {
          $set: {
            profileImage: image.urlProfile,
            profileImageThumb: image.urlThumb,
            profileImageID: image._id,
          },
        }) //mongoose method
          .then((user) => {
            Image.update(
              //this way the images know the user thumbnail to display
              { userName: user.userName },
              { $set: { userThumb: image.urlThumb } }, //image.urlThumb is used to prevent race condition where user is not updated in time
              { multi: true },
              (err, writeResult) => {
                console.log(err);
                next(err);
              }
            );
            res.locals.redirect = "/users/account/edit"; // `/users/${userId}`;
            res.locals.user = user;

            next();
          })
          .catch((error) => {
            console.log(`Error updating user by ID: ${error.message}`);
            next(error);
          });
      })
      .catch((error) => {
        req.flash("error", `Failed to create image because: ${error.message}.`);
        res.locals.redirect = "/";
        console.log(`Failed to pair image because: ${error.message}.`);
        next(error);
      });
  },

  pairImageWithUser: (req, res, next) => {
    //let newImage = new Image({ url: req.body.image, user: req.user._id });
    //console.log(req.body);
    Image.create({
      url: req.body.image,
      urlNormalized: req.body.imageNormalized,
      urlProfile: req.body.image150,
      userThumb: req.user.profileImageThumb,
      cloudinaryPublicID: req.body.cloudinaryPublicID,
      user: req.user._id,
      userName: req.user.userName,
    })
      .then((image) => {
        req.flash("success", `image created successfully!`);

        //User.findByIdAndUpdate(req.user._id, { $set: userParams });
        let updatedUser = User.findOneAndUpdate(
          { _id: `${req.user._id}` },
          { $push: { images: { $each: [image], $position: 0 } } },
          { new: true }, //<-- You sue this if you would like a new instance of the document found returned
          (err, result) => {
            // Rest of the action goes here
            if (err)
              console.log(
                "There was a problem pairing the image with the user: ",
                err
              );
            if (result) console.log(`image paired successfully!`, result);
          }
        );
        //updatedUser.totalNumPhotos = updatedUser.images.length;
        res.locals.redirect = "/users/home";
        next();
      })
      .catch((error) => {
        req.flash("error", `Failed to create image because: ${error.message}.`);
        res.locals.redirect = "/";
        console.log(`Failed to pair image because: ${error.message}.`);
        next(error);
      });
  },
  getAllUserImages: (req, res, next) => {
    //console.log(req.params);
    /*let username = res.locals.loggedIn 
      ? res.locals.currentUser.userName
      : req.params.username;*/
    let username = req.params.username;

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 9; //parseInt(req.query.limit)

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let results = {};

    // if (endIndex < Image.countDocuments().exec()) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
    // } else {
    //   results.next = null;
    //}

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    } else {
      results.previous = null;
    }
    results.currPage = page;
    //res.locals.allImages.navInfo = results;
    const limit_per_page = limit;
    User.findOne({ userName: `${username}` })
      //.populate("images")
      .populate({
        path: "images",
        options: {
          sort: { createdAt: -1 },
          limit: limit_per_page,
          skip: startIndex,
        },
      })
      .then((user) => {
        //Image.find({ user: `${user._id}` }).sort({createdAt: -1})

        //user.images.then((images) => {
        //console.log(user.images);
        res.locals.user = user;
        res.locals.allImages = user.images; //locals is an object in res that lets you define variables...
        res.locals.allImages.navInfo = results;
        //...to which you'll have access to in your view
        next(); //call the next middleware function
      })
      .catch((error) => {
        //FIX THIS LATER...IF USER DOESNT EXIST YOU SHOULD REDIRECT TO A 404
        console.log(`Error fetching images by ID: ${error.message}`);
        res.locals.redirect = "/";
        //next(error);
        next();
      });
  },
  deleteAccount: (req, res, next) => {
    //console.log(req.params);
    /*let username = res.locals.loggedIn 
      ? res.locals.currentUser.userName
      : req.params.username;*/
    let userID = req.user._id;

    User.findByIdAndRemove(userID)
      .populate("images")
      .populate("profileImageID")
      .then((user) => {
        /*cloudinary.uploader.destroy(
            `${image.cloudinaryPublicID}`,

            function (error, result) {
              console.log("Cloudinary callback message: ", result, error);
            }
          );*/

        const publicIDs = user.images.map((image) => image.cloudinaryPublicID);
        if (user.profileImageID) {
          //user may have default profile picture which is not a document
          publicIDs.push(user.profileImageID.cloudinaryPublicID);
        }
        cloudinary.api.delete_resources(publicIDs, function (error, results) {
          if (error) {
            console.log("There was a cloudinary error", error);
          }
        });

        Image.deleteMany(
          {
            user: user._id,
          },
          function (err) {
            if (err)
              console.log(
                "There was an error deleting all the user images",
                err
              );
          }
        );
        res.locals.redirect = "/";
        next();
      })
      .catch((error) => {
        console.log(`Error destroying user account: ${error.message}`);
        next(error);
      });
  },
};
