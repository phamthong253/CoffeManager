const usernameLogin = document.querySelector('.input-login-username');
const passwordLogin = document.querySelector('.input-login-password');
const numberLogin = document.querySelector('.input-login-number');
const btnLogin = document.querySelector('.login__signInButton');

btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    if(usernameLogin.value === "" || passwordLogin.value === "" || numberLogin.value === ""){
        alert("Vui lòng nhập đầy đủ thông tin !");
    }else {
        const user = JSON.parse(localStorage.getItem(usernameLogin.value));
        console.log(user)
        if(
            user.username == usernameLogin.value &&
            user.password == passwordLogin.value &&
            user.number == numberLogin.value
            ){
                alert("Đăng nhập thành công !");
                window.location.href = 'homepage.html'
            }
            else{
                alert("Sai thông tin, vui lòng nhập lại !");
                }
            }
});

