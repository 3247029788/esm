<template>
  <div class="box infoBox">
    <van-swipe-cell class="box cellBox">
      <van-cell :title="$t('home.姓名')" :value="info.username" :label="$t('home.点击审批')" @click="openDialog">
      </van-cell>
      <!-- <template #right>
        <van-button square type="primary" class="cell-button" :text="$t('home.处理')" />
      </template> -->
    </van-swipe-cell>

    <van-dialog v-model="showEndTab" :title="$t('home.离校审批')" show-cancel-button :before-close="beforeClose" @confirm="confirm(info.id)">
      <van-field v-model="info.username" :label="$t('home.姓名')" readonly/>
      <van-field v-model="info.leaveReason" :label="$t('home.离校原因')" readonly/>
      <van-field v-model="info.track" :label="$t('home.行程')" readonly/>
      <van-field v-model="info.leaveTime" :label="$t('home.离校时间')" readonly/>
      <van-field v-model="createTime" :label="$t('home.申请时间')" readonly/>
      <van-field v-model="result" rows="4" autosize :label="$t('home.处理结果')" type="textarea" maxlength="150" :placeholder="$t('home.请输入结果')" show-word-limit />
    </van-dialog>

    <van-dialog v-model="show" :title="$t('home.返校审批')" show-cancel-button :before-close="beforeClose" @confirm="confirm(info.id)">
      <van-field v-model="info.username" :label="$t('home.姓名')" readonly/>
      <van-field v-model="info.returnReason" :label="$t('home.返校原因')" readonly/>
      <van-field v-model="temperature" :label="$t('home.体温')" readonly/>
      <van-field v-model="info.returnReason" :label="$t('home.核酸结果')" readonly/>
      <van-field v-model="info.track" :label="$t('home.行程')" readonly/>
      <van-field v-model="info.returnTime" :label="$t('home.返校时间')" readonly/>
      <van-field v-model="createTime" :label="$t('home.申请时间')" readonly/>
      <van-field v-model="result" rows="4" autosize :label="$t('home.处理结果')" type="textarea" maxlength="150" :placeholder="$t('home.请输入结果')" show-word-limit />
    </van-dialog>
  </div>
</template>

<script>
import { postLeaveResult,postReturnResult } from '@/api/home'
import dayjs from 'dayjs'

export default {
  props: {
    info: {
      type: Object,//类型
      required: true,//必要性
      default: 0 //默认值
    },
    active: {
      type: Number,//类型
      required: true,//必要性
      default: 0 //默认值
    }
  },
  name: 'Message',
  data() {
    return {
      show: false,
      showEndTab: false,
      result: '',
      excuteMsg: {},
    }
  },
  mounted() {
  },
  computed: {
    // 日期格式转换
    createTime(){
      return dayjs(this.info.createTime).format('YYYY-MM-DD HH:mm:ss')
    },
    temperature(){
      if(this.info.temperature === 'up') return '体温过高'
      else return '体温正常'
    },
  },
  methods: {
    endExec() {
      this.showEndTab = true
    },
    openDialog(){
      if(this.active) this.show = true
      else this.showEndTab = true
    },
    confirm(id){
      if(this.active === 0){
        console.log(this.result)
        postLeaveResult({id,result:this.result}).then(res => {
          if(res.status === 0) {
            this.$toast.success('审批成功！')
            this.$emit('updateList')
          }
          else this.$toast.fail('审批失败！')
        })
      }else{
        postReturnResult({id,result:this.result}).then(res => {
          if(res.status === 0) {
            this.$toast.success('审批成功！')
            this.$emit('updateList')
          }
          else this.$toast.fail('审批失败！')
        })
      }
    },
    beforeClose(action, done) {
      if (action == 'confirm' && this.result.trim().length <= 0) {
        this.$toast("请输入处理结果！")
        done(false)
      } else {
        done()
      }
    }
  }
}
</script>

<style scoped>
.infoBox {
  margin-top: 3px;
  background-color: white;
}
.cell-button {
  height: 100%;
}
/* .cellBox {
  height: 120px;
} */
.rowBox {
  min-height: 120px;
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
li {
  font-size: 14px;
  margin-bottom: 2px;
}
ul {
  padding: 5px;
}
.typeBox {
  color: white;
  border-radius: 5px;
  padding: 3px;
}
.aStyle {
  color: #666666;
  font-size: 13px;
}
.content {
  padding: 16px 16px 160px;
}
</style>