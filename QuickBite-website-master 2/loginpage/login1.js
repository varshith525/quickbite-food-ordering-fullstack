let createBtn = document.querySelector("#create");
let alreadyBtn = document.querySelector("#already");

let signupDiv = document.querySelector(".signup-div");
let signupForm = document.getElementById("signup-form");

let loginDiv = document.querySelector(".login-div");
let loginForm = document.getElementById("login-form");

let signinNav = document.querySelector(".signin-nav");

let profileNav = document.querySelector(".UserName");

let profileName = document.getElementById("Profile");

let logout = document.getElementById("logout");

let toast_body = document.querySelector(".toast-body");

/* PAGE LOAD */

document.querySelector("body").onload = () => {

    let data = JSON.parse(localStorage.getItem("loginUser")) || [];

    if (data.length === 1) {

        profileNav.style.display = "block";

        signinNav.style.display = "none";

        profileName.innerText = data[0].name.slice(0, 7) + "..";

    } else {

        profileNav.style.display = "none";

    }

    let address = JSON.parse(localStorage.getItem("lastAddress"));

    if (address) {

        var other = document.querySelector(".other");

        other.innerText = address.delivaryLocation || "Location";

        var town = document.getElementById("town");

        town.innerText =
            `${address.city || "Hyderabad"}, ${address.state || "Telangana"}`;

    }

};

/* OPEN SIGNUP */

createBtn.addEventListener("click", () => {

    document.getElementById("mobile").value = "";

    signupDiv.style.display = "block";

    signupForm.style.display = "block";

    loginDiv.style.display = "none";

    loginForm.style.display = "none";

});

/* OPEN LOGIN */

alreadyBtn.addEventListener("click", () => {

    document.querySelector(".mobile").value = "";

    document.getElementById("email").value = "";

    document.getElementById("name").value = "";

    signupDiv.style.display = "none";

    signupForm.style.display = "none";

    loginDiv.style.display = "block";

    loginForm.style.display = "block";

});

/* SIGNUP */

signupForm.onsubmit = (event) => {

    event.preventDefault();

    let mobile = document.querySelector(".mobile").value;

    let email = document.getElementById("email").value;

    let name = document.getElementById("name").value;

    /* VALIDATION */

    if (
        mobile.length !== 10 ||
        email === "" ||
        name === ""
    ) {

        Alert(
            "Please Enter Correct Details!",
            signupForm,
            "warning"
        );

        return;

    }

    let obj = {
        mobile,
        name,
        email
    };

    /* API CALL */

    fetch('http://localhost:5001/api/signup', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(obj),

    })

    .then(response => response.json())

    .then(data => {

        Alert(data.message, signupForm, "success");

        if (data.message === 'User registered successfully!') {

            signupDiv.style.display = "none";

            signupForm.style.display = "none";

            loginDiv.style.display = "block";

            loginForm.style.display = "block";

        }

    })

    .catch(error => {

        console.error(error);

        Alert(
            "Error during signup!",
            signupForm,
            "warning"
        );

    });

};

/* LOGIN */

loginForm.onsubmit = (event) => {

    event.preventDefault();

    let mobile = document.getElementById("mobile").value;

    if (mobile.length !== 10) {

        Alert(
            "Please Enter Valid Mobile Number!",
            loginForm,
            "warning"
        );

        return;

    }

    /* API CALL */

    fetch('http://localhost:5001/api/login', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({ mobile }),

    })

    .then(response => response.json())

    .then(user => {

        if (!user || user.message === "User not found") {

            Alert(
                "User Not Registered!",
                loginForm,
                "warning"
            );

        } else {

            localStorage.setItem(
                "loginUser",
                JSON.stringify([user])
            );

            Alert(
                "Congratulations! Login Successfully",
                loginForm,
                "success"
            );

            profileNav.style.display = "block";

            signinNav.style.display = "none";

            profileName.innerText =
                user.name.slice(0, 7) + "..";

            document.getElementById("mobile").value = "";

        }

    })

    .catch(error => {

        console.error(error);

        Alert(
            "Error during login!",
            loginForm,
            "warning"
        );

    });

};

/* LOGOUT */

logout.onclick = () => {

    localStorage.setItem(
        "loginUser",
        JSON.stringify([])
    );

    signinNav.style.display = "block";

    profileNav.style.display = "none";

    Alert(
        "Logout Successfully!",
        loginForm,
        "success"
    );

};

/* ALERT FUNCTION */

function Alert(word, btn, type) {

    let toastBody = document.querySelector(".toast-body");

    toastBody.style.backgroundColor =
        type === "success"
            ? "#dff0d8"
            : "#f2dede";

    toast_body.innerText = word;

    const toast = new bootstrap.Toast(
        document.getElementById('liveToast')
    );

    toast.show();

}