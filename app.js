import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// SIGN UP
window.signup = function () {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => alert("User Created"))
    .catch(err => alert(err.message));
};

// LOGIN
window.login = function () {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = "index.html")
    .catch(err => alert(err.message));
};

// PHONE OTP
window.sendOTP = function () {
  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);

  let phone = document.getElementById("phone").value;

  signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      alert("OTP Sent");
    });
};

window.verifyOTP = function () {
  let code = document.getElementById("otp").value;

  window.confirmationResult.confirm(code)
    .then(() => alert("Phone Verified"));
};