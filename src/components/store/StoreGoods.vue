<template>
  <div class="sg-main">
    <div class="sg-header">
      <ul>
        <li>
          <router-link tag="a" class="fl" :to="{path: '/store'}">
            <img :src="shop_store_src">
          </router-link>
        </li>
        <li>
          <input type="text" class="keyword">
        </li>
        <li>
          <router-link tag="a" class="classify" :to="{path: '/storeClass'}">
            <p class="cl-fl"><img :src="menu_src"></p>
            <p class="cl-ri">分类</p>
          </router-link>
          <a class="menu">
            <div class="m-menu">
              <a class="m-img" @click="changeMenu"><img :src="more_src"></a>
              <ul v-show="isMenu">
                <li><router-link tag="a" class="car" :to="{path: '/cart'}">购物车</router-link></li>
                <li><router-link tag="a" class="home" :to="{path: '/'}">首页</router-link></li>
              </ul>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="pad-change">
      <ul class="order-type">
        <li class="o-active"><a>销量</a></li>
        <li><a>人气</a></li>
        <li><a>价格</a></li>
        <li class="change-model">
          <div class="manner">
            <span class="before"></span>
            <span class="big-map">{{bigMap}}</span>
            <span class="after" @click="exchangeMap"></span>
          </div>
          <ul class="manner-list" v-show="isExchange">
            <li @click="mannerChange"><span>{{smallMap}}</span></li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="wrapper" ref="wrapper">
      <div class="scroller" ref="scroller">
        <!---大图列表-->
        <div class="big-list" v-if="isBig">
          <ul class="big-box">
            <li>
              <a href="http://b2b2c.iskyshop.com/wap/goods.htm?id=2">
                <div class="goods-pic">
                  <img src="http://b2b2c.iskyshop.com/upload/store/1/662eef84-7caa-4696-9c19-e16cee578a37.jpg_middle.jpg">
                </div>
                <div class="goods-name">SHOCK AMIU 设计款拼接棉服</div>
                <div class="goods-info">
                  <span class="goods-value">¥349.00</span>
                  <span class="goods-amount">销量0笔</span>
                </div>
              </a>
            </li>
            <li>
              <a href="http://b2b2c.iskyshop.com/wap/goods.htm?id=4">
                <div class="goods-pic">
                  <img src="http://b2b2c.iskyshop.com/upload/store/1/2ac32f79-edd9-47a4-ab0e-918484aa0e7a.jpg_middle.jpg">
                </div>
                <div class="goods-name">SHOCK AMIU吃了膨化剂的双层内胆面包服棉服</div>
                <div class="goods-info">
                  <span class="goods-value">¥248.00</span>
                  <span class="goods-amount">销量0笔</span>
                </div>
              </a>
            </li>
            <li>
              <a href="http://b2b2c.iskyshop.com/wap/goods.htm?id=2">
                <div class="goods-pic">
                  <img src="http://b2b2c.iskyshop.com/upload/store/1/662eef84-7caa-4696-9c19-e16cee578a37.jpg_middle.jpg">
                </div>
                <div class="goods-name">SHOCK AMIU 设计款拼接棉服</div>
                <div class="goods-info">
                  <span class="goods-value">¥349.00</span>
                  <span class="goods-amount">销量0笔</span>
                </div>
              </a>
            </li>
            <li>
              <a href="http://b2b2c.iskyshop.com/wap/goods.htm?id=4">
                <div class="goods-pic">
                  <img src="http://b2b2c.iskyshop.com/upload/store/1/2ac32f79-edd9-47a4-ab0e-918484aa0e7a.jpg_middle.jpg">
                </div>
                <div class="goods-name">SHOCK AMIU吃了膨化剂的双层内胆面包服棉服</div>
                <div class="goods-info">
                  <span class="goods-value">¥248.00</span>
                  <span class="goods-amount">销量0笔</span>
                </div>
              </a>
            </li>
          </ul>
        </div>

        <!--小图列表-->
        <div class="small-list" v-else>
          <ul class="small-box">
            <li>
              <a href="http://b2b2c.iskyshop.com/wap/goods.htm?id=2">
                <div class="goods-pic">
                  <img src="http://b2b2c.iskyshop.com/upload/store/1/662eef84-7caa-4696-9c19-e16cee578a37.jpg_middle.jpg">
                </div>
                <div class="goods-info">
                  <div class="goods-name">SHOCK AMIU 设计款拼接棉服</div>
                  <div class="goods-amount">销量0笔</div>
                </div>
                <div class="goods-value"><span class="value">¥349.00</span></div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'storeGoods',
  data () {
    return {
      isMenu: false,
      isExchange: false,
      isBig: true,
      more_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/shop_more.png',
      menu_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/menu.png',
      shop_store_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/shop_icon.png',
      bigMap: '大图',
      smallMap: '小图'
    }
  },
  methods: {
    changeMenu () {
      this.isMenu = !this.isMenu
    },
    mannerChange () {
      let tmp = this.smallMap
      this.smallMap = this.bigMap
      this.bigMap = tmp
      this.isBig = !this.isBig
    },
    exchangeMap () {
      this.isExchange = !this.isExchange
    }
  }

}
</script>

<style scoped>
  .sg-main {
    background-color: #f5f5f5;
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .sg-header {
    position: absolute;
    height: 1.2rem;
    width: 100%;
    background-color: #333;
    color: #fff;
    z-index: 3;
  }

  .sg-header > ul {
    display: flex;
    width: 100%;
    height: inherit;
    flex-flow: row wrap;
  }

  .sg-header > ul > li {
    display: flex;
    height: inherit;
  }

  .sg-header > ul > li:first-child {
    width: 12%;
  }

  .sg-header > ul > li:nth-child(2) {
    width: 68%;
    align-items: center;
    justify-content: center;
  }

  .sg-header > ul > li:last-child {
    width: 20%;
    flex-flow: row wrap;
  }

  .sg-header > ul > li:last-child > a {
    color: #fff;
    display: flex;
    width: 50%;
    flex-flow: row wrap;
  }

  .fl {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .keyword {
    width: 90%;
    height: 70%;
    border: solid 1px #dddddd;
    text-indent: .3rem;
  }

  .classify p {
    width: 100%;
    height: 50%;
    display: inline-block;
    font-size: .4rem;
    text-align: center;
  }

  .classify p img {
    width: 70%;
  }

  .m-menu {
    width: 100%;
    height: 100%;
  }

  .m-img {
    width: inherit;
    height: inherit;
    text-align: center;
    line-height: 2.7;
    position: relative;
    display: inline-block;
  }

  .m-menu > ul {
    width: 2.8rem;
    display: flex;
    flex-flow: row wrap;
    position: absolute;
    top: 1.38rem;
    right: 0;
    background-color: rgba(0, 0, 0, .45);
    z-index: 4;
    border-bottom-left-radius: .15rem;
    border-top-left-radius: .15rem;
  }

  .m-menu > ul::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #000;
    line-height: 0;
    top: -9%;
    left: 72%;
    opacity: .45;
  }

  .m-menu > ul > li {
    display: flex;
    width: 100%;
    height: .85rem;
    line-height: .85rem;
    border-bottom: 1px solid #999;
  }

  .m-menu > ul > li:last-child {
    border-bottom: none;
  }

  .m-menu > ul > li > a {
    display: inline-block;
    width: inherit;
    height: inherit;
    line-height: inherit;
    font-size: .4rem;
    color: #fff;
    padding-left: 50%;
    text-align: left;
  }

  .car {
    background: url(../../../static/images/shop_icon_car.png) no-repeat .56rem center;
    background-size: .62rem;
  }

  .home {
    background: url(../../../static/images/shop_icon_home.png) no-repeat .56rem center;
    background-size: .62rem;
  }

  .pad-change {
    position: absolute;
    top: 1.2rem;
    z-index: 2;
    width: 100%;
    height: 1rem;
    background-color: #fff;
  }

  .order-type {
    width: inherit;
    height: inherit;
    display: flex;
  }
  .order-type > li {
    display: flex;
    flex: 1;
    flex-flow: row wrap;
    width: inherit;
    height: inherit;
  }

  .change-model {
    position: relative;
  }

  .order-type > li > a {
    width: inherit;
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .4rem;
  }

  .manner {
    display: flex;
    width: inherit;
    height: inherit;
    justify-content: center;
    align-items: center;
    font-size: .4rem;
  }

  .before {
    display: inline-block;
    width: .45rem;
    height: .45rem;
    background: url(../../../static/images/g_changepic.png) no-repeat;
    margin-right: .1rem;
    margin-top: .1rem;
    background-size: .45rem;
    vertical-align: middle;
  }

  .big-map {
    font-size: .4rem;
    vertical-align: top;
    display: inline-block;
  }

  .after {
    display: inline-block;
    width: .36rem;
    height: .36rem;
    background: url(../../../static/images/g_arow3.png) no-repeat;
    margin-left: .1rem;
    background-size: .36rem;
  }

  .manner-list {
    display: inherit;
    flex-flow: row wrap;
    width: inherit;
    border-bottom: solid 1px #f5f5f5;
    position: absolute;
    background-color: #fff;
    top: 1rem;
    right: 0;
  }

  .manner-list > li {
    display: flex;
    width: inherit;
    height: .8rem;
    justify-content: center;
    align-items: center;
    font-size: .4rem;
  }

  .wrapper {
    position: absolute;
    z-index: 1;
    /*top: 2.5rem;*/
    top: 2.2rem;
    left: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
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

  /**大图列表***/
  .big-box {
    width: 98%;
    margin: 0 auto;
    display: flex;
    flex-flow: row wrap;
  }

  .big-box > li {
    display: inherit;
    flex-flow: row wrap;
    width: 49.5%;
    background-color: #fff;
    margin-top: 2%;
  }

  .big-box > li:nth-child(odd) {
    margin-right: .5%;
  }

  .big-box > li:nth-child(even) {
    margin-left: .5%;
  }

  .big-box > li > a {
    width: 100%;
  }

  .big-box .goods-pic {
    width: inherit;
  }

  .big-box .goods-pic img {
    width: inherit;
  }

  .big-box .goods-name {
    font-size: .3rem;
    color: #333;
    line-height: .5rem;
    height: .5rem;
    overflow: hidden;
    margin: auto 3%;
  }

  .big-box .goods-info {
    margin: 2% 3%;
    display: flex;
    justify-content: space-between;
  }

  .big-box .goods-value {
    color: #ff3936;
    font-size: .4rem;
  }

  .big-box .goods-amount {
    color: #909090;
    font-size: .3rem;
  }

  /***小图列表****/
  .small-box {
    width: 98%;
    margin-left: 0;
  }

  .small-box > li {
    width: 100%;
    margin-top: 2%;
    background-color: #fff;
  }

  .small-box > li > a {
    display: inline-block;
    width: 100%;
  }

  .small-box .goods-pic {
    display: inline-block;
    float: left;
    width: 32.8%;
  }

  .small-box .goods-pic img {
    width: inherit;
  }
</style>
