


clearStopper();
setNewOrder();

(function clickHandler() {
    const cards = document.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i += 1) {
        cards[i].addEventListener('click', (event) => {
            chooseEvent(event);
        });
    }
})();


function chooseEvent(event) {
    if(document.querySelector('.stopper').textContent == '00:00') {
        startStopper();
    }; 
        
    if (numberOfVisibleCards() < 2) {
        makeFrontVisible(event);
        if (numberOfVisibleCards() == 2) {
            checkIfPair() ? keepTwoCardsOpen() : closeTwoCards();
            if (numberOfOpenCards() == 10) {
                closeAllCards();
            };
        };
    };
};



function numberOfVisibleCards() {
    return document.querySelectorAll('.visible').length;
};

function numberOfOpenCards() {
    return document.querySelectorAll('.open').length;
};

function checkIfPair() {
    const visibleCards = document.querySelectorAll('.visible');
    const image1 = visibleCards[0].getAttribute('src');
    const image2 = visibleCards[1].getAttribute('src');
    // console.log(image1 == image2);
    return image1 == image2;
};

function makeFrontVisible(event) {
    event.currentTarget.querySelector("img").classList.remove('hidden');
    event.currentTarget.querySelector("img").classList.add('visible');
};


function closeTwoCards() {
    const to = setTimeout(function () {
        clearTimeout(to);
        const visibleCards = document.querySelectorAll("img.visible");
        visibleCards[0].classList.remove('visible');
        visibleCards[0].classList.add('hidden');
        visibleCards[1].classList.remove('visible');
        visibleCards[1].classList.add('hidden');
    }, 2000);
};

function keepTwoCardsOpen() {
    const visibleCards = document.querySelectorAll("img.visible");
    visibleCards[0].classList.remove('visible');
    visibleCards[0].classList.add('open');
    visibleCards[0].parentElement.classList.add('no-click');
    visibleCards[1].classList.remove('visible');
    visibleCards[1].classList.add('open');
    visibleCards[1].parentElement.classList.add('no-click');
};

function closeAllCards() {
    setTimeout(function () {
        const openCards = document.querySelectorAll(".open");
        for (let i = 0; i < openCards.length; i += 1) {
            openCards[i].classList.remove('open');
            openCards[i].classList.add('hidden');
            openCards[i].parentElement.classList.remove('no-click');
        };
        clearStopper();
        setNewOrder();
    }, 5000);
};


// STOPPER

const padNumbers = (num) => num < 10 ? `0${num}` : `${num}`;

function startStopper() {
    let timeElapsed = 0;
    let stopperIsRunning = true;
    setInterval(() => {
        if(!stopperIsRunning) {
            return;
        };
        timeElapsed++
        const seconds = padNumbers(timeElapsed % 60);
        const minutes = padNumbers(Math.floor(timeElapsed / 60) % 60);
        document.querySelector('.stopper').textContent = null;
        document.querySelector('.stopper').insertAdjacentHTML('beforeend', `${minutes}:${seconds}`);
        if (numberOfOpenCards() == 10) {
            stopperIsRunning = false;
       }; 
    }, 1000);
   
};

function clearStopper() {
    // document.querySelector('.stopper').textContent = null;
    document.querySelector('.stopper').textContent = '00:00'
}


// SHUFFLE CARDS

function getImageURLs() {
    const cardImages = document.querySelectorAll('img');
    const cardImageURLs = [];
    for (let i = 0; i < cardImages.length; i += 1) {
        cardImageURLs.push(cardImages[i].getAttribute('src'));
    }
       return cardImageURLs;
};

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
};

function setNewOrder() {

    const newOrderArray = shuffle(getImageURLs());
    const cards = document.querySelectorAll('img');

    for (let i = 0; i < cards.length; i += 1) {
        cards[i].setAttribute('src', newOrderArray[i]);
    }
};
