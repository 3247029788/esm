<template>
  <div class="box">
    <nav-top-bar :leftArrow="true" :rightArrow="true" :title="$t('center.提交记录')" />
    <van-tabs v-model="active" class="box tabBox">
      <van-tab :title="$t('center.健康')" class="box">
      </van-tab>
      <van-tab :title="$t('center.异常')">
      </van-tab>
      <record-group :active="active" />
    </van-tabs>
  </div>
</template>

<script>
import NavTopBar from "@/components/NavTopBar";
import RecordGroup from './RecordGroup.vue'

export default {
  name: "SubmitRecord",
  components: { NavTopBar, RecordGroup },
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style>
</style>