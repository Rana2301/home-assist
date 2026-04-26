import { db } from "./firebase.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

window.bookService = async function (type) {
  await addDoc(collection(db, "bookings"), {
    serviceType: type,
    status: "pending",
    time: Date.now()
  });

  alert("Booking Confirmed");
};