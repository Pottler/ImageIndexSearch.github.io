function showRegisterForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('form-title').innerHTML = 'Registro';
    document.getElementById('error-message').innerHTML = '';
  }
  
  function showLoginForm() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('form-title').innerHTML = 'Iniciar sesión';
    document.getElementById('error-message').innerHTML = '';
  }
  
  function register() {
    var username = document.getElementById('register-username').value;
    var password = document.getElementById('register-password').value;
  
    if (username && password) {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      showLoginForm();
    } else {
      document.getElementById('error-message').innerHTML = 'Por favor, complete todos los campos.';
    }
  }
  
  function login() {
    var username = document.getElementById('login-username').value;
    var password = document.getElementById('login-password').value;
    var savedUsername = localStorage.getItem('username');
    var savedPassword = localStorage.getItem('password');
  
    if (username === savedUsername && password === savedPassword) {
      // Redireccionar a la página después de iniciar sesión exitosamente
      window.location.href = '../index.html'; // Reemplaza 'pagina-web.html' con la URL de la página que deseas abrir después del inicio de sesión exitoso
    } else {
      document.getElementById('error-message').innerHTML = 'Usuario o contraseña incorrectos.';
    }
  }
  