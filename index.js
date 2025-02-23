const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

let wordElement = document.querySelector(".word");
let phoneticsElement = document.querySelector(".word span");
let meaningElement = document.querySelector(".meaning");
let exampleElement = document.querySelector(".example");
let synonymsContainer = document.querySelector(".synonyms");

function searchWord() {
    let searchInput = document.getElementById("search-input").value.trim();
    if (!searchInput) {
        alert("Please enter a word!");
        return;
    }
        fetch(API_URL + searchInput)
        .then(response => response.json())
        .then(result => displayData(result, searchInput))
        .catch(() => alert("Error fetching data!"));  
}

function findFirstAvailableExample(meanings) {
    for (let meaning of meanings) {
        for (let definition of meaning.definitions) {
            if (definition.example) {
                return definition.example;
            }
        }
    }
    return "No example available";
}

function findFirstAvailableSynonyms(meanings) {
    for (let meaning of meanings) {
        if (meaning.synonyms && meaning.synonyms.length > 0) {
            return meaning.synonyms.slice(0, 5);
        }
    }
    return ["No synonyms available"];
}

function displayData(result, searchWord) {
    if (result.title) {
        alert(`No results found for "${searchWord}". Try another word.`);
        return;
    }

    let wordData = result[0]; 
    let meanings = wordData.meanings || [];

    let firstMeaning = meanings[0] || {};
    let definition = firstMeaning.definitions?.[0]?.definition || "No definition available";

    // Get Example & Synonyms
    let exampleText = findFirstAvailableExample(meanings);
    let synonymsList = findFirstAvailableSynonyms(meanings);

    // Update DOM Elements
    // wordElement.textContent = wordData.word;
    phoneticsElement.textContent = wordData.phonetics?.[0]?.text || "";
    meaningElement.textContent = definition;
    exampleElement.textContent = exampleText; // Ensures it's always displayed

    // Update Synonyms
    synonymsContainer.innerHTML = "";
    synonymsList.forEach(synonym => {
        let span = document.createElement("span");
        span.textContent = synonym;
        span.onclick = () => {
            document.getElementById("search-input").value = synonym;
            searchWord();
        };
        synonymsContainer.appendChild(span);
    });

    // Handle Audio
    let audioSrc = wordData.phonetics.find(p => p.audio)?.audio || "";
    let audioButton = document.getElementById("play-audio");

    if (audioSrc) {
        audioButton.style.display = "inline-block";
        audioButton.onclick = () => new Audio(audioSrc).play();
    } else {
        audioButton.style.display = "none";
    }

    document.getElementById("result").style.display = "block";
}
