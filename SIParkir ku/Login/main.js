// Import the necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXWxFpJgrE2Dg6Yn3psS1w6r9HR2liBPg",
  authDomain: "projek-smart.firebaseapp.com",
  databaseURL:
    "https://projek-smart-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "projek-smart",
  storageBucket: "projek-smart.appspot.com",
  messagingSenderId: "887947831056",
  appId: "1:887947831056:web:44a84cb022c58616e06795",
  measurementId: "G-QF2PC7GQE5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submit");
  const signupButton = document.getElementById("sign-up");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const main = document.getElementById("main");
  const createacct = document.getElementById("create-acct");

  const username = document.getElementById("username");
  const signupEmailIn = document.getElementById("email-signup");
  const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
  const signupPasswordIn = document.getElementById("password-signup");
  const confirmSignUpPasswordIn = document.getElementById(
    "confirm-password-signup"
  );
  const createacctbtn = document.getElementById("create-acct-btn");
  const returnBtn = document.getElementById("return-btn");

  // Handle account creation
  createacctbtn.addEventListener("click", function () {
    let isVerified = true;

    const signupEmail = signupEmailIn.value;
    const confirmSignupEmail = confirmSignupEmailIn.value;
    if (signupEmail !== confirmSignupEmail) {
      window.alert("Email fields do not match. Try again.");
      isVerified = false;
    }

    const signupPassword = signupPasswordIn.value;
    const confirmSignUpPassword = confirmSignUpPasswordIn.value;
    if (signupPassword !== confirmSignUpPassword) {
      window.alert("Password fields do not match. Try again.");
      isVerified = false;
    }

    if (
      !signupEmail ||
      !confirmSignupEmail ||
      !signupPassword ||
      !confirmSignUpPassword
    ) {
      window.alert("Please fill out all required fields.");
      isVerified = false;
    }

    if (isVerified) {
      createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          const uid = user.uid;
          // Save user info to the Realtime Database
          set(ref(database, "users/" + uid), {
            username: username.value,
            email: signupEmail,
            password: signupPassword, // Note: Storing passwords in plaintext is insecure, this is for demonstration only.
          });
          window.alert("Success! Account created.");
        })
        .catch((error) => {
          window.alert("Error occurred: " + error.message);
        });
    }
  });

  // Handle login
  submitButton.addEventListener("click", function () {
    const email = emailInput.value;
    const password = passwordInput.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Fetch and display user info
        const uid = user.uid;
        const dbRef = ref(database);
        get(child(dbRef, `users/${uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.val();
              console.log(userData);
              // Save username to localStorage
              localStorage.setItem("username", userData.username);
              window.alert(`Welcome ${userData.username}!`);
              // Redirect to index.html
              window.location.href = "../index.html";
            } else {
              window.alert("No data available for this user.");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        window.alert("Login failed: " + error.message);
      });
  });

  // Toggle visibility for sign-up form
  signupButton.addEventListener("click", function () {
    main.style.display = "none";
    createacct.style.display = "block";
  });

  // Toggle visibility to return to login form
  returnBtn.addEventListener("click", function () {
    main.style.display = "block";
    createacct.style.display = "none";
  });

  function getParameterByName(name) {
    const url = window.location.href;
    const regex = new RegExp(
      "[?&]" + name.replace(/[\[\]]/g, "\\$&") + "(=([^&#]*)|&|#|$)"
    );
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  const view = getParameterByName("view");
  if (view === "register") {
    main.style.display = "none";
    createacct.style.display = "block";
  } else {
    main.style.display = "block";
    createacct.style.display = "none";
  }
});
