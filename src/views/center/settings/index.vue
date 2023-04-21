<template>
  <div style="width: 100%">
    <div class="col-12 m-0 p-0">
      <NavTopBar :title="$t('center.设置')" :leftArrow="true" :rightArrow="true" />
    </div>
    <div class="col-12 m-0 p-0">
      <van-cell-group>
        <!-- <van-cell  value="缓存清理" is-link @click="cache" /> -->
        <van-cell  :value="$t('center.语言切换')" is-link @click="languageShow = true" />
        <van-cell  :value="$t('center.关于我')" is-link @click="isShow" />
        <van-cell  :value="$t('center.退出登录')" is-link @click="logout" />
      </van-cell-group>
    </div>
    <div>
      <van-popup class="father" v-model="show" round position="bottom" closeable :style="{ height: '30%' }" >
        <div class="row text-center">
          <p>{{$t('center.校园疫情管理系统')}} V1.0.0 <br/><span class="text-secondary">{{$t('center.让校园管理更加智能高效！')}}</span></p>
        </div>
      </van-popup>
    </div>
    <van-popup v-model="languageShow" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="languageShow = false"
        @confirm="changeLanguage"
      />
    </van-popup>
  </div>
</template>

<script>
import NavTopBar from "@/components/NavTopBar"
import { vantLocales } from '@/lang';

export default {
  name: "Setting",
  data(){
    return{
      show: false,
      languageShow: false,
    }
  },
  components: {
    NavTopBar
  },
  computed:{
    columns(){
      return this.$i18n.locale === 'zh' ? ['中文','英文'] : ['Chinese', 'English']
    }
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
      // 页面刷新
      location.reload()
    },
    changeLanguage(val){
      val === '英文' || val === 'English' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh'
      this.$store.commit('center/setLanguage',this.$i18n.locale)
      vantLocales(this.$i18n.locale) // 这里调用vantLocales函数
      this.languageShow = false
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