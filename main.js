// // Inheritance
// function Person(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
// }

// Person.prototype.greeting = function (){
//     return `Hello there ${this.firstName} ${this.lastName}`;
// }

// // const person1 = Person('John','Doe');

// function Customer(firstName,lastName,phone,membership) {
//     Person.call(this, firstName,lastName);
//     this.phone = phone;
//     this.membership = membership;
// }

// // Inherit the Person prototype methods
// Customer.prototype = Object.create(Person.prototype);

// // Make customer.prototype return Customer()
// Customer.prototype.constructor = Customer;

// const customer1 = new Customer('Tom','Smith','555-555-555','Standard');

// // console.log(customer1);

// // Customer greeting
// Customer.prototype.greeting = function (){
//     return `Hello there ${this.firstName} ${this.lastName} welcome to our company`;
// }

// console.log(customer1.greeting());


// Book constructor
function Book(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI(){

}

UI.prototype.addBookToLIst = function (book) {
    const list = document.getElementById('book-list');

    const tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(tr);
}

UI.prototype.showAlert = function(message, className){
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

UI.prototype.deleteBook = function(target){
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

UI.prototype.clearFields = function() {
    document.getElementById('title').value = '',
    document.getElementById('author').value = '',
    document.getElementById('isbn').value = '';
}
// Event Listeners

document.getElementById('book-form').addEventListener('submit', function(e){
    e.preventDefault();
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    const book = new Book(title,author,isbn);

    const ui = new UI();

    // Validate
    if(title == '' || author == '' || isbn == ''){
        // Error 
        ui.showAlert('Please fill all fields','error');
    }else{
        ui.addBookToLIst(book);
        ui.clearFields();
        ui.showAlert('You have successfuly added new book','success');
    }
});

document.getElementById('book-list').addEventListener('click', (e) => {
    e.preventDefault();

    const ui = new UI();

    ui.deleteBook(e.target);

    ui.showAlert('Book Removed!','success');
});