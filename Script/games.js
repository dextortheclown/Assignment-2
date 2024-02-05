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
        sendScoreToServer(score); // Send the score after the game is over
    }, gameDuration);
}

function spawnTarget(lifetime) {
    const target = document.createElement('div');
    target.classList.add('target');
    const images = ['Images/Bread.png', 'Images/CafeMug.png'];
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

function sendScoreToServer(scoreToSend) {
    console.log("Sending score:", scoreToSend);
    console.log("Type of score:", typeof scoreToSend);

    const apiKey = '65c04d45bdc5b284c312d24d'; // Replace with your actual API key
    const databaseURL = 'https://fedassignment-bc5a.restdb.io/rest/points'; // Replace with your actual database URL
    
    fetch(databaseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': apiKey
        },
        body: JSON.stringify({ points: scoreToSend }),
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

function retrieveScores() {
    const apiKey = '65c04d45bdc5b284c312d24d'; // Replace with your actual API key
    const databaseURL = 'https://fedassignment-bc5a.restdb.io/rest/points'; // Replace with your actual database URL
    
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
        console.error('Error:', error);
    });
}

document.getElementById('BackToHome').addEventListener('click', function() {
    window.location.href = 'index.html';
});

// Call retrieveScores to check the data at the start or for debugging
// retrieveScores();
