
let loginBtn = document.getElementById('loginBtn');
let message = document.getElementById('message');

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let email = document.getElementById('email').value;
    let currentPassword = document.getElementById('current-password').value;
    let signedUp = false;
    let name;

    let users = JSON.parse(localStorage.getItem('users'));
    if (users != null) {
        users.forEach(ele => {
            if (ele.email === email && ele.password === currentPassword) {
                signedUp = true;
            }
        });
    }

    if (!signedUp) {
        message.innerHTML = `<div style='color:#FF4F4F;'>Please enter corrent login details</div>`;
        return;
    }

    if (users != null) {
        users.forEach(ele => {
            if (ele.email === email) {
                name = ele.name;
            }
        });
    }

    let currentUser = {
        name: name,
        email: email,
        password: currentPassword
    }

    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    let token = '';
    for (let i = 0; i < 16; i++) {
        token += String.fromCharCode(Math.floor(Math.random() * 256));
    }

    localStorage.setItem('token', btoa(token));

    location.href = '/shop';
})




