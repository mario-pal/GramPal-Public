const router = require("express").Router(),
  imagesController = require("../controllers/imagesController"),
  usersController = require("../controllers/usersController");

router.delete(
  "/:id/delete",
  imagesController.delete,
  imagesController.redirectView
);

router.delete(
  "/:id/delete/ProfileImage",

  usersController.checkLogInStatus,
  imagesController.redirectView,
  imagesController.deleteProfileImage,
  imagesController.redirectView
);

module.exports = router;
