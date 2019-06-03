if (document.getElementById('senate-data')) {
	var url = "https://api.propublica.org/congress/v1/113/senate/members.json";
} else {
	var url = "https://api.propublica.org/congress/v1/113/house/members.json";
}

var app = new Vue({
	el: '#app',
	data: {
		senators: [],
		partidos: [],
		leastLoyals: [],
		mostLoyals: [],
		leastEngageds: [],
		mostEngageds: [],
	}
})

fetch(url, {
		headers: {
			"X-API-KEY": "vqwpr2eNBwzsoorSDYeNzcvBobBHoVdbvkINnMP4"
		}
	})
	.then(function (myData) {
		return myData.json();
	})
	.then(function (myData) {
		data = myData;
		app.senators = data.results[0].members;
		implementarDatos()
	})


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

function implementarDatos() {
	//Array de miembros
	var miembros = data.results[0].members;
	//Array de partidos

	var ids = ["D", "R", "I"];
	var datosImportantes = crearListaDatosImportantes(miembros);
	var partidos = crearArrayPartidos(miembros, ids);
	statistics.number_of_democrats = partidos[0].cantMiembros;
	statistics.number_of_republicans = partidos[1].cantMiembros;
	statistics.number_of_independents = partidos[2].cantMiembros;
	statistics.democrats_average_votes_with_party = partidos[0].promedioVotos;
	statistics.republicans_average_votes_with_party = partidos[1].promedioVotos;
	statistics.independents_average_votes_with_party = partidos[2].promedioVotos;
	statistics.total = miembros.length;
	statistics.least_loyal = miembrosOrdenados(datosImportantes, "porcVotosConPartido", true);
	statistics.most_loyal = miembrosOrdenados(datosImportantes, "porcVotosConPartido", false);
	statistics.least_engaged = miembrosOrdenados(datosImportantes, "porcVotosPerdidos", false);
	statistics.most_engaged = miembrosOrdenados(datosImportantes, "porcVotosPerdidos", true);
	app.partidos = partidos;
	app.leastLoyals = statistics.least_loyal;
	app.mostLoyals = statistics.most_loyal;
	app.leastEngageds = statistics.least_engaged;
	app.mostEngageds = statistics.most_engaged;
}
//Funcion que crea lista de miembros por partido
function filtrarMiembrosPorPartido(miembros, partido) {
	var miembrosPartido = miembros.filter(miembro => miembro.party == partido);
	return miembrosPartido;
}

function crearArrayPartidos(miembros, ids) {
	var partidos = [];
	ids.forEach(function (id) {
		var partido = {
			id: "",
			miembrosPartido: [],
			cantMiembros: 0,
			promedioVotos: 0
		};
		partido.id = id;
		partido.miembrosPartido = filtrarMiembrosPorPartido(miembros, id);
		partido.cantMiembros = partido.miembrosPartido.length;
		if (partido.cantMiembros == 0) {
			partido.promedioVotos = 0;
		} else {
			partido.promedioVotos = promedioDeVotosPorPartido(partido.miembrosPartido);
		}
		partidos.push(partido);
	})
	return partidos;
}


function promedioDeVotosPorPartido(lista) {
	var cantidadMiembros = lista.length;
	var porcentajeTotalVotos = 0;
	lista.forEach(member => {
		porcentajeTotalVotos += member.votes_with_party_pct;
	})
	var promedio = porcentajeTotalVotos / cantidadMiembros;
	return promedio.toFixed(2);
}

function crearListaDatosImportantes(miembros) {
	var datosImportantes = [];
	miembros.forEach(miembro => {
		var datosMiembro = {
			nombre: "",
			party: "",
			votosConPartido: 0,
			porcVotosConPartido: 0,
			votosPerdidos: 0,
			porcVotosPerdidos: 0
		};
		if (miembro.middle_name == null) {
			datosMiembro.nombre = miembro.first_name + " " + miembro.last_name;
		} else {
			datosMiembro.nombre = miembro.first_name + " " + miembro.middle_name + " " + miembro.last_name;
		}
		datosMiembro.party = miembro.party;
		datosMiembro.votosConPartido = Math.trunc((miembro.total_votes * miembro.votes_with_party_pct) / 100);
		datosMiembro.porcVotosConPartido = miembro.votes_with_party_pct;
		datosMiembro.votosPerdidos = miembro.missed_votes;
		datosMiembro.porcVotosPerdidos = miembro.missed_votes_pct;
		datosImportantes.push(datosMiembro);

	})
	return datosImportantes;
}

//Ordenamiento
function ordenarLista(lista, dato, ascendente) {
	lista.sort(function (unElemento, otroElemento) {
		return ascendente ? unElemento[dato] - otroElemento[dato] : otroElemento[dato] - unElemento[dato];
	})
}

//Funcion para los menores
function miembrosOrdenados(lista, dato, ascendente) {
	var cantidadMiembros = lista.length;
	var porcentajeMinimo = cantidadMiembros * 0.1;
	ordenarLista(lista, dato, ascendente);
	var conMenosVotosConPartido = [];
	var i = 0;

	while (i < porcentajeMinimo || lista[i][dato] == lista[i - 1][dato]) {
		conMenosVotosConPartido.push(lista[i]);
		i++;
	}
	return conMenosVotosConPartido;
}