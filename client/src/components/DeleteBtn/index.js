import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export function DeleteBtn(props) {
  return (
    <span className="delete-btn" {...props} onClick={props.onClick} data-id={props.id} role="button" tabIndex="0">
      ✗
    </span>
  );
}

export function SaveBtn(props) {
  return (
    <button className="save-btn" {...props} onClick={props.onClick} data-id={props.id}>
      {props.children}
    </button>
  )
}
