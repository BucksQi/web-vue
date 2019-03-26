// 添加购物车的信息
export function addStoreCart (goods) {
  let flag = true
  if (localStorage.getItem('cart')) {
    let obj = JSON.parse(localStorage.getItem('cart'))
    obj.cart.forEach((item, index) => {
      if (item.id === goods.id) {
        item.count += goods.count
        obj.cart[index] = item
        flag = false
        return false
      }
    })
    if (flag) {
      obj.cart.push(goods)
    }
    localStorage.setItem('cart', JSON.stringify(obj))
  } else {
    localStorage.setItem('cart', JSON.stringify({cart: Array.of(goods)}))
  }
}

// 添加收货地址
export function areaStreet (address) {
  localStorage.setItem('address', JSON.stringify(address))
}

// 获取收货地址
export function getAreaStreet () {
  return localStorage.getItem('address')
}

// 获取购物车商品
export function getSoreCart () {
  return localStorage.getItem('cart')
}
