import React from "react";
import EditUserForm from "./EditUserForm";
import EditUserPasswordForm from "./EditUserPasswordForm";
import DeleteUserProfileForm from "./DeleteUserProfileForm";

function EditOptions(props) {
  return (
    <React.Fragment>
      <div className="d-flex flex-column">
        <div className="container bg-white mx-auto">
          <div className="row">
            <div className="col-3">
              <div
                className="nav flex-column nav-pills"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <a
                  className="nav-link active"
                  id="v-pills-home-tab"
                  data-toggle="pill"
                  href="#v-pills-home"
                  role="tab"
                  aria-controls="v-pills-home"
                  aria-selected="true"
                >
                  Edit Profile
                </a>
                <a
                  className="nav-link"
                  id="v-pills-profile-tab"
                  data-toggle="pill"
                  href="#v-pills-profile"
                  role="tab"
                  aria-controls="v-pills-profile"
                  aria-selected="false"
                >
                  Password
                </a>
                <a
                  className="nav-link"
                  id="v-pills-delete-profile-tab"
                  data-toggle="pill"
                  href="#v-pills-delete-profile"
                  role="tab"
                  aria-controls="v-pills-profile"
                  aria-selected="false"
                >
                  Delete Account
                </a>
              </div>
            </div>
            <div className="col-9">
              <div
                className="tab-content"
                id="v-pills-tabContent"
              >
                <div
                  className="tab-pane fade show active"
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                >
                  {/*==========FORM 1==========*/}
                  <EditUserForm user={props.user} />
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                >
                  {/*==========FORM 2==========*/}
                  <EditUserPasswordForm />
                </div>
                <div
                  className="tab-pane fade mx-auto"
                  id="v-pills-delete-profile"
                  role="tabpanel"
                  aria-labelledby="v-pills-delete-profile-tab"
                >
                  {/*==========FORM 3==========*/}
                  <DeleteUserProfileForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default EditOptions;
