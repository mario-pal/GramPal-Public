import React from "react";

function Login() {
  return (
    <div className="card mx-auto pt-4 mb-2" style={{ width: "18rem" }}>
      <form className="bg-white" action="/users/login" method="POST">
        <div className="text-center">
          {/*width="150"
            height="90" this resizing might be useful later if changing logos*/}
          <img
            src="../images/logo2.png"
            className="mx-auto"
            alt="Missing Logo"
          />
        </div>
        <p className="text-center">Share images.</p>
        <hr className="my-4" />

        <div className="col-10 mx-auto mb-4">
          <input
            type="text"
            name="userName"
            className="form-control mb-2"
            id="username"
            placeholder="Username"
            title="Alphanumeric characters only"
            pattern="[A-Za-z0-9]{1,20}"
            required
          />

          <input
            type="password"
            name="password"
            className="form-control mb-2"
            id="password"
            placeholder="Password"
            pattern="[a-zA-Z0-9]{6,20}"
            title="Alphanumeric characters where input is between 6-20 characters"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary mb-2"
            id="disabledSubmit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
