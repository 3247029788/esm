<template>
  <div class="outer">
    <template v-if="!ischat">
      <van-nav-bar
        :title="$t(`chat.聊天室`)"
        :left-text="$t(`chat.返回`)"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="avatar" style="margin-bottom: 8px;">
        <img :src="user.avatar" alt="" />
        <span>{{ user.username }}</span>
      </div>
      <!-- <van-search v-model="value" placeholder="请输入搜索关键词" /> -->
      <van-notice-bar
        left-icon="volume-o"
        :text="notice"
      />
      <div
        class="group"
        @click="chooseGroup"
      >
        <img src="../../assets/img/star.png" alt="" />
        <span>{{$t(`chat.群聊`)}}</span>
      </div>
      <div v-for="(item, index) in userListSelect" :key="index">
        <van-row class="rowBox" style="border-bottom:1px solid #999" @click="chooseUser(item, index)">
          <van-col span="8 imageBox" :style="{'background-image': 'url(' + item.avatar + ')'}"/>
          <van-col span="16">
            <van-tag type="primary">{{ item.identity }}</van-tag>
            <span class="username">{{ item.username }}</span>
          </van-col>
        </van-row>
      </div>
    </template>
    <!-- 聊天页面 -->
    <chatcopy
      ref="chatroom"
      v-show="ischat"
      :user="user"
      :username="username"
      :userList="userList"
      :isGroup="isGroup"
      :active="active"
      @close="close"
      @sendServer="sendServer"
      @handleFile="handleFile"
    />
  </div>
</template>

<script>
import { getUserinfo } from '@/api/test'
import Chatcopy from './chatcopy'

export default {
  props: {
    userList: Array,
  },
  components:{
    Chatcopy,
  },
  data() {
    return {
      value: '',
      user:{
        avatar: '',
        username: '',
        uid: null,
        identity: '',
      },
      notice: '', // 提示谁加入或者离开聊天室
      ischat: false, // 是否为聊天页面
      isGroup: true, // 是否群聊
      active: null, // 当前聊天用户
      username: '', // 私聊的用户名
    }
  },
  computed:{
    userListSelect(){
      return this.userList.filter(item => item.username !== this.user.username)
    }
  },
  mounted(){
    this.loginChat()
  },
  methods:{
    // 回到之前的页面
    onClickLeft(){
      this.$emit('closeChat')
    },

    close(){
      this.ischat = !this.ischat
    },

    async loginChat() {
      const { result } = await getUserinfo()
      this.user.uid = result.id
      this.user.username = result.username
      this.user.avatar = result.avatar
      this.user.identity = result.identity
    },

    // 点击群聊进入群聊房间
    chooseGroup() {
      this.ischat = true
      this.isGroup = true;
    },

    // 发消息
    sendServer(content, isGroup) {
      const { username, avatar, sid, identity } = this.user;
      const tosid = this.sid;
      // 群聊
      if (isGroup) {
        this.$socket.emit("sendMessage", { username, avatar, identity, msg: content });
      } else {
        // 私聊
        this.$socket.emit("oneMessage", {
          username,
          avatar,
          sid,
          tosid,
          msg: content,
        });
      }
    },

    // 发送图片
    handleFile(file, isGroup) {
      const { username, avatar, sid } = this.user;
      const tosid = this.sid;
      if (isGroup) {
        this.$socket.emit("sendImage", { username, avatar, file });
      } else {
        this.$socket.emit("oneImage", { username, avatar, file, tosid, sid });
      }
    },

    // 点击用户进行单聊
    chooseUser(user, index) {
      if (user.username == this.user.username) return;
      this.ischat = true
      this.isGroup = false;
      if (this.active !== index) {
        this.active = index;
        this.username = user.username;
        this.$refs.chatroom.clearMsg()
        // 单聊人的sid
        this.sid = user.sid
      }
    },
    
  },
  sockets:{
    addUser(data){
      this.$store.commit("chatroom/setJoinRoom", data);
      const user = this.$store.state.chatroom.joinRoom
      this.$nextTick(()=>{
        this.notice = this.$t(`chat.欢迎`) + ' ' + user.username + ' ' + this.$t(`chat.进入聊天室`)
      })
    },

    // 用户离开聊天室
    leaveroom(data){
      this.$store.commit("chatroom/setLeaveRoom", data);
      const user = this.$store.state.chatroom.leaveRoom
      this.notice = user.username + this.$t(`chat.离开了聊天室`)
    },

    // 把接收到的消息显示到聊天窗口中
    receiveMessage(data){
      this.$refs.chatroom.handleGroup(data);
    },

    // 把接收到的图片显示到聊天窗口中
    receiveImage(data){
      this.$refs.chatroom.handleGroup(data);
    },

    // 一对一单聊消息
    oneMsg(data){
      this.$refs.chatroom.handleOne(data);
    },

    // 一对一单聊图片
    oneImg(data){
      this.$refs.chatroom.handleOne(data);
    },
  }
}
</script>

<style lang="less" scoped>
.outer{
  overflow-y: scroll;
    .avatar {
      position: relative;
      left: 10px;
      top: 5px;
      span {
        position: absolute;
        left: 53px;
        top: 11px;
        font-size: 18px;
        color: yellow;
      }
      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        border: 1px solid #999;
      }
    }
    .group {
      display: flex;
      align-items: center;
      width:100%;
      margin-right: 10px;
      padding-bottom: 5px;
      cursor: pointer;
      box-sizing: border-box;
      border-bottom:1px solid #999;
      &:active{
        background-color: #eaeded;
      }
      img {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        margin: 5px;
      }
      span {
        margin-left: 20px;
        font-size: 20px;
        color: red;
      }
    }
}
.rowBox{
    background-color: #fff;
    &:active{
        background-color: #eaeded;
    }
    .username{
        line-height: 60px;
        font-size: 20px;
        color: #999;
        margin-left: 20px;
    }
    /deep/ .van-tag{
      margin-top: 10px;
    }
    /deep/ .van-col:nth-of-type(2){
      display:flex;
      align-items: flex-start;
    }
}
.imageBox {
  display: inline-block;
  vertical-align: top;
  width: 50px; /* 容器必须设置宽高 */
  height: 50px;
  background-size: cover;
  background-position: center center;
  border: 1px solid #eee;
  border-radius: 5px;
  margin: 5px;
}
</style>