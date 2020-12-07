const mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose"), //you can use this method to let the User model access passport methods such as User.register
  { Schema } = mongoose;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },

    /*email: {
      type: String,
      //required: true,
      lowercase: true,
      unique: true,
    },*/
    bio: {
      //short user bio
      type: String,
    },
    /*zipCode: {
        type: Number,
        min: [1000, "Zip code too short"],
        max: 99999
      },
      password: {
        type: String,
        required: true
      },*/
    profileImageID: { type: Schema.Types.Object, ref: "Image" },
    profileImage: { type: String },
    profileImageThumb: { type: String },
    images: [{ type: Schema.Types.ObjectId, ref: "Image" }],
    totalNumPhotos: { type: Number, default: 0 },
    totalFollowers: { type: Number, default: 0 },
    totalFollowing: { type: Number, default: 0 },
  },
  {
    //this is the second argument to the Schema constructor
    timestamps: true,
  }
);

//NOTE: Depednding on the value of usernameField, it will interpret a different feild as the
//...username. For example, if usernameFeild: "email" then it would check all emails in the
//...database that match the given email in the email feild of the form (my own conjecture not a fact)
userSchema.plugin(passportLocalMongoose, { usernameField: "userName" });
module.exports = mongoose.model("User", userSchema);
