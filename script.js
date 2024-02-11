// tinyURL API token: dSGclgoZeOaGYdPI67msbMpNGSLpPIrTZnrizwfo6OKSygGnVuRBYithDFmN


// VARIABLES
const apiKey = "dSGclgoZeOaGYdPI67msbMpNGSLpPIrTZnrizwfo6OKSygGnVuRBYithDFmN";
const container2 = document.querySelector('.container2');
const inputField = document.querySelector('.inputField');
const buttonShortenIt = document.querySelector('.buttonShortenIt');

let shortenedLink;

//FUNCTIONS

    //Create new result link container function
function createLinkContainer(longLink, shortenedLink) {
	const newLinkContainer = `
    <div class="newLinkContainer">
    <div class="originalLinkContainer">${longLink}</div>
    <hr class="newLinkLine">
    <div class="shortenedLinkContainer">${shortenedLink}</div>
    <div class="buttonCopy">Copy</div>
  </div>
    `
	container2.insertAdjacentHTML('beforeend', newLinkContainer)
}


    //Copy function
function copyToClipboard(event) {
    const button = event.target;
    const container = button.parentNode;
    const shortenedLinkContainer = container.querySelector('.shortenedLinkContainer');
    const textToCopy = shortenedLinkContainer.textContent;

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert("Copied the text: " + textToCopy);
            button.innerHTML = 'Copied!';
			button.style.backgroundColor = 'hsl(257, 27%, 26%)';
        })
        .catch(err => {
            console.error('Unable to copy:', err);
        });
}

    function createError(){
        inputField.style.border = '3px solid red';

    }


    //Validate URL function
    function isValidURL(url) {
        var urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlPattern.test(url);
    }
    
    function validateURL(url){
        let input = url;
    if (isValidURL(input)) {
        console.log("Valid URL");
    } else {
        console.log("Invalid URL");
        inputField.style.border = '3px solid red'
    }
    }

    //Creating the shortened url function
function getShortenedUrl(longURL) {
	fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longURL)}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			// If you need to authenticate with an API key:
			'Authorization': `Bearer ${apiKey}`
		}
	})
		.then(response => response.text())
		.then(shortURL => {
			shortenedLink = shortURL;
            validateURL(longURL);
			console.log("Shortened URL:", shortURL);
			createLinkContainer(longURL, shortURL);
			const buttonCopy = document.querySelectorAll('.buttonCopy');
			//Adding copy function to copy button
            buttonCopy.forEach(button =>{
            button.addEventListener('click', copyToClipboard);
                
        });
		})
		.catch(error => {
			console.error("Error shortening URL:", error);
		});

}

//ADDING FUNCTIONALITY
buttonShortenIt.addEventListener('click', function() {
	getShortenedUrl(inputField.value);
    inputField.value = '';
})
