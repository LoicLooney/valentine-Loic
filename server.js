/**
 * Serveur Express - Application Valentine
 * Sert les fichiers statiques du dossier public
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Servir les fichiers statiques (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Route principale : renvoie index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`❤️  Valentine app en ligne : http://localhost:${PORT}`);
});
