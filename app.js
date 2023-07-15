import { MY_EXCHANGERATE_API_ACCESS_KEY } from "./env.js"; // errors occured here without file extensions
const url =
  "https://v6.exchangerate-api.com/v6/" + MY_EXCHANGERATE_API_ACCESS_KEY;

// elements
const currency_one = document.getElementById("currency_one");
const currency_two = document.getElementById("currency_two");
const list_one = document.getElementById("list_one");
const list_two = document.getElementById("list_two");
const amount = document.getElementById("amount");
const calculate = document.getElementById("calculate");
const result = document.getElementById("result");

// on loading
fetch(url + "/codes")
  .then((res) => res.json())
  .then((data) => {
    const items = data.supported_codes;
    let options;
    for (let item of items) {
      options += `<option value="${item[0]}">${item[1]}</option>`;
    }

    list_one.innerHTML = options;
    list_two.innerHTML = options;
  });

calculate.addEventListener("click", () => {
  const currency1 = currency_one.value;
  const currency2 = currency_two.value;
  const currencyAmount = amount.value;

  fetch(url + "/latest/" + currency1)
    .then((res) => res.json())
    .then((data) => {
      const calculatedAmount = (
        data.conversion_rates[currency2] * currencyAmount
      ).toFixed(3);
      result.innerHTML = `
            <div class="card border-primary">
              <div class="card-body text-center" style="font-size: 30px">
                ${currencyAmount} ${currency1} = ${calculatedAmount} ${currency2}
              </div>
            </div>
        `;
    });
});
