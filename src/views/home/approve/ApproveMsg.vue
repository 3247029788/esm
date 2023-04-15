<template>
  <div class="box">
    <!-- <form action="/">
      <van-search v-model="value" placeholder="请输入搜索关键词" @search="onSearch" />
    </form> -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :immediate-check="true" :error.sync="error" :finished="finished" finished-text="没有更多了" error-text="请求失败，点击重新加载" @load="onLoad">
        <div v-if="active ==0">
          <message @updateList="updateList" v-for="item in leaveList" :key="item.id" :info="item" :active="0"/>
        </div>
        <div v-if="active ==1">
          <message @updateList="updateList" v-for="item in returnList" :key="item.id" :info="item" :active="1"/>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import Message from './message'
import { getLeaveInfo,getReturnInfo } from '@/api/test'

export default {
  name: "ApproveMsg",
  components: {
    Message,
  },
  props: {
    active: {
      type: Number,//类型
      required: true,//必要性
      default: 0 //默认值
    }
  },
  data() {
    return {
      leaveList: [],
      returnList: [],
      error: false,
      loading: false,
      value: '',
      refreshing: false,
      finished: false,
    };
  },
  created() {
    this.findMsg() // 查询审批用户
  },
  watch:{
    active: {
      immediate: true,
      handler() {
        this.findMsg()
      }
    }
  },
  mounted() {

  },
  methods: {
    findMsg(){
      Promise.all([getLeaveInfo(),getReturnInfo()]).then(([leave,ret]) => {
        // 只展示未审批的数据
        this.leaveList = leave.result.filter(item => item.isExcute !== 1)
        this.returnList = ret.result.filter(item => item.isExcute !== 1)
      })
    },
    updateList(){
      this.findMsg()
    },
    onLoad() { // 加载列表数据
      if (this.refreshing) {
        this.leaveList = [];
        this.returnList = [];
        this.refreshing = false;
      } else {
        this.loading = false;
        this.finished = true;
      }
    },
    onRefresh() { // 刷新页码数据
      this.refreshing = true // 加载状态
      this.loading = true;
      // 清空列表
      this.leaveList.splice(0, this.leaveList.length)
      this.returnList.splice(0, this.returnList.length)
      // 重新加载列表
      this.findMsg()
      this.onLoad()
    },
    onSearch(val) {
      this.queryBo.userName = val
      if (this.list.length > 0) {
        this.list.splice(0, this.list.length)
      }
    },
  },
};
</script>

<style scoped>
.goods-card {
  margin: 0;
  background-color: white;
}
.success-button {
  height: 100%;
}
.delete-button {
  height: 100%;
}
.imageBox {
  display: inline-block;
  vertical-align: top;
  width: 110px; /* 容器必须设置宽高 */
  height: 110px;
  background-size: cover;
  background-position: center center;
  border: 1px solid #eee;
  border-radius: 5px;
  margin: 5px;
}
.itemBox {
  height: 100%;
  width: 100%;
  background-color: white;
  height: 100%;
  margin-top: 3px;
}
.rowBox {
  height: 100%;
}
.colBox {
  height: 100%;
}
li {
  font-size: 14px;
  margin-bottom: 2px;
}
ul {
  padding: 5px;
}
</style>
