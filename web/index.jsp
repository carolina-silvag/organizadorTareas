<%--
  Created by IntelliJ IDEA.
  User: edu_b
  Date: 15-04-2020
  Time: 22:08
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<link type="text/css" src="CSS/Estilo1.css">
<html>
  <head>
    <title>Organizator 3000</title>
  </head>
  <body>
  <h1>Creación de Tarea</h1>
  <div style="float: left; width: 500px;">
    <div style="float: left;margin-top: 5px;"><label style="float: left">Nombre Tarea</label><input type="text" id="txt_nom" class="est1" style="float: left; margin-left: 97px; width: 200px" placeholder="ingrese el nombre de la tarea..."></div>
    <div style="float: left;margin-top: 5px;"><label style="float: left">Fecha Inicio Tarea</label><input type="date" id="txt_f_ini" class="est1" style="float: left; margin-left: 70px; width: 200px;"></div>
    <div style="float: left;margin-top: 5px;"><label style="float: left">Fecha Finalizaci&oacute;n Tarea</label><input type="date" id="txt_f_fin" class="est1" style="float: left; margin-left: 29px; width: 200px;"></div>
    <div style="float: left;margin-top: 5px;"><label style="float: left">Descripci&oacute;n Tarea</label><textarea id="txt_desc" class="est1" style="float: left; margin-left: 72px; width: 200px; height: 60px" placeholder="ingrese sus comentarios"></textarea></div>
    <div style="float: left;margin-top: 5px;"><label style="float: left">Asignar Tarea</label><select id="select_asigna" style="float: left; margin-left: 97px; width: 200px"><option value="vacio">Seleccione</option><option value="wn1">Miembro1</option><option value="wn2">Miembro2</option></select></div>
  </div>
  </body>
</html>
