const CURRENCY_FORMAT = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
});

const currencyFormat = (currency) => {
  return CURRENCY_FORMAT.format(currency);
};

export default currencyFormat;
