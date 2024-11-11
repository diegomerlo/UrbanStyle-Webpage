const express = require('express');
const admin = require('firebase-admin');

// Inicializa el Admin SDK
admin.initializeApp({
  credential: admin.credential.cert('./urbanstyleweb-773d0-firebase-adminsdk-3tcit-b6a6e6a981.json'),
});

const app = express();
const cors = require('cors');
app.use(cors());
const port = 5000;

app.get('/api/user-count', async (req, res) => {
  try {
    let count = 0;
    let nextPageToken;
    
    // Iteramos sobre los usuarios de Firebase Authentication
    do {
      const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
      count += listUsersResult.users.length;
      nextPageToken = listUsersResult.pageToken;
    } while (nextPageToken);

    res.json({ count }); // Enviamos la cantidad de usuarios como respuesta
  } catch (error) {
    console.error('Error al obtener la cantidad de usuarios:', error);
    res.status(500).send('Error al obtener la cantidad de usuarios');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
