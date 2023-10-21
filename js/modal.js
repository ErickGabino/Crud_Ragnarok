// Fetch para obtener los datos de la base de datos a traves de http de la BD
async function getTableData(){
	await fetch("http://localhost:3800/api/gods")
	  .then((response) => response.json())
	  .then((dataGods) => mostrarDioses(dataGods))
	  .catch((error) => {
		console.warn(`Error al obtener la lista de gods`);
	  });
	
	 await fetch("http://localhost:3800/api/giants")
	  .then((response) => response.json())
	  .then((dataGiant) => mostrarGigantes(dataGiant))
	  .catch((error) => {
		console.warn(`Error al obtener la lista de giants`);
	  });
	}
	
//invocar funcion asincrona llamar datos tabla
getTableData();

// Declaracion y escucha de los botones 
let btnAddGod = document.getElementById('addGod');
btnAddGod.addEventListener("click", addGod)

var btnRemoveGod = document.getElementById('removeGod');
btnRemoveGod.addEventListener("click", removeGod)

var btnEditGod = document.getElementById('editGod');
btnEditGod.addEventListener("click", editGod);

var btnSeeGod = document.getElementById('seeGod');
btnSeeGod.addEventListener("click", seeGod)

let btnAddGiant = document.getElementById('addGiant');
btnAddGiant.addEventListener("click", addGiant)

var btnRemoveGiant = document.getElementById('removeGiant');
btnRemoveGiant.addEventListener("click", removeGiant)

var btnEditGiant = document.getElementById('editGiant');
btnEditGiant.addEventListener("click", editGiant)

var btnSeeGiant = document.getElementById('seeGiant');
btnSeeGiant.addEventListener("click", seeGiant)

// Elementos del modal guardado en variables
var modal = document.getElementById('modal');
var modalBody = modal.querySelector('.modal-body');
var modalTitle = modal.querySelector('.modal-title');
var modalFooter = modal.querySelector('.modal-footer');	

function clearModal(){
	modalTitle.innerHTML="";
}

let tbodyGods = document.getElementById('tbodyGods');
let tbodyGiants = document.getElementById('tbodyGiants');
let resultados = '';

// Funciones para mostrar datos en la TABLA 
function mostrarDioses(dioses){
	// console.log(data[0].Name);
	dioses.forEach(dios => {
		resultados +=
		`
			<tr>
				<th scope="row">${dios.ID_God}</th>
				<td>${dios.Name}</td>
				<td>${dios.God}</td>
				<td>${dios.Power}</td>
				<td class="d-flex justify-content-center flex-column"">
					<button class="btn btn-danger removeGod" class="removeGod" id="removeGod" type="button" data-bs-toggle="modal" data-bs-target="#modal"><span><i class="fa-solid fa-xmark"></i><p class="hidden-md">Remove God</p></span></button>
					<button class="btn btn-warning editGod" class="editGod" id="editGod" type="button" data-bs-toggle="modal" data-bs-target="#modal"><span><i class="fa-solid fa-pen"></i><p class="hidden-md">Edit God</p></span></button>
					<button class="btn btn-info seeGod" class="seeGod" id="seeGod" type="button" data-bs-toggle="modal" data-bs-target="#modal"><span><i class="fa-solid fa-eye"></i><p class="hidden-md">See God</p></span></button>
				</td>
			</tr>
		`;
	});
	tbodyGods.innerHTML=resultados;
	resultados = '';
}

function mostrarGigantes(gigantes){
	gigantes.forEach(gigante => {
		resultados += `
			<tr>
				<th scope="row">${gigante.ID_Giant}</th>
				<td>${gigante.Name}</td>
				<td>${gigante.Giant}</td>
				<td>${gigante.Power}</td>
				<td class="d-flex justify-content-center flex-column">
					<button class="btn btn-danger removeGiant" id="removeGiant" type="button" data-bs-toggle="modal" data-bs-target="#modal"><span><i class="fa-solid fa-xmark"></i><p class="hidden-md">Remove Giant</p></span></button>
					<button class="btn btn-warning editGiant" id="editGiant" type="button" data-bs-toggle="modal" data-bs-target="#modal"><span><i class="fa-solid fa-pen"></i><p class="hidden-md">Edit Giant</p></span></button>
					<button class="btn btn-info seeGiant" id="seeGiant" type="button" data-bs-toggle="modal" data-bs-target="#modal"><span><i class="fa-solid fa-eye"></i><p class="hidden-md">See Giant</p></span></button>
				</td>
			</tr>
		`;
	});
	tbodyGiants.innerHTML=resultados;
	resultados='';
}

// FUNCIONES PARA MOSTRAR EN EL MODAL 
function addGod(){
	clearModal();
	modalTitle.innerHTML = btnAddGod.textContent;
	modalBody.innerHTML = `
	<form>
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
			<input type="file" class="form-control" id="imgGod" aria-describedby="imagenLabel">
		</div>
		<button type="submit" class="btn btn-primary">Add</button>
	</form>
	`;
}

function removeGod(){
	clearModal();
	modalTitle.innerHTML = btnRemoveGod.textContent;
	modalBody.innerHTML = 
	`
		<p>Deseas eliminar este Dios?</p>
		<h4>Seguro?</h4>
	`;
}

function editGod(){
	clearModal();
	modalTitle.innerHTML = btnEditGod.textContent;
	modalBody.innerHTML = `
	<form>
		<div class="mb-3">
			<label for="nameGod" class="form-label">Name in the Netflix Serie</label>
			<input type="text" class="form-control" id="nameGod" aria-describedby="nameLabel">
		</div>
		<div class="mb-3">
			<label for="nameGodRepresentation" class="form-label">God's name</label>
			<input type="text" class="form-control" id="nameGodRepresentation" aria-describedby="nameLabel">
		</div>
		<div class="mb-3">
			<label for="powerGod" class="form-label">God's power</label>
			<input type="text" class="form-control" id="powerGod" aria-describedby="powerLabel">
		</div>
		<div class="mb-3">
			<label for="imgGod" class="form-label">God's Image</label>
			<input type="file" class="form-control" id="imgGod" aria-describedby="imagenLabel">
		</div>
		<button type="submit" class="btn btn-warning">Edit</button>
	</form>
	`;
}

function seeGod(){
	clearModal();
	modalTitle.innerHTML = btnSeeGod.textContent;
}

function addGiant(){
	clearModal();
	modalTitle.innerHTML = btnAddGiant.textContent;
	modalBody.innerHTML = `
	<form>
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
			<input type="file" class="form-control" id="imgGiant" aria-describedby="imagenLabel">
		</div>
		<button type="submit" class="btn btn-primary">Add</button>
	</form>
	`;
}

function removeGiant(){
	clearModal();
	modalTitle.innerHTML = btnRemoveGiant.textContent;
}

function editGiant(){
	clearModal();
	modalTitle.innerHTML = btnEditGiant.textContent;
	modalBody.innerHTML = `
	<form>
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
			<input type="file" class="form-control" id="imgGiant" aria-describedby="imagenLabel">
		</div>
		<button type="submit" class="btn btn-warning">Edit</button>
	</form>
	`;
}

function seeGiant(){
	clearModal();
	modalTitle.innerHTML = btnSeeGiant.textContent;
}

