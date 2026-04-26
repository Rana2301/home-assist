import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// SIGN UP
window.signup = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (!email || !password) return alert("Please fill all fields");

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
        alert("User Created Successfully!");
        window.location.href = "index.html";
    })
    .catch(err => alert(err.message));
};

// LOGIN
window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (!email || !password) return alert("Please fill all fields");

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        alert("Login Successful!");
        window.location.href = "index.html";
    })
    .catch(err => alert(err.message));
};

// FORGOT PASSWORD
window.forgotPassword = function () {
  const email = document.getElementById("email").value;
  if (!email) return alert("Please enter your email first");

  sendPasswordResetEmail(auth, email)
    .then(() => alert("Password reset link sent to your email!"))
    .catch(err => alert(err.message));
};

// PHONE OTP: SEND
window.sendOTP = function () {
  const phone = document.getElementById("phone").value;
  if (!phone) return alert("Enter a valid phone number");

  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'normal'
    });
  }

  signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      alert("OTP Sent to " + phone);
    }).catch(err => alert(err.message));
};

// PHONE OTP: VERIFY
window.verifyOTP = function () {
  const code = document.getElementById("otp").value;
  if (!code) return alert("Enter the OTP");

  window.confirmationResult.confirm(code)
    .then(() => {
      alert("Phone Verified Successfully!");
      window.location.href = "index.html";
    }).catch(err => alert("Invalid OTP: " + err.message));
};