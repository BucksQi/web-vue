<template>
  <div class="cate-main">
    <div class="sc-top">
      <div class="m-search">
        <ul>
          <li>
            <a class="m-back" @click="goBack"><img :src="back_src"></a>
          </li>
          <li>
            <input type="text" class="keyword" v-model="keyword">
          </li>
          <li>
            <a class="m-btn" @click="search">
              <img :src="search_src">
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="all-goods">
      <a>全部宝贝</a>
    </div>

    <!--滚动--->
    <div class="wrapper" ref="wrapper">
      <div class="scroller" ref="scroller">
        <div class="g-list" v-for="(item, index) in categoryList" :key="index">
            <div class="l-title">
              <router-link tag="a" class="fl" :to="{path: item.path, query: {id: item.id, keyword: item.name}}">{{item.name}}</router-link>
              <router-link tag="a" class="fr" :to="{path: item.path, query: {id: item.id, keyword: 'all'}}">查看全部</router-link>
            </div>
            <ul class="list-items">
              <li v-for="(it, idx) in item.categoryList" :key="idx">
                <router-link tag="a" :to="{path: it.path, query: {id: it.id, keyword: it.name}}">{{it.name}}</router-link>
              </li>
            </ul>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'storeClass',
  created () {
    this.$nextTick(() => {
      this.initScroll()
    })
  },
  mounted () {

  },
  data () {
    return {
      keyword: '',
      search_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/bottom_search_1.png',
      back_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/g_arow1.png',
      categoryList: [
        {
          id: 1,
          name: '女装',
          path: '',
          categoryList: [
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            }
          ]
        },
        {
          id: 1,
          name: '女装',
          path: '',
          categoryList: [
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            }
          ]
        },
        {
          id: 1,
          name: '女装',
          path: '',
          categoryList: [
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            }
          ]
        },
        {
          id: 1,
          name: '女装',
          path: '',
          categoryList: [
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            }
          ]
        },
        {
          id: 1,
          name: '女装',
          path: '',
          categoryList: [
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            }
          ]
        },
        {
          id: 1,
          name: '女装',
          path: '',
          categoryList: [
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            }
          ]
        },
        {
          id: 1,
          name: '女装',
          path: '',
          categoryList: [
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            },
            {
              id: 2,
              name: '内衣',
              path: ''
            }
          ]
        }
      ]
    }
  },
  methods: {
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
    search () {
      this.$router.push({path: '/storeGoods', query: {keyword: this.keyword}})
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .cate-main {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #f5f5f5;
  }

  .sc-top {
    width: 100%;
    position: absolute;
    background: #fff;
    box-shadow: 0 1px 0 #ddd;
    height: 1.4rem;
    z-index: 2;
  }

  .m-search {
    width: 100%;
    top: .2rem;
    bottom: .2rem;
    position: absolute;
  }

  .m-search ul {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row wrap;
  }

  .m-search ul li {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  .m-search ul li:first-child {
    width: 10%;
  }

  .m-search ul li:nth-child(2) {
    width: 77%;
  }

  .m-search ul li:last-child {
    width: 13%;
  }

  .m-search ul li a {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  .keyword {
    width: 100%;
    height: 90%;
    border: solid 1px #dddddd;
    border-radius: 3px;
    text-indent: .45rem;
    font-size: .4rem;
  }

  .m-btn img {
    width: 65%;
  }

  .all-goods {
    background: #fff;
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
    top: 1.6rem;
    font-size: .45rem;
    box-shadow: 0 1px 0 #ddd;
    z-index: 2;
    position: absolute;
  }

  .all-goods a {
    display: inline-block;
    height: 1rem;
    line-height: 1rem;
    width: 94%;
    margin: .1rem 3%;
    color: #444;
    background: url(../../../static/images/personal_arow.png) no-repeat right center;
    background-size: .45rem .45rem;
  }

  .wrapper {
    position: absolute;
    z-index: 1;
    top: 3rem;
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

  .g-list {
    margin-top: 2%;
    background: #fff;
    box-shadow: 0 1px 0 #ddd;
  }

  .g-list:first-child {
    margin-top: 0;
  }

  .l-title {
    margin: 0 5%;
    padding: 2% 0;
  }

  .fl {
    font-size: .45rem;
  }

  .fr {
    float: right;
    color: #c1c1c1;
    font-size: .4rem;
  }

  .list-items {
    margin: 0 2%;
    display: flex;
    flex-flow: row wrap;
  }

  .list-items li {
    width: 46%;
    padding: 1% 0;
    margin: 0 2% 2%;
    border: solid 1px #ddd;
    border-radius: 10px;
    box-sizing: border-box;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .list-items li a {
    color: #6f6f6f;
    font-size: .4rem;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
  }

</style>
