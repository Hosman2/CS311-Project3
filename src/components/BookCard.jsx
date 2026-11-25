import React from "react";

const BookCard = ({ book }) => {
    return (
        <div className="book-card card">
            {book.cover_i && (
                <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt={book.title}/>
            )}

            <h3> {book.title} </h3>
            <p>Author: {book.author_name}</p>
            <p> Published: {book.first_publish_year} </p>
            <a className="btn btn-secondary" href={`https://openlibrary.org${book.key}`} target="_blank" rel="noopener noreferrer">View Book</a>
        </div>
    );
};

export default BookCard;
