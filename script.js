const links = document.querySelectorAll(".link");
const steps = document.querySelectorAll(".step");

//function for checking form validity
const form = document.getElementById("form");
function checkFormValidity() {
  if (!form.reportValidity()) {
    const inValidInputs = form.querySelectorAll(":invalid");
    inValidInputs.forEach((input) => input.classList.add("error"));
    return false;
  }
  return true;
}

// handling changes form inputs
let userData = {
  name: "",
  email: "",
  number: "",
  plan: "mo",
};
const handleStore = (input) => {
  const { name, value } = input;
  userData[name] = value;
};

// navigating to next or current step
let currentStep = 1;

const btns = document.querySelectorAll(".btn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const changeActiveLink = () => {
  links.forEach((link) => {
    // console.log(link.dataset.id);
    link.classList.remove("active");
    if (link.dataset.id == `step-${currentStep}`) {
      link.classList.add("active");
    }
  });
  if (currentStep == 1) {
    prevBtn.style.display = "none";
  } else if (currentStep == 5) {
    btns.forEach((btn) => (btn.style.display = "none"));
  } else {
    btns.forEach((btn) => (btn.style.display = "block"));
  }
};
function nextStep() {
  const formIsValid = checkFormValidity();
  switch (currentStep) {
    case 1:
      if (formIsValid) {
        currentStep += 1;
        break;
      }
      currentStep = 1;
      break;
    case 2:
      currentStep += 1;
      break;
    case 3:
      nextBtn.innerText = "Confirm";
      nextBtn.classList.add("confirm");
      currentStep += 1;
      break;
    case 4:
      currentStep += 1;
      break;
    case 5:
      console.log(5);
      currentStep += 1;
      btns.forEach((btn) => (btn.style.display = "none"));
      prevBtn.style.display = "none";
      break;

    default:
      break;
  }
  // if (currentStep == 1) {
  //
  // }
  // if (currentStep < 4) {
  //   currentStep += 1;
  // } else {
  //   currentStep = 3;
  // }
  changeActiveLink();
}
nextBtn.addEventListener("click", () => {
  nextStep();
  steps.forEach((step) => step.classList.add("d-none"));
  document.getElementById(`step-${currentStep}`).classList.remove("d-none");
});
prevBtn.addEventListener("click", () => {
  if (currentStep < 2) {
    currentStep = 1;
  } else {
    currentStep -= 1;
  }
  changeActiveLink();
  steps.forEach((step) => step.classList.add("d-none"));
  document.getElementById(`step-${currentStep}`).classList.remove("d-none");
  changeActiveLink();
});

// funtionality fo  tiggling plan (yearly or monthly)
const toggler = document.getElementById("toggler");
const plans = document.querySelectorAll(".plan");
const bonus = document.querySelectorAll(".bonus");
const showBonus = () => {
  bonus.forEach((bonus) => (bonus.style.display = "block"));
};
const hideBonus = () => {
  bonus.forEach((bonus) => (bonus.style.display = "none"));
};

function changePlan(sub) {
  plans.forEach((plan) => (plan.innerHTML = sub));
}
function handleChange(e) {
  if (e.checked) {
    showBonus();
    changePlan("yr");
    userData.plan = "yr";
    toggler.style.transform = "translateX(20px)";
  } else {
    hideBonus();
    changePlan("mo");
    userData.plan = "mo";
    toggler.style.transform = "translateX(0)";
  }
}

(function () {
  if (currentStep == 1) {
    prevBtn.style.display = "none";
  }
})();
