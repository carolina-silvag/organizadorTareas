
function iniciarSesion() {
  let email = $("#user").val();
  let password = $("#inputPassword").val();
  firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {
    window.location.href = "./app/home.html"
  }).catch(function(error) {
    $("#user").val("");
    $("#inputPassword").val("");
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Tu correo o contraseña es incorrecta! Vuelve a ingresar tus datos'
    });
  });
  
}

function habilitarBoton() {
  let correo = $("#user").val();
  let password = $("#inputPassword").val();
  if (correo !== '' && password !== '' && ValidateEmail()) {
    $("#inicioSesion").removeClass("btn-secondary")
    $("#inicioSesion").removeAttr("disabled")
    $("#inicioSesion").addClass("btn-primary") 
    $("#inicioSesion").show()
  }
}

function ValidateEmail() 
{
 if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test($("#user").val()))
  {
    $("#validarCorreo").html('');
    return (true)
  }
  $("#validarCorreo").html('   correo invalido!');
  return (false)
}
