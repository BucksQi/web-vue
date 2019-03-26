<template>
  <div class="a_main">
    <!---头部-->
    <header class="b_header">
      <div class="phone_hd">
        <a class="back" href="#/">
          <img :src="back_src">
        </a>
        促销活动列表
        <a class="home" href="#/">
          <img :src="home_src">
        </a>
      </div>
    </header>

    <!--活动展示--->
    <div class="m-activity">
      <!--活动的主要内容-->
      <div v-if="!isActivity" class="activity-list">

      </div>
      <div v-else class="activity-no">
        <div class="error_page">
          <div><img :src="activity_no_src"></div>
          <div class="page_title"><span>暂无活动！</span></div>
        </div>
      </div>
    </div>
    <!--底部--->
    <footer-list :index="index"></footer-list>
  </div>
</template>

<script>
import FooterList from '@/components/common/FooterList'
export default {
  name: 'activity',
  components: {FooterList},
  data () {
    return {
      index: 10,
      back_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/back.png',
      home_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/home.png',
      isActivity: true,
      activity_no_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/n_goods.png'
    }
  }
}
</script>

<style scoped>
  .a_main {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    transition: all 2s;
    background-color: #f5f5f5;
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

  .activity-no {
    margin-top: 2rem;
  }

  .error_page > div {
    height: inherit;
    line-height: inherit;
    text-align: center;
  }

  .error_page > .page_title {
    margin-top: 1rem;
  }
</style>
