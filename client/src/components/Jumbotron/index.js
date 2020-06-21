import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 100, clear: "both", paddingTop: 50, textAlign: "center", backgroundColor: "transparent", color: "white"}}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
