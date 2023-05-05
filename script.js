// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))


//code for redirecting after clicking signup button and login button

let signup = document.getElementById('signup');
let login = document.getElementById('login');

signup.addEventListener('click', ()=>{
    window.location.href = '/signup';
})

login.addEventListener('click', ()=>{
    if(JSON.parse(localStorage.getItem('users')) === null){
        alert("Please signup first.")
        return;
    }
    location.href = '/login';
})

