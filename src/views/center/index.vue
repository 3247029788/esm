<template>
  <div style="width: 100%; height:100%">
    <!-- 顶栏 Start -->
    <van-sticky :offset-top="0">
      <van-nav-bar :title="$t(`center.${navBar.title}`)" :left-text="navBar.leftText" :leftArrow="navBar.leftArrow" @click-left="onClickLeft" @click-right="onClickRight">
        <template #right>
          <van-icon :name="navBar.icon" size="18" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <!-- 顶栏 End -->
    <!-- 个人资料展示 Start -->
    <div style="background-color: #f5f5f5;">
      <van-row type="flex" justify="center" class="pt-5">
      <van-col span="6">
        <van-image round :src="userInfo.avatar" />
      </van-col>
    </van-row>
    <van-row type="flex" justify="center">
      <van-col span="6">
        <p class="text-center">
          <strong>{{ userInfo.username }}</strong> <br />
          <small><span class="text-secondary"><van-tag type="primary">{{ userInfo.identity }}</van-tag></span></small>
        </p>
      </van-col>
    </van-row>
    </div>
    

    <van-cell-group :title="$t('center.健康')" style="background-color: #f5f5f5;">
      <van-cell :title="$t('center.健康码')" is-link to="healthCode" />
    </van-cell-group>

    <van-cell-group :title="$t('center.个人')">
      <van-cell :title="$t('center.个人详情')" is-link to="userInfo" />
      <van-cell :title="$t('center.信息修改')" is-link to="updateUserInfo" />
      <van-cell :title="$t('center.密码修改')" is-link to="updatePassword" />
    </van-cell-group>

    <van-cell-group :title="$t('center.校园')">
      <van-cell :title="$t('center.校园消息')" is-link to="messageList">
        <van-badge :content="content"/>
      </van-cell>
      <van-cell :title="$t('center.提交记录')" is-link to="submitRecord" />
    </van-cell-group>
  </div>
</template>

<script>
import { getUserinfo } from '@/api/test'
import { getMessage } from '@/api/home'

export default {
  name: "Center",
  data() {
    return {
      navBar: {
        title: "个人中心",
        leftText: "",
        leftArrow: false,
        icon: "setting-o",
      },
      userInfo: {
        username: "",
        identity: "",
        avatar: "",
      },
      content: 0, // 未读消息数量
    };
  },
  mounted(){
    getMessage().then(res => {
      const data = res.result.filter(item => item.isRead !== 1)
      this.content = data.length
    })
    this.userInfo.avatar = require('@/assets/img/default/defaultHead.png');
  },
  created() {
    getUserinfo().then((req) => {
      this.userInfo.username = req.result.username;
      this.userInfo.identity = req.result.identity;
      if (req.result.avatar != null && req.result.avatar.trim() != '') {
        this.userInfo.avatar = req.result.avatar;
      } else {
        this.userInfo.avatar = require('@/assets/img/default/defaultHead.png');
      }

    });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push({ name: "setting" });
    },
  },
};
</script>

<style scoped>
.nav-top {
  position: sticky;
  width: 100%;
  left: 0px;
  z-index: 9999;
  top: 0px;
}
.pt-5{
  padding-top: 0px !important;
}
.text-center{
  font-size: 16px;
  text-align: center !important;
  /* margin-top: 5px; */
}
/deep/.van-col--6{
  height:43px;
  margin-top: 40px;
}
/deep/ .van-cell-group__title{
  background-color: #f5f5f5;
}

/deep/ .van-image__img{
  height: 93.8px;
}
</style>