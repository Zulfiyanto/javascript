const quoteContainer = document.getElementById('quote__container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//Get Quote from API
async function getQuote() {
    loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        // if author is blank, add 'Unknown'
        if (data.quoteAuthor === '') {
            authorText.innerHTML = 'Unknown';
        } else {
            authorText.innerHTML = data.quoteAuthor;
        }

        //reduce font size  for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerHTML = data.quoteText;
        //stop loader
        complete();
    } catch (error) {
        getQuote();
        console.log('whoops,no quote', error);
    }
}

function tweetQuote() {
    const quote = quoteText.innerHTML;
    const author = authorText.innerHTML;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Event Listener
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//onLoad
getQuote();

// const quoteContainer = document.getElementById('quote__container');
// const quoteText = document.getElementById('quote');
// const authorText = document.getElementById('author');
// const twitterBtn = document.getElementById('twitter');
// const newQuoteBtn = document.getElementById('new-quote');
// const loader = document.getElementById('loader');

// let apiQuotes = [];

// // Show Loading Spinner
// function showLoadingSpinner() {
//     loader.hidden = false;
//     quoteContainer.hidden = true;
// }

// // Remove Loading Spinner
// function removeLoadingSpinner() {
//     quoteContainer.hidden = false;
//     loader.hidden = true;
// }

// // Show New Quote
// function newQuote() {
//     showLoadingSpinner();
//     // Pick a random quote from array
//     const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
//     // If Author field is blank replace it with 'Unknown'
//     if (!quote.author) {
//         authorText.textContent = 'Unknown';
//     } else {
//         authorText.textContent = quote.author;
//     }
//     // Check Quote length to determine styling (long quote or short quote)
//     if (quote.text.length > 115) {
//         quoteText.classList.add('long-quote');
//     } else {
//         quoteText.classList.remove('long-quote');
//     }
//     // Set Quote, Hide Loader
//     quoteText.textContent = quote.text;
//     removeLoadingSpinner();
// }

// // Get Quotes From API
// async function getQuotes() {
//     showLoadingSpinner();
//     const apiUrl = 'https://type.fit/api/quotes';
//     try {
//         const response = await fetch(apiUrl);
//         apiQuotes = await response.json();
//         newQuote();
//     } catch (error) {
//         newQuote();
//     }
// }

// // Tweet the quote
// function tweetQuote() {
//     const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
//     window.open(twitterUrl, '_blank');
// }

// // Event Listeners
// newQuoteBtn.addEventListener('click', newQuote);
// twitterBtn.addEventListener('click', tweetQuote);

// // On Load
// getQuotes();
