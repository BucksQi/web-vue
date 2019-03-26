<template>
  <div class="m-main">
    <div class="m-select" v-show="isSelect">
      <!--头部--->
      <div id="header" ref="scrollTop">
        <div class="m-top">
          <a @click="goBack">
            <img :src="go_back_src">
          </a>
          <a>
            <input type="text" v-model="keyword" class="search" @focus="selectItem">
          </a>
          <a @click="showFooter">
            <img :src="footer_src">
          </a>
        </div>
      </div>
      <div id="wrapper" ref="wrapper">
          <div id="scroller" ref="scroller">
            <div class="group_top" ref="groupTop">
              <div v-for="(item, index) in groupList" :key="index">
                <a @click="selectGroup(index)" :class="index === groupIndex ? 'active' : ''">{{item.name}}</a>
              </div>
            </div>
           <ul class="group_list">
             <li class="group_item" v-for="(item, index) in itemList" ref="tabitem" :key="index">
               <div class="g_item">
                 <ul>
                   <li>
                     <router-link tag="a" :to="{path: '/goods', query: {id: item.id}}" class="goods_img">
                      <img class="goods_pic" :src="item.goods_pic">
                     </router-link>
                   </li>
                   <li>
                     <a class="goods_info">
                       <span class="goods_name">{{item.name}}<i>{{item.unit}}</i></span>
                     </a>
                   </li>
                   <li>
                     <router-link tag="a" :to="{path: '/goods', query: {id: item.id}}" class="goods_price">
                       <span class="price">¥{{item.price}}</span>
                       <span class="discount">{{item.discount}}</span>
                       <span class="sales">销量{{item.sales}}笔</span>
                     </router-link>
                   </li>
                 </ul>
               </div>
             </li>
           </ul>
          </div>
      </div>
      <!---底部内容-->
      <footer-list :index="index" v-show="isFooter" ref="groupFooter"></footer-list>
    </div>

    <!---搜索----->
    <div class="m-search" v-show="!isSelect">
      <div id="es-header">
        <div class="m-top">
          <a @click="goBack">
            <img :src="go_back_src">
          </a>
          <a>
            <input type="text" v-model="keyword" class="search" @focus="selectItem">
          </a>
          <a @click="showFooter">
            <img :src="search_src">
          </a>
        </div>
      </div>
      <div class="m-history">
       <ul class="history">
          <i class="r_icon"></i>
          <span class="h_title">最近搜索</span>
          <i class="i_del" @click="deleteHistory"></i>
        </ul>
        <ul class="head_history">
          <li v-for="(item, index) in headHistoryList" :key="index">
            <a @click="search(item)">{{item.name}}</a>
          </li>
        </ul>
        <ul class="hot_list">
          <h4><i class="h_icon"></i>热门搜索</h4>
          <div class="hot_d">
            <ul class="hot_ul">
              <li v-for="(item, index) in hotHistoryList" :key="index">
                <a @click="search(item)">{{item.name}}</a>
              </li>
            </ul>
          </div>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
import FooterList from '@/components/common/FooterList'
import BScroll from 'better-scroll'
export default {
  name: 'search',
  components: {FooterList},
  created () {
    // console.log('keyword', this.$router.currentRoute.params.keyword)
    // 初始化
    let init = {
      id: 17,
      goods_pic: 'http://b2b2c.iskyshop.com/upload/store/2/a805b7bb-33e6-4b1a-a474-15a31adf9e00.jpg_middle.jpg',
      name: '小熊(Bear) 酸奶 家用全自动 不锈钢内胆陶瓷分杯SNJ-5341',
      unit: '机',
      price: 3999.00,
      discount: '团...',
      sales: 0
    }
    this.groupList.forEach((item, index) => {
      this.groupSelectList[index] = {index: index, itemList: Array(30 + index * 2).fill(init)}
    })
  },
  data () {
    return {
      index: 2,
      keyword: this.$router.currentRoute.params.keyword ? this.$router.currentRoute.params.keyword : '',
      isFooter: false,
      isSelect: true,
      go_back_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/g_arow1.png',
      footer_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/c_shortcut.png',
      search_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/bottom_search_1.png',
      itemList: [],
      groupIndex: -1,
      groupList: [
        {name: '销量'},
        {name: '人气'},
        {name: '价格'}
      ],
      groupSelectList: [

      ],
      headHistoryList: [
        {
          id: 1,
          name: '手机'
        },
        {
          id: 2,
          name: '电脑'
        },
        {
          id: 3,
          name: '电视'
        },
        {
          id: 4,
          name: '衣服'
        },
        {
          id: 5,
          name: '首饰'
        }
      ],
      hotHistoryList: [
        {
          id: 6,
          name: '女装'
        },
        {
          id: 7,
          name: '羽绒服'
        },
        {
          id: 8,
          name: '白酒'
        },
        {
          id: 9,
          name: '红酒'
        },
        {
          id: 10,
          name: '冰箱'
        },
        {
          id: 11,
          name: '数码'
        },
        {
          id: 12,
          name: '家电'
        },
        {
          id: 13,
          name: '笔记本电脑'
        },
        {
          id: 14,
          name: '平板电脑'
        },
        {
          id: 15,
          name: '4K电视'
        },
        {
          id: 16,
          name: 'OLED电视'
        },
        {
          id: 17,
          name: '化妆品'
        }
      ]
    }
  },
  mounted () {
    this.itemList = this.groupSelectList[0].itemList
    this.$nextTick(() => {
      this.initScroll()
    })
  },
  computed: {

  },
  methods: {
    initScroll () {
      let height = (this.$refs.groupTop.getBoundingClientRect().height + this.$refs.scrollTop.getBoundingClientRect().height) * 2
      for (let i = 0; i < this.itemList.length / 2; i++) {
        // getBoundingClientRect() 返回元素的大小及其相对于视口的位置
        height += this.$refs.tabitem[i].getBoundingClientRect().height
      }
      let $el = this.$refs.groupFooter.$el
      height = (height + parseFloat(window.getComputedStyle($el).height.replace('px', '')) * 2)
      this.$refs.scroller.style.height = parseInt(height + '', 10) + 'px'
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            startY: 0,
            click: true,
            scrollX: false,
            scrollY: true,
            eventPassthrough: 'horizontal'
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    goBack () {
      this.$router.go(-1)
    },
    showFooter () {
      this.isFooter = !this.isFooter
    },
    selectGroup (index) {
      this.groupIndex = index
      this.itemList = this.groupSelectList[index].itemList
    },
    selectItem () {
      this.isSelect = false
    },
    search (item) {
      this.isSelect = true
      this.keyword = item.name
      this.groupIndex = -1
      // 在这里获取搜索的数据
      this.scroll.scrollTo(0, 0, 200, {easing: 'bounce'})
    },
    deleteHistory () {
      this.headHistoryList = []
    }
  }
}
</script>

<style scoped>
  .m-main {
    touch-action: none;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
  }

  .m-select {
    height: 100%;
    width: 100%;
  }

  #header, #es-header {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    background: #f5f5f5;
    padding: 0;
    color: #eee;
    font-size: .45rem;
    text-align: center;
    font-weight: bold;
  }

  .m-top {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    height: inherit;
  }

  .m-top > a {
    display: flex;
    width: 12%;
    justify-content: center;
    align-items: center;
  }

  .m-top > a:first-child > img {
    width: 50%;
  }

  .m-top > a > img {
    width: 80%;
  }

  .m-top > a:nth-child(2) {
    width: 76%;
  }

  .search {
    width: 100%;
    height: 76%;
    border: solid 1px #dddddd;
    border-radius: 3px;
    text-indent: 1em;
    outline: none;
  }

  #wrapper {
    position: absolute;
    z-index: 1;
    top: 1rem;
    left: 0;
    /*bottom: 1.6rem;*/
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  #scroller {
    position: absolute;
    z-index: 1;
    width: 100%;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    transform: translateZ(0);
    -webkit-touch-callout: none;
    user-select: none;
    text-size-adjust: none;
    touch-action: none;
  }

  .group_top {
    height: 1rem;
    width: 100%;
    display: flex;
    background-color: #fff;
  }

  .group_top > div {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    font-size: .45rem;
  }

  .group_top > div > a {
    display: inline-block;
    width: 90%;
    text-align: center;
    color: #666;
  }

  .group_top > div > a.active {
    color: red;
  }

  .group_list {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    margin-top: .2rem;
  }

  .group_item {
    display: flex;
    width: 50%;
    margin-bottom: 1%;
  }

  .g_item {
    margin-left: 1%;
    margin-right: 1%;
    width: 98%;
    background: #fff;
  }

  .g_item a {
    display: inline-block;
  }

  .goods_img {
    height: 4.083rem;
    width: 100%;
  }

  .goods_img > img {
    height: inherit;
    width: 100%;
  }

  .goods_info {
    width: 100%;
    font-size: 0.35rem;
    color: #333;
    height: .5rem;
    line-height: .5rem;
    overflow: hidden;
  }

  .goods_name > i {
    color: red;
  }

  .goods_price {
    width: 100%;
    height: .5rem;
    line-height: .5rem;
  }

  .price {
    float: left;
    color: red;
    display: inline-block;
  }
  .discount {
    display: inline-block;
    width: .32rem;
    height: .34rem;
    text-align: center;
    line-height: .34rem;
    font-size: .3rem;
    border: 1px solid #ff3300;
    color: #fff;
    background: #ff3300;
    border-radius: 2px;
    float: left;
    margin-left: .2rem;
  }
  .sales {
    display: inline-block;
    float: right;
    width: 35%;
    color: #909090;
    font-size: 0.35em;
  }

  .m-search {
    height: 100%;
    width: 100%;
    background-color: #f5f5f5;
  }

  #es-header > .m-top > a:last-child > img {
    width: 55%;
  }

  .m-history {
    width: 96%;
    display: inline-block;
    margin-top: 1.5rem;
    margin-right: 2%;
    margin-left: 2%;
  }

  .m-history > ul {
    margin-bottom: .2rem;
  }

  .history {
    height: .556rem;
    width: 100%;
    display: inline-block;
  }
   .r_icon {
    height: inherit;
    width: .556rem;
    display: inline-block;
    background-image: url(../../../static/images/search_r.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    float: left;
  }

  .h_title {
    display: inline-block;
    height: inherit;
    vertical-align: top;
    font-size: .4rem;
    margin-left: .1rem;
    color: #999;
    float: left;
  }

  .i_del {
    display: inline-block;
    float: right;
    width: .556rem;
    height: inherit;
    background: url(../../../static/images/f_clear.png) no-repeat;
    background-size: .556rem;
  }

  .head_history {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
  }

  .head_history > li {
    display: flex;
    height: .6rem;
    margin-right: .3rem;
  }

  .head_history > li > a {
    border: solid 1px #bfbfbf;
    border-radius: 2px;
    height: .5rem;
    color: #999;
    line-height: .5rem;
    font-size: .4rem;
    text-align: center;
    padding: .03rem .1rem;
  }

  .hot_list > h4 {
    font-size: .4rem;
    font-weight: normal;
    color: #999;
  }
  .h_icon {
    width: .55rem;
    height: .55rem;
    background-image: url(../../../static/images/search_h.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    display: inline-block;
    vertical-align: top;
    margin-right: .3rem;
  }

  .hot_ul {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
  }

  .hot_ul li {
    display: flex;
    border: solid 1px #bfbfbf;
    height: .55rem;
    border-radius: 2px;
    color: #999;
    font-size: .4rem;
    margin-right: .3rem;
    line-height: .55rem;
    text-align: center;
    margin-top: .3rem;
  }
  .hot_ul li a {
    display: inline-block;
    padding: 0 .18rem;
    color: #999;
  }
</style>
