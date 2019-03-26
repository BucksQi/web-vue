<template>
  <div class="main">
    <!---头部-->
    <header>
      <div class="phone_hd">
        <a class="back" href="#/">
          <img :src="go_back_src">
        </a>
        1元云购
        <a class="menu home" href="#/member">
          <img :src="go_member_src">
        </a>
      </div>
    </header>

    <!--内容--->
    <section>
      <div class="select_product">
        <div :class="{active: productFlag === true}" @click="selectProduct">首页</div>
        <div :class="{active: productFlag === false}" @click="selectProduct">全部商品</div>
      </div>

      <!---首页-->
      <div class="product_main" v-if="productFlag">
        <!--幻灯开始--->
        <div class="m_banner">
          <div class="tempWrap">
            <swipe class="my-swipe" ref="mySwipe">
              <swipe-item v-for="(item, index) in lunList" :key="index" class="slide" :style="item.style"></swipe-item>
            </swipe>
          </div>
        </div>
        <!---上架新品--->
        <div class="new_publish">
          <div class="title_h">
            <span>上架新品</span>
            <router-link tag="a" :to="{path: '/news/publish'}">
              更多
            </router-link>
          </div>
          <div class="index_model">
            <ul class="items_box">
              <router-link tag="li" class="items_li" v-for="(item, index) in newsProductList" :key="index"
                           :to="{path: '/cloudPurchase/goods', query: {id: item.id}}">
                <a>
                  <img :src="item.src">
                  <p>{{item.name}}</p>
                </a>
              </router-link>
            </ul>
          </div>
        </div>
        <!---热门商品-->
        <div class="hot_more">
          <div class="title_h">
            <span>热门商品</span>
            <router-link tag="a" :to="{path: '/hot/more'}" class="more_btn">更多</router-link>
          </div>
          <div class="index_model">
            <ul class="model_g_box">
              <li class="model_g_item" v-for="(item, index) in hotList" :key="index">
                <div class="model_info_box">
                  <div class="goods_pic">
                    <router-link tag="a"
                                 :to="{query:{id: item.id}, name: 'purchaseGoods'}">
                      <img :src="item.src">
                    </router-link>
                  </div>
                  <div class="goods_info">
                    <p class="w_text">{{item.name}}</p>
                    <div class="w_progressBar">
                      <p class="pro_text">开奖进度<strong>{{item.percentage}}</strong></p>
                      <p class="w_line">
                        <!--进度条由百分比控制-->
                        <span class="w_bar">
                            <i class="color"></i>
                        </span>
                      </p>
                    </div>
                  </div>
                  <router-link tag="a" :to="{path: '/member'}">
                    <div class="goods_shortFunc"></div>
                  </router-link>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!--空数据--->
        <div class="empty"></div>
      </div>

      <!---全部商品-->
      <div class="bh_sh" v-if="!productFlag">
        <div class="pro_div">
          <ul class="pro_ul">
            <li class="select_all">
              <a @click="selectShopping">
                <span>全部商品</span>
                <i :class="shopFlag === true ? 'icon icon_down' : 'icon icon_up'"></i>
              </a>
              <div class="type_select" v-if="!shopFlag">
                <ul>
                  <li v-for="(item, index) in shopList" :key="index" :class="item.classId === classType ? 'm_selected' : ''">
                    <!--<router-link tag="a" :to="{name: 'cloudPurchase', query: {classId: item.classId}}">{{item.name}}</router-link>-->
                    <a @click="selectProductList(item.classId)">{{item.name}}</a>
                  </li>
                </ul>
              </div>
            </li>
            <li @click="selectType(1)" :class="typeFlag === 1 ? 'selected' : ''">
              <a>人气</a>
            </li>
            <li @click="selectType(2)" :class="typeFlag === 2 ? 'selected' : ''">
              <a>最新</a>
            </li>
            <li @click="selectType(3)" :class="typeFlag === 3 ? 'selected' : ''">
              <a>剩余次数</a>
            </li>
            <li @click="selectType(4)" :class="typeFlag === 4 ? 'selected' : ''">
              <a>
                <span>总需人数</span>
                <i
                  :class="totalFlag === 0 ? 'ico_sort2Arrow' : totalFlag === 1 ? 'ico_sort2Arrow up' : 'ico_sort2Arrow down'"></i>
              </a>
            </li>
          </ul>
        </div>
        <!--商品展示--->
        <div class="pro_show">
          <ul class="c_item">
            <li class="cw_item" v-for="(item, index) in productTypeList" :key="index">
              <div class="goods_pic">
                <router-link tag="a" :to="{path: '/cloudPurchase/goods', query: {id: item.id}}">
                  <img :src="item.src">
                </router-link>
              </div>
              <div class="goods_info">
                <p class="w_text"></p>
                <div class="w_progress_bar">
                  <p class="w_line">
                    <!--进度条由百分比控制-->
                    <span class="w_bar" :style="item.progress_bar">
                      <i class="color"></i>
                    </span>
                  </p>
                  <ul class="txt">
                    <li class="txt_1">总需{{item.total}}人次</li>
                    <li class="txt_2">剩余{{item.surplus}}</li>
                  </ul>
                </div>
                <div class="goods_short">
                  <router-link tag="a" :to="{name: 'member'}">
                    <div class="goods_shortFunc"></div>
                  </router-link>
                </div>
              </div>
              <div class="ten_area" v-if="item.isAea" :style="item.area"></div>
            </li>
          </ul>
        </div>
        <!--空数据--->
        <div class="empty"></div>
      </div>
    </section>

    <router-link tag="a" class="minicar" :to="{name: 'member', params: {id: 5}}">
      <b class="cart_count" style="display:none;"></b>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
import Swipe from '@/components/scroll/Swipe'
import SwipeItem from '@/components/scroll/SwipeItem'

export default {
  name: 'cloudPurchase',
  components: {SwipeItem, Swipe},
  created () {
    // console.log('params==', this.$router.params, 'query===', this.$router.query)
  },
  data () {
    return {
      go_back_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/back.png',
      go_member_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/snatch_person.png',
      productFlag: true,
      shopFlag: true,
      typeFlag: 0,
      totalFlag: 0,
      classType: 0,
      lunList: [
        {
          style: {
            'background-image': 'url(http://b2b2c.iskyshop.com/upload/show/e21cdfa5-f096-4f55-b6f5-a614cdbabfea.jpg)'
          }
        },
        {
          style: {
            'background-image': 'url(http://b2b2c.iskyshop.com/upload/show/8b2ab43c-5ed5-457c-ac0e-62c2f05503a5.jpg)'
          }
        },
        {
          style: {
            'background-image': 'url(http://b2b2c.iskyshop.com/upload/show/e21cdfa5-f096-4f55-b6f5-a614cdbabfea.jpg)'
          }
        },
        {
          style: {
            'background-image': 'url(http://b2b2c.iskyshop.com/upload/show/8b2ab43c-5ed5-457c-ac0e-62c2f05503a5.jpg)'
          }
        }
      ],
      newsProductList: [
        {
          name: '九阳豆浆机 DJ13B-D801SG 1300ML',
          src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
          id: 2
        },
        {
          name: '美固T20车载冰箱',
          src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/7f80e9bd-39ed-40b2-86c3-7c1a797c10cb.png',
          id: 3
        },
        {
          name: 'Coach 蔻驰 压花织纹皮革KYLIE斜挎包',
          src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/4866ff63-5108-495b-984a-95036d1f4a7f.jpg',
          id: 4
        }
      ],
      hotList: [
        {
          name: '九阳豆浆机 DJ13B-D801SG 1300ML',
          src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
          percentage: '0%',
          id: 1
        },
        {
          name: '九阳豆浆机 DJ13B-D801SG 1300ML',
          src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
          percentage: '0%',
          id: 2
        },
        {
          name: '九阳豆浆机 DJ13B-D801SG 1300ML',
          src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
          percentage: '0%',
          id: 3
        },
        {
          name: '九阳豆浆机 DJ13B-D801SG 1300ML',
          src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
          percentage: '0%',
          id: 4
        },
        {
          name: '九阳豆浆机 DJ13B-D801SG 1300ML',
          src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
          percentage: '0%',
          id: 5
        },
        {
          name: '九阳豆浆机 DJ13B-D801SG 1300ML',
          src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
          percentage: '0%',
          id: 6
        },
        {
          name: '九阳豆浆机 DJ13B-D801SG 1300ML',
          src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
          percentage: '0%',
          id: 7
        },
        {
          name: '九阳豆浆机 DJ13B-D801SG 1300ML',
          src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
          percentage: '0%',
          id: 8
        },
        {
          name: '独奏者第二代头戴式贴耳耳机 Solo2',
          src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/31cece45-dd0e-4ffe-89b4-9cf784f95cb7.jpg',
          percentage: '0%',
          id: 9
        },
        {
          name: '百草味 3袋组合装 | 金枕头榴莲干 30g/袋',
          src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/a54564e8-3d0c-4272-9f55-21039e2d557d.jpg',
          percentage: '0%',
          id: 10
        }
      ],
      shopList: [
        {
          name: '全部商品',
          classId: 0
        },
        {
          name: '手机平板',
          classId: 1
        },
        {
          name: '电脑办公',
          classId: 2
        },
        {
          name: '数码影音',
          classId: 3
        },
        {
          name: '女性时尚',
          classId: 4
        },
        {
          name: '美食天地',
          classId: 5
        },
        {
          name: '潮流新品',
          classId: 6
        },
        {
          name: '交通工具',
          classId: 7
        },
        {
          name: '其他商品',
          classId: 8
        }
      ],
      productTypeAll: [
        {
          classId: 0,
          productTypeList: [
            {
              id: 9,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: true,
              area: {
                backgroundImage: 'url(../../static/images/ten_division.png)'
              }
            },
            {
              id: 8,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: true,
              area: {
                backgroundImage: 'url(../../static/images/ten_division.png)'
              }
            },
            {
              id: 19,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 21,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 18,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: true,
              area: {
                backgroundImage: 'url(../../static/images/ten_division.png)'
              }
            },
            {
              id: 11,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 25,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 57,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            }
          ]
        },
        {
          classId: 1,
          productTypeList: [
            {
              id: 9,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/35ebafdb-8435-4d19-88dc-dd95ad609bf3.jpg',
              name: 'iPhone6 Plus 5.5英寸 64G 随机发放',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: true,
              area: {
                backgroundImage: 'url(../../static/images/ten_division.png)'
              }
            },
            {
              id: 8,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: true,
              area: {
                backgroundImage: 'url(../../static/images/ten_division.png)'
              }
            },
            {
              id: 19,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 21,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 18,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: true,
              area: {
                backgroundImage: 'url(../../static/images/ten_division.png)'
              }
            },
            {
              id: 11,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 25,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 57,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            }
          ]
        },
        {
          classId: 2,
          productTypeList: [
            {
              id: 9,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/0e0a8b54-c801-4a96-99bf-6427e0119520.jpg',
              name: 'Apple MacBook Pro 15.4英寸笔记本',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: true,
              area: {
                backgroundImage: 'url(../../static/images/ten_division.png)'
              }
            },
            {
              id: 8,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: true,
              area: {
                backgroundImage: 'url(../../static/images/ten_division.png)'
              }
            },
            {
              id: 19,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 21,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 18,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: true,
              area: {
                backgroundImage: 'url(../../static/images/ten_division.png)'
              }
            },
            {
              id: 11,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 25,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 57,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            }
          ]
        },
        {
          classId: 3,
          productTypeList: [
            {
              id: 9,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: true,
              area: {
                backgroundImage: 'url(../../static/images/ten_division.png)'
              }
            },
            {
              id: 8,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: true,
              area: {
                backgroundImage: 'url(../../static/images/ten_division.png)'
              }
            },
            {
              id: 19,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 21,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 18,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: true,
              area: {
                backgroundImage: 'url(../../static/images/ten_division.png)'
              }
            },
            {
              id: 11,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 25,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 57,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            }
          ]
        },
        {
          classId: 4,
          productTypeList: [
            {
              id: 9,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: true,
              area: {
                backgroundImage: 'url(../../static/images/ten_division.png)'
              }
            },
            {
              id: 8,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: true,
              area: {
                backgroundImage: 'url(../../static/images/ten_division.png)'
              }
            },
            {
              id: 19,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 21,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 18,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: true,
              area: {
                backgroundImage: 'url(../../static/images/ten_division.png)'
              }
            },
            {
              id: 11,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 25,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 57,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            }
          ]
        },
        {
          classId: 5,
          productTypeList: [
            {
              id: 9,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: true,
              area: {
                backgroundImage: 'url(../../static/images/ten_division.png)'
              }
            },
            {
              id: 8,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: true,
              area: {
                backgroundImage: 'url(../../static/images/ten_division.png)'
              }
            },
            {
              id: 19,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 21,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 18,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: true,
              area: {
                backgroundImage: 'url(../../static/images/ten_division.png)'
              }
            },
            {
              id: 11,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 25,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 57,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            }
          ]
        },
        {
          classId: 6,
          productTypeList: [
            {
              id: 9,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: true,
              area: {
                backgroundImage: 'url(../../static/images/ten_division.png)'
              }
            },
            {
              id: 8,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: true,
              area: {
                backgroundImage: 'url(../../static/images/ten_division.png)'
              }
            },
            {
              id: 19,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 21,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 18,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: true,
              area: {
                backgroundImage: 'url(../../static/images/ten_division.png)'
              }
            },
            {
              id: 11,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 25,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 57,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            }
          ]
        },
        {
          classId: 7,
          productTypeList: [
            {
              id: 9,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: true,
              area: {
                backgroundImage: 'url(../../static/images/ten_division.png)'
              }
            },
            {
              id: 8,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: true,
              area: {
                backgroundImage: 'url(../../static/images/ten_division.png)'
              }
            },
            {
              id: 19,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 21,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 18,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: true,
              area: {
                backgroundImage: 'url(../../static/images/ten_division.png)'
              }
            },
            {
              id: 11,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 25,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 57,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            }
          ]
        },
        {
          classId: 8,
          productTypeList: [
            {
              id: 9,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: true,
              area: {
                backgroundImage: 'url(../../static/images/ten_division.png)'
              }
            },
            {
              id: 8,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: true,
              area: {
                backgroundImage: 'url(../../static/images/ten_division.png)'
              }
            },
            {
              id: 19,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 21,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 18,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: true,
              area: {
                backgroundImage: 'url(../../static/images/ten_division.png)'
              }
            },
            {
              id: 11,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 25,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            },
            {
              id: 57,
              src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
              name: '九阳豆浆机 DJ13B-D801SG 1300ML',
              progress_bar: {
                width: '10%'
              },
              total: 100,
              surplus: 50,
              isAea: false
            }
          ]
        }
      ],
      productTypeList: [
        {
          id: 9,
          src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
          name: '九阳豆浆机 DJ13B-D801SG 1300ML',
          progress_bar: {
            width: '10%'
          },
          total: 100,
          surplus: 50,
          isAea: true,
          area: {
            backgroundImage: 'url(../../static/images/ten_division.png)'
          }
        },
        {
          id: 8,
          src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
          name: '九阳豆浆机 DJ13B-D801SG 1300ML',
          progress_bar: {
            width: '10%'
          },
          total: 100,
          surplus: 50,
          isAea: true,
          area: {
            backgroundImage: 'url(../../static/images/ten_division.png)'
          }
        },
        {
          id: 19,
          src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
          name: '九阳豆浆机 DJ13B-D801SG 1300ML',
          progress_bar: {
            width: '10%'
          },
          total: 100,
          surplus: 50,
          isAea: false
        },
        {
          id: 21,
          src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
          name: '九阳豆浆机 DJ13B-D801SG 1300ML',
          progress_bar: {
            width: '10%'
          },
          total: 100,
          surplus: 50,
          isAea: false
        },
        {
          id: 18,
          src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
          name: '九阳豆浆机 DJ13B-D801SG 1300ML',
          progress_bar: {
            width: '10%'
          },
          total: 100,
          surplus: 50,
          isAea: true,
          area: {
            backgroundImage: 'url(../../static/images/ten_division.png)'
          }
        },
        {
          id: 11,
          src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
          name: '九阳豆浆机 DJ13B-D801SG 1300ML',
          progress_bar: {
            width: '10%'
          },
          total: 100,
          surplus: 50,
          isAea: false
        },
        {
          id: 25,
          src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
          name: '九阳豆浆机 DJ13B-D801SG 1300ML',
          progress_bar: {
            width: '10%'
          },
          total: 100,
          surplus: 50,
          isAea: false
        },
        {
          id: 57,
          src: 'http://b2b2c.iskyshop.com/upload/cloudpurchaserelease/b1f2cbd6-9aac-41d6-9d74-2ea216e5e1f8.jpg',
          name: '九阳豆浆机 DJ13B-D801SG 1300ML',
          progress_bar: {
            width: '10%'
          },
          total: 100,
          surplus: 50,
          isAea: false
        }
      ]
    }
  },
  methods: {
    selectProduct () {
      this.productFlag = !this.productFlag
    },
    selectShopping () {
      this.shopFlag = !this.shopFlag
    },
    selectType (index) {
      if (index === 4) {
        if (this.totalFlag === 0) {
          this.totalFlag = 1
        } else if (this.totalFlag === 1) {
          this.totalFlag = 2
        } else {
          this.totalFlag = 1
        }
      } else {
        this.totalFlag = 0
      }
      this.typeFlag = index
    },
    selectProductList (index) {
      this.classType = index
      this.shopFlag = !this.shopFlag
      this.productTypeAll.forEach((item) => {
        if (item.classId === index) {
          this.productTypeList = item.productTypeList
          return false
        }
      })
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

  .main {
    background-color: #f5f5f5;
  }

  header {
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    position: fixed;
    top: 0;
    left: 0;
    text-align: center;
    background-color: #F94D4D;
    border-bottom: 1px solid #F75156;
    font-size: 0.5rem;
    color: #fff;
    z-index: 9;
  }

  .phone_hd .back {
    display: inline-block;
    float: left;
    height: inherit;
    width: 1rem;
    text-align: center;
    line-height: inherit;
  }

  .back img {
    height: inherit;
    margin-top: .2rem;
    width: .6rem;
  }

  .phone_hd .menu {
    display: inline-block;
    float: right;
    width: 1rem;
    text-align: center;
    line-height: inherit;
  }

  .menu > img {
    height: inherit;
    margin-top: .2rem;
    width: .6rem;
  }

  .select_product {
    display: flex;
    width: 100%;
    height: 1rem;
    position: relative;
    top: 1rem;
  }

  .select_product > div {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    height: inherit;
    background-color: #fff;
    border-bottom: solid 2px #d3d3d3;
  }

  .select_product > div.active {
    color: #F94D4D;
    border-bottom: solid 2px #F94D4D;
  }

  .product_main {
    width: 100%;
    overflow: hidden;
    margin-top: 2px;
    height: 100%;
    position: relative;
    top: 1rem;
  }

  .m_banner {
    width: 100%;
    position: relative;
    overflow: auto;
    height: 3.4rem;
  }

  .tempWrap {
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: inherit;
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

  .new_publish {
    background: #fff;
    border-top: 1px solid #dcdcdc;
    border-bottom: 1px solid #dcdcdc;
    margin-top: .3rem;
  }

  .title_h {
    height: .8rem;
    line-height: .8rem;
    font-weight: normal;
    color: #666;
    position: relative;
    font-size: 0.45rem
  }

  .title_h > span {
    display: inline-block;
    margin-left: .4rem;
    float: left;
  }

  .title_h > a {
    display: inline-block;
    float: right;
    margin-right: .4rem;
    color: #666;;
  }

  .index_model {
    display: inline-block;
    width: 100%;
  }

  .items_box {
    display: inline-block;
  }

  .items_box > li {
    display: inline-block;
    width: 33%;
    border-right: 1px solid #dcdcdc;
    float: left;
  }

  .items_box li:last-child {
    border: none;
  }

  .items_box > li > a {
    display: inline-block;
    width: 100%;
    font-size: .4rem;
    text-align: center;
  }

  .items_box > li > a > img {
    width: 80%;
  }

  .items_box > li > a > p {
    margin-top: .15rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #999;
    text-align: center;
  }

  .hot_more {
    margin-top: .15rem;
  }

  .model_g_box {
    display: inline-block;
  }

  .model_g_box > li {
    display: inline-block;
    width: 50%;
    float: left;
  }

  .model_info_box {
    padding: .2rem .15rem;
    border: 1px solid #dcdcdc;
    margin: 0 .1rem 0.15rem;
    background-color: #fff;
    color: #999;
  }

  .model_info_box .goods_pic {
    display: inline-block;
  }

  .model_info_box .goods_pic a {
    display: inline-block;
    text-align: center;
  }

  .model_info_box .goods_pic a img {
    width: 80%;
  }

  .w_progressBar {
    margin-right: 30%;
  }

  .w_text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: .2rem;
    font-size: .4rem;
  }

  .w_line {
    position: relative;
    margin-bottom: .2rem;
    height: 5px;
    border-radius: 5px;
    background-color: #EFEEEE;
    overflow: hidden;
  }

  .pro_text {
    font-size: .4rem;
  }

  .pro_text strong {
    color: #0079fe;
  }

  .model_info_box > a {
    position: relative;
    display: inline-block;
    float: right;
    margin-top: .3rem;
  }

  .goods_shortFunc {
    width: .888rem;
    height: .888rem;
    background: url(../../../static/images/snatch_add.png) no-repeat;
    background-size: .888rem .888rem;
    position: absolute;
    right: .138rem;
    bottom: .222rem;
  }

  .empty {
    background-color: #f5f5f5;
    height: 1rem;
  }

  .minicar {
    background: url(../../../static/images/snatch_shopcar.png) no-repeat;
    background-size: 1.33rem 1.33rem;
    width: 1.33rem;
    height: 1.33rem;
    position: fixed;
    bottom: .25rem;
    left: .3rem;
    z-index: 2;
    color: #fff;
  }

  .bh_sh {
    position: relative;
    top: 1rem;
    margin-top: 2px;
    background-color: #fff;
  }

  .pro_ul {
    overflow: hidden;
    background-color: #eee;
    border-bottom: 1px solid #d5d5d5;
    display: flex;
  }

  .pro_ul > li {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    height: .9rem;
  }

  .select_all {
    position: relative;
  }

  .pro_ul > li:first-child {
    flex: 1.2;
  }

  .pro_ul > li:nth-child(2) {
    flex: .6;
  }

  .pro_ul > li:nth-child(3) {
    flex: .6;
  }

  .pro_ul > li:nth-child(4) {
    flex: 1.2;
  }

  .pro_ul > li:last-child {
    flex: 1.2;
  }

  .pro_ul > li > a {
    color: #999;
    font-size: .4rem;
  }

  .pro_ul > li.selected > a {
    color: red;
  }

  .icon {
    margin-left: 4px;
    margin-top: -2px;
    transition: all 0.3s ease 0s;
    width: 3px;
    height: 3px;
    border-width: 2px;
    display: inline-block;
    border-style: none none solid solid;
    vertical-align: middle;
  }

  .icon_up {
    transform: rotate(135deg);
  }

  .icon_down {
    transform: rotate(-45deg);
  }

  .ico_sort2Arrow {
    margin-top: -2px;
    margin-left: 3px;
    width: 8px;
    height: 11px;
    position: relative;
    background: none;
    display: inline-block;
    vertical-align: middle;
  }

  .ico_sort2Arrow::before, .ico_sort2Arrow::after {
    content: "";
    position: absolute;
    display: block;
    width: 3px;
    height: 3px;
    border: 2px solid #b2b2b2;
    border-top: 0;
    border-right: 0;
  }

  .ico_sort2Arrow::before {
    top: 1px;
    left: 1px;
    transform: rotate(135deg);
  }

  .ico_sort2Arrow::after {
    top: 5px;
    left: 1px;
    transform: rotate(-45deg);
  }

  .up::before {
    border-color: #db3625;
  }

  .down::after {
    border-color: #db3625;
  }

  .type_select {
    position: fixed;
    display: inline-block;
    top: 3rem;
    left: 0;
    z-index: 9;
    background-color: #fff;
  }

  .type_select > ul {
    margin: 0 .3rem;
  }

  .type_select > ul > li {
    display: inline-block;
    width: 33%;
    line-height: 35px;
    border-bottom: 1px solid #D5D5D5;
    text-align: center;
    float: left;
  }

  .type_select > ul > li > a {
    color: #999;
    display: inline-block;
    font-size: .4rem;
  }

  .type_select > ul > li.m_selected > a {
    color: red;
  }

  .pro_show {
    width: 100%;
  }

  .pro_show .cw_item {
    padding: .2rem;
    border-bottom: 1px solid #DCDCDC;
    position: relative;
    overflow: hidden;
  }

  .cw_item .goods_pic {
    width: 25%;
    height: 2.5rem;
    display: inline-block;
    float: left;
  }

  .cw_item .goods_pic a {
    height: inherit;
  }

  .cw_item .goods_pic a img {
    height: inherit;
  }

  .cw_item .goods_info {
    display: inline-block;
    width: 74%;
    height: 2.5rem;
    float: left;
    margin-left: 1%;
    position: relative;
  }

  .cw_item .goods_info .w_text {
    height: .8rem;
  }

  .cw_item .goods_info .w_progress_bar {

  }

  .cw_item .goods_info .w_progress_bar .w_line {
    width: 80%;
    margin-bottom: .3rem;
  }

  .w_bar {
    width: 0;
    background-color: red;
    height: inherit;
    display: inherit;
  }

  .txt {
    width: 80%;
    font-size: .3rem;
    color: #999;
  }

  .txt > li {
    display: inline-block;
  }

  .txt > .txt_1 {
    float: left;
  }

  .txt > .txt_2 {
    float: right;
    color: #0079FE;
  }

  .cw_item .goods_info .goods_short {
    display: inline-block;
    position: absolute;
    right: -0.138rem;
    bottom: .388rem;
  }

  .cw_item .ten_area {
    position: absolute;
    left: .18rem;
    top: 0.29rem;
    /*background-image: url(../../static/images/ten_division.png);*/
    background-repeat: no-repeat;
    background-size: .694rem .694rem;
    width: .694rem;
    height: .694rem;
  }
</style>
