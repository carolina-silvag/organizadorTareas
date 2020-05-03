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
const paneles = firebase.database().ref("/paneles/proyecto_1");
const usuarios = firebase.database().ref("/usuarios");

paneles.on('value', function(snapshot){
  iniciarPanelTareas();
  iniciarPanelTareasEnProceso();
  iniciarPanelTareasRelizadas();
  agregarTareasAPaneles(snapshot);
});

usuarios.on('value', function(snapshot) {
  snapshot.forEach(element => {
    //crearTarjeta(element.val(), element.key);
    let asignar = $('<option>'+element.val().nombre+'</option>');
    $("#asignado").append(asignar);
  });
})

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

  if(tarea.color == undefined) {
    tarea.color = "Amarrillo";
  }

  let tareaHtml = $('<div class="tarea_'+tarea.color+' col-md-6 draggable"><p id="tituloEnTarjeta" class="tituloTarjeta line-clamp"><strong>'+tarea.titulo+'</strong></p><p id="tituloEnTarjeta" class="tituloTarjeta">'+tarea.fecha_inicio+'</p><div class="row"><div class="col-6"><p id="fechaEnTarjeta"></div><div class="col-6"><div id="responsableEnTarjeta">'+tarea.asignada+'</div></div></div></div>');
  tareaHtml.data("idTarea", idTarea);
  $("#"+idPanel).append(tareaHtml);
  $(".draggable").draggable({
    appendTo: "body",
    cursor: "move",
    helper: 'clone',
    revert: "invalid"
  });
}

// generar id de tarea creada
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function crearTareaPanel() {
  var paneles = firebase.database();
  var asignar = firebase.database();
  var userId = firebase.auth().currentUser.uid;

  paneles.ref('/paneles/proyecto_1/'+ uuidv4()).set({
    asignada: $("#asignado").val(),
    descripcion: $("#descripcion").val(),
    fecha_inicio : $("#fecha_inicio").val(),
    fecha_fin: $("#fecha_fin").val(),
    titulo: $("#titulo").val(),
    estado: "porHacer",
    color: $("#colorTarea").val()
  });
  $("#asignado").val("");
  $("#descripcion").val("");
  $("#fecha_inicio").val("");
  $("#fecha_fin").val("");
  $("#titulo").val("");
  $("#colorTarea").val("");

  $("#modalCrearTarea").modal('toggle');

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
  let color = $("#colorTarea").val();
  let descripcion = $("#descripcion").val();
  if (titulo !== '' && fecha_inicio !== '' && fecha_fin !== '' && asignado !== '' && color !== '' && descripcion !== '') {
    $("#crearBoton").removeClass("btn-secondary")
    $("#crearBoton").removeAttr("disabled")
    $("#crearBoton").addClass("btn-primary") 
    $("#crearBoton").show()
  }
}

// Codigo para drag and drop
function updateEstadoTarea(estado, tareaId)
{
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