const url = "http://127.0.0.1:8000";
let token = localStorage.getItem('token');

const userData = async (data) => {
    let response = await fetch(url + '/api/users/authorization', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': data
        },
    }).then(response => response.json());
    return response;
};
// userData(token).then((user)=>{
//     console.log(user);
// });
async function userFullName(){
    let user = await userData(token);
    console.log(user);
    return document.querySelector('#fullName').innerHTML = "<span>" +
        user['first_name']+" "+user['last_name'] +"</span>"
}
userFullName();

async function userAvatar(){
    let user = await userData(token);
    console.log(user);
    return document.querySelector('#profileAvatar').innerHTML = '<img style="width: 110px;height: 110px;position: absolute;border-radius: 50%" ' +
        'src=' + user['avatar']+ '>';
}
userAvatar();
document.querySelector('#delete').addEventListener('click', () => {
userData(token).then((user)=>{
    const deleteUser = async (data) => {
        let response = await fetch(url + '/api/users/'+data, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(window.location.href = "http://localhost:63343/adminJS/index.html")
            .then(localStorage.removeItem('token'));
    };deleteUser(user['id']);
    console.log(user['id']);
});
});

document.querySelector('#logout').addEventListener('click', () => {
    window.location.href = "http://localhost:63343/adminJS/index.html";
    localStorage.removeItem('token')
});

document.querySelector('#image').addEventListener('mouseenter', () => {
    document.querySelector("#upload").style = "display: block";
});
document.querySelector('#image').addEventListener('mouseleave', () => {
    document.querySelector("#upload").style = "display: none";
});






userData(token);