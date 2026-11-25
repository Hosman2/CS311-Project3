import React, { useState, useEffect} from "react";
import BookCard from "./BookCard";
import "./Books.css";


const Books = () => {
    // useState has initial state of empty array
    const [books, setBooks] = useState([]);

    // State for the search box and the search result
    const [searchTerm, setSearchTerm] = useState("");
    const [foundBooks, setFoundBooks] = useState([]);
    const [message, setMessage] = useState("");

    // Fetch 20 books based on the selected genre
    const fetchBooks = async (genre) => {
        try {
            const response = await fetch(`https://openlibrary.org/search.json?subject=${genre}&limit=20`);
            const data = await response.json();

            // Open Library stores the array of books in data.docs
            if (data.docs && data.docs.length > 0) {
                setBooks(data.docs);
            }
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };

    // Load fantasy books when the page first opens
    useEffect(() => {
    fetchBooks("fantasy");
    }, []);

    // Fetch from the API again and look for a book by name
    const searchBook = async () => {
        const term = searchTerm.trim();

        if (term === "") {
            setFoundBooks([]);
            setMessage("Please enter a book title.");
            return;
        }

        try {
            const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(term)}&limit=20`);
            const data = await response.json();

            const matches = data.docs;

            setFoundBooks(matches);

            if (matches.length === 0) {
                setMessage(`No books found with the title "${searchTerm}".`);
            } else {
                setMessage("");
            }
        } catch (error) {
            console.log(`Error: ${error}`);
            setMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="books">
            <h1>Book Library</h1>

            {/* Buttons to filter books by genre */}
            <button className="btn btn-primary m-1" onClick={() => fetchBooks("fantasy")}>Fantasy</button>
            <button className="btn btn-primary m-1" onClick={() => fetchBooks("mystery")}>Mystery</button>
            <button className="btn btn-primary m-1" onClick={() => fetchBooks("romance")}>Romance</button>

            {/* Search box and second button */}
            <div className="search">
                <input
                className="form-control"
                    type="text"
                    placeholder="Search by title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className= "btn btn-primary" onClick={searchBook}>Search</button>
            </div>

            {/* Search result, or a "not found" message */}
            {message && <p className="message">{message}</p>}

            {foundBooks.length > 0 && (
                <div>
                    <h2>Search Result</h2>
                    <div className="book-list">
                        {foundBooks.map((book) => (
                            <BookCard key={book.key} book={book} />
                        ))}
                    </div>
                </div>
            )}

            {/* All 20 books */}
            {books.length > 0 && (
                <div>
                    <h2>All Books ({books.length})</h2>
                    <div className="book-list">
                        {books.map((book) => (
                            <BookCard key={book.key} book={book} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Books;
