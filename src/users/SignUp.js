import React from "react";
import Register from "../components/Register";

function Signup() {
  return (
    <React.Fragment>
      <div className="container pt-5">
        <Register/>
        <div className="card mx-auto pt-3 bg-white " style={{ width: "18rem" }}>
          <p className="text-center"> Already have an account? <a href = "/users/login">Log In</a></p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Signup;
