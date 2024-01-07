const quoteContainer = document.getElementById('quote-container');
const quote = document.getElementById('quote');
const author = document.getElementById('author');
const quoteBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter');
const loader = document.getElementById('loader');






const loading = () => {
    loader.hidden = true;
}

const complete = () => {
    loader.hidden = false;
}



//Get quote from API
const getQuote = async () => {
    loading();
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();


        if (!data.quoteAuthor) {
            author.innerText = 'Unknown';
        } else {
            author.innerText = data.quoteAuthor;
        }


        if (data.quoteText.length > 75) {
            quote.classList.add('long-quote');
        } else {
            quote.classList.remove('long-quote');
        }
        quote.innerText = data.quoteText;
        complete();




    } catch (error) {
        loading();
        // getQuote();
        console.log('Whoops, no quote', error);
    }

}

const tweetQuote = () => {


    const tweetUrl = "https://twitter.com/intent/tweet?text=" + quote + " By " + author;
    window.open(tweetUrl, '_blank');
}


quoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);


//On Load
getQuote();


