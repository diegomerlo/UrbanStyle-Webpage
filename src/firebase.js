// Importa solo las funciones que necesitas
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB8TqJKYc1P4FkcuPMl424LEI_f4qka2Rg",
  authDomain: "urbanstyleweb-773d0.firebaseapp.com",
  projectId: "urbanstyleweb-773d0",
  storageBucket: "urbanstyleweb-773d0.appspot.com",
  messagingSenderId: "642259598794",
  appId: "1:642259598794:web:9762859ec33d40993b2333"
};

// Inicializa Firebase
const firebaseapp = initializeApp(firebaseConfig);

// Inicializa Auth
const auth = getAuth(firebaseapp);

export { auth };
