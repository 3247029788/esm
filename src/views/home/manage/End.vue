<template>
  <div class="box exceptionInfoBox">
    <van-swipe-cell class="box cellBox">
      <van-row class="rowBox">
        <van-col span="8 imageBox" :style="{'background-image': 'url(' + avatarUrl + ')'}">
        </van-col>
        <van-col span="16">
          <ul>
            <li><strong>{{exceptionInfo.userName}}</strong> {{exceptionInfo.userMobile}}</li>
            <li>异常类型：<span class="typeBox" :style="typeBoxStyle">{{exceptionTypeName}}</span></li>
            <li>异常描述：</li>
            <li><a href="#" @click="showDescription()" class="aStyle">{{simpleExceptionDescription}}</a></li>
          </ul>
        </van-col>
      </van-row>
      <template #right>
        <van-button square type="primary" class="cell-button" @click="showInfoTable" text="结果" />
      </template>
    </van-swipe-cell>
    <van-action-sheet style="min-height:50%" v-model="show" title="异常详情">
      <div class="content_info">
        <p><strong>创建时间：</strong>{{createTime}}</p>
        <p><strong>异常描述：</strong></p>
        <p style="text-indent:2em;">{{exceptionInfo.exceptionDescription}}</p>
      </div>
    </van-action-sheet>
    <van-dialog class="content" v-model="showEndTab" title="处理详情">
      <van-cell-group style="height:300px; overflow:auto">
        <van-field label="用户名" :value="resultMsg.username" readonly />
        <van-field label="联系电话" :value="resultMsg.userMobile" readonly />
        <van-field label="上报时间" :value="createTime" readonly />
        <van-field label="解决时间" :value="resultTime" readonly />
        <van-field label="处理人" :value="resultMsg.resultUser" readonly />
        <van-field label="处理人联系方式" :value="resultMsg.resultMobile" readonly />
        <van-field label="处理结果" type="textarea" autosize maxlength="150" :value="resultMsg.result" readonly />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import { getUserinfo } from '@/api/test'
import { getResultMsg } from '@/api/home'
import dayjs from 'dayjs'

export default {
  props: {
    exceptionInfo: {
      type: Object,//类型
      required: true,//必要性
      default: 0 //默认值
    }
  },
  name: 'End',
  data() {
    return {
      show: false,
      showEndTab: false,
      avatarUrl: '/img/default/defaultHead.png',
      resultMsg: {}
    }
  },
  mounted() {
    this.createUrl()
    this.getResult()
  },
  computed: {
    // 日期格式转换
    createTime(){
      return dayjs(this.exceptionInfo.createTime).format('YYYY-MM-DD HH:mm:ss')
    },
    resultTime(){
      return dayjs(this.resultMsg.resultTime).format('YYYY-MM-DD HH:mm:ss')
    },
    exceptionTypeName() {
      return this.exceptionInfo.exceptionType == 0 ? '体温异常' : '其它异常'
    },
    typeBoxStyle() {
      let infoStyel = {
        backgroundColor: "#0066cc"
      }
      let dangerStyle = {
        backgroundColor: "#FF0033"
      }
      return this.exceptionInfo.exceptionType == 0 ? dangerStyle : infoStyel
    },
    simpleExceptionDescription() {
      let simple = '';
      if (this.exceptionInfo.exceptionDescription.length > 10) {
        simple = this.exceptionInfo.exceptionDescription.substr(0, 25) + '... [详情]'
      } else {
        simple = this.exceptionInfo.exceptionDescription + " [详情]"
      }
      return simple;
    }
  },
  methods: {
    createUrl() {
      getUserinfo({username:this.exceptionInfo.username}).then(res => {
        this.avatarUrl = res.result.avatar
      })
    },
    getResult(){
      getResultMsg({id:this.exceptionInfo.id,username:this.exceptionInfo.username}).then(res => {
        this.resultMsg = res.result
      });
    },
    showDescription(desc) {
      this.show = true;
    },
    showInfoTable() {
      this.showEndTab = true
    }
  }
}
</script>

<style scoped>
.exceptionInfoBox {
  margin-top: 3px;
  background-color: white;
}
.cell-button {
  height: 100%;
}
.cellBox {
  height: 120px;
}
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
  padding: 16px 16px 0px 0px;
}
.content_info {
  padding: 16px 16px 160px;
}
</style>