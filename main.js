const myLibrary = [];
const default1 = new Book('Rick Rubin','The Creative Act', '256', 'In Progress');
const default2 = new Book('Matt Hoffman', 'The Ride of My Life', '512', 'Finished');
const default3 = new Book('Matt Hoffman', 'The Ride of My Life', '512', 'Finished');
const default4 = new Book('Matt Hoffman', 'The Ride of My Life', '512', 'Finished');
const default5 = new Book('Matt Hoffman', 'The Ride of My Life', '512', 'Finished');

//Book constructor
function Book(author,title,pages,status) {
    this.author = author;
    this.title = '"' + title + '"';
    this.pages = pages + ' pages';
    this.status = status;
};

//addBook method defined on Book Prototype
Book.prototype.addBook = function() {
    myLibrary.push(this);
};

//manually add first to default boooks
default1.addBook();
default2.addBook();
default3.addBook();
default4.addBook();
default5.addBook();


//create card and assign class
const container = document.querySelector('.container');


//generate cards for each book
function displayBooks(library){

    library.forEach(element => {

        const card = document.createElement('div');
        card.classList = 'card';

        const keys = Object.keys(element);
        keys.forEach(key => {
            const item = document.createElement('div');
            item.textContent = element[key];
            card.appendChild(item);
        });
        container.appendChild(card);
    });
};

displayBooks(myLibrary);