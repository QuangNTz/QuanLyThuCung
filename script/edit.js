'use strict';

const nav = document.getElementById('sidebar');
const sidebarTitle = document.getElementById('sidebar-title');

const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const ageInput = document.getElementById('input-age');
const typeInput = document.getElementById('input-type');
const weightInput = document.getElementById('input-weight');
const lengthInput = document.getElementById('input-length');
const colorInput = document.getElementById('input-color-1');

const breedInput = document.getElementById('input-breed');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');

const submit_btn = document.getElementById('submit-btn');
const healthy_btn = document.getElementById('healthy-btn');
const allPet_btn = document.getElementById('allpet-btn');
const calculateBMI_btn = document.getElementById('calculateBMI-btn');

const danger_btn = document.querySelector('btn-danger');

const tableBodyEl = document.getElementById('tbody');

const petArr = JSON.parse(localStorage.getItem('petArr_ls'));
const breedArr = JSON.parse(localStorage.getItem('breedArr_ls'));

//*--------------------------------------------------------------*//
//! luu du lieu PET vao localStorage
function saveToStorage() {
  localStorage.setItem('petArr_ls', JSON.stringify(petArr));
}

//*--------------------------------------------------------------*//
//! render du lieu breed data
function renderBreedData() {
  breedInput.innerHTML = '';
  const row = document.createElement('option');
  row.innerHTML = 'Select Breed';
  breedInput.appendChild(row);

  breedArr.forEach((bre) => {
    const row = document.createElement('option');
    row.innerHTML = `${bre.name}`;
    breedInput.appendChild(row);
  });
}
renderBreedData();

//*--------------------------------------------------------------*//
//! doc du lieu ngay khi co su kien onchange tren Select Type
function renderBreed() {
  breedInput.innerHTML = '';
  const row = document.createElement('option');
  row.innerHTML = 'Select Breed';
  breedInput.appendChild(row);
  //Kiem tra the hien theo type pet
  breedArr.forEach((bre) => {
    if (bre.type === typeInput.value) {
      const row = document.createElement('option');
      row.innerHTML = `${bre.name}`;
      breedInput.appendChild(row);
    }
  });
}

//*--------------------------------------------------------------*//
//! su kien nut Type
typeInput.addEventListener('click', function (e) {
  e.preventDefault();
  renderBreed();
});

//*--------------------------------------------------------------*//
//! in bang du lieu thu cung ra man hinh
function renderTableData() {
  tableBodyEl.innerHTML = '';

  function displayRow(i) {
    const row = document.createElement('tr');

    row.innerHTML = `
      <th scope="row">
        ${petArr[i].id}
      </th>
      <td>
        ${petArr[i].name}
      </td>
      <td>
        ${petArr[i].age}
      </td>
      <td>
        ${petArr[i].type}
      </td>
      <td>
        ${petArr[i].weight} kg
      </td>
      <td>
        ${petArr[i].leng_th} cm
      </td>
      <td>
        ${petArr[i].breed}
      </td>
      <td style="text-align: center;">
        <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
      </td>
      <td style="text-align: center;">
        <i class="${petArr[i].vaccinated ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'}"></i>
      </td>
      <td style="text-align: center;">
        <i class="${petArr[i].dewormed ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'}"></i>
      </td>
      <td style="text-align: center;">
        <i class="${petArr[i].sterilized ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'}"></i>
      </td>
      <td>
        ${petArr[i].date}
      </td>
      <td>
        <button onclick= "editPet(${i})" type="button" class="btn btn-warning">Edit</button>
      </td>
    `;

    tableBodyEl.appendChild(row);
  }

  petArr.forEach((pet, i) => displayRow(i));
}
renderTableData();

//*--------------------------------------------------------------*//
//! edit du lieu thu cung va refresh bang du lieu, su kien onchange tren html
function editPet(peti) {
  if (confirm(`Edit ${petArr[peti].name} id: ${petArr[peti].id}. Are you sure?`)) {
    document.getElementById('container-form').classList.remove('hide');

    idInput.value = petArr[peti].id;
    nameInput.value = petArr[peti].name;
    ageInput.value = petArr[peti].age;
    typeInput.value = petArr[peti].type;
    weightInput.value = petArr[peti].weight;
    lengthInput.value = petArr[peti].leng_th;
    colorInput.value = petArr[peti].color;
    breedInput.value = petArr[peti].breed;
    vaccinatedInput.checked = petArr[peti].vaccinated;
    dewormedInput.checked = petArr[peti].dewormed;
    sterilizedInput.checked = petArr[peti].sterilized;

    //*--------------------------------------------------------------*//
    //! su kien nut Submit
    submit_btn.addEventListener('click', function () {
      let data = {
        id: idInput.value,
        name: nameInput.value,
        age: parseInt(ageInput.value),
        type: typeInput.value,
        weight: parseInt(weightInput.value),
        leng_th: parseInt(lengthInput.value),
        color: colorInput.value,
        breed: breedInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,
      };

      let id = true,
        petname = false,
        age = false,
        type = false,
        weight = false,
        leng_th = false,
        breed = false;

      if (data.name !== '') petname = true;
      data.age >= 1 && data.age <= 15 ? (age = true) : alert('Age must be between 1 and 15!');
      data.type !== 'Select Type' ? (type = true) : alert('Please select Type!');
      data.weight >= 1 && data.weight <= 15 ? (weight = true) : alert('Weight must be between 1 and 15!');
      data.leng_th >= 1 && data.leng_th <= 100 ? (leng_th = true) : alert('Length must be between 1 and 100!');
      data.breed !== 'Select Breed' ? (breed = true) : alert('Please select Breed!');
      //kiem tra du lieu nhap vao hop ly truoc khi luu data pet
      if (id && petname && age && type && weight && leng_th && breed) {
        //petArr[peti].id = data.id;
        petArr[peti].name = data.name;
        petArr[peti].age = data.age;
        petArr[peti].type = data.type;
        petArr[peti].weight = data.weight;
        petArr[peti].leng_th = data.leng_th;
        petArr[peti].color = data.color;
        petArr[peti].breed = data.breed;
        petArr[peti].vaccinated = data.vaccinated;
        petArr[peti].dewormed = data.dewormed;
        petArr[peti].sterilized = data.sterilized;

        renderTableData();
        document.getElementById('container-form').classList.add('hide');
        saveToStorage();
      }
    });
  }
}

nav.addEventListener('click', function () {
  nav.classList.toggle('active');
});
