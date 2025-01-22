const convertButton = document.querySelector(".convert-button"); // botão converter
const currencySelect = document.querySelector(".currency-select"); // select para escolher a moeda

// Função que faz a conversão de moeda
const convertValue = async () => {
    const inputCurrencyValue = parseFloat(document.querySelector(".input-currency").value); // valor digitado no input
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert"); // valor em real
    const currencyValueConverted = document.querySelector(".currency-value"); // valor convertido

    try {
        const response = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL");
        
        if (!response.ok) {
            throw new Error("Erro na requisição: " + response.statusText);
        }

        const data = await response.json();
        console.log(data);  // Exibe a resposta para depuração

        // Obter as taxas de câmbio
        const dolarToday = data['USD-BRL'].bid; // taxa do dólar em relação ao BRL
        const euroToday = data['EUR-BRL'].bid; // taxa do euro em relação ao BRL
        const libraToday = data['GBP-BRL'].bid; // taxa da libra em relação ao BRL

        let valorConvertido;

        // Lógica de conversão de acordo com a moeda escolhida
        if (currencySelect.value == "dolar") {
            valorConvertido = inputCurrencyValue * dolarToday;
            currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
            }).format(valorConvertido);
        }

        if (currencySelect.value == "euro") {
            valorConvertido = inputCurrencyValue * euroToday;
            currencyValueConverted.innerHTML 
