<template>
 <div>
    <header class="m-member">
      <div>{{ msg }}</div>
      <div>
        <ul>
          <li>参数={{ $route.params.id }}</li>
          <li>{{id}}</li>
        </ul>
      </div>
      <button @click="say($event)">点击</button>
      <button @click="getData">获取数据</button>
    </header>
    <section>
      <div class="container">
        <div class="list-data">
          <ul>
            <li v-for="item in list" :key="item.id">
              {{item.title}}
            </li>
          </ul>
        </div>
        <p class="empty-data"></p>
      </div>
    </section>
    <section>
      <footer-list :index="index"></footer-list>
    </section>
  </div>

</template>

<script>
import FooterList from '@/components/common/FooterList'
// import BScroll from 'better-scroll'

export default {
  name: 'member',
  components: {FooterList},
  data () {
    return {
      msg: '我的Vue',
      id: this.$route.params.id || 2,
      list: [{id: 22, content: 'wode'}],
      index: 5
    }
  },
  created () {
    this.getData()
  },
  methods: {
    say (event) {

    },
    getData () {
      this.$api.get('topics', null, r => {
        // console.log(r)
        this.list = r.data
      })
    }
  }
}
</script>

<style type="text/css">

</style>
