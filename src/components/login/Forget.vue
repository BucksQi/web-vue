<template>
  <div class="m-main">
    <common-header :title="title" :back_src="back_src" :home_src="home_src"></common-header>
  </div>
</template>

<script>
import CommonHeader from '@/components/common/CommonHeader'

export default {
  name: 'forget',
  components: {CommonHeader},
  created () {

  },
  data () {
    return {
      title: '找回密码',
      back_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/back.png',
      home_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/home.png'
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
