

let score = 0;

document.getElementById('startButton').addEventListener('click', function() {
    this.disabled = true; 
    score = 0; 
    startGame();
    document.getElementById('score').textContent = score; 
});

function startGame() {
    document.getElementById('gameContainer').innerHTML = '';
    const gameDuration = 15000; 
    const spawnInterval = 500; 
    const targetLifetime = 1500; 

    const spawnTimer = setInterval(function() {
        spawnTarget(targetLifetime);
    }, spawnInterval);

    setTimeout(() => {
        clearInterval(spawnTimer);
        document.getElementById('startButton').disabled = false; 
        alert(`Congratulations! You have scored ${score} points!`);
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
        scoreContainer.textContent = score; 
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
// for the api
function sendScoreToServer(score) {
    const apiKey = 'f4ce1ad32bbae90fc547972aceba7cfc0a522'; 
    const databaseURL = 'https://fedassignment-bc5a.restdb.io/rest/points'; 
    
    fetch(databaseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': apiKey
        },
        body: JSON.stringify({
            points: score 
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Score saved:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
setTimeout(() => {
    clearInterval(spawnTimer);
    document.getElementById('startButton').disabled = false;
    alert(`Congratulations! You have scored ${score} points!`);
    sendScoreToServer(score); 
}, gameDuration);
// back to home
document.getElementById('BackToHome').addEventListener('click', function() {
    window.location.href = 'index.html';
});