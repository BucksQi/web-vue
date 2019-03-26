<template>
  <div class="m-main">
    <common-header :title="title" :back_src="back_src" :home_src="home_src"></common-header>
    <div class="m-login">
      <!--已经登录-->
      <div class="login-info" v-show="isLogin">
        <p class="m-point">当前积分</p>
        <div class="go-login">
          <em class="btn-login">1000</em>
        </div>
      </div>

      <!--没有登录-->
      <div class="login-info" v-show="!isLogin">
        <p class="m-point">登录后显示积分</p>
        <div class="go-login">
          <router-link class="btn-login" tag="a" :to="{name: 'toLogin'}">立即登录</router-link>
        </div>
      </div>
    </div>

    <div class="m_tab">
      <ul>
        <li v-for="(item, index) in pointsList" :key="index" @click="selectPoint(index)" :class="index === pointIndex ? 'active' : ''">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="p_list">
      <ul>
        <li v-for="(item, index) in pointsSelectList" :key="index">
          <div class="m-left">
            <router-link tag="a" :to="{path: '/integral/view', query: {id: item.id}}">
              <img :src="item.src">
            </router-link>
          </div>
          <div class="m-right">
            <div class="r-content">
              <ul class="r-list">
                <li class="r-name">
                  <router-link tag="a" :to="{path: '/integral/view', query: {id: item.id}}">多功能鱼缸</router-link>
                </li>
                <li class="r-info">
                  <span>{{item.grade}}</span>
                  <span><img :src="item.user_level_src"></span>
                </li>
                <li class="r-point">
                  <span><img :src="item.inter_icon"></span>
                  <span>{{item.points}}积分</span>
                  <router-link tag="a" :to="{path: '/integral/view', query:{id: item.id}}" class="r-exchange">马上兑换</router-link>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="loading">
      <ul>
        <li>没有更多了....</li>
      </ul>
    </div>
  </div>
</template>

<script>
import CommonHeader from '@/components/common/CommonHeader'

export default {
  name: 'integral',
  components: {CommonHeader},
  created () {
    // this.isLogin = !!this.$cookies.get('token')

  },
  data () {
    return {
      title: '积分商城',
      back_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/back.png',
      home_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/home.png',
      isLogin: !!this.$cookies.get('token'),
      pointIndex: 0,
      pointsAllList: [],
      pointsList: [
        '全部', '1999分以下', '2000分~3999分', '4000分~5999分', '6000分~9999分', '10000分'
      ],
      pointsSelectList: [
        {
          id: 13,
          src: 'http://b2b2c.iskyshop.com/upload/integral_goods/9ea2b9f9-7ba4-4120-afbe-b7afed55270c.png',
          grade: '钻石会员',
          user_level_src: 'http://b2b2c.iskyshop.com/resources/style/common/images/userlevel_3.png',
          points: 500,
          inter_icon: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/inte_icon.png'
        },
        {
          id: 71,
          src: 'http://b2b2c.iskyshop.com/upload/integral_goods/9ea2b9f9-7ba4-4120-afbe-b7afed55270c.png',
          grade: '钻石会员',
          user_level_src: 'http://b2b2c.iskyshop.com/resources/style/common/images/userlevel_3.png',
          points: 500,
          inter_icon: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/inte_icon.png'
        },
        {
          id: 61,
          src: 'http://b2b2c.iskyshop.com/upload/integral_goods/9ea2b9f9-7ba4-4120-afbe-b7afed55270c.png',
          grade: '钻石会员',
          user_level_src: 'http://b2b2c.iskyshop.com/resources/style/common/images/userlevel_3.png',
          points: 500,
          inter_icon: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/inte_icon.png'
        },
        {
          id: 24,
          src: 'http://b2b2c.iskyshop.com/upload/integral_goods/9ea2b9f9-7ba4-4120-afbe-b7afed55270c.png',
          grade: '钻石会员',
          user_level_src: 'http://b2b2c.iskyshop.com/resources/style/common/images/userlevel_3.png',
          points: 500,
          inter_icon: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/inte_icon.png'
        },
        {
          id: 8,
          src: 'http://b2b2c.iskyshop.com/upload/integral_goods/9ea2b9f9-7ba4-4120-afbe-b7afed55270c.png',
          grade: '钻石会员',
          user_level_src: 'http://b2b2c.iskyshop.com/resources/style/common/images/userlevel_3.png',
          points: 500,
          inter_icon: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/inte_icon.png'
        },
        {
          id: 41,
          src: 'http://b2b2c.iskyshop.com/upload/integral_goods/9ea2b9f9-7ba4-4120-afbe-b7afed55270c.png',
          grade: '钻石会员',
          user_level_src: 'http://b2b2c.iskyshop.com/resources/style/common/images/userlevel_3.png',
          points: 500,
          inter_icon: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/inte_icon.png'
        },
        {
          id: 31,
          src: 'http://b2b2c.iskyshop.com/upload/integral_goods/9ea2b9f9-7ba4-4120-afbe-b7afed55270c.png',
          grade: '钻石会员',
          user_level_src: 'http://b2b2c.iskyshop.com/resources/style/common/images/userlevel_3.png',
          points: 500,
          inter_icon: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/inte_icon.png'
        },
        {
          id: 10,
          src: 'http://b2b2c.iskyshop.com/upload/integral_goods/9ea2b9f9-7ba4-4120-afbe-b7afed55270c.png',
          grade: '钻石会员',
          user_level_src: 'http://b2b2c.iskyshop.com/resources/style/common/images/userlevel_3.png',
          points: 500,
          inter_icon: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/inte_icon.png'
        },
        {
          id: 21,
          src: 'http://b2b2c.iskyshop.com/upload/integral_goods/9ea2b9f9-7ba4-4120-afbe-b7afed55270c.png',
          grade: '钻石会员',
          user_level_src: 'http://b2b2c.iskyshop.com/resources/style/common/images/userlevel_3.png',
          points: 500,
          inter_icon: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/inte_icon.png'
        },
        {
          id: 11,
          src: 'http://b2b2c.iskyshop.com/upload/integral_goods/9ea2b9f9-7ba4-4120-afbe-b7afed55270c.png',
          grade: '钻石会员',
          user_level_src: 'http://b2b2c.iskyshop.com/resources/style/common/images/userlevel_3.png',
          points: 500,
          inter_icon: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/inte_icon.png'
        }
      ]
    }
  },
  mounted () {
    // 初始化
    let initData = {
      id: 21,
      src: 'http://b2b2c.iskyshop.com/upload/integral_goods/9ea2b9f9-7ba4-4120-afbe-b7afed55270c.png',
      grade: '钻石会员',
      user_level_src: 'http://b2b2c.iskyshop.com/resources/style/common/images/userlevel_3.png',
      points: 500,
      inter_icon: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/inte_icon.png'
    }
    this.pointsList.forEach((item, index) => {
      this.pointsAllList[index] = {
        index: index,
        // 填充数据
        pointsSelectList: Array(40 + index).fill(initData)
      }
    })
  },
  methods: {
    selectPoint (index) {
      this.pointIndex = index
      this.pointsSelectList = this.pointsAllList[index].pointsSelectList
    }
  }
}
</script>

<style scoped>
  .m-main {
    position: absolute;
    top: 1rem;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    overflow: auto;
  }

  .m-login {
    margin-bottom: 2%;
    height: 2.5rem;
    background-color: #fff;
    border-radius: .1rem;
    position: relative;
    width: 100%;
  }

  .login-info {
    width: 100%;
    height: 2rem;
    position: absolute;
    margin-top: .2rem;
  }

  .m-point {
    height: .6rem;
    line-height: .6rem;
    font-size: .4rem;
    text-align: center;
    color: #666;
  }

  .go-login {
    width: 100%;
    height: 1rem;
    margin-top: .4rem;
    line-height: 1rem;
    text-align: center;
  }

  .btn-login {
    color: #fff;
    background-color: #fe3837;
    display: inline-block;
    width: 50%;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    border-radius: .1rem;
  }

  .m_tab {
    background-color: #fff;
  }

  .m_tab > ul {
    display: flex;
    height: inherit;
    flex-flow: row wrap;
  }

  .m_tab > ul > li {
    height: .8rem;
    display: flex;
    width: 33.3%;
    font-size: .4rem;
    justify-content: center;
    align-items: center;
    color: #666;
    border-bottom: 1px solid #ddd;
  }
  .m_tab > ul > li.active {
    border-bottom: 1px solid red;
  }

  .p_list {
    overflow: auto;
  }

  .p_list > ul {
    display: flex;
    flex-flow: row wrap;
  }

  .p_list > ul > li {
    display: flex;
    flex-flow: row wrap;
    height: 2.8rem;
    width: 98%;
    border-bottom: 1px solid #ddd;
    margin: 0 2%;
  }

  .p_list > ul > li > div {
    margin: .15rem 0;
  }

  .m-left {
    display: flex;
    width: 25%;
  }

  .m-left > a {
    display: inline-block;
  }

  .m-left > a > img {
    width: 100%;
  }

  .m-right {
    display: flex;
    width: 75%;
  }

  .m-right > .r-content {
    width: 98%;
    display: flex;
    margin-left: 2%;
  }

  .r-list {
    display: flex;
    width: 100%;
    flex-flow: row wrap;
  }

  .r-list > li {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: .83rem;
    line-height: .83rem;
    text-align: left;
    width: 100%;
  }

  .r-name > a {
    color: #333;
    font-size: .45rem;
  }

  .r-info > span {
    float: left;
    margin-right: .2rem;
    font-size: 0.4rem;
  }

  .r-info > span:last-child > img {
    height: .694rem;
  }

  .r-point > span {
    height: .81rem;
    float: left;
    font-size: .35rem;
    margin-right: .1rem;
  }

  .r-point > span > img {
    height: inherit;
  }

  .r-exchange {
    display: inline-block;
    float: right;
    background-color: #e22c37;
    color: #fff;
    font-size: .4rem;
    border-radius: 2px;
    box-shadow: 0 .05rem 0 #af1b24;
    padding: 0 .35rem;
    height: .8rem;
    line-height: .8rem;
    text-align: center;
  }

  .loading {
    margin-top: .4rem;
  }
  .loading ul li {
    height: 1rem;
    line-height: 1rem;
    color: #999;
    text-align: center;
  }
</style>
