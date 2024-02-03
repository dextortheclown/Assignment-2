let score = 0;

document.getElementById('startButton').addEventListener('click', function() {
    this.disabled = true; // Disable the button once the game starts
    score = 0; // Reset score to 0 every time the game starts
    startGame();
    document.getElementById('score').textContent = score; // Update score display to 0
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
        document.getElementById('startButton').disabled = false; // Re-enable the start button
        alert(`Congratulations! You have scored ${score} points!`);
    }, gameDuration);
}

function spawnTarget(lifetime) {
    const target = document.createElement('div');
    target.classList.add('target');

    const gameContainer = document.getElementById('gameContainer');
    const maxX = gameContainer.clientWidth - 30;
    const maxY = gameContainer.clientHeight - 30;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;

    target.addEventListener('click', function() {
        this.remove();
        score++; // Increment the score for each target clicked
        const scoreContainer = document.getElementById('score');
        scoreContainer.textContent = score; // Update the score display
        // Trigger the bounce animation
        scoreContainer.parentElement.style.animation = 'none';
        setTimeout(() => scoreContainer.parentElement.style.animation = 'bounce 0.3s ease', 10); // Restart the animation
    });

    gameContainer.appendChild(target);

    // Set a timeout to remove the target if not clicked after a specified lifetime
    setTimeout(() => {
        if (target.parentElement) {
            target.remove();
        }
    }, lifetime);
}
