import data from '../data/categories.json'

const categoryService = {}

categoryService.search = function () {
  let list = data.categories.map(
    p => { p.count_buy = 0; return p })
  return list
}

export default categoryService
