export const currencyMask = (value?: string, noRs?: boolean) => {
  if (!value) return noRs ? '' : 'R$ 0,00';
  const currencyNumber = Number(value.replace(/\D/g, '')) / 100 || 0;
  const currency = currencyNumber
    .toFixed(2)
    .replace('.', ',')
    .replace(/(?=(\d{3})+(\D))\B/g, '.');

  return noRs ? currency : `R$ ${currency}`;
};
