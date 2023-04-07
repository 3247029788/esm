<template>
  <div class="box">
    <nav-top-bar :leftArrow="true" :rightArrow="true" title="校园消息" />
    <van-tabs v-model="active" class="box tabBox">
      <van-tab title="未读" class="box">
        <template #title>
          未读
          <van-badge :content="content" max="9"/>
        </template>
      </van-tab>
      <van-tab title="已读">
      </van-tab>
      <list-group :active="active" @sendContent="sendContent"/>
    </van-tabs>

  </div>
</template>

<script>
import NavTopBar from "@/components/NavTopBar"
import ListGroup from './ListGroup.vue'
export default {
  components: { NavTopBar, ListGroup },
  name: "MessageList",
  data() {
    return {
      active: 0,
      content: 0,
    }
  },
  methods: {
    sendContent(content){
      this.content = content
    }
  },
}
</script>

<style>
</style>