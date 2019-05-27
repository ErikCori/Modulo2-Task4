
function crearTablaAtGlance(lista){
	var tabla = document.getElementById('table-atGlance');
    tabla.innerHTML = "";
	var contenidoTabla = crearContenidoTablaAtGlance(lista);
	tabla.innerHTML = contenidoTabla;
}
function crearTablaAttendance(id, lista){
	var tabla = document.getElementById(id);
	tabla.innerHTML ="";
	var contenidoTabla = crearContenidoTablaAttendance(lista);
	tabla.innerHTML = contenidoTabla;
}
function crearTablaLoyalty(id, lista){
	var tabla = document.getElementById(id);
	tabla.innerHTML ="";
	var contenidoTabla = crearContenidoTablaLoyalty(lista);
	tabla.innerHTML = contenidoTabla;
}


//Funcion que crea el contenido de la tabla senate at glance
function crearContenidoTablaAtGlance(elementos){
    var tabla = '<thead class="thead"><tr><th>Party</th><th>Number of Reps</th><th>% Votes with Party</th></tr></thead>';
    tabla  += '<tbody>';
	
	elementos.forEach(elemento =>{
		tabla += '<tr>';
		tabla += '<td class="party">'+elemento.id+'</td>';
        if(elemento.cantMiembros == 0){
            tabla += '<td class="numberOfReps">0</td>';
            tabla += '<td class="porcVotesWithParty">0</td>';
        }else{
            tabla += '<td class="numberOfReps">'+elemento.cantMiembros+'</td>';
            tabla += '<td class="porcVotesWithParty">'+elemento.promedioVotos+'</td>';
        }
		tabla += '</tr>';
	})
	tabla += '</tbody>';
	return tabla
}
//Funcion que crea el contenido de la tabla de asistencias
function crearContenidoTablaAttendance(elementos){
	var tabla = '<thead class="thead"><tr><th>Name</th><th>Number of Missed Votes</th><th>% Missed</th></tr></thead>';
	tabla += '<tbody>';
	
	elementos.forEach(elemento =>{
		tabla += '<tr>';
		tabla += '<td class="name">'+elemento.nombre+'</td>';
		tabla += '<td class="numberOfMissedVotes">'+elemento.votosPerdidos+'</td>';
		tabla += '<td class="porcMissedVotes">'+elemento.porcVotosPerdidos+'</td>';
		tabla += '</tr>';
	})
	tabla += '</tbody>';
	return tabla
}
function crearContenidoTablaLoyalty(elementos){
	var tabla = '<thead class="thead"><tr><th>Name</th><th>Number of Votes with Party</th><th>% Votes with Party</th></tr></thead>';
	tabla += '<tbody>';
	
	elementos.forEach(elemento =>{
		tabla += '<tr>';
		tabla += '<td class="name">'+elemento.nombre+'</td>';
		tabla += '<td class="numberOfPartyVotes">'+elemento.votosConPartido+'</td>';
		tabla += '<td class="porcPartyVotes">'+elemento.porcVotosConPartido+'</td>';
		tabla += '</tr>';
	})
	tabla += '</tbody>';
	return tabla
}