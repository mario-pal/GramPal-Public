import React from "react";
//import NavBar from "./../components/NavBar";
{
  /*encType="multipart/form-data"*/
  /*const AboutMe = props.user.currentUser.bio
  ? props.user.currentUser.bio
  : `Hello, I'm ${props.user.currentUser.userName}`;*/
}
function UserAbout(props) {
  let currViewedUser;
  if (props.user.currentUser === undefined) currViewedUser = props.user.user;
  else {
    currViewedUser =
      props.user.currentUser._id === props.user.user._id
        ? props.user.currentUser
        : props.user.user;
  }
  const AboutMe = currViewedUser.bio;
  const FollowOrUpload =
    props.user.loggedIn &&
    props.user.currentUser.userName === props.user.user.userName ? (
      <React.Fragment>
        <button
          id="upload_widget"
          className="cloudinary-button btn btn-primary"
        >
          Upload image
        </button>
        <form
          action="/users/cloudinarySync"
          method="post"
          id="hidden_form"
          hidden
        >
          <input name="image" type="text" id="url_text" />
          <input name="imageNormalized" type="text" id="url_320_text" />
          <input name="image150" type="text" id="url_150_text" />
          <input
            name="cloudinaryPublicID"
            type="text"
            id="cloudinaryPublicID"
          />
        </form>
      </React.Fragment>
    ) : (
      <input className="btn btn-primary" type="button" value="Follow" />
    );
  return (
    <div className="col">
      <div className="row d-flex">
        <div
          className="col-4.75 bg-transparent  d-flex align-items-center justify-content-center"
          style={{ width: "30rem", height: "16rem" }}
        >
          <img
            src={`${currViewedUser.profileImage}`}
            alt="Cant Display Image"
            className="rounded-circle "
          />
        </div>
        {/*==============================================================*/}
        <div className="col bg-transparent">
          <div className="d-flex flex-row align-items-center mt-3">
            <h5 className="pr-4"> {currViewedUser.userName} </h5>

            {FollowOrUpload}
          </div>
          <div className="d-flex flex-row align-items-center mt-4">
            <p className="pr-3">{currViewedUser.images.length} posts</p>
            <p className="pr-3">{currViewedUser.totalFollowers} followers</p>
            <p className="pr-3">{currViewedUser.totalFollowing} following</p>
          </div>
          <div className="d-flex flex-row align-items-center mt-4">
            <p>{AboutMe}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAbout;
