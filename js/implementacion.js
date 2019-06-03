if (document.getElementById('senate-data')) {
	var url = "https://api.propublica.org/congress/v1/113/senate/members.json";
} else {
	var url = "https://api.propublica.org/congress/v1/113/house/members.json";
}



var app = new Vue({
	el: '#app',
	data: {
		senators: [],
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

function implementarDatos() {
	//Array de miembros
	var miembros = data.results[0].members;
	//para el caso de un cambio en los checkboxes
	var checkBoxes = document.querySelectorAll('input[name=party]');
	checkBoxes.forEach(input => input.onchange = filtrarYMostrarTabla);
	//Array de estados
	var estados = miembros.map(miembro => miembro.state);
	//ordenamiento del array de estados
	estados = estados.filter((estado, i, array) => array.indexOf(estado) === i);
	estados.sort();

	//llamo a la funcion que crea la lista de estados del dropdown
	listaDropdownEstados(estados);

	//llamo a la funcion que crea la tabla 
	filtrarYMostrarTabla();

	function filtrarYMostrarTabla() {
		var checkBoxesSelec = document.querySelectorAll('input[name=party]:checked');
		var partidosSelec = Array.from(checkBoxesSelec).map(element => element.value);

		var filtradoPorPartido = miembro => {
			if (partidosSelec.indexOf(miembro.party) > -1) {
				return miembro;
			}
		}
		miembrosFiltrados = miembros.filter(filtradoPorPartido);

		var estadoSelec = document.getElementById("dropStates").value;
		if (estadoSelec != "") {
			miembrosFiltrados = miembrosFiltrados.filter(miembro => miembro.state == estadoSelec);
		}
		app.senators = miembrosFiltrados;
	}

	//funcion que crea la lista de estados del dropdown
	function listaDropdownEstados(estados) {
		var listaDropdown = document.getElementById("dropStates");

		listaDropdown.onchange = filtrarYMostrarTabla();

		estados.forEach(estado => {
			var opcion = document.createElement("option");
			opcion.value = estado;
			opcion.innerText = estado;
			listaDropdown.appendChild(opcion);
		})
	}

}

//funcion para filtrar y mostrar la tabla