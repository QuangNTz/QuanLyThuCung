'use strict';

//*--------------------------------------------------------------*//
//! Tao du lieu mo phong
function moPhongDlPET() {
  const petArr = [
    {
      id: 'P001',
      name: 'Dog1',
      age: 1,
      type: 'Dog',
      weight: 10,
      leng_th: 30,
      color: '#ca1010',
      breed: 'Tabby-D',
      vaccinated: true,
      dewormed: true,
      sterilized: true,
      date: '1/4/2022',
    },
    {
      id: 'P002',
      name: 'Cat2',
      age: 2,
      type: 'Cat',
      weight: 8,
      leng_th: 40,
      color: '#f0e119',
      breed: 'Greyhound-C',
      vaccinated: true,
      dewormed: false,
      sterilized: true,
      date: '1/4/2022',
    },

    {
      id: 'P003',
      name: 'Dog3',
      age: 3,
      type: 'Dog',
      weight: 9,
      leng_th: 40,
      color: '#60b347',
      breed: 'Mixed Breed-D',
      vaccinated: true,
      dewormed: false,
      sterilized: false,
      date: '1/4/2022',
    },

    {
      id: 'P004',
      name: 'Cat4',
      age: 4,
      type: 'Cat',
      weight: 6,
      leng_th: 40,
      color: '#05ece0',
      breed: 'Mixed Breed-C',
      vaccinated: true,
      dewormed: true,
      sterilized: true,
      date: '1/4/2022',
    },

    {
      id: 'P005',
      name: 'Dog5',
      age: 1,
      type: 'Dog',
      weight: 15,
      leng_th: 50,
      color: '#ca1010',
      breed: 'Tabby-D',
      vaccinated: true,
      dewormed: true,
      sterilized: true,
      date: '1/4/2022',
    },

    {
      id: 'P006',
      name: 'Cat6',
      age: 2,
      type: 'Cat',
      weight: 8,
      leng_th: 45,
      color: '#f0e119',
      breed: 'Terrier-C',
      vaccinated: true,
      dewormed: false,
      sterilized: true,
      date: '1/4/2022',
    },

    {
      id: 'P007',
      name: 'Dog7',
      age: 3,
      type: 'Dog',
      weight: 11,
      leng_th: 50,
      color: '#60b347',
      breed: 'Mixed Breed-D',
      vaccinated: true,
      dewormed: true,
      sterilized: true,
      date: '1/4/2022',
    },

    {
      id: 'P008',
      name: 'Cat8',
      age: 4,
      type: 'Cat',
      weight: 13,
      leng_th: 40,
      color: '#05ece0',
      breed: 'Domestic Medium Hair-C',
      vaccinated: false,
      dewormed: true,
      sterilized: true,
      date: '1/4/2022',
    },
  ];

  console.log(petArr);
  localStorage.setItem('petArr_ls', JSON.stringify(petArr));
}

//*--------------------------------------------------------------*//
//! Tao du lieu mo phong
function moPhongDlBREED() {
  const breedArr = [
    {
      name: 'Tabby-D',
      type: 'Dog',
    },

    {
      name: 'Tabby-C',
      type: 'Cat',
    },

    {
      name: 'Domestic Medium Hair-D',
      type: 'Dog',
    },

    {
      name: 'Domestic Medium Hair-C',
      type: 'Cat',
    },
    {
      name: 'Mixed Breed-D',
      type: 'Dog',
    },

    {
      name: 'Mixed Breed-C',
      type: 'Cat',
    },
    {
      name: 'Domestic Short Hair-D',
      type: 'Dog',
    },

    {
      name: 'Domestic Short Hair-C',
      type: 'Cat',
    },
    {
      name: 'Terrier-D',
      type: 'Dog',
    },

    {
      name: 'Terrier-C',
      type: 'Cat',
    },
    {
      name: 'Greyhound-D',
      type: 'Dog',
    },

    {
      name: 'Greyhound-C',
      type: 'Cat',
    },
    {
      name: 'Persian-D',
      type: 'Dog',
    },

    {
      name: 'Persian-C',
      type: 'Cat',
    },
    {
      name: 'Rottweiler-D',
      type: 'Dog',
    },

    {
      name: 'Rottweiler-C',
      type: 'Cat',
    },
  ];
  console.log(breedArr);
  localStorage.setItem('breedArr_ls', JSON.stringify(breedArr));
}

//*--------------------------------------------------------------*//

function savePetDataToStorage() {
  localStorage.setItem('petArr_ls', JSON.stringify(petArr));
}
// savePetDataToStorage();

function saveBreedDataToStorage() {
  localStorage.setItem('breedArr_ls', JSON.stringify(breedArr));
}
// saveBreedDataToStorage();

function getPetDataFromStorage() {
  petArr = JSON.parse(localStorage.getItem('petArr_ls'));
}
// getPetDataToStorage();

function getBreedDataFromStorage() {
  petArr = JSON.parse(localStorage.getItem('breedArr_ls'));
}
// getBreedDataToStorage();
