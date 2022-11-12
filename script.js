
fetch('https://raw.githubusercontent.com/EkaterinaMash/book-shop/gh-pages/books-info.json') 
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            for (let i=0; i<data.length; i++) {
                createBookElem(data[i]);
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

            book.classList.add('book');
            bookCapture.classList.add('book-capture');
            author.classList.add('author');
            bookName.classList.add('book-name');
            bookPrice.classList.add('book-price');
            bookDescription.classList.add('book-description');

            author.textContent = obj.author;
            bookName.textContent = obj.title;
            bookPrice.textContent = obj.price;
            bookDescription.textContent = 'Show more';
            bookPic.setAttribute('src', obj.imageLink);
        
            let page = document.querySelector('main');
            
            book.appendChild(bookPic);
            bookCapture.appendChild(author);
            bookCapture.appendChild(bookName);
            bookCapture.appendChild(bookPrice);
            bookCapture.appendChild(bookDescription);
            book.appendChild(bookCapture);
            page.appendChild(book);
        }

