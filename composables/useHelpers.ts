export const formatValue = (value, maximumFractionDigits = 4) => {
  return parseFloat(value).toLocaleString(undefined, { maximumFractionDigits })
}
