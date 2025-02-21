// const wrapper = document.querySelector(".wrapper"),
//     searchInput = wrapper.querySelector("input"),
//     volume = wrapper.querySelector(".word i"),
//     infoText = wrapper.querySelector(".info-text"),
//     synonyms = wrapper.querySelector(".synonyms .list"),
//     removeIcon = wrapper.querySelector(".search span");

// let audio;

// function data(result, word) {
//     if (result.title) {
//         infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
//     } else {
//         wrapper.classList.add("active");

//         let definitions = result[0].meanings[0].definitions[0];
//         let phoneticsText = result[0].phonetics.length > 0 ? `/${result[0].phonetics[0].text}/` : "";
        
//         document.querySelector(".word p").innerText = result[0].word;
//         document.querySelector(".word span").innerText = `${result[0].meanings[3].partOfSpeech} ${phoneticsText}`;
//         document.querySelector(".meaning span").innerText = definitions.definition;
//         document.querySelector(".example span").innerText = definitions.example || "No example available";

//         let audioSrc = result[0].phonetics.find(p => p.audio)?.audio || "";
//         if (audioSrc) {
//             audio = new Audio(audioSrc);
//         } else {
//             audio = null;
//         }

//         if (!definitions.synonyms || definitions.synonyms.length === 0) {
//             synonyms.parentElement.style.display = "none";
//         } else {
//             synonyms.parentElement.style.display = "block";
//             synonyms.innerHTML = "";
//             definitions.synonyms.slice(0, 5).forEach((synonym, index) => {
//                 let tag = `<span onclick="search('${synonym}')">${synonym}${index < 4 ? ',' : ''}</span>`;
//                 synonyms.insertAdjacentHTML("beforeend", tag);
//             });
//         }
//     }
// }




// function search(word) {
//     fetchApi(word);
//     searchInput.value = word;
// }

// function fetchApi(word) {
//     wrapper.classList.remove("active");
//     infoText.style.color = "#000";
//     infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;

//     let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
//     fetch(url)
//         .then(response => response.json())
//         .then(result => {
//             console.log("API Response:", result);
//             data(result, word);
//         })
//         .catch(() => {
//             infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
//         });
//         console.log();
// }

// // function fetchApi(word) {
// //     wrapper.classList.remove("active");
// //     infoText.style.color = "#000";
// //     infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;

// //     let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    
// //     fetch(url)
// //         .then(response => response.json())
// //         .then(result => {
// //             console.log("API Response:", result); // Log the response

// //             if (!result || !Array.isArray(result) || result.length === 0) {
// //                 throw new Error("Invalid API response");
// //             }

// //             let wordData = result[0]; // First entry in the result array
// //             let meaningsArray = wordData.meanings || [];

// //             let meanings = meaningsArray.map((meaning, index) => {
// //                 return `(${index + 1}) ${meaning.partOfSpeech}: ${meaning.definitions[0]?.definition || "No definition available"}`;
// //             }).join("\n");

// //             let examples = meaningsArray
// //                 .flatMap(meaning => meaning.definitions.map(def => def.example || "No example available"))
// //                 .filter(example => example !== "No example available") // Remove empty examples
// //                 .join("\n");

// //             let synonyms = meaningsArray
// //                 .flatMap(meaning => meaning.synonyms)
// //                 .filter(synonym => synonym)
// //                 .join(", ") || "No synonyms available";

// //             console.log("Meanings:", meanings);
// //             console.log("Examples:", examples || "No examples available");
// //             console.log("Synonyms:", synonyms);

// //             // Update UI with extracted values (if necessary)
// //             // meaningElement.innerText = meanings;
// //             // exampleElement.innerText = examples || "No example available";
// //             // synonymsElement.innerText = synonyms;

// //         })
// //         .catch(error => {
// //             console.error("Error fetching data:", error);
// //             infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try another word.`;
// //         });
// // }


// searchInput.addEventListener("keyup", (e) => {
//     let word = e.target.value.trim();
//     if (e.key == "Enter" && word) {
//         fetchApi(word);
//     }
// });

// volume.addEventListener("click", () => {
//     if (audio) {
//         volume.style.color = "#4D59FB";
//         audio.play();
//         setTimeout(() => {
//             volume.style.color = "#999";
//         }, 800);
//     }
// });

// removeIcon.addEventListener("click", () => {
//     searchInput.value = "";
//     searchInput.focus();
//     wrapper.classList.remove("active");
//     infoText.style.color = "#9A9A9A";
//     infoText.innerHTML = "Type any existing word and press enter to get meaning, example, synonyms, etc.";
// });


const wrapper = document.querySelector(".wrapper"),
searchInput = wrapper.querySelector("input"),
volume = wrapper.querySelector(".word i"),
infoText = wrapper.querySelector(".info-text"),
synonyms = wrapper.querySelector(".synonyms .list"),
removeIcon = wrapper.querySelector(".search span");
let audio;
function data(result, word){
    if(result.title){
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
    }else{
        wrapper.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0],
        phontetics = `${result[0].meanings[0].partOfSpeech}  /${result[0].phonetics[0].text}/`;
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phontetics;
        document.querySelector(".meaning span").innerText = definitions.definition;
        document.querySelector(".example span").innerText = definitions.example;
        audio = new Audio(result[0].phonetics[0].audio);
        if(definitions.synonyms[0] == undefined){
            synonyms.parentElement.style.display = "none";
        }else{
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML = "";
            for (let i = 0; i < 5; i++) {
                let tag = `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[i]},</span>`;
                tag = i == 4 ? tag = `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[4]}</span>` : tag;
                synonyms.insertAdjacentHTML("beforeend", tag);
            }
        }
    }
}
function search(word){
    fetchApi(word);
    searchInput.value = word;
}
function fetchApi(word){
    wrapper.classList.remove("active");
    infoText.style.color = "#000";
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(response => response.json()).then(result => {
        console.log(result);
        data(result, word);
    }).catch(() =>{
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
    });
}
searchInput.addEventListener("keyup", e =>{
    let word = e.target.value.replace(/\s+/g, ' ');
    if(e.key == "Enter" && word){
        fetchApi(word);
    }
});
volume.addEventListener("click", ()=>{
    volume.style.color = "#4D59FB";
    audio.play();
    setTimeout(() =>{
        volume.style.color = "#999";
    }, 800);
});
removeIcon.addEventListener("click", ()=>{
    searchInput.value = "";
    searchInput.focus();
    wrapper.classList.remove("active");
    infoText.style.color = "#9A9A9A";
    infoText.innerHTML = "Type any existing word and press enter to get meaning, example, synonyms, etc.";
});