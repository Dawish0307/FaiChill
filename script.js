document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const validEmail = "admin@gmail.com";
  const validPassword = "123456";

  if (email === validEmail && password === validPassword) {
    alert("Login successful!");
    window.location.href = "home.html";
  } else {
    alert("Incorrect email or password!");
  }
});
