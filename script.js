const fromCurrency = document.getElementById("from_currency");
const toCurrency = document.getElementById("to_currency");
const amountInput = document.getElementById("amount");
const result = document.getElementById("result");

const API_KEY = "3c1b0e8853f925c4f14c05b10c3ba323";
let rates = {};

// Fetch real-time exchange rates
async function fetchRates() {
    try {
        const response = await fetch(
            `https://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`
        );

        const data = await response.json();

        if (!data.success) {
            result.innerText = "API Error: Unable to fetch rates\nLooks like the free plan has expired.\nLOL just kidding, please get your own API key :)";
            return;
        }

        rates = data.rates;

        fromCurrency.innerHTML = "";
        toCurrency.innerHTML = "";

        Object.keys(rates).forEach(currency => {
            fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
            toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
        });

        fromCurrency.value = "INR";
        toCurrency.value = "USD";

    } catch (error) {
        result.innerText = "Network error. Try again later.";
    }
}

fetchRates();

document.getElementById("convert_btn").addEventListener("click", () => {
    const amount = amountInput.value;

    if (!amount || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    const from = fromCurrency.value;
    const to = toCurrency.value;

    const converted =
        (amount / rates[from]) * rates[to];

    result.innerText = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
});

document.getElementById("swap_btn").addEventListener("click", () => {
    [fromCurrency.value, toCurrency.value] =
    [toCurrency.value, fromCurrency.value];
});
