$(function(){

obtenerDatos();
// obtener datos
async function obtenerDatos() {
  // async fetch para obtener los datos de la base de datos a traves de http de la BD
  await fetch("http://localhost:3880/api/gods")
    .then((response) => response.json())
    .then((dataGods) => mostrarDioses(dataGods))
    .catch((error) => {
      console.warn(`Error al obtener la lista de gods`);
    });

  await fetch("http://localhost:3880/api/giants")
    .then((response) => response.json())
    .then((dataGiant) => mostrarGigantes(dataGiant))
    .catch((error) => {
      console.warn(`Error al obtener la lista de giants`);
    });
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
function mostrarDioses(dioses) {
  dioses.forEach((dios) => {
    resultados += `
			<tr>
				<th scope="row">${dios.ID_God}</th>
				<td>${dios.Name}</td>
				<td>${dios.God}</td>
				<td>${dios.Power}</td>
				<td class="d-flex justify-content-center flex-column"">
					<button class="btn btn-danger removeGod" class="removeGod" id="removeGod" type="button"><span><i class="fa-solid fa-xmark"></i><p class="hidden-md">Remove God</p></span></button>
					<button class="btn btn-warning editGod" class="editGod" id="editGod" type="button" data-bs-toggle="modal" data-bs-target="#modal"><span><i class="fa-solid fa-pen"></i><p class="hidden-md">Edit God</p></span></button>
					<button class="btn btn-info seeGod" class="seeGod" id="seeGod" type="button" data-bs-toggle="modal" data-bs-target="#modal"><span><i class="fa-solid fa-eye"></i><p class="hidden-md">See God</p></span></button>
				</td>
			</tr>
		`;
  });
  tbodyGods.innerHTML = resultados;
  resultados = "";
}

function mostrarGigantes(gigantes) {
  gigantes.forEach((gigante) => {
    resultados += `
			<tr>
				<th scope="row">${gigante.ID_Giant}</th>
				<td>${gigante.Name}</td>
				<td>${gigante.Giant}</td>
				<td>${gigante.Power}</td>
				<td class="d-flex justify-content-center flex-column">
					<button class="btn btn-danger removeGiant" id="removeGiant" type="button"ñ><span><i class="fa-solid fa-xmark"></i><p class="hidden-md">Remove Giant</p></span></button>
					<button class="btn btn-warning editGiant" id="editGiant" type="button"ñ><span><i class="fa-solid fa-pen"></i><p class="hidden-md">Edit Giant</p></span></button>
					<button class="btn btn-info seeGiant" id="seeGiant" type="button"ñ><span><i class="fa-solid fa-eye"></i><p class="hidden-md">See Giant</p></span></button>
				</td>
			</tr>
		`;
  });
  tbodyGiants.innerHTML = resultados;
  resultados = "";
}

// FUNCIONES PARA MOSTRAR EN EL MODAL
// Con JQuery y on nos permite acceder a cada boton dependiendo de los registros
const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
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
    await fetch("http://localhost:3880/api/gods", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Name: nameGod,
        God: nameGodRepresentation,
        Power: powerGod,
        img: imgGod,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        obtenerDatos();
        $(modal).modal("hide");
      });
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
		await fetch("http://localhost:3880/api/giants", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				Name: nameGiant,
				Giant: nameGiantRepresentation,
				Power: powerGiant,
				img: imgGiant,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				obtenerDatos();
				$(modal).modal("hide");
			});
	});
});

// FUNCION PARA BORRAR DIOSES
on(document, "click", "#removeGod", (e) => {
  const fila = e.target.parentNode.parentNode.parentNode.parentNode;
  const id = fila.firstElementChild.innerHTML;
  alertify.confirm(
    "Deseas eliminar este dios",
    async function () {
    await fetch("http://localhost:3880/api/god/" + id, { method: "DELETE" })
        .then((res) => res.json())
        .then(() => location.reload());
      alertify.success("Eliminado");
    },
    function () {
      alertify.error("Cancelar");
    }
  );
});

// FUNCION PARA BORRAR GIGANTES
on(document, "click", "#removeGiant", (e) => {
  const fila = e.target.parentNode.parentNode.parentNode.parentNode;
  const id = fila.firstElementChild.innerHTML;
  alertify.confirm(
    "Deseas eliminar este gigante",
    async function () {
    await fetch("http://localhost:3880/api/giant/" + id, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => location.reload());
      alertify.success("Eliminado");
    },
    function () {
      alertify.error("Cancelar");
    }
  );
});


// FUNCION PARA EDITAR DIOSES 
on(document, "click", "#editGod", async(e) => {
    const fila = e.target.parentNode.parentNode.parentNode.parentNode;
    const id = fila.firstElementChild.innerHTML;

	modalTitle.innerHTML = document.getElementById("editGod").textContent;
    modalBody.innerHTML = `
	<form id="formEditGod">
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
		<button type="submit" class="btn btn-warning" id="btnSubmit">Edit</button>
	</form>
	`;
	let editarDios = true;
	obtener_datos_por_id(id, editarDios)
  });

  obtener_datos_por_id=async (id, editarDios)=>{
	if (editarDios == true) {
    await fetch("http://localhost:3880/api/god/" + id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        const name = data[0].Name;
        const god = data[0].God;
        const power = data[0].Power;
        $("#nameGod").val(name);
        $("#nameGodRepresentation").val(god);
        $("#powerGod").val(power);
        $("#imgGod").on("change", function () {
          alertify.success("Se ha modificado la imagen");
        });
      })
      .catch((err) => console.log(err));
  }
	
  }
});