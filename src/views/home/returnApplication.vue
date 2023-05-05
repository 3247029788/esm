<template>
  <div style="width: 100%">
    <nav-top-bar :title="$t('home.返校申请')" :leftArrow="true" :rightArrow="true" />

    <van-form @submit="onSubmit">
      <van-field name="学号" :label="$t('home.学号')" readonly v-model="userInfo.schoolNumber || '无'" />
      <van-field name="姓名" :label="$t('home.姓名')" readonly v-model="userInfo.realName" />
      <van-field name="班级" :label="$t('home.班级')" readonly v-model="userInfo.class || '无'" />
      <van-field name="temperature" :label="$t('home.体温')">
        <template #input>
          <van-radio-group v-model="userInfo.temperature" direction="horizontal">
            <van-radio name="down">37.3℃  {{$t('home.以下')}}</van-radio>
            <van-radio name="up">37.3℃  {{$t('home.以上')}}</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="uploader" :label="$t('home.核酸结果')">
        <template #input>
          <van-uploader v-model="userInfo.uploader" :after-read="afterRead"/>
        </template>
      </van-field>
      <van-field name="返校方式" :label="$t('home.返校方式')" :placeholder="$t('home.请输入返校方式')" v-model="userInfo.returnReason" :rules="[{  required: true},]" />
      <van-field name="行程轨迹" :label="$t('home.行程轨迹')" :placeholder="$t('home.请输入行程轨迹')" v-model="userInfo.track" :rules="[{ required: true, message: '请输入行程轨迹' }]" />
      <van-field name="返校时间" :label="$t('home.返校时间')" @click="show = true" :placeholder="$t('home.请输入返校时间')" v-model="userInfo.returnTime" :rules="[{ required: true, message: '请选择返校时间' }]" />
      <van-calendar v-model="show" @confirm="onConfirm" />
      <div style="margin: 16px">
        <van-button round :disabled="onSubmitDisabled" block type="info" native-type="submit">{{$t('btn.提交')}}</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import NavTopBar from "@/components/NavTopBar"
import { getUserinfo } from "@/api/test"
import { returnSchool } from "@/api/home"
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
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      this.userInfo.picture = file.content
    },
    formatDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.userInfo.returnTime = this.formatDate(date);
    },
    onSubmit() {
      if (this.userInfo.temperature === 'up') {
        this.$dialog.confirm({
          title: '高温预警',
          message: '你的体温异常，是否继续提交',
        })
          .then(() => {
            this.uploadForm();
          })
      } else {
        this.uploadForm();
      }
    },
    uploadForm() {
      let user = _.cloneDeep(this.userInfo)
      delete user.schoolNumber
      delete user.class
      delete user.realName
      delete user.uploader
      returnSchool(user).then(res => {
        if (res.status === 0) {
          this.$toast.success('返校申请提交成功！')
          this.onSubmitDisabled = true;
        } else {
          this.$toast.fail(res.message)
        }
      })
    },
  },
};
</script>

<style scoped>
</style>