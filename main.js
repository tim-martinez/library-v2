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
Book.prototype.addBook = function() {
    myLibrary.push(this);
};

//manually add default books to myLibrary
default1.addBook();
default2.addBook();

//display Books in container
const container = document.querySelector('.container');
function displayBooks(library){
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
            element.style.backgroundColor = "gold";
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
        while (container.firstChild){
            container.removeChild(container.firstChild);
        };
        displayBooks(myLibrary);
    };
    //status buttons
    if(event.target.classList.contains('status')){
        let index = event.target.dataset.index;
        myLibrary[index].changeStatus(event.target);
    };
});

