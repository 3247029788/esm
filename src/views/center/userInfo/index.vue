<template>
  <div style="width: 100%" class="outer">
    <div>
      <NavTopBar :title="$t('center.个人详情')" :leftArrow="true" :rightArrow="true" />
    </div>
    <van-cell-group inset :title="$t('center.基础信息')">
      <van-cell :title="$t('center.头像')">
        <van-image scale-down width="100" height="100" :src="userInfo.avatar" />
      </van-cell>
      <van-cell :title="$t('center.身份')" :value="userInfo.identity" />
      <van-cell :title="$t('center.登录名')" :value="userInfo.username" />
      <van-cell :title="$t('center.真实姓名')" :value="userInfo.realName === null ? $t('center.请完善信息') : userInfo.realName" />
      <van-cell :title="$t('center.昵称')" :value="userInfo.nickName === null ? $t('center.请完善信息') : userInfo.nickName" />
      <van-cell :title="$t('center.性别')" :value="userInfo.sex == 1 ? $t('center.男') : $t('center.女')" />
    </van-cell-group>
    <van-cell-group inset :title="$t('center.隐私信息')">
      <van-cell :title="$t('center.手机号码')" :value="userInfo.mobile === null ? $t('center.请完善信息') : userInfo.mobile" />
      <van-cell :title="$t('center.固定电话')" :value="userInfo.tel === null ? $t('center.请完善信息') : userInfo.tel" />
      <van-cell :title="$t('center.电子邮箱')" :value="userInfo.email === null ? $t('center.请完善信息') : userInfo.email" />
      <van-cell :title="$t('center.家庭地址')" :value="userInfo.address === null ? $t('center.请完善信息') : userInfo.address" />
    </van-cell-group>
    <van-cell-group inset :title="$t('center.校园信息')">
      <van-cell :title="$t('center.期')" :value="userInfo.periodNumber" />
      <van-cell :title="$t('center.栋')" :value="userInfo.buildingNumber" />
      <van-cell :title="$t('center.单元')" :value="userInfo.unitNumber" />
      <van-cell :title="$t('center.层')" :value="userInfo.layerNumber" />
      <van-cell :title="$t('center.户')" :value="userInfo.householdNumber" />
    </van-cell-group>
  </div>
</template>

<script>
import { getUserinfo } from '@/api/test'
import NavTopBar from "@/components/NavTopBar"
export default {
  name: "userInfo",
  data() {
    return {
      userInfo: {},
    };
  },
  components: {
    NavTopBar
  },
  created() {
    getUserinfo().then((req) => {
      this.userInfo = req.result;
      if (req.result.avatar === null || req.result.avatar.trim() === '') {
        this.userInfo.avatar = "/img/default/defaultHead.png"
      }
    });
  },
};
</script>

<style lang="less" scoped>
.outer{
  background-color: #bfa;
  overflow-y:auto;
}
</style>