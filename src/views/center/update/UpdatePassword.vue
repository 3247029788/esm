<template>
  <div style="width: 100%">
    <NavTopBar  :title="$t('center.密码修改')" :leftArrow="true" :rightArrow="true"/>
      <van-form validate-first @failed="onFailed" @submit="onSubmit">
        <!-- 通过 pattern 进行正则校验 -->
        <van-field
          v-model="oldPassword"
          type="password"
          name="pattern"
          :label="$t('center.原始密码')"
          :placeholder="$t('center.请输入原始密码')"
        />
        <!-- 通过 pattern 进行正则校验 -->
        <van-field
          v-model="newPassword"
          type="password"
          name="pattern"
          :label="$t('center.新密码')"
          :placeholder="$t('center.请输入新密码')"
          :rules="[
            { pattern, message: '请输入6~8位包含大小写字母数字特殊字符！' },
          ]"
        />
        <!-- 通过 validator 进行异步函数校验 -->
        <van-field
          v-model="repeatPassword"
          type="password"
          name="validator"
          :label="$t('center.重复新密码')"
          :placeholder="$t('center.请重复输入新密码')"
          :rules="[{ validator, message: '两次输入的密码不一致！' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit">{{ $t('btn.提交') }}</van-button>
        </div>
      </van-form>
  </div>
</template>

<script>
import { updatePassword } from "@/api/test";
import NavTopBar from "@/components/NavTopBar"

export default {
  name: "UpdatePassword",
  components:{
    NavTopBar
  },
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      repeatPassword: "",
      pattern:
        /^.*(?=.{6,8})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
    };
  },
  methods: {
    /**返回 */
    onClickLeft() {
      this.$router.replace({ name: "center" });
    },
    /**回到主页 */
    onClickRight() {
      this.$router.replace({ name: "home" });
    },
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator() {
      return this.newPassword === this.repeatPassword;
    },
    onFailed(errorInfo) {
      this.$toast({
        message: "验证不通过，请注意错误提示",
        position: "bottom",
      });
    },
    onSubmit() {
      updatePassword(
        {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          repeatPassword: this.repeatPassword,
        },
      ).then((res) => {
        if (res.status == 0) {
          this.$dialog
            .alert({
              message: "密码修改成功，请重新登录",
            })
            .then(() => {
              this.$store.commit('userToken/clearToken')
              this.$router.replace({ path: "/" });
            });
        } else {
          this.$toast.fail(res.message);
        }
        this.oldPassword = "";
        this.newPassword = "";
        this.repeatPassword = "";
      });
    },
  },
};
</script>

<style>
</style>