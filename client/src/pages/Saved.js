import React, { Component } from "react";

import API from "../utils/API";
import NewBook from "../components/NewBook";

class Saved extends Component {
    state = {
        results: []
    }

    componentDidMount() {
        this.loadBooks();

    }
    loadBooks = () => {
        API.getBooks()
            .then(res => {
                this.setState({ results: res.data });
                // console.log('results:', this.state.results)
            })
            .catch(err => {
                throw err
            })
    }
    handleDeleteBook = event => {
        event.preventDefault();
        // console.log(id);
        const bookID = event.target.getAttribute('data-id')
        
        const newState = { ...this.state }

        newState.results = this.state.results.filter(result => result._id !== bookID)
        console.log(bookID);
        API.deleteBook(bookID).then(
            (response) => {
                this.setState(newState)
                this.loadBooks();
                console.log(response);
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        );
    }

    render() {
        return (
            <div>

                <div className='container' style={{ textAlign: 'center' }}>
                    <u style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>Your Saved Books:</u>
                    <div className='card'>
                        {this.state.results.map((result => {
                            return (
                                <div>
                                    <br />
                                    <br />
                                    <NewBook
                                        key={result._id}
                                        title={result.title}
                                        id={result._id}
                                        link={result.link}
                                        author={result.author}
                                        image={result.image}
                                        description={result.description}
                                        deleteBook={this.handleDeleteBook}
                                    />
                                </div>
                            )
                        }))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Saved;