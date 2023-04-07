<template>
  <div class="box">
    <!-- <van-cell center :title="recordInfo.temperature + '℃'" value="" clickable :label="recordInfo.createTime" /> -->
    <van-cell v-if="active === 0" :value="recordInfo.createTime" :icon="icon">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span class="custom-title">{{temperature}}</span>
        <van-tag :type="type">{{isHealth}}</van-tag>
      </template>
    </van-cell>
    <van-cell v-if="active === 1" :value="createTime" :icon="icon" @click="showEndTab = true">
      <template #title>
        <span class="custom-title">{{isAbnormal}}</span>
        <van-tag :type="type" color="color">{{process}}</van-tag>
      </template>
    </van-cell>
    <van-dialog class="content" v-model="showEndTab" title="处理详情">
      <van-cell-group style="height:300px; overflow:auto">
        <van-field label="用户名" :value="recordInfo.username" readonly />
        <van-field label="上报时间" :value="createTime" readonly />
        <van-field label="解决时间" :value="resultTime" readonly />
        <van-field label="处理人" :value="recordInfo.resultUser" readonly />
        <van-field label="处理结果" type="textarea" autosize maxlength="150" :value="recordInfo.result" readonly />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    recordInfo: {
      type: Object,//类型
      required: true,//必要性
      default: 0 //默认值
    },
    active: {
      type: Number,//类型
      required: false,//必要性
      default: 0 //默认值
    }
  },
  name: 'RecordItem',
  data() {
    return {
      type: 'danger',
      icon: 'success',
      color: '',
      showEndTab: false
    }
  },
  computed: {
    // 日期格式转换
    createTime(){
      return dayjs(this.recordInfo.createTime).format('YYYY-MM-DD HH:mm:ss')
    },
    resultTime(){
      return dayjs(this.recordInfo.resultTime).format('YYYY-MM-DD HH:mm:ss')
    },
    temperature(){
      if(this.recordInfo.temperature === 'up') return '37.3℃以上'
      else return '37.3℃以下'
    },
    isHealth() {
      if (this.recordInfo.temperature === 'up') {
        this.type = 'danger'
        return '异常'
      } else {
        this.type = 'success'
        return '健康'
      }
    },
    isAbnormal(){
      if(this.recordInfo.exceptionType === 0) return '体温异常'
      else return '其他异常'
    },
    process() {
      if (this.recordInfo.isDealWith === '0') {
        this.type = 'danger'
        return '未开始'
      } else if(this.recordInfo.isDealWith === '1'){
        this.color = 'yellow'
        return '处理中'
      }else{
        this.type = 'success'
        return '已处理'
      }
    }
  },
}
</script>

<style scoped>
.itemBox {
  background-color: white;
  margin-top: 3px;
}
.custom-title {
  margin-right: 8px;
  vertical-align: middle;
}
</style>