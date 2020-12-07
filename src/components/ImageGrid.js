import React from "react";
{
  /*NOTE: The image tags are sorrounded in div tagsin the map callback because Safari will
not resize the photo apprpriately unlike Chrome and Firefox. Also Chrome wont resize correctly
without img-fluid*/
}
function ImageGrid(props) {
  {
    /*`/images/${image}`*/
  }
  let ImagePosts = (
    <div
      className="d-flex justify-content-center alert alert-info"
      role="alert"
    >
      <p className="text-center">
        There are no more images to display! Check a previous page.
      </p>
    </div>
  ); //default value

  if (props.images.length > 0) {
    ImagePosts = props.images.map((image, index) =>
      (index + 1) % 3 ? (
        <div
          className="col-4 d-flex justify-content-center pb-3 grampal-glow btn"
          key={index.toString()}
          data-toggle="modal"
          data-target="#shared-modal"
          data-owner={`${image.userName}`}
          data-owner-thumb={`${image.userThumb}`}
          data-original={`${image.url}`}
          data-image-id={`${image._id}`}
          type="button"
        >
          <div>
            <img
              src={image.urlNormalized}
              alt="Cant Display Image"
              className="img-fluid"
            />
          </div>
        </div>
      ) : (
        <React.Fragment key={index.toString()}>
          <div
            className="col-4 d-flex justify-content-center pb-3 grampal-glow btn"
            data-toggle="modal"
            data-target="#shared-modal"
            data-owner={`${image.userName}`}
            data-owner-thumb={`${image.userThumb}`}
            data-original={`${image.url}`}
            data-image-id={`${image._id}`}
            type="button"
          >
            <div>
              <img
                src={image.urlNormalized}
                alt="Can't Display Image"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="w-100"></div>
        </React.Fragment>
      )
    );

    ImagePosts = <div className="row align-items-center">{ImagePosts}</div>;
  }
  const deleteOption = props.showDeleteButton ? (
    <div className="modal-footer">
      <a type="button" className="btn btn-danger" href="#">
        Delete
      </a>
    </div>
  ) : (
    <div></div>
  );
  return (
    //<div className="App">
    <React.Fragment>
      <div
        className="modal fade"
        id="shared-modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <img
                src=""
                alt="Can't Display Image"
                className="img-fluid pr-4"
              />
              <a href=""></a>

              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="">
                <img
                  src=""
                  alt="Can't Display Image"
                  id="originalImage"
                  className="img-fluid"
                />
              </div>
            </div>
            {deleteOption}
          </div>
        </div>
      </div>

      <div className="container-md">
        {/*<div className="row align-items-center">{ImagePosts}</div>*/}
        <hr className="my-4" />
        {ImagePosts}
        <hr className="my-4" />
      </div>
    </React.Fragment>
    // </div>
  );
}
/*className="img-fluid"*/
export default ImageGrid;
