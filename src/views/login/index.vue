<template>
  <div class="all">
    <div class="outer">
      <span class="welcome_word">欢迎来到校园疫情管理系统</span>
      <div class="login_bar">
        <van-tabs v-model="activeName">
          <van-tab title="登录" name="a">
            <div class="login_inner">
              <van-form @submit="onSubmit">
                  <van-field
                    class="field"
                    v-model="username"
                    placeholder="请输入用户名"
                    :rules="[{ required: true }]"
                    :show-error-message="false"
                  >
                    <div slot="label" class="fields">
                      <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" slot="left-icon"/>
                      用户名
                    </div>
                  </van-field>
                  <van-field
                    class="field"
                    v-model="password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="请输入密码"
                    :rules="[{ required: true }]"
                  >
                    <div slot="label" class="fields">
                      <van-icon name="coupon-o" slot="left-icon"/>
                      密码
                    </div>
                  </van-field>
                  <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">登录</van-button>
                  </div>
              </van-form>
            </div>
          </van-tab>
          <van-tab title="注册" name="b">
            <div class="login_inner">
              <van-form @submit="register">
                  <van-field
                    class="field"
                    v-model="username"
                    placeholder="请输入用户名"
                    :rules="[{ required: true }]"
                    :show-error-message="false"
                  >
                    <div slot="label" class="fields">
                      <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" slot="left-icon"/>
                      用户名
                    </div>
                  </van-field>
                  <van-field
                    class="field"
                    v-model="password"
                    type="password"
                    placeholder="请输入密码"
                    :rules="[{ required: true }]"
                  >
                    <div slot="label" class="fields">
                      <van-icon name="coupon-o" slot="left-icon"/>
                      密码
                    </div>
                  </van-field>
                  <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit">注册</van-button>
                  </div>
              </van-form>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { reguser, login } from '@/api/test'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      activeName: 'a'
    }
  },
  methods: {
    async onSubmit () {
      // 加载动画
      this.$toast.loading({
        overlay: true,
        message: '登录中...',
        forbidClick: true, // 禁用背景
        duration: 0// 持续时间 0持续展示
      })

      const res = await login({ username: this.username, password: this.password })
      if (res.status === 0) {
        this.$toast.success({ message: '登录成功！' })
        this.$store.commit('userToken/setToken', res.token)
        this.$store.commit('userToken/setExpiresTime', res.expiresTime)
        window.localStorage.setItem('tokenStartTime',new Date().getTime())
        this.$router.push({ path: '/home' })
      } else {
        this.$toast.fail(res.message)
      }
    },

    async register () {
      // 加载动画
      this.$toast.loading({
        overlay: true,
        message: '注册中...',
        forbidClick: true, // 禁用背景
        duration: 0// 持续时间 0持续展示
      })
      const res = await reguser({ username: this.username, password: this.password })
      if (res.status === 0) {
        this.$toast.success({ message: '注册成功！' })
        this.$store.commit('userToken/setToken', res.token)
        this.$router.push({ path: '/home' })
      } else {
        this.$toast.fail(res.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.all{
  width: 100%;
  height: 100vh;
  background: url('../../assets/beijing.jpg');
	background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.outer{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  .welcome_word{
    font-weight: bold;
    font-size: 20px;
  }
}
.login_bar{
  margin-top: 80px;
  // margin-top: 150px;
  width: 90%;
  // height: 200px;
  background-color: skyblue;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  .login_inner{
    margin: 20px 10px;
    width: 90%;
    height: 200px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    border-radius: 4px;
    padding: 5px;
    .field{
      width: 90%;
      // height: 40px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin: 10px;
      margin-top: 20px;
    }
    .fields{
      display: flex;
      align-items: center;
    }
  }
}
</style>
