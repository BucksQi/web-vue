<template>
  <div class="integ-main">
    <common-header :title="title" :back_src="back_src" :home_src="home_src"></common-header>
    <div class="m-view">
      <ul>
        <li class="img">
          <div class="m-img">
            <img src="http://b2b2c.iskyshop.com/upload/integral_goods/04ba697f-447e-473e-9088-aed83073df03.png">
          </div>
        </li>
        <li>
            <span class="m-left">
              商品名称：
            </span>
          <span class="m-right">
              铜师傅 全铜摆件《王府狮·尊礼版》 工艺品
            </span>
        </li>
        <li>
          <span class="m-left">市场价格</span>
          <span class="m-left m-l">¥ 4699.00</span>
        </li>
        <li>
          <span class="m-left">消耗积分</span>
          <span class="m-left m-points">
              <b>9999</b>
            </span>
        </li>
        <li>
          <span class="m-left">件数</span>
          <span class="m-left orange">1件</span>
        </li>
        <li>
          <span class="m-left">数量</span>
          <span class="m-num">
              <input type="number" v-model="num" class="num">
            </span>
        </li>
        <li>
          <span class="m-left">剩余数量：</span>
          <span class="m-left remove">5000件</span>
        </li>
        <li class="btn">
          <router-link tag="a" class="btn" :to="{path: '/toLogin'}">
            立即登录
          </router-link>
        </li>
      </ul>
    </div>

    <div class="integ_info">
      <div class="title">
        <span>礼品详情</span>
      </div>
      <div class="integ_img">
        <p>
          <img src="https://img.alicdn.com/imgextra/i4/272714237/TB2la6hhpXXXXa4XpXXXXXXXXXX_%21%21272714237.jpg">
        </p>
        <p>
          <img src="https://img.alicdn.com/imgextra/i1/272714237/TB2sVbahpXXXXcsXpXXXXXXXXXX_%21%21272714237.jpg">
        </p>
        <p>
          <img src="https://img.alicdn.com/imgextra/i2/272714237/TB2BBfthpXXXXbNXXXXXXXXXXXX_%21%21272714237.jpg">
        </p>
        <p>
          <img src="https://img.alicdn.com/imgextra/i2/272714237/TB27uzrhpXXXXb_XXXXXXXXXXXX_%21%21272714237.jpg">
        </p>
        <p>
          <img src="https://img.alicdn.com/imgextra/i1/272714237/TB27__mhpXXXXc8XXXXXXXXXXXX_%21%21272714237.jpg">
        </p>
        <p>
          <img src="https://img.alicdn.com/imgextra/i1/272714237/TB2KqK.hpXXXXcRXpXXXXXXXXXX_%21%21272714237.jpg">
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from '@/components/common/CommonHeader'

export default {
  name: 'integralView',
  components: {CommonHeader},
  data () {
    return {
      title: '积分专区',
      back_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/back.png',
      home_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/home.png',
      num: 1
    }
  }
}
</script>

<style scoped>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }

  .integ-main {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #f5f5f5;
    overflow: auto;
  }

  .m-view {
    margin-top: 1rem;
    overflow: auto;
    background-color: #fff;
  }

  .m-view > ul {
    width: 100%;
    height: 100%;
  }

  .m-view > ul > li {
    border-bottom: 1px dashed #ccc;
    width: 100%;
    display: inline-block;
  }

  .m-view > ul > .btn {
    height: 1.2rem;
    text-align: center;
    line-height: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .m-view > ul > li > span {
    margin: 2px 0;
  }

  .m-img > img {
    width: 100%;
  }

  .m-left {
    float: left;
    color: #666;
    border-right: 1px dotted #ddd;
    width: 2.5rem;
    font-size: .35rem;
    text-align: center;
    height: .9rem;
    line-height: .9rem;
  }

  .m-right {
    float: left;
    font-size: .4rem;
    height: .95rem;
    line-height: .95rem;
    margin-left: .2rem;
    text-align: left;
  }

  .m-l {
    float: left;
    color: red;
    border: none;
  }

  .m-points {
    border: none;
  }

  .m-points > b {
    background-color: red;
    color: #fff;
    border-radius: 50%;
    padding: 2px 10px;
    font-weight: lighter;
    font-size: .3rem;
  }

  .orange {
    color: #f60;
    float: left;
    border: none;
  }

  .m-num {
    float: left;
    text-align: center;
    height: .9rem;
    line-height: .9rem;
    width: 2.5rem;
    position: relative;
  }

  .num {
    width: 50px;
    outline: none;
    border-radius: 2px;
    border: 1px solid #ddd;
    height: .65rem;
    text-align: center;
    position: absolute;
    left: 15px;
    top: 3px;
  }

  .remove {
    border: none;
  }

  .btn > a {
    width: 5rem;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.45rem;
    border-radius: 4px;
    background-color: #E22C37;
    color: #fff;
    text-align: center;
    display: block;
  }

  .integ_info {
    margin-top: .35rem;
    overflow: hidden;
  }

  .title {
    height: 1rem;
    line-height: 1rem;
    border-bottom: 1px solid #F94D4D;
    background-color: #fff;
    font-size: .45rem;
  }

  .title > span {
    float: left;
    margin-left: 2%;
  }

  .integ_img {
    display: inline-block;
  }

  .integ_img > p {
    display: inline-block;
    margin-left: 1%;
    margin-right: 1%;
    width: 98%;
  }

  .integ_img > p > img {
    display: inline-block;
    width: 100%;
  }
</style>
