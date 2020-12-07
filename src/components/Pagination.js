import React from "react";

function Pagination(props) {
  const prevDisabled = props.allImages.navInfo.previous ? "" : "disabled";
  const nextDisabled = props.allImages.navInfo.next ? "" : "disabled";

  /*const next = props.allImages.navInfo.next
    ? props.allImages.navInfo.next.page
    : 1;
  const prev = props.allImages.navInfo.prev
    ? props.allImages.navInfo.previous.page
    : 1;*/
  const prev = props.allImages.navInfo.currPage - 1;
  const next = props.allImages.navInfo.currPage + 1;
  return (
    <div className="container-md">
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${prevDisabled}`}>
            <a
              className="page-link"
              href={`${props.route}?page=${prev}`}
              tabIndex="-1"
            >
              Previous
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link"
              href={`${props.route}?page=${props.allImages.navInfo.currPage}`}
            >
              {props.allImages.navInfo.currPage}
            </a>
          </li>
          <li className={`page-item ${nextDisabled}`}>
            <a className="page-link" href={`${props.route}?page=${next}`}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
