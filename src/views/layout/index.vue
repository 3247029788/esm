<template>
    <div>
      <router-view/>
      <van-tabbar v-model="active" route>
          <van-tabbar-item icon="home-o" replace to="/home">首页</van-tabbar-item>
          <van-tabbar-item icon="guide-o" replace to="/visualization">疫情地图</van-tabbar-item>
          <van-tabbar-item icon="smile-comment-o" replace to="/b">聊天</van-tabbar-item>
          <van-tabbar-item icon="friends-o" replace to="/center">个人信息</van-tabbar-item>
      </van-tabbar>
    </div>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style>

</style>
