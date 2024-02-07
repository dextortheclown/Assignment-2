// instruction manual
document.addEventListener('DOMContentLoaded', (event) => {

    const instructionModal = document.getElementById('instructionModal');
    instructionModal.style.display = 'block';

    const closeButton = document.querySelector('.close');

    closeButton.addEventListener('click', () => {
        instructionModal.style.display = 'none';
    });
    window.addEventListener('click', (event) => {
        if (event.target === instructionModal) {
            instructionModal.style.display = 'none';
        }
    });
});
// instruction manual
let score = 0;

document.getElementById('startButton').addEventListener('click', function() {
    this.disabled = true;
    score = 0;
    startGame();
    document.getElementById('score').textContent = '0';
});

function startGame() {
    document.getElementById('gameContainer').innerHTML = '';
    const gameDuration = 20000; // 20 seconds
    const spawnInterval = 500; // 0.5 second
    const targetLifetime = 1000; // 1 seconds
    const spawnTimer = setInterval(function() {
        spawnTarget(targetLifetime);
    }, spawnInterval);

    setTimeout(() => {
        clearInterval(spawnTimer);
        document.getElementById('startButton').disabled = false;
        const playerName = prompt("Congratulations! Enter your name to save your score:");
        if (playerName) {
            sendScoreToServer(playerName, score);
        } else {
            alert(`You scored ${score} points!`);
        }
    }, gameDuration);
}

function spawnTarget(lifetime) {
    const target = document.createElement('div');
    target.classList.add('target');
    const images = ['images/Bread.png', 'images/CafeMug.png'];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    target.style.backgroundImage = `url('${randomImage}')`;

    const gameContainer = document.getElementById('gameContainer');
    const maxX = gameContainer.clientWidth - 30;
    const maxY = gameContainer.clientHeight - 30;
    const randomX = Math.floor(Math.random() * maxX);
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

    gameContainer.appendChild(target);

    setTimeout(() => {
        if (target.parentElement) {
            target.remove();
        }
    }, lifetime);
}

function sendScoreToServer(name, scoreToSend) {
    const apiKey = '65c04d45bdc5b284c312d24d';
    const databaseURL = 'https://fedassignment-bc5a.restdb.io/rest/points';
    
    fetch(databaseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': apiKey
        },
        body: JSON.stringify({ name: name, points: scoreToSend }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Score saved:', data);
        alert(`Thanks, ${name}! Your score of ${scoreToSend} points has been saved!`);
    })
    .catch((error) => {
        console.error('Error:', error.message);
    });
}
// back to home
document.getElementById('BackToHome').addEventListener('click', function() {
    window.location.href = 'index.html';
});
// leaderboard
document.getElementById('Leaderboard').addEventListener('click', function() {
    window.location.href = 'Leaderboard.html';
});
