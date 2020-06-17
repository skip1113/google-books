import React from "react";
// New book details
function NewBook(props) {
    return (
      <div className="text-center">
        <img alt={props.title} className="img-fluid" src={props.imageLinks} style={{ margin: "0 auto" }} />
        <h3>Title: {props.title}</h3>
        <h3>Author: {props.authors}</h3>
        <h3>Description: {props.description}</h3>
        <a href={props.selfLink}>Link : {props.selfLink}</a>
      </div>
    );
  }
  
  export default NewBook;