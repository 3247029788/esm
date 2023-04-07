<template>
  <div class="box itemBox">
    <van-swipe-cell>
      <van-cell @click="showInfo" center :title="messageInfo.theme" :value="createTime" clickable :label="subContent" />
      <template #right v-if="active">
        <van-button square type="primary" @click="setNoRead" text="标为未读" style="height: 100%" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    messageInfo: {
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
  name: "MessageItem",
  computed: {
    subContent() {
      if (this.messageInfo.text.length < 20) {
        return this.messageInfo.text
      } else {
        return this.messageInfo.text.substr(0, 20) + '...'
      }
    },
    // 日期格式转换
    createTime(){
      return dayjs(this.messageInfo.createTime).format('YYYY-MM-DD HH:mm:ss')
    },
  },
  methods: {
    showInfo() {
      this.$emit("showInfo", this.messageInfo) //使用自定义事件传递数据
    },
    setNoRead() {
      this.$emit("setNoRead", this.messageInfo.id) //使用自定义事件传递数据
    }
  }
}
</script>

<style scoped>
.itemBox {
  background-color: white;
  margin-top: 3px;
}
</style>