import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FB_API_KEY,
  authDomain: "burri-trello-vue.firebaseapp.com",
  projectId: "burri-trello-vue",
  storageBucket: "burri-trello-vue.appspot.com",
  messagingSenderId: "644020954075",
  appId: "1:644020954075:web:fc91e4072dbcbb14c43dfe",
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Exportar la instancia de autenticación
const auth = firebase.auth();
const db = firebase.firestore();
export { auth, db };
export default firebase;
