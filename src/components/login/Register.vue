<template>
  <div class="m-main">
    <common-header :title="title" :back_src="back_src" :home_src="home_src"></common-header>
    <div class="phone_list">
      <form action="#" class="registerForm" method="post" ref="reForm">
        <ul class="ul-list">
          <li class="re-common send">
            <input type="text" :class="!showMobile ? 'coder m-input' : 'coder m-input error'" v-model="mobile"
                   placeholder="手机码号" @focus="changeState('showMobile')" v-debounce="search">
            <a @click="sendCode">{{countdown > 0 ? countdown + 's': sendMsg}}</a>
          </li>
          <li class="empty" v-show="showMobile">
            <label>{{errorMobile}}</label>
          </li>
          <li class="re-common">
            <input type="text" :class="!showCoder ? 'm-input' : 'm-input error'" v-model="coder"
                   placeholder="请输入6位手机验证码" @focus="changeState('showCoder')">
          </li>
          <li class="empty" v-show="showCoder">
            <label>{{errorCoder}}</label>
          </li>
          <li class="re-common">
            <input type="text" :class="!showUserName ? 'm-input' : 'm-input error'" v-model="username"
                   placeholder="请输入用户名" @focus="changeState('showUserName')">
          </li>
          <li class="empty" v-show="showUserName">
            <label>{{errorUserName}}</label>
          </li>
          <li class="re-common">
            <input type="password" :class="!showPassword ? 'm-input' : 'm-input error'" v-model="password"
                   placeholder="注册密码" @focus="changeState('showPassword')">
          </li>
          <li class="empty" v-show="showPassword">
            <label>{{errorPassword}}</label>
          </li>
          <li class="re-common">
            <input type="checkbox" v-model="state">
            <label class="agree">我已阅读并同意 </label>
            <a class="m-agree" @click="agreement">《商城在线服务协议》</a>
          </li>
          <li class="re-common">
            <a class="btn" @click="registerForm('reForm')">立即注册</a>
          </li>
          <li class="re-common">
            <router-link tag="a" class="login" :to="{name: 'toLogin'}">账号登录</router-link>
            <router-link tag="a" class="forget" :to="{name: 'forget'}">找回密码</router-link>
          </li>
        </ul>
      </form>
    </div>

    <!--协议-->
    <div class="look-agree" v-show="agree">
      <div class="content">
        <div class="t-head">
          <label>测试协议</label>
          <a class="icon" @click="sure"></a>
        </div>
        <div class="t-body">
          <p>
            【<b>审慎阅读</b>】您在申请注册流程中点击同意前，应当认真阅读以下协议。<b>请您务必审慎阅读、充分理解协议中相关条款内容，其中包括</b>：<br>
            <b>1. 与您约定免除或限制责任的条款；</b><br>
            <b>2. 与您约定法律适用和管辖的条款；</b><br>
            <b>3. 其他以粗体下划线标识的重要条款。</b>
          </p>
          <p>
            【<b>审慎阅读</b>】您在申请注册流程中点击同意前，应当认真阅读以下协议。<b>请您务必审慎阅读、充分理解协议中相关条款内容，其中包括</b>：<br>
            <b>1. 与您约定免除或限制责任的条款；</b><br>
            <b>2. 与您约定法律适用和管辖的条款；</b><br>
            <b>3. 其他以粗体下划线标识的重要条款。</b>
          </p>
          <p>
            【<b>审慎阅读</b>】您在申请注册流程中点击同意前，应当认真阅读以下协议。<b>请您务必审慎阅读、充分理解协议中相关条款内容，其中包括</b>：<br>
            <b>1. 与您约定免除或限制责任的条款；</b><br>
            <b>2. 与您约定法律适用和管辖的条款；</b><br>
            <b>3. 其他以粗体下划线标识的重要条款。</b>
          </p>
          <p>
            【<b>审慎阅读</b>】您在申请注册流程中点击同意前，应当认真阅读以下协议。<b>请您务必审慎阅读、充分理解协议中相关条款内容，其中包括</b>：<br>
            <b>1. 与您约定免除或限制责任的条款；</b><br>
            <b>2. 与您约定法律适用和管辖的条款；</b><br>
            <b>3. 其他以粗体下划线标识的重要条款。</b>
          </p>
          <p>
            如您对协议有任何疑问，可向平台客服咨询。<br>
            【<b>特别提示</b>】当您按照注册页面提示填写信息、阅读并同意协议且完成全部注册程序后，即表示您已充分阅读、理解并接受协议的全部内容。
          </p>
          <p>
            <b>阅读协议的过程中，如果您不同意相关协议或其中任何条款约定，您应立即停止注册程序</b>。<br>
            <a>《XXXX会员章程》</a><br>
            <a>《XXX协议》</a><br>
            <a>《隐私声明》</a>
          </p>
          <p class="empty"></p>
        </div>
        <div class="t-yes">
          <a @click="sure">同意</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from '@/components/common/CommonHeader'

export default {
  name: 'register',
  components: {CommonHeader},
  data () {
    return {
      title: '手机号注册',
      back_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/back.png',
      home_src: 'http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/home.png',
      mobile: '',
      coder: '',
      username: '',
      password: '',
      state: true,
      errorMobile: '手机号码不能为空',
      errorCoder: '验证码不能为空',
      errorUserName: '用户名不能为空',
      errorPassword: '密码不能为空',
      showMobile: false,
      showCoder: false,
      showUserName: false,
      showPassword: false,
      agree: false,
      countdown: 0,
      stop: 0,
      sendMsg: '点击获取验证码',
      // count: 1,
      rules: {
        mobile: /^1[35789]\d{9}$/,
        username: /\D+/,
        password: /\D+/,
        coder: /^\d{6}$/
      }
    }
  },
  directives: {
    debounce: {
      inserted (el, binding) {
        let timer
        el.addEventListener('keyup', () => {
          if (timer) {
            clearTimeout(timer)
          }
          timer = setTimeout(() => {
            // 需要绑定函数执行之后的返回值 search()
            binding.value()
          }, 200)
        })
      }
    }
  },
  methods: {
    registerForm (name) {
      // console.log('refs=', this.$refs[name])
      if (!this.rules.mobile.test(this.mobile)) {
        this.errorMobile = '手机号码不正确'
        this.showMobile = true
        return false
      }
      if (!this.rules.coder.test(this.coder)) {
        this.errorCoder = '验证码不正确'
        this.showCoder = true
        return false
      }
      if (!this.username) {
        this.showUserName = true
        return false
      }
      if (!this.password) {
        this.showPassword = true
        return false
      }
    },
    changeState (name) {
      let that = this
      that[name] = false
    },
    sendCode () {
      if (!this.rules.mobile.test(this.mobile)) {
        this.errorMobile = '手机号码不正确'
        this.showMobile = true
        return false
      }
      if (this.countdown < 1) {
        this.countdown = 59
        this.stop = setInterval(() => {
          if (this.countdown < 1) {
            this.countdown = 0
            window.clearInterval(this.stop)
          }
          --this.countdown
        }, 1000)
      }
    },
    agreement () {
      this.agree = true
    },
    sure () {
      this.agree = false
    },
    search () {
      // 实际要进行的操作 axios.get('')之类的 节流函数
      if (!this.rules.mobile.test(this.mobile)) {
        this.errorMobile = '手机号码不正确'
        this.showMobile = true
      } else {
        this.showMobile = false
        // 发送手机短信
      }
    }
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
    color: #000;
  }

  .m-main {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #f5f5f5;
    overflow: hidden;
  }

  .phone_list {
    position: absolute;
    top: 1rem;
    width: 100%;
    height: 100%;
  }

  .ul-list {
    margin-top: .5rem;
  }

  .re-common {
    width: 96%;
    margin-left: 2%;
    margin-right: 2%;
    height: 1.1rem;
    margin-bottom: .4rem;
    line-height: 1.1rem;
  }

  .re-common .m-input {
    width: 99%;
    border: none;
    height: .9rem;
    line-height: .9rem;
    font-size: 0.4rem;
    text-indent: .3rem;
    border-radius: 2px;
  }

  .re-common .coder {
    width: 57%;
    float: left;
  }

  .send a {
    height: .9rem;
    border: 1px solid #f15353;
    background: #fff;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    width: 40%;
    border-radius: 3px;
    line-height: 0.9rem;
    color: red;
    font-size: .43rem;
    float: right;
  }

  .empty {
    width: 100%;
    height: .5rem;
    margin-bottom: .4rem;
  }

  .empty label {
    margin-left: 4%;
    color: red;
    font-size: .4rem;
  }

  .agree {
    color: #666;
    font-size: .4rem;
  }

  .btn {
    width: 100%;
    background-color: red;
    color: #fff;
    display: inline-block;
    text-align: center;
    height: inherit;
    line-height: 1.1rem;
    border-radius: 3px;
    font-size: .5rem;
  }

  .login {
    display: inline-block;
    float: left;
    font-size: .4rem;
  }

  .re-common .error {
    border: 1px solid red;
  }

  .forget {
    display: inline-block;
    float: right;
    font-size: .4rem;
  }

  .look-agree {
    position: absolute;
    z-index: 99;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .3);
    width: 100%;
    height: 100%;
  }

  .content {
    background-color: #fff;
    border: 1px solid #fff;
    border-radius: .3rem;
    overflow: auto;
    position: absolute;
    left: 1.5%;
    right: 1.5%;
    bottom: 1%;
    height: 60%;
  }

  .t-head {
    height: 1rem;
    line-height: 1rem;
    color: #000;
    text-align: center;
    font-size: .45rem;
    font-weight: 700;
  }

  .icon {
    background-image: url(../../../static/images/download.png);
    width: .6rem;
    height: .6rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    display: inline-block;
    float: right;
    margin-top: .2rem;
    margin-right: .2rem;
  }

  .t-body {
    overflow-y: scroll;
  }

  .t-body > p {
    font-size: .4rem;
    color: #000;
    margin-top: 2%;
    margin-right: 4%;
    margin-left: 4%;
  }

  .t-body > p.empty {
    height: 1rem;
    margin-right: 4%;
    margin-left: 4%;
  }

  .t-yes {
    position: fixed;
    z-index: 2;
    left: 4%;
    bottom: 2%;
    right: 4%;
    background-image: -webkit-gradient(linear, right top, left top, from(#ff8f00), color-stop(97%, #f50));
    background-image: -webkit-linear-gradient(right, #ff8f00 0, #f50 97%);
    background-image: linear-gradient(-90deg, #ff8f00 0, #f50 97%);
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    border-radius: .1rem;
  }

  .t-yes a {
    color: #fff;
    display: inline-block;
    height: inherit;
    width: 100%;
  }
</style>
