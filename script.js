// Query DOM elements
const links = document.querySelectorAll(".link");
const steps = document.querySelectorAll(".step");
const form = document.getElementById("form");
const btns = document.querySelectorAll(".btn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const plans = document.querySelectorAll(".plan");
const cards = document.querySelectorAll(".card");
const bonus = document.querySelectorAll(".bonus");
const plan = document.getElementById("plan");
const price = document.getElementById("price");
const extraContainer = document.getElementById("extra");
const totalValueSpan = document.getElementById("total-value");
const totalTextSpan = document.getElementById("total-text");
const planPriceSpan = document.getElementById("plan-price");

// User data object to store form input values and other datas
let userData = {
  name: "",
  email: "",
  number: "",
  sub: "mo",
  service: "",
  storage: "",
  profile: "",
  plan: {
    name: "Arcade",
    price: 9,
  },
  addOns: [],
  total: 0,
  setTotalPrice: function () {
    this.total = this.addOns.reduce(
      (total, addOn) => total + Number(addOn.amount),
      0
    );
    this.total += this.plan.price;
  },
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
    prevBtn.style.opacity = 0;
  } else if (currentStep === 5) {
    btns.forEach((btn) => (btn.style.display = "none"));
  } else {
    prevBtn.style.opacity = 1;
    btns.forEach((btn) => (btn.style.display = "block"));
  }
}

// Function to add extra ad-ons
function extraAddOns() {
  extraContainer.innerHTML = "";
  for (let i = 0; i < userData.addOns.length; i++) {
    extraContainer.children = undefined;
    const addOn = userData.addOns[i];
    const contentDiv = document.createElement("div");
    contentDiv.setAttribute("class", "row");
    const content = `  
    <div>
      <span> ${addOn.name} </span>
    </div>
    <h3>+$${addOn.amount}/${userData.sub}</h3>
  `;
    contentDiv.innerHTML = content;
    extraContainer.appendChild(contentDiv);
  }
}

// Function to set total price
function setTotals() {
  totalValueSpan.innerText = userData.total;
  if (userData.sub == "mo") {
    totalTextSpan.innerText = "Total (per monthly)";
  } else {
    totalTextSpan.innerText = "Total (per year)";
  }
}

// Function to set Plan
function setPlan() {
  const text = `${userData.plan.name} (${
    userData.sub == "mo" ? "Monthly" : "Yearly"
  })`;
  plan.innerText = text;
  planPriceSpan.innerText = userData.plan.price;
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

// Function to change sub (monthly or yearly)
function changeSub(sub) {
  plans.forEach((plan) => (plan.innerHTML = sub));
}

// Function to handle plan toggling
function handleChange(e) {
  if (e.checked) {
    bonus.forEach((bonus) => (bonus.style.display = "block"));
    userData.sub = "yr";
    changeSub(userData.sub);
    toggler.style.transform = "translateX(25px)";
  } else {
    bonus.forEach((bonus) => (bonus.style.display = "none"));
    userData.sub = "mo";
    changeSub(userData.sub);
    toggler.style.transform = "translateX(0)";
  }
}

// Function to handle add-ons
function handleAddOnChange(e) {
  const element = document.getElementById(e.dataset.id);
  const { name, value, amount } = e.dataset;
  const obj = { name, value, amount };
  if (e.checked) {
    element.classList.add("selected");
    userData.addOns.push(obj);
  } else {
    element.classList.remove("selected");
    const indexToDelete = userData.addOns.findIndex((obj) => obj.name == name);
    userData.addOns.splice(indexToDelete, 1);
  }
  userData.setTotalPrice();
  extraAddOns();
  setTotals();
}

// Function to change plan (Arcade, Advanced, Pro)
function changePlan(e) {
  userData.plan.price = Number(e.target.dataset.value);
  userData.plan.name = e.target.dataset.name;
  userData.total =
    userData.plan.price +
    userData.addOns.reduce((total, addOn) => total + Number(addOn.amount), 0);
  setTotals();
  setPlan();
}

// Event listeners
cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    cards.forEach((card) => card.classList.remove("selected"));
    document.getElementById(e.target.id).classList.add("selected");
    changePlan(e);
  });
});
nextBtn.addEventListener("click", nextStep);
prevBtn.addEventListener("click", prevStep);

// Initial UI setup
userData.setTotalPrice();
updateUI();
extraAddOns();
changeSub(userData.sub);
setTotals();
setPlan();
