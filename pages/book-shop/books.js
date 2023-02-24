let books = [];
let bagObj = {
    total: 0,
    selectedBooks: []
}
let body = document.querySelector('body');

fetch('https://raw.githubusercontent.com/EkaterinaMash/book-shop/gh-pages/pages/book-shop/books-info.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        books = data;

        createPageElements();

        for (let i = 0; i < books.length; i++) {
            createBookElement(books[i]);
        }

        addBagClickListener();
        addOrderClickListener();
    });

function createPageElements() {
    let header = document.querySelector('header');
    let page = document.querySelector('main');
    let greeting = document.createElement('div');
    let bagSection = document.createElement('section');
    let bagCloseBtn = document.createElement('button');
    let bagTitle = document.createElement('div');
    let bagImg = document.createElement('div');
    let bag = document.createElement('div');
    let total = document.createElement('div');
    let orderBtn = document.createElement('button');
    let booksSection = document.createElement('section');
    let booksList = document.createElement('ul');
    let booksListInBag = document.createElement('ul');

    bagSection.classList.add('bag-section');
    bagCloseBtn.classList.add('bag-close-btn');
    bagCloseBtn.classList.add('button');
    bagTitle.classList.add('bag-name');
    bagImg.classList.add('bag-img');
    bag.classList.add('bag');
    total.classList.add('total');
    orderBtn.classList.add('dark-button');
    orderBtn.classList.add('order-button');
    orderBtn.classList.add('button');
    booksSection.classList.add('books-section');
    booksList.classList.add('books-list');
    booksListInBag.classList.add('bag-list');

    greeting.textContent = 'Welcome to the book shop!';
    bagTitle.textContent = 'Order books';
    total.textContent = 'Total: $';
    orderBtn.textContent = 'Order';

    header.appendChild(greeting);
    bag.appendChild(bagCloseBtn);
    bag.appendChild(bagTitle);
    bag.appendChild(booksListInBag);
    bag.appendChild(total);
    bag.appendChild(orderBtn);
    bagSection.appendChild(bag);
    bagSection.appendChild(bagImg);
    page.appendChild(bagSection);
    booksSection.appendChild(booksList);
    page.appendChild(booksSection);
}

function createBookElement(bookObj) {
    let book = document.createElement('li');
    let bookPic = document.createElement('img');
    let bookCapture = document.createElement('div');
    let author = document.createElement('div');
    let bookName = document.createElement('div');
    let bookPrice = document.createElement('div');
    let bookButtons = document.createElement('div');
    let bookDescription = document.createElement('button');
    let addToBagButton = document.createElement('button');
    let popupContainer = document.createElement('div');
    let popup = document.createElement('div');
    let popupBlocker = document.createElement('div');
    let popupBookInfo = document.createElement('p');
    let closeBtn = document.createElement('button');

    book.classList.add('book');
    bookCapture.classList.add('book-capture');
    bookPic.classList.add('book-pic');
    author.classList.add('author');
    bookName.classList.add('book-name');
    bookPrice.classList.add('book-price');
    bookButtons.classList.add('book-buttons');
    bookDescription.classList.add('light-button');
    bookDescription.classList.add('button');
    addToBagButton.classList.add('dark-button');
    addToBagButton.classList.add('button');
    popupContainer.classList.add('popup-container');
    popup.classList.add('popup');
    popupBlocker.classList.add('blocker');
    closeBtn.classList.add('dark-button');
    closeBtn.classList.add('button');

    author.textContent = bookObj.author;
    bookName.textContent = bookObj.title;
    bookPrice.textContent = 'Price: $' + bookObj.price;
    bookDescription.textContent = 'Show more';
    addToBagButton.textContent = 'Add to bag';
    bookPic.setAttribute('src', bookObj.imageLink);
    bookPic.setAttribute('id', bookObj.id);
    bookPic.setAttribute('draggable', 'true');
    popupBookInfo.textContent = bookObj.description;
    closeBtn.textContent = 'Close';

    book.appendChild(bookPic);
    bookCapture.appendChild(author);
    bookCapture.appendChild(bookName);
    bookCapture.appendChild(bookPrice);
    bookButtons.appendChild(bookDescription);
    bookButtons.appendChild(addToBagButton);
    bookCapture.appendChild(bookButtons);
    popup.appendChild(popupBookInfo);
    popup.appendChild(closeBtn);
    popupContainer.appendChild(popupBlocker);
    popupContainer.appendChild(popup);
    bookCapture.appendChild(popupContainer);
    book.appendChild(bookCapture);
    document.querySelector('.books-list').appendChild(book);

    addToBagButton.onclick = function () {
        addBookElementToBag(bookObj)
    }

    addBookDragAndDrop(bookPic, bookObj);

    bookDescription.onclick = function () {
        togglePopup(popup, popupBlocker);
    }

    closeBtn.onclick = function () {
        togglePopup(popup, popupBlocker);
    }

    popupBlocker.onclick = function () {
        togglePopup(popup, popupBlocker);
    }
}

function addBookElementToBag(bookObj) {
    bagObj.selectedBooks.push(bookObj);
    bagObj.total += bookObj.price;

    let bookInBag = document.createElement('li');
    let bagTitle = document.createElement('div');
    let bagAuthor = document.createElement('div');
    let bagPrice = document.createElement('div');
    let deleteBtn = document.createElement('button');
    let totalPrice = document.querySelector('.total');

    bookInBag.classList.add('book-in-bag');
    bagTitle.classList.add('bag-title');
    bagAuthor.classList.add('bag-author');
    bagPrice.classList.add('bag-price');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.classList.add('button');

    bagTitle.textContent = bookObj.title;
    bagAuthor.textContent = bookObj.author;
    bagPrice.textContent = 'Price: $' + bookObj.price;

    bookInBag.appendChild(deleteBtn);
    bookInBag.appendChild(bagAuthor);
    bookInBag.appendChild(bagTitle);
    bookInBag.appendChild(bagPrice);
    document.querySelector('.bag-list').appendChild(bookInBag);
    totalPrice.textContent = 'Total: $' + bagObj.total;

    deleteBtn.onclick = function () {
        deleteBook(bookInBag, bagObj.selectedBooks, bookObj)
    }
}

function addBookDragAndDrop(bookPic, bookObj) {
    let bag = document.querySelector('.bag-img');

    function startDrag(ev) {
        ev.dataTransfer.setData('bookInfo', ev.target.id)
    }

    function dragBook(ev) {
        ev.preventDefault();
    }

    function dropBook(ev) {
        ev.preventDefault();
        const data = ev.dataTransfer.getData('bookInfo');

        if (data === bookObj.id) {
            addBookElementToBag(bookObj);
        }
    }

    bookPic.ondragstart = startDrag;
    bag.addEventListener('dragover', dragBook);
    bag.addEventListener('drop', dropBook);
}

function deleteBook(bookInBag, selectedBooks, bookObj) {
    bookInBag.remove();

    for (let i = 0; i < selectedBooks.length; i++) {
        if (bookObj.id === selectedBooks[i].id) {
            selectedBooks.splice(i, 1);
            bagObj.total = bagObj.total - bookObj.price;
            document.querySelector('.total').textContent = 'Total: $' + bagObj.total;
            break;
        }
    }
}

function togglePopup(popup, popupBlocker) {
    popup.classList.toggle('show');
    popupBlocker.classList.toggle('show');
    body.classList.toggle('no-scroll');
}

function addOrderClickListener() {
    document.querySelector('.order-button').onclick = function () {
        window.open('../form/form.html');
    }
}

function addBagClickListener() {
    document.querySelector('.bag-img').onclick = function () {
        document.querySelector('.bag').classList.add('show');
        document.querySelector('.bag-close-btn').onclick = closeBag;
    }
}

function closeBag() {
    document.querySelector('.bag').classList.remove('show');
}





