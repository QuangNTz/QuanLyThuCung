'use strict';

const nav = document.getElementById('sidebar');
const sidebarTitle = document.getElementById('sidebar-title');

const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');

const typeInput = document.getElementById('input-type');

const breedInput = document.getElementById('input-breed');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');

const find_btn = document.getElementById('find-btn');

const tableBodyEl = document.getElementById('tbody');

const petArr = JSON.parse(localStorage.getItem('petArr_ls'));
const breedArr = JSON.parse(localStorage.getItem('breedArr_ls'));

//*--------------------------------------------------------------*//
//! reset bang nhap thong tin
function reset() {
  idInput.value = '';
  nameInput.value = '';
  typeInput.value = 'Select Type';
  breedInput.value = 'Select Breed';
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

//*--------------------------------------------------------------*//
//! in bang du lieu thu cung ra man hinh
function renderTableData(petArr) {
  tableBodyEl.innerHTML = '';

  function displayRow(i) {
    const row = document.createElement('tr');

    row.innerHTML = `
      <th scope="row">${petArr[i].id}</th>
      <td>${petArr[i].name}</td>
      <td>${petArr[i].age}</td>
      <td>${petArr[i].type}</td>
      <td>${petArr[i].weight} kg</td>
      <td>${petArr[i].leng_th} cm</td>
      <td>${petArr[i].breed}</td>
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
        <i class="${petArr[i].sterilized ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'}">
        </i>
      </td>
      <td>
        ${petArr[i].date}
      </td>
      <td>
        <button onclick= "deletePet(${i})" type="button" class="btn btn-danger">Delete</button>
      </td>
    `;

    tableBodyEl.appendChild(row);
  }

  petArr.forEach((pet, i) => displayRow(i));
}
renderTableData(petArr);

//*--------------------------------------------------------------*//
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
//! su kien nut Find
find_btn.addEventListener('click', function () {
  let petArrFilter1 = [];
  let petArrFilter2 = [];
  let petArrFilter3 = [];
  let petArrFilter4 = [];

  if (
    idInput.value !== '' ||
    nameInput.value !== '' ||
    typeInput.value !== '' ||
    breedInput.value !== '' ||
    vaccinatedInput.checked ||
    dewormedInput.checked ||
    sterilizedInput.checked
  ) {
    let id = idInput.value;
    let name = nameInput.value;
    let type = typeInput.value;
    let breed = breedInput.value;

    // kiem tra du lieu nhap vao so sanh voi data pet petArr
    for (let i = 0; i < petArr.length; i++) {
      if (
        (petArr[i].id.includes(`${id}`) || id === '') &&
        (petArr[i].name.includes(`${name}`) || name === '') &&
        (petArr[i].type === type || type === 'Select Type') &&
        (petArr[i].breed === breed || breed === 'Select Breed')
      ) {
        petArrFilter1.push(petArr[i]);
      }

      if (vaccinatedInput.checked) {
        petArrFilter2 = petArrFilter1.filter((pet) => pet.vaccinated);
      } else petArrFilter2 = petArrFilter1;

      if (dewormedInput.checked) {
        petArrFilter3 = petArrFilter2.filter((pet) => pet.dewormed);
      } else petArrFilter3 = petArrFilter2;

      if (sterilizedInput.checked) {
        petArrFilter4 = petArrFilter3.filter((pet) => pet.sterilized);
      } else petArrFilter4 = petArrFilter3;
    }
    renderTableData(petArrFilter4);
  }
});

nav.addEventListener('click', function () {
  nav.classList.toggle('active');
});
