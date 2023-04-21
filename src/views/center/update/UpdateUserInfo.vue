<template>
  <div style="width: 100%">
    <!-- $('center.') -->
    <NavTopBar :title="$t('center.信息修改')" :leftArrow="true" :rightArrow="true" />
    <van-form @submit="onSubmit">
      <van-field name="uploader" :label="$t('center.头像上传')">
        <template #input>
          <van-uploader multiple :max-count="1" v-model="uploader" :max-size="500 * 512" @oversize="onOversize" :after-read="afterRead" />
        </template>
      </van-field>
      <van-field name="登录名" :label="$t('center.登录名')" :placeholder="$t('center.请输入登录名')" readonly v-model="userInfo.username" :rules="[
          {
            pattern: uPattern,
            message: '登录名格式错误：4到8位（中文，字母，数字，下划线，减号）！',
          },
        ]" />
      <van-field name="昵称" :label="$t('center.昵称')" :placeholder="$t('center.请输入昵称')" v-model="userInfo.nickName" :rules="[
          {
            pattern: nPattern,
            message:
              '昵称格式不正确！(昵称格式：最长不得超过7个汉字，或14个字节(数字，字母))',
          },
        ]" />
      <van-field name="真实姓名" :label="$t('center.真实姓名')" :placeholder="$t('center.请输入真实姓名')" v-model="userInfo.realName" :rules="[{ pattern: nPattern, message: '姓名格式不正确！' }]" />
      <van-field name="radio" :label="$t('center.性别')">
        <template #input>
          <van-radio-group v-model="userInfo.sex" direction="horizontal">
            <van-radio :name="1">{{$t('center.男')}}</van-radio>
            <van-radio :name="0">{{$t('center.女')}}</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field type="email" name="电子邮箱" :label="$t('center.电子邮箱')" :placeholder="$t('center.请输入电子邮箱')" v-model="userInfo.email" :rules="[{ pattern: ePattern, message: '电子邮箱格式不正确' }]" />
      <van-field type="mobile" name="手机号码" :label="$t('center.手机号码')" :placeholder="$t('center.请输入手机号码')" v-model="userInfo.mobile" :rules="[{ pattern: mPattern, message: '手机号码格式不正确' }]" />
      <van-field name="固定电话" :label="$t('center.固定电话')" :placeholder="$t('center.请输入固定电话')" v-model="userInfo.tel" :rules="[{ pattern: tPattern, message: '电话号码格式不正确' }]" />
      <van-field name="家庭地址" :label="$t('center.家庭地址')" :placeholder="$t('center.请输入家庭地址')" v-model="userInfo.address" :rules="[{ required:true, message: '请输入家庭地址' }]" />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">{{ $t('btn.提交') }}</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import NavTopBar from "@/components/NavTopBar"
import { updateUserInfo,getUserinfo } from '@/api/test'

export default {
  name: "UpdateUserInfo",
  components: {
    NavTopBar,
  },
  data() {
    return {
      uploader: [],
      userInfo: {},
      uPattern: /^[a-zA-Z0-9_\-\u4e00-\u9fa5]{1,8}$/,
      pPattern:
        /^.*(?=.{6,8})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
      tPattern: /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/,
      mPattern:
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
      ePattern:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      nPattern: /^(?:[\u4e00-\u9fa5·A-Za-z0-9]{2,7})$/,
    };
  },
  created() {
    getUserinfo().then((res) => {
      this.userInfo = res.result;
      // let avatar;
      // if (this.userInfo.avatar != null && this.userInfo.avatar.trim() != '') {
      //   avatar = res.data.avatar;
      //   getImageReq({ path: avatar }).then((r) => {
      //     this.uploader.push({
      //       url: window.URL.createObjectURL(r),
      //       isImage: true,
      //     });
      //   });
      // }
    });
  },
  methods: {
    /**表单提交 */
    onSubmit() {
      updateUserInfo(this.userInfo).then((res) => {
        if (res.status === 0) {
          this.$dialog.alert({
            message: "身份信息变更成功",
          })
        } else {
          this.$toast.fail(res.message);
        }
      });
    },
    /**图片太大 */
    onOversize() {
      this.$toast.fail("文件太大了，请重新选择");
      this.uploader.splice(0, 1);
    },
    /**图片上传 */
    afterRead(file) {
      this.userInfo.avatar = file.content
      // let fromData = new FormData(); //创建form对象
      // fromData.append("file", file.file);
      // fromData.append("purpose", "avatar");
      // console.log(fromData);
      // uploadFileReq(fromData).then((res) => {
      //   this.userInfo.avatar = res.data;
      // });
    },
  },
};
</script>

<style>
</style>