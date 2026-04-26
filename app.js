import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Password Validation: Uppercase, Lowercase, Special Char
const validatePassword = (pass) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
    return regex.test(pass);
};

window.handleSignup = async function() {
    const name = document.getElementById('full-name').value;
    const email = document.getElementById('sign-email').value;
    const pass = document.getElementById('sign-pass').value;
    const confirm = document.getElementById('confirm-pass').value;

    if (pass !== confirm) return alert("Passwords do not match");
    if (!validatePassword(pass)) return alert("Password must have 1 Uppercase, 1 Lowercase, and 1 Special Character.");

    try {
        const res = await createUserWithEmailAndPassword(auth, email, pass);
        // Save Name to Profile and Firestore
        await updateProfile(res.user, { displayName: name });
        await setDoc(doc(db, "users", res.user.uid), { name, email });
        
        alert("Success! Redirecting...");
        window.location.href = "index.html";
    } catch (e) { alert(e.message); }
};

window.handleLogin = async function() {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;

    try {
        await signInWithEmailAndPassword(auth, email, pass);
        window.location.href = "index.html";
    } catch (e) {
        if (e.code === 'auth/user-not-found' || e.code === 'auth/invalid-credential') {
            alert("This user does not exist. Please sign up first.");
        } else {
            alert(e.message);
        }
    }
};

window.logout = async function() {
    await signOut(auth);
    window.location.href = "index.html";
};