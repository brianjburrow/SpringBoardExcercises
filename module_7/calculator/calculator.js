window.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  document.getElementById("loan-amount").value = 10000
  document.getElementById("loan-years").value = 2
  document.getElementById("loan-rate").value = 0.05;
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  updateMonthly(calculateMonthlyPayment(getCurrentUIValues()));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  let { amount, years, rate } = values;
  amount = parseFloat(amount);
  years = parseFloat(years);
  rate = parseFloat(rate);

  let ans = amount * rate / (1 - (1 + rate) ** (-years * 12));
  return ans.toFixed(2).toString();
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  document.querySelector("#monthly-payment").innerText = monthly;
}
