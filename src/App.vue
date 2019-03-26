<template>
  <div id="app">
   <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'App',
  components: {},
  created () {

  },
  data () {
    return {}
  },
  computed: {
    member () {
      // 因为在main.js中已经全局注册了store，所以这里直接用this.$直接使用。
      return this.$store.state.member
    }
  }
}
</script>
<style>
  * {
    margin: 0;
    padding: 0;
    outline: none;
    text-underline: none;
    list-style: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  a {
    text-decoration: none;
    color: #000;
  }

  #app {
    width: 100%;
    height: 100%;
    /*font-size: .45rem;*/
    background-color: #f5f5f5;
    font-size: .4rem;
  }
</style>
