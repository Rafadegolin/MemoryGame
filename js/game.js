const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 20) {
        clearInterval(this.loop);
        alert(`Parabéns ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML} segundos.`);
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');    
    secondCard.firstChild.classList.add('disabled-card');  

    firstCard = '';
    secondCard = '';

    checkEndGame();

    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 500);  
    }
}

const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }  
}

    

// criando a carte igual no HTML porem no JS
const createCard = (character) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
}

const loadGame = () => {

    const duplicateCharacters = [ ... characters, ... characters  ];

    const shuffledArray = duplicateCharacters.sort( () => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}





// CRIANDO AS CARTES PORÉM DE UMA MANEIRA MAIS BRAÇAL
/*const createCard = () => {

    //criando as divs necessárias
    const card = document.createElement('div');
    const front = document.createElement('div');
    const back = document.createElement('div');

    //dando o nome das classes das divs
    card.className = 'card';
    front.className = 'face front';
    back.className = 'face back';

    //colocando as divs internas dentro da div card
    card.appendChild(front);
    card.appendChild(back);

    //colocando a div card dentro da div 'mãe' grid
    grid.appendChild(card);
}*/