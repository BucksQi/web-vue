<template>
  <div>
    <div class="tab" ref="tab">
      <ul class="tab_content" ref="tabWrapper">
        <li class="tab_item" v-for="(item, index) in itemList" ref="tabitem" :key="index">
          {{item.title}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  name: 'gunDong',
  data () {
    return {
      itemList: [
        {
          'title': '关注'
        },
        {
          'title': '推荐'
        },
        {
          'title': '深圳'
        },
        {
          'title': '视频'
        },
        {
          'title': '音乐'
        },
        {
          'title': '热点'
        },
        {
          'title': '新时代'
        },
        {
          'title': '娱乐'
        },
        {
          'title': '头条号'
        },
        {
          'title': '问答'
        },
        {
          'title': '图片'
        },
        {
          'title': '科技'
        },
        {
          'title': '体育'
        },
        {
          'title': '财经'
        },
        {
          'title': '军事'
        },
        {
          'title': '国际'
        }
      ]
    }
  },
  components: {

  },
  created () {
    this.$nextTick(() => {
      this.InitTabScroll()
    })
  },
  methods: {
    InitTabScroll () {
      let width = 0
      for (let i = 0; i < this.itemList.length; i++) {
        width += this.$refs.tabitem[i].getBoundingClientRect().width // getBoundingClientRect() 返回元素的大小及其相对于视口的位置
      }
      this.$refs.tabWrapper.style.width = width + 'px'
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.tab, {
            startX: 0,
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: 'vertical'
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    sliderVal (min, max, total) {

    }
  }
}
</script>
<!--lang="scss"-->
<style scoped>
  .tab {
    width: 100vw;
    overflow: hidden;
    padding: 5px 0;
  }

  .tab_content {
    line-height: 1rem;
    display: flex;
  }

  .tab_item {
    flex: 0 0 60px;
    width: 60px;
    text-align: center;
  }
</style>
