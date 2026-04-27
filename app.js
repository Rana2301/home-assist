import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// --- TOGGLE PASSWORD VISIBILITY ---
window.togglePassword = (id) => {
    const input = document.getElementById(id);
    input.type = input.type === "password" ? "text" : "password";
};

// --- SIGNUP HANDLER ---
window.handleSignup = async () => {
    const email = document.getElementById('sign-email').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const pass = document.getElementById('sign-pass').value;
    const confirm = document.getElementById('confirm-pass').value;
    const name = document.getElementById('full-name').value.trim();

    if (pass !== confirm) return alert("Passwords do not match!");

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        // Save user record to allow mobile login lookup later
        await addDoc(collection(db, "users"), {
            uid: userCredential.user.uid,
            fullName: name,
            email: email,
            mobile: mobile,
            password: pass 
        });
        alert("Account created successfully!");
        window.location.href = "login.html";
    } catch (e) {
        alert("Error: " + e.message);
    }
};

// --- LOGIN HANDLER (Dual Email/Mobile Support) ---
window.handleLogin = async () => {
    const input = document.getElementById('login-identifier').value.trim();
    const pass = document.getElementById('login-pass').value;
    let loginEmail = input;

    try {
        // If it's a mobile number, find the linked email first
        if (!input.includes('@')) {
            const q = query(collection(db, "users"), where("mobile", "==", input));
            const snap = await getDocs(q);
            
            if (snap.empty) {
                return alert("You have not registered; please sign up first.");
            }
            snap.forEach(doc => { loginEmail = doc.data().email; });
        }

        // Firebase Auth login
        await signInWithEmailAndPassword(auth, loginEmail, pass);
        alert("Welcome back!");
        window.location.href = "index.html"; 
        
    } catch (e) {
        if (e.code === 'user-not-found') {
            alert("You have not registered; please sign up first.");
        } else {
            alert("Login error: " + e.message);
        }
    }
};