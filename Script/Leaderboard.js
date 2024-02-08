document.addEventListener('DOMContentLoaded', function() {
    const APIKEY = '65c04d45bdc5b284c312d24d'; 
    const databaseURL = 'https://fedassignment-bc5a.restdb.io/rest/points'; 
  
    fetch(databaseURL + '?sort=points&dir=-1', { // Sort by points in descending order
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-apikey': APIKEY
      }
    })
    .then(response => response.json())
    .then(data => {
      
      const topScores = data.slice(0, 5); // Get the top 5 scores
      const leaderboardElement = document.getElementById('leaderboard'); 
  
      // Create the leaderboard HTML
      let leaderboardHTML = '<ol>';
      topScores.forEach((score, index) => {
        leaderboardHTML += `<li>${index + 1}. ${score.name} - ${score.points} points</li>`;
      });
      leaderboardHTML += '</ol>';
  
      // Set the leaderboard HTML
      leaderboardElement.innerHTML = leaderboardHTML;
    })
    .catch(error => {
      console.error('Error fetching leaderboard data:', error);
    });
  });
  