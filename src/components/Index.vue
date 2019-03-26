<template>
  <div>
    <!---头部--->
    <header>
      <div class="m_head">
        <form name="theForm" id="theForm" action="#" method="post">
          <div class="m_classify">
            <a @click="showNav"><img :src="nav_src"></a>
          </div>
          <div class="m_search">
            <span></span>
            <div>
              <input type="text" name="keyword" v-model="keyword" placeholder="请输入商品名称或店铺名称">
            </div>
          </div>
          <div class="m_sh">
            <a class="m_btn" @click="search"></a>
          </div>
        </form>
      </div>
    </header>

    <!----导航菜单------>
    <section>
      <!--name="moveMenu"-->
      <transition name="slide-right">
        <div class="m_menu" v-if="show">
          <div class="m_menu_left">
            <div class="pop_nav_top">
              <span>全部分类</span>
            </div>
            <div class="scroller" @scroll="moveMenu($event)">
              <div class="pop_nav_left" :style="menuMove">
                <ul>
                  <li v-for="(item, index) in menuList" :key="index" :class="item.class">
                    <a @click="selectMenu(index)">{{item.name}}</a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="category" @scroll="moveCategory($event)">
              <div class="category_show">
                <div class="in_second_page">
                  <a href="#">{{menuList[categoryIndex].title}}</a>
                </div>
                <div class="pul_d" :style="categoryMove">
                  <ul class="pul_ul">
                    <li class="pli" v-for="(item, index) in menuList[categoryIndex].categorys" :key="index">
                      <div class="pop_item">
                        <h2>{{item.title}}</h2>
                        <ul>
                          <li v-for="(itd, index) in item.cateList" :key="index">
                            <a href="#">
                              <div class="pop_item_img">
                                <img :src="itd.src" v-if="itd.src">
                              </div>
                              <b class="pop_item_name">{{itd.name}}</b>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="m_menu_right" @click="goBack">
            <a class="m_go_back">
              <div>
                <ul>
                  <li>点</li>
                  <li>击</li>
                  <li>此</li>
                  <li>处</li>
                  <li>返</li>
                  <li>回</li>
                  <li><img :src="go_back_src"></li>
                </ul>
              </div>
            </a>
          </div>
        </div>
      </transition>

    </section>

    <!--内容-->
    <section>
      <div class="container">
        <!---轮播--->
        <div class="lun_focus">
          <swipe class="my-swipe" ref="mySwipe">
            <swipe-item v-for="(item, index) in lunList" :key="index" class="slide" :style="item.style"></swipe-item>
          </swipe>
        </div>
        <!---选择项-->
        <div class="m_nav">
          <ul>
            <li v-for="(item, index) in navList" :key="index">
              <router-link tag="a" :to="{path: item.path}">
                <img :src="item.src"><span>{{item.value}}</span>
              </router-link>
            </li>
          </ul>
        </div>
        <!--加载产品分类-->
        <div id="img_load">
          <!--年货商品-->
          <div class="m_year m_activity">
            <div class="m_activity_title">
              <h3 class="m_title fl">年货不打烊</h3>
              <a href="#" class="m_more fr">更多&nbsp;&gt;</a></div>
            <ul>
              <li v-for="(item, index) in yearList" :key="index">
                <a href="#">
                  <img :src="item.src">
                </a>
              </li>
            </ul>
          </div>
          <!--精品推荐开始-->
          <div class="m_recommend">
            <div class="m_recommend_title">
              <h3 class="m_title">精品推荐</h3>
              <a href="#" class="m_more">更多&nbsp;&gt;</a>
            </div>
            <div class="m_rec">
              <div class="fl">
                <a href="#"><img :src="recommend_src">
                </a>
              </div>
              <div class="fr">
                <a v-for="(item, index) in boutiqueList" :key="index">
                  <img :src="item.src">
                </a>
              </div>
            </div>
          </div>
          <!--特色购--->
          <div class="m_activity">
            <div class="m_activity_title">
              <h3 class="m_title fl">特色购</h3>
              <a href="#" class="m_more fr">更多&nbsp;&gt;</a></div>
            <ul class="characteristic">
              <li v-for="(item, index) in characteristicList" :key="index">
                <a href="#">
                  <img :src="item.src">
                </a>
              </li>
            </ul>
          </div>
          <!--商城活动-->
          <div class="m_activity">
            <div class="m_activity_title">
              <h3 class="m_title fl">商城活动</h3>
              <a href="#" class="m_more fr">更多&nbsp;&gt;</a></div>
            <ul class="m_activity_shop">
              <li v-for="(item, index) in shopList" :key="index">
                <a href="#">
                  <img :src="item.src">
                </a>
              </li>
            </ul>
          </div>
          <!--品牌街开始-->
          <div class="m_brand m_activity">
            <div class="m_brand_title m_activity_title">
              <h3 class="m_title fl">品牌街</h3>
              <a href="#" class="m_more fr">更多&nbsp;&gt;</a></div>
            <ul>
              <li v-for="(item, index) in brandList" :key="index">
                <a href="#">
                  <img :src="item.src">
                </a>
              </li>
            </ul>
          </div>
          <!--精品推荐开始-->
          <div class="m_recommend m_points">
            <div class="m_recommend_title">
              <h3 class="m_title">积分乐园</h3>
              <a href="#" class="m_more">更多&nbsp;&gt;</a>
            </div>
            <div class="m_rec">
              <div class="fl">
                <a href="#">
                  <img :src="points_src">
                </a>
              </div>
              <div class="fr">
                <a v-for="(item, index) in pointsList" :key="index">
                  <img :src="item.src">
                </a>
              </div>
            </div>
          </div>
          <!--品牌街开始-->
          <div class="m_recommend">
            <div class="m_recommend_title">
              <h3 class="m_title fl">0元购</h3>
              <a href="#" class="m_more fr">更多&nbsp;&gt;</a></div>
            <ul class="m_zero">
              <li v-for="(item, index) in zeroList" :key="index">
                <a href="#"><img :src="item.src"></a>
              </li>
            </ul>
          </div>
          <!--精选市场开始-->
          <div class="m_market m_recommend">
            <div class="m_market_title m_recommend_title">
              <h3 class="m_title fl">精选市场</h3>
              <a href="#" class="m_more fr">更多&nbsp;&gt;</a></div>
            <ul class="m_market_content">
              <li v-for="(item, index) in marketList" :key="index"
                  :class="index === 0 || index === 1 ? 'm_top' : 'm_bottom'">
                <a href="#">
                  <img :src="item.src">
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!--商城推荐-->
        <div class="m_favorite">
          <div class="m_favorite_title">商城推荐</div>
          <ul>
            <li v-for="(item, index) in favoriteList" :key="index">
              <a href="#">
                <div class="m_favorite_pic"><img :src="item.src"></div>
                <div class="m_favorite_name">{{item.name}}</div>
                <div class="m_favorite_value">{{item.value}}</div>
              </a>
            </li>
          </ul>
        </div>

        <div class="empty-data">
        </div>
      </div>
    </section>

    <!--底部-->
    <section>
      <footer-list :index="index"></footer-list>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import FooterList from '@/components/common/FooterList'
import Swipe from '@/components/scroll/Swipe'
import SwipeItem from '@/components/scroll/SwipeItem'

export default {
  name: 'index',
  components: {FooterList, Swipe, SwipeItem},

  created () {
    // console.log('member=', this.$store.state.member)
    // console.log('token=', this.$cookies.get('token'))
  },
  data () {
    return {
      index: 1,
      recommend_src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/01/22/accebc03-9438-47f6-b55c-32f2fa0441f3.jpg',
      points_src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/8436924c-aa71-4eb2-ad0b-8889b29d73c4.jpg?400&380',
      go_back_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/back_left.png',
      nav_src: '../../static/images/classify_icon.png',
      show: false,
      moveY: 0,
      categoryIndex: 0,
      keyword: '',
      menuList: [
        {
          name: '男女服饰',
          class: 'active',
          title: '男女服饰频道页',
          categorys: [
            {
              title: '服装城',
              cateList: [
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                },
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                },
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                }
              ]
            },
            {
              title: '男装',
              cateList: [
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                }
              ]
            },
            {
              title: '时尚女装',
              cateList: [
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                },
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                },
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                }
              ]
            },

            {
              title: '内衣',
              cateList: [
                {
                  name: '打底衫',
                  src: ''
                },
                {
                  name: '内衣配件',
                  src: ''
                },
                {
                  name: '塑身美体',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '抹胸',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '泳衣',
                  src: ''
                },
                {
                  name: '塑身美体',
                  src: ''
                },
                {
                  name: '美腿袜',
                  src: ''
                },
                {
                  name: '保暖内衣',
                  src: ''
                },
                {
                  name: '秋衣秋裤',
                  src: ''
                },
                {
                  name: '睡衣/家居服',
                  src: ''
                },
                {
                  name: '商务男袜',
                  src: ''
                }
              ]
            }
          ]
        },
        {
          name: '家用电器',
          class: '',
          title: '家用电器频道',
          categorys: [
            {
              title: '服装城',
              cateList: [
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                },
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                },
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                }
              ]
            },
            {
              title: '男装',
              cateList: [
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                }
              ]
            },
            {
              title: '时尚女装',
              cateList: [
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                },
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                },
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                }
              ]
            },

            {
              title: '内衣',
              cateList: [
                {
                  name: '打底衫',
                  src: ''
                },
                {
                  name: '内衣配件',
                  src: ''
                },
                {
                  name: '塑身美体',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '抹胸',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '泳衣',
                  src: ''
                },
                {
                  name: '塑身美体',
                  src: ''
                },
                {
                  name: '美腿袜',
                  src: ''
                },
                {
                  name: '保暖内衣',
                  src: ''
                },
                {
                  name: '秋衣秋裤',
                  src: ''
                },
                {
                  name: '睡衣/家居服',
                  src: ''
                },
                {
                  name: '商务男袜',
                  src: ''
                }
              ]
            }
          ]
        },
        {
          name: '数码电子',
          class: '',
          title: '数码电子频道',
          categorys: [
            {
              title: '服装城',
              cateList: [
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                },
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                },
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                }
              ]
            },
            {
              title: '男装',
              cateList: [
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                }
              ]
            },
            {
              title: '时尚女装',
              cateList: [
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                },
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                },
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                }
              ]
            },

            {
              title: '内衣',
              cateList: [
                {
                  name: '打底衫',
                  src: ''
                },
                {
                  name: '内衣配件',
                  src: ''
                },
                {
                  name: '塑身美体',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '抹胸',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '泳衣',
                  src: ''
                },
                {
                  name: '塑身美体',
                  src: ''
                },
                {
                  name: '美腿袜',
                  src: ''
                },
                {
                  name: '保暖内衣',
                  src: ''
                },
                {
                  name: '秋衣秋裤',
                  src: ''
                },
                {
                  name: '睡衣/家居服',
                  src: ''
                },
                {
                  name: '商务男袜',
                  src: ''
                }
              ]
            }
          ]
        },
        {
          name: '个护化妆',
          class: '',
          title: '个护化壮',
          categorys: [
            {
              title: '服装城',
              cateList: [
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                },
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                },
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                }
              ]
            },
            {
              title: '男装',
              cateList: [
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                }
              ]
            },
            {
              title: '时尚女装',
              cateList: [
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                },
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                },
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                }
              ]
            },

            {
              title: '内衣',
              cateList: [
                {
                  name: '打底衫',
                  src: ''
                },
                {
                  name: '内衣配件',
                  src: ''
                },
                {
                  name: '塑身美体',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '抹胸',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '泳衣',
                  src: ''
                },
                {
                  name: '塑身美体',
                  src: ''
                },
                {
                  name: '美腿袜',
                  src: ''
                },
                {
                  name: '保暖内衣',
                  src: ''
                },
                {
                  name: '秋衣秋裤',
                  src: ''
                },
                {
                  name: '睡衣/家居服',
                  src: ''
                },
                {
                  name: '商务男袜',
                  src: ''
                }
              ]
            }
          ]
        },
        {
          name: '鞋靴箱包',
          class: '',
          title: '鞋靴箱包频道',
          categorys: [
            {
              title: '服装城',
              cateList: [
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                },
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                },
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                }
              ]
            },
            {
              title: '男装',
              cateList: [
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                }
              ]
            },
            {
              title: '时尚女装',
              cateList: [
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                },
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                },
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                }
              ]
            },

            {
              title: '内衣',
              cateList: [
                {
                  name: '打底衫',
                  src: ''
                },
                {
                  name: '内衣配件',
                  src: ''
                },
                {
                  name: '塑身美体',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '抹胸',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '泳衣',
                  src: ''
                },
                {
                  name: '塑身美体',
                  src: ''
                },
                {
                  name: '美腿袜',
                  src: ''
                },
                {
                  name: '保暖内衣',
                  src: ''
                },
                {
                  name: '秋衣秋裤',
                  src: ''
                },
                {
                  name: '睡衣/家居服',
                  src: ''
                },
                {
                  name: '商务男袜',
                  src: ''
                }
              ]
            }
          ]
        },
        {
          name: '户外运动',
          class: '',
          title: '户外运动频道',
          categorys: [
            {
              title: '服装城',
              cateList: [
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                },
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                },
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                }
              ]
            },
            {
              title: '男装',
              cateList: [
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                }
              ]
            },
            {
              title: '时尚女装',
              cateList: [
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                },
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                },
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                }
              ]
            },

            {
              title: '内衣',
              cateList: [
                {
                  name: '打底衫',
                  src: ''
                },
                {
                  name: '内衣配件',
                  src: ''
                },
                {
                  name: '塑身美体',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '抹胸',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '泳衣',
                  src: ''
                },
                {
                  name: '塑身美体',
                  src: ''
                },
                {
                  name: '美腿袜',
                  src: ''
                },
                {
                  name: '保暖内衣',
                  src: ''
                },
                {
                  name: '秋衣秋裤',
                  src: ''
                },
                {
                  name: '睡衣/家居服',
                  src: ''
                },
                {
                  name: '商务男袜',
                  src: ''
                }
              ]
            }
          ]
        },
        {
          name: '汽车用品',
          class: '',
          title: '汽车用品频道',
          categorys: [
            {
              title: '服装城',
              cateList: [
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                },
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                },
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                }
              ]
            },
            {
              title: '男装',
              cateList: [
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                }
              ]
            },
            {
              title: '时尚女装',
              cateList: [
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                },
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                },
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                }
              ]
            },

            {
              title: '内衣',
              cateList: [
                {
                  name: '打底衫',
                  src: ''
                },
                {
                  name: '内衣配件',
                  src: ''
                },
                {
                  name: '塑身美体',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '抹胸',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '泳衣',
                  src: ''
                },
                {
                  name: '塑身美体',
                  src: ''
                },
                {
                  name: '美腿袜',
                  src: ''
                },
                {
                  name: '保暖内衣',
                  src: ''
                },
                {
                  name: '秋衣秋裤',
                  src: ''
                },
                {
                  name: '睡衣/家居服',
                  src: ''
                },
                {
                  name: '商务男袜',
                  src: ''
                }
              ]
            }
          ]
        },
        {
          name: '母婴玩具',
          class: '',
          title: '母婴玩具频道',
          categorys: [
            {
              title: '服装城',
              cateList: [
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                },
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                },
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                }
              ]
            },
            {
              title: '男装',
              cateList: [
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                }
              ]
            },
            {
              title: '时尚女装',
              cateList: [
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                },
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                },
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                }
              ]
            },

            {
              title: '内衣',
              cateList: [
                {
                  name: '打底衫',
                  src: ''
                },
                {
                  name: '内衣配件',
                  src: ''
                },
                {
                  name: '塑身美体',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '抹胸',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '泳衣',
                  src: ''
                },
                {
                  name: '塑身美体',
                  src: ''
                },
                {
                  name: '美腿袜',
                  src: ''
                },
                {
                  name: '保暖内衣',
                  src: ''
                },
                {
                  name: '秋衣秋裤',
                  src: ''
                },
                {
                  name: '睡衣/家居服',
                  src: ''
                },
                {
                  name: '商务男袜',
                  src: ''
                }
              ]
            }
          ]
        },
        {
          name: '食品生鲜',
          class: '',
          title: '食品生鲜频道',
          categorys: [
            {
              title: '服装城',
              cateList: [
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                },
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                },
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                }
              ]
            },
            {
              title: '男装',
              cateList: [
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                }
              ]
            },
            {
              title: '时尚女装',
              cateList: [
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                },
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                },
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                }
              ]
            },

            {
              title: '内衣',
              cateList: [
                {
                  name: '打底衫',
                  src: ''
                },
                {
                  name: '内衣配件',
                  src: ''
                },
                {
                  name: '塑身美体',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '抹胸',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '泳衣',
                  src: ''
                },
                {
                  name: '塑身美体',
                  src: ''
                },
                {
                  name: '美腿袜',
                  src: ''
                },
                {
                  name: '保暖内衣',
                  src: ''
                },
                {
                  name: '秋衣秋裤',
                  src: ''
                },
                {
                  name: '睡衣/家居服',
                  src: ''
                },
                {
                  name: '商务男袜',
                  src: ''
                }
              ]
            }
          ]
        },
        {
          name: '营养保健',
          class: '',
          title: '营养保健频道',
          categorys: [
            {
              title: '服装城',
              cateList: [
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                },
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                },
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                }
              ]
            },
            {
              title: '男装',
              cateList: [
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                }
              ]
            },
            {
              title: '时尚女装',
              cateList: [
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                },
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                },
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                }
              ]
            },

            {
              title: '内衣',
              cateList: [
                {
                  name: '打底衫',
                  src: ''
                },
                {
                  name: '内衣配件',
                  src: ''
                },
                {
                  name: '塑身美体',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '抹胸',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '泳衣',
                  src: ''
                },
                {
                  name: '塑身美体',
                  src: ''
                },
                {
                  name: '美腿袜',
                  src: ''
                },
                {
                  name: '保暖内衣',
                  src: ''
                },
                {
                  name: '秋衣秋裤',
                  src: ''
                },
                {
                  name: '睡衣/家居服',
                  src: ''
                },
                {
                  name: '商务男袜',
                  src: ''
                }
              ]
            }
          ]
        },
        {
          name: '家具家装',
          class: '',
          title: '家具家装频道',
          categorys: [
            {
              title: '服装城',
              cateList: [
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                },
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                },
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                }
              ]
            },
            {
              title: '男装',
              cateList: [
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                }
              ]
            },
            {
              title: '时尚女装',
              cateList: [
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                },
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                },
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                }
              ]
            },

            {
              title: '内衣',
              cateList: [
                {
                  name: '打底衫',
                  src: ''
                },
                {
                  name: '内衣配件',
                  src: ''
                },
                {
                  name: '塑身美体',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '抹胸',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '泳衣',
                  src: ''
                },
                {
                  name: '塑身美体',
                  src: ''
                },
                {
                  name: '美腿袜',
                  src: ''
                },
                {
                  name: '保暖内衣',
                  src: ''
                },
                {
                  name: '秋衣秋裤',
                  src: ''
                },
                {
                  name: '睡衣/家居服',
                  src: ''
                },
                {
                  name: '商务男袜',
                  src: ''
                }
              ]
            }
          ]
        },
        {
          name: '礼品充值卡',
          class: '',
          title: '礼品充值卡频道',
          categorys: [
            {
              title: '服装城',
              cateList: [
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                },
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                },
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                }
              ]
            },
            {
              title: '男装',
              cateList: [
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                }
              ]
            },
            {
              title: '时尚女装',
              cateList: [
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                },
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                },
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                }
              ]
            },

            {
              title: '内衣',
              cateList: [
                {
                  name: '打底衫',
                  src: ''
                },
                {
                  name: '内衣配件',
                  src: ''
                },
                {
                  name: '塑身美体',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '抹胸',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '泳衣',
                  src: ''
                },
                {
                  name: '塑身美体',
                  src: ''
                },
                {
                  name: '美腿袜',
                  src: ''
                },
                {
                  name: '保暖内衣',
                  src: ''
                },
                {
                  name: '秋衣秋裤',
                  src: ''
                },
                {
                  name: '睡衣/家居服',
                  src: ''
                },
                {
                  name: '商务男袜',
                  src: ''
                }
              ]
            }
          ]
        },
        {
          name: '图书影像',
          class: '',
          title: '图书影响频道',
          categorys: [
            {
              title: '服装城',
              cateList: [
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                },
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                },
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                }
              ]
            },
            {
              title: '男装',
              cateList: [
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                }
              ]
            },
            {
              title: '时尚女装',
              cateList: [
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                },
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                },
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                }
              ]
            },

            {
              title: '内衣',
              cateList: [
                {
                  name: '打底衫',
                  src: ''
                },
                {
                  name: '内衣配件',
                  src: ''
                },
                {
                  name: '塑身美体',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '抹胸',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '泳衣',
                  src: ''
                },
                {
                  name: '塑身美体',
                  src: ''
                },
                {
                  name: '美腿袜',
                  src: ''
                },
                {
                  name: '保暖内衣',
                  src: ''
                },
                {
                  name: '秋衣秋裤',
                  src: ''
                },
                {
                  name: '睡衣/家居服',
                  src: ''
                },
                {
                  name: '商务男袜',
                  src: ''
                }
              ]
            }
          ]
        },
        {
          name: '彩票票务',
          class: '',
          title: '彩票票务频道页',
          categorys: [
            {
              title: '服装城',
              cateList: [
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                },
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                },
                {
                  name: '男女服饰',
                  src: ''
                },
                {
                  name: '男装',
                  src: ''
                },
                {
                  name: '女装',
                  src: ''
                }
              ]
            },
            {
              title: '男装',
              cateList: [
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '瓦尔图文吧VB',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                }
              ]
            },
            {
              title: '时尚女装',
              cateList: [
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                },
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                },
                {
                  name: '呢绒大衣',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/864d5754-177a-4a96-a062-6da230c22df7.jpg'
                },
                {
                  name: '连衣裙',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/cd48aa45-aa12-467a-bc4e-8447dd48d255.jpg'
                },
                {
                  name: '衬衫',
                  src: 'http://b2b2c.iskyshop.com/upload/class_icon_wx/a39d49f3-ba30-42de-9813-feec3c6e3fd9.jpg'
                }
              ]
            },

            {
              title: '内衣',
              cateList: [
                {
                  name: '打底衫',
                  src: ''
                },
                {
                  name: '内衣配件',
                  src: ''
                },
                {
                  name: '塑身美体',
                  src: ''
                },
                {
                  name: '羽绒服',
                  src: ''
                },
                {
                  name: '抹胸',
                  src: ''
                },
                {
                  name: '棉服',
                  src: ''
                },
                {
                  name: '泳衣',
                  src: ''
                },
                {
                  name: '塑身美体',
                  src: ''
                },
                {
                  name: '美腿袜',
                  src: ''
                },
                {
                  name: '保暖内衣',
                  src: ''
                },
                {
                  name: '秋衣秋裤',
                  src: ''
                },
                {
                  name: '睡衣/家居服',
                  src: ''
                },
                {
                  name: '商务男袜',
                  src: ''
                }
              ]
            }
          ]
        }
      ],
      menuMove: {
        transform: 'translateX(0px) translateY(0px) translateZ(0px)',
        transitionTimingFunction: 'cubic-bezier(0.1, 0.57, 0.1, 1)',
        transitionDuration: '100ms'
      },
      categoryMove: {
        transform: 'translateX(0px) translateY(0px) translateZ(0px)',
        transitionTimingFunction: 'cubic-bezier(0.1, 0.57, 0.1, 1)',
        transitionDuration: '100ms'
      },
      lunList: [
        {
          style: {
            'background-image': 'url(../../static/images/2e1099d9-7511-47d5-a17a-0c26842c6a06.jpg)'
          }
        },
        {
          style: {
            'background-image': 'url(../../static/images/8e0340b2-1dde-424a-8d96-df48d8771be9.jpg)'
          }
        },
        {
          style: {
            'background-image': 'url(../../static/images/b64ccd73-6557-4666-8b6f-6cc9e8b04a2b.jpg)'
          }
        },
        {
          style: {
            'background-image': 'url(../../static/images/d1154678-8b72-422d-b395-bc46ddffdfa1.jpg)'
          }
        }
      ],
      navList: [
        {src: '../../static/images/nav_1.png', value: '云购', path: '/cloudPurchase'},
        {src: '../../static/images/nav_2.png', value: '品牌街', path: '/brand'},
        {src: '../../static/images/nav_3.png', value: '促销', path: '/activity'},
        {src: '../../static/images/nav_4.png', value: '免费领券', path: '/coupon'},
        {src: '../../static/images/nav_5.png', value: '积分专区', path: '/integral'},
        {src: '../../static/images/nav_6.png', value: '0元使用', path: '/cloudPurchase'},
        {src: '../../static/images/nav_7.png', value: '生活购', path: '/cloudPurchase'},
        {src: '../../static/images/nav_8.png', value: '尚品购', path: '/cloudPurchase'}
      ],
      yearList: [{src: '../../static/images/5b90d37c-840a-4733-bddd-b6836055786b.jpg'},
        {src: '../../static/images/5b90d37c-840a-4733-bddd-b6836055786b.jpg'},
        {src: '../../static/images/5b90d37c-840a-4733-bddd-b6836055786b.jpg'},
        {src: '../../static/images/5b90d37c-840a-4733-bddd-b6836055786b.jpg'}
      ],
      boutiqueList: [
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/01/26/7743de98-82d3-4c90-bd56-138da6febcad.jpg'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/01/26/7743de98-82d3-4c90-bd56-138da6febcad.jpg'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/01/26/7743de98-82d3-4c90-bd56-138da6febcad.jpg'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/01/26/7743de98-82d3-4c90-bd56-138da6febcad.jpg'}
      ],
      characteristicList: [
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/4d3f7390-043f-49e7-88d6-5abf8f844f68.jpg'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/669ac387-e8b8-46ac-b3a2-4efe7243e5bc.jpg'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/9eeef92f-9b30-4ffa-9095-eac50ca98491.jpg'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/f900dc71-1186-4d38-9914-9997ff30d111.jpg'}
      ],
      shopList: [
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/c071e9ed-c49b-408c-9d23-d84ab7d1a17d.jpg'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/c071e9ed-c49b-408c-9d23-d84ab7d1a17d.jpg'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/c071e9ed-c49b-408c-9d23-d84ab7d1a17d.jpg'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/c071e9ed-c49b-408c-9d23-d84ab7d1a17d.jpg'}
      ],
      brandList: [
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/8b471fd3-d190-4d8d-9297-3257633ccbca.jpg'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/8b471fd3-d190-4d8d-9297-3257633ccbca.jpg'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/cf66cc54-69ae-41e6-84cb-96eaa35676f0.jpg'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/cf66cc54-69ae-41e6-84cb-96eaa35676f0.jpg'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/cf66cc54-69ae-41e6-84cb-96eaa35676f0.jpg'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/cf66cc54-69ae-41e6-84cb-96eaa35676f0.jpg'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/cf66cc54-69ae-41e6-84cb-96eaa35676f0.jpg'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/14e1b804-ce32-4c2f-97eb-4d56daad3150.jpg'}
      ],
      pointsList: [
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/8436924c-aa71-4eb2-ad0b-8889b29d73c4.jpg'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/c071e9ed-c49b-408c-9d23-d84ab7d1a17d.jpg'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/c071e9ed-c49b-408c-9d23-d84ab7d1a17d.jpg'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/c071e9ed-c49b-408c-9d23-d84ab7d1a17d.jpg'}
      ],
      zeroList: [
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/0e109d91-05aa-4328-99fd-ce3854722b11.jpg?180&amp;160'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/0e109d91-05aa-4328-99fd-ce3854722b11.jpg?180&amp;160'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/0e109d91-05aa-4328-99fd-ce3854722b11.jpg?180&amp;160'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/0e109d91-05aa-4328-99fd-ce3854722b11.jpg?180&amp;160'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/0e109d91-05aa-4328-99fd-ce3854722b11.jpg?180&amp;160'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/0e109d91-05aa-4328-99fd-ce3854722b11.jpg?180&amp;160'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/0e109d91-05aa-4328-99fd-ce3854722b11.jpg?180&amp;160'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/24234f7a-837a-4980-b2ec-a2791ff9b3e6.jpg?180&amp;160'}
      ],
      marketList: [
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/ef6ddda2-c23f-4120-a979-129cd44452c5.jpg?315&amp;600'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/ef6ddda2-c23f-4120-a979-129cd44452c5.jpg?315&amp;600'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/0e109d91-05aa-4328-99fd-ce3854722b11.jpg?180&amp;160'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/0e109d91-05aa-4328-99fd-ce3854722b11.jpg?180&amp;160'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/0e109d91-05aa-4328-99fd-ce3854722b11.jpg?180&amp;160'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/0e109d91-05aa-4328-99fd-ce3854722b11.jpg?180&amp;160'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/0e109d91-05aa-4328-99fd-ce3854722b11.jpg?180&amp;160'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/0e109d91-05aa-4328-99fd-ce3854722b11.jpg?180&amp;160'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/0e109d91-05aa-4328-99fd-ce3854722b11.jpg?180&amp;160'},
        {src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/02/01/24234f7a-837a-4980-b2ec-a2791ff9b3e6.jpg?180&amp;160'}
      ],
      favoriteList: [
        {
          src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/01/25/e7700a38-bf8a-481a-a17d-3554549bd758.jpg',
          name: '爱华仕oiwas 202428寸 万向轮硬箱拉杆箱 男女时尚旅行箱包商务行李箱6130',
          value: '￥329.00'
        },
        {
          src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/01/25/e7700a38-bf8a-481a-a17d-3554549bd758.jpg',
          name: '爱华仕oiwas 202428寸 万向轮硬箱拉杆箱 男女时尚旅行箱包商务行李箱6130',
          value: '￥329.00'
        },
        {
          src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/01/25/e7700a38-bf8a-481a-a17d-3554549bd758.jpg',
          name: '爱华仕oiwas 202428寸 万向轮硬箱拉杆箱 男女时尚旅行箱包商务行李箱6130',
          value: '￥329.00'
        },
        {
          src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/01/25/e7700a38-bf8a-481a-a17d-3554549bd758.jpg',
          name: '爱华仕oiwas 202428寸 万向轮硬箱拉杆箱 男女时尚旅行箱包商务行李箱6130',
          value: '￥329.00'
        },
        {
          src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/01/25/e7700a38-bf8a-481a-a17d-3554549bd758.jpg',
          name: '爱华仕oiwas 202428寸 万向轮硬箱拉杆箱 男女时尚旅行箱包商务行李箱6130',
          value: '￥329.00'
        },
        {
          src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/01/25/e7700a38-bf8a-481a-a17d-3554549bd758.jpg',
          name: '爱华仕oiwas 202428寸 万向轮硬箱拉杆箱 男女时尚旅行箱包商务行李箱6130',
          value: '￥329.00'
        },
        {
          src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/01/25/e7700a38-bf8a-481a-a17d-3554549bd758.jpg',
          name: '爱华仕oiwas 202428寸 万向轮硬箱拉杆箱 男女时尚旅行箱包商务行李箱6130',
          value: '￥329.00'
        },
        {
          src: 'http://b2b2c.iskyshop.com/upload/system/self_goods/2016/01/25/e7700a38-bf8a-481a-a17d-3554549bd758.jpg',
          name: '爱华仕oiwas 202428寸 万向轮硬箱拉杆箱 男女时尚旅行箱包商务行李箱6130',
          value: '￥329.00'
        }
      ]
    }
  },

  mounted () {
    // console.log('member=', this.$store.state.member)
  },

  methods: {
    showNav () {
      this.show = !this.show
    },

    goBack () {
      this.show = !this.show
    },

    moveMenu (event) {
      let moveY = -event.target.scrollTop
      this.menuMove.transform = 'translateX(0px) translateZ(0px) translateY(' + moveY + 'px)'
      event.stopPropagation()
    },

    moveCategory (event) {
      let moveY = -event.target.scrollTop
      this.categoryMove.transform = 'translateX(0px) translateZ(0px) translateY(' + moveY + 'px)'
      event.stopPropagation()
    },

    selectMenu (index) {
      this.menuList.forEach((item, idx) => {
        if (index === idx) {
          item.class = 'active'
          this.categoryIndex = idx
          this.menuList[idx] = item
        } else {
          item.class = ''
          this.menuList[idx] = item
        }
      })
      this.categoryMove.transform = 'translateX(0px) translateY(0px) translateZ(0px)'
    },

    search () {
      if (this.keyword) {
        this.$router.push({name: 'searchKeyWord', params: { keyword: this.keyword }})
      }
    }
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
    color: #000;
    outline: none;
  }

  i, b {
    text-decoration: none;
    font-style: normal;
    font-weight: lighter;
  }

  header {
    width: 100%;
    height: 1rem;
    display: flex;
    position: fixed;
    background-color: #3190e8;
    top: 0;
    left: 0;
    z-index: 9;
  }

  .m_head {
    width: 100%;
    height: 1rem;
    display: flex;
  }

  .m_head > form {
    display: flex;
    width: 100%;
  }

  .m_head > form > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .m_head > form > div:first-child {
    height: 1rem;
    flex: .6;
  }

  .m_head > form > div:nth-child(2) {
    flex: 2.8;
  }

  .m_head > form > div:last-child {
    flex: .6;
  }

  .m_classify img {
    height: 1rem;
    width: 1rem;
  }

  .m_search > div {
    display: inherit;
    width: 100%;
  }

  .m_search > span {
    display: block;
    width: 15%;
    height: .8rem;
    background: url(../../static/images/index_search.png) no-repeat center;
    background-size: 55%;
    margin-left: -30%;
    position: absolute;
  }

  .m_search > div > input {
    width: 100%;
    height: .8rem;
    font-size: 0.875em;
    color: #696969;
    border: none;
    border-radius: 2px;
    background-color: rgba(255, 255, 255, 0.9);
    text-indent: 1rem;
  }

  .m_btn {
    display: inline-block;
    width: .8rem;
    height: .8rem;
    background: url(../../static/images/index_search.png) no-repeat;
    background-size: .8rem .8rem;
    position: relative;
  }

  .container {
    position: relative;
    top: 1rem;
    width: 100%;
    height: 100%;
  }

  .lun_focus {
    position: relative;
    height: 4.78rem;
    width: 100%;
  }

  .my-swipe {
    height: inherit;
    color: #fff;
    font-size: .5rem;
    text-align: center;
  }

  .slide {
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .m_nav {
    box-shadow: 0 1px 0 #CCC;
    background-color: #fff;
  }

  .m_nav > ul {
    display: inline-block;
  }

  .m_nav > ul > li {
    width: 25%;
    text-align: center;
    display: inline-block;
    margin-top: .5rem;
    float: left;
  }

  .m_nav > ul > li > a {
    display: inline-block;
    text-align: center;
  }

  .m_nav > ul > li > a > img {
    width: 50%;
    display: inline-block;
  }

  .m_nav > ul > li > a > span {
    width: 100%;
    text-align: center;
    display: inline-block;
    font-size: .35rem;
  }

  .m_activity {
    background: #fff;
    margin-top: .5rem;
    overflow: hidden;
    box-shadow: 0 1px 0 #CCC;
  }

  .m_activity_title {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
  }

  .m_activity_title > h3, .m_recommend_title > h3, .m_brand_title > h3 {
    color: #fc3839;
    font-weight: normal;
    padding-left: .6rem;
    line-height: 1rem;
    font-size: .45rem;
  }

  .m_activity_title > a, .m_recommend_title > a, .m_brand_title > a {
    color: #fff;
    background: #fe3837;
    padding: 0.7% 1.5%;
    border-radius: 3px;
    margin: 9px;
    font-size: .35rem;
  }

  .m_year > ul {
    display: flex;
    width: 100%;
  }

  .m_year > ul > li {
    display: flex;
    flex: 1;
    height: 2.48rem;
  }

  .m_year > ul > li > a {
    display: inline-block;
    height: inherit;
    text-align: center;
    line-height: inherit;
  }

  .m_year > ul > li > a > img {
    border-right: solid 1px #eeeeee;
    box-sizing: border-box;
    height: inherit;
    width: inherit;
  }

  .m_recommend {
    background: #fff;
    margin-top: .5rem;
    overflow: hidden;
    box-shadow: 0 1px 0 #CCC;
  }

  .m_recommend_title {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .m_rec {
    display: flex;
    width: 100%;
  }

  .m_rec > .fl {
    display: flex;
    flex: 1;
    height: 5rem;
  }

  .m_rec > .fl > a {
    display: inline-block;
    height: inherit;
  }

  .m_rec > .fl > a > img {
    height: inherit;
  }

  .m_rec > .fr {
    display: flex;
    flex: 1;
    height: 5rem;
    flex-flow: wrap;
    border-left: 1px solid #eee;
  }

  .m_rec > .fr > a {
    height: 2.5rem;
    box-sizing: border-box;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    width: 50%;
    text-align: center;
    line-height: inherit;
  }

  .m_rec > .fr > a > img {
    height: 99%;
    width: 99%;
    vertical-align: middle;
    display: inline-block;
  }

  .characteristic {
    display: flex;
    height: 4.5rem;
  }

  .characteristic > li {
    display: flex;
    flex: 1;
    height: 4.4rem;
    border-right: solid 1px #eeeeee;
    box-sizing: border-box;
  }

  .characteristic > li > a {
    display: inline-block;
    height: inherit;
  }

  .characteristic > li > a > img {
    height: inherit;
  }

  .m_activity_shop {
    display: flex;
    height: 2.8rem;
    width: 100%;
  }

  .m_activity_shop > li {
    display: flex;
    flex: 1;
    height: 2.7rem;
  }

  .m_activity_shop > li > a {
    display: inline-block;
    height: inherit;
    text-align: center;
    line-height: inherit;
  }

  .m_activity_shop > li > a > img {
    height: inherit;
  }

  .m_brand > ul {
    display: flex;
    flex-flow: row wrap;
  }

  .m_brand > ul > li {
    flex-grow: 1;
    width: 2.4rem;
    height: 1.6rem;
    justify-content: center;
    align-items: center;
    border-bottom: solid 1px #eee;
  }

  .m_brand > ul > li > a {
    display: inline-block;
    height: 1.58rem;
    width: inherit;
  }

  .m_brand > ul > li > a > img {
    height: inherit;
    width: inherit;
  }

  .m_zero {
    display: flex;
    flex-flow: row wrap;
    height: 6.95rem;
  }

  .m_zero > li {
    display: flex;
    flex-grow: 1;
    width: 2.4rem;
    height: 3.475rem;
    justify-content: center;
    align-items: center;
    border-bottom: solid 1px #eee;
  }

  .m_zero > li > a {
    width: inherit;
    height: 3.47rem;
  }

  .m_zero > li > a > img {
    width: inherit;
    height: inherit;
  }

  .m_market_content {
    display: flex;
    flex-flow: row wrap;
    border-top: solid 1px #eee;
  }

  .m_top {
    display: flex;
    width: 50%;
    height: 2.72rem;
    border-bottom: solid 1px #eee;
  }

  .m_top > a {
    height: inherit;
    display: inline-block;
    width: 99%;
    text-align: center;
    line-height: inherit;
  }

  .m_top:first-child > a {
    border-right: 1px solid #eee;
  }

  .m_top > a > img {
    display: inline-block;
    vertical-align: middle;
    height: inherit;
    width: inherit;
  }

  .m_bottom {
    display: flex;
    width: 25%;
    height: 2.94rem;
    border-bottom: 1px solid #eee;
  }

  .m_bottom > a {
    display: inline-block;
    height: inherit;
    line-height: inherit;
    text-align: center;
    width: 99%;
    border-right: 1px solid #eee;
  }

  .m_bottom > a > img {
    height: inherit;
    width: inherit;
  }

  .m_favorite .m_favorite_title {
    height: 0.8rem;
    background: url(../../static/images/m_favorite.jpg) no-repeat center;
    color: #999999;
    text-align: center;
    line-height: 0.8rem;
    margin: 0.4rem 0 0.2rem;
  }

  .m_favorite > ul {
    display: flex;
    flex-flow: row wrap;
  }

  .m_favorite > ul > li {
    display: flex;
    width: 50%;
    margin-top: 0.8%;
    background: #fff;
  }

  .m_favorite > ul > li > a {
    display: inline-block;
    border-right: 1px solid #eee;
  }

  .m_favorite ul li .m_favorite_name {
    padding: 0 3%;
    font-size: 0.35rem;
    color: #666666;
    line-height: .5rem;
    height: 1rem;
    overflow: hidden;
  }

  .m_favorite ul li .m_favorite_value {
    color: #ff3936;
    padding: 0 0 2% 3%;
  }

  .m_favorite_pic {
    width: inherit;
    height: 4.862rem;
  }

  .m_favorite_pic > img {
    width: inherit;
    height: inherit;
  }

  .empty-data {
    font-size: 0.5rem;
    color: #666;
    height: 2.5rem;
    width: 100%;
  }

  .m_menu {
    position: fixed;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    z-index: 9;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .2);
  }

  .m_menu_left {
    display: flex;
    width: 90%;
    position: relative;
    height: inherit;
    background-color: #fff;
    flex-flow: row wrap;
  }

  .m_menu_right {
    display: flex;
    position: relative;
    width: 10%;
    height: inherit;
    background-color: rgba(0, 0, 0, .6);
  }

  .m_go_back {
    position: absolute;
    top: 40%;
    margin-left: .25rem;
    color: #fff;
  }

  .pop_nav_top {
    display: flex;
    width: 100%;
    font-size: .35rem;
    height: 1rem;
    line-height: 1rem;
    background: #eee;
    border-bottom: 1px solid #e1e1e1;
    position: absolute;
    z-index: 2;
  }

  .pop_nav_top > span {
    margin-left: 5%;
  }

  .scroller {
    position: absolute;
    top: 1rem;
    width: 23%;
    background: #eee;
    color: #9B9B9B;
    overflow: auto;
    height: 100%;
  }

  .pop_nav_left ul li {
    width: 100%;
    height: 64px;
    line-height: 64px;
    text-align: center;
    border-bottom: 1px solid #E1E1E1;
    overflow: hidden;
  }

  .pop_nav_left ul li.active {
    background: #fff;
  }

  .m_go_back img {
    height: .56rem;
    width: .56rem;
    margin-top: .25rem;
  }

  .category {
    display: flex;
    position: absolute;
    left: 23%;
    width: 77%;
    height: 100%;
    top: 1rem;
    overflow: auto;
  }

  .in_second_page {
    background: #FE3837;
    font-size: .4rem;
    height: .8rem;
    color: #fff;
    width: 100%;
    position: absolute;
    margin-top: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .in_second_page > a {
    color: #fff;
  }

  .category_show {
    display: flex;
    width: 95%;
    position: absolute;
    margin-left: 5%;
  }

  .pul_d {
    position: relative;
    margin-top: 16%;
  }

  .pul_ul {
    width: 100%;
    height: 100%;
    text-align: left;
  }

  .pul_ul > li {
    width: 100%;
  }

  .pop_item > h2 {
    font-size: .45rem;
    color: #9b9b9b;
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
  }

  .pop_item > ul {
    display: flex;
    flex-flow: row wrap;
  }

  .pop_item > ul > li {
    width: 33%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pop_item > ul > li > a {
    display: inline-block;
    width: 100%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 6% 0;
  }

  .pop_item_img {
    width: 100%;
  }

  .pop_item_img > img {
    width: 80%;
  }

  .pop_item_name {
    color: #5D5D5D;
    font-size: .4rem;
  }

  .slide-right-enter,
  .slide-right-leave-active {
    transform: translateX(-350px);
  }

  .slide-right-leave-active,
  .slide-right-enter-active {
    transition: all 1s .2s cubic-bezier(0.33, 0.25, 0.33, 1);
  }

  .moveMenu-enter-active {
    transition: all 2s ease;
  }

  .moveMenu-leave-active {
    transition: all 1s ease;
  }

  .moveMenu-enter, .moveMenu-leave-active {
    transform: scale(0);
    opacity: 0;
  }
</style>
