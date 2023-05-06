
function checkLogin() {
    if (!localStorage.getItem('token')) {
        alert("Please login first");
        window.location.href = '/login';
    }
}
checkLogin();

//Code for some initial part

let message = document.getElementById('message');
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

message.innerHTML = `<div style='color:#000; font-size:1.5vw; font-weight:500;'>Hii, ${currentUser.email}, use the below form to update your profile.</div>`
document.getElementById('name').value = currentUser.name;

// Code for SaveInfo part

let saveInfo = document.getElementById('saveInfoBtn');

saveInfo.addEventListener('click', (e) => {
    e.preventDefault();

    let name = document.getElementById('name').value;

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    currentUser.name = name;

    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    let users = JSON.parse(localStorage.getItem('users'));

    users.forEach(user => {
        if (user.email === currentUser.email) {
            user.name = name;
        }
    });

    localStorage.setItem('users', JSON.stringify(users));
});


// Code for edit Password part

let changePassword = document.getElementById('changePassBtn');

changePassword.addEventListener('click', (e) => {
    e.preventDefault();

    let oldPass = document.getElementById('oldPass').value;
    let pass = document.getElementById('newPass').value;
    let confirmPass = document.getElementById('confirmPass').value;

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser.password != oldPass) {
        alert('Old password is not correct');
        return;
    }

    if (pass != confirmPass) {
        alert('New Passwords do not match');
        return;
    }

    currentUser.password = pass;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    let users = JSON.parse(localStorage.getItem('users'));
    users.forEach(user => {
        if (user.email === currentUser.email) {
            user.password = pass;
        }
    })
    localStorage.setItem('users', JSON.stringify(users));
});

// Code for logout part

let logout = document.getElementById('logout');

logout.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');

    location.href = '/';
});



