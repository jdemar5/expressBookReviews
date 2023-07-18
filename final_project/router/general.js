const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  new Promise((resolve, reject) => {
    res.send(JSON.stringify(books,null,4));
  });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  new Promise((resolve, reject) => {
    res.send(JSON.stringify(books[isbn]));
  });
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let author = req.params.author;
  new Promise((resolve, reject) => {
    for (const key in books) {
      if (books[key].author === author) {
        res.send(JSON.stringify(books[key]));
      }
    }
  });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let title = req.params.title;
  new Promise((resolve, reject) => {
    for (const key in books) {
      if (books[key].title === title) {
        res.send(JSON.stringify(books[key]));
      }
    }
  });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  for (const key in books) {
    if (key === isbn) {
      res.send(JSON.stringify(books[key]));
    }
  }
});

module.exports.general = public_users;