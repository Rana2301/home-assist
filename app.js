import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// We attach the function to 'window' so onclick="handleSignup()" works
window.handleSignup = async function() {
    const name = document.getElementById('full-name').value;
    const email = document.getElementById('sign-email').value;
    const mobile = document.getElementById('mobile').value;
    const pass = document.getElementById('sign-pass').value;
    const confirm = document.getElementById('confirm-pass').value;

    // 1. Basic Validation
    if (!name || !email || !mobile || !pass) return alert("Please fill all fields.");
    if (pass !== confirm) return alert("Passwords do not match.");

    // 2. Password Strength Check (A-a-!-123)
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
    if (!passRegex.test(pass)) {
        return alert("Password must have at least one uppercase, one lowercase, and one special character.");
    }

    try {
        // 3. Create the user account
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        const user = userCredential.user;

        // 4. Set the display name for the "Hello, User" feature
        await updateProfile(user, { displayName: name });

        // 5. Store data in Firestore database
        await setDoc(doc(db, "users", user.uid), {
            fullName: name,
            email: email,
            mobile: mobile,
            registeredAt: Date.now()
        });

        alert("Account Created! Now please login.");
        window.location.href = "login.html"; // Redirect to login as requested
    } catch (error) {
        alert("Signup failed: " + error.message);
    }
};