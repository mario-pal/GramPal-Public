import React from "react";
import NavBar from "./components/NavBar";
import UserAbout from "./components/UserAbout";
import Pagination from "./components/Pagination";
import ImageGrid from "./components/ImageGrid";
import { PromiseProvider } from "mongoose";
import Image from "../models/Image";

function App(props) {
  {
    /*["me.jpg", "me.jpg", "me.jpg", "me.jpg", "me.jpg"]*/
  }

  return (
    //<div className="App">
    <React.Fragment>
      <NavBar user={props.user} />
      <main role="main">
        <section className="jumbotron text-center">
          <div className="container">
            <h1>Welcome to GramPal 1.0</h1>
            <h2> Developed by Mario Palma </h2>
            <p className="lead text-muted">Upload and share your images.</p>
            <h2 className="lead">See recent user uploads below</h2>
          </div>
        </section>
        <ImageGrid images={props.allImages} />
        <Pagination allImages={props.allImages} route={props.route} />
      </main>

      <footer className="footer">
        <div className="container-md">
          <hr />
          <p>&copy; Mario </p>
        </div>
      </footer>
    </React.Fragment>
    // </div>
  );
}

export default App;
