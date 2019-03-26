<template>
  <div class="brand" @scroll="brandMainScroll($event)">
    <!---头部-->
    <header class="b_header">
      <div class="phone_hd">
        <a class="back" href="#/">
          <img :src="back_src">
        </a>
        品牌街
        <a class="home" href="#/">
          <img :src="home_src">
        </a>
      </div>
    </header>
    <!--内容-->
    <section>
      <div class="b_main" :style="brandObj">
        <!--品牌展示--->
        <div class="b_list">
          <div class="b_show" v-for=" (item, index) in brandList" :key="index">
            <div class="b_top">{{item.char}}</div>
            <ul class="b_char" :id="item.char">
              <li v-for="(itm, idx) in item.list" :key="idx">
                <div class="b_img">
                  <router-link tag="a" :to="{name: 'brandGoods', query: {id: itm.id}}">
                    <img :src="itm.src">
                  </router-link>
                </div>
                <div class="b_name">
                  <span>{{itm.name}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!---右侧字母--->
      <div class="brand_nav_fixed">
        <a v-for="(item, index) in brandChar" :key="index" :class="index===brandIndex ? 'active' : ''"
           @click="goBrand(index)">
          {{item}}
        </a>
      </div>
    </section>
    <!---底部--->
    <section>
      <footer-list :index="index"></footer-list>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import FooterList from '@/components/common/FooterList'

export default {
  name: 'brand',
  components: {FooterList},
  created () {
    for (let len = 65, i = 0; len <= 90; len++, i++) {
      let char = String.fromCharCode(len)
      this.brandChar.push(char)
      this.brandList[i] = {
        char: char,
        list: [
          {
            id: 1,
            name: 'Apple',
            src: 'http://b2b2c.iskyshop.com/upload/brand/ea4be262-055a-4f84-aa1f-3f8bc2a91fab.jpg'
          },
          {
            id: 1,
            name: 'Apple',
            src: 'http://b2b2c.iskyshop.com/upload/brand/ea4be262-055a-4f84-aa1f-3f8bc2a91fab.jpg'
          },
          {
            id: 1,
            name: 'Apple',
            src: 'http://b2b2c.iskyshop.com/upload/brand/ea4be262-055a-4f84-aa1f-3f8bc2a91fab.jpg'
          },
          {
            id: 1,
            name: 'Apple',
            src: 'http://b2b2c.iskyshop.com/upload/brand/ea4be262-055a-4f84-aa1f-3f8bc2a91fab.jpg'
          },
          {
            id: 1,
            name: 'Apple',
            src: 'http://b2b2c.iskyshop.com/upload/brand/ea4be262-055a-4f84-aa1f-3f8bc2a91fab.jpg'
          },
          {
            id: 1,
            name: 'Apple',
            src: 'http://b2b2c.iskyshop.com/upload/brand/ea4be262-055a-4f84-aa1f-3f8bc2a91fab.jpg'
          },
          {
            id: 1,
            name: 'Apple',
            src: 'http://b2b2c.iskyshop.com/upload/brand/ea4be262-055a-4f84-aa1f-3f8bc2a91fab.jpg'
          },
          {
            id: 1,
            name: 'Apple',
            src: 'http://b2b2c.iskyshop.com/upload/brand/ea4be262-055a-4f84-aa1f-3f8bc2a91fab.jpg'
          },
          {
            id: 1,
            name: 'Apple',
            src: 'http://b2b2c.iskyshop.com/upload/brand/ea4be262-055a-4f84-aa1f-3f8bc2a91fab.jpg'
          },
          {
            id: 1,
            name: '阿迪达斯',
            src: 'http://b2b2c.iskyshop.com/upload/brand/ca527440-1920-4894-af8d-31292746c734.jpg'
          },
          {
            id: 1,
            name: '安踏',
            src: 'http://b2b2c.iskyshop.com/upload/brand/19d3d641-d9cb-44d3-8a19-240fae5241a1.jpg'
          },
          {
            id: 1,
            name: '艾美特',
            src: 'http://b2b2c.iskyshop.com/upload/brand/87c15e38-19b1-4f71-b4b1-149e78b0a8b1.jpg'
          }
        ]
      }
    }
  },
  data () {
    return {
      back_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/back.png',
      home_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/home.png',
      brandObj: {
        transform: 'translateX(0) translateY(0) translateZ(0)',
        transitionTimingFunction: 'cubic-bezier(0.1, 0.57, 0.1, 1)',
        transitionDuration: '100ms',
        transitionDelay: '10ms'
      },
      scrollTop: 0,
      index: 10,
      brandIndex: 0,
      brandChar: [],
      brandList: [],
      brandPositionList: []
    }
  },
  methods: {
    goBrand (index) {
      this.brandIndex = index
      document.querySelector('.brand').scrollTop = this.brandPositionList[index]
    },
    brandMainScroll (event) {
      let moveY = event.target.scrollTop
      this.brandPositionList.forEach((position, index) => {
        if (moveY >= position) {
          this.brandIndex = index
          return false
        }
      })
    }
  },
  mounted () {
    this.brandList.forEach((item, index) => {
      this.brandPositionList[index] = document.querySelector('#' + item.char).offsetTop
    })
  }
}
</script>
<style scoped>

  .brand {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    height: 100%;
    width: 100%;
    overflow: auto;
    transition: all 2s;
  }

  .b_header {
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    position: fixed;
    top: 0;
    left: 0;
    text-align: center;
    background-color: #F94D4D;
    font-size: 0.5rem;
    color: #fff;
    z-index: 9;
  }

  .back {
    float: left;
    width: 1rem;
    height: .8rem;
    margin-top: .1rem;
  }

  .back img {
    width: 70%;
  }

  .home {
    float: right;
    margin-right: .2rem;
    height: .8rem;
    width: 1rem;
    margin-top: .1rem;
  }

  .home > img {
    width: 70%;
  }

  .b_main {
    position: absolute;
    top: 1rem;
    overflow: auto;
    width: 100%;
    background-color: #f5f5f5;
    margin-bottom: 1.7rem;
  }

  .brand_nav_fixed {
    position: fixed;
    right: .2rem;
    width: .5rem;
    z-index: 9;
    top: 1rem;
  }

  .brand_nav_fixed > a {
    display: inline-block;
    width: inherit;
    text-align: center;
    line-height: inherit;
    font-size: .4rem;
  }

  .brand_nav_fixed > a.active {
    color: red;
    font-weight: bold;
  }

  .b_top {
    line-height: 30px;
    height: 30px;
    width: 100%;
    text-align: center;
    font-size: .5rem;
    font-weight: normal;
  }

  .b_char {
    width: 100%;
    display: block;
    overflow: hidden;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
  }

  .b_char > li {
    width: 100%;
    display: flex;
    overflow: hidden;
    border-bottom: 1px dashed #eee;
    padding: 0.2rem 0;
  }

  .b_char > li:last-of-type {
    border: none;
  }

  .b_img {
    display: flex;
    flex: 1;
    height: inherit;
  }

  .b_name {
    display: flex;
    flex: 1;
    height: inherit;
    justify-content: end;
    align-items: center;
    font-size: .4rem;
    color: #666;
  }
</style>
