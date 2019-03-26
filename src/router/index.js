import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Member from '@/components/member/Member'
import Index from '@/components/Index'
import Cart from '@/components/cart/Cart'
import Search from '@/components/search/Search'
import Order from '@/components/order/Order'
import CloudPurchase from '@/components/cloudPurchase/CloudPurchase'
import Brand from '@/components/brand/Brand'
import Activity from '@/components/activity/Activity'
import Login from '@/components/login/Login'
import Coupon from '@/components/coupon/Coupon'
import Register from '@/components/login/Register'
import Forget from '@/components/login/Forget'
import Integral from '@/components/integral/Integral'
import IntegralView from '@/components/integral/IntegralView'
import GunDong from '@/components/GunDong'
import Goods from '@/components/goods/Goods'
import ShopStore from '@/components/store/ShopStore'
import Store2 from '@/components/store/Store2'
import StoreGoods from '@/components/store/StoreGoods'
import StoreClass from '@/components/store/StoreClass'

Vue.use(VueResource)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/search/:keyword',
      name: 'searchKeyWord',
      component: Search
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      meta: {
        // meta元素
        requireAuth: true
      }
    },
    {
      path: '/member',
      name: 'member',
      component: Member,
      meta: {
        // meta元素
        requireAuth: true
      }
    },
    {
      path: '/cloudPurchase',
      name: 'cloudPurchase',
      component: CloudPurchase
    },
    {
      path: '/brand',
      name: 'brand',
      component: Brand
    },
    {
      path: '/activity',
      name: 'activity',
      component: Activity
    },
    {
      path: '/coupon',
      name: 'coupon',
      component: Coupon,
      meta: {
        // 需要认证
        requireAuth: true
      }
    },
    {
      path: '/toLogin',
      name: 'toLogin',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget
    },
    {
      path: '/integral',
      name: 'integral',
      component: Integral
    },
    {
      path: '/integral/view',
      name: 'integralView',
      component: IntegralView
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/store',
      name: 'store',
      component: ShopStore
    },
    {
      path: '/store2',
      name: 'store2',
      component: Store2
    },
    {
      path: '/storeGoods',
      name: 'storeGoods',
      component: StoreGoods
    },
    {
      path: '/storeClass',
      name: 'storeClass',
      component: StoreClass
    },
    {
      path: '/gunDong',
      name: 'gunDong',
      component: GunDong
    }
  ]
})
