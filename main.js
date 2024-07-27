for (let index = 1; index <= 7; index++) {
    let element = document.getElementById("hi" + index);
    if (element) {
        element.innerHTML = storage.cookie.getData(index.toString());
    } else {
        console.error("Element 'hi" + index + "' not found.");
    }
}

function main() {
    let nameElement = document.getElementById("name");
    if (nameElement) {
        let nameValue = nameElement.value;
        let hiElement = document.getElementById("hi" + nameValue);
        if (hiElement) {
            hiElement.innerHTML = storage.cookie.getData(nameValue);
        } else {
            console.error("Element 'hi" + nameValue + "' not found.");
        }
    } else {
        console.error("Element 'name' not found.");
    }
}

function submit() {
    let nameElement = document.getElementById("name");
    let cookieElement = document.getElementById("cookie");
    if (nameElement && cookieElement) {
        let nameValue = nameElement.value;
        let hello = cookieElement.value;
        
        storage.cookie.setData(nameValue, hello, 10);
        storage.local.setData(nameValue, hello, 10);
        storage.session.setData(nameValue, hello);
        
        cookieElement.value = "";
        main();
        console.warn(("5.00").toInteger());
        console.error(("5.00").toDecimal());
        console.warn(("Code").toInteger());
        console.error(("Code").toDecimal());
    } else {
        console.error("Elements 'name' or 'cookie' not found.");
    }
}

function esubmit() {
    let nameElement = document.getElementById("name");
    if (nameElement) {
        let nameValue = nameElement.value;
        
        storage.cookie.eraseData(nameValue);
        storage.local.eraseData(nameValue);
        storage.session.eraseData(nameValue);
        
        main();
    } else {
        console.error("Element 'name' not found.");
    }
}

function randomize() {
    let randomValue = random(1, 7); // Assuming 'random' function is defined elsewhere
    document.getElementById("name").value = randomValue;
}
