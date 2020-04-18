function crearTareaPanel() {
  console.log('****entre y cree tarea')
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

