
fetch('https://raw.githubusercontent.com/EkaterinaMash/book-shop/gh-pages/books-info.json') 
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            for (let i=0; i<data.length; i++) {
                createBookElem(data[i]);
                document.querySelector('.book-info-button').onclick = showPopupBookInfo;
                document.querySelector('.close').onclick = closePopup;
            }
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
            let popupBookInfo = document.createElement('div');
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
            popupBookInfo.classList.add('popup');
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
            popupBookInfo.appendChild(closeBtn);
            bookCapture.appendChild(popupBookInfo);
            book.appendChild(bookCapture);
            page.appendChild(book);
        }

        function showPopupBookInfo() {
            document.querySelector('.popup').classList.add('show');
        }

        function closePopup() {
            document.querySelector('.popup').classList.remove('show');
        }

