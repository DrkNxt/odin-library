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

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();
    }
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

// Create display card for book with the given id
function displayBook(id) {
    let book = findBookInLibrary(id);
    if (book === null) {
        return;
    }
    let displayBook = document.createElement("div");
    displayBook.classList.add("book-item");
    displayBook.id = book.id;
    bookList.appendChild(displayBook);

    // Title div
    let title = document.createElement("div");
    title.textContent = book.title;
    title.classList.add("title");
    displayBook.appendChild(title);

    // Author div
    let authorContainer = document.createElement("div");
    authorContainer.classList.add("author-container");
    displayBook.appendChild(authorContainer);

    let authorIcon = document.createElement("span");
    authorIcon.classList.add("iconify");
    authorIcon.dataset.icon = "mdi-school";
    authorContainer.appendChild(authorIcon);

    let author = document.createElement("span");
    author.textContent = book.author;
    author.classList.add("author");
    authorContainer.appendChild(author);

    // Page count div
    let pagesContainer = document.createElement("div");
    pagesContainer.classList.add("pages-container");
    displayBook.appendChild(pagesContainer);

    let pagesIcon = document.createElement("span");
    pagesIcon.classList.add("iconify");
    pagesIcon.dataset.icon = "mdi-book-open-page-variant";
    pagesContainer.appendChild(pagesIcon);

    let pages = document.createElement("span");
    pages.textContent = book.pages;
    pages.classList.add("pages");
    pagesContainer.appendChild(pages);

    // Button container
    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    displayBook.appendChild(buttonContainer);

    // Read button
    let readButton = document.createElement("button");
    if (book.read) {
        readButton.textContent = "Read";
        readButton.classList.add("read");
    }else {
        readButton.textContent = "Not read";
        readButton.classList.add("not-read");
    }
    buttonContainer.appendChild(readButton);

    // Remove button
    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove");
    buttonContainer.appendChild(removeButton);

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
    formTitle.value = "";
    formAuthor.value = "";
    formPages.value = "";
    formRead.checked = false;
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