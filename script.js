const form = document.querySelector(".book-form");
const submitBtn = document.getElementById("submit");
const dialog = document.querySelector(".book-dialog");
const newBookBtn = document.querySelector(".new-book-btn");
const closeBtn = document.querySelector(".close-dialog");
const libraryContainer = document.querySelector(".book-grid");

const myLibrary = [];

function Book(title, author, pages, isRead, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = id;
}

Book.prototype.markUnread = function () {
  if (this.isRead) {
    this.isRead = false;
  } else {
    this.isRead = true;
  }
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}
function removeBookFromLibrary(id) {
  const bookIndex = myLibrary.findIndex((b) => {
    return b.id === id;
  });
  myLibrary.splice(bookIndex, 1);
}
function createCard(book) {
  const card = document.createElement("article");
  card.classList.add("book-card");

  const info = document.createElement("div");
  info.classList.add("book-info");
  card.appendChild(info);
  const title = document.createElement("h3");
  info.appendChild(title);
  const author = document.createElement("p");
  author.classList.add("author");
  info.appendChild(author);

  const details = document.createElement("div");
  details.classList.add("book-details");
  info.appendChild(details);
  const pages = document.createElement("span");
  details.appendChild(pages);
  const status = document.createElement("span");
  status.classList.add("status", "read");
  details.appendChild(status);
  const actions = document.createElement("div");
  actions.classList.add("book-actions");
  card.appendChild(actions);
  const toggleRead = document.createElement("button");
  toggleRead.classList.add("toggle-read");
  actions.appendChild(toggleRead);
  const remove = document.createElement("button");
  remove.classList.add("remove-book");
  actions.appendChild(remove);
  libraryContainer.appendChild(card);
  title.textContent = book.title;
  author.textContent = book.author;
  card.dataset.id = book.id;
  pages.textContent = book.pages + " pages";
  status.textContent = book.isRead ? "Read" : "Not read";
  toggleRead.textContent = book.isRead ? "Mark unread" : "Mark read";
  remove.textContent = "Remove";
  toggleRead.addEventListener("click", (e) => {
    const id = e.target.closest(".book-card").getAttribute("data-id");
    const book = myLibrary.find((b) => {
      return b.id == id;
    });

    book.markUnread();
    status.textContent = book.isRead ? "Read" : "Not read";
    toggleRead.textContent = book.isRead ? "Mark unread" : "Mark read";
  });
  remove.addEventListener("click", (e) => {
    const id = e.target.closest(".book-card").getAttribute("data-id");
    removeBookFromLibrary(id);
    renderBooks();
  });
}
function renderBooks() {
  const counter = document.querySelector(".book-count");
  ((counter.innerHTML = myLibrary.length), +" books");
  libraryContainer.innerHTML = "";
  myLibrary.forEach((book) => {
    createCard(book);
  });
}

newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const book = new Book(
    data.get("title"),
    data.get("author"),
    data.get("pages"),
    data.get("read"),
    crypto.randomUUID(),
  );
  addBookToLibrary(book);
  renderBooks();
  dialog.close();
  console.log(book);
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});
