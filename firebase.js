import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCuDXQdLm08m07pyAh9veb1y9-k1uBAXb4",
  authDomain: "home-service-app-aa41f.firebaseapp.com",
  projectId: "home-service-app-aa41f",
  storageBucket: "home-service-app-aa41f.firebasestorage.app",
  messagingSenderId: "227416332672",
  appId: "1:227416332672:web:8b845f1b0f4056ac67c965"
};

// Initialize Firebase once
const app = initializeApp(firebaseConfig);

// Export instances to be used in app.js, services.html, and payment.html
export const auth = getAuth(app);
export const db = getFirestore(app);