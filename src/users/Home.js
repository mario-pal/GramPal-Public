import React from "react";
import NavBar from "../components/NavBar";
import UserAbout from "../components/UserAbout";
import ImageGrid from "../components/ImageGrid";
import Pagination from "../components/Pagination";
import { PromiseProvider } from "mongoose";

function Home(props) {
  {
    /*images={["me.jpg"]}*/
  }

  return (
    <React.Fragment>
      <div className="d-flex flex-column">
        <NavBar user={props.user} />

        <UserAbout user={props.user} />
        <ImageGrid
          images={props.allImages}
          showDeleteButton={props.showDeleteButton}
        />
        <Pagination allImages={props.allImages} route={props.route} />
      </div>
      {/*<p> {props.user.currentUser.userName} </p>*/}

      <footer className="footer">
        <div className="container-md">
          <hr />
          <p>&copy; Mario </p>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Home;
