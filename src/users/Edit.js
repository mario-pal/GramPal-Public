import React from "react";
import NavBar from "../components/NavBar";
import EditOptions from "../components/EditOptions";

function Edit(props) {
  return (
    <React.Fragment>
      <NavBar user={props.user} />
      <main className="col-12 col-md-9 mx-auto mt-4">
        <EditOptions user={props.user.currentUser} />
      </main>
    </React.Fragment>
  );
}

export default Edit;
