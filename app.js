const lettersButtonsContainer = document.getElementById('phrase'); // buttons container UL for the single letter 
let missed = 0; // to track the guesses the player has missed 
const keyBoard = document.getElementById('qwerty'); 
const scoreBoard = document.getElementsByClassName('tries');
const overlay = document.getElementById('overlay');
let letterFound = '';

//phrases Array
const phrasesArr = [
    'Easy Peasy',
    'The ball is in your cort',
    'hit the hay',
    'A penny for your thoughts',
    'A piece of cake'
];

/**
 * randomly phrasesArr array
 */
function getRandomPhraseAsArray(arr){
    for (let i = arr.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
        
    }
    let elemToShow = arr[0].replace(/[^\w\s]/gi, ''); 
    let arrOfCharacters = elemToShow.split('');
    return arrOfCharacters;
}

/**
 * Loops through an Arr. of Char
 * create a LI | append the LI to the #phrase UL in HTML
 */
function addPhraseToDisplay(arr){
    const ulList = document.querySelector('#phrase ul');
    
    for (let i = 0; i < arr.length; i++ ) {
        let createLi = document.createElement('li'); 
        createLi.innerText = arr[i];
        if (createLi.innerText !== ' ') {
            createLi.className = 'letter';
        }else{
            createLi.style.width = '1em';
        }
        ulList.appendChild(createLi);
    }
    return ulList;
}


/**
 * Reset Function
 */
function resetGame(){
    const phrasesArrChars = getRandomPhraseAsArray(phrasesArr);
    addPhraseToDisplay(phrasesArrChars);
    
    letterFound = '';
    missed = 0;
 
 }

/**
 *  eventListener start game
 */ 
overlay.addEventListener('click', (e) => {
    if(e.target.className == 'btn__reset'){
        overlay.style.display = 'none';
        //reset function
        resetGame();
    }
    
});



/**
 * FUNCTION HAVE ONE PARAMETER: the Btn the player has clicked
 * function get all Elements with class Letter
 * loop over the letters and check and compare with the UserGess choises
 */
function checkLetter(userGessBtn){

    const classLetterLi = document.getElementsByClassName('letter');
    let usersMatchedLetter = null;
    
    for (let i = 0; i < classLetterLi.length; i++) {
        if( classLetterLi[i].innerText.toLowerCase() === userGessBtn.toLowerCase()){
            
            classLetterLi[i].classList.add('show'); 
            usersMatchedLetter = classLetterLi[i].innerText; //console.log(usersMatchedLetter);
          
        }
    }

    return usersMatchedLetter;       
}

/**
 * Event Listener to the keyboard
 * when Btn has been clicked add 'choosen class' and Attr 'dsabled
 * passing the Btn to checkLetter Func. And stored it in a Var. called 'letterFound' 
 */

keyBoard.addEventListener('click', (e) => {
    if(e.target.tagName == 'BUTTON'){
        e.target.className = 'chosen';
        if(e.target.classList.contains('chosen')){
            e.target.setAttribute('disabled', true);
            letterFound = checkLetter(e.target.innerText); 
            
             /**
            * Count the missed guesses 
            * if valeu null : remove one of the tries from scoreboard | and increase missed class
            */
            if(letterFound === null){ 
                missed++;
                
                if(missed === 1){
                    scoreBoard[0].getElementsByTagName('img')[0].src = 'images/lostHeart.png';
                }
                if(missed === 2){
                    scoreBoard[1].getElementsByTagName('img')[0].src = 'images/lostHeart.png';
                }
                if(missed === 3){
                    scoreBoard[2].getElementsByTagName('img')[0].src = 'images/lostHeart.png';
                }
                if(missed === 4){
                    scoreBoard[3].getElementsByTagName('img')[0].src = 'images/lostHeart.png';
                }
                if(missed === 5){
                    scoreBoard[4].getElementsByTagName('img')[0].src = 'images/lostHeart.png';
                }
            
            }
           
           
        }
        
    }
    checkWin();
   
})

/**
 * checkWin Func.
 * is number of class SHOW equal number of letters with class Letters?
 * if number of misses  === 5 SHOW overlay 'lose' 
 */
function checkWin() {
    const showClassArr = document.getElementsByClassName('show');
    const letterClassArr = document.getElementsByClassName('letter');
    
    if(showClassArr.length === letterClassArr.length){
        overlay.className = 'win';
        overlay.style.display = 'flex';
        overlay.firstElementChild.innerText = 'Congratulations you won the Game!';
        overlay.lastElementChild.innerText = 'Play again!';
        
    }
    if(missed === 5){
        overlay.className = 'lose';
        overlay.style.display = 'flex';
        overlay.firstElementChild.innerText = 'Game over!';
        overlay.lastElementChild.innerText = 'Try again!';
        
    }
}
