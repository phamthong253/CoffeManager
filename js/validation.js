const usernameRegister = document.querySelector('.input-signup-username');
const passwordRegister = document.querySelector('.input-signup-password');
const numberRegister = document.querySelector('.input-signup-number');
const btnRegister = document.querySelector('.signup__signInButton');
console.log(usernameRegister)

btnRegister.addEventListener('click', function(e){
    e.preventDefault();
    if(usernameRegister === "" || passwordRegister === "" || numberRegister === ""){
        alert("vui lòng nhập đầy đủ thông tin !")
    }
    else {
        const user = {
            username : usernameRegister.value,
            password : passwordRegister.value,
            number : numberRegister.value
        };
        let json = JSON.stringify(user);
        localStorage.setItem(usernameRegister.value,json);
        alert('Đăng kí thành công')
        window.location.href = 'login.html'
    }
})