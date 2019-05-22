var statistics = {
	number_of_democrats: 0,
	number_of_republicans: 0,
	number_of_independents: 0,
	total: 0,
	democrats_average_votes_with_party: 0,
	republicans_average_votes_with_party: 0,
	independents_average_votes_with_party: 0,
	least_engaged: [],
	most_engaged: [],
	least_loyal: [],
	most_loyal: []
}
//Array de miembros
var miembros = data.results[0].members;
//Array de partidos
var partidos = [];
var datosImportantes = crearListaDatosImportantes();
var ids = ["D", "R", "I"];
//Funcion que crea lista de miembros por partido
function filtrarMiembrosPorPartido(partido) {
	var miembrosPartido = miembros.filter(miembro => miembro.party == partido);
	return miembrosPartido;
}

function crearArrayPartidos() {
	ids.forEach(function (id) {
		var partido = {
			id: "",
			miembrosPartido: [],
			cantMiembros : 0,
			promedioVotos: 0
		};
		partido.id = id;
		partido.miembrosPartido = filtrarMiembrosPorPartido(id);
		partido.cantMiembros = partido.miembrosPartido.length;
		partido.promedioVotos = promedioDeVotosPorPartido(partido.miembrosPartido);
		partidos.push(partido);
	})
}


function promedioDeVotosPorPartido(lista) {
	var cantidadMiembros = lista.length;
	var porcentajeTotalVotos = 0;
	lista.forEach(member => {
		porcentajeTotalVotos += member.votes_with_party_pct;
	})
	var promedio = porcentajeTotalVotos / cantidadMiembros;
	return promedio;
}

function crearListaDatosImportantes() {
	var datosImportantes = [];
	miembros.forEach(miembro => {
		var datosMiembro = {
			nombre: "",
			party: "",
			votosConPartido : 0,
            porcVotosConPartido : 0,
			votosPerdidos : 0,
			porcVotosPerdidos : 0
		};
		if (miembro.middle_name == null) {
			datosMiembro.nombre = miembro.first_name + " " + miembro.last_name;
		} else {
			datosMiembro.nombre = miembro.first_name + " " + miembro.middle_name + " " + miembro.last_name;
		}
		datosMiembro.party = miembro.party;
        datosMiembro.votosConPartido = miembro.total_votes - miembro.missed_votes;  
		datosMiembro.porcVotosConPartido = miembro.votes_with_party_pct;
		datosMiembro.votosPerdidos = miembro.missed_votes;
		datosMiembro.porcVotosPerdidos = miembro.missed_votes_pct;
		datosImportantes.push(datosMiembro);
		
	})
	return datosImportantes;
}

//Ordenamiento Descendente
function ordenarListaDescendente(lista, dato) {
	if(dato == "votosConPartido"){
	lista.sort(function (unElemento, otroElemento) {
		if (unElemento.votosConPartido > otroElemento.votosConPartido) {
			return -1;
		}
		if (unElemento.votosConPartido < otroElemento.votosConPartido) {
			return 1;
		}
		return 0;
	})
	}if(dato == "votosPerdidos"){
		lista.sort(function (unElemento, otroElemento) {
		if (unElemento.votosPerdidos > otroElemento.votosPerdidos) {
			return -1;
		}
		if (unElemento.votosPerdidos < otroElemento.votosPerdidos) {
			return 1;
		}
		return 0;
	})
	}
}
//Ordenamiento Ascendente
function ordenarListaAscendente(lista, dato) {
	if(dato == "votosConPartido"){
	lista.sort(function (unElemento, otroElemento) {
		if (unElemento.votosConPartido > otroElemento.votosConPartido) {
			return 1;
		}
		if (unElemento.votosConPartido < otroElemento.votosConPartido) {
			return -1;
		}
		return 0;
	})
	}if(dato == "votosPerdidos"){
		lista.sort(function (unElemento, otroElemento) {
		if (unElemento.votosPerdidos > otroElemento.votosPerdidos) {
			return 1;
		}
		if (unElemento.votosPerdidos < otroElemento.votosPerdidos) {
			return -1;
		}
		return 0;
	})
	}
}
//Funcion para los menores
function miembrosConMenosVotosConPartido() {
	var cantidadMiembros = datosImportantes.length;
	var porcentajeMinimo = cantidadMiembros * 0.1;
	ordenarListaAscendente(datosImportantes, "votosConPartido");
	var conMenosVotosConPartido = [];
	var i =0;

	while (i < porcentajeMinimo ||datosImportantes[i].votosConPartido == datosImportantes[i-1].votosConPartido) {
		conMenosVotosConPartido.push(datosImportantes[i]);
		i++;
	}
	return conMenosVotosConPartido;
}
function miembrosConMenosVotosPerdidos() {
	var cantidadMiembros = datosImportantes.length;
	var porcentajeMinimo = cantidadMiembros * 0.1;
	ordenarListaAscendente(datosImportantes, "votosPerdidos");
	var conMenosVotosPerdidos = [];
	var i =0;

	while (i < porcentajeMinimo ||datosImportantes[i].votosPerdidos == datosImportantes[i-1].votosPerdidos) {
		conMenosVotosPerdidos.push(datosImportantes[i]);
		i++;
	}
	return conMenosVotosPerdidos;
}
//Funcion para mayores
function miembrosConMasVotosConPartido(){
	var cantidadMiembros = datosImportantes.length;
	var porcentajeMinimo = cantidadMiembros *0.1;
	ordenarListaDescendente(datosImportantes, "votosConPartido");
	var conMasVotosConPartido = [];
	var i = 0;
	
	while(i< porcentajeMinimo || datosImportantes[i].votosConPartido == datosImportantes[i-1].votosConPartido) {
		conMasVotosConPartido.push(datosImportantes[i]);
		i++;
	}
	ordenarListaDescendente(conMasVotosConPartido, "votosConPartido");
	return conMasVotosConPartido;
}

function miembrosConMasVotosPerdidos(){
	var cantidadMiembros = datosImportantes.length;
	var porcentajeMinimo = cantidadMiembros *0.1;
	ordenarListaDescendente(datosImportantes, "votosPerdidos");
	var conMasVotosPerdidos = [];
	var i = 0;
	
	while(i< porcentajeMinimo || datosImportantes[i].votosPerdidos == datosImportantes[i-1].votosPerdidos) {
		conMasVotosPerdidos.push(datosImportantes[i]);
		i++;
	}
	ordenarListaDescendente(conMasVotosPerdidos, "votosPerdidos");
	return conMasVotosPerdidos;
}


crearArrayPartidos();
statistics.number_of_democrats = partidos[0].cantMiembros;
statistics.number_of_republicans = partidos[1].cantMiembros;
statistics.number_of_independents = partidos[2].cantMiembros;
statistics.democrats_average_votes_with_party = partidos[0].promedioVotos;
statistics.republicans_average_votes_with_party = partidos[1].promedioVotos;
statistics.independents_average_votes_with_party = partidos[2].promedioVotos;
statistics.total = miembros.length;
statistics.least_loyal = miembrosConMenosVotosConPartido();
statistics.most_loyal = miembrosConMasVotosConPartido();
statistics.least_engaged = miembrosConMenosVotosPerdidos();
statistics.most_engaged= miembrosConMasVotosPerdidos();


console.log(datosImportantes);

