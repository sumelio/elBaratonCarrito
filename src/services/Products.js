import data from '../data/products.json'

const productService = {}

productService.search = function (q, apiUrl) {
  let list = data.products.map(
    p => { p.count_buy = 0; return p })
  return list
}

export default productService
