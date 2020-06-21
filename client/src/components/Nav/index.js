import React from "react";
import "./style.css";
function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        Google Books
      </a>
      <a className="savedbtn" href="/saved">Saved Books</a>
    </nav>
  );
}

export default Nav;
