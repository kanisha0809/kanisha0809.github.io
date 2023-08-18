/*Name: Kanisha
Student Number: 111877221
Email: kanisha@myseneca.ca
Section: NAA
*/

// Responsive Navbar
let menuIcon = document.querySelector(".menu-icon");
let navbarLinks = document.querySelector(".nav-links");

menuIcon.addEventListener("click", function () {
    navbarLinks.classList.toggle("open-menu");
    menuIcon.classList.toggle("move");
});

window.onscroll = () => {
    navbarLinks.classList.remove("open-menu");
    menuIcon.classList.remove("move");
};

// Hiring Option
let hiringRadioButton = document.getElementById("hiring");
let questionRadioButton = document.getElementById("question");
let commentRadioButton = document.getElementById("comment");
let clicked = 0;

hiringRadioButton.addEventListener("click", function () {
    if (clicked === 0) {
        generatePayRateInput();
        clicked++;
    }
});

questionRadioButton.addEventListener("click", function () {
    if (clicked > 0) {
        deletePayRateInput();
        clicked = 0;
    }
});

commentRadioButton.addEventListener("click", function () {
    if (clicked > 0) {
        deletePayRateInput();
        clicked = 0;
    }
});

function generatePayRateInput() {
    let br1 = document.createElement("br");
    br1.id = "br1";
    let br2 = document.createElement("br");
    br2.id = "br2";
    let br3 = document.createElement("br");
    br3.id = "br3";

    const label = document.createElement("label");
    label.textContent = "Expected Hourly Rate: ";
    label.id = "hiring-rate-label";

    const input = document.createElement("input");
    input.id = "hiring-rate-input";
    input.type = "number";
    input.step = "0.1";
    input.placeholder = "Hourly Pay";
    input.classList.add("format");

    const radioBtnsDiv = document.querySelector(".radio-btns");
    radioBtnsDiv.appendChild(br1);
    radioBtnsDiv.appendChild(br2);
    radioBtnsDiv.appendChild(label);
    radioBtnsDiv.appendChild(br3);
    radioBtnsDiv.appendChild(input);
}

function deletePayRateInput() {
    let label = document.getElementById("hiring-rate-label");
    let input = document.getElementById("hiring-rate-input");
    let radioBtnsDiv = document.querySelector(".radio-btns");
    let br1 = document.getElementById("br1");
    let br2 = document.getElementById("br2");
    let br3 = document.getElementById("br3");

    radioBtnsDiv.removeChild(br1);
    radioBtnsDiv.removeChild(br2);
    radioBtnsDiv.removeChild(br3);
    radioBtnsDiv.removeChild(input);
    radioBtnsDiv.removeChild(label);
}

// Form Validation
let errorElement = document.getElementById("error");
const form = document.getElementById("contact-form");
let messages = [];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    messages = [];

    validateName();
    validateEmail();
    validateAddress();
    validateCity();
    validatePostalCode();
    validateMessage();

    if (clicked > 0) {
        payRateValidation();
    }

    if (messages.length > 0) {
        errorElement.innerHTML = `
        <h3>Incorrect Inputs Provided:</h3>
        <pre>${messages.join("\r\n")}</pre>
        `;
    }
});

form.addEventListener("reset", () => {
    messages = [];
    errorElement.innerHTML = "";
});

function validateName() {
    const inputName = document.getElementById("name");
    if (nullChecker(inputName, "Name")) {
        areAlphabets(inputName, "- Name should be valid - All characters should be alphabetical");
    }
}

function validateEmail() {
    const email = document.getElementById("email");
    if (nullChecker(email, "Email")) {
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!validRegex.test(email.value)) {
            messages.push("- Email Address is Invalid");
        }
    }
}

function validateAddress() {
    const address = document.getElementById("address");
    if (nullChecker(address, "Address")) {
        if (address.value.length < 10) {
            messages.push("- Address should be at least 10 characters long");
        }
    }
}

function validateCity() {
    const city = document.getElementById("city");
    if (nullChecker(city, "City")) {
        areAlphabets(city, "- City should be valid - All characters should be alphabetical");
    }
}

function validatePostalCode() {
    let postalCode = document.getElementById("pCode");
    let validRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    if (!validRegex.test(postalCode.value)) {
        messages.push("- Invalid Postal Code");
    }
}

function validateMessage() {
    const message = document.getElementById("message");
    if (nullChecker(message, "Message")) {
        if (message.value.length < 5) {
            messages.push("- Message should be at least 5 characters long");
        }
    }
}

function payRateValidation() {
    let payRateInput = document.getElementById("hiring-rate-input");
    if (payRateInput.value <= 0) {
        messages.push("- Enter an appropriate expected hourly pay rate");
    }
}

function nullChecker(element, elementName) {
    if (!element.value) {
        messages.push(`- ${elementName} is required`);
        return false;
    }
    return true;
}

function areAlphabets(element, message) {
    let validRegex = /^[A-Za-z\s]+$/;
    if (!validRegex.test(element.value)) {
        messages.push(message);
    }
}
