<template>
    <div>
        <router-view/>

        <van-tabbar v-model="active" route>
            <van-tabbar-item icon="home-o" replace to="/home">标签11</van-tabbar-item>
            <van-tabbar-item icon="search" replace to="/visualization">可视化</van-tabbar-item>
            <van-tabbar-item icon="friends-o" replace to="/b">标签</van-tabbar-item>
            <van-tabbar-item icon="setting-o" replace to="/c">标签</van-tabbar-item>
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
