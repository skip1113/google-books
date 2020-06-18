import React from "react";
// import Books from "../../pages/Books";
import {Row, Col} from "../Grid"
// New book details

const NewBook = props => {
  return (props.result.length === 0) ? (
    <div className="card">
      <div className="card-body player">
        <div className="article">
          <h3>Search Results</h3>
        </div>
      </div>
    </div>
  ) : (
    <div className="card">
      <div className="card-body player">
        <div className="article">
          <h3>Search Results</h3>
          {props.result.map(result => {
            return (
              <li className="search-list list-group-item">
                <Row className="SearchResult row" id={result.title + "Card"} key={result._id}>
                  <Col size="2" className="bookImage">
                    <img src={result.image} alt={result.title} />
                  </Col>
                  <Col size="1" className="emptyCol" />
                  <Col size="9" className="bookInfo">
                    <Row>
                      <h3 classNAme="bookTitle">{result.title}</h3>
                    </Row>
                    <Row>
                      <h3 classNAme="bookAuthor">{result.author}</h3>
                    </Row>
                    <Row>
                      <p classNAme="bookDescription">{result.description}</p>
                    </Row>
                  </Col>
                </Row>
              </li>
            )
          })}
        </div>
      </div>
    </div>
  )
}
  export default NewBook;