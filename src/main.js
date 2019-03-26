// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './vuex/store'

import VueCookies from 'vue-cookies'
import md5 from 'js-md5'

import Toast from 'vue2-toast'

import Mit from 'mint-ui'

// 引入api文件
import api from './api/index'

import IScrollView from 'vue-iscroll-view'
import IScroll from 'iscroll'

import rem from './config/rem'

Vue.use(IScrollView, IScroll)
Vue.use(VueCookies)
Vue.use(Mit)

Vue.use(Toast, {
  type: 'center',
  duration: 2500,
  wordWrap: false,
  width: 'auto'
})

rem()

// 绑定全局
Vue.prototype.$api = api
Vue.prototype.$md5 = md5

Vue.config.productionTip = false

Vue.directive('power', {
  bind (el, binding) {
    const roles = binding.value
    // 不存在就删除角色
    if (roles.split(',').includes('user')) {
      Vue.nextTick(() => {
        console.log(el, '\n', el.parentNode)
        el.parentNode.removeChild(el)
      })
    }
  }
})

// 全局导航钩子
router.beforeEach((to, from, next) => {
  // console.log('to=', to, '\nfrom=', from, '\nnext=', next)
  // console.log('$cookies=', router.app.$cookies)
  // console.log('app=', router.app)
  // console.log('member=', store.state.member)
  if (to.meta.requireAuth) {
    /* if (!router.app.$cookies.get('token')) {
      next({
        path: '/toLogin',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    } else if (isEmptyObject(store.state.member)) {
      next({
        path: '/toLogin',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    } else {
      next()
    } */
    if (router.app.$cookies.get('token')) {
      next({path: to.query.redirect})
    } else {
      if (isEmptyObject(store.state.member)) {
        next({
          path: '/toLogin',
          query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      } else {
        let token = store.state.member.username + ',' + Date.now()
        token = router.app.$md5(token)
        router.app.$cookies.set('token', token, 2 * 60 * 60)
        next({path: to.query.redirect})
      }
    }
  } else {
    next()
  }
})

function isEmptyObject (obj) {
  if (Object.keys(obj).length) {
    return false
  }
  return true
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
