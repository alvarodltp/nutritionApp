document.addEventListener("DOMContentLoaded", init);

function init() {
  disablePage();
}

let firstNameField = document.getElementById("first_name").value;
let activityLevel = parseFloat(document.getElementById("activity-level").value);
let calculateButton = document.getElementById("calculate-button");
let updateButton = document.getElementById("update-button");
updateButton.addEventListener("click", updateUser);
calculateButton.addEventListener("click", function(event) {
  displayBmr(event);
  displayCaloriesNeeded(event);
});
let loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", getUser);
let ectoImage = document.getElementById("ectomorph");
ectoImage.addEventListener("click", calculateMacros);
let mesoImage = document.getElementById("mesomorph");
mesoImage.addEventListener("click", calculateMacros);
let endoImage = document.getElementById("endomorph");
endoImage.addEventListener("click", calculateMacros);

//for men
function bmrForMen() {
  //times 12 converts height from feet to inches
  // let age = document.getElementById("age").value * 1;
  let weightInput = document.getElementById("weight").value * 1;
  let heightInput = document.getElementById("height").value * 1 * 12;
  let bmrForM = (66 + 6.3 * weightInput + 12.7 * heightInput).toFixed(2);
  // debugger;
  return bmrForM;
}
//for women
function bmrForWomen() {
  let age = document.getElementById("age").value * 1;
  let weightInput = document.getElementById("weight").value * 1;
  let heightInput = document.getElementById("height").value * 1 * 12;
  let bmrForW = (655 + 4.35 * weightInput + 4.7 * heightInput).toFixed(2);
  return bmrForW;
}

// displays bmr to page for men or women
function displayBmr(event) {
  let gender = document.getElementById("gender").value;
  let showBmr = document.getElementById("show-bmr");
  let h1Element = document.createElement("h1");
  // debugger;
  if (gender === "male") {
    h1Element.innerText = `Your BMR(Basal Metabolic Rate) is ${bmrForMen()}. This is the number of calories you would burn if you slept for 24 hours.`;
    showBmr.appendChild(h1Element);
  } else if (gender === "female") {
    h1Element.innerText = `Your BMR(Basal Metabolic Rate) is ${bmrForWomen()}. This is the number of calories you would burn if you slept for 24 hours.`;
    showBmr.appendChild(h1Element);
    // debugger;
  } else {
    console.log("Gender is required");
  }
}

// displays calories needed for men or women
function displayCaloriesNeeded(event) {
  counter = 0;
  let gender = document.getElementById("gender").value;
  let goal = document.getElementById("goal").value;
  let activityLevel = parseFloat(
    document.getElementById("activity-level").value
  );
  let showBmr = document.getElementById("show-bmr");
  let h1Element = document.createElement("h1");
  let deficit = 583;
  let calories;
  let message =
    "According to your personal information and goal, you need a total of ";
  //this checks for gender and goal in order to calculate calories needed
  if (gender === "male" && goal === "gain") {
    calories = parseFloat(activityLevel * bmrForMen() + deficit).toFixed(2);
    const interval = setInterval(() => {
      if (counter < calories) {
        counter++;
        h1Element.innerText = counter;
      } else {
        clearInterval(interval);
      }
    }, 0.00001);
    showBmr.appendChild(h1Element);
  } else if (gender === "male" && goal === "lose") {
    calories = parseFloat(activityLevel * bmrForMen() - deficit).toFixed(2);
    const interval = setInterval(() => {
      if (counter < calories) {
        counter++;
        h1Element.innerText = counter;
      } else {
        clearInterval(interval);
      }
    }, 0.00001);
    showBmr.appendChild(h1Element);
  } else if (gender === "male" && goal === "maintain") {
    calories = parseFloat(activityLevel * bmrForMen()).toFixed(2);
    const interval = setInterval(() => {
      if (counter < calories) {
        counter++;
        h1Element.innerText = counter;
      } else {
        clearInterval(interval);
      }
    }, 0.00001);
    showBmr.appendChild(h1Element);
  } else if (gender === "female" && goal === "gain") {
    calories = parseFloat(activityLevel * bmrForWomen() + deficit).toFixed(2);
    const interval = setInterval(() => {
      if (counter < calories) {
        counter++;
        h1Element.innerText = counter;
      } else {
        clearInterval(interval);
      }
    }, 0.00001);
    showBmr.appendChild(h1Element);
  } else if (gender === "female" && goal === "lose") {
    calories = parseFloat(activityLevel * bmrForWomen() - deficit).toFixed(2);
    const interval = setInterval(() => {
      if (counter < calories) {
        counter++;
        h1Element.innerText = counter;
      } else {
        clearInterval(interval);
      }
    }, 0.00001);
    showBmr.appendChild(h1Element);
  } else if (gender === "female" && goal === "maintain") {
    calories = parseFloat(activityLevel * bmrForWomen()).toFixed(2);
    const interval = setInterval(() => {
      if (counter < calories) {
        counter++;
        h1Element.innerText = counter;
      } else {
        clearInterval(interval);
      }
    }, 0.00001);
    showBmr.appendChild(h1Element);
  }
  return calories;
}

function disablePage() {
  let activityLevel = document.getElementById("activity-level");
  activityLevel.disabled = true;
  let age = document.getElementById("age");
  age.disabled = true;
  let weightInput = document.getElementById("weight");
  weightInput.disabled = true;
  let heightInput = document.getElementById("height");
  heightInput.disabled = true;
  let gender = document.getElementById("gender");
  gender.disabled = true;
  let goal = document.getElementById("goal");
  goal.disabled = true;
  let calculateButton = document.getElementById("calculate-button");
  calculateButton.disabled = true;
  let updateButton = document.getElementById("update-button");
  updateButton.disabled = true;
}

function enablePage() {
  let activityLevel = document.getElementById("activity-level");
  activityLevel.disabled = false;
  let age = document.getElementById("age");
  age.disabled = false;
  let weightInput = document.getElementById("weight");
  weightInput.disabled = false;
  let heightInput = document.getElementById("height");
  heightInput.disabled = false;
  let gender = document.getElementById("gender");
  gender.disabled = false;
  let goal = document.getElementById("goal");
  goal.disabled = false;
  let calculateButton = document.getElementById("calculate-button");
  calculateButton.disabled = false;
  let updateButton = document.getElementById("update-button");
  updateButton.disabled = false;
}

//get users and filter if that user is the user entered in the form
//if it is the user, render the user which fills out the bmrForm
//if the user is not, then run the function to create a new user
function getUser(event) {
  let firstNameField = document.getElementById("first_name").value;
  // debugger;
  fetch("http://localhost:3000/users")
    .then(response => response.json())
    .then(json => {
      for (user of json) {
        if (firstNameField === user.name) {
          let userId = user.id;
          // debugger;
          enablePage();
          renderUser(user);
          // debugger;
          return;
        }
      }
      createNewUser();
    });
}

function renderUser(user) {
  let firstNameField = document.getElementById("first_name");
  firstNameField.value = user.name;
  let activityLevel = document.getElementById("activity-level");
  activityLevel.value = user.activity_level;
  let age = document.getElementById("age");
  age.value = user.age;
  let weightInput = document.getElementById("weight");
  weightInput.value = user.weight;
  let heightInput = document.getElementById("height");
  heightInput.value = user.height;
  let gender = document.getElementById("gender");
  gender.value = user.gender;
  let goal = document.getElementById("goal");
  goal.value = user.goal;
  let id = document.getElementById("id");
  id.value = user.id;
  // debugger;
}

function createNewUser() {
  let name = document.getElementById("first_name").value;
  // debugger;
  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name
    })
  })
    .then(response => response.json())
    .then(json => {
      enablePage();
    });
}

//function that calculates macronutrients based on selection of bodytype

function addsPCFToMacrosDiv(protein, carbs, fats) {
  let calories = displayCaloriesNeeded();
  let macrosDiv = document.getElementById("macros");
  let h1Protein = document.createElement("h1");
  let h1Carbs = document.createElement("h1");
  let h1Fats = document.createElement("h1");
  h1Protein.innerText = protein;
  h1Carbs.innerText = carbs;
  h1Fats.innerText = fats;
  macrosDiv.appendChild(h1Protein);
  macrosDiv.appendChild(h1Carbs);
  macrosDiv.appendChild(h1Fats);
}

function calculateMacros(event) {
  let calories = displayCaloriesNeeded();
  let bodySelected = event.target.parentElement.parentElement.id;
  if (bodySelected === "ectomorph") {
    let protein = ((calories * 0.25) / 4).toFixed(2);
    let carbs = ((calories * 0.55) / 4).toFixed(2);
    let fats = ((calories * 0.2) / 9).toFixed(2);
    addsPCFToMacrosDiv(protein, carbs, fats);
  } else if (bodySelected === "mesomorph") {
    let protein = ((calories * 0.3) / 4).toFixed(2);
    let carbs = ((calories * 0.4) / 4).toFixed(2);
    let fats = ((calories * 0.3) / 9).toFixed(2);
    addsPCFToMacrosDiv(protein, carbs, fats);
  } else if (bodySelected === "endomorph") {
    let protein = ((calories * 0.35) / 4).toFixed(2);
    let carbs = ((calories * 0.25) / 4).toFixed(2);
    let fats = ((calories * 0.4) / 9).toFixed(2);
    addsPCFToMacrosDiv(protein, carbs, fats);
  }
}

function updateUser(event) {
  let id = event.target.parentElement.parentElement.querySelectorAll("input")[0]
    .value;
  let age = event.target.parentElement.parentElement.querySelectorAll(
    "input"
  )[1].value;
  let weight = event.target.parentElement.parentElement.querySelectorAll(
    "input"
  )[2].value;
  let height = event.target.parentElement.parentElement.querySelectorAll(
    "input"
  )[3].value;
  let activityLevel = event.target.parentElement.parentElement.querySelectorAll(
    "select"
  )[0].value;
  let gender = event.target.parentElement.parentElement.querySelectorAll(
    "select"
  )[1].value;
  let goal = event.target.parentElement.parentElement.querySelectorAll(
    "select"
  )[2].value;

  fetch(`http://localhost:3000/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      age: age,
      height: height,
      weight: weight,
      activity_level: activityLevel,
      gender: gender,
      goal: goal
    })
  });
  // .then(response => response.json())
  // .then(json => {});
}
