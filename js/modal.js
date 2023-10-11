// Declaracion y escucha de los botones 
let btnAddGod = document.getElementById('addGod');
btnAddGod.addEventListener("click", addGod)

let btnRemoveGod = document.getElementById('removeGod');
btnRemoveGod.addEventListener("click", removeGod)

let btnEditGod = document.getElementById('editGod');
btnEditGod.addEventListener("click", editGod)

let btnSeeGod = document.getElementById('seeGod');
btnSeeGod.addEventListener("click", seeGod)

let btnAddGiant = document.getElementById('addGiant');
btnAddGiant.addEventListener("click", addGiant)

let btnRemoveGiant = document.getElementById('removeGiant');
btnRemoveGiant.addEventListener("click", removeGiant)

let btnEditGiant = document.getElementById('editGiant');
btnEditGiant.addEventListener("click", editGiant)

let btnSeeGiant = document.getElementById('seeGiant');
btnSeeGiant.addEventListener("click", seeGiant)

// Elementos del modal guardado en variables
var modal = document.getElementById('modal');
var modalBody = modal.querySelector('.modal-body');
var modalTitle = modal.querySelector('.modal-title');
var modalFooter = modal.querySelector('.modal-footer');

function clearModal(){
    modalBody.innerHTML = '';
    modalTitle.innerHTML = '';
    // modalFooter.innerHTML = '';
}

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
    conexion();
    con.query
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

