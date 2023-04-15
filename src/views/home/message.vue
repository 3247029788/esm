<template>
  <div>
    <nav-top-bar title="消息发布" :leftArrow="true" :rightArrow="true" />
    <van-form ref="form" @submit="submit">
      <van-cell-group>
        <van-field required readonly v-model="recipients" label="收件人" placeholder="请选择用户" :rules="[{ required: true, message: '请选择用户' }]">
          <template #button>
            <van-button native-type="button" icon="plus" size="small" type="primary" @click="show = true"/>
          </template>
        </van-field>
        <van-field required v-model="theme" label="主题" placeholder="请输入主题" :rules="[{ required: true, message: '请输入主题' }]"/>
        <van-field 
          required
          v-model="text" 
          label="正文" 
          placeholder="请输入正文" 
          type="textarea"
          maxlength="150"
          show-word-limit
          :rules="[{ required: true, message: '请输入正文' }]"
        />
        <van-button native-type="submit" round icon="envelop-o" type="info" style="width:90%;margin-left:5%;margin-top:15px">发送</van-button>
      </van-cell-group>
    </van-form>
    <van-dialog class="content" v-model="show" title="选择收件人" show-cancel-button @confirm="confirm">
      <van-search v-model="keyword" placeholder="请输入搜索关键词" @search="search"/>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-checkbox-group v-model="result" ref="checkboxGroup">
            <van-cell v-for="(item,index) in list" :key="item.username" :title="item.username" @click="toggle(index)">
              <template #right-icon>
                <van-checkbox :name="item.username" ref="checkboxes" />
              </template>
            </van-cell>
          </van-checkbox-group>
        </van-list>
      </van-pull-refresh>
      <div class="btn_outer">
        <van-button class="btn" type="primary" size="small" @click="checkAll">全选</van-button>
        <van-button class="btn" type="info" size="small" @click="toggleAll">反选</van-button>
      </div>
    </van-dialog>
  </div>
</template>
<script>
import NavTopBar from "@/components/NavTopBar"
import { getAllUser } from '@/api/test'
import { postMessage } from '@/api/home'

export default {
  components: {
    NavTopBar,
  },
  data() {
    return {
      keyword: '',
      recipients: '',
      theme: '',
      text: '',
      show: false,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      result: []
    }
  },
  methods: {
    submit(){
      const data = {
        recipients: this.result,
        theme: this.theme,
        text: this.text
      }
      postMessage(data).then(res => {
        if(res.status === 0) this.$toast.success('发送成功！')
      })
    },
    search(){
      if(this.keyword !== ''){
        const k = this.list.filter(item => item.username.includes(this.keyword))
        this.list = k
      }else{
        this.onLoad()
      }
    },
    confirm(){
      this.recipients = this.result.join(',')
    },
    checkAll() {
      this.$refs.checkboxGroup.toggleAll(true);
    },
    toggleAll() {
      this.$refs.checkboxGroup.toggleAll();
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    onLoad() {
      getAllUser().then(res=>{
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
        this.list = res.result
        this.loading = false;
        this.finished = true;
      })
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
}  
</script>

<style lang="less" scoped>
.btn_outer{
  display:flex;
  justify-content: right;
  .btn{
  margin: 5px;
  float: right;
  }
}
</style>