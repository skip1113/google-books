import React, { Component } from "react";
import { DeleteBtn } from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn, SearchBtn } from "../components/Form";
import NewBook from "../components/NewBook";
class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: "",
    search: "",
    result: []
  };

  componentDidMount() {
    this.loadBooks();
    // this.searchBook();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };
  searchBook = event => {
    // event.preventDefault();
    console.log("HellowWorld");
    console.log(this.state.search);
    API.search(this.state.search)
      // .then(res => this.setState({ result: res.data.items }, console.log(this.state.result)))
      .then(res => {
        this.setState({
          result: res.data.items,
          search: ""
        })
      })
      .catch(err => {
        throw err
      })
  }
  handleBookSubmit = event => {
    event.preventDefault();
    this.searchBook({ search: event.target.value }, console.log(this.state.search));
  };
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });

  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };
  handleSaveBook = event => {
    event.preventDefault();
    console.log("Saving book");
    const bookId = event.target.getAttribute('data-id');
    const newState = { ...this.state};
    let savedBook = this.state.result.filter(book => book.id === bookId)
    const newBook = {
      title: savedBook[0].volumeInfo.title,
      author: JSON.stringify(savedBook[0].volumeInfo.authors),
      description: savedBook[0].volumeInfo.description,
      image: savedBook[0].volumeInfo.imageLinks.thumbnail,
      link: savedBook[0].volumeInfo.infoLink
    }
    if (this.state.result[bookId]) {
      return alert("You already have that book saved.");

    } else {
      event.preventDefault();
      newState.result[bookId] = newBook;
      // console.log(newState);
      this.setState(newState);
      console.log(newState);
      API.saveBook({
        title: savedBook[0].volumeInfo.title,
        author: JSON.stringify(savedBook[0].volumeInfo.authors),
        description: savedBook[0].volumeInfo.description,
        image: savedBook[0].volumeInfo.imageLinks.thumbnail,
        link: savedBook[0].volumeInfo.infoLink
      })
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
    }
    
  };
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <h2>Search Books!</h2>
            <form>
              <Input
                value={this.state.search}
                onChange={this.handleInputChange}
                name="search"
                placeholder="Book Title (required)"
              />
              <SearchBtn
                disabled={!this.state.search}
                value={this.state.search}
                handleInputChange={this.handleInputChange}
                handleBookSubmit={this.handleBookSubmit}
              >
                Search
              </SearchBtn>
            </form>
            <br></br>
            <h2>Add Your own Book!</h2>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              />
              <FormBtn
                disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
          <Col size="md-12">
            <h2>New Books!</h2>
            {this.state.result.map((result) => {
              return (
                <div className="card">
                  <div className="card-body player">
                    <NewBook 
                      key={result.id}
                      title={result.volumeInfo.title}
                      id={result.id}
                      link={result.volumeInfo.infoLink}
                      author={result.volumeInfo.authors}
                      image={result.volumeInfo.imageLinks.thumbnail}
                      description={result.volumeInfo.description}
                      saveBook={this.handleSaveBook}
                    />
                
                  </div>
              </div>
              )
            })}
            
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
