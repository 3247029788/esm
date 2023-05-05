<template>
  <div class="box">
    <form action="/">
      <van-search v-model="query.theme" :placeholder="$t('center.请输入搜索关键词')"/>
    </form>
    <van-pull-refresh class="box" v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :immediate-check="true" :error.sync="error" :finished="finished" :finished-text="$t('center.没有更多了')" error-text="请求失败，点击重新加载" @load="onLoad">
        <template v-if="active === 0">
          <message-item @showInfo="showInfo" v-for="item in noRead" :key="item.id" :active="active" :messageInfo="item" />
        </template>
        <template v-if="active === 1">
          <message-item @showInfo="showInfo" @setNoRead="setNoRead" v-for="item in Read" :key="item.id" :active="active" :messageInfo="item" />
        </template>
      </van-list>
    </van-pull-refresh>
    <van-dialog v-model="show" :title="selectMessageInfo.theme" :before-close="beforeClose">
      <div class="box infoBox">
        <van-field v-model="selectMessageInfo.addresser" label="发件人" readonly />
        <van-field v-model="selectMessageInfo.recipients" label="收件人" readonly />
        <van-field v-model="createTime" label="发件时间" readonly />
        <van-field v-model="selectMessageInfo.theme" label="主题" readonly />
        <van-field v-model="selectMessageInfo.text" rows="3" type="textarea" label="内容" readonly />
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { getMessage,updateRead } from '@/api/home'
import MessageItem from './MessageItem.vue'
import dayjs from 'dayjs'

export default {
  props: {
    active: {
      type: Number,//类型
      required: false,//必要性
      default: 0 //默认值
    }
  },
  name: "ListGroup",
  components: { MessageItem },
  data() {
    return {
      show: false,
      refreshing: false,
      loading: false,
      finished: false,
      error: false,
      list: [], // 页面列表信息
      query: {
        isEnable: 0,
        theme: '',
      },
      selectMessageInfo: {

      }
    }
  },
  watch: {
    // query: {
    //   deep: true, // 深度监视
    //   handler(newValue, oldVale) { 
    //     this.list.splice(0, this.list.length)
    //     this.findMessage() // 查询列表
    //   }
    // },
    // active: {
    //   immediate: true,
    //   handler(newValue, oldVale) {
    //     this.query.isEnable = newValue
    //   }
    // }
  },
  computed: {
    // 日期格式转换
    createTime(){
      return dayjs(this.selectMessageInfo.createTime).format('YYYY-MM-DD HH:mm:ss')
    },
    noRead(){
      if(this.query.theme === ''){
        return this.list.filter(item => item.isRead === 0)
      }else{
        return this.list.filter(item => item.isRead === 0 && item.theme.includes(this.query.theme))
      }
    },
    Read(){
      if(this.query.theme === ''){
        return this.list.filter(item => item.isRead === 1)
      }else{
        return this.list.filter(item => item.isRead === 1 && item.theme.includes(this.query.theme))
      }
    }
  },
  created() {
    this.findMessage()
  },
  mounted() {
    
  },
  methods: {
    beforeClose(action, done){
      updateRead({isRead: 1,id: this.selectMessageInfo.id}).then(res => {
        if(res.status != 0) this.$toast("消息读取失败")
        else this.onRefresh()
      })
      done()
    },
    showInfo(msg){
      this.show = true
      this.selectMessageInfo = msg
    },
    setNoRead(id){
      updateRead({isRead: 0,id}).then(res => {
        if(res.status !== 0) this.$toast.fail("消息读取失败")
        else {
          this.$toast.success("成功设为未读")
          this.onRefresh()
        }
      })
    },
    findMessage() {
      getMessage().then(res => {
        if (res.status === 0) {
          if (res.result.length > 0) {
            res.result.forEach(value => this.list.push(value))
            this.$emit('sendContent', this.noRead.length)
            this.$store.commit('center/setNoRead',this.noRead.length)
          }
        } else {
          this.$toast(res.message)
        }
        // 结束刷新状态
        this.refreshing = false
        // 加载状态结束
        this.loading = false;
        this.finished = true
      })
    },
    onRefresh() {
      this.refreshing = true // 加载状态
      this.loading = true;
      this.list.splice(0, this.list.length) // 清空列表
      this.findMessage() // 查询列表
    },
    onLoad() {
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
      } else {
        this.loading = false;
        this.finished = true;
      }
    },
  }
}
</script>

<style scoped>
.infoBox {
  margin: 6px;
  height: 200px;
  overflow: auto;
}
</style>