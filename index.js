const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

function searchWord() {
    let word = document.getElementById("search-input").value.trim();
    if (!word) {
        alert("Please enter a word!");
        return;
    }

    fetch(API_URL + word)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            displayData(result, word);
        })
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
    return "No example found, try using it in a sentence!";
}

function findFirstAvailableSynonyms(meanings) {
    for (let meaning of meanings) {
        if (meaning.synonyms && meaning.synonyms.length > 0) {
            return meaning.synonyms.slice(0, 5);
        }
    }
    return ["No synonyms available"];
}

function displayData(result, word) {
    if (result.title) {
        alert(`No results found for "${word}". Try another word.`);
        return;
    }

    let wordData = result[0]; 
    let meanings = wordData.meanings || [];

    let firstMeaning = meanings[0] || {};
    let definition = firstMeaning.definitions?.[0]?.definition || "No definition available";

    // Improved Example & Synonym Extraction
    let example = findFirstAvailableExample(meanings);
    let synonyms = findFirstAvailableSynonyms(meanings);

    document.querySelector(".word").innerText = wordData.word;
    document.querySelector(".phonetics").innerText = wordData.phonetics?.[0]?.text || "";
    document.querySelector(".meaning").innerText = definition;
    document.querySelector(".example").innerText = example;
    
    let synonymsContainer = document.querySelector(".synonyms");
    synonymsContainer.innerHTML = "";
    synonyms.forEach(synonym => {
        let span = document.createElement("span");
        span.innerText = synonym;
        span.onclick = () => {
            document.getElementById("search-input").value = synonym;
            searchWord();
        };
        synonymsContainer.appendChild(span);
    });

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
