const { useState, useMemo } = React;

const EXCHANGE_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 156.7,
};

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  // Memoize conversions for 'fromCurrency'
  // Requirement check: changing 'toCurrency' will not trigger this calculation logic
  const convertedResults = useMemo(() => {
    console.log("Memoized calculation triggered");
    const results = {};
    const amountInUSD = amount / EXCHANGE_RATES[fromCurrency];

    Object.keys(EXCHANGE_RATES).forEach((currency) => {
      results[currency] = amountInUSD * EXCHANGE_RATES[currency];
    });

    return results;
  }, [amount, fromCurrency]);

  const displayValue = (convertedResults[toCurrency] || 0).toFixed(2);

  return (
    <div className="converter-card">
      <h1 className="header">QuickFX</h1>

      <div className="input-section">
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="main-input"
          placeholder="Enter amount..."
        />
      </div>

      <div className="controls">
        <div className="select-box">
          <label>From</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {Object.keys(EXCHANGE_RATES).map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>

        <div className="select-box">
          <label>To</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {Object.keys(EXCHANGE_RATES).map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="display-area">
        <span className="converted-text">
          {displayValue} {toCurrency}
        </span>
      </div>
    </div>
  );
};
