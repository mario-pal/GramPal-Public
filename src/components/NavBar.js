import React from "react";
{
  /*`/users/${props.user.currentUser.userName}`*/
}
function NavBar(props) {
  const buttons = props.user.loggedIn ? (
    <div>
      {/*<a href={`/users/${props.userInfo.currentUser._id}`}>Home</a>*/}

      <a className="btn btn-light" href="/users/home">
        Home
      </a>
      <a className="btn btn-primary" href="#">
        Feed
      </a>

      <div className="btn-group dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Account
        </button>
        <div
          className="dropdown-menu dropdown-menu-right"
          aria-labelledby="dropdownMenuButton"
        >
          <a className="dropdown-item" href="/users/account/edit">
            Edit Account
          </a>
          <a className="dropdown-item" href="/users/logout">
            Logout
          </a>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <a className="btn btn-primary" href="/users/login" role="button">
        Log In
      </a>

      <a className="btn btn-link" href="/users/new" role="button">
        Sign Up
      </a>
    </div>
  );
  //==============================================================================
  return (
    <nav className="navbar  navbar-expand-lg bg-white justify-content-between">
      {/*fixed-top */}
      <a className="navbar-brand mml-auto" href="/">
        <img
          src="/images/logo.png"
          width="90"
          height="30"
          className="d-inline-block align-top"
          alt="GramPal"
        />
      </a>
      {/*<form className="form-inline">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
  </form>*/}
      {buttons}
    </nav>
  );
}

export default NavBar;
