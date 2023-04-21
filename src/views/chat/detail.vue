<template lang="html">
  <div class="detail">
    <van-sticky :offset-top="0">
      <van-nav-bar
        title="健康资讯"
        left-arrow
        @click-left="$router.back()"
      />
    </van-sticky>
    <div class="content">
      <div class="container">
        <div class="title">{{channelNewData &&　channelNewData.title}}</div>
        <div class="message">
          <span>{{channelNewData && channelNewData.time || '2017-06-07 12:00'}}</span>
          <span>{{channelNewData && channelNewData.src || '爱新闻'}}</span>
        </div>
        <img :src="channelNewData && channelNewData.pic || require('../../assets/tp2.png')">
        <div class="newsContent" v-html="channelNewData && channelNewData.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    channelNewData() {
      return this.$route.params.news
    },
  },
  methods: {
    
  }
}
</script>

<style lang="css" scoped>
.detail {
  overflow: hidden;
}
.header {
  width: 100%;
  height: 1.33rem;
  background-color: #d43d3d;
  color: #fff;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
}
.header img {
  width: 25px;
  height: 25px;
  padding: 0 .19rem;
}
.content {
  padding-top: 5px;
}
.container {
  margin: 20px;
}
.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}
.message {
  text-align: center;
  margin: 20px 0;
  color: #888;
  font-size: 12px;
}
.message span:last-child {
  margin-left: 10px;
}
.container img {
  width: 100%;
  margin-bottom: 20px;
}
.newsContent {
  font-size: 18px;
  line-height: 30px;
}
</style>
