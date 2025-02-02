const convertButton = document.querySelector(".convert-button") // botão converter
const currencySelect = document.querySelector(".currency-select")// meu select






const convertValue = async () => {
    const inputCurrencyValue = document.querySelector(".input-currency").value //input, valor digitado
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert") //valor em real 
    const currencyValueConverted = document.querySelector(".currency-value") // valor convertido
 

    //parte que faz pegar o valor atualizado do dolar e de outros valores (arrumar depois)
    //const data = await afetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL").then(Response => response.json())

    console.log(currencySelect.value) // so o valor do select
    const dolarToday = 6.10 // valor do dolar
    const euroToday = 6.30// valor do euro
    const libraToday = 7.59 // valor da libra

    const valorConvertido = inputCurrencyValue / dolarToday // valor do dolar convertido

    const libraConvert = inputCurrencyValue / libraToday // libra convertida


    currencyValueConverted.innerHTML = libraConvert
   
    
  if (currencySelect.value == "libra") {
    currencyValueConverted.innerHTML = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(libraConvert)
   }

    if (currencySelect.value == "dolar") {

        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(valorConvertido)

    }

    if (currencySelect.value == "euro") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(inputCurrencyValue / euroToday)
    }


        currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(inputCurrencyValue)


    }

  












    function changeCurrency() {
        const currencyName = document.getElementById("currency-name")
        const currencyImage = document.querySelector(".currency-img")

        if (currencySelect.value == "dolar") {
            currencyName.innerHTML = "Dólar Americano"
            currencyImage.src = "./assets/usa.png"
        }

        if (currencySelect.value == "euro") {
            currencyName.innerHTML = "Euro"
            currencyImage.src = "./assets/euro.png"
        }

        if (currencySelect.value == "libra") {
            currencyName.innerHTML = "Libra"
            currencyImage.src = "./assets/libra.png"
        }
        
    

        convertValue()
    }


    currencySelect.addEventListener("change", changeCurrency)
    convertButton.addEventListener("click", convertValue)