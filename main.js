const myLibrary = [];
const default1 = new Book('Rick Rubin','The Creative Act', '256', 'In Progress');
const default2 = new Book('Matt Hoffman', 'The Ride of My Life', '512', 'Finished');

//Book object constructor
function Book(author,title,pages,status) {
    this.author = author;
    this.title = '"' + title + '"';
    this.pages = pages + ' pages';
    this.status = status;
};

//addBook method defined on Book Prototype
// Book.prototype.addBook = function() {
//     myLibrary.push(this);
// };

function addBook(newBook) {
    myLibrary.push(newBook);
};
//manually add default books to myLibrary
addBook(default1);
addBook(default2);

//display Books in container
const container = document.querySelector('.container');
function displayBooks(library){
    while (container.firstChild){
        container.removeChild(container.firstChild);
    };
    library.forEach((element, index) => {
        const card = document.createElement('div');
        card.classList = 'card';
        const keys = Object.keys(element);
        keys.forEach(key => {
            const item = document.createElement('div');
            const anchor = document.createElement('a');
            if (key === 'status'){
                anchor.textContent = element[key];
                anchor.setAttribute('data-index', index);
                anchor.classList.add('status');
                anchor.href = '#';
                card.appendChild(anchor);
            } else {
            item.textContent = element[key];
            card.appendChild(item);
            };
        });
        //add remove button and set data-index to index of array
        const removeBtn = document.createElement('a');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove');
        removeBtn.setAttribute('data-index', index);
        removeBtn.href = '#';

        card.appendChild(removeBtn);
        container.appendChild(card);
    });
    if (myLibrary.length === 0){
        container.innerHTML = '<p>Click Add Book to get started</p>';
    };
    statusColor();
};

displayBooks(myLibrary);

//change color of status buttons
function statusColor (){
    const statusBtn = document.querySelectorAll('.status');
    statusBtn.forEach(element => {   
        if (element.innerHTML === 'Finished'){
            element.style.backgroundColor = "green";
        } else {
            element.style.backgroundColor = "#bda100";
        };
    });
};

//change book status function declared on Book prototype
Book.prototype.changeStatus = function (statusBtn) {
    if (this.status === 'Finished'){
        this.status = 'In Progress';
        statusBtn.textContent = 'In Progress';
        statusBtn.style.backgroundColor = 'gold';
    } else {
        this.status = 'Finished';
        statusBtn.textContent = 'Finished';
        statusBtn.style.backgroundColor = 'green';
    };
};

//event listeners for container elements
container.addEventListener('click', (event) =>{
    //remove buttons
    if(event.target.classList.contains('remove')){
        let index = event.target.dataset.index;
        myLibrary.splice(index, 1);
        displayBooks(myLibrary);
    };
    //status buttons
    if(event.target.classList.contains('status')){
        let index = event.target.dataset.index;
        myLibrary[index].changeStatus(event.target);
    };
});



//add book button
const addBtn = document.querySelector('#addBtn');
const dialog = document.querySelector('#modal');
const saveBtn = document.querySelector('#saveBtn');

//show dialog on click
addBtn.addEventListener('click', () => {
    dialog.showModal();
});

const form = document.querySelector('form');


//handle submit button
saveBtn.addEventListener('click', (event) => {
    if (form.checkValidity()) {
        event.preventDefault();
        const author = document.querySelector('#author').value;
        const title = document.querySelector('#title').value;
        const pages = document.querySelector('#pages').value;
        const status = document.querySelector('#statusSelect').value;
        const newBook = new Book(author,title,pages, status);
        addBook(newBook);
        displayBooks(myLibrary);
        form.reset();
        dialog.close();
    };
});