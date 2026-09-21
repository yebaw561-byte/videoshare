import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
}
from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";


const firebaseConfig = {

    apiKey:
        "AIzaSyBlpo1c_tM8eD0p93dbTf91VhQZ1yP2bFk",

    authDomain:
        "videoshare-c9a71.firebaseapp.com",

    projectId:
        "videoshare-c9a71",

    storageBucket:
        "videoshare-c9a71.firebasestorage.app",

    messagingSenderId:
        "1050806159898",

    appId:
        "1:1050806159898:web:a5609377bfb15a999fdfa3",

    measurementId:
        "G-0KKLVHE3TZ"
};


// Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


// Elements

const loginBox =
    document.getElementById("loginBox");

const adminPanel =
    document.getElementById("adminPanel");

const loginBtn =
    document.getElementById("loginBtn");

const logoutBtn =
    document.getElementById("logoutBtn");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const loginMessage =
    document.getElementById("loginMessage");

const adminEmail =
    document.getElementById("adminEmail");


// LOGIN

loginBtn.onclick = async function () {

    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value;


    if (!email || !password) {

        loginMessage.innerText =
            "Email နဲ့ Password ထည့်ပါ။";

        return;
    }


    loginBtn.disabled = true;

    loginBtn.innerText =
        "Logging in...";


    try {

        const result =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


        console.log(
            "LOGIN SUCCESS:",
            result.user.email
        );


        loginMessage.innerText =
            "Login အောင်မြင်ပါပြီ။";


    } catch (error) {

        console.error(
            "LOGIN ERROR:",
            error
        );


        loginMessage.innerText =
            error.message;


        loginBtn.disabled = false;

        loginBtn.innerText =
            "Login";
    }

};


// AUTH STATE

onAuthStateChanged(
    auth,
    function (user) {

        console.log(
            "AUTH STATE:",
            user
        );


        if (user) {

            console.log(
                "USER LOGGED IN:",
                user.email
            );


            // Login ဖျောက်

            loginBox.classList.add(
                "hidden"
            );


            // Admin Panel ပြ

            adminPanel.classList.remove(
                "hidden"
            );


            adminEmail.innerText =
                "Logged in as: " +
                user.email;


        } else {

            console.log(
                "USER LOGGED OUT"
            );


            loginBox.classList.remove(
                "hidden"
            );


            adminPanel.classList.add(
                "hidden"
            );

        }

    }
);


// LOGOUT

logoutBtn.onclick =
    async function () {

        await signOut(auth);

    };