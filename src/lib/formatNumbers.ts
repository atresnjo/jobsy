export const formatSalary = (num: number, currency: string) => {
  const formatted =
    Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000)
      : Math.sign(num) * Math.abs(num)

  return `${mapCurrency(currency)}${formatted.toFixed(0)}k`
}

export const mapCurrency = (currency: string) => {
  if (currency == "Eur") return "€"
  else if (currency == "Pound") return "£"
  else if (currency == "Usd") return "$"

  return "$"
}
