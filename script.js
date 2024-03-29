const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const quoteBtn = document.getElementById('new-quote');
const tweetBtn = document.getElementById('twitter');
const loader = document.getElementById('loader');

//Loading spinner shown 
const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Remove loading spinner
const complete = () => {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

let apiQuotes = [];

const newQuote = () => {
    loading();
    const randomNumber = Math.floor(Math.random() * apiQuotes.length);
    const randomQuote = apiQuotes[randomNumber];
    // console.log(randomQuote.author);

    // console.log(randomQuote.text.length);

    //Check quote length to determine styling
    if (randomQuote.text.length > 75) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = randomQuote.text;


    //Check if the author field is blank and replace it with 'Unknown'
    if (randomQuote.author) {
        quoteAuthor.textContent = randomQuote.author;
    } else {
        quoteAuthor.textContent = 'Unknown';
    }
    complete();
}




const getQuotes = async () => {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //Catch errors here
        console.log(error);
    }
}


//Tweet Quote
const quoteTweet = (param) => {
    const tweet = `https://twitter.com/intent/tweet?text= ${quoteText.textContent}- by ${quoteAuthor.textContent}`;
    window.open(tweet, '_blank');
}


//EventListeners
quoteBtn.addEventListener('click', newQuote);
tweetBtn.addEventListener('click', quoteTweet);


//On Load
getQuotes();




