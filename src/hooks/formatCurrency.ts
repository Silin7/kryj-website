// 金额格式化
function formatCurrency(
  value: any,
  minimumFractionDigits: any = 0,
  maximumFractionDigits: any = 2,
) {
  return new Intl.NumberFormat('en-US', {
    // style: 'currency',
    // currency: 'CNY', // 可以改为其他货币，如 'EUR', 'CNY' 等
    useGrouping: true,
    minimumFractionDigits, // 最小小数位数
    maximumFractionDigits, // 最大小数位数
  }).format(value)
}

export default formatCurrency
