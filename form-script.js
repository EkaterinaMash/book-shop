function setMinDeliveryDate() {
    let minDate = new Date();
    minDate.setDate(minDate.getDate()+1);
    let minYear = minDate.getFullYear();
    let minMonth = minDate.getMonth() + 1;
    let minDay = minDate.getDate();
    let deliveryDate = document.getElementById('d-date');
    deliveryDate.setAttribute('min', `${minYear}-${minMonth}-${minDay}`); 
}

setMinDeliveryDate();

function setFlatNumberPattern() {
    let flatNumber = document.getElementById('flat');
    flatNumber.addEventListener('input', function(event) {
        if (flatNumber.value[0] === '-') {
            console.log(flatNumber.validity);
            flatNumber.validity.valid = false;
            console.log(flatNumber.validity.valid);
        };
    });   
}

let inputFields = document.querySelectorAll('.checked');
let errorFields = document.querySelectorAll('.error');
let orderBtn = document.querySelector('.order-btn');
let input1 = document.getElementById('name');
let formInfo = document.querySelector('form');
let giftCheckboxes = document.querySelectorAll('.gift-checkbox');

/*
input1.addEventListener('input', function(event) {
        console.log(input1.value, input1.validity.customError, input1.validity, input1.checkValidity());
        input1.setCustomValidity('');
    if (!input1.validity.valid) {
        input1.setCustomValidity('err');
        console.log(1);
    } else {
        input1.setCustomValidity('');
        console.log(2);
    }
    input1.reportValidity();
}); */
/*
for (let i=0; i<inputFields.length; i++) {    
    inputFields[i].addEventListener('input', function(event) {
     event.preventDefault(); 
        if (inputFields[i].checkValidity()) {
        
            errorFields[i].classList.remove('active');
         inputFields[i].setCustomValidity('');  
        } else {           
            errorFields[i].classList.add('active');
        
          inputFields[i].setCustomValidity('The field is invalid');
        } 
        inputFields[i].reportValidity();
    });
} */

/* submitBtn.addEventListener('submit', function(event) {
    for (let i=0; i<inputFields.length; i++) {
        if (!inputFields[i].checkValidity()) {
            console.log('submit')
            event.preventDefault();
            inputFields[i].setCustomValidity('The field is invalid');
            inputFields[i].reportValidity();   
        } else {
            console.log(33);
            alert(`The order created. The delivery address is ${address}. Customer ${userName}`);
        }
    }
}) */
function openPopup(popup, blocker) {
    popup.classList.add('show');
    blocker.classList.add('show');
}

function closePopup(popup, blocker) {
    popup.classList.remove('show');
    blocker.classList.remove('show');
}

let popupGifts = document.querySelector('.gifts-popup');
let blockerGifts = document.querySelector('.gifts-blocker');

function limitCheckedGifts() {    
    let maxChecked = 2;
    for (let i=0; i<giftCheckboxes.length; i++) {
        giftCheckboxes[i].onclick = function() {
            let count = 0;
            for (let i=0; i<giftCheckboxes.length; i++) {
                if (giftCheckboxes[i].checked) {
                    count += 1;
                } 
            }
            if (count > maxChecked) {
                openPopup(popupGifts, blockerGifts);
                this.checked = false;
            }
        }
    }
}

limitCheckedGifts();
let giftsCloseBtn = document.querySelector('.gifts-close-btn');
giftsCloseBtn.onclick = function() {
    closePopup(popupGifts, blockerGifts);
}

blockerGifts.onclick = function() {
    closePopup(popupGifts, blockerGifts);
}

/*
let submitBlocker = document.querySelector('.submit-blocker');
let submitPopup = document.querySelector('.submit-popup');
let submitMessage = document.querySelector('.submit-message');
let submitCloseBtn = document.querySelector('.submit-close-btn');
openPopup(submitPopup, submitBlocker); */

/*
formInfo.addEventListener('submit', function(event) {
    for (let i=0; i<inputFields.length; i++) {
    if (!inputFields[i].checkValidity()) {
        event.preventDefault(); 
        inputFields[i].setCustomValidity('The field is invalid');
        inputFields[i].reportValidity();  
    } else {
        let userName = document.getElementById('name').value + ' ' + document.getElementById('surname').value;
        let street = document.getElementById('street').value + ' street'; 
        let house = ' house ' + document.getElementById('house').value;
        let flat = ' flat ' + document.getElementById('flat').value;
        let submitBlocker = document.querySelector('.submit-blocker');
        let submitPopup = document.querySelector('.submit-popup');
        let submitMessage = document.querySelector('.submit-message');
        let submitCloseBtn = document.querySelector('.submit-close-btn');
        submitPopup.classList.add('show');
        submitBlocker.classList.add('show');
       submitMessage.textContent = `The order created. The delivery address is ${street} ${house} ${flat}. Customer ${userName}`; 
        submitCloseBtn.onclick = closePopup(submitPopup, submitBlocker);
    }
}
}) */

orderBtn.onclick = function() {
    console.log(1);
    let userName = document.getElementById('name').value + ' ' + document.getElementById('surname').value;
        let street = document.getElementById('street').value + ' street'; 
        let house = ' house ' + document.getElementById('house').value;
        let flat = ' flat ' + document.getElementById('flat').value;
        let submitBlocker = document.querySelector('.submit-blocker');
        let submitPopup = document.querySelector('.submit-popup');
        let submitMessage = document.querySelector('.submit-message');
        let submitCloseBtn = document.querySelector('.submit-close-btn');
        submitPopup.classList.add('show');
        submitBlocker.classList.add('show');
        submitMessage.textContent = `The order created. The delivery address is ${street} ${house} ${flat}. Customer ${userName}`; 
        submitCloseBtn.onclick = closePopup(submitPopup, submitBlocker);
}
