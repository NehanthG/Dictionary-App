const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');
// const input =document.querySelector('input');
// const submit =document.querySelector('button');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getWordInfo(form.elements[0].value);
})

async function getWordInfo(word) {
    try {
        
    
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    let definitions = data[0].meanings[0].definitions[0];
    resultDiv.innerHTML = `
        <h2><strong>Word:</strong>${data[0].word}</h2>
        <p class=partOfSpeech>${data[0].meanings[0].partOfSpeech}</p>
        <p><strong>Meaning:</strong>${definitions.definition === undefined ? "Not found" : definitions.definition}</p>
        <p><strong>Example:</strong>${definitions.example === undefined ? "Not found" : definitions.example}</p>
        <p class="Antonym"><strong>Antonyms:</strong></p>
        

        
    
    `;
    console.log(data);
    if(definitions.antonyms.length===0){
        resultDiv.innerHTML+=`<span>Not found</span>`
    }
    else{
    for (let index = 0; index < definitions.antonyms.length; index++) {
        resultDiv.innerHTML+= `<li>${definitions.antonyms[index]}</li>`
        } 
    }


    if(definitions.synonyms.length===0){
        resultDiv.innerHTML+=`
        <p class="Antonym"><strong>Synonyms:</strong></p>
        <span>Not found</span>`
    }
    else{
        resultDiv.innerHTML+=`<p class="Antonym"><strong>Synonyms:</strong></p>`;
    for (let index = 0; index < definitions.antonyms.length; index++) {
        resultDiv.innerHTML+= `
        <li>${definitions.synonyms[index]}</li>`
        } 
    }



    resultDiv.innerHTML+=`<div class="read"><a href="${data[0].sourceUrls}" target=_blank>Read More</a></div>`
} catch (error) {
    resultDiv.innerHTML=`<p>Sorry,the word couldnot be found.</p>`    
}
    

}



