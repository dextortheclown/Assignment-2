document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65c368324355fb7e09c1b740";

    // Login Button
    var loginBtn = document.getElementById('contact-submit');
    if (loginBtn) {
        loginBtn.addEventListener('click', function (e) {
            e.preventDefault();

            let loginForm = document.getElementById("loginForm");
            let contactEmail = document.getElementById("contact-email").value;
            let contactText = document.getElementById("contact-text").value;

            let settings = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": APIKEY,
                    "Cache-Control": "no-cache"
                },
            };

            fetch("https://assignment2-01f2.restdb.io/rest/userinfo", settings)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(data => {
                    const matchingUser = data.find(user => user.email === contactEmail && user.password === contactText);
                    if (matchingUser) {
                        sessionStorage.setItem('userName', matchingUser.name); // Store the user's name in sessionStorage
                        window.location.href = "index.html";
                    } else {
                        alert('Invalid email or password');
                        loginForm.reset();
                    }
                })
                .catch(error => {
                    console.error('Login error:', error);
                    alert('Login error: ' + error.message);
                });
        });
    } else {
        console.log('Login button not found');
    }

    // Signup Button
    var signUpBtn = document.getElementById('signup-submit');
    if (signUpBtn) {
        signUpBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Retrieve form data
            let signupForm = document.getElementById("signupForm");
            let signupName = document.getElementById("signup-name").value;
            let signupNumber = document.getElementById("signup-number").value;
            let signupEmail = document.getElementById("signup-email").value;
            let signupPassword = document.getElementById("signup-password").value;
            
            // Prepare JSON data for the API call
            let jsondata = {
                "name": signupName,
                "number": signupNumber,
                "email": signupEmail,
                "password": signupPassword
            };

            // Define settings for fetch call
            let settings = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": APIKEY,
                    "Cache-Control": "no-cache"
                },
                body: JSON.stringify(jsondata),
            };

            // Make the API call to signup
            fetch("https://assignment2-01f2.restdb.io/rest/userinfo", settings) // Ensure this is the correct endpoint
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(response => {
                    console.log('Signup successful', response);
                    alert('Thank you for signing up!');
                    signupForm.reset();
                    
                })
                .catch(error => {
                    console.error('Signup error:', error);
                    alert('Signup error: ' + error.message);
                    signupForm.reset();
                });
        });
    } else {
        console.log('Signup button not found');
    }
    // Function to update header based on user login status
    function updateUserDisplay(userName) {
        const loginBtn = document.getElementById('login-btn');
        const userNameDisplay = document.getElementById('user-name');

        if (userName) {
            loginBtn.classList.add('hidden');
            userNameDisplay.classList.remove('hidden');
            userNameDisplay.textContent = `Welcome, ${userName}`; // Set the user's name
        } else {
            loginBtn.classList.remove('hidden');
            userNameDisplay.classList.add('hidden');
        }
    }

    // Check if the user is already logged in
    function updateUserDisplay() {
        const loginBtn = document.getElementById('login-btn');
        const userNameDisplay = document.getElementById('user-name');
        const userName = sessionStorage.getItem('userName'); // Get the user's name from sessionStorage

        if (userName) {
            if (loginBtn) loginBtn.classList.add('hidden');
            if (userNameDisplay) {
                userNameDisplay.classList.remove('hidden');
                userNameDisplay.textContent = `Welcome, ${userName}`; // Update the display with the user's name
            }
        } else {
            if (loginBtn) loginBtn.classList.remove('hidden');
            if (userNameDisplay) userNameDisplay.classList.add('hidden');
        }
    }

    updateUserDisplay();

    var headerLoginBtn = document.getElementById('login-btn');
    if (headerLoginBtn) {
        headerLoginBtn.addEventListener('click', function () {
            window.location.href = "login.html";
        });
    }
});