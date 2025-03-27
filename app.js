let parent = document.getElementById("parent");
let bodycontent = document.getElementById("body-content");
function showSection(section) {
  
  const sections = document.querySelectorAll(".body-content > div");
  
  sections.forEach(function (el) {
    el.style.display = "none";
  });
  const selectedSection = document.getElementById(section);
  if (selectedSection) {
    selectedSection.style.display = "block";
  parent.classList.add("hide");
  bodycontent.classList.remove("hide");
  }
  
}
let notification = document.getElementById("notify");
let nav = document.getElementById("nav-list");
const validateInput = (input) => {
  return !isNaN(input) && input > 0;
};
function goToHome() {
  parent.classList.remove("hide");
  bodycontent.classList.add("hide");
}
let bmiweight = document.querySelector("#bmi-weight");
let bmiheight = document.querySelector("#bmi-height");
let rescard = document.querySelector("#res-card");
const calculatebmi = () => {
  let weight = bmiweight.value;
  let height = bmiheight.value / 100;
  if (!validateInput(weight) || !validateInput(height)) {
    notification.classList.remove("hide");
    nav.classList.add("hide");
    setTimeout(() => {
      notification.classList.add("hide");
      nav.classList.remove("hide");
    }, 2000);
    return;
  }
  let res = (weight / (height * height)).toFixed(2);
  rescard.innerHTML = "";
  rescard.classList = "";
  if (res < 18.5) {
    displayCard(res, "underweight");
  } else if (res >= 18.5 && res <= 24.9) {
    displayCard(res, "normal");
  } else if (res >= 25 && res <= 29.9) {
    displayCard(res, "overweight");
  } else {
    displayCard(res, "obese");
  }
  bmiweight.value = "";
  bmiheight.value = "";
};
const displayCard = (res, classname) => {
  rescard.innerHTML = `Your BMI is ${res} and you are ${classname}`;
  rescard.classList.add(classname);
  setTimeout(() => {
    rescard.innerHTML = ``;
    rescard.classList.remove(classname);
    rescard.appendChild(bmiimg);
  }, 5000);
};

let bmrmale = document.querySelector("#male");
let bmrfemale = document.querySelector("#female");
let bmrweight = document.querySelector("#bmr-weight");
let bmrheight = document.querySelector("#bmr-height");
let bmrrescard = document.querySelector("#bmr-res-card");
let bmrage = document.querySelector("#bmr-age");

function calculatebmr() {
  let gender = "";
  if (bmrmale.checked) {
    gender = "Male";
  } else if (bmrfemale.checked) {
    gender = "Female";
  }
  let weight = parseFloat(bmrweight.value);
  let height = parseFloat(bmrheight.value);
  let age = parseInt(bmrage.value);
  if (
    !validateInput(weight) ||
    !validateInput(height) ||
    !validateInput(age) ||
    !gender
  ) {
    notification.classList.remove("hide");
    nav.classList.add("hide");
    setTimeout(() => {
      notification.classList.add("hide");
      nav.classList.remove("hide");
    }, 2000);
    return;
  }
  let bmr;
  if (gender === "Male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else if (gender === "Female") {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  bmrrescard.classList.add("bmr-res-card");
  bmrrescard.innerHTML = `Your BMR is: <b>${bmr.toFixed(2)}</b>  calories/day`;
  bmrmale.checked = false;
  bmrfemale.checked = false;
  bmrweight.value = "";
  bmrheight.value = "";
  bmrage.value = "";

  setTimeout(() => {
    bmrrescard.innerHTML = "";
    bmrrescard.classList.remove("bmr-res-card");
  }, 5000);
}

function calculatecalorie() {
  let age = parseInt(document.getElementById("calorie-age").value);
  let weight = parseFloat(document.getElementById("calorie-weight").value);
  let height = parseInt(document.getElementById("calorie-height").value);
  let caloriemale = document.getElementById("calorie-male").value;
  let caloriefemale = document.getElementById("calorie-female").value;
  let activity = parseFloat(document.getElementById("activity").value);
  let res = document.getElementById("calorie-res-card");
  let gender = "";
  if (caloriemale.checked) {
    gender = "Male";
  } else if (caloriefemale.checked) {
    gender = "Female";
  }
  if (
    !validateInput(age) ||
    !validateInput(weight) ||
    !validateInput(height) ||
    !activity ||
    !gender
  ) {
    notification.classList.remove("hide");
    nav.classList.add("hide");
    setTimeout(() => {
      notification.classList.add("hide");
      nav.classList.remove("hide");
    }, 2000);
    return;
  }
  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  let tdee = bmr * activity;
  res.classList.add("calorie-res-card");
  res.innerHTML = `<div>You need approximately <b>${Math.round(
    tdee
  )}</b> calories per day to maintain your weight.</div>`;
  document.getElementById("calorie-age").value = "";
  document.getElementById("calorie-weight").value = "";
  document.getElementById("calorie-height").value = "";
  document.getElementById("activity").value = "";
  caloriemale.checked = false;
  caloriefemale.checked = false;
  setTimeout(() => {
    res.innerHTML = "";
    res.classList.remove("calorie-res-card");
  }, 5000);
}

let fatFemale = document.getElementById("fat-female");
let fatmale = document.getElementById("fat-male");
let hipele = document.getElementById("hip");

function toggleHip() {
  if (fatmale.checked) {
    hipele.classList.add("hide");
  } else if (fatFemale.checked) {
    hipele.classList.remove("hide");
  }
}

fatFemale.addEventListener("change", toggleHip);
fatmale.addEventListener("change", toggleHip);
toggleHip();

function calculatefat() {
  let gender = "";
  if (fatmale.checked) {
    gender = "male";
  } else if (fatFemale.checked) {
    gender = "female";
  }
  const height = parseFloat(document.getElementById("fat-height").value);
  const waist = parseFloat(document.getElementById("fat-waist").value);
  const neck = parseFloat(document.getElementById("fat-neck").value);
  let res = document.getElementById("fat-res-card");
  const hip =
    gender === "female"
      ? parseFloat(document.getElementById("fat-hip").value)
      : 0;
  if (
    !validateInput(height) ||
    !validateInput(waist) ||
    !validateInput(neck) ||
    !gender
  ) {
    notification.classList.remove("hide");
    nav.classList.add("hide");
    setTimeout(() => {
      notification.classList.add("hide");
      nav.classList.remove("hide");
    }, 2000);
    return;
  }
  let bodyFatPercentage;
  if (gender === "male") {
    bodyFatPercentage =
      86.01 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
  }
  if (gender === "female") {
    bodyFatPercentage =
      163.205 * Math.log10(waist + hip - neck) -
      97.684 * Math.log10(height) -
      78.387;
  }
  res.classList.add("fat-res-card");
  res.innerHTML = `<div>You body fat <b>${Math.round(
    bodyFatPercentage
  )}</b>% </div>`;
  document.getElementById("fat-weight").value = "";
  document.getElementById("fat-height").value = "";
  document.getElementById("fat-neck").value = "";
  document.getElementById("fat-waist").value = "";
  document.getElementById("fat-hip").value = "";
  fatmale.checked = false;
  fatFemale.checked = false;
  setTimeout(() => {
    res.innerHTML = "";
    res.classList.remove("fat-res-card");
  }, 5000);
}

function calculateIdealWeight() {
  const height = parseFloat(document.getElementById("ideal-height").value);
  let idealFemale = document.getElementById("ideal-female");
  let idealmale = document.getElementById("ideal-male");
  let res = document.getElementById("ideal-res-card");
  let idealWeight;
  if (!validateInput(height) || (!idealmale.checked && !idealFemale.checked)) {
    notification.classList.remove("hide");
    nav.classList.add("hide");
    setTimeout(() => {
      notification.classList.add("hide");
      nav.classList.remove("hide");
    }, 2000);
    return;
  }
  if (idealmale.checked) {
    idealWeight = 50 + 0.91 * (height - 152.4);
  } else if (idealFemale.checked) {
    idealWeight = 45.5 + 0.91 * (height - 152.4);
  }
  res.classList.add("ideal-res-card");
  res.innerHTML = `<div>You Ideal weight <b>${Math.round(
    idealWeight
  )}</b>Kg </div>`;
  document.getElementById("ideal-height").value = "";

  idealmale.checked = false;
  idealFemale.checked = false;
  setTimeout(() => {
    res.innerHTML = "";
    res.classList.remove("ideal-res-card");
  }, 5000);
}
