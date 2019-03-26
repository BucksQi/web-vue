import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  member: {},
  cart: [],
  address: {}
}

const mutations = {
  // 存储登录用户的信息
  storeMember (state, member) {
    state.member = member
  },

  // 购物车的信息
  storeCart (state, goods) {
    let flag = true
    state.cart.forEach((item, index) => {
      if (item.id === goods.id) {
        item.count += goods.count
        state.cart[index] = item
        flag = false
        return false
      }
    })
    if (flag) {
      state.cart.push(goods)
    }
  },

  // 收货地址
  areaStreet (state, address) {
    state.address = address
  }
}

export default new Vuex.Store({
  state,
  mutations
})
