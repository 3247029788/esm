<template>
  <div>
    <template v-if="!isEnter">
      <van-sticky :offset-top="0">
        <van-nav-bar
          :title="$t(`chat.健康资讯`)"
        />
      </van-sticky>
      <van-cell class="liaotianshi" @click="loginChat">
        <p slot="title"><van-icon name="phone-o" /> {{ $t(`chat. 线 上 问 诊`) }}</p>
        <p slot="default" style="font-weight:400;color:#fff">{{ $t(`chat.进入聊天室`) }}<van-icon name="arrow" /></p>
      </van-cell>
      <div class="news_bar">
        <div class="section" v-for="(item, index) in newData" :key="index" @click="toDetail(item, index)">
          <div class="news">
            <div class="news-left">
              <img :src="item.pic || require('../../assets/tp1.png')" alt="">
            </div>
            <div class="news-right">
              <div class="newsTitle">{{item.title}}</div>
              <div class="newsMessage">
                <span>{{item.time || '2017-06-07 12:00'}}</span>
                <span>{{item.src || '爱新闻'}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <qq 
      v-else
      :userList="userList"
      @closeChat="closeChat"
    ></qq>
  </div>
</template>

<script>
import Qq from './qq'
import { getUserinfo,getNews } from '@/api/test'

export default {
  components:{
    Qq
  },
  data() {
    return {
      username: "",
      avatar: "",
      uid: null,
      identity: '',
      isEnter: false,
      user: {},
      userList: [],
      sid: null,
      newData: [],
    };
  },
  mounted(){
    getNews().then(res=>{
      this.newData = res.result
    })
  },
  // 发给服务器的信息
  methods: {
    toDetail(item, index){
      this.$router.push({name:'detail',params:{news:item}})
    },

    closeChat(){
      this.isEnter = !this.isEnter;
      if (this.$socket) this.$socket.disconnect();
    },

    async loginChat() {
      this.$socket.open()
      const { result } = await getUserinfo()
      this.uid = result.id
      this.username = result.username
      this.avatar = result.avatar
      this.identity = result.identity
      this.$socket.emit("login", {
        id: this.uid,
        username: this.username,
        avatar: this.avatar,
        identity: this.identity
      });
    },

    connected() {
      this.$socket.open() // 开始连接socket
    },
    close(){
      this.$socket.disconnect()
      this.isEnter = false
    }
  },
  destroyed() {
    if (this.$socket) this.$socket.disconnect();
  },
  // 监听服务器发过来的信息
  sockets: {
    // 成功加入聊天室
    loginSuccess(data){
      this.$toast.success(data.msg);
      this.user = data;
      this.isEnter = true;
    },

    // 接收所有的用户信息
    userList(userList){
      this.userList = userList;
    },

    connecting() {
      console.log('正在连接')
    },
    disconnect() {
      console.log('Socket 断开')
    },
    connect_failed() {
      console.log('连接失败')
    },
    connect() {
      console.log('socket connected')
    },
  }
}
</script>

<style lang="less" scoped>
.chat_bar{
  display: flex;
  width: 94%;
  height: 60px;
  background-color: #bfa;
  margin: 5px 3%;
  align-items: flex-end;
  justify-content: space-between;
  border: 1px solid #999;
  border-radius: 10px;
  p{
    margin:13px;
    color: #ccc7c7;
  }
}
.news_bar{
  height: 70%;
  margin-top: 10px;
  margin-bottom: 50px;
  border-top: 1px solid #999;
}
/deep/ .van-button{
  margin-bottom: 5px;
  margin-right: 5px;
}
.section {
  width: 100%;
  height: 2.5rem;
  border-bottom: 1px solid #ccc;
}
.news {
  height: 2.25rem;
  box-sizing: border-box;
  margin: 10px 10px;
  display: flex;
}
.news-left {
  height: 100%;
  width: 2.8rem;
  display: inline-block;
}
.news-left img {
  width: 100%;
  height: 100%;
}
.news-right {
  flex: 1;
  padding-left: 10px;
}
.newsTitle {
  width: 100%;
  height: 62%;
  color: #404040;
  font-size: 18px;
  overflow: hidden;
}
.newsMessage {
  width: 100%;
  height: 38%;
  display: flex;
  align-items: flex-end;
  font-size: 12px;
  color: #888;
  justify-content: space-between;
}
.liaotianshi{
  border: 3px solid #e6f0eb;
  background-color: rgb(82, 157, 230);
  border-radius: 15px;
  margin-left: 5%;
  margin-top: 5px;
  width: 90%;
  font-size: 18px;
  font-weight: 700;

}
</style>
