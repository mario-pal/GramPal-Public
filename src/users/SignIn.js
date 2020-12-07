import React from "react";
import Login from "../components/Login";

function SignIn() {
  return (
    <React.Fragment>
      <div className="container pt-5">
        <Login />
        <div className="card mx-auto pt-3 bg-white " style={{ width: "18rem" }}>
          <p className="text-center"> Don't have an account? <a href="/users/new">Sign Up</a></p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SignIn;
