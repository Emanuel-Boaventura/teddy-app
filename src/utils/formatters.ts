export function currencyFormatter(value: number) {
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

  return formattedValue;
}

export function currencyToNumberFormatter(text: string) {
  return Number(
    text
      .replace(/^R\$\s?/, '') // Remove "R$" and any space after it
      .replace(/\./g, '') // Remove dots (grouping separators)
      .replace(',', '.') // Replace comma with a dot (decimal separator)
  );
}
