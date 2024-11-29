const localStorageKey = 'encryptedWords';

// Função para carregar palavras do localStorage
function loadSavedWords(listId) {
    const savedWords = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    const list = document.getElementById(listId);
    list.innerHTML = ''; // Limpa a lista antes de renderizar
    savedWords.forEach(word => {
        const listItem = document.createElement('li');
        listItem.textContent = word;
        list.appendChild(listItem);
    });
}

// Função para salvar palavras no localStorage
function saveWord(word) {
    const savedWords = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    savedWords.push(word);
    localStorage.setItem(localStorageKey, JSON.stringify(savedWords));
}

// Função para criptografar usando cifra de César (deslocamento de 3)
function caesarCipher(word, shift) {
    return word
        .split('')
        .map(char => {
            let code = char.charCodeAt(0);
            if (code >= 97 && code <= 122) {
                return String.fromCharCode(((code - 97 + shift) % 26) + 97);
            } else if (code >= 65 && code <= 90) {
                return String.fromCharCode(((code - 65 + shift) % 26) + 65);
            }
            return char;
        })
        .join('');
}

// Função para adicionar uma palavra na lista visível
function addWordToList(listId, word) {
    const list = document.getElementById(listId);
    const listItem = document.createElement('li');
    listItem.textContent = word;
    list.appendChild(listItem);
}

// Criptografar uma palavra
function encryptWord() {
    const input = document.getElementById('inputWord').value;
    if (input) {
        const encryptedWord = caesarCipher(input, 3);
        saveWord(encryptedWord);
        addWordToList('encryptedList', encryptedWord);
        document.getElementById('inputWord').value = '';
    }
}

// Descriptografar uma palavra
function decryptWord() {
    const input = document.getElementById('inputEncryptedWord').value;
    if (input) {
        const decryptedWord = caesarCipher(input, -3);
        addWordToList('decryptedList', decryptedWord);
        document.getElementById('inputEncryptedWord').value = '';
    }
}

// Carregar palavras salvas (para a página atual)
window.onload = function () {
    const encryptedList = document.getElementById('encryptedList');
    const decryptedList = document.getElementById('decryptedList');

    if (encryptedList) {
        loadSavedWords('encryptedList');
    }

    if (decryptedList) {
        decryptedList.innerHTML = '';
    }
};
