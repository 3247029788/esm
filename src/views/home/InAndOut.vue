<template>
  <div style="width: 100%">
    <nav-top-bar title="离校申请" :leftArrow="true" :rightArrow="true" />

    <van-form @submit="onSubmit">
      <!-- <van-field name="健康码" label="健康码">
        <template #input>
          <img class="qrCodeImage" src="https://img1.baidu.com/it/u=3541757699,4240409497&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=704" />
        </template>
      </van-field> -->
      <!-- <van-field name="switch" label="进入或离开">
        <template #input>
          <van-switch v-model="switchCheckedInOrOut" size="20" style="margin-right: 10px" />
          {{ switchInOrOutLable }}
        </template>
      </van-field> -->

      <!-- <van-field name="switch" label="健康状况">
        <template #input>
          <van-switch v-model="switchCheckedIsHealth" size="20" :disabled="isHealthDisable" style="margin-right: 10px" />
          {{ switchIsHealthLable }}
        </template>
      </van-field>

      <van-field v-if="! switchCheckedIsHealth" v-model="communityInAndOut.abnormalBodyTemperature" name="异常体温" label="异常体温" placeholder="请输入异常体温" :rules="[{ required: true, message: '异常体温不能为空' }]" /> -->
      <van-field name="学号" label="学号" readonly v-model="userInfo.schoolNumber" />
      <van-field name="姓名" label="姓名" readonly v-model="userInfo.realName" />
      <van-field name="班级" label="班级" readonly v-model="userInfo.class" />
      <van-field name="离校原因" label="离校原因" placeholder="请输入离校原因" v-model="userInfo.leaveReason" :rules="[
          {
            required: true,
          },
        ]" />
      <van-field name="行程轨迹" label="行程轨迹" placeholder="请输入行程轨迹" v-model="userInfo.track" :rules="[{ required: true, message: '请输入行程轨迹' }]" />
      <van-field name="离校时间" label="离校时间" @click="show = true" placeholder="请输入离校时间" v-model="userInfo.leaveTime" :rules="[{ required: true, message: '请选择离校时间' }]" />
      <van-calendar v-model="show" @confirm="onConfirm" />
      <div style="margin: 16px">
        <van-button round :disabled="onSubmitDisabled" block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import NavTopBar from "@/components/NavTopBar"
import { getUserinfo } from "@/api/test"
import { leaveSchool } from "@/api/home"
import _ from 'lodash'

export default {
  name: "InAndOut",
  components: {
    NavTopBar,
  },
  data() {
    return {
      show: false,
      onSubmitDisabled: false,
      userInfo:{
        realName:'',
        schoolNumber: '',
        class: '',
      },
    };
  },
  created() {
  },
  mounted(){
    getUserinfo().then(res=>{
      this.userInfo.schoolNumber = res.result.schoolNumber
      this.userInfo.realName = res.result.realName
      this.userInfo.class = res.result.class
      // this.$forceUpdate()
    })
  },
  computed: {
    // switchInOrOutLable() {
    //   this.switchCheckedInOrOut
    //     ? (this.communityInAndOut.inOrOut = 0)
    //     : (this.communityInAndOut.inOrOut = 1);
    //   return this.switchCheckedInOrOut ? "进入社区" : "离开社区";
    // },
    // switchIsHealthLable() {
    //   this.switchCheckedIsHealth
    //     ? (this.communityInAndOut.isHealth = 0)
    //     : (this.communityInAndOut.isHealth = 1);
    //   return this.switchCheckedIsHealth ? "体温健康" : "体温异常";
    // },
  },
  methods: {
    formatDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.userInfo.leaveTime = this.formatDate(date);
    },
    onSubmit() {
      let user = _.cloneDeep(this.userInfo)
      delete user.schoolNumber
      delete user.class
      delete user.realName
      console.log(user,this.userInfo)
      leaveSchool(user).then(res => {
        if (res.status === 0) {
          this.$toast.success('离校申请提交成功！')
          this.onSubmitDisabled = true;
        } else {
          this.$toast.fail(res.message)
        }
      })
    },
    // 得到用户健康码
    // qrCodeGetByUser() {
    //   qrCodeGetByUserReq().then(res => {
    //     this.qrCodeUrl = window.URL.createObjectURL(res);
    //   })
    // },
    // handlGetQrCodeInfoByUser() {
    //   qrCodeGetInfoByUserReq().then(res => {
    //     if (res.code == 200) {
    //       if (res.data == null) {
    //         this.$toast("没有查询到健康码信息，请联系管理员")
    //         // this.$router.go(-1)
    //       } else {
    //         this.codeInfo = res.data
    //         if (res.data.codeType != 'green') {
    //           this.switchCheckedIsHealth = false
    //           this.isHealthDisable = true
    //         }
    //       }
    //     } else {
    //       this.$toast("查询健康码信息异常")
    //       // 返回上一级
    //       // this.$router.go(-1)
    //     }
    //   })
    // }
  },
};
</script>

<style scoped>
</style>