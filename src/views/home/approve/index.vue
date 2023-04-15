<template>
  <div class="box">
    <nav-top-bar title="信息审批" :leftArrow="true" :rightArrow="true" />
    <van-tabs v-model="active">
      <van-tab title="离校审批">
      </van-tab>
      <van-tab title="返校审批">
      </van-tab>
      <approve-msg :active="active"/>
    </van-tabs>
  </div>
</template>

<script>
import NavTopBar from "@/components/NavTopBar";
import ApproveMsg from './ApproveMsg.vue'
export default {
  name: 'Approve',
  components: { NavTopBar, ApproveMsg },
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style scoped>
</style>