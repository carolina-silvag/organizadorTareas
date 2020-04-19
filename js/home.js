function iniciarPanelTarea() {

}

function crearTareaPanel() {
  var database = firebase.database();
  var docRef = db.collection("paneles");
  var userId = firebase.auth().currentUser.uid;
  database.ref('/paneles').once('value').then(function(snapshot) {
      console.log('snapshot', snapshot)
  // ...
  });
  /*db.collection("paneles").add({
    
    first: "Ada",
    last: "Lovelace",
    born: 1815
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });*/

    $("#crearTareaPanel").val('Crear Tarea 1 para carolina')
  }

function volverDeAlerta() {
  window.location.href = "./home.html"
}

function salirSesion() {
  firebase.auth().signOut().then(function() {
    window.location.href = "../index.html";
  }).catch(function(error) {
    // An error happened.
  });
}

function habilitarBoton() {
  let titulo = $("#titulo").val();
  let fecha_inicio = $("#fecha_inicio").val();
  let fecha_fin = $("#fecha_fin").val();
  let asignado = $("#asignado").val();
  let descripcion = $("#descripcion").val();
  if (titulo !== '' && fecha_inicio !== '' && fecha_fin !== '' && asignado !== '' && descripcion !== '') {
    $("#crearBoton").removeClass("btn-secondary")
    $("#crearBoton").removeAttr("disabled")
    $("#crearBoton").addClass("btn-primary") 
    $("#crearBoton").show()
  }
}
