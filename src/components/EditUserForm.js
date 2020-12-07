import React from "react";

function EditUserForm(props) {
  const deleteButton =
    props.user.profileImage === "/images/defaultUserProfileImage.png" ? (
      <div></div>
    ) : (
      <a
        className="btn btn-danger"
        href={`/images/${props.user.profileImageID}/delete/ProfileImage?_method=DELETE`}
      >
        Remove Profile Image
      </a>
    );
  return (
    <React.Fragment>
      <form
        action="/users/cloudinarySyncProfileImage"
        method="post"
        id="hidden_form"
        hidden
      >
        <input
          name="image"
          type="text"
          placeholder="Original Image URL"
          id="url_text"
        />
        <input
          name="imageProfile"
          type="text"
          placeholder="Profile Image URL"
          id="url_profile"
        />
        <input
          name="imageThumbnail"
          type="text"
          placeholder="Image 32x32"
          id="url_thumb"
        />
        <input name="cloudinaryPublicID" type="text" id="cloudinaryPublicID" />
      </form>
      {/*======================================*/}
      <div className="form-group row mt-3">
        <label className="col-sm-2 col-form-label" htmlFor="inputUserName">
          <img
            src={props.user.profileImage}
            alt="Cant Display Image"
            className="img-fluid rounded-circle"
          />
        </label>

        <div className="btn-group col-sm-5">
          {deleteButton}
          <button
            id="upload_widget"
            className="cloudinary-button btn btn-primary"
          >
            Change Profile Photo
          </button>
        </div>
      </div>
      {/*===================*/}
      <div className="data-form">
        {/*With the _method=PUT query parameter, you can interpret POST requests as PUT requests
    however, this is middleware functionality that must be configured*/}
        <form action="/users/account/update/user?_method=PUT" method="POST">
          {/*====================================*/}
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="inputUserName">
              Username
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                name="userName"
                id="inputUserName"
                defaultValue={props.user.userName}
                placeholder="Username"
                autoFocus
              />
            </div>
          </div>
          {/*<label for="inputPassword">Password</label>
    <input
      type="password"
      name="password"
      id="inputPassword"
      value="<%= user.password%>"
      placeholder="Password"
      required
/>*/}
          {/*htmlFor is react version of for html property*/}
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="inputBio">
              Bio
            </label>

            <div className="col-sm-10">
              <textarea
                className="form-control"
                id="inputBio"
                name="bio"
                rows="3"
                defaultValue={props.user.bio}
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-10">
              <button className="btn btn-primary" type="submit">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default EditUserForm;
