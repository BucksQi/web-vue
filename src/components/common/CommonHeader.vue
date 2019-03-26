<template>
  <header class="m-header">
    <div class="phone_hd">
      <a class="back" @click="goBack">
        <img :src="back_src">
      </a>
      <a :class="select_address ? 'm_title cart_address': 'm_title'" @click="selectAddress">{{title}}</a>
      <a class="home" @click="goHome">
        <img :src="home_src">
      </a>
    </div>
  </header>
</template>

<script>
export default {
  name: 'commonHeader',
  props: {
    title: {
      type: String,
      required: true
    },
    back_src: {
      type: String,
      required: true
    },
    home_src: {
      type: String,
      required: true
    },
    select_address: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  created () {
    console.log('select_address=', this.select_address)
  },
  data () {
    return {

    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    goHome () {
      this.$router.push({path: '/'})
    },
    selectAddress () {
      if (this.select_address) {
        // 选择城市
        this.$emit('changeAddress', true)
      }
    }
  }
}
</script>

<style scoped>
.m-header {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
  background-color: #F94D4D;
  font-size: 0.45rem;
  font-weight: 500;
  z-index: 9;
}
.phone_hd {
  width: inherit;
  height: inherit;
  line-height: inherit;
}

.phone_hd .m_title {
  color: #fff;
}

.phone_hd .back {
  float: left;
  width: 1rem;
  height: inherit;
}

.phone_hd .back img {
  height: .7rem;
  margin-top: .1rem;
}

.phone_hd .home {
  float: right;
  width: 1rem;
  height: inherit;
}
.phone_hd .home img {
  height: .7rem;
  margin-top: .1rem;
}

.cart_address {
  background: url(../../../static/images/shopcar_address.png) no-repeat left center;
  padding-left: .42rem;
  background-size: .278rem .389rem;
}
</style>
