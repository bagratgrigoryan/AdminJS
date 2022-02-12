const formData = document.querySelectorAll('form');
const save = document.querySelector('.save');
const baseUrl = "http://127.0.0.1:8000";
console.log(formData);

const FormFunction = async (data) => {
    let response = await fetch(baseUrl + '/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json());
    return response
};
document.querySelector('.register').addEventListener('click', () => {
    document.querySelector('#register_form').style = 'display: block';
    document.querySelector('#login_form').style = 'display: none';
});
document.querySelector('.login').addEventListener('click', () => {
    document.querySelector('#login_form').style = 'display: block';
    document.querySelector('#register_form').style = 'display: none';
});

save.addEventListener('click', () => {
    let data = {
        "firstName": formData[0]['firstName'].value,
        "lastName": formData[0]['lastName'].value,
        "age": formData[0]['age'].value,
        "phone": formData[0]['phone'].value,
        "email": formData[0]['email'].value,
        "password": formData[0]['password'].value
    };
    FormFunction(data);
});
const LoginFunction = async (data) => {
    let response = await fetch(baseUrl + '/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json());

    if (response['data'] != "") {
            window.location.href = "http://localhost:63342/adminJS/users/user.html";
            localStorage.setItem('token', response['data']['email']);
           return  response['data']['email'];
    } else
        return document.querySelector('#login_form').innerHTML += "<span>" + "Invalid Login or Password" + "</span>";
};
document.querySelector('.enter').addEventListener('click', () => {

    let loginData = {
        'login': formData[1]['login'].value,
        'password': formData[1]['pass'].value,
    };
    LoginFunction(loginData);
});
