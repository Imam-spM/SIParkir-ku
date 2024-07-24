// Import the necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updateEmail,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  get,
  update,
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

// Check if user is logged in and get user data
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    const dbRef = ref(database, "users/" + uid);
    get(dbRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          document.getElementById("display-name").textContent =
            userData.username;
          document.getElementById("profile-email").textContent = userData.email;
          document.getElementById("profile-password").textContent = "******"; // Hide actual password
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    // User is signed out, redirect to login page
    window.location.href = "../Login/Index.html";
  }
});

// Handle profile edit
document.getElementById("edit-profile").addEventListener("click", () => {
  document.getElementById("modal").style.display = "block";
});

document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

document.getElementById("edit-profile-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const user = auth.currentUser;
  const newUsername = document.getElementById("edit-username").value;
  const newEmail = document.getElementById("edit-email").value;

  if (newUsername) {
    update(ref(database, "users/" + user.uid), {
      username: newUsername,
    });
    updateProfile(user, {
      displayName: newUsername,
    })
      .then(() => {
        document.getElementById("display-name").textContent = newUsername;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (newEmail) {
    update(ref(database, "users/" + user.uid), {
      email: newEmail,
    });
    updateEmail(user, newEmail)
      .then(() => {
        document.getElementById("profile-email").textContent = newEmail;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  document.getElementById("modal").style.display = "none";
});

// Handle logout
document.getElementById("logout-btn").addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location.href = "../Home/Home.html";
    })
    .catch((error) => {
      console.error(error);
    });
});
