const Image = require("../models/Image.js");
const User = require("../models/User.js");
const cloudinary = require("cloudinary").v2;

/*function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = 9; //parseInt(req.query.limit)

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let results = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.results = await model.find({ isProfilePicture: false }).limit(limit).skip(startIndex).exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      //res.status(500).json({ message: e.message });
      console.log(e.message);
    }
  };
}*/

module.exports = {
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) {
      res.redirect(redirectPath);
      //console.log(redirectPath);
    } else next();
  },
  index: (req, res, next) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 9; //parseInt(req.query.limit)

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let results = {};

    //if (endIndex < totalDocuments) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
    // } else {
    //  results.next = null;
    //  }

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
    // res.locals.results = results;
    Image.find({ isProfilePicture: false }, function (err, results) {
      res.locals.totalDocuments = results.length;
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex)
      .then((images) => {
        res.locals.allImages = images; //locals is an object in res that lets you define variables...
        //let totalDocuments = res.locals.totalDocuments;

        res.locals.allImages.navInfo = results;
        //...to which you'll have access to in your view
        //res.locals.allImages.navInfo = results;
        next(); //call the next middleware function
      })
      .catch((error) => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },
  delete: (req, res, next) => {
    let imageId = req.params.id;
    /*cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_CLOUD_KEY,
      api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
    });*/

    Image.findByIdAndRemove(imageId)
      .then((image) => {
        User.findOneAndUpdate(
          { _id: `${image.user._id}` },
          { $pull: { images: image._id } },
          { new: true }, //<-- You sue this if you would like a new instance of the document found returned
          (err, result) => {
            if (err) {
              console.log(
                "There was an error updating the user collection of images",
                err
              );
            }
            //console.log(`image unpaired from user result`, err, result);
          }
        );

        cloudinary.uploader.destroy(
          `${image.cloudinaryPublicID}`,

          function (error, result) {
            console.log("Cloudinary callback message: ", result, error);
          }
        );

        res.locals.redirect = `/users/${res.locals.currentUser.userName}`;
        next();
      })
      .catch((error) => {
        console.log(`Error deleting image by ID: ${error}`);
        next();
      });
  },
  deleteProfileImage: (req, res, next) => {
    Image.findByIdAndRemove(req.params.id)
      .then((image) => {
        const user = User.findOneAndUpdate(
          { _id: `${image.user._id}` },
          {
            $set: {
              profileImage: "/images/defaultUserProfileImage.png",
              profileImageID: null,
              profileImageThumb: "/images/defaultProfileThumb.png",
            },
          },
          { new: true }, //<-- You sue this if you would like a new instance of the document found returned
          (err, result) => {
            if (err) {
              console.log(
                "There was an error updating the user collection of images",
                err
              );
            }
            //console.log(`image unpaired from user result`, err, result);
            next(err);
          }
        );

        Image.update(
          //this way the images know the user thumbnail to display
          { userName: user.userName },
          { $set: { userThumb: image.urlThumb } }, //image.urlThumb is used to prevent race condition where user is not updated in time
          { multi: true },
          (err, writeResult) => {
            if (err) {
              console.log(err);
              next(err);
            }
          }
        );

        cloudinary.uploader.destroy(
          `${image.cloudinaryPublicID}`,

          function (error, result) {
            console.log("Cloudinary callback message: ", result, error);
          }
        );

        res.locals.redirect = `/users/account/edit`;
        next();
      })
      .catch((error) => {
        console.log(`Error deleting image by ID: ${error}`);
        next();
      });
  },
};
