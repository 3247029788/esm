<template>
  <div class="box">
    <van-pull-refresh class="box" v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :immediate-check="true" :error.sync="error" :finished="finished" finished-text="没有更多了" error-text="请求失败，点击重新加载" @load="onLoad">
        <template v-if="active === 0">
          <record-item v-for="item in healthList" :key="item.id" :active="active" :recordInfo="item" />
        </template>
        <template v-if="active === 1">
          <record-item v-for="item in abnormalList" :key="item.id" :active="active" :recordInfo="item" />
        </template>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getRecord } from '@/api/test'
import RecordItem from './RecordItem.vue'
export default {

  props: {
    active: {
      type: Number,//类型
      required: true,//必要性
      default: 0 //默认值
    }
  },
  components: { RecordItem },
  name: 'RecordGroup',
  data() {
    return {
      refreshing: false,
      loading: false,
      finished: false,
      error: false,
      healthList: [], // 健康列表信息
      abnormalList: [], // 异常列表信息
      query: {
        isHealth: 0,
      },
    }
  },
  watch: {
    query: {
      deep: true, // 深度监视
      immediate: false, //初始化时让handler调用一下
      handler(newValue, oldVale) { //handler什么时候调用？当isHot发生改变时。
        this.healthList.splice(0, this.healthList.length)
        this.abnormalList.splice(0, this.abnormalList.length)
        this.trFindList() // 查询列表
      }
    },
    active: {
      immediate: true,
      handler() {
        this.query.isHealth = this.active
      }
    }
  },
  created() {
    this.trFindList()
    // getRecord()
  },
  methods: {
    trFindList() {
      getRecord().then(res => {
        if (res.status === 0) {
          if (res.result.clockin.length > 0) {
            res.result.clockin.forEach(value => this.healthList.push(value))
          }
          if (res.result.abnormal.length > 0) {
            res.result.abnormal.forEach(value => this.abnormalList.push(value))
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
      this.healthList.splice(0, this.healthList.length) // 清空列表
      this.abnormalList.splice(0, this.abnormalList.length)
      this.trFindList() // 查询列表
    },
    onLoad() {
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      this.finished = true;
    },
  }
}
</script>

<style>
</style>