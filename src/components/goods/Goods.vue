<template>
  <div class="m-main">
    <!--头部内容-->
    <header class="m-top" ref="scrollTop">
      <div class="m-d">
        <ul class="m-ul">
          <li>
            <a @click="goBack">
              <img :src="go_back_src">
            </a>
          </li>
          <li>
            <a @click="selectGoodsInfo(0)">
              <span :class="selectType === 0 ? 'm-t m-active' : 'm-t'">商品</span>
            </a>
          </li>
          <li class="m-mid">
            <a @click="selectGoodsInfo(1)">
              <span :class="selectType === 1 ? 'm-t m-active' : 'm-t'">详情</span>
            </a>
          </li>
          <li>
            <a @click="selectGoodsInfo(2)">
              <span :class="selectType === 2 ? 'm-t m-active' : 'm-t'">评价</span>
            </a>
          </li>
          <li>
            <a @click="showMenu">
              <img :src="go_menu_src">
            </a>
          </li>
        </ul>
      </div>
    </header>

    <!---底部内容-->
    <div class="m-footer" v-show="isMenu">
      <footer-list2 :index="index" ref="groupFooter"></footer-list2>
    </div>

    <!--商品基本信息-->
    <div :class="selectType === 0 ? 'goods-comm goods-active' : 'goods-comm'" id="wrapper" ref="wrapper">
      <div id="scroller" ref="scroller">
        <ul>
          <li class="sc-li m-lun" ref="itemBes">
            <div class="m-bar">
              <div class="temp-wrap">
                <swipe class="my-swipe" ref="mySwipe">
                  <swipe-item v-for="(item, index) in lunList" :key="index" class="slide"
                              :style="item.style"></swipe-item>
                </swipe>
              </div>
              <div class="m-info">
                <ul>
                  <li class="m-li m-name">
                    <span>{{goods.name}}</span>
                  </li>
                  <li class="m-li m-price">
                    <span>商城价格￥</span>
                    <span class="price">{{goods.price}}</span>
                    <span class="market">{{goods.market}}</span>
                  </li>
                  <li class="m-li">
                    <a class="m-left">
                      <span class="m-send">送至：</span>
                      <span class="m-target">
                        <label v-for="(item, index) in areaArray" :key="index" class="m-textarea" @click="showAddress">
                          {{item}}
                        </label>
                        <label class="m-street">{{street}}</label>
                      </span>
                      <i class="m-delivery" @click="selectAddress"></i>
                    </a>
                    <a class="m-right">
                      <span class="m-huo">{{goods.state}}</span>
                    </a>
                  </li>
                  <li class="m-li">
                    <a class="m-left">
                      <span>运费</span>
                      <span class="freight">￥{{goods.freight}}</span>
                    </a>
                    <a class="m-right">
                      <span>总销量：</span>
                      <span>{{goods.total}}件数</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="sc-li m-num" ref="itemDes">
            <div class="detail-sel">
              <span class="">已选规格:</span>
              <span class="">数量<b>x{{goods.count}}</b>支持货到付款</span>
              <span class="sel-img" @click="selectNum">
                <img :src="select_src">
              </span>
            </div>
          </li>
          <li class="sc-li" ref="itemEes">
            <div class="detail-shop">
              <ul>
                <li class="ds">
                  <router-link tag="a" class="de-img" :to="{path: '/store', query: {id: goods.id}}">
                    <dl class="de-left">
                      <img :src="goods.shopLogo">
                    </dl>
                    <dl class="de-right">
                      <dt class="de-name">{{goods.shopName}}</dt>
                      <dt class="address">[{{goods.targetArea.province}}]{{goods.targetArea.city}}</dt>
                    </dl>
                  </router-link>
                </li>
                <li class="ds">
                  <div class="normal">
                    <span>描述相符</span>
                    <span class="m-points">{{goods.describe}}</span>
                    <span class="bg-img"></span>
                  </div>
                  <div class="normal">
                    <span>服务态度</span>
                    <span class="m-points">{{goods.service}}</span>
                    <span class="bg-img"></span>
                  </div>
                  <div class="normal">
                    <span>发货速度</span>
                    <span class="m-points">{{goods.speed}}</span>
                    <span class="bg-img"></span>
                  </div>
                </li>
                <li class="ds">
                  <div class="sp-in">
                    <router-link tag="a" :to="{path: '/storeGoods', query: {id: goods.id}}">全部商品</router-link>
                    <router-link tag="a" :to="{path: '/store', query: {id: goods.id}}">进入店铺</router-link>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li class="sc-li" ref="itemFec">
            <div class="detail-like">
              <h3 class="like-title">猜你喜欢</h3>
              <div class="like-main">
                <ul>
                  <li class="pic" v-for="(item, index) in goodsLikeList" :key="index">
                    <a>
                      <div class="fp">
                        <img :src="item.src">
                      </div>
                      <div class="fn">{{item.name}}</div>
                      <div class="fv">￥{{item.price}}</div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="sc-li" ref="itemGes">
            <div class="detail-c">
              <div class="detail-txt">
                <ul>
                  <li v-for="(item, index) in goodsInfoList" :key="index">
                    <span class="name">{{item.name}}</span>
                    <b class="text">{{item.text}}</b>
                  </li>
                </ul>
              </div>
              <div class="detail-img">
                <img v-for="(item, index) in goodsImageList" :key="index" :src="item.src">
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!--商品详情-->
    <div :class="selectType === 1 ? 'goods-comm goods-active' : 'goods-comm'" id="g_detail_c_id" ref="detailInfo">
      <div class="g_detail_c" id="g_detail_c_g" ref="detailGoods">
        <ul class="g_detail_ul" ref="detailShow">
          <li class="g_detail_li" ref="detailText" :style="detailObject">
            <div class="g_detail_text">
              <ul>
                <li v-for="(item, index) in goodsInfoList" :key="index">
                  <span class="name">{{item.name}}</span><b class="text">{{item.text}}</b>
                </li>
              </ul>
            </div>
          </li>
          <li class="g_detail_li" ref="detailImage">
            <div class="g_detail_img">
              <img v-for="(item, index) in goodsImageList" :key="index" :src="item.src">
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!--评价-->
    <div :class="selectType === 2 ? 'goods-comm goods-active' : 'goods-comm'" id="goods-evaluate" ref="evaluateInfo">
      <div id="goods-eval">
        <ul class="evaluate-box">
          <li :style="evaluateObject">
            <div class="evaluate-title">
              <ul>
                <li v-for="(item, index) in evalList" :key="index">
                  <a :class="index === evaluateIndex ? 'evaluate-self' : ''" @click="selectEvaluate(item.num, index)">{{item.name}}({{item.num}})</a>
                </li>
              </ul>
            </div>
          </li>
          <li v-for="(item, index) in evaluateList" :key="index">
            <div class="cmt-eval">
              <div class="cmt_user">
                <span class="user">{{item.username}}</span>
                <span class="tip">({{item.vipLevel}})</span>
                <span class="credit"></span>
                <span class="date">{{item.date}}</span>
              </div>
              <div class="cmt_cnt">{{item.content}}</div>
              <div class="cmt_att">
                <span class="img" v-for="(it, idx) in item.imageList" :key="idx">
                  <img :src="it.src">
                </span>
              </div>
              <div class="cmt_sku">
                <div class="cmt_sku_tool">
                  <span v-for="(types, idex) in item.goodsType" :key="idex">{{types.name}}</span>
                </div>
                <div class="cmt_sku_tool">
                  <a class="favor">
                    <i class="heart"></i>
                    <span>{{item.heart}}</span>
                  </a>
                  <a class="reply_btn">
                    <i class="like"></i>
                    <span>{{item.like}}</span>
                  </a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!--底部选择--->
    <div class="detail-nav" ref="navItem">
      <ul>
        <li>
          <a class="consult c-mm" @click="goTalked">
            <dl>
              <dt></dt>
              <dd>咨询</dd>
            </dl>
          </a>
        </li>
        <li>
          <a class="go-shop c-mm" @click="goShop">
            <dl>
              <dt></dt>
              <dd>进店</dd>
            </dl>
          </a>
        </li>
        <li>
          <a class="store c-mm" @click="joinStore">
            <dl>
              <dt></dt>
              <dd>收藏</dd>
            </dl>
          </a>
        </li>
        <li class="go-car">
          <a @click="joinCart">
            购物车
          </a>
        </li>
        <li class="go-buy">
          <a @click="goBuy">
            立即购买
          </a>
        </li>
      </ul>
    </div>

    <!--选择购买--->
    <transition name="down-up">
      <div class="m-buy" v-show="isSelect">
        <div class="model-buy">
          <div class="buy-info">
            <div class="model_pic">
              <img :src="defaultGoods.image">
            </div>
            <div class="model_text">
              <ul>
                <li class="model-value">￥<span>{{defaultGoods.price}}</span></li>
                <li class="model-amount">库存：<span>{{defaultGoods.store}}</span></li>
              </ul>
            </div>
          </div>
          <div class="model_standard">
            <div class="model-type">
              <div v-for="(item, index) in goodsTypeList" :key="index">
                <h4 class="standard_title">{{item.typeNo}}</h4>
                <ul class="model-select">
                  <li v-for="(it, idx) in item.selectTypeList" :class="idx === 0 ? 'self' : ''"
                      :key="idx">
                    <a @click="changeGoods(index, idx, $event)">{{it.name}}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="buy-num">
            <div class="model_amount">
              <h4 class="amount_title">数量<span></span></h4>
              <ul>
                <li class="reduce">
                  <a @click="reduceBuy">
                    <img :src="reduce_src">
                  </a>
                </li>
                <li class="input_text">
                  <input type="number" v-model="count" @keyup="inputNumber">
                </li>
                <li class="add">
                  <a @click="addBuy">
                    <img :src="add_src">
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="buy-order">
            <ul class="model_standard_btns">
              <li class="g_detail_shopcar_in">
                <a @click="joinCart">加入购物车</a>
              </li>
              <li class="g_detail_buy_now">
                <a @click="buyGoods">立即购买</a>
              </li>
            </ul>
          </div>
          <div class="close_btn">
            <a @click="closeBuy"><img :src="close_src"></a>
          </div>
        </div>
      </div>
    </transition>

    <!--选择城市-->
    <div class="m-address" v-show="isAddress">
      <city-picker @closedAdd="closedAddress" @changeStreetStr="changeStreet" @changeAreaArray="changeArea"></city-picker>
    </div>

    <!--购物车-->
    <div class="cart-link">
      <a @click="goCart"></a>
    </div>
  </div>
</template>

<script>
import FooterList2 from '@/components/common/FooterList2'
import BScroll from 'better-scroll'
import Swipe from '@/components/scroll/Swipe'
import SwipeItem from '@/components/scroll/SwipeItem'
import CityPicker from '@/components/cityPicker/CityPicker'
import {addStoreCart, areaStreet} from '@/store/soterData'
import 'vue2-toast/lib/toast.css'

export default {
  name: 'goods',
  components: {CityPicker, FooterList2, Swipe, SwipeItem},
  created () {
    // 初始化数据
    let evaluate = {
      id: 1,
      username: 'Jack',
      vipLevel: '金牌会员',
      date: '2018-11-25',
      content: '手机用了几天，非常喜欢，滑盖设计很喜欢，玩游戏很流畅，很爽，无线充电方便了很多，拍照功能强大的多，尤其是960帧慢动作，最近下雪，拍出来的效果真好。很喜欢😍',
      goodsType: [
        {
          name: '颜色：黑色'
        },
        {
          name: '型号：全网通6GB+128GB'
        }
      ],
      heart: 4,
      like: 5,
      imageList: [
        {
          src: 'https://img30.360buyimg.com/shaidan/s128x96_jfs/t1/10631/6/2379/128420/5be0f74dEcb32f74b/00fb6095548c5cbb.jpg!cc_100x100!q70.dpg'
        },
        {
          src: 'https://img30.360buyimg.com/shaidan/s128x96_jfs/t1/4222/2/16053/73770/5be0f74dE7f02662f/c069640ec2f4524e.jpg!cc_100x100!q70.dpg'
        },
        {
          src: 'https://img30.360buyimg.com/shaidan/s128x96_jfs/t1/10026/36/2321/84479/5be0f74eEd4743082/47d3b1f5f0a848cb.jpg!cc_100x100!q70.dpg'
        },
        {
          src: 'http://b2b2c.iskyshop.com/upload/store/6/8e5ca980-6749-4fe4-9a3f-5a27c7a4fd41.jpg'
        }
      ]
    }

    this.evaluateList = Array(12).fill(evaluate)

    this.$nextTick(() => {
      this.initScroll()
    })
  },
  mounted () {
    this.$nextTick(() => {
      this.initDetail()
    })
    this.$nextTick(() => {
      this.initEvaluate()
    })
  },
  data () {
    return {
      index: 11,
      isMenu: false,
      isSelect: false,
      isAddress: false,
      isStop: null,
      selectType: 0,
      count: 1,
      evaluateIndex: 0,
      go_back_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/g_arow1.png',
      go_menu_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/c_shortcut.png',
      select_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/g_detail_4.png',
      close_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/g_detail_13.png',
      add_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/g_detail_15.png',
      reduce_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/g_detail_14.png',
      areaArray: ['广西壮族自治区', '北海市', '铁山港区'],
      street: '南康镇',
      detailObject: {},
      evaluateObject: {},
      defaultGoods: {
        id: 23,
        store: 45,
        price: 3299,
        market: 2999,
        count: 1,
        shopName: '百货店',
        titleName: '美即（Magic）胶原弹力眼膜 3g×10对',
        image: 'http://b2b2c.iskyshop.com/upload/store/6/8e5ca980-6749-4fe4-9a3f-5a27c7a4fd41.jpg',
        address: {}, // 收货地址
        goodsTypeList: [
          {
            typeNo: '颜色',
            typeName: '香槟金'
          },
          {
            typeNo: '规格',
            typeName: '官方标配'
          },
          {
            typeNo: '版本',
            typeName: '4G 64G'
          }
        ]
      },
      lunList: [
        {
          style: {
            'background-image': 'url(http://b2b2c.iskyshop.com/upload/store/13/2016/01/23/9f225d77-8245-4263-adb0-a955c55c2aeb.jpg)'
          }
        },
        {
          style: {
            'background-image': 'url(http://b2b2c.iskyshop.com/upload/store/13/2016/01/23/1ee09302-13cb-4f4d-9633-ba814ecbf33e.jpg)'
          }
        },
        {
          style: {
            'background-image': 'url(http://b2b2c.iskyshop.com/upload/store/13/2016/01/23/61c26702-cc28-4829-82b2-10877f2eeb99.jpg)'
          }
        },
        {
          style: {
            'background-image': 'url(http://b2b2c.iskyshop.com/upload/store/13/2016/01/23/b269031c-078f-4d15-9478-9e49059e5d30.jpg)'
          }
        }
      ],
      goodsLikeList: [
        {
          src: 'http://b2b2c.iskyshop.com/upload/store/13/2016/01/23/1519add9-ab74-418b-bebd-77e1daaefcbe.jpg_small.jpg',
          name: '美即（Magic）海洋冰泉补水10片海洋冰泉补水5片牛奶白滑10片洋甘菊舒缓5片',
          price: 399.0
        },
        {
          src: 'http://b2b2c.iskyshop.com/upload/store/13/2016/01/23/1519add9-ab74-418b-bebd-77e1daaefcbe.jpg_small.jpg',
          name: '美即（Magic）海洋冰泉补水10片海洋冰泉补水5片牛奶白滑10片洋甘菊舒缓5片',
          price: 399.0
        },
        {
          src: 'http://b2b2c.iskyshop.com/upload/store/13/2016/01/23/1519add9-ab74-418b-bebd-77e1daaefcbe.jpg_small.jpg',
          name: '美即（Magic）海洋冰泉补水10片海洋冰泉补水5片牛奶白滑10片洋甘菊舒缓5片',
          price: 399.0
        }
      ],
      goods: {
        id: 5,
        name: '美即（Magic）胶原弹力眼膜 3g×10对',
        price: 29.99,
        market: 49.99,
        state: '有货',
        total: 99,
        count: 1,
        shopName: '百货店',
        shopLogo: 'http://b2b2c.iskyshop.com/upload/store_logo/11c3d54b-41cd-4f92-8d21-77b1415533c5.png',
        describe: 5.20,
        service: 3.00,
        speed: 2.00,
        freight: 0.00,
        targetArea: {
          province: '辽宁省',
          city: '沈阳市'
        },
        province: {
          id: 1,
          name: '广西'
        },
        city: {
          id: 2,
          name: '北海市'
        },
        area: {
          id: 3,
          name: '海城区'
        },
        town: {
          id: 4,
          name: '朝阳镇'
        }
      },
      goodsInfoList: [
        {
          name: '商品名称：',
          text: '美图手机V4（极光白）64G'
        },
        {
          name: '上架时间：',
          text: '2016-01-21'
        },
        {
          name: '商品名称：',
          text: '美图手机V4（极光白）64G'
        },
        {
          name: '上架时间：',
          text: '2016-01-21'
        },
        {
          name: '商品名称：',
          text: '美图手机V4（极光白）64G'
        },
        {
          name: '上架时间：',
          text: '2016-01-21'
        },
        {
          name: '商品名称：',
          text: '美图手机V4（极光白）64G'
        },
        {
          name: '上架时间：',
          text: '2016-01-21'
        },
        {
          name: '价格：',
          text: '3100-4299'
        },
        {
          name: '网络：',
          text: '其它'
        }
      ],
      goodsImageList: [
        {
          src: 'http://b2b2c.iskyshop.com/upload/store/6/531cbf8a-51f6-4bd2-b274-2776e3334a1f.jpg'
        },
        {
          src: 'http://b2b2c.iskyshop.com/upload/store/6/4e2f4bc0-ddf3-4212-93fd-29caf86e4c6d.jpg'
        },
        {
          src: 'http://b2b2c.iskyshop.com/upload/store/6/1c28a381-6d3f-41b1-81ec-366334cf2234.jpg'
        },
        {
          src: 'http://b2b2c.iskyshop.com/upload/store/6/1c28a381-6d3f-41b1-81ec-366334cf2234.jpg'
        }
      ],
      goodsTypeList: [
        {
          typeNo: '颜色',
          selectTypeList: [
            {
              id: 2,
              name: '香槟金',
              image: 'http://b2b2c.iskyshop.com/upload/store/6/8e5ca980-6749-4fe4-9a3f-5a27c7a4fd41.jpg'
            },
            {
              name: '沙滩金',
              image: 'http://b2b2c.iskyshop.com/upload/store/3/7c30e3b0-6e85-40f2-b02f-4cac5c596f90.jpg'
            },
            {
              id: 22,
              name: '深蓝色',
              image: 'http://b2b2c.iskyshop.com/upload/store/3/7c30e3b0-6e85-40f2-b02f-4cac5c596f90.jpg'
            },
            {
              id: 13,
              name: '玫丽红',
              image: 'http://b2b2c.iskyshop.com/upload/store/3/dcf3d009-08d4-4616-82aa-50b31e22941c.jpg'
            },
            {
              id: 24,
              name: '幻黑色',
              image: 'http://b2b2c.iskyshop.com/upload/store/3/3082f63b-cbcb-40af-8827-5de916f05d0f.jpg'
            }
          ]
        },
        {
          typeNo: '规格',
          selectTypeList: [
            {
              name: '全网通高配'
            },
            {
              name: '官方标配'
            },
            {
              name: '联通优惠购'
            },
            {
              name: '移动优惠购'
            },
            {
              name: '电信优惠购'
            }
          ]
        },
        {
          typeNo: '版本',
          selectTypeList: [
            {
              name: '4G 32G',
              price: 1999,
              store: 204,
              market: 2099
            },
            {
              name: '4G 64G',
              price: 2299,
              store: 156,
              market: 2399
            },
            {
              name: '6G 64G',
              price: 2499,
              store: 98,
              market: 2599
            },
            {
              name: '6G 128G',
              price: 2899,
              store: 125,
              market: 2999
            },
            {
              name: '8G 256G',
              price: 2999,
              store: 52,
              market: 3099
            },
            {
              name: '8G 512G',
              price: 3999,
              store: 36,
              market: 4099
            }
          ]
        }
      ],
      evalList: [
        {
          num: 6291,
          name: '全部'
        },
        {
          num: 3120,
          name: '好评'
        },
        {
          num: 2394,
          name: '中评'
        },
        {
          num: 152,
          name: '差评'
        },
        {
          num: 108,
          name: '晒单'
        }
      ],
      evaluateList: []
    }
  },
  methods: {
    goTalked () {
      // 交流
    },
    goShop () {
      // 进店
    },
    joinStore () {
      // 加入收藏
    },
    goBuy () {
      if (this.$cookies.get('token')) {
        // 处理购物
      } else {
        this.$router.push({path: '/toLogin'})
      }
    },
    goCart () {
      this.$router.push({path: '/cart'})
    },
    goBack () {
      this.$router.go(-1)
    },
    showMenu () {
      this.isMenu = !this.isMenu
    },
    selectGoodsInfo (index) {
      this.selectType = index
      if (index === 1) {
        this.detailObject.position = 'relative'
      } else if (index === 2) {
        this.evaluateObject.position = 'relative'
      }
    },
    initEvaluate () {
      this.$nextTick(() => {
        if (!this.evaluate) {
          this.evaluate = new BScroll(this.$refs.evaluateInfo, {
            startY: 0,
            click: true,
            scrollX: false,
            scrollY: true,
            eventPassthrough: 'horizontal',
            probeType: 2, // 开启监听事件
            maxScrollY: 0,
            y: 0,
            scrollbar: {
              fade: true,
              interactive: false
            },
            pullDownRefresh: {
              threshold: 50,
              stop: 20
            },
            pullUpLoad: {
              threshold: 50
            }
          })
        } else {
          this.evaluate.refresh()
        }
        this.evaluate.on('scroll', this.scrollStart)
        // 注册监听事件 scrollEnd
        this.evaluate.on('scrollEnd', this.scrollEnd)
      })
    },
    scrollStart (props) {
      // console.log('start--props', props)
    },
    scrollEnd (props) {
      // console.log('props', props, '\n', this.evaluate)
      if (Math.abs(props.y) >= Math.abs(this.evaluate.absStartY)) {
        console.log('到底部=', props.y)
        if (this.isStop) {
          console.log('清除定时任务=', this.isStop)
          window.clearTimeout(this.isStop)
          // 重新获取
          this.isStop = window.setTimeout(() => {
            // 获取数据
            this.evaluateData()
            this.isStop = null
          }, 200)
        } else {
          this.isStop = window.setTimeout(() => {
            // 获取数据
            this.evaluateData()
            this.isStop = null
          }, 200)
        }
      }
    },
    initDetail () {
      // console.log('height==detailShow===', this.$refs.detailShow.getBoundingClientRect().height)
      this.$nextTick(() => {
        if (!this.detail) {
          this.detail = new BScroll(this.$refs.detailInfo, {
            startY: 0,
            click: true,
            scrollX: false,
            scrollY: true,
            eventPassthrough: 'horizontal',
            scrollbar: {
              fade: true,
              interactive: false
            }
          })
        } else {
          this.detail.refresh()
        }
      })
    },
    initScroll () {
      console.log('height===scroller====', this.$refs.scroller.getBoundingClientRect())
      this.$nextTick(() => {
        if (this.scroll) {
          this.scroll.refresh()
        } else {
          this.scroll = new BScroll(this.$refs.wrapper, {
            startY: 0,
            click: true,
            scrollX: false,
            scrollY: true,
            eventPassthrough: 'horizontal',
            scrollbar: {
              fade: true,
              interactive: false
            }
          })
        }
      })
    },
    selectNum () {
      this.isSelect = true
    },
    closeBuy () {
      this.isSelect = false
      this.goods.count = this.count
      this.defaultGoods.count = this.count
    },
    changeGoods (index, idx, event) {
      if (event.target.parentElement.classList.contains('self')) {
        return false
      }
      event.target.parentElement.classList.toggle('self', true)
      Array.from(event.target.parentElement.parentElement.children).forEach((item) => {
        if (item !== event.target.parentElement && item.classList.contains('self')) {
          item.classList.remove('self')
        }
      })
      let obj = this.goodsTypeList[index]
      //  console.log('obj==', obj)
      this.defaultGoods.goodsTypeList[index].typeNo = obj.typeNo
      let item = this.goodsTypeList[index].selectTypeList[idx]
      this.defaultGoods.goodsTypeList[index].typeName = item.name
      // console.log('item=', item)
      // console.log('defaultGoods=', this.defaultGoods)
      Object.keys(this.defaultGoods).forEach((key) => {
        if (item[key]) {
          this.defaultGoods[key] = item[key]
        }
      })
    },
    addBuy () {
      if (this.count > this.defaultGoods.store) {
        this.count = this.defaultGoods.store
      } else {
        ++this.count
      }
    },
    reduceBuy () {
      if (this.count === 1) {
        this.count = 1
      } else {
        --this.count
      }
    },
    inputNumber () {
      if (/^((-\d+)|(0+))$/.test(this.count + '')) {
        this.count = 1
      }
    },
    joinCart () {
      this.defaultGoods.address = {areaArray: this.areaArray, street: this.street}
      // this.$store.commit('storeCart', this.defaultGoods)
      // this.$store.commit('areaStreet', this.defaultGoods.address)
      addStoreCart(this.defaultGoods)
      areaStreet(this.defaultGoods.address)
      this.$toast.center('成功加入购物车')
    },
    buyGoods () {
      if (this.$cookies.get('token')) {

      } else {
        this.$router.push({path: '/toLogin'})
      }
    },
    selectAddress () {
      this.isAddress = true
    },
    changeArea (area) {
      this.areaArray = area
    },
    changeStreet (street) {
      this.street = street
    },
    closedAddress (closed) {
      this.isAddress = closed
    },
    showAddress () {
      this.$toast(this.areaArray.join('-') + '-' + this.street, {type: 'center', duration: 2500, width: '100%', wordWrap: true})
    },
    selectEvaluate (num, index) {
      this.evaluateIndex = index
      let item = this.evaluateList.slice(0, 1).pop()
      this.evaluateList = Array(50 - index).fill(item)
    },
    evaluateData () {
      console.log('获取数据')
    },
    pullingDown () {
      // 模拟更新数据
      console.log('pulling down and load data')
      setTimeout(() => {
        console.log(666)
      }, 2000)
    },
    pullingUp () {
      // 更新数据
      console.log('pulling up and load data')
      setTimeout(() => {
        console.log(99)
      }, 1500)
    },
    clickItem () {
      console.log('item')
    }
  }
}
</script>

<style scoped>
  i, b, address {
    text-decoration: none;
    font-style: normal;
    font-weight: lighter;
  }

  .m-main {
    background-color: #f5f5f5;
    font-size: .4rem;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .m-top {
    background-color: #fff;
    height: 1rem;
    width: 100%;
    z-index: 2;
    top: 0;
    left: 0;
    position: fixed;
  }

  .m-ul {
    display: flex;
    width: 100%;
    height: inherit;
    flex-flow: row wrap;
  }

  .m-ul li {
    display: flex;
    flex: 1;
    height: inherit;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .m-mid::before {
    content: "";
    border-left: solid 1px #e1e1e1;
    position: absolute;
    height: .6rem;
    left: 0;
  }

  .m-mid::after {
    content: "";
    border-left: solid 1px #e1e1e1;
    position: absolute;
    height: .6rem;
    right: 0;
  }

  .m-ul > li > a {
    display: inline-block;
    height: 1rem;
    width: 100%;
    text-align: center;
    line-height: 1rem;
  }

  .m-ul li:first-child a > img {
    width: 37%;
    display: inherit;
    height: initial;
    margin-top: .1rem;
    margin-left: .2rem;
  }

  .m-ul > li > a > img {
    width: 50%;
  }

  .m-active {
    color: #fe3837;
    border-bottom: solid 2px #fe3837;
  }

  .m-footer {
    position: absolute;
    top: 1rem;
    left: 0;
    height: 1.6rem;
    width: 100%;
    z-index: 2;
  }

  .goods-comm {
    display: none;
  }

  .goods-comm.goods-active {
    display: block;
  }

  #wrapper {
    position: absolute;
    z-index: 1;
    top: 1rem;
    left: 0;
    bottom: 1.4rem;
    width: 100%;
    overflow: hidden;
  }

  #scroller {
    position: absolute;
    z-index: 1;
    width: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    transform: translateZ(0);
    -webkit-touch-callout: none;
    user-select: none;
    text-size-adjust: none;
    touch-action: none;
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

  .sc-li {
    background-color: #fff;
    margin-top: .35rem;
  }

  .sc-li:first-child {
    margin-top: 0;
  }

  .m-lun {
    box-shadow: 0 2px 2px #c8c8c8;
  }

  .m-bar {
    border-top: 1px solid #e1e1e1;
    width: 100%;
  }

  .temp-wrap {
    height: 320px;
    width: 320px;
    margin: .5rem auto 0;
  }

  .m-info {
    box-shadow: 0 2px 2px #c8c8c8;
  }

  .m-info > ul {
    padding-bottom: 3%;
    margin: 0 auto;
    width: 94%;
  }

  .m-li {
    color: #7b7b7b;
    width: 100%;
    display: inline-block;
  }

  .m-name {
    height: .8rem;
    line-height: .8rem;
    color: #333;
    text-align: left;
    overflow: hidden;
  }

  .m-price {
    color: red;
    height: 1rem;
    line-height: 1rem;
    text-align: left;
    overflow: hidden;
    border-bottom: dashed 1px #adadad;
    margin-bottom: .3rem;
  }

  .m-price > span {
    vertical-align: top;
    float: left;
  }

  .m-price > span:first-child {
    font-size: .45rem;
  }

  .price {
    font-size: .5rem;
  }

  .m-left {
    display: inline-block;
    height: .556rem;
    line-height: .556rem;
  }

  .m-left > span {
    display: inline-block;
    vertical-align: top;
    float: left;
  }

  .m-left > span > b {
    float: left;
    margin-right: .15rem;
  }

  .m-right {
    display: inline-block;
    height: .556rem;
    line-height: .556rem;
    vertical-align: top;
    float: right;
  }

  .m-right > span {
    display: inline-block;
    vertical-align: top;
  }

  .market {
    color: #7b7b7b;
    text-decoration: line-through;
    margin-left: .4rem;
  }

  .m-send {
    color: #7B7B7B;
    font-size: .4rem;
  }

  .m-target {
    margin-left: .1rem;
  }

  .m-textarea {
    display: inline-block;
    float: left;
    text-overflow:ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 1.2rem;
    margin-right: .1rem;
  }

  .m-street {
    display: block;
    float: left;
  }

  b {
    font-weight: 500;
  }

  .m-delivery {
    height: .5rem;
    width: .5rem;
    background-image: url(../../../static/images/s_delivery_con.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    display: inline-block;
    margin-left: .13rem;
    float: left;
  }

  .m-huo {
    color: red;
  }

  .m-num {
    height: 1rem;
    line-height: 1rem;
  }

  .detail-sel {
    margin: 0 auto;
    width: 94%;
    height: inherit;
    font-size: .4rem;
  }

  .detail-sel > span {
    float: left;
  }

  .detail-sel > span:nth-child(2) {
    margin: 0 .3rem;
  }

  .detail-sel > span:nth-child(2) > b {
    color: red;
    margin: 0 .2rem;
  }

  .detail-sel > span:last-child > img {
    vertical-align: middle;
  }

  .detail-sel > span:last-child {
    float: right;
  }

  .detail-shop {
    box-shadow: 0 2px 2px #c8c8c8;
    padding-bottom: 3%;
  }

  .detail-shop > ul {
    display: flex;
    flex-flow: row wrap;
    margin: 0 auto;
    width: 94%;
  }

  .ds {
    display: flex;
    width: 100%;
    margin-top: .3rem;
  }

  .de-img {
    display: inline-block;
    width: 100%;
    height: 1.72rem;
  }

  .de-left {
    border: solid 1px #c6c6c6;
    width: 44%;
    height: 1.66rem;
    display: inline-block;
    float: left;
  }

  .de-left img {
    width: 100%;
  }

  .de-right {
    display: inline-block;
    float: right;
    width: 50%;
    height: 1.66rem;
  }

  .de-right > dt {
    font-style: normal;
    display: inline-block;
    width: 100%;
  }

  .de-name {
    font-size: .45rem;
  }

  .address {
    font-size: .4rem;
    color: #999;
    background: url(../../../static/images/g_detail_16.png) no-repeat;
    padding-left: 18px;
    background-size: 16px;
    margin-top: .2rem;
  }

  .normal {
    width: 33.3%;
    height: .694rem;
    line-height: .694rem;
    font-size: .38rem;
  }

  .m-points {
    color: #09a6f7;
  }

  .bg-img {
    display: inline-block;
    color: #09a6f7;
    background-image: url(../../../static/images/g_detail_7.png);
    height: .41rem;
    width: .41rem;
    background-size: .41rem;
    background-repeat: no-repeat;
    background-position: center;
  }

  .sp-in {
    display: flex;
    height: 1rem;
    line-height: 1rem;
    justify-content: space-between;
    align-items: self-end;
    margin: 0 10%;
    width: 80%;
  }

  .sp-in > a {
    display: inline-block;
    height: .8rem;
    line-height: .8rem;
    text-align: center;
    border: solid 1px #cacaca;
    border-radius: .3rem;
    text-indent: .8rem;
    padding: 0 .3rem;
    background-image: url(../../../static/images/g_detail_9.png);
    background-repeat: no-repeat;
    background-size: 20px;
    background-position: 0.48rem .1rem;
  }

  .like-title {
    color: #333;
    font-weight: bold;
    font-size: .4rem;
    line-height: 1rem;
    height: 1rem;
    margin-left: 3%;
  }

  .like-main {
    padding-bottom: 3%;
    box-shadow: 0 2px 2px #c8c8c8;
  }

  .like-main > ul {
    display: flex;
    margin: 0 auto;
    width: 96%;
  }

  .pic {
    display: flex;
    flex: 1;
  }

  .fp {
    width: 100%;
    height: 2.9rem;
  }

  .fp > img {
    width: inherit;
    height: inherit;
  }

  .fn {
    font-size: 0.4em;
    height: 1rem;
    line-height: .5rem;
    overflow: hidden;
    margin: 0 .2rem;
  }

  .fv {
    margin: 0 .2rem;
    color: #fe3837;
  }

  .detail-c {
    background-color: #fff;
    width: 100%;
    height: 100%;
    display: inline-block;
  }

  .detail-txt {
    display: inline-block;
    margin-left: 2%;
    margin-right: 2%;
    width: 96%;
  }

  .detail-txt .name {
    width: 25%;
    float: left;
    height: 22px;
    line-height: 22px;
  }

  .detail-txt .text {
    color: #333;
    float: left;
    width: 75%;
    height: 22px;
    line-height: 22px;
  }

  .detail-img > img {
    width: 100%;
    float: left;
  }

  .detail-nav {
    position: absolute;
    z-index: 2;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1.4rem;
    border-top: solid 1px #dcdcdc;
    background-color: #fff;
  }

  .detail-nav > ul {
    display: flex;
    height: inherit;
  }

  .detail-nav > ul > li {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  }

  .detail-nav > ul > li > a {
    display: inline-block;
    height: 1.2rem;
    line-height: 1.2rem;
    width: 100%;
    text-align: center;
    position: relative;
    color: #fff;
  }

  .detail-nav > ul > li > a > dl {
    display: inline-block;
    width: inherit;
    height: inherit;
  }

  .consult dt {
    width: 100%;
    height: .6rem;
    line-height: .6rem;
    background: url(../../../static/images/g_detail_12.png) no-repeat center center;
    background-size: contain;
  }

  .c-mm dd {
    width: 100%;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
    color: #878787;
    font-size: .4rem;
  }

  .go-shop::before {
    content: "";
    position: absolute;
    height: .8rem;
    left: 0;
    top: .2rem;
    border-left: solid 1px #dadada;
  }

  .go-shop::after {
    content: "";
    position: absolute;
    height: .8rem;
    right: 0;
    top: .2rem;
    border-left: solid 1px #dadada;
  }

  .go-shop dt {
    width: 100%;
    height: .6rem;
    background: url(../../../static/images/g_detail_10.png) no-repeat center center;
    background-size: contain;
  }

  .store dt {
    width: 100%;
    height: 20px;
    background: url(../../../static/images/g_detail_11.png) no-repeat center center;
    background-size: contain;
  }

  .go-car {
    background: #ff9701;
    color: #fff;
  }

  .go-buy {
    background-color: orangered;
    color: #fff;
  }

  #g_detail_c_id {
    position: absolute;
    z-index: 1;
    top: 1rem;
    left: 0;
    width: 100%;
    bottom: 1.4rem;
    overflow: hidden;
  }

  #g_detail_c_g {
    position: absolute;
    z-index: 1;
    width: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    transform: translateZ(0);
    -webkit-touch-callout: none;
    user-select: none;
    text-size-adjust: none;
    touch-action: none;
  }

  .g_detail_ul {
    margin-top: .3rem;
    background-color: #fff;
  }

  .g_detail_text {
    width: 96%;
    height: 100%;
    margin: 0 auto 5%;
  }

  .g_detail_text ul li {
    line-height: .7rem;
    height: .7rem;
    overflow: hidden;
  }

  .g_detail_text ul li .name {
    width: 25%;
    float: left;
    color: #333;
  }

  .g_detail_text ul li .text {
    width: 75%;
    float: left;
    color: #333;
  }

  .g_detail_img {
    display: inline-block;
  }

  .g_detail_img img {
    float: left;
    width: 100%;
  }

  .freight {
    color: red;
    margin-left: .3rem;
    font-size: .45rem;
  }

  .sel-img {
    width: .6rem;
    height: inherit;
    line-height: inherit;
    text-align: center;
  }

  .down-up-enter,
  .down-up-leave-active {
    transform: translateY(100%);
  }

  .down-up-leave-active,
  .down-up-enter-active {
    transition: all 1s .2s cubic-bezier(0.33, 0.25, 0.33, 1);
  }

  .m-buy {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 9;
    background-color: rgba(0, 0, 0, .6);
  }

  .model-buy {
    position: absolute;
    width: 100%;
    height: 55%;
    left: 0;
    bottom: 0;
    background: #fff;
    border-top: solid 1px #dcdcdc;
  }

  .buy-info {
    width: 100%;
    border-bottom: solid 1px #dcdcdc;
    position: relative;
    background: #fff;
    height: 22%;
  }

  .model_pic {
    width: 2.778rem;
    height: 2.778rem;
    border: solid 1px #dcdcdc;
    border-radius: .278rem;
    overflow: hidden;
    position: absolute;
    display: inline-block;
    margin-left: 3%;
    top: -50%;
  }

  .model_pic > img {
    width: 100%;
  }

  .model_text {
    display: inline-block;
    height: 90%;
    position: absolute;
    left: 38%;
  }

  .model_text .model-value {
    color: #fe3837;
    font-size: .5rem;
    height: .8rem;
    line-height: .8rem;
  }

  .model_text .model-amount {
    font-size: .4rem;
    color: #929292;
    text-indent: 3px;
  }

  .model_standard {
    width: 94%;
    height: 36%;
    margin: 0 auto;
    position: relative;
  }

  .model_standard .model-type {
    position: absolute;
    display: inline-block;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .model-type .standard_title {
    color: #929292;
    height: 20%;
    font-size: .4rem;
    font-weight: normal;
    position: relative;
    width: 100%;
  }

  .model-select {
    position: relative;
    overflow: hidden;
    width: 100%;
    display: inline-block;
  }

  .model-select li {
    float: left;
    padding: 0 .16rem;
    height: .8rem;
    line-height: .8rem;
    text-align: center;
    border: solid 1px #8c8c8c;
    border-radius: 3px;
    display: inline-block;
    margin-right: .25rem;
    margin-top: .1rem;
    margin-bottom: .1rem;
  }

  .model-select .self {
    background: #fe3837;
    border: solid 1px #fe3837;
  }

  .model-select .self a {
    color: #fff;
  }

  .model-select li a {
    color: #8c8c8c;
  }

  .buy-num {
    margin-top: 2%;
    width: 100%;
    height: 20%;
    border-top: solid 1px #dcdcdc;
  }

  .model_amount {
    width: 94%;
    margin: 1% auto 0;
  }

  .amount_title {
    color: #929292;
    line-height: .8rem;
    height: .8rem;
    font-size: .45rem;
    font-weight: normal;
    text-align: left;
    display: inline-block;
    width: 100%;
  }

  .model_amount > ul {
    display: flex;
    flex-flow: row wrap;
  }

  .model_amount > ul > li {
    display: flex;
    height: 1.11rem;
    width: 1.944rem;
    line-height: 1.11rem;
    justify-content: center;
    align-items: center;
  }

  .model_amount > ul > li:nth-child(2) {
    border-top: 1px solid #adadad;
    border-bottom: 1px solid #adadad;
  }

  .model_amount .add {
    border: 1px solid #adadad;
  }

  .model_amount .reduce {
    border: solid 1px #adadad;
  }

  .model_amount > ul > li > a {
    display: inherit;
    padding: .3rem;
  }

  .model_amount ul .input_text input {
    width: 1.944rem;
    height: 1.111rem;
    border: none;
    text-align: center;
    outline: none;
  }

  .buy-order {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 13%;
  }

  .model_standard_btns {
    display: flex;
    height: 100%;
  }

  .model_standard_btns li {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  }

  .model_standard_btns a {
    color: #fff;
  }

  .model_standard_btns .g_detail_shopcar_in {
    background: #ff9701;
  }

  .model_standard_btns .g_detail_buy_now {
    background: #fe3837;
  }

  .close_btn {
    position: absolute;
    top: 2%;
    right: 3%;
    width: .69rem;
    height: .69rem;
  }

  .close_btn img {
    width: 100%;
  }

  .m-address {
    background-color: rgba(0, 0, 0, .5);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
  }

  /***评价开始***/
  #goods-evaluate {
    position: absolute;
    z-index: 1;
    top: 1rem;
    left: 0;
    width: 100%;
    bottom: 1.4rem;
    overflow: hidden;
    background-color: #fff;
  }

  #goods-eval {
    position: absolute;
    z-index: 1;
    width: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    transform: translateZ(0);
    -webkit-touch-callout: none;
    user-select: none;
    text-size-adjust: none;
    touch-action: none;
  }

  .evaluate-box {
    width: 100%;
    height: 100%;
  }

  .evaluate-box > li {
    margin: .2rem 0;
  }

  .evaluate-title {
    overflow: hidden;
    border-top: 1px solid #dcdcdc;
    border-bottom: 1px solid #dcdcdc;
    background: #fff;
  }

  .evaluate-title > ul {
    margin: .3rem auto 0;
    width: 94%;
    display: flex;
    flex-flow: row wrap;
  }

  .evaluate-title > ul > li {
    display: flex;
    width: 33%;
    justify-content: center;
    align-items: center;
    margin-bottom: .3rem;
  }

  .evaluate-title > ul > li > .evaluate-self {
    background-color: red;
    color: #fff;
    cursor: pointer;
  }

  .evaluate-title > ul > li > a {
    background: #e8e8e8;
    cursor: pointer;
    padding: .22rem .28rem;
    border-radius: .56rem;
  }

  .cmt-eval {
    margin: 0 auto;
    width: 94%;
  }

  .cmt_cnt {
    position: relative;
    line-height: 1.3;
    margin: .14rem 0;
    word-break: break-all;
    overflow: hidden;
    font-size: .35rem;
    color: #929292;
  }

  .cmt_user {
    display: inline-block;
    width: 100%;
  }

  .cmt_user > span {
    float: left;
    color: #999;
    font-size: .35rem;
    display: inline-block;
    vertical-align: middle;
    height: .5rem;
    position: relative;
    margin-right: .27rem;
  }

  .credit {
    width: 73px;
    background-image: url(../../../static/images/detail_v1_3.png);
    background-size: 100px auto;
    background-repeat: repeat-y;
    background-position: 13px -198px;
  }

  .cmt_user > .date {
    float: right;
  }

  .cmt_sku {
    display: inline-block;
    width: 100%;
    height: .5rem;
  }

  .cmt_sku > div {
    display: inline-block;
    height: inherit;
  }

  .cmt_sku > div:first-child {
    float: left;
  }

  .cmt_sku > div:last-child {
    float: right;
  }

  .cmt_sku_tool > span {
    color: #999;
    font-size: .35rem;
  }

  .cmt_sku_tool > a {
    display: inline-block;
    height: inherit;
    width: 1.11rem;
  }

  .cmt_sku_tool > a > span {
    vertical-align: top;
    display: inline-block;
    float: left;
    width: 50%;
    line-height: 1.3;
    text-align: center;
    color: #999;
    font-size: .35rem;
  }

  .heart {
    background-image: url(../../../static/images/download_like.png);
    background-repeat: no-repeat;
    background-position: 0 -16px;
    background-size: 84%;
    width: 50%;
    height: inherit;
    display: inline-block;
    float: left;
  }

  .like {
    background-image: url(../../../static/images/download_like.png);
    background-repeat: no-repeat;
    background-position: 0 3px;
    background-size: 84%;
    width: 50%;
    height: inherit;
    display: inline-block;
    float: left;
  }

  .cmt_att .img {
    height: 2.67rem;
    width: 2.67rem;
    margin-right: .1rem;
  }

  .cmt_att .img img {
    width: inherit;
    height: inherit;
  }

  /**购物车**/
  .cart-link {
    width: 1.06rem;
    height: 1.06rem;
    position: absolute;
    left: .4rem;
    bottom: 2rem;
    z-index: 2;
  }

  .cart-link a {
    display: inline-block;
    height: inherit;
    width: inherit;
    border-radius: 50%;
    background: url(../../../static/images/bottom_shopcar.png) no-repeat center center rgba(0,0,0,.5);
    background-size: .62rem .62rem;
  }
</style>
