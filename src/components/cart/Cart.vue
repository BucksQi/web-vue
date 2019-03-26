<template>
  <div class="m-cart">
    <common-header :title="title" :back_src="back_src" :home_src="home_src" :select_address="select_address" @changeAddress="changeAddr"></common-header>
    <section>
      <!--购物车产品-->
      <div class="wrapper" v-show="isEmpty" ref="wrapper">
        <div class="scroller" ref="scroller">
          <ul class="cart-wap">
            <li v-for="(item, index) in cartList" :key="index">
              <div class="item_store">
                <div class="item_box">
                  <a class="item_name"><span>{{item.shopName}}</span></a>
                  <a class="redact" @click="editGoods(index)"><span>编辑</span></a>
                </div>
                <div class="item_cart">
                  <ul>
                    <li>
                      <div class="m-select">
                        <span :class="item.isCheck ? 'pitch_on' : ''" @click="checkGoods(index)"></span>
                      </div>
                    </li>
                    <li>
                      <router-link tag="a" class="item_img" :to="{path: '', query: {id: item.id}}">
                        <img :src="item.image">
                      </router-link>
                    </li>
                    <li>
                      <div :class="item.flag ? 'goods_info left_arrive': 'goods_info left_leave'">
                        <div class="goods_text">
                          <span class="goods_name">
                            {{item.titleName}}
                          </span>
                        </div>
                        <div class="goods_cl">
                          <span v-for="(types, idex) in item.goodsTypeList" :key="idex">{{types.typeNo}}：{{types.typeName}}</span>
                        </div>
                        <div class="goods_value">
                          <span class="now_value"><b>¥</b>{{item.price}}</span>
                          <span class="primary_value">¥{{item.market}}</span>
                          <span class="number"><em>X</em><i>{{item.count}}</i></span>
                        </div>
                      </div>
                      <div :class="!item.flag ? 'goods_edit right_arrive' : 'goods_edit right_leave'">
                        <div class="goods_left">
                          <div class="goods_norms">
                            <ul>
                              <li class="reduce">
                                <a @click="reduceGoods(index)">
                                  <img :src="reduce_src">
                                </a>
                              </li>
                              <li>
                                <input type="number" class="goods_count" v-model="item.count">
                              </li>
                              <li class="add">
                                <a @click="addGoods(index)">
                                  <img :src="add_src">
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div class="norms_p">
                            <div class="norms_p_text">
                              <span class="cart_sp" v-for="(types, idex) in item.goodsTypeList" :key="idex">
                                {{types.typeNo}}：{{types.typeName}}
                              </span>
                            </div>
                            <div class="norms_arrow">
                              <a>
                                <img :src="arrow_src">
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="goods_right">
                          <a @click="deleteGoods(index)">删除</a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!--空购物车-->
      <div class="cart-empty" v-show="!isEmpty">
        <div class="cmt">
          <div class="cart-img">
            <img :src="cart_img">
          </div>
          <div class="m-gou">购物车是空的，去看看商品吧</div>
        </div>
        <div class="cart-btn">
          <a @click="goLogin">登录</a>
          <a @click="goCart">去购物</a>
        </div>
      </div>
    </section>

    <!--选择城市-->
    <section>
      <div class="m-address" v-show="isSelect">
        <city-picker @closedAdd="closedAddress" @changeStreetStr="changeStreet" @changeAreaArray="changeArea"></city-picker>
      </div>
    </section>

    <!--购物车数量-->
    <section>
      <cart-list v-show="isEmpty" @checkAll="checkAllGoods" :totalPrice="totalPrice" :buyCount="buyCount" :isAll="isAll"></cart-list>
    </section>

  </div>
</template>

<script>
import CommonHeader from '@/components/common/CommonHeader'
import CityPicker from '@/components/cityPicker/CityPicker'
import CartList from '@/components/common/CartList'
import {getSoreCart, getAreaStreet} from '@/store/soterData'
import BScroll from 'better-scroll'

export default {
  name: 'car',
  components: {CommonHeader, CityPicker, CartList},
  created () {
    let obj = getSoreCart()
    if (obj) {
      this.isEmpty = true
      this.select_address = true
      let addr = JSON.parse(getAreaStreet())
      this.title = addr.areaArray[1] === '市辖区' ? addr.areaArray[0] : addr.areaArray[1]
      this.areaArray = addr.areaArray
      this.street = addr.street
      this.cartList = JSON.parse(obj).cart
      this.cartList.forEach((item, index) => {
        this.cartList[index].flag = true
        this.cartList[index].isCheck = false
      })
    }
    this.$nextTick(() => {
      this.initScroll()
    })
  },
  mounted () {

  },
  data () {
    return {
      isEmpty: false,
      isSelect: false,
      isAll: false,
      select_address: false,
      title: '购物车',
      back_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/back.png',
      home_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/home.png',
      cart_img: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/car_none.png',
      reduce_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/g_detail_14.png',
      add_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/g_detail_15.png',
      arrow_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/s_norms_arrow.png',
      areaArray: [],
      street: null,
      cartList: [],
      totalPrice: 0.00,
      buyCount: 0
    }
  },
  methods: {
    goLogin () {
      this.$router.push({path: '/toLogin'})
    },
    goCart () {
      this.$router.push({path: '/'})
    },
    changeAddr (open) {
      this.isSelect = open
    },
    changeArea (area) {
      this.areaArray = area
      this.title = this.areaArray[1] === '市辖区' ? this.areaArray[0] : this.areaArray[1]
    },
    changeStreet (street) {
      this.street = street
    },
    closedAddress (closed) {
      this.isSelect = closed
    },
    checkAllGoods (allCheck) {
      let tmp = []
      let total = 0
      this.cartList.forEach((item) => {
        item.isCheck = allCheck
        total += item.count * item.price
        tmp.push(item)
      })
      this.cartList = tmp
      if (allCheck) {
        this.buyCount = this.cartList.length
        this.isAll = true
        this.totalPrice = total
      } else {
        this.buyCount = 0
        this.isAll = false
        this.totalPrice = 0
      }
    },
    checkGoods (index) {
      let item = this.cartList[index]
      item.isCheck = !item.isCheck
      this.$set(this.cartList, index, item)
      if (item.isCheck) {
        this.buyCount++
        this.totalPrice += item.count * item.price
      } else {
        this.buyCount--
        this.totalPrice -= item.count * item.price
      }
      if (this.buyCount === 0) {
        this.isAll = false
      } else {
        this.isAll = true
      }
    },
    editGoods (index) {
      let item = this.cartList[index]
      item.flag = !item.flag
      this.$set(this.cartList, index, item)
    },
    deleteGoods (index) {
      this.cartList.splice(index, 1)
    },
    initScroll () {
      this.$nextTick(() => {
        if (this.scroll) {
          this.scroll.refresh()
        } else {
          this.scroll = new BScroll(this.$refs.wrapper, {
            startY: 0,
            click: true,
            scrollX: false,
            scrollY: true,
            eventPassthrough: 'horizontal',
            scrollbar: {
              fade: true,
              interactive: false
            }
          })
        }
      })
    },
    reduceGoods (index) {
      let item = this.cartList[index]
      if (item.count <= 1) {
        return false
      } else {
        item.count--
        this.$set(this.cartList, index, item)
      }
    },
    addGoods (index) {
      let item = this.cartList[index]
      if (item.count > item.store) {
        return false
      } else {
        item.count++
        this.$set(this.cartList, index, item)
      }
    }
  }

}
</script>

<style scoped>

  i, b {
    text-decoration: none;
    font-style: normal;
    font-weight: lighter;
  }

  .m-cart {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  /***空车***/
  .cart-empty {
    position: absolute;
    overflow: hidden;
    top: 1rem;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #f5f5f5;
  }

  .cmt {
    width: 100%;
    height: 4rem;
    margin-top: 1rem;
  }

  .cart-img  {
    margin: 0 auto;
    width: 2.78rem;
    height: 2.45rem;
  }

  .cart-img img {
    width: inherit;
    height: inherit;
  }

  .m-gou {
    margin-top: .5rem;
    width: 100%;
    height: 1rem;
    line-height: 1.3;
    text-align: center;
    font-size: .6rem;
    font-weight: 200;
    color: #575757;
  }

  .cart-btn {
    width: 100%;
    height: 1rem;
    line-height: 1.3;
    text-align: center;
    color: #fff;
    margin-top: .5rem;
  }

  .cart-btn a {
    color: #fff;
    display: inline-block;
    height: inherit;
    width: 3rem;
    text-align: center;
    background-color: #F94D4D;
    font-size: .45rem;
    line-height: 1rem;
    border-radius: 3px;
  }

  /***购物车商品****/
  .wrapper {
    position: absolute;
    overflow: hidden;
    top: 1rem;
    left: 0;
    bottom: 1.4rem;
    width: 100%;
    background-color: #f5f5f5;
  }

  .scroller {
    position: absolute;
    z-index: 1;
    width: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    transform: translateZ(0);
    -webkit-touch-callout: none;
    user-select: none;
    text-size-adjust: none;
    touch-action: none;
  }

  .cart-wap {
    width: 100%;
  }

  .cart-wap > li {
    background-color: #fff;
    margin-top: .4rem;
  }

  .item_store {
    box-shadow: 0 1px 0 #ccc;
  }

  .item_box {
    overflow: hidden;
    border-bottom: dashed 1px #b7b7b7;
    margin: 0 3%;
    height: 1.167rem;
    line-height: 1.167rem;
  }

  .item_box a {
    display: inline-block;
    height: inherit;
    line-height: inherit;
    text-align: center;
  }

  .item_name {
    float: left;
    background-image: url(../../../static/images/more.png);
    display: inline-block;
    background-position: right center;
    background-repeat: no-repeat;
    padding-right: .417rem;
    background-size: .195rem .278rem;
  }

  .item_name > span {
    background-image: url(../../../static/images/g_detail_10.png);
    background-repeat: no-repeat;
    padding-left: .694rem;
    font-size: .4rem;
    font-weight: normal;
    height: .528rem;
    line-height: .528rem;
    background-size: .611rem .667rem;
    background-position: 0 -0.1rem;
  }

  .redact {
    float: right;
    color: #878787;
    font-size: .4rem;
  }

  .item_cart {
    overflow: hidden;
    margin: 0 3%;
    height: 108px;
  }

  .item_cart > ul {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    height: inherit;
  }

  .item_cart > ul > li {
    display: flex;
    height: 100%;
    flex-flow: row wrap;
    position: relative;
  }

  .item_cart > ul > li:first-child {
    width: 10%;
    justify-content: center;
    align-items: center;
  }

  .m-select > span {
    display: block;
    width: .611rem;
    height: .611rem;
    border: solid 1px #a2a2a2;
    vertical-align: middle;
    border-radius: 50%;
  }

  .m-select .pitch_on {
    background: url(../../../static/images/s_goods_pitch.png) no-repeat center center #fe3837;
    border: solid 1px #fe3837;
    background-size: .611rem .611rem;
  }

  .item_cart > ul > li:nth-child(2) {
    width: 25%;
    justify-content: center;
    align-items: center;
  }

  .item_img {
    border: solid 1px #ebebeb;
    width: 2.223rem;
    height: 2.223rem;
  }

  .item_img > img {
    width: 100%;
  }

  .item_cart > ul > li:last-child {
    width: 65%;
  }

  .item_cart > ul > li:last-child > div {
    margin-left: 3%;
    width: 100%;
    height: 100%;
  }

  .goods_text {
    margin-top: 3%;
    color: #333;
    display: flex;
  }

  .goods_name {
    font-size: .3rem;
    color: #333;
    line-height: .6rem;
    height: 1rem;
    overflow: hidden;
  }

  .goods_cl {
    color: #9b9a9a;
    line-height: .5rem;
    height: 1rem;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    width: 100%;
  }

  .goods_cl > span {
    font-size: .3rem;
    /*margin: auto .05rem;*/
  }

  .goods_value {
    display: flex;
  }

  .now_value {
    color: #f94d4d;
    font-size: .4rem;
  }

  .now_value b {
    font-size: .4rem;
    font-weight: 500;
  }

  .primary_value {
    color: #9b9a9a;
    text-decoration: line-through;
    font-size: .35rem;
    margin-left: .2rem;
    margin-top: .1rem;
  }

  .number {
    position: absolute;
    right: 1rem;
  }

  .number em {
    font-size: 0.35rem;
    font-style: normal;
  }

  .goods_left {
    height: 100%;
    width: 75%;
    float: left;
  }

  .goods_right {
    height: 100%;
    width: 25%;
    float: right;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .goods_right a {
    color: #fff;
    display: flex;
    width: 80%;
    height: 20%;
    justify-content: center;
    align-items: center;
    font-size: .4rem;
  }

  .goods_norms {
    height: 35%;
    width: 100%;
    display: flex;
  }

  .goods_norms > ul {
    display: inherit;
    height: 96%;
    width: 100%;
  }

  .goods_norms > ul > li {
    display: flex;
    flex: .8;
    border-bottom: solid 1px #dfdfdf;
    justify-content: center;
    align-items: center;
    border-right: solid 1px #dfdfdf;
  }

  .goods_norms > ul > li:nth-child(2) {
    flex: 1.2;
  }

  .goods_norms > ul > li:last-child {
    border-right: none;
  }

  .goods_norms > ul > li > a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 46%;
  }

  .goods_count {
    width: 100%;
    border: none;
    text-align: center;
    height: 100%;
  }

  .norms_p {
    height: 65%;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
  }

  .norms_p > div:first-child {
    display: flex;
    width: 100%;
    height: 80%;
    flex-flow: row wrap;
    overflow: hidden;
  }

  .norms_p > div:last-child {
    width: 100%;
    display: flex;
    height: 20%;
  }

  .norms_p_text > span {
    display: flex;
    width: 100%;
    height: .5rem;
    font-size: .3rem;
    color: #9a9a9a;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .norms_arrow {
    justify-content: flex-end;
  }

  .norms_arrow > a {
    margin-right: 10%;
    height: 60%;
    display: flex;
    width: .5rem;
  }

  .norms_arrow > a > img {
    width: 100%;
    height: 100%;
  }

  .goods_info {
    position: absolute;
  }

  .goods_info.left_arrive {
    z-index: 2;
    left: 0;
    transition: left 1.5s ease-in-out 150ms;
  }

  .goods_info.left_leave {
    z-index: 1;
    left: 6.95rem;
    transition: left 1s ease-in-out 100ms;
  }

  .goods_edit {
    position: absolute;
  }

  .goods_edit.right_arrive {
    left: 0;
    z-index: 2;
    transition: left 1.5s ease-in-out 150ms;
  }

  .goods_edit.right_leave {
    left: 6.95rem;
    z-index: 1;
    transition: left 1s ease-in-out 100ms;
  }

  /***选择地址****/
  .m-address {
    background-color: rgba(0, 0, 0, .5);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
  }

</style>
