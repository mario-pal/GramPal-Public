import React from "react";

function DeleteUserProfileForm(props) {
  return (
    <div className="text-center mt-4">
      <a
        className="btn btn-danger btn-lg"
        href="/users/account/delete?_method=DELETE"
      >
        DELETE ACCOUNT
      </a>
    </div>
  );
}

export default DeleteUserProfileForm;
