const convertButton = document.querySelector(".convert-button"); // botão converter
const currencySelect = document.querySelector(".currency-select"); // select para escolher a moeda

// Função que faz a conversão de moeda
const convertValue = async () => {
    const inputCurrencyValue = parseFloat(document.querySelector(".input-currency").value); // valor digitado no input
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert"); // valor em real
    const currencyValueConverted = document.querySelector(".currency-value"); // valor convertido

    try {
        // Substitua YOUR_API_KEY pela sua chave da Open Exchange Rates
        const response = await fetch("https://openexchangerates.org/api/latest.json?app_id=YOUR_API_KEY");
        const data = await response.json();

        if (data.error) {
            throw new Error("Falha ao obter taxas de câmbio.");
        }

        // Obter as taxas de câmbio
        const dolarToday = data.rates.BRL; // taxa do dólar em relação ao BRL
        const euroToday = data.rates.EUR; // taxa do euro em relação ao BRL
        const libraToday = data.rates.GBP; // taxa da libra em relação ao BRL

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
            currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR"
            }).format(valorConvertido);
        }

        if (currencySelect.value == "libra") {
            valorConvertido = inputCurrencyValue * libraToday;
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

    } catch (error) {
        console.error(error);
        alert("Houve um erro ao tentar buscar as taxas de câmbio. Por favor, tente novamente mais tarde.");
    }
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
