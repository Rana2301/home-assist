import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

window.handleSignup = async function() {
    const name = document.getElementById('full-name').value;
    const email = document.getElementById('sign-email').value;
    const mobile = document.getElementById('mobile').value;
    const pass = document.getElementById('sign-pass').value;
    const confirm = document.getElementById('confirm-pass').value;

    if (!name || !email || !mobile || !pass) return alert("Please fill all fields.");
    if (pass !== confirm) return alert("Passwords do not match.");

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
    if (!passRegex.test(pass)) {
        return alert("Password must have at least 6 characters, one uppercase, one lowercase, and one special character.");
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        const user = userCredential.user;

        await updateProfile(user, { displayName: name });

        await setDoc(doc(db, "users", user.uid), {
            fullName: name,
            email: email,
            mobile: mobile,
            registeredAt: new Date().toISOString()
        });

        alert("Account Created! Now please login.");
        window.location.href = "login.html";
    } catch (error) {
        alert("Signup failed: " + error.message);
    }
};

window.handleLogin = async function() {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;

    if (!email || !pass) return alert("Please enter both email and password.");

    try {
        await signInWithEmailAndPassword(auth, email, pass);
        alert("Login Successful!");
        window.location.href = "index.html";
    } catch (error) {
        alert("Login failed: " + error.message);
    }
};