const numberToCurrency = {}

function converNumberToCurrency (num) {
  const currency = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `${'$'} ${currency}`
}

numberToCurrency.install = function (Vue) {
  Vue.filter('numberToCurrency', (val) => {
    return converNumberToCurrency(val)
  })
}

export default numberToCurrency
