// get title
let title = ""
document.getElementById("title").addEventListener("change", (e) => {
    title = e.target.value
});

// get author
let author = ""
document.getElementById("author").addEventListener("change", (e) => {
    author = e.target.value
});

// get isbn
let isbn = 0
document.getElementById("isbn").addEventListener("change", (e) => {
    isbn = e.target.value
});

// add row in table
function addRowInTable(book){
    const tablerow = document.getElementById("book-table")

    let row = document.createElement("tr");
    
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <button class="delete">X</button>`

    tablerow.appendChild(row);
}

// showing alert notification while loading books, adding book and removing book
function showAlert(message, type){
    let div = document.createElement('div')
    let delay;

    if(type === "success"){
        div.classList.add("success", "alert-message")
        delay = 1000
    }
    else if(type === "failure"){
        div.classList.add("failure", "alert-message")
        delay = 2000
    }
    else{   
        div.classList.add("loading", "alert-message")
        delay = 100
    }

    div.innerText = message
    const tar = document.getElementById('form')
    tar.insertBefore(div, tar.children[0]);

    setTimeout(() => {
        div.remove()
    }, delay)
}

// Add row in the table
document.getElementById("add-book-btn").addEventListener("click", () => {
    if(title === "" || author === "" || isbn === 0){
        alert("Fill details");
        return;
    }
    
    const book = {
        title: title,
        author: author,
        isbn: isbn
    }

    addRowInTable(book);

    if(localStorage.getItem('books') !== null){
        let books = JSON.parse(localStorage.getItem('books'))
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books));
    }
    else{
        let books = []
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books));
    }

    showAlert("Book added", "success");

    document.getElementById("title").value = title = ""
    document.getElementById("author").value = author = ""
    document.getElementById("isbn").value = isbn = ""
})

// getting books data from localstorage and loading books and form table 
document.addEventListener("DOMContentLoaded", () => {
    showAlert("Books loading!!!", "loading");

    let books;
    if(localStorage.getItem('books') === null){
        books = []
    }
    else{
        books = JSON.parse(localStorage.getItem('books'))
    }

    books.map((book) => {
        addRowInTable(book);
    })
})

// Remove row from table on clicking X
document.getElementById("book-table").addEventListener("click", (e) => {
    if(e.target.innerText === "X"){
        let isbn = e.target.parentElement.children[2].innerText;
        let books = JSON.parse(localStorage.getItem('books'))
        books = books.filter((book) => book.isbn !== isbn)
        localStorage.setItem('books', JSON.stringify(books))
        e.target.parentElement.remove()
        showAlert("Book removed", "failure");
    }
})
