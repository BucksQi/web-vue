<template>
  <div class="cart-list">
    <div class="cart-left">
      <ul>
        <li>
          <span :class="isAll ? 'check check-all' : 'check check-m'" @click="checkAll"></span>
          <span class="total-price">合计：￥<b>{{totalPrice}}</b></span>
        </li>
        <li>
          <span class="all">全选</span>
          <span class="free">不含运费</span>
        </li>
      </ul>
    </div>
    <div class="cart-right">
      <a class="settle-btn">结算({{buyCount}})</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cartList',
  props: {
    totalPrice: {
      type: Number,
      default: 0.00
    },
    buyCount: {
      type: Number,
      default: 0
    },
    isAll: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },

  methods: {
    checkAll () {
      // 计算金额
      this.$emit('checkAll', !this.isAll)
    }
  }
}
</script>

<style scoped>
  b {
    text-decoration: none;
    font-style: normal;
    font-size: .45rem;
    color: #f94d4d;
    font-weight: 600;
  }

  .cart-list {
    position: absolute;
    width: 100%;
    height: 1.4rem;
    bottom: 0;
    left: 0;
    z-index: 2;
    display: flex;
    flex-flow: row wrap;
    background-color: #fff;
  }

  .cart-list > div {
    height: inherit;
    display: flex;
  }

  .cart-left {
    margin-left: 3%;
    width: 67%;
  }

  .cart-left > ul {
    display: flex;
    flex-flow: row wrap;
    width: 92%;
    margin: 2% auto 0;
  }

  .cart-left > ul > li {
    font-size: .4rem;
    color: #999;
    width: 100%;
    display: flex;
    height: .6rem;
  }

  .cart-left > ul > li > span {
    display: inline-block;
    float: left;
    margin-right: .6rem;
  }

  .cart-left > ul > li > .all {
    margin-right: .36rem;
  }

  .check {
    width: .556rem;
    height: .556rem;
    vertical-align: middle;
    border-radius: 50%;
  }

  .check-m {
    border: solid 1px #a2a2a2;
  }

  .check-all {
    background: url(../../../static/images/s_goods_pitch.png) no-repeat center center #fe3837;
    border: solid 1px #fe3837;
    background-size: .556rem .556rem;
  }

  .cart-right {
    width: 30%;
    background-color: #fe3837;
    justify-content: center;
    align-items: center;
  }

  .settle-btn {
    color: #fff;
    width: 80%;
    height: .8rem;
    line-height: .8rem;
    text-align: center;
    font-size: .45rem;
  }
</style>
