const bookList = document.querySelector("#book-list")

const myLibrary = [];

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("Must use the 'new' operator to call a constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayAllBooks()
}

function displayAllBooks() {
    removeAllBooks();
    for (let book of myLibrary) {
        displayBook(book.id);
    }
}

function displayBook(id) {
    let book = findBookInLibrary(id);
    if (book === null) {
        return;
    }
    let displayBook = document.createElement("div");
    displayBook.classList.add("book-item");
    displayBook.id = book.id;
    bookList.appendChild(displayBook);

    let title = document.createElement("div");
    title.textContent = book.title;
    title.classList.add("title")
    displayBook.appendChild(title);

    let author = document.createElement("div");
    author.textContent = book.author;
    author.classList.add("author")
    displayBook.appendChild(author);

    let pages = document.createElement("div");
    pages.textContent = book.pages;
    pages.classList.add("pages")
    displayBook.appendChild(pages);

    let read = document.createElement("button");
    if (book.read) {
        read.textContent = "Read";
        read.classList.add("read")
    }else {
        read.textContent = "Not read";
        read.classList.add("not-read")
    }
    displayBook.appendChild(read);
}

function removeAllBooks() {
    for (let book of document.querySelectorAll(".book-item")) {
        book.remove();
    }
}

function removeBook(id) {
    let book = findBookOnDisplay(id);
    if (book !== null) {
        book.remove();
    }
}

function findBookInLibrary(id) {
    for (let book of myLibrary) {
        if (book.id === id) {
            return book;
        }
    }
    console.log(`findBookInLibrary: Book with id ${id} not found`);
    return null;
}

function findBookOnDisplay(id) {
    for (let book of document.querySelectorAll(".book-item")) {
        if (book.id === id) {
            return book;
        }
    }
    console.log(`findBookOnDisplay: Book with id ${id} not found`);
    return null;
}

addBookToLibrary("Book1", "Author1", 100, true);
addBookToLibrary("Book2", "Author2", 200, false);
addBookToLibrary("Book3", "Author3", 300, false);
addBookToLibrary("Book4", "Author4", 400, true);