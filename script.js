document.addEventListener('DOMContentLoaded', function() {
    let score = 0;
    let level = 1;
    let nextLevelThreshold = 10;
    
    const scoreElement = document.getElementById('score');
    const levelElement = document.getElementById('level');
    const nextLevelElement = document.getElementById('nextLevel');
    const clickButton = document.getElementById('clickButton');
    const saveScoreButton = document.getElementById('saveScoreButton');
    const scoreList = document.getElementById('scoreList');
  
    // Funzione per aggiornare la classifica
    function updateLeaderboard() {
      let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
      // Ordina la classifica in ordine decrescente di punteggio
      leaderboard.sort((a, b) => b.score - a.score);
      scoreList.innerHTML = '';
      leaderboard.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name}: ${item.score} punti (Livello ${item.level})`;
        scoreList.appendChild(li);
      });
    }
  
    // Gestione del click sul pulsante del gioco
    clickButton.addEventListener('click', function() {
      score++;
      scoreElement.textContent = score;
      // Se si raggiunge la soglia, aumenta il livello
      if (score >= nextLevelThreshold) {
        level++;
        levelElement.textContent = level;
        nextLevelThreshold += 10;  // Aumenta la soglia per il prossimo livello
        nextLevelElement.textContent = nextLevelThreshold;
        alert(`Complimenti! Hai raggiunto il livello ${level}!`);
      }
    });
  
    // Salva il punteggio nella classifica
    saveScoreButton.addEventListener('click', function() {
      const playerName = prompt('Inserisci il tuo nome:');
      if (playerName) {
        let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
        leaderboard.push({ name: playerName, score: score, level: level });
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
        updateLeaderboard();
      }
    });
  
    // Inizializza la classifica al caricamento della pagina
    updateLeaderboard();
  });
  