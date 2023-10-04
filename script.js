// Query DOM elements
const links = document.querySelectorAll(".link");
const steps = document.querySelectorAll(".step");
const form = document.getElementById("form");
const btns = document.querySelectorAll(".btn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const plans = document.querySelectorAll(".plan");
const bonus = document.querySelectorAll(".bonus");

// User data object to store form input values
let userData = {
  name: "",
  email: "",
  number: "",
  plan: "mo",
};

// Current step tracking
let currentStep = 1;

// Function to update active link and button visibility
function updateUI() {
  links.forEach((link) => {
    link.classList.remove("active");
    if (link.dataset.id == `step-${currentStep}`) {
      link.classList.add("active");
    }
  });

  if (currentStep === 1) {
    prevBtn.style.display = "none";
  } else if (currentStep === 5) {
    btns.forEach((btn) => (btn.style.display = "none"));
  } else {
    btns.forEach((btn) => (btn.style.display = "block"));
  }
}

// Function to check form validity
function isFormValid() {
  return form.reportValidity();
}

// Function to handle form input changes and update userData
function handleStore(input) {
  const { name, value } = input;
  userData[name] = value;
}

// Function to navigate to the next step
function nextStep() {
  if (currentStep === 1 && !isFormValid()) {
    const inValidInputs = form.querySelectorAll(":invalid");
    inValidInputs.forEach((input) => input.classList.add("error"));

    return; // Don't proceed if the form is invalid on the first step
  }

  if (currentStep === 3) {
    nextBtn.innerText = "Confirm";
    nextBtn.classList.add("confirm");
  }

  currentStep = Math.min(currentStep + 1, 5);
  updateUI();
  steps.forEach((step) => step.classList.add("d-none"));
  document.getElementById(`step-${currentStep}`).classList.remove("d-none");
}

// Function to navigate to the previous step
function prevStep() {
  currentStep = Math.max(currentStep - 1, 1);
  updateUI();
  steps.forEach((step) => step.classList.add("d-none"));
  document.getElementById(`step-${currentStep}`).classList.remove("d-none");
}

// Function to change plan (monthly or yearly)
function changePlan(sub) {
  plans.forEach((plan) => (plan.innerHTML = sub));
}

// Function to handle plan toggling
function handleChange(e) {
  if (e.checked) {
    bonus.forEach((bonus) => (bonus.style.display = "block"));
    changePlan("yr");
    userData.plan = "yr";
    toggler.style.transform = "translateX(20px)";
  } else {
    bonus.forEach((bonus) => (bonus.style.display = "none"));
    changePlan("mo");
    userData.plan = "mo";
    toggler.style.transform = "translateX(0)";
  }
}

// Event listeners
nextBtn.addEventListener("click", nextStep);
prevBtn.addEventListener("click", prevStep);

// Initial UI setup
updateUI();
