import React from "react";

function EditUserPasswordForm(props) {
  return (
    <React.Fragment>
      <div className="data-form">
        {/*With the _method=PUT query parameter, you can interpret POST requests as PUT requests
    however, this is middleware functionality that must be configured*/}
        <form
          action="/users/account/update/user/password?_method=PUT"
          method="POST"
        >
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="inputPassword">
              New Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                name="password"
                id="inputPassword"
                placeholder="Alphanumeric Password between 6-20 characters"
                pattern="[a-zA-Z0-9]{6,20}"
                autoFocus
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              className="col-sm-2 col-form-label"
              htmlFor="inputPasswordConfirmation"
            >
              Confirm New Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                name="passwordConfirmation"
                id="inputPasswordConfirmation"
                placeholder="Confirm Password (Alphanumeric and between 6-20 characters)"
                pattern="[a-zA-Z0-9]{6,20}"
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-10">
              <button className="btn btn-primary" type="submit">
                Change Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default EditUserPasswordForm;
