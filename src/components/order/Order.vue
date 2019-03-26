<template>
  <div>
    <header>
      <div>这里是头部</div>
    </header>
    <section>
      <div>这里是内容</div>
    </section>
    <section>
      <footer-list :index="index"></footer-list>
    </section>
  </div>
</template>
<script>
import FooterList from '@/components/common/FooterList'
export default {
  name: 'order',
  components: {FooterList},
  data () {
    return {
      index: 4
    }
  }
}
</script>

<style scoped>

</style>
