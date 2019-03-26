<template>
  <div class="m-login">
    <div class="phone_hd_l"><a @click="goBack()">取消</a>登录</div>
    <form action="" method="post">
      <div class="m-main">
        <div class="error" v-if="error">
          <label>{{errorMsg}}</label>
        </div>
        <div class="m-pd">
          <span>账号:</span>
          <input type="text" name="username" v-model="username" class="account" placeholder="请输入账号"/>
        </div>
        <div class="m-pd">
          <span>密码:</span>
          <input :type="change" name="password" v-model="password" class="pwd" placeholder="请输入密码">
          <i class="bg" @click="changeType"></i>
        </div>
      </div>
      <div class="btn-login">
        <a class="" @click="loginUser">登录</a>
      </div>
    </form>
    <div class="forget">
      <router-link :to="{name: 'register'}" class="register">
        手机快速注册
      </router-link>
      <a class="self" href="#">忘记密码</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      change: 'password',
      error: false,
      errorMsg: '',
      username: 'admin',
      password: '111111'
    }
  },
  created () {
    // console.log('this.$cookies=', this.$cookies)
    // console.log('router=', this.$router.currentRoute.query.redirect)
  },
  computed: {
    member () {
      return this.$store.state.member
    }
  },
  methods: {
    changeType () {
      if (this.change === 'password') {
        this.change = 'text'
      } else {
        this.change = 'password'
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    loginUser () {
      if (!this.username) {
        this.error = true
        this.errorMsg = '请输入用户名'
        return false
      } else if (!this.password) {
        this.error = true
        this.errorMsg = '请输入密码'
        return false
      } else {
        if (this.password === '111111' && this.username === 'admin') {
          this.$store.commit('storeMember', {username: this.username, password: this.password})
          let token = this.$md5(this.username + ',' + Date.now())
          // console.log('token=', token)
          // expire 已秒为单位
          this.$cookies.set('token', token, 2 * 60 * 60)
          // 跳转
          // this.$router.push({ name: 'index' })
          this.$router.push({path: this.$router.currentRoute.query.redirect || '/'})
        } else {
          this.error = true
          this.errorMsg = '用户名或者密码有误'
        }
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

  .m-login {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    position: absolute;
  }

  .phone_hd_l {
    width: 100%;
    height: 1.5rem;
    text-align: center;
    font-size: .6rem;
    line-height: 1.5rem;
    font-weight: bold;
    color: #303030;
  }

  .phone_hd_l a {
    float: left;
    position: absolute;
    height: inherit;
    line-height: inherit;
    text-align: center;
    color: #848689;
    width: 1.5rem;
    display: block;
    font-weight: 100;
    text-decoration: none;
    font-size: 0.5rem;
  }

  .m-main {
    width: 100%;
    background: #fff;
    border: 1px solid #e1e1e1;
    border-left: none;
    border-right: none;
    font-size: 0.5rem;
  }

  .error {
    display: inline-block;
    width: 100%;
  }

  .error label {
    font-size: 0.45rem;
    margin-left: 20%;
    color: #f00;
  }

  .m-pd {
    height: 1rem;
    margin-top: .2rem;
    width: 100%;
    position: relative;
  }

  .m-pd span {
    width: 20%;
    display: inline-block;
    text-align: center;
    font-size: .45rem;
    color: #686868;
    float: left;
    line-height: 1rem;
  }

  input {
    float: left;
    display: inline-block;
    height: inherit;
    border: none;
    outline: none;
    width: 80%;
    border-bottom: 1px solid #ececec;
  }

  .btn-login {
    height: 1rem;
    margin-top: .4rem;
    line-height: 1rem;
    text-align: center;
  }

  .btn-login a {
    display: inline-block;
    height: inherit;
    line-height: 1rem;
    text-align: center;
    background-color: red;
    color: #ffffff;
    width: 80%;
    border-radius: 4px;
    font-size: .5rem;
  }

  .bg {
    position: absolute;
    z-index: 9;
    background-image: url(http://b2b2c.iskyshop.com/resources/style/system/front/default/images/weixin/eyes.png);
    width: 1rem;
    height: .6rem;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    right: .5rem;
    top: .1rem;
  }

  .forget {
    width: 90%;
    margin-left: 5%;
    margin-top: 5%;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
  }

  .register {
    float: left;
    color: #686868;
    font-size: 0.45rem;
  }

  .self {
    color: #686868;
    font-size: 0.45rem;
    float: right;
  }
</style>
