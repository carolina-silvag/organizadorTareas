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

function habilitarBoton() {
  let correo = $("#user").val();
  let password = $("#inputPassword").val();
  let check = $("#exampleCheck1").val();
  if (correo !== '' && password !== '' && check !== '') {
    $("#inicioSesion").removeClass("btn-secondary")
    $("#inicioSesion").removeAttr("disabled")
    $("#inicioSesion").addClass("btn-primary") 
    $("#inicioSesion").show()
  }
}
