<template>
  <div class="box">
    <form action="/">
      <van-search v-model="query.userName" :placeholder="$t('center.请输入搜索关键词')" @search="onSearch" />
    </form>
    <van-field name="radio" :label="$t('home.异常类型')">
      <template #input>
        <van-radio-group v-model="query.exceptionType" direction="horizontal">
          <van-radio shape="square" name="">{{$t('home.全部')}}</van-radio>
          <van-radio shape="square" name="0">{{$t('home.体温')}}</van-radio>
          <van-radio shape="square" name="1">{{$t('home.其他')}}</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-pull-refresh class="box" v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :immediate-check="true" :error.sync="error" :finished="finished" :finished-text="$t('center.没有更多了')" error-text="请求失败，点击重新加载" @load="onLoad">
        <div v-if="active ==0" class="box">
          <not-started @updateList="onRefresh" v-for="item in listNS" :key="item.id" :exceptionInfo="item" />
        </div>
        <div v-if="active ==1" class="box">
          <on-going @updateList="onRefresh" v-for="item in listOG" :key="item.id" :exceptionInfo="item" />
        </div>
        <div v-if="active ==2" class="box">
          <end v-for="item in listED" :key="item.id" :exceptionInfo="item" />
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getAbnormal } from '@/api/home'
import End from './End.vue'
import NotStarted from './NotStarted.vue'
import OnGoing from './OnGoing.vue'
export default {
  props: {
    active: {
      type: Number,//类型
      required: true,//必要性
      default: 0 //默认值
    }
  },
  name: 'ExceptinonGroup',
  components: { NotStarted, End, OnGoing },
  data() {
    return {
      refreshing: false,
      loading: false,
      finished: false,
      error: false,
      list: [], // 页面列表信息
      query: {
        status: 0,
        exceptionType: '',
        userName: '',
      }
    }
  },
  watch: {
    query: {
      deep: true, // 深度监视
      immediate: false, //初始化时让handler调用一下
      handler(newValue, oldVale) { 
        this.list.splice(0, this.list.length)
        this.findException() // 查询列表
      }
    },
    active: {
      immediate: true,
      handler() {
        this.query.status = this.active
      }
    }
  },
  created() {
    this.findException() // 查询列表
  },
  computed:{
    // v-if和v-for不能一起用，在计算属性里先筛选一遍
    listNS(){
      return this.list.filter(item => item.isDealWith === 0)
    },
    listOG(){
      return this.list.filter(item => item.isDealWith === 1)
    },
    listED(){
      return this.list.filter(item => item.isDealWith === 2)
    },
  },
  methods: {
    onSearch(val) { // 搜索框查询
      getAbnormal({username:val}).then(res => {
        if (res.status === 0) {
          // this.handlQuery(res.data) // 添加页面信息
          if (res.result.length > 0) {
            res.result.forEach(value => this.list.push(value))
          }
        } else {
          this.$toast.fail("查询失败")
        }
      })
    },
    findException() { // 查询列表
      getAbnormal({username:this.query.userName,exceptionType:this.query.exceptionType}).then(res => {
        if (res.status === 0) {
          if (res.result.length > 0) {
            res.result.forEach(value => this.list.push(value))
          }
        } else {
          this.$toast.fail("查询失败")
        }
        // 结束刷新状态
        this.refreshing = false
        // 加载状态结束
        this.loading = false;
      })
    },
    onRefresh() {
      this.refreshing = true // 加载状态
      this.list.splice(0, this.list.length) // 清空列表
      this.findException() // 查询列表
    },
    onLoad() {
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      this.finished = true;
    },
  },

}
</script>

<style>
</style>