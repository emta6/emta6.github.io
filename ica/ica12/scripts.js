const newTriviaBtn = document.querySelector ('#js-new-quote');
newTriviaBtn.addEventListener('click', getQuote);

const apiEndpoint = 'https://trivia.cyberwisp.com/getrandomchristmasquestion';

function getQuote(){
    console.log('button was clicked');
    fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
      displayQuote(data.question);
      console.log(data.question);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to fetch a quote. Please try again.');
    });

}


function displayQuote(quote) {
  const quoteText = document.querySelector('#js-quote-text');
  quoteText.textContent = quote;
}

getQuote();
