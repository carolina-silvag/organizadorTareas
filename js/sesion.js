function iniciarSesion() {
  console.log("hola");
  let email = $("#user").val();
  console.log('¨¨¨¨****+email', email)
  let password = $("#inputPassword").val();
  firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {
    window.location.href = "./app/home.html"
  }).catch(function(error) {
    
  });
  
}

