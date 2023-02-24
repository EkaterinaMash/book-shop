let body = document.querySelector('body');
let inputFields = document.querySelectorAll('.checked');
let orderBtn = document.querySelector('.order-button');
let formInfo = document.querySelector('form');
let giftCheckboxes = document.querySelectorAll('.gift-checkbox');
let popupGifts = document.querySelector('.gifts-popup');
let blockerGifts = document.querySelector('.gifts-blocker');
let giftsCloseBtn = document.querySelector('.gifts-close-btn');
let submitBlocker = document.querySelector('.submit-blocker');
let submitPopup = document.querySelector('.submit-popup');
let submitMessage = document.querySelector('.submit-message');

function setMinDeliveryDate() {
    let minDate = new Date();

    minDate.setDate(minDate.getDate() + 1);

    let minYear = minDate.getFullYear();
    let minMonth = minDate.getMonth() + 1;

    if (minMonth < 10) {
        minMonth = '0' + minMonth;
    }

    let minDay = minDate.getDate();
    let deliveryDate = document.getElementById('delivery-date'); 

    deliveryDate.setAttribute('min', `${minYear}-${minMonth}-${minDay}`);
}

setMinDeliveryDate();

function togglePopup(popup, blocker) {
    popup.classList.toggle('show');
    blocker.classList.toggle('show');
    body.classList.toggle('no-scroll');
}

function limitCheckedGifts() {
    let maxChecked = 2;

    for (let i = 0; i < giftCheckboxes.length; i++) {
        giftCheckboxes[i].onclick = function () {
            let count = 0;

            for (let i = 0; i < giftCheckboxes.length; i++) {
                if (giftCheckboxes[i].checked) {
                    count += 1;
                }
            }

            if (count > maxChecked) {
                togglePopup(popupGifts, blockerGifts);
                this.checked = false;
            }
        }
    }
}

limitCheckedGifts();

giftsCloseBtn.onclick = function () {
    togglePopup(popupGifts, blockerGifts);
}

blockerGifts.onclick = function () {
    togglePopup(popupGifts, blockerGifts);
}

for (let i = 0; i < inputFields.length; i++) {
    inputFields[i].oninput = function () {

        inputFields[i].setCustomValidity('');

        if (!inputFields[i].validity.valid) {
            inputFields[i].setCustomValidity('The field is invalid');
        } else {
            inputFields[i].setCustomValidity('');
        }

        inputFields[i].reportValidity();
    }
}

for (let i = 0; i < inputFields.length; i++) {
    inputFields[i].onchange = function () {
        if (formInfo.checkValidity()) {
            orderBtn.removeAttribute('disabled');
        }
    }
}

orderBtn.onclick = function () {
    submitPopup.classList.add('show');
    submitBlocker.classList.add('show');

    let userName = document.getElementById('name').value + ' ' + document.getElementById('surname').value;
    let street = document.getElementById('street').value + ' street';
    let house = ' house ' + document.getElementById('house').value;
    let flat = ' flat ' + document.getElementById('flat').value;

    submitMessage.textContent = `The order created. The delivery address is ${street} ${house} ${flat}. Customer ${userName}.`;
}
