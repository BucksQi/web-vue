<template>
  <div class="footer-select">
    <ul class="footer-list" ref="groupFooter">
      <router-link tag="li" v-for="item in listData" :to="item.url" :key="item.id"
                   :class="index===item.id ? 'ellipsis active' : 'ellipsis'">
        <div :style="item.styleObj"></div>
        <div>{{item.name}}</div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'footerList2',
  props: ['index'],
  data () {
    return {
      listData: [
        {
          id: 1,
          url: '/',
          name: '首页',
          styleObj:
              {
                backgroundImage: 'url(../../static/images/bottom_index.png)'
              }
        },
        {
          id: 2,
          url: '/search',
          name: '搜索',
          styleObj:
              {
                backgroundImage: 'url(../../static/images/bottom_search_1.png)'
              }
        },
        {
          id: 3,
          url: '/cart',
          name: '购物车',
          styleObj:
              {
                backgroundImage: 'url(../../static/images/bottom_shopcar_1.png)'
              }
        },
        {
          id: 4,
          url: '/order',
          name: '订单',
          styleObj:
              {
                backgroundImage: 'url(../../static/images/bottom_order_1.png)'
              }
        },
        {
          id: 5,
          url: '/member',
          name: '我的',
          styleObj:
              {
                backgroundImage: 'url(../../static/images/bottom_me_1.png)'
              }
        }
      ]
    }
  }
}
</script>

<style scoped>
  .footer-select {
    height: 1.6rem;
  }

  .footer-list {
    display: flex;
    height: inherit;
    background-color: #060606;;
    color: #fff;
  }

  .footer-list li {
    flex: 1;
    height: inherit;
    margin-top: .15rem;
    display: flex;
    flex-flow: row wrap;
  }

  .ellipsis > div:first-child {
    width: 100%;
    height: .7rem;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: .66rem .66rem;
    display: inline-block;
  }

  .ellipsis > div:last-child {
    width: 100%;
    height: .7rem;
    text-align: center;
    color: #7b7b7b;
    display: inline-block;
    font-size: .4rem;
  }

  .active > div:last-child {
    color: #ffff;
  }
</style>
