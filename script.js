
fetch('https://raw.githubusercontent.com/EkaterinaMash/book-shop/gh-pages/books-info.json') 
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            for (let i=0; i<data.length; i++) {
                createBookElem(data[i]);
            }
            showClosePopup();
        });

        function createBookElem(obj) {
            let book = document.createElement('div');
            let bookPic = document.createElement('img');
            let bookCapture = document.createElement('div');
            let author = document.createElement('div');
            let bookName = document.createElement('div');
            let bookPrice = document.createElement('div');
            let bookDescription = document.createElement('button');
            let addToBagButton = document.createElement('button');
            let popup = document.createElement('div');
            let popupBookInfo = document.createElement('p');
            let closeBtn = document.createElement('button');
           /* let greeting = document.createElement('div');
            let bag = document.createElement('img'); */

            book.classList.add('book');
            bookCapture.classList.add('book-capture');
            author.classList.add('author');
            bookName.classList.add('book-name');
            bookPrice.classList.add('book-price');
            bookDescription.classList.add('book-info-button');
            addToBagButton.classList.add('add-button');
            popup.classList.add('popup');
            closeBtn.classList.add('close');
          /*  greeting.classList.add('greeting');
            bag.classList.add('bag'); */
            
            author.textContent = obj.author;
            bookName.textContent = obj.title;
            bookPrice.textContent = 'Price: $' + obj.price;
            bookDescription.textContent = 'Show more';
            addToBagButton.textContent = 'Add to bag';
            bookPic.setAttribute('src', obj.imageLink);
            popupBookInfo.textContent = obj.description;
            closeBtn.textContent = 'Close';
           /* greeting.textContent = 'Welcome to the book shop!';
            bag.setAttribute('src', './icons/bag-icon'); */
        
            let page = document.querySelector('main');
            let header = document.querySelector('header');
            
          /* header.appendChild(greeting);
            header.appendChild(bag); */
            book.appendChild(bookPic);
            bookCapture.appendChild(author);
            bookCapture.appendChild(bookName);
            bookCapture.appendChild(bookPrice);
            bookCapture.appendChild(bookDescription);
            bookCapture.appendChild(addToBagButton);
            popup.appendChild(popupBookInfo);
            popup.appendChild(closeBtn);
            bookCapture.appendChild(popup);
            book.appendChild(bookCapture);
            page.appendChild(book);
        }

        function showClosePopup() {
            let infoButtons = document.querySelectorAll('.book-info-button');
            let closeButtons = document.querySelectorAll('.close');
            let popups = document.querySelectorAll('.popup');
            for (let i=0; i<infoButtons.length; i++) {
                infoButtons[i].onclick = function() {
                    popups[i].classList.add('show');
                    infoButtons[i].classList.add('hide');
                };
                closeButtons[i].onclick = function() {
                    popups[i].classList.remove('show');
                    infoButtons[i].classList.remove('hide');
                }
            }
        }



