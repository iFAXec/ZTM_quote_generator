let apiQuotes = [];



const newQuote = () => {

    const randomNumber = Math.floor(Math.random() * apiQuotes.length);
    const randomQuote = apiQuotes[randomNumber];
    console.log(randomQuote);
}




const getQuotes = async () => {

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


//On Load
getQuotes();



