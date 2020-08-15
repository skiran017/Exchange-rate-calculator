const currecnyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currecnyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// Fetch exchange rate and update the DOM
function calculate() {
  const currency_one = currecnyEl_one.value;
  const currency_two = currecnyEl_two.value;

  fetch(
    `http://api.currencylayer.com/live?access_key=1f6f13a3e7a3d9d22aac54e6df366da8&format=1&source=${currency_one}`
  )
    .then((res) => res.json())
    .then((data) => {
      const rate = data.quotes[`${currency_one + currency_two}`];

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}
// Event listeners
currecnyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currecnyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currecnyEl_one.value;
  currecnyEl_one.value = currecnyEl_two.value;
  currecnyEl_two.value = temp;
  calculate();
});
calculate();
