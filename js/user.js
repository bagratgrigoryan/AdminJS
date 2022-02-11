const url = "http://127.0.0.1:8000";
let token = localStorage.getItem('token');

const userDdelate = async (data) => {
    let response = await fetch(url + '/api/' + data, {
        method: 'Delete',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json());
    return window.location.href = url + "/AdminJS"

};
const userData = async (data) => {
    let response = await fetch(url + '/api/users/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': data
        },
    }).then(response => response.json());
    return (
        document.querySelector('#fullName').innerHTML = "<span>" + response['data'][0]['first_name'] + " " +
            response['data'][0]['last_name'] + "</span>"
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
        return await fetch(url + "/api/users/" + response['data'][0]['id'], {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(window.location.href =  "http://localhost:63342/adminJS/index.html")
            .then(localStorage.removeItem('token'));

    };
    getData(token);
});

userData(token);


