let score = 0;

document.getElementById('startButton').addEventListener('click', function() {
    this.disabled = true;
    score = 0;
    startGame();
    document.getElementById('score').textContent = '0';
});

function startGame() {
    document.getElementById('gameContainer').innerHTML = '';
    const gameDuration = 15000; // 15 seconds
    const spawnInterval = 1000; // 1 second
    const targetLifetime = 2000; // 2 seconds
    const spawnTimer = setInterval(function() {
        spawnTarget(targetLifetime);
    }, spawnInterval);

    setTimeout(() => {
        clearInterval(spawnTimer);
        document.getElementById('startButton').disabled = false;
        alert(`Congratulations! You have scored ${score} points!`);
        sendScoreToServer(score); // for sending of the score to my db
    }, gameDuration);
}
// Spawn target
function spawnTarget(lifetime) {
    const target = document.createElement('div');
    target.classList.add('target');
    const images = ['Images/Bread.png', 'Images/CafeMug.png'];
    const randomImage = images[Math.floor(Math.random() * images.length)]; //  random selectio betw both images
    target.style.backgroundImage = `url('${randomImage}')`;

    const gameContainer = document.getElementById('gameContainer');
    const maxX = gameContainer.clientWidth - 30;
    const maxY = gameContainer.clientHeight - 30;
    const randomX = Math.floor(Math.random() * maxX); // around the contsainer
    const randomY = Math.floor(Math.random() * maxY);

    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;

    target.addEventListener('click', function() {
        this.remove();
        score++;
        const scoreContainer = document.getElementById('score');
        scoreContainer.textContent = score.toString();
        scoreContainer.parentElement.style.animation = 'none';
        setTimeout(() => scoreContainer.parentElement.style.animation = 'bounce 0.3s ease', 10);
    });
// end of spawn target

//spawning of the bubbles
    gameContainer.appendChild(target);

    setTimeout(() => {
        if (target.parentElement) {
            target.remove();
        }
    }, lifetime);
}
// end of the spawning of the bubbles

//send score to server
function sendScoreToServer(scoreToSend) {
    const apiKey = '65c04d45bdc5b284c312d24d'; // Replace with your actual API key
    const databaseURL = 'https://fedassignment-bc5a.restdb.io/rest/points'; // Replace with your actual database URL
    
    fetch(databaseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': apiKey
        },
        body: JSON.stringify({ points: scoreToSend }), // Ensure that this object structure matches your database schema
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Score saved:', data);
    })
    .catch((error) => {
        console.error('Error:', error.message);
    });
}

 // end of send score to server

 // retrieve score
function retrieveScores() {
    const apiKey = '65c04d45bdc5b284c312d24d'; 
    const databaseURL = 'https://fedassignment-bc5a.restdb.io/rest/points'; 
    
    fetch(databaseURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Retrieved scores:', data);
    })
    .catch((error) => {
        console.error('Error:', error); //incase of errors
    });
}

// end of retrieve
// for data checking + sum debugging

// back to home page button
document.getElementById('BackToHome').addEventListener('click', function() {
    window.location.href = 'index.html';
});
// gameshop button
document.getElementById('GameShop').addEventListener('click', function() {
    window.location.href = 'GameShop.html';
});
// Lottie loading anim
function loadLottieAnimation() {
    lottie.loadAnimation({
      container: document.getElementById('lottieAnimation'), // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://lottiefiles.com/download/public/66242' 
    });
  }

var modal = document.getElementById('instructionModal');
// close 
var span = document.getElementsByClassName('close')[0];
// page loads triggers thsat ting
window.onload = function() {
  modal.style.display = "block";
  loadLottieAnimation();
}
// X button
span.onclick = function() {
  modal.style.display = "none";
}
