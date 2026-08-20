const express = require("express");

const app = express();

app.use(express.json());

let books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 1500
    },
    {
        id: 2,
        title: "Atomic Habits",
        author: "James Clear",
        price: 2000
    }
];

app.get("/", (req, res) => {
    res.send("Book Store API is running");
});

app.get("/api/books", (req, res) => {
    res.json(books);
});

app.get("/api/books/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const book = books.find(book => book.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    res.json(book);
});

app.post("/api/books", (req, res) => {
    const { title, author, price } = req.body;

    const newBook = {
        id: books.length + 1,
        title,
        author,
        price
    };

    books.push(newBook);

    res.status(201).json(newBook);
});

app.put("/api/books/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const book = books.find(book => book.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    book.title = req.body.title;
    book.author = req.body.author;
    book.price = req.body.price;

    res.json(book);
});

app.delete("/api/books/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const bookIndex = books.findIndex(book => book.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const deletedBook = books.splice(bookIndex, 1);

    res.json({
        message: "Book deleted successfully",
        book: deletedBook[0]
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});