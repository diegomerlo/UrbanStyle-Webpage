import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB8TqJKYc1P4FkcuPMl424LEI_f4qka2Rg",
  authDomain: "urbanstyleweb-773d0.firebaseapp.com",
  projectId: "urbanstyleweb-773d0",
  storageBucket: "urbanstyleweb-773d0.appspot.com",
  messagingSenderId: "642259598794",
  appId: "1:642259598794:web:9762859ec33d40993b2333"
};

const app = initializeApp(firebaseConfig);

// Exportar los servicios que necesitas
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
