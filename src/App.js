import React from "react";
import Block from "./Block";
import "./index.css";

function App() {
  const [fromCurrency, setFromCurrency] = React.useState("USD"); // Из какой валюты
  const [toCurrency, setToCurrency] = React.useState("RUB"); // В какую валюту
  const [fromPrice, setFromPrice] = React.useState(1); // Исходная сумма
  const [toPrice, setToPrice] = React.useState(0); // Конвертированная сумма
  const [rates, setRates] = React.useState([]); // Курс валют

  // Эффект для загрузки данных
  React.useEffect(() => {
      fetch("https://api.nbrb.by/exrates/rates?periodicity=0")
          .then((response) => response.json())
          .then((data) => {
              setRates(data);
              console.log(data);
          })
          .catch((error) => {
              console.warn(error);
              alert("Не удалось получить информацию");
          });
  }, []);

  // Функция для получения курса по валюте
  const getExchangeRate = (currency) => {
      const rate = rates.find((rate) => rate.Cur_Abbreviation === currency);
      return rate ? rate.Cur_OfficialRate / rate.Cur_Scale : 0;
  };

  // Эффект для обновления конвертированной суммы
  React.useEffect(() => {
      const fromRate = getExchangeRate(fromCurrency);
      const toRate = getExchangeRate(toCurrency);

      if (fromRate && toRate) {
          const convertedPrice = (fromPrice * fromRate) / toRate;
          setToPrice(convertedPrice.toFixed(2)); // Форматируем до 2 знаков после запятой
      }
  }, [fromPrice, fromCurrency, toCurrency, rates]); // Запускаем, если эти значения изменятся





  

  return (
      <div className="App">
          <Block
              value={fromPrice}
              currency={fromCurrency}
              onChangeCurrency={setFromCurrency}
              onChangeValue={setFromPrice} // Передаем в качестве обработчика
          />
          <Block
              value={toPrice}
              currency={toCurrency}
              onChangeCurrency={setToCurrency}
              onChangeValue={setToPrice}
          />
      </div>
  );
}

export default App;