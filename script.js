const bookList = document.querySelector("#book-list");
const addBookForm = document.querySelector("#add-book-form")
const addBookDialog = document.querySelector("#add-book-dialog");
const closeBookDialogButton = document.querySelector("#close-book-dialog-btn");
const submitBookButton = document.querySelector("#submit-book-btn");
const addBookButton = document.querySelector("#add-book-btn");
const formTitle = document.querySelector("#title");
const formAuthor = document.querySelector("#author");
const formPages = document.querySelector("#pages");
const formRead = document.querySelector("#read");

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

// Add book to library and update display
function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayAllBooks()
}

function displayAllBooks() {
    clearDisplay();
    for (let book of myLibrary) {
        displayBook(book.id);
    }
}

// Display book with the given id
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
    title.classList.add("title");
    displayBook.appendChild(title);

    let author = document.createElement("div");
    author.textContent = book.author;
    author.classList.add("author");
    displayBook.appendChild(author);

    let pages = document.createElement("div");
    pages.textContent = book.pages;
    pages.classList.add("pages");
    displayBook.appendChild(pages);

    let readButton = document.createElement("button");
    if (book.read) {
        readButton.textContent = "Read";
        readButton.classList.add("read");
    }else {
        readButton.textContent = "Not read";
        readButton.classList.add("not-read");
    }
    displayBook.appendChild(readButton);

    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove");
    displayBook.appendChild(removeButton);

    // Event Listener for read and remove button
    readButton.addEventListener("click", e => {
        toggleReadStatus(id, readButton);
    })

    removeButton.addEventListener("click", e => {
        removeBook(displayBook.id);
    })
}

function toggleReadStatus(id, button) {
    let book = findBookInLibrary(id);
    if (book !== null) {
        book.read = !book.read;
    }else {
        return;
    }
    if (button.classList.contains("read")) {
        button.classList.remove("read");
        button.classList.add("not-read")
        button.textContent = "Not read";
    } else {
        button.classList.remove("not-read");
        button.classList.add("read")
        button.textContent = "Read";
    }
}

// Remove all books from the display
function clearDisplay() {
    for (let book of document.querySelectorAll(".book-item")) {
        book.remove();
    }
}

function removeAllBooks() {
    clearDisplay();
    myLibrary.splice(0, myLibrary.length);
}

function removeBook(id) {
    let book = findBookOnDisplay(id);
    if (book !== null) {
        book.remove();
    }
    book = findBookInLibrary(id);
    if (book !== null) {
        myLibrary.splice(myLibrary.findIndex(x => x === book), 1);
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

addBookToLibrary("The Lord Of The Rings One Volume", "J.R.R. Tolkien", 100, false);
addBookToLibrary("Harry Potter and the Goblet of Fire", "J. K. Rowling", 200, true);
addBookToLibrary("Star Wars: Light of the Jedi (The High Republic)", "Charles Soule", 300, false);
addBookToLibrary("Star Wars: The High Republic: The Great Jedi Rescue", "Cavan Scott", 400, true);

addBookButton.addEventListener("click", e => {
    addBookDialog.showModal();
})

closeBookDialogButton.addEventListener("click", e => {
    addBookDialog.close();
})

addBookForm.addEventListener("submit", function(e) {
  e.preventDefault();
  addBookToLibrary(formTitle.value, formAuthor.value, parseInt(formPages.value), formRead.checked);
  formTitle.value = "";
  formAuthor.value = "";
  formPages.value = "";
  formRead.checked = false;
  addBookDialog.close();
})