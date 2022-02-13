const url = "http://127.0.0.1:8000";
let token = localStorage.getItem('token');
const formData = document.querySelector('#avatar');
//
const userData = async (data) => {
    let response = await fetch(url + '/api/users/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': data
        },
    }).then(response => response.json());
    return (
        document.querySelector('#fullName').innerHTML = "<span>" + response['data']['first_name'] + " " +
            response['data']['last_name'] + "</span>"
    );

};

document.querySelector('#delete').addEventListener('click', () => {
    const getData = async (data) => {
        let response = await fetch(url + '/api/users/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': data
            },
        }).then(response => response.json());
        return await fetch(url + "/api/users/" + response['data']['id'], {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(window.location.href = "http://localhost:63342/adminJS/index.html")
            .then(localStorage.removeItem('token'));
    };
    getData(token);
});

document.querySelector('#logout').addEventListener('click', () => {
    window.location.href = "http://localhost:63342/adminJS/index.html";
    localStorage.removeItem('token')
});
userData(token);

document.querySelector('#image').addEventListener('mouseenter', () => {
    document.querySelector("#upload").style = "display: block";
});
document.querySelector('#image').addEventListener('mouseleave', () => {
    document.querySelector("#upload").style = "display: none";
});


document.querySelector('#inpFile').addEventListener('input', (e) => {
    console.log(e.target.files[0])

})
