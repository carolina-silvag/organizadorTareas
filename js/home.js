var numeroTarea;
var listaTareas = [];

var firebaseConfig = {
  apiKey: "AIzaSyCqAGpdXW0koh4OYO-JGIgdBbua8NYV_f4",
  authDomain: "tarefa-c987b.firebaseapp.com",
  databaseURL: "https://tarefa-c987b.firebaseio.com",
  projectId: "tarefa-c987b",
  storageBucket: "tarefa-c987b.appspot.com",
  messagingSenderId: "1044801539130",
  appId: "1:1044801539130:web:ba5ebce9ee6ef399df3903",
  measurementId: "G-G3Z0W83K56"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    // ...
    // User is signed out.
    // ...
  }
});
var paneles = firebase.database().ref("/paneles/proyecto_1");

paneles.on('value', function(snapshot){
  console.log(snapshot.val());
  iniciarPanelTareas();
  iniciarPanelTareasEnProceso();
  iniciarPanelTareasRelizadas();
  agregarTareasAPaneles(snapshot);
});

function agregarTareasAPaneles(datos) {
  numeroTarea = datos.numChildren() + 1;
  datos.forEach(element => {
    crearTarjeta(element.val(), element.key);
  });
}

function iniciarPanelTareas() {
  $("#crearTareaPanel").html("");
  $('#crearTareaPanel').addClass("pizarra");
}

function iniciarPanelTareasEnProceso() {
  $("#tareaPanelEnProceso").html("");
  $('#tareaPanelEnProceso').addClass("pizarra")
}

function iniciarPanelTareasRelizadas() {
  $("#tareaPanelRealizadas").html("");
  $('#tareaPanelRealizadas').addClass("pizarra")
}

function crearTarjeta(tarea, idTarea) {
  let idPanel = "crearTareaPanel";

  if(tarea.estado == "haciendo") {
    idPanel = "tareaPanelEnProceso";
  }

  if(tarea.estado == "hecho") {
    idPanel = "tareaPanelRealizadas";
  }

  let tareaHtml = $('<div class="tarea col-md-6 draggable"><p id="tituloEnTarjeta" class="tituloTarjeta line-clamp"><strong>'+tarea.titulo+'</strong></p><p id="tituloEnTarjeta" class="tituloTarjeta">'+tarea.fecha_inicio+'</p><div class="row"><div class="col-6"><p id="fechaEnTarjeta"></div><div class="col-6"><div id="responsableEnTarjeta">'+tarea.asignada+'</div></div></div></div>');
  tareaHtml.data("idTarea", idTarea);
  $("#"+idPanel).append(tareaHtml);
  $(".draggable").draggable({
    appendTo: "body",
    cursor: "move",
    helper: 'clone',
    revert: "invalid"
  });
}

function crearTareaPanel() {
  var database = firebase.database();
  var paneles = firebase.database();
  var userId = firebase.auth().currentUser.uid;
  paneles.ref('/paneles/proyecto_1/tarea'+ numeroTarea).set({
    asignada: $("#asignado").val(),
    descripcion: $("#descripcion").val(),
    fecha_inicio : $("#fecha_inicio").val(),
    fecha_fin: $("#fecha_fin").val(),
    titulo: $("#titulo").val(),
    estado: "porHacer"
  });

  $("#modalCrearTarea").modal('toggle');

  
  
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

// Codigo para drag and drop
function updateEstadoTarea(estado, tareaId)
{
  console.log("UPDATE", estado, tareaId);
  firebase.database().ref('paneles/proyecto_1/' + tareaId).update({
    estado: estado
  });
}

$("#crearTareaPanel").droppable({
  tolerance: "intersect",
  accept: ".draggable",
  activeClass: "ui-state-default",
  hoverClass: "ui-state-hover",
  drop: function(event, ui) {        
      $(this).append($(ui.draggable));
      updateEstadoTarea("porHacer", ui.draggable.data("idTarea"));
  }
});

$("#tareaPanelEnProceso").droppable({
  tolerance: "intersect",
  accept: ".draggable",
  activeClass: "ui-state-default",
  hoverClass: "ui-state-hover",
  drop: function(event, ui) {
    console.log(ui.draggable.data("idTarea"));
      $(this).append($(ui.draggable));
      updateEstadoTarea("haciendo", ui.draggable.data("idTarea"));
  }
});
$("#tareaPanelRealizadas").droppable({
  tolerance: "intersect",
  accept: ".draggable",
  activeClass: "ui-state-default",
  hoverClass: "ui-state-hover",
  drop: function(event, ui) {        
      $(this).append($(ui.draggable));
      updateEstadoTarea("hecho", ui.draggable.data("idTarea"));
  }
});