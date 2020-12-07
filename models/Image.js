const mongoose = require("mongoose"),
  { Schema } = mongoose;

const imageSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    urlNormalized: {
      type: String,
      trim: true,
    },
    urlProfile: {
      type: String,
      trim: true,
    },
    urlThumb: {
      type: String,
      trim: true,
    },
    cloudinaryPublicID: {//this is necessary to delete the file on cloudinary later
      type: String,
      required: true,
    },
    isProfilePicture: {
      type: Boolean,
      default: false,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    userName: {type: String},
    userThumb: {type: String}
  },
  {
    //this is the second argument to the Schema constructor
    timestamps: true,
  }
);

module.exports = mongoose.model("Image", imageSchema);
