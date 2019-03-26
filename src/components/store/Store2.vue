<template>
  <div class="m-store">
    <div class="m-top">
      <div class="hd-store">
        <div class="hd-right">
          <a class="hd-menu">
            <img src="http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/shop_more.png">
          </a>
        </div>
        <div class="hd-left">
          <ul>
            <li>
              <a class="store-logo">
                <img src="http://b2b2c.iskyshop.com/upload/store_logo/152df201-cfc8-47ba-94a3-4efb781b64a5.png">
              </a>
            </li>
            <li>
              <dl class="hd-nt">
                <dt class="store-name">
                  <span>SHOCK AMIU佳佳小店</span>
                </dt>
                <dt class="store-type">
                  <span>旗舰店</span>
                </dt>
              </dl>
            </li>
            <li>
              <div class="fan-sc">
                <a class="sc">
                  <i><img src="http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/s_collect.png"></i>
                  <span>收藏</span>
                </a>
                <a class="fan">
                  <span>1</span>
                  <span>粉丝</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="store-nav">
        <ul>
          <li :class="index === isActiveIndex ? 'active' : ''" v-for="(item, index) in navList" :key="index">
            <router-link tag="a" :to="{path: item.path, query: {id: item.id}}">
              <p><img :src="item.src"></p>
              <p class="name">{{item.name}}</p>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="store-search">在店铺内搜索</div>
    </div>

    <!--内容-->
    <div class="wrapper" ref="wrapper">
      <div class="scroller">
        <ul class="sc-ul">
          <li v-for="(item, index) in categoryList" :key="index">
            <h2 class="cm-title">{{item.title}}</h2>
            <div class="cm-show">
              <ul class="cm-list">
                <li v-for="(cate, idx) in item.categorys" :key="idx">
                  <router-link tag="a" :to="{path: cate.path, query: {id: cate.id}}">
                    <img :src="cate.src">
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div class="store-all-goods">
              <router-link tag="a" :to="{path: ''}">显示全部商品</router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!--底部-->
    <div class="m-footer">
      <ul>
        <li>
          <a class="cen">首页</a>
        </li>
        <li>
          <a class="cen">宝贝分类</a>
        </li>
        <li>
          <a class="cen">全部宝贝</a>
        </li>
        <li>
          <a class="s-fu">
            <p><img src="http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/store_service.png"></p>
            <p>客服</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'store2',
  created () {
    this.$nextTick(() => {
      this.initScroll()
    })
  },
  data () {
    return {
      isActiveIndex: 0,
      navList: [
        {
          id: 1,
          src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/storenav_01_this.png',
          name: '首页',
          path: ''
        },
        {
          id: 1,
          src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/storenav_02.png',
          name: '全部商品',
          path: ''
        },
        {
          id: 1,
          src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/storenav_03.png',
          name: '上新',
          path: ''
        },
        {
          id: 1,
          src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/storenav_04.png',
          name: '店铺活动',
          path: ''
        }
      ],
      categoryList: [
        {
          title: '服装',
          categorys: [
            {
              id: 1,
              src: 'http://b2b2c.iskyshop.com/upload/store/1/2018/11/19/feb38225-706d-487e-b04c-b7262b2406fa.jpg',
              path: ''
            },
            {
              id: 2,
              src: 'http://b2b2c.iskyshop.com/upload/store/1/2c6e612c-e10d-4c7b-9223-af83a7caf8e7.jpg',
              path: ''
            }
          ]
        },
        {
          title: '化妆品',
          categorys: [
            {
              id: 3,
              src: 'http://b2b2c.iskyshop.com/upload/store/1/2018/11/19/feb38225-706d-487e-b04c-b7262b2406fa.jpg',
              path: ''
            },
            {
              id: 4,
              src: 'http://b2b2c.iskyshop.com/upload/store/1/2c6e612c-e10d-4c7b-9223-af83a7caf8e7.jpg',
              path: ''
            }
          ]
        },
        {
          title: '数码',
          categorys: [
            {
              id: 6,
              src: 'http://b2b2c.iskyshop.com/upload/store/1/2018/11/19/feb38225-706d-487e-b04c-b7262b2406fa.jpg',
              path: ''
            },
            {
              id: 11,
              src: 'http://b2b2c.iskyshop.com/upload/store/1/2c6e612c-e10d-4c7b-9223-af83a7caf8e7.jpg',
              path: ''
            }
          ]
        },
        {
          title: '数码',
          categorys: [
            {
              id: 6,
              src: 'http://b2b2c.iskyshop.com/upload/store/1/2018/11/19/feb38225-706d-487e-b04c-b7262b2406fa.jpg',
              path: ''
            },
            {
              id: 11,
              src: 'http://b2b2c.iskyshop.com/upload/store/1/2c6e612c-e10d-4c7b-9223-af83a7caf8e7.jpg',
              path: ''
            }
          ]
        },
        {
          title: '数码',
          categorys: [
            {
              id: 6,
              src: 'http://b2b2c.iskyshop.com/upload/store/1/2018/11/19/feb38225-706d-487e-b04c-b7262b2406fa.jpg',
              path: ''
            },
            {
              id: 11,
              src: 'http://b2b2c.iskyshop.com/upload/store/1/2c6e612c-e10d-4c7b-9223-af83a7caf8e7.jpg',
              path: ''
            }
          ]
        }
      ]
    }
  },
  methods: {
    initScroll () {
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
    }
  }
}
</script>

<style scoped>
  .m-store {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
  }

  /***头部内容****/
  .m-top {
    width: 100%;
    height: 7.2rem;
    overflow: hidden;
    position: absolute;
    z-index: 2;
  }

  .hd-store {
    background: url(http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/store_bg.jpg) no-repeat top center;
    position: relative;
    height: 4.16rem;
    width: 100%;
  }

  .hd-right {
    position: absolute;
    top: .28rem;
    right: .28rem;
    height: .7rem;
    width: .83rem;
  }

  .hd-right > a {
    display: inline-block;
    width: inherit;
    height: inherit;
  }

  .hd-right > a > img {
    width: inherit;
    height: inherit;
  }

  .hd-left {
    position: absolute;
    width: 100%;
    bottom: 0;
  }

  .hd-left > ul {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
  }

  .hd-left > ul > li {
    display: flex;
    height: 1.38rem;
    position: relative;
  }

  .hd-left > ul > li:first-child {
    width: 37%;
  }

  .hd-left > ul > li:nth-child(2) {
    width: 33%;
  }

  .hd-left > ul > li:last-child {
    width: 30%;
    justify-content: center;
    align-items: center;
  }

  .store-logo {
    width: 3.61rem;
    height: inherit;
    display: inline-block;
  }

  .store-logo > img {
    width: inherit;
    height: inherit;
  }

  .hd-nt {
    width: 100%;
  }

  .hd-nt > dt {
    width: 100%;
  }

  .store-name {
    white-space: nowrap;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .store-name > span {
    font-size: 0.4rem;
    width: inherit;
    display: inline-block;
  }

  .store-type > span {
    background-color: #F94D4D;
    color: #fff;
    font-size: 0.35rem;
    border-radius: 2px;
    padding: .1rem .28rem;
  }

  .fan-sc {
    width: 100%;
    height: 80%;
    clear: both;
  }

  .fan-sc > a {
    display: inline-block;
    height: 100%;
    line-height: 3;
    text-align: center;
    width: 50%;
    color: #fff;
    font-size: .35rem;
    float: left;
  }

  .sc {
    background-color: #F94D4D;
  }

  .sc > i {
    vertical-align: top;
    position: relative;
    top: .1rem;
  }

  .sc > span {
    vertical-align: top;
  }

  .fan {
    background-color: #e30000;
  }

  .store-nav {
    width: 100%;
    position: relative;
    height: 1.94rem;
    background-color: #fff;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    font-size: .4rem;
  }

  .store-nav > ul {
    display: flex;
    width: 100%;
  }

  .store-nav > ul > li {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  }

  .store-nav > ul > li {
    border-bottom: 2px solid #fff;
  }

  .store-nav ul li.active {
    border-bottom-color: #F94D4D;
  }

  .store-nav > ul > li > a {
    width: 100%;
    height: 80%;
    margin: 10% auto;
    text-align: center;
  }

  .store-nav ul li a p img {
    width: .7rem;
  }

  .store-nav li.active .name {
    color: #F94D4D;
  }

  .store-search {
    margin-top: .2rem;
    background: url(../../../static/images/store_search.png) no-repeat 30% center #fff;
    position: relative;
    width: 100%;
    height: .8rem;
    line-height: .8rem;
    text-align: center;
    border-radius: .1rem;
    font-size: .45rem;
  }

  /***滚动内容***/
  .wrapper {
    position: absolute;
    z-index: 1;
    top: 7.4rem;
    bottom: 1.2rem;
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

  .sc-ul {
    background-color: #fff;
    border-top: 1px solid #ddd;
  }

  .sc-ul > li {
    border-bottom: 1px solid #ddd;
  }

  .sc-ul > li:last-child {
    border: none;
  }

  .cm-title {
    width: 96%;
    height: .8rem;
    line-height: .8rem;
    font-size: .45rem;
    color: #000;
    margin: 0 auto;
    font-weight: 400;
  }

  .cm-list {
    width: 96%;
    margin: 0 auto;
    display: flex;
    flex-flow: row wrap;
  }

  .cm-list > li {
    display: flex;
    width: 50%;
    justify-content: center;
    align-items: center;
  }
  .cm-list > li > a {
    display: inline-block;
    width: 92%;
    margin: 0 auto;
  }

  .cm-list > li > a > img {
    width: 100%;
  }

  .store-all-goods {
    width: 100%;
    height: .6rem;
    line-height: .6rem;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    text-align: center;
    font-size: .4rem;
  }

  .m-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1.2rem;
    z-index: 2;
    background-color: #fff;
    border-top: 1px solid #ddd;
  }

  .m-footer ul {
    display: flex;
    width: inherit;
    height: inherit;
  }

  .m-footer ul li {
    display: flex;
    flex: 1;
    font-size: .35rem;
    height: inherit;
  }

  .m-footer ul li a {
    width: 100%;
    display: flex;
    height: inherit;
  }

  .cen {
    justify-content: center;
    align-items: center;
    border-right: 1px solid #ddd;
  }

  .s-fu {
    flex-flow: row wrap;
  }

  .s-fu p {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .s-fu p img {
    margin-top: .1rem;
    width: .5rem;
  }
</style>
