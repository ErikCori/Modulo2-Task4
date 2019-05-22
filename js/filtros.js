//funcion para filtrar y mostrar la tabla
function filtrarYMostrarTabla(){
	var checkBoxesSelec = document.querySelectorAll('input[name=party]:checked');
	var partidosSelec = Array.from(checkBoxesSelec).map(element => element.value);
	
	var filtradoPorPartido = miembro => {
    if(partidosSelec.indexOf(miembro.party) > -1){
      return miembro;
    }
  }
	miembrosFiltrados = miembros.filter(filtradoPorPartido);
	
	var estadoSelec = document.getElementById("dropStates").value;
  if (estadoSelec != ""){
    miembrosFiltrados = miembrosFiltrados.filter(miembro => miembro.state == estadoSelec);
  }
	crearTablaEnHtml(miembrosFiltrados);
}

//funcion que crea la lista de estados del dropdown
function listaDropdownEstados(estados){
  var listaDropdown = document.getElementById("dropStates");

  listaDropdown.onchange = filtrarYMostrarTabla;

  estados.forEach(estado => {
    var opcion = document.createElement("option");
    opcion.value = estado;
    opcion.innerText = estado;
    listaDropdown.appendChild(opcion);
  })
}