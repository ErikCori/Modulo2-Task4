
var url = "https://api.propublica.org/congress/v1/113/senate/members.json";

fetch(url, {
		headers: {
			"X-API-KEY": "vqwpr2eNBwzsoorSDYeNzcvBobBHoVdbvkINnMP4"
		}
	})
	.then(function (myData) {
		return myData.json();
		
	})
	.then(function (myData) {
		var data = myData;
		console.log(myData)
	})


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
