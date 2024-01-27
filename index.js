const express = require("express");
const books = require("./MOCK_DATA-2.json");
const fs = require("fs");

const app = express();

app.use(express.json()); // this is used when we pass something in thre body of the req

const PORT = 8080;

// CRUD apis

// read api

app.get("/books", (req, res) => {
  return res.json(books);
});

app.get("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((book) => book.id === id);
  return res.json(book);
});

// create/ add a book into the file or mock_data

app.post("/books", (req, res) => {
  const book = req.body;
  book.id = books.length + 1;

  books.push(book);

  //clean the file and rewrite it using the modified books array

  fs.writeFile("./MOCK_DATA-2.json", JSON.stringify(books), (err) => {
    if (err) {
      console.log(err);
      return res.json("error bro!!!! :(");
    }
    return res.json({ status: "Inserted" });
  });
});

app.listen(PORT, () => {
  console.log(`Application started on port - ${PORT}`);
});
