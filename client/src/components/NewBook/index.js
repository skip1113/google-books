import React from "react";
import { SaveBtn, DeleteBtn } from "../DeleteBtn";
import {Row, Col} from "../Grid"
import "./style.css";
// New book details

function NewBook({ props, title, link, author, image, description, saveBook, id, deleteBook, synopsis }) {
  if (!saveBook){
    return(
      <div className="article">
          
          
            
              <li className="search-list list-group-item">
                <Row className="SearchResult row" id={title + "Card"} key={id}>
                  <Col size="2" className="bookImage">
                    <img src={image} alt={title} />
                  </Col>
                  <Col size="1" className="emptyCol" />
                  <Col size="9" className="bookInfo">
                    <Row>
                      <h3 className="bookTitle">{title}</h3>
                    </Row>
                    <Row>
                      <h3 className="bookAuthor">{author}</h3>
                    </Row>
                    <Row>
                      <p className="bookDescription">{description}</p>
                    </Row>
                    <Row>
                      <p className="bookSynopsis">{synopsis}</p>
                      <Row>
                      <a className="bookLink" href={link}>{link}</a>
                    </Row>
                    </Row>
                  </Col>
                  <DeleteBtn
                    id={id}
                    onClick={deleteBook}
                    >Delete Book
                    </DeleteBtn>
                </Row>               
              </li>
        </div>
    )
  }
  return(
  
        <div className="article">
              <li className="search-list list-group-item">
                <Row className="SearchResult row" id={title + "Card"} key={id}>
                  <Col size="2" className="bookImage">
                    <img src={image} alt={title} />
                  </Col>
                  <Col size="1" className="emptyCol" />
                  <Col size="9" className="bookInfo">
                    <Row>
                      <h3 className="bookTitle">{title}</h3>
                    </Row>
                    <Row>
                      <h3 className="bookAuthor">{author}</h3>
                    </Row>
                    <Row>
                      <p className="bookDescription">{description}</p>
                    </Row>
                  </Col>
                  <SaveBtn
                    id={id}
                    onClick={saveBook}
                    >Save book
                    </SaveBtn>
                </Row>
                
              </li>
            

          
        </div>
      
  )
}
  export default NewBook;