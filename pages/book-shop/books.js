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
        .then( data => {
            console.log(data);
            books = data;
            createPageElem();
            for (let i=0; i<data.length; i++) {
                createBookElem(data[i]);
            }
            showClosePopup();
            addBookToBag();  
            dragBookToBag(); 
            openBag();
            orderBook();  
        });
        
        function createPageElem() {
            let header = document.querySelector('header');
            let page = document.querySelector('main');
            let greeting = document.createElement('div');
            let bagSection = document.createElement('section');
            let bagCloseBtn = document.createElement('div');
            let bagTitle = document.createElement('div');
            let bagImg = document.createElement('div');
            let bag = document.createElement('div');
            let total = document.createElement('div');
            let orderBtn = document.createElement('button');
            let booksSection = document.createElement('section');

            bagSection.classList.add('bag-section');
            bagCloseBtn.classList.add('bag-close-btn');
            bagTitle.classList.add('bag-name');
            bagImg.classList.add('bag-img');
            bag.classList.add('bag');
            total.classList.add('total');
            orderBtn.classList.add('order-btn');
            orderBtn.classList.add('button');
            booksSection.classList.add('books-section');

            greeting.textContent = 'Welcome to the book shop!';
            bagTitle.textContent = 'Order books';
            total.textContent = 'Total: $';
            orderBtn.textContent = 'Order';
 
            header.appendChild(greeting);
            bag.appendChild(bagCloseBtn);
            bag.appendChild(bagTitle);
            bag.appendChild(total);
            bag.appendChild(orderBtn);
            bagSection.appendChild(bag);
            bagSection.appendChild(bagImg);
            page.appendChild(bagSection);
            page.appendChild(booksSection);
        }

        function createBookElem(obj) {
            let book = document.createElement('div');
            let bookPic = document.createElement('img');
            let bookCapture = document.createElement('div');
            let author = document.createElement('div');
            let bookName = document.createElement('div');
            let bookPrice = document.createElement('div');
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
            bookDescription.classList.add('book-info-button');
            bookDescription.classList.add('button');
            addToBagButton.classList.add('add-button');
            addToBagButton.classList.add('button');
            popupContainer.classList.add('popup-container');
            popup.classList.add('popup');
            popupBlocker.classList.add('blocker');
            closeBtn.classList.add('close-btn');
            closeBtn.classList.add('button');
        
            author.textContent = obj.author;
            bookName.textContent = obj.title;
            bookPrice.textContent = 'Price: $' + obj.price;
            bookDescription.textContent = 'Show more';
            addToBagButton.textContent = 'Add to bag';
            bookPic.setAttribute('src', obj.imageLink);
            bookPic.setAttribute('draggable', 'true');
            popupBookInfo.textContent = obj.description;
            closeBtn.textContent = 'Close';
           
            book.appendChild(bookPic);
            bookCapture.appendChild(author);
            bookCapture.appendChild(bookName);
            bookCapture.appendChild(bookPrice);
            bookCapture.appendChild(bookDescription);
            bookCapture.appendChild(addToBagButton);
            popup.appendChild(popupBookInfo);
            popup.appendChild(closeBtn);
            popupContainer.appendChild(popupBlocker);
            popupContainer.appendChild(popup);
            bookCapture.appendChild(popupContainer);
            book.appendChild(bookCapture);
            document.querySelector('.books-section').appendChild(book);
        }

        function showClosePopup() {
            let infoButtons = document.querySelectorAll('.book-info-button');
            let closeButtons = document.querySelectorAll('.close-btn');
            let popups = document.querySelectorAll('.popup');
            let blockers = document.querySelectorAll('.blocker');

            for (let i=0; i<infoButtons.length; i++) {
                infoButtons[i].onclick = function() {
                    togglePopup(i);
                };
                closeButtons[i].onclick = function() {
                    togglePopup(i);
                };
                blockers[i].onclick = function()
                {
                    togglePopup(i);
                };  
            }

            function togglePopup(n) {
                popups[n].classList.toggle('show');
                blockers[n].classList.toggle('show');
                body.classList.toggle('no-scroll');
            }
        }

        

        function addInfoToBag(n) {

            bagObj.selectedBooks.push(books[n]);
            bagObj.total += books[n].price;
            console.log('addInfoToBag', bagObj.selectedBooks);
            
            let bookInBag = document.createElement('div');
            let bagTitle = document.createElement('div');
            let bagAuthor = document.createElement('div');
            let bagPrice = document.createElement('div');
            let deleteBtn = document.createElement('div');
            
            bookInBag.classList.add('book-in-bag');
            bagTitle.classList.add('bag-title');
            bagAuthor.classList.add('bag-author');
            bagPrice.classList.add('bag-price');
            deleteBtn.classList.add('delete-btn');
            addBookRemover(bookInBag, bagObj.selectedBooks, books[n], deleteBtn);

            bagTitle.textContent = books[n].title;
            bagAuthor.textContent = books[n].author;
            bagPrice.textContent = 'Price: $' + books[n].price;
            
            bookInBag.appendChild(deleteBtn);
            bookInBag.appendChild(bagAuthor);
            bookInBag.appendChild(bagTitle);
            bookInBag.appendChild(bagPrice);
            document.querySelector('.bag').appendChild(bookInBag);
            document.querySelector('.total').textContent = 'Total: $' + bagObj.total;   
        }

        function addBookToBag() {
            let addButtons = document.querySelectorAll('.add-button');
            for (let i=0; i<addButtons.length; i++) {
                addButtons[i].onclick = function() {
                   addInfoToBag(i);
                };
                }   
        }

        function dragBookToBag() {
            let bookPics = document.querySelectorAll('.book-pic');
            let currentBookIndex;
            let bag = document.querySelector('.bag-img');
        
            for (let i=0; i<bookPics.length; i++) {
                bookPics[i].addEventListener('dragstart', function() {
                currentBookIndex = i;   
            });
            }

            function dragBook(event) {
                event.preventDefault();
                }
            function dropBook(event) {
                event.preventDefault();
                addInfoToBag(currentBookIndex);
            }

            bag.addEventListener('dragover', dragBook);
            bag.addEventListener('drop', dropBook);      
        }

        function addBookRemovers() {
           let deleteBtns = document.querySelectorAll('.delete-btn');
           let booksInBag = document.querySelectorAll('.book-in-bag');

           for (let i = 0; i < bagObj.selectedBooks.length; i++) {
            deleteBtns[i].onclick = deleteBook;

            function deleteBook(event) {
                console.log(2, i, event);
                booksInBag[i].remove();
                bagObj.total = bagObj.total - bagObj.selectedBooks[i].price;
                document.querySelector('.total').textContent = 'Total: $' + bagObj.total; 
                bagObj.selectedBooks.splice(i, 1);
                console.log(3, bagObj);
               }
           }
        }

        function orderBook() {
            document.querySelector('.order-btn').onclick = function() {
                window.open('../form/form.html');
            }
        }

        function openBag() {
            document.querySelector('.bag-img').onclick = function() {
                document.querySelector('.bag').classList.add('show');
                addBookRemovers();   
                closeBag();
            }  
        }

        function closeBag() {
            document.querySelector('.bag-close-btn').onclick = function() {
                document.querySelector('.bag').classList.remove('show'); 
            }
        } 




