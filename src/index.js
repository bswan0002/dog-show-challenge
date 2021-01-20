function fetchDogs() {
  fetch("http://localhost:3000/dogs")
    .then((resp) => resp.json())
    .then((data) => data.forEach((dog) => renderDog(dog)));
}

// name, breed, sex, edit-btn
//
// json looks like:
// breed: "Scottish Deerhound"​​
// id: 1
// name: "Baby"
// sex: "male"

function handleSubmit(e) {
  e.preventDefault();
  if (typeof selectedDog !== "undefined" && selectedDog !== null) {
    updateDog();
  } else {
    alert("select a dog, bozo");
  }
}

function updateDog() {
  let form = document.querySelector("#dog-form");
  dogName = form.name.value;
  dogBreed = form.breed.value;
  dogSex = form.sex.value;
  dogObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      name: `${dogName}`,
      breed: `${dogBreed}`,
      sex: `${dogSex}`,
    }),
  };
  fetch(`http://localhost:3000/dogs/${selectedDog.id}`, dogObj)
    .then((resp) => console.log(resp))
    .then(function () {
      let name = document.querySelector(
        `tr.dog-${selectedDog.id} td.name-cell`
      );
      let breed = document.querySelector(
        `tr.dog-${selectedDog.id} td.breed-cell`
      );
      let sex = document.querySelector(`tr.dog-${selectedDog.id} td.sex-cell`);
      name.innerText = dogName;
      breed.innerText = dogBreed;
      sex = dogSex;

      let form = document.querySelector("#dog-form");
      form.name.value = "";
      form.breed.value = "";
      form.sex.value = "";
      selectedDog = null;
    })
    .catch(function (error) {
      alert(error.message);
    });
}

function populateForm(dog) {
  let form = document.querySelector("#dog-form");
  form.name.value = dog.name;
  form.breed.value = dog.breed;
  form.sex.value = dog.sex;
  selectedDog = dog;
}

function fetchOneDog(dogId) {
  fetch(`http://localhost:3000/dogs/${dogId}`)
    .then((resp) => resp.json())
    .then((dog) => populateForm(dog));
}

function handleClick(e) {
  fetchOneDog(e.target.id);
}

function renderDog(dog) {
  let table = document.querySelector("#table-body");
  let newRow = document.createElement("tr");
  let name = document.createElement("td");
  let breed = document.createElement("td");
  let sex = document.createElement("td");
  let editBtnCell = document.createElement("td");
  let editBtn = document.createElement("button");

  editBtn.id = dog.id;
  newRow.className = `dog-${dog.id}`;
  name.className = "name-cell";
  breed.className = "breed-cell";
  sex.className = "sex-cell";

  name.innerText = dog.name;
  breed.innerText = dog.breed;
  sex.innerText = dog.sex;
  editBtn.innerText = "edit";
  editBtnCell.appendChild(editBtn);

  editBtn.addEventListener("click", handleClick);

  newRow.append(name, breed, sex, editBtnCell);
  table.appendChild(newRow);
}

document.addEventListener("DOMContentLoaded", () => {
  fetchDogs();
  document
    .querySelector("input[type='submit']")
    .addEventListener("click", handleSubmit);
});
