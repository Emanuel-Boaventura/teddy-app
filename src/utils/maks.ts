export const currencyMask = (value?: string, withRs?: boolean) => {
  if (!value) return withRs ? 'R$ 0,00' : '';
  const currencyNumber = Number(value.replace(/\D/g, '')) / 100 || 0;
  const currency = currencyNumber
    .toFixed(2)
    .replace('.', ',')
    .replace(/(?=(\d{3})+(\D))\B/g, '.');

  return withRs ? `R$ ${currency}` : currency;
};
