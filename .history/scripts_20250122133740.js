const convertButton = document.querySelector(".convert-button");
        const currencySelect = document.querySelector(".currency-select");

        const convertValue = async () => {
            const inputCurrencyValue = parseFloat(document.querySelector(".input-currency").value); // Converte para número
            const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
            const currencyValueConverted = document.querySelector(".currency-value");

            try {
                const response = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                const dolarToday = parseFloat(data.USDBRL.bid);
                const euroToday = parseFloat(data.EURBRL.bid);
                const libraToday = parseFloat(data.GBPBRL.bid);

                if (isNaN(dolarToday) || isNaN(euroToday) || isNaN(libraToday)) {
                    throw new Error("Valores da API inválidos.");
                }


                let convertedValue;
                let currencyCode;
                let locale;

                switch (currencySelect.value) {
                    case "libra":
                        convertedValue = inputCurrencyValue / libraToday;
                        currencyCode = "GBP";
                        locale = "en-GB";
                        break;
                    case "dolar":
                        convertedValue = inputCurrencyValue / dolarToday;
                        currencyCode = "USD";
                        locale = "en-US";
                        break;
                    case "euro":
                        convertedValue = inputCurrencyValue / euroToday;
                        currencyCode = "EUR";
                        locale = "de-DE";
                        break;
                    default:
                        convertedValue = 0;
                        currencyCode = "";
                        locale = "";
                }

                currencyValueConverted.innerHTML = new Intl.NumberFormat(locale, {
                    style: "currency",
                    currency: currencyCode,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }).format(convertedValue);

                currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }).format(inputCurrencyValue);

            } catch (error) {
                console.error("Erro ao buscar cotações:", error);
                alert("Ocorreu um erro ao buscar as cotações. Verifique sua conexão com a internet ou tente novamente mais tarde.");
                currencyValueConverted.textContent = "Erro ao carregar";
            }
        };

        convertButton.addEventListener("click", convertValue);
        currencySelect.addEventListener("change", convertValue)

        // Executa a conversão inicial
        convertValue();