const getValue = inputId => document.getElementById(inputId).value;
const selectId = tagId => document.getElementById(tagId);

//signup user
const addToLocal = () => {
    const data = getData();
    localStorage.setItem('users', data);
    sessionStorage.setItem('users', data);
    checkUser();
}
const getData = () => {
    let data = {};
    const username = getValue('username');
    const password = getValue('password');
    data = { username, password };
    const dataString = JSON.stringify(data);
    return dataString;
}

//check if user already exist

const checkUser = () => {
    const data = localStorage.getItem('users');
    const dataObj = JSON.parse(data);
    if (dataObj) {
        selectId('form-area').innerHTML = `
            User created, Please login <a href="login.html"> click here </a>
        `;
    }
    checkLogin();
}

//check if user already login

const checkLogin = () => {
    const data = sessionStorage.getItem('users');
    const dataObj = JSON.parse(data);
    if (dataObj) {
        location.assign('dashboard.html');
    }
}

//check if not login 
const checkNotLogin = () => {
    const data = sessionStorage.getItem('users');
    const dataObj = JSON.parse(data);
    if (!dataObj) {
        location.assign('login.html');
    }
}


// login and add to session
const addToSession = () => {
    const data = localStorage.getItem('users');
    const dataObj = JSON.parse(data);
    if (getValue('username') === dataObj.username && getValue('password') === dataObj.password) {
        sessionStorage.setItem('users', data);
        checkLogin();
    }
    else {
        alert('invalid user');
    }


}

//log Out 

const logOut = () => {
    sessionStorage.clear('users');
    location.assign('index.html');
}

// create posts 

const createPost = () => {
    let data = postData();
    localStorage.setItem('posts', data);
    showPost();
    selectId('post-title').value = '';
    selectId('post-info').value = '';
}

const postData = () => {
    document.getElementById('datePicker').value = new Date().toISOString().slice(0, 10);
    const todayDate = document.getElementById('datePicker').value;
    const postTitle = getValue('post-title');
    const postInfo = getValue('post-info');
    data = { todayDate, postTitle, postInfo };
    const dataString = JSON.stringify(data);
    return dataString;
}

// show posts 

const showPost = () => {
    const data = localStorage.getItem('posts');
    if (data) {
        const dataObj = JSON.parse(data);
        const ol = selectId('post-list');
        const li = document.createElement('li');
        li.innerHTML = dataObj.postTitle;
        ol.appendChild(li);
    }

}
showPost();

