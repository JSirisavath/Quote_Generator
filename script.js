
// This is targeting each id from html to make sure the functions target what is on the html.
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
// Setting up global function so [] means anything for anytime time its called
let apiQuotes = [];

// Show loading function
// hidden is hiding the laoder but false. So it will not be hidden
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Showing New Quote logic
function newQuote(){

    // Added loading function again because only launching this function first. If it does take some time, let it load it again.
    loading();
    // Pick a random quote from apiQuotes array. This means it is multiplying math random - a decimal number from 0 to 1, which then uses math floor to set the decimal to just a whole integer to pick the quote array. The math random will set the random number NEVER higher than the current number of arrays, or 'Quotes', thus the logic of 0 to 1-Inclusive to [0 but never 1), since index logic applies. 
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
   
    // Populating the author and quote elements with the textContent

    // Check if Author field is blank and replace it with 'Unknown'
    
    if(!quote.author){
        authorText.textContent = 'Unknown';

    } else{
        authorText.textContent = quote.author;
    }
    // Check Quote Length to determine styling
        if (quote.text.length > 120){
        quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove('long-quote'); 
    }
    // Set quote, Hide loader

    quoteText.textContent = quote.text;

    // complete function is to complete the loader function
    complete();

    // console.log(quote); (This is to test on consolelog***)

    // Use this for localQuotes ***
    // const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    // console.log(quote);
}

// Get/fetching Quotes From API 
async function getQuotes() {
    // The loading function will just bypass this whole function all together
    loading();

    // 'const' means never changing.

    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

    try{
        // Means fetch first, which you 'await' till the data gets populated then response variable is runned. Setting response constant if we have data to fetch first, then it sets the constant.
        const response = await fetch(apiURL);

        // apiQuotes is a Global variable - meaning be available in every function
        apiQuotes = await response.json();
        newQuote();

        // console.log(apiQuotes[12]); this is to test on console inspect
    }   catch (error){
        // Catch Error Here
    }
}

// Tweet Quote - use back ticks `` to make "template string" which allows us to pass in a variable and then converted to a string. https://twitter.com/intent/tweet (after url ?text = ${quoteText.textContent} - ${authorText.textContent} ; this is pass the variable in this case both quote AND author content into a string)
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    // When pressed, this allows to open a new window on a new tab
    window.open(twitterUrl, '_blank');
}

// Event listeners - This is calling the functions of both the buttons here. 'target button or what you are interacting'.addEventListener('action', then passing in the function)
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);



// // On Load
getQuotes();

// Test loader
// loading();

// For locally pull
// newQuote();
