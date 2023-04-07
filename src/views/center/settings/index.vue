<template>
  <div style="width: 100%">
    <div class="col-12 m-0 p-0">
      <NavTopBar title="设置" :leftArrow="true" :rightArrow="true" />
    </div>
    <div class="col-12 m-0 p-0">
      <van-cell-group>
        <van-cell  value="缓存清理" is-link @click="cache" />
        <van-cell  value="关于我" is-link @click="isShow" />
        <van-cell  value="退出登录" is-link @click="logout" />
      </van-cell-group>
    </div>
    <div>
      <van-popup class="father" v-model="show" round position="bottom" closeable :style="{ height: '30%' }" >
        <div class="row text-center">
          <p>校园疫情管理系统 V1.0.0 <br/><span class="text-secondary">让校园管理更加智能高效！</span></p>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import NavTopBar from "@/components/NavTopBar"

export default {
  name: "Setting",
  data(){
    return{
      show: false
    }
  },
  components: {
    NavTopBar
  },
  methods: {
    /**模拟清理缓存 */
    cache(){
      this.$toast.success("清理成功")
    },
    /**显示关于我弹出窗口 */
    isShow(){
      this.show = !this.show
    },
    /**退出登录 */
    logout(){
      this.$store.commit('userToken/clearToken')
      this.$router.replace({ path: "/" });
    }
  },
};
</script>

<style lang="less" scoped>
.father{
  display: flex;
  justify-content: center;/*实现水平居中*/
  align-items:center; /*实现垂直居中*/
  p{
    text-align: center;
    font-size:16px;
    margin-bottom: 36px;
    span{
      display: block;
      margin-top: 5px;
      font-size: 12.8px;
      color:rgb(142, 142, 147);
    }
  }
}
</style>