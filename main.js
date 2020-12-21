const quoteContainer = document.getElementById('quote__container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

//Get Quote from API
async function getQuote() {
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

        //reduce font size  for long quotesss
        if (data.quoteText.length > 50) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerHTML = data.quoteText;
    } catch (error) {
        getQuote();
        console.log('whoops,no quote', error);
    }
}

//onLoad
getQuote();
