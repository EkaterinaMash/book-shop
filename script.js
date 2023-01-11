let books = [];
let bag = {
    total: 0,
    selectedBooks: [],
}

fetch('https://raw.githubusercontent.com/EkaterinaMash/book-shop/gh-pages/books-info.json') 
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
            AddBookToBag(); // big Add   
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

            greeting.classList.add('greeting');
            bagSection.classList.add('bag-section');
            bagCloseBtn.classList.add('bag-close-btn');
            bagTitle.classList.add('bag-name');
            bagImg.classList.add('bag-img');
            bag.classList.add('bag');
            total.classList.add('total');
            orderBtn.classList.add('order-btn');
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
            addToBagButton.classList.add('add-button');
            popupContainer.classList.add('popup-container');
            popup.classList.add('popup');
            popupBlocker.classList.add('popup-blocker');
            closeBtn.classList.add('close');
        
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
            let closeButtons = document.querySelectorAll('.close');
            let popups = document.querySelectorAll('.popup');
            let blockers = document.querySelectorAll('.popup-blocker');
            for (let i=0; i<infoButtons.length; i++) {
                infoButtons[i].onclick = openPopup;
                closeButtons[i].onclick = closePopup;
                blockers[i].onclick = closePopup;

                function openPopup() {
                    popups[i].classList.add('show');
                    blockers[i].classList.add('show');
                    document.querySelector('body').classList.add('no-scroll');
                }
        
                function closePopup() {
                    popups[i].classList.remove('show');
                    blockers[i].classList.remove('show');
                    document.querySelector('body').classList.remove('no-scroll');
                }
            }
        }


        function AddBookToBag() {
            let addButtons = document.querySelectorAll('.add-button');
            /*let myBooks = document.querySelectorAll('.book-capture'); */
            for (let i=0; i<addButtons.length; i++) {
                addButtons[i].onclick = function() {
                   addInfoToBag(i);
                };
                }   
        }

        function dragBookToBag() {
            let bookPics = document.querySelectorAll('.book-pic');
            let bag = document.querySelector('.bag-img');
            let currentBookIndex;
        
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

        function addToBag() {
            let currentBook = document.querySelector('.book-capture.selected');
            let currentBookElements = currentBook.childNodes;
            for (let i=0; i<currentBookElements.length; i++) {
                currentBookElements[i].classList.add('in-bag');
            }
            let addedAuthor = document.querySelector('.author.in-bag').cloneNode(true);
            let addedBook = document.querySelector('.book-name.in-bag').cloneNode(true);
            let addedPrice = document.querySelector('.book-price.in-bag').cloneNode(true);
            let bookInBag = document.createElement('div');
            let deleteBtn = document.createElement('div');

            bookInBag.classList.add('book-in-bag');
            deleteBtn.classList.add('delete-btn');

            bookInBag.appendChild(deleteBtn);
            bookInBag.appendChild(addedAuthor);
            bookInBag.appendChild(addedBook);
            bookInBag.appendChild(addedPrice);

            document.querySelector('.bag').appendChild(bookInBag);
            document.querySelector('.total').textContent = 'Total: $' + addedPrice.nodeValue;
        }

        function addInfoToBag(n) {
            bag.selectedBooks.push(books[n]);
            bag.total += books[n].price;
            
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

            bagTitle.textContent = books[n].title;
            bagAuthor.textContent = books[n].author;
            bagPrice.textContent = 'Price: $' + books[n].price;
            
            bookInBag.appendChild(deleteBtn);
            bookInBag.appendChild(bagAuthor);
            bookInBag.appendChild(bagTitle);
            bookInBag.appendChild(bagPrice);
            document.querySelector('.bag').appendChild(bookInBag);
            document.querySelector('.total').textContent = 'Total: $' + bag.total;   
        } /* если объявить функцию вне цикла? */
        

        /*
        function dragBookToBag() {
            let bookPics = document.querySelectorAll('.book-pic');
            window.addEventListener('DOMContentLoaded', function() {
                for (let i=0; i<bookPics.length; i++) {
                    bookPics[i].addEventListener('dragstart', function(event) {
                        event.dataTransfer.setData('text/plain', event.target.id);
                        bookPics[i].classList.add('drag');
                        console.log(5, dataTransfer);
                    })
                }
            })
        } */

        function addBookRemover() {
           let deleteBtns = document.querySelectorAll('.delete-btn');
           let booksInBag = document.querySelectorAll('.book-in-bag');
           for (let i=0; i<deleteBtns.length; i++) {
            deleteBtns[i].onclick = deleteBook;
            function deleteBook() {
                booksInBag[i].remove();
                bag.total = bag.total - bag.selectedBooks[i].price;
                document.querySelector('.total').textContent = 'Total: $' + bag.total; 
               }
           }
        }

        function orderBook() {
            document.querySelector('.order-btn').onclick = function() {
                window.open('form.html');
            }
        }

        function openBag() {
            document.querySelector('.bag-img').onclick = function() {
                document.querySelector('.bag').classList.add('show');
                addBookRemover();   
                closeBag();
            }  
        }

        
        function closeBag() {
            document.querySelector('.bag-close-btn').onclick = function() {
                document.querySelector('.bag').classList.remove('show'); 
            }
        } 




