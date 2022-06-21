'use strict';

const nav = document.getElementById('sidebar');
const sidebarTitle = document.getElementById('sidebar-title');

const importPet_btn = document.getElementById('importPET-btn');
const exportPet_btn = document.getElementById('exportPET-btn');
const importBreed_btn = document.getElementById('importBREED-btn');
const exportBreed_btn = document.getElementById('exportBREED-btn');

let petArr = JSON.parse(localStorage.getItem('petArr_ls'));
let breedArr = JSON.parse(localStorage.getItem('breedArr_ls'));
let text;
// Doc text tu file local
async function readText(event) {
  const file = event.target.files.item(0);
  text = await file.text();
  document.getElementById('textToImport').value = text;
}
// Import pet data
importPet_btn.addEventListener('click', function () {
  petArr = JSON.parse(text);
  console.log(petArr);
  localStorage.setItem('petArr_ls', JSON.stringify(petArr));
});
// Import breed data
importBreed_btn.addEventListener('click', function () {
  breedArr = JSON.parse(text);
  console.log(breedArr);
  localStorage.setItem('breedArr_ls', JSON.stringify(breedArr));
});
// Export pet data
exportPet_btn.addEventListener('click', function saveToFile() {
  var blob = new Blob([`${JSON.stringify(petArr)}`], {
    type: 'application/json;charset=utf-8,',
  });
  saveAs(blob, 'myPetArr.json');
});
// Export breed data
exportBreed_btn.addEventListener('click', function saveToFile() {
  var blob = new Blob([`${JSON.stringify(breedArr)}`], {
    type: 'application/json;charset=utf-8,',
  });
  saveAs(blob, 'myBreedArr.json');
});

nav.addEventListener('click', function () {
  nav.classList.toggle('active');
});
