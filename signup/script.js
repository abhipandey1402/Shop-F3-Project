
let message = document.getElementById('message');
let signupBtn = document.getElementById('signupBtn');


signupBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let pass = document.getElementById('pass').value;
    let confirmPass = document.getElementById('confirmPass').value;

    let exist = false;

    let users = localStorage.getItem('users');

    if (users != null) {
        JSON.parse(localStorage.getItem('users')).forEach(ele => {
            if (ele.email === email) {
                exist = true;
            }
        });
    }

    if (exist === true) {
        message.innerHTML = `<div style='color:#FF4F4F;'>User already exist, Try using new mail ID</div>`;
        return;
    }

    if (name == '' || email == '' || pass == '' || confirmPass == '') {
        message.innerHTML = `<div style='color:#FF4F4F;'>Please fill out all fields</div>`;
        return;
    }

    if (pass != confirmPass) {
        message.innerHTML = `<div style='color:#FF4F4F;'>Password Mismatch! Please enter right password.</div>`;
        return;
    }

    let user = {
        name: name,
        email: email,
        password: pass,
    }

    if (!users) {
        users = [user];
    } else {
        users = JSON.parse(users);
        users.push(user);
    }

    localStorage.setItem('users', JSON.stringify(users));

    location.href = '/login';
})

