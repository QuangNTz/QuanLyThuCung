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

let healthyCheck = false;
//Nap du lieu tu localStorage
const petArr = JSON.parse(localStorage.getItem('petArr_ls'));
const breedArr = JSON.parse(localStorage.getItem('breedArr_ls'));

//*--------------------------------------------------------------*//
//!!! Truong hop luc dau trang chua co data Mentor co the refresh tai trang Home de them data
if (petArr == undefined || breedArr == undefined) {
  moPhongDlPET();
  moPhongDlBREED();
}

//*--------------------------------------------------------------*//
//! luu du lieu PET vao localStorage
function saveToStorage() {
  localStorage.setItem('petArr_ls', JSON.stringify(petArr));
}

//*--------------------------------------------------------------*//
//! reset bang nhap thong tin
function reset() {
  idInput.value = '';
  nameInput.value = '';
  ageInput.value = '';
  typeInput.value = 'Select Type';
  weightInput.value = '';
  lengthInput.value = '';
  colorInput.value = '#000000';
  breedInput.value = '';
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;

  breedInput.innerHTML = '';
  const row = document.createElement('option');
  row.innerHTML = 'Select Breed';
  breedInput.appendChild(row);
}

//*--------------------------------------------------------------*//
//! Nut de hien thi thu cung
if (healthyCheck) {
  //neu bat che do kiem tra thi chi tat nut 'show healthy pet'
  document.getElementById('healthy-btn').classList.add('hidden');
} else {
  //neu tat che do kiem tra thi chi tat nut 'show allpet'
  document.getElementById('allpet-btn').classList.add('hidden');
}

//! doc du lieu ngay khi co su kien onchange tren Select Type
//*--------------------------------------------------------------*//
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
//! in bang du lieu thu cung ra man hinh
function renderTableData() {
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
  //kiem tra dieu kien render pet theo healthy
  for (let i = 0; i < petArr.length; i++) {
    if (!healthyCheck) {
      displayRow(i);
    } else {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) displayRow(i);
      else continue;
    }
  }
}
renderTableData();

//*--------------------------------------------------------------*//
//! xoa du lieu thu cung va refresh bang du lieu
function deletePet(peti) {
  if (confirm(`Delete ${petArr[peti].name} id: ${petArr[peti].id}. Are you sure?`))
    petArr.splice(peti, 1);

  renderTableData();
  savePetDataToStorage();
}

//*--------------------------------------------------------------*//
//! su kien nut Type khi chon type cua pet
typeInput.addEventListener('click', function (e) {
  e.preventDefault();
  renderBreed();
});

//*--------------------------------------------------------------*//
//! su kien nut Submit
submit_btn.addEventListener('click', function () {
  console.log(petArr);

  let dataEnter = {
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
    currentDate: function () {
      let currentDate = new Date();
      let formatedDate =
        currentDate.getDate() +
        '/' +
        (currentDate.getMonth() + 1) +
        '/' +
        currentDate.getFullYear();
      this.date = formatedDate;
    },
  };

  let id = false,
    petname = false,
    age = false,
    type = false,
    weight = false,
    leng_th = false,
    breed = false;

  const idArr = petArr.map((pet) => pet.id);
  if (petArr.length === 0) {
    dataEnter.id !== '' ? (id = true) : alert('Please input for id');
  } else if (!idArr.includes(idInput.value)) {
    id = true;
  } else alert('ID must unique!');

  dataEnter.name !== '' ? (petname = true) : alert('Enter pet Name!');
  dataEnter.age >= 1 && dataEnter.age <= 15 ? (age = true) : alert('Age must be between 1 and 15!');
  dataEnter.type !== 'Select Type' ? (type = true) : alert('Please select Type!');
  dataEnter.weight >= 1 && dataEnter.weight <= 15
    ? (weight = true)
    : alert('Weight must be between 1 and 15!');
  dataEnter.leng_th >= 1 && dataEnter.leng_th <= 100
    ? (leng_th = true)
    : alert('Length must be between 1 and 100!');
  dataEnter.breed !== 'Select Breed' ? (breed = true) : alert('Please select Breed!');

  if (id && petname && age && type && weight && leng_th && breed) {
    dataEnter.currentDate();
    petArr.push(dataEnter);
    reset(); // reset bang nhap du lieu pet
    //render bang data thong tin pet
    renderTableData();
    saveToStorage();
  }
});

//*--------------------------------------------------------------*//
//! su kien nut Show Healthy Pet
healthy_btn.addEventListener('click', function () {
  healthyCheck = true;
  //bat nut 'show allpet'
  document.getElementById('healthy-btn').classList.add('hidden');
  document.getElementById('allpet-btn').classList.remove('hidden');
  //render bang data thong tin pet
  renderTableData();
});

//*--------------------------------------------------------------*//
//! su kien nut Show all pet
allPet_btn.addEventListener('click', function () {
  healthyCheck = false;
  //bat nut 'show healthy pet'
  document.getElementById('healthy-btn').classList.remove('hidden');
  document.getElementById('allpet-btn').classList.add('hidden');
  //render bang data thong tin pet
  renderTableData();
});

nav.addEventListener('click', function () {
  nav.classList.toggle('active');
});
