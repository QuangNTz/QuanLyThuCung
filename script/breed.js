'use strict';

const nav = document.getElementById('sidebar');
const sidebarTitle = document.getElementById('sidebar-title');

const breedInput = document.getElementById('input-breed');
const typeInput = document.getElementById('input-type');

const submit_btn = document.getElementById('submit-btn');

const tableBodyEl = document.getElementById('tbody');

const breedArr = JSON.parse(localStorage.getItem('breedArr_ls'));

//*--------------------------------------------------------------*//
//! luu du lieu breed vao localStorage
function saveToStorage() {
  localStorage.setItem('breedArr_ls', JSON.stringify(breedArr));
}

//*--------------------------------------------------------------*//
//! reset bang nhap thong tin
function reset() {
  breedInput.value = '';
  typeInput.value = 'Select Type';
}

//*--------------------------------------------------------------*//
//! in bang du lieu breed ra man hinh
function renderBREED() {
  tableBodyEl.innerHTML = '';

  function displayRow(i) {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>
        ${i + 1}
      </td>
      <td>
        ${breedArr[i].name}
      </td>
      <td>
        ${breedArr[i].type}
      </td>
      <td>
        <button onclick= "deleteBreed(${i})" type="button" class="btn btn-danger">Delete</button>
      </td>
    `;

    tableBodyEl.appendChild(row);
  }

  breedArr.forEach((bre, i) => displayRow(i));
}
renderBREED();

//*--------------------------------------------------------------*//
//! xoa du lieu thu cung va refresh bang du lieu
function deleteBreed(peti) {
  if (
    confirm(
      `Delete ${breedArr[peti].name} of ${breedArr[peti].type}. Are you sure?`
    )
  )
    breedArr.splice(peti, 1);

  renderBREED();
  saveToStorage();
}

//*--------------------------------------------------------------*//
//! su kien nut Submit
submit_btn.addEventListener('click', function () {
  let data = {
    name: breedInput.value,
    type: typeInput.value,
  };

  let name = false,
    type = false;
  // kiem tra data truoc khi luu
  data.name !== '' ? (name = true) : alert('Please input Breed!');
  data.type !== 'Select Type' ? (type = true) : alert('Please select Type!');

  if (type && name) {
    breedArr.push(data);
    reset();
    renderBREED();
    saveToStorage();
  }
});

nav.addEventListener('click', function () {
  nav.classList.toggle('active');
});
