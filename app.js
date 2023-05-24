function displayPlainText() {
    var fileInput = document.getElementById('file-input');
    var reader = new FileReader();
    reader.onload = function (event) {
        var plainText = event.target.result;
        document.getElementById('plain-text').textContent = plainText;
    };
    reader.readAsText(fileInput.files[0]);
}

function encryptFile() {
    var fileInput = document.getElementById('file-input');
    var keyInput = document.getElementById('key-input');

    displayPlainText();

    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
        var plainText = event.target.result;
        var encryptedText = encrypt(plainText, keyInput.value);
        displayResult(encryptedText);
        downloadFile(encryptedText, 'Ciphered.txt');
    };
    reader.readAsText(file);
}

function decryptFile() {
    var fileInput = document.getElementById('file-input');
    var keyInput = document.getElementById('key-input');

    displayPlainText();

    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
        var plainText = event.target.result;
        var decryptedText = decrypt(plainText, keyInput.value);
        displayResult(decryptedText);
    };
    reader.readAsText(file);
}

function encrypt(text, key) {
    var encryptedText = '';
    var keyIndex = 0;
    for (var i = 0; i < text.length; i++) {
        var char = text[i];
        if (char.match(/[a-zA-Z]/)) {
            var isUpperCase = char === char.toUpperCase();
            var charCode = char.toLowerCase().charCodeAt(0) - 97;
            var keyChar = key[keyIndex % key.length].toLowerCase();
            var keyCharCode = keyChar.charCodeAt(0) - 97;
            var shiftedCharCode = (charCode + keyCharCode) % 26 + 97;
            var encryptedChar = String.fromCharCode(shiftedCharCode);
            encryptedText += isUpperCase ? encryptedChar.toUpperCase() : encryptedChar;
            keyIndex++;
        } else {
            encryptedText += char;
        }
    }
    return encryptedText;
}

function decrypt(text, key) {
    var decryptedText = '';
    var keyIndex = 0;
    for (var i = 0; i < text.length; i++) {
        var char = text[i];
        if (char.match(/[a-zA-Z]/)) {
            var isUpperCase = char === char.toUpperCase();
            var charCode = char.toLowerCase().charCodeAt(0) - 97;
            var keyChar = key[keyIndex % key.length].toLowerCase();
            var keyCharCode = keyChar.charCodeAt(0) - 97;
            var shiftedCharCode = (charCode - keyCharCode + 26) % 26 + 97;
            var decryptedChar = String.fromCharCode(shiftedCharCode);
            decryptedText += isUpperCase ? decryptedChar.toUpperCase() : decryptedChar;
            keyIndex++;
        } else {
            decryptedText += char;
        }
    }
    return decryptedText;
}

function displayResult(result) {
    var resultElement = document.getElementById('result');
    resultElement.textContent = result;
}

function downloadFile(text, filename) {
    var element = document.getElementById('download-link');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.click();
}

window.onload = function () {
    var fileInput = document.getElementById('file-input');
    fileInput.value = '';
    var keyInput = document.getElementById('key-input');
    keyInput.value = '';
    document.getElementById('plain-text').textContent = '';
    document.getElementById('result').textContent = '';
    fileInput.addEventListener('change', displayPlainText);
};