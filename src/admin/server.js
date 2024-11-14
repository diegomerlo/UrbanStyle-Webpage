// admin/server.js
const express = require('express');
const admin = require('firebase-admin');

// Inicializa el Admin SDK
admin.initializeApp({
  credential: admin.credential.cert('./urbanstyleweb-773d0-firebase-adminsdk-3tcit-c47364cfa8.json'),
});

const app = express();
const cors = require('cors');
app.use(cors());
const port = 5000;

// Ruta para obtener el conteo de usuarios
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

// Ruta para obtener la lista de usuarios
app.get('/api/users', async (req, res) => {
  try {
    let usersList = [];
    let nextPageToken;

    // Iteramos sobre los usuarios de Firebase Authentication
    do {
      const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
      usersList = [...usersList, ...listUsersResult.users];  // Agrega los usuarios a la lista
      nextPageToken = listUsersResult.pageToken;
    } while (nextPageToken);

    // Filtra solo los datos que necesitas, como email y uid
    const users = usersList.map(user => ({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || 'Sin nombre'
    }));

    res.json({ users }); // Devuelve la lista de usuarios
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).send('Error al obtener los usuarios');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
