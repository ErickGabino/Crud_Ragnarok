$(async function(){

obtenerDatos();
// obtener datos
async function obtenerDatos() {

  // async fetch para obtener los datos de la base de datos a traves de http de la BD
 	try{
		let obtener = await fetch("http://localhost:3880/api/gods");
		if(obtener.ok){
			let data = await obtener.json();
			mostrarDioses(data);
		}else{
			throw new Error('Problema con internet.');
		}
	}catch(error){
		console.error('El problema es: ', error);
	}
	
	try{
		let response = await fetch("http://localhost:3880/api/giants");
		if(response.ok){
			let data = await response.json();
			mostrarGigantes(data);
		}


	}catch(error){
		console.error('El problema es: ',error);
	}
}
// cargar los documentos al cargar la pantalla
// document.addEventListener("DOMContentLoaded", obtenerDatos);

// Elementos del modal guardado en variables
var modal = document.getElementById("modal");
var modalBody = modal.querySelector(".modal-body");
var modalTitle = modal.querySelector(".modal-title");
var modalFooter = modal.querySelector(".modal-footer");

let tbodyGods = document.getElementById("tbodyGods");
let tbodyGiants = document.getElementById("tbodyGiants");
let resultados = "";

// Funciones para mostrar datos en la TABLA
async function mostrarDioses(dioses) {
  await dioses.forEach((dios) => {
    resultados += `
			<tr>
				<th scope="row">${dios.ID_God}</th>
				<td>${dios.Name}</td>
				<td>${dios.God}</td>
				<td>${dios.Power}</td>
				<td class="d-flex justify-content-center flex-column"">
					<button class="btn btn-danger removeGod" class="removeGod" id="removeGod" type="button" onclick="borrarRegistro(${dios.ID_God},'gods');"><span><i class="fa-solid fa-xmark"></i><p class="hidden-md">Remove God</p></span></button>
					<button class="btn btn-warning editGod" class="editGod" id="editGod" type="button" data-bs-toggle="modal" data-bs-target="#modal" onclick="editarRegistro(${dios.ID_God},'gods');"><span><i class="fa-solid fa-pen"></i><p class="hidden-md">Edit God</p></span></button>
					<button class="btn btn-info seeGod" class="seeGod" id="seeGod" type="button" data-bs-toggle="modal" data-bs-target="#modal" onclick="verRegistro(${dios.ID_God},'gods');"><span><i class="fa-solid fa-eye"></i><p class="hidden-md">See God</p></span></button>
				</td>
			</tr>
		`;
  });
  tbodyGods.innerHTML = resultados;
  resultados = "";
}

async function mostrarGigantes(gigantes) {
	await gigantes.forEach((gigante) => {
    resultados += `
			<tr>
				<th scope="row">${gigante.ID_Giant}</th>
				<td>${gigante.Name}</td>
				<td>${gigante.Giant}</td>
				<td>${gigante.Power}</td>
				<td class="d-flex justify-content-center flex-column">
					<button class="btn btn-danger removeGiant" id="removeGiant" type="button" onclick="borrarRegistro(${gigante.ID_Giant},'giants');"><span><i class="fa-solid fa-xmark"></i><p class="hidden-md">Remove Giant</p></span></button>
					<button class="btn btn-warning editGiant" id="editGiant" type="button" data-bs-toggle="modal" data-bs-target="#modal" onclick="editarRegistro(${gigante.ID_Giant},'giants');"><span><i class="fa-solid fa-pen"></i><p class="hidden-md">Edit Giant</p></span></button>
					<button class="btn btn-info seeGiant" id="seeGiant" type="button" data-bs-toggle="modal" data-bs-target="#modal" onclick="verRegistro(${gigante.ID_Giant},'giants');"><span><i class="fa-solid fa-eye"></i><p class="hidden-md">See Giant</p></span></button>
				</td>
			</tr>
		`;
  });
  tbodyGiants.innerHTML = resultados;
  resultados = "";
}

// FUNCIONES PARA MOSTRAR EN EL MODAL
// Con JQuery y on nos permite acceder a cada boton dependiendo de los registros
const on = async (element, event, selector, handler) => {
  await element.addEventListener(event, async (e) => {
    if (await e.target.closest(selector)) {
      await handler(e);
    }
  });
};

// FUNCION PARA AGREGAR DIOSES
on(document, "click", "#addGod", (e) => {
  modalTitle.innerHTML = document.getElementById("addGod").textContent;
  modalBody.innerHTML = `
	<form id="formAddGod">
		<div class="mb-3">
			<label for="nameGod" class="form-label">Name in the Netflix Serie</label>
			<input type="text" class="form-control" id="nameGod" aria-describedby="nameLabel">
		</div>
		<div class="mb-3">
			<label for="nameGodRepresentation" class="form-label">God's name</label>
			<input type="text" class="form-control" id="nameGodRepresentation" aria-describedby="nameLabel">
		</div>
		<div class="mb-3">
			<label for="powerGod" class="form-label">God's powers</label>
			<input type="text" class="form-control" id="powerGod" aria-describedby="powerLabel">
		</div>
		<div class="mb-3">
			<label for="imgGod" class="form-label">God's Image</label>
			<input type="file" class="form-control" id="imgGod" aria-describedby="imagenLabel" accept="image/*">
		</div>
		<button type="submit" class="btn btn-primary" id="btnSubmit">Add</button>
	</form>
	`;
  let formAddGod = document.getElementById("formAddGod");
  formAddGod.addEventListener("submit", async function (e) {
    e.preventDefault();
    let nameGod = document.getElementById("nameGod").value;
    let nameGodRepresentation = document.getElementById(
      "nameGodRepresentation"
    ).value;
    let powerGod = document.getElementById("powerGod").value;
    let imgGod = document.getElementById("imgGod").files[0].name;
	try{
		let response = await fetch("http://localhost:3880/api/gods", {
		  method: "POST",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify({
			Name: nameGod,
			God: nameGodRepresentation,
			Power: powerGod,
			img: imgGod,
		  }),
		})
		if(response.ok){
			let data = await response.json();
			obtenerDatos(data);
			$(modal).modal("hide");
		}
	}catch(error){
		console.error('Error: ',error);
	}
  });
});

// FUNCION PARA AGREGAR GIGANTES
on(document, "click", "#addGiant", (e) => {
  modalTitle.innerHTML = document.getElementById("addGiant").textContent;
  modalBody.innerHTML = `
	<form id="formAddGiant">
		<div class="mb-3">
			<label for="nameGiant" class="form-label">Name in the Netflix Serie</label>
			<input type="text" class="form-control" id="nameGiant" aria-describedby="nameLabel">
		</div>
		<div class="mb-3">
			<label for="nameGiantRepresentation" class="form-label">Giant's Name</label>
			<input type="text" class="form-control" id="nameGiantRepresentation" aria-describedby="nameLabel">
		</div>
		<div class="mb-3">
			<label for="powerGiant" class="form-label">Giant's power</label>
			<input type="text" class="form-control" id="powerGiant" aria-describedby="powerLabel">
		</div>
		<div class="mb-3">
			<label for="imgGiant" class="form-label">Giant's Image</label>
			<input type="file" class="form-control" id="imgGiant" aria-describedby="imagenLabel" accept="image/*">
		</div>
		<button type="submit" class="btn btn-primary">Add</button>
	</form>
	`;
  const formAddGiant = document.getElementById("formAddGiant");
	formAddGiant.addEventListener("submit", async function (e) {
		e.preventDefault();
		let nameGiant = document.getElementById("nameGiant").value;
		let nameGiantRepresentation = document.getElementById(
			"nameGiantRepresentation"
		).value;
		let powerGiant = document.getElementById("powerGiant").value;
		let imgGiant = document.getElementById("imgGiant").files[0].name;
		try{
			let response = await fetch("http://localhost:3880/api/giants", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					Name: nameGiant,
					Giant: nameGiantRepresentation,
					Power: powerGiant,
					img: imgGiant,
				}),
			})

			if(response.ok){
				let data = await response.json();
				obtenerDatos(data);
				$(modal).modal("hide");
			}
		}catch(error){
			console.error('Error: ',error);
		}
	});
});


// FUNCION PARA BORRAR REGISTRO

window.borrarRegistro = function borrarRegistro(id,tabla){
	//alert(id+' '+tabla);
	delete_register(id,tabla);
}

window.editarRegistro = function editRegistro(id, tabla){
	editarRegistro(id,tabla);
}

window.verRegistro = function seeRegistro(id, tabla){
	see_Registro(id,tabla);
}

function delete_register(id,tabla){
	alertify.confirm("Deseas eliminar este registro?",
		async function(){
			console.log(id,tabla);
			if(tabla == 'gods'){
				try{
					let llamadaApi = await fetch("http://localhost:3880/api/god/" + id, { method: "DELETE" });
	
					if(llamadaApi.ok){
						//console.log('CORRECTO || status: '+llamadaApi.status);
						let = respuestaApi = await llamadaApi.json();
						//console.log(respuestaApi);
						location.reload();
						alertify.success("Eliminado");
					}else{
						console.log('ERROR || status: '+llamadaApi.status);
					}
				}catch(error){
					console.error("Error: "+error);
				}
			}else if(tabla == 'giants'){
				try{
					let llamadaApi = await fetch("http://localhost:3880/api/giant/" + id, {method: "DELETE"});	
					if(llamadaApi.ok){
						//console.log('CORRECTO || status: '+llamadaApi.status);
						let = respuestaApi = await llamadaApi.json();
						//console.log(respuestaApi);
						location.reload();
						alertify.success("Eliminado");
					}else{
						console.log('ERROR || status: '+llamadaApi.status);
					}
				}catch(error){
					console.error("Error: "+error);
				}
			}
			
		}
	);
}

// FUNCION PARA EDITAR 
async function editarRegistro(id, tabla){
	//console.log("id: "+id+", tabla: "+tabla)
	modalTitle.innerHTML = 'Editar Registro';
	if(tabla == "gods"){
		let responseApi = await fetch("http://localhost:3880/api/god/"+id);
		if(responseApi.ok){
			let dataApi = await responseApi.json();
			console.log(dataApi[0]);
			modalBody.innerHTML = "";
			modalBody.innerHTML = `
				<form id="formEditGod" method="POST" action="#">
					<div class="mb-3">
						<label for="idGod" class="form-label">Id</label>
						<input type="text" class="form-control" id="idGod" aria-describedby="nameLabel" value='${dataApi[0].ID_God}' readonly>
					</div>
					<div class="mb-3">
						<label for="nameGod" class="form-label">Name in the Netflix Serie</label>
						<input type="text" class="form-control" id="nameGod" aria-describedby="nameLabel" value='${dataApi[0].Name}'>
					</div>
					<div class="mb-3">
						<label for="nameGodRepresentation" class="form-label">God's name</label>
						<input type="text" class="form-control" id="nameGodRepresentation" aria-describedby="nameLabel" value='${dataApi[0].God}'>
					</div>
					<div class="mb-3">
						<label for="powerGod" class="form-label">God's powers</label>
						<input type="text" class="form-control" id="powerGod" aria-describedby="powerLabel" value='${dataApi[0].Power}'>
					</div>
					<div class="mb-3">
						<p>
						<button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
							See Image
						</button>
						<div class="mb-3">
							<label for="formFile" class="form-label">Change Image</label>
							<input class="form-control" type="file" id="formFileGods" accept="image/*">
						</div>
						</p>
						<div style="min-height: 120px;">
						<div class="collapse collapse-horizontal" id="collapseWidthExample">
							<div class="card rounded shadow p-3 mb-5 bg-body-tertiary rounded" style="width: 100%;">
								<img src="../img/Gods/${dataApi[0].img}" alt="${dataApi[0].img}" class="border border-black">
							</div>
						</div>
						</div>
					</div>
					<button type="submit" class="btn btn-warning" id="btnSubmit">Update</button>
				</form>
			`;
			$('#formEditGod').submit(async function(e){
				e.preventDefault();
				let id = $('#idGod').val();
				let name = $('#nameGod').val();
				let god = $('#nameGodRepresentation').val();
				let power = $('#powerGod').val();
				let img = $('#formFileGods').val();

				if(img == ''){
					img = dataApi[0].img;
				}

				try{
					let response = await fetch("http://localhost:3880/api/god/"+id, {
					  method: "PUT",
					  headers: { "Content-Type": "application/json" },
					  body: JSON.stringify({
						Name: name,
						God: god,
						Power: power,
						img: img,
					  }),
					})
					if(response.ok){
						let data = await response.json();
						obtenerDatos(data);
						$(modal).modal("hide");
						alertify.success("Actualizado");
					}
				}catch(error){
					console.error('Error: ',error);
					alertify.error("Error: "+error);
				}

				console.log(id+' '+name+''+god+' '+power+' '+img);
				console.log(img);
			});
			//alert(dataApi[0].img)
		}
		
	}else if(tabla == "giants"){
		let responseApi = await fetch("http://localhost:3880/api/giant/"+id);
		if(responseApi.ok){
			let dataApi = await responseApi.json();
			console.log(dataApi[0]);
			modalBody.innerHTML="";
			modalBody.innerHTML = `
				<form id="formEditGiant">
					<div class="mb-3">
						<label for="idGiant" class="form-label">Id</label>
						<input type="text" class="form-control" id="idGiant" aria-describedby="nameLabel" value='${dataApi[0].ID_Giant}' readonly>
					</div>
					<div class="mb-3">
						<label for="nameGiant" class="form-label">Name in the Netflix Serie</label>
						<input type="text" class="form-control" id="nameGiant" aria-describedby="nameLabel" value='${dataApi[0].Name}'>
					</div>
					<div class="mb-3">
						<label for="nameGiantRepresentation" class="form-label">Giant's Name</label>
						<input type="text" class="form-control" id="nameGiantRepresentation" aria-describedby="nameLabel" value='${dataApi[0].Giant}'>
					</div>
					<div class="mb-3">
						<label for="powerGiant" class="form-label">Giant's power</label>
						<input type="text" class="form-control" id="powerGiant" aria-describedby="powerLabel" value='${dataApi[0].Power}'>
					</div>
					<div class="mb-3">
						<p>
						<button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
							Ver Imagen
						</button>
						<div class="mb-3">
							<label for="formFile" class="form-label">Change Image</label>
							<input class="form-control" type="file" id="formFileGiants">
						</div>
						</p>
						<div style="min-height: 120px;">
						<div class="collapse collapse-horizontal" id="collapseWidthExample">
							<div class="card rounded shadow p-3 mb-5 bg-body-tertiary rounded" style="width: 100%;">
								<img src="../img/Giants/${dataApi[0].img}" alt="${dataApi[0].img}" class="border border-black">
							</div>
						</div>
						</div>
					</div>
					<button type="submit" class="btn btn-warning">Update</button>
				</form>
			`;
			$('#formEditGiant').submit(async function(e){
				e.preventDefault();
				let id = $('#idGiant').val();
				let name = $('#nameGiant').val();
				let giant = $('#nameGiantRepresentation').val();
				let power = $('#powerGiant').val();
				let img = $('#formFileGiants').val();

				if(img == ''){
					img = dataApi[0].img;
				}

				try{
					let response = await fetch("http://localhost:3880/api/giant/"+id, {
					  method: "PUT",
					  headers: { "Content-Type": "application/json" },
					  body: JSON.stringify({
						Name: name,
						Giant: giant,
						Power: power,
						img: img,
					  }),
					})
					if(response.ok){
						let data = await response.json();
						obtenerDatos(data);
						$(modal).modal("hide");
						alertify.success("Actualizado");
					}
				}catch(error){
					console.error('Error: ',error);
					alertify.error("Error: "+error);
				}

				console.log(id+' '+name+''+god+' '+power+' '+img);
				console.log(img);
			});
		}
		
	}
}

async function see_Registro(id, tabla){
	modalTitle.innerHTML = "Ver Registro";
	if(tabla == "gods"){
		let responseApi = await fetch("http://localhost:3880/api/god/"+id);
		if(responseApi.ok){
			let dataApi = await responseApi.json();
			console.log(dataApi[0]);
			modalBody.innerHTML="";
			modalBody.innerHTML = `
				<div class="card text-center" style="width: 100%;">
					<img src="../img/Gods/${dataApi[0].img}" class="card-img-top" alt="...">
					<div class="card-body">
						<h2 class="card-title fw-bold">${dataApi[0].Name}</h2>
						<p class="card-text">${dataApi[0].God}</p>
						<p class="card-text">${dataApi[0].Power}</p>
					</div>
				</div>`;
		}
	}else if(tabla == "giants"){
		let responseApi = await fetch("http://localhost:3880/api/giant/"+id);
		if(responseApi.ok){
			let dataApi = await responseApi.json();
			console.log(dataApi[0]);
			modalBody.innerHTML="";
			modalBody.innerHTML = `
				<div class="card text-center" style="width: 100%;">
					<img src="../img/Giants/${dataApi[0].img}" class="card-img-top" alt="...">
					<div class="card-body">
						<h2 class="card-title fw-bold">${dataApi[0].Name}</h2>
						<p class="card-text">${dataApi[0].Giant}</p>
						<p class="card-text">${dataApi[0].Power}</p>
					</div>
				</div>`;
		}
	}	

}

});


