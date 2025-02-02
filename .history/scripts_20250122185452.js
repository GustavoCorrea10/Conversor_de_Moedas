const convertButton = document.querySelector(".convert-button"); // botão converter
const currencySelect = document.querySelector(".currency-select"); // select para escolher a moeda

// Função que faz a conversão de moeda
const convertValue = async () => {
    const inputCurrencyValue = parseFloat(document.querySelector(".input-currency").value); // valor digitado no input
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert"); // valor em real
    const currencyValueConverted = document.querySelector(".currency-value"); // valor convertido

    // Fazer a requisição para obter as taxas de câmbio em tempo real
    const response = await fetch("https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD");
    const data = await response.json();

    // Obter as taxas de câmbio
    const dolarToday = data.conversion_rates.BRL; // taxa do dólar em relação ao BRL
    const euroToday = data.conversion_rates.EUR; // taxa do euro em relação ao BRL
    const libraToday = data.conversion_rates.GBP; // taxa da libra em relação ao BRL

    let valorConvertido;

    // Lógica de conversão de acordo com a moeda escolhida
    if (currencySelect.value == "dolar") {
        valorConvertido = inputCurrencyValue / dolarToday;
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(valorConvertido);
    }

    if (currencySelect.value == "euro") {
        valorConvertido = inputCurrencyValue / euroToday;
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(valorConvertido);
    }

    if (currencySelect.value == "libra") {
        valorConvertido = inputCurrencyValue / libraToday;
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(valorConvertido);
    }

    // Exibir o valor em reais
    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(inpu
