// all inputs
var signupName = document.getElementById('signupName')
var signupEmail = document.getElementById('signupEmail')
var signupPassword = document.getElementById('signupPassword')
var signinEmail = document.getElementById('signinEmail')
var signinPassword = document.getElementById('signinPassword')
    // to get base url (localhost)
var pathparts = location.pathname.split('/');
var baseURL = ''
for (var i = 0; i < pathparts.length - 1; i++) {
    baseURL += '/' + pathparts[i]
}
console.log(baseURL);





// check inputs is empty 
function isEmpty() {

    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return false
    } else {
        return true
    }
}


// to put welcome + user name
var username = localStorage.getItem('sessionUsername')
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username
}

var signUpArr = []
if (localStorage.getItem('users') == null) {
    signUpArr = []
} else {
    signUpArr = JSON.parse(localStorage.getItem('users'))
}



//  check email is exist
function isEmailExist() {
    for (var i = 0; i < signUpArr.length; i++) {
        if (signUpArr[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false
        }
    }
}





function signUp() {
    if (isEmpty() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    var signUp = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    }
    if (signUpArr.length == 0) {
        signUpArr.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpArr))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
        return true
    }
    if (isEmailExist() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">email already exists</span>'

    } else {
        signUpArr.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpArr))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'

    }


}




// login

// check inputs is empty
function isLoginEmpty() {

    if (signinPassword.value == "" || signinEmail.value == "") {
        return false
    } else {
        return true
    }
}

function login() {
    if (isLoginEmpty() == false) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    var password = signinPassword.value
    var email = signinEmail.value
    for (var i = 0; i < signUpArr.length; i++) {
        if (signUpArr[i].email.toLowerCase() == email.toLowerCase() && signUpArr[i].password.toLowerCase() == password.toLowerCase()) {
            localStorage.setItem('sessionUsername', signUpArr[i].name)
            // if (baseURL == '/') {
            //     location.replace('https://' + location.hostname + '/home.html')

            // } else {
            //     location.replace(baseURL + '/home.html')

            // }

            location.href="home.html"

        } else {
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
        }
    }

}




//  logout
function logout() {
    localStorage.removeItem('sessionUsername')
}