const convertButton = document.querySelector(".convert-button"); // botão converter
const currencySelect = document.querySelector(".currency-select"); // select para escolher a moeda

// Função que faz a conversão de moeda
const convertValue = async () => {
    const inputCurrencyValue = parseFloat(document.querySelector(".input-currency").value); // valor digitado no input
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert"); // valor em real
    const currencyValueConverted = document.querySelector(".currency-value"); // valor convertido

    // Fazer a requisição para obter as taxas de câmbio em tempo real
    const response = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL");
    const data = await response.json();

    // Obter as taxas de câmbio
    const dolarToday = data.USDBRL.high; // taxa do dólar
    const euroToday = data.EURBRL.high; // taxa do euro
    const libraToday = data.GBPBRL.high; // taxa da libra

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
    }).format(inputCurrencyValue);
};

// Função que altera o nome da moeda e a imagem de acordo com a moeda selecionada
function changeCurrency() {
    const currencyName = document.getElementById("currency-name");
    const currencyImage = document.querySelector(".currency-img");

    if (currencySelect.value == "dolar") {
        currencyName.innerHTML = "Dólar Americano";
        currencyImage.src = "./assets/usa.png";
    }

    if (currencySelect.value == "euro") {
        currencyName.innerHTML = "Euro";
        currencyImage.src = "./assets/euro.png";
    }

    if (currencySelect.value == "libra") {
        currencyName.innerHTML = "Libra";
        currencyImage.src = "./assets/libra.png";
    }

    convertValue();
}

// Adiciona os ouvintes de eventos
currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValue);
