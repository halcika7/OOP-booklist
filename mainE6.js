class Book{
    constructor(title,author,isbn,img){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.img = img;
    }
}

class UI{
    static addBookToList(book){
        const list = document.getElementById('book-list');

        const tr = document.createElement('tr');
    
        tr.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><img src="${book.img}" width="50" height="50"></td>
            <td><a href="#" class="delete">X</a></td>
        `;
    
        list.appendChild(tr);

    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
    
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
    
        container.insertBefore(div,form);
    
        setTimeout(function(){
            document.querySelector('.alert').remove();
        },3000)
    }

    static deleteBook(target){
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    static clearFields(){
        document.getElementById('title').value = '',
        document.getElementById('author').value = '',
        document.getElementById('isbn').value = '';
    }
}

class Store{
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        }else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks(){
        const books = Store.getBooks();
        books.forEach(item => {
            UI.addBookToList(item);
        })
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((item,index) => {
            if(item.isbn === isbn){
                books.splice(index,1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

document.getElementById('book-form').addEventListener('submit', function(e){
    e.preventDefault();
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;
          img = document.getElementById('img');
    let imgUrl;

    readURL(img,(response) => {
        imgUrl = response;
    });

    setTimeout(function(){
        const book = new Book(title,author,isbn,imgUrl);

        // Validate
        if(title == '' || author == '' || isbn == ''){
            // Error 
            UI.showAlert('Please fill all fields','error');
        }else{
            UI.addBookToList(book);
            Store.addBook(book);
            UI.clearFields();
            UI.showAlert('You have successfuly added new book','success');
        }
    },5);
});

document.getElementById('book-list').addEventListener('click', (e) => {
    e.preventDefault();

    UI.deleteBook(e.target);

    Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

    UI.showAlert('Book Removed!','success');
});

document.addEventListener('DOMContentLoaded',Store.displayBooks);

function readURL(input,callback) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            callback(reader.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}
