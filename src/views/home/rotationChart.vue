<template>
    <div>
        <van-swipe class="my-swipe" :autoplay="3000" style="height: 200px" indicator-color="white">
            <van-swipe-item>
                <img src="../../assets/tp2.png" />
            </van-swipe-item>
            <van-swipe-item>
                <img src="../../assets/tp1.png" />
            </van-swipe-item>
        </van-swipe>
        <van-notice-bar left-icon="volume-o" :scrollable="true">
            <van-swipe vertical class="notice-swipe" :autoplay="3500" :show-indicators="false">
                <van-swipe-item v-for="(value, index) in notices" :key="index">{{$t(`home.${value}`)}}</van-swipe-item>
            </van-swipe>
        </van-notice-bar>
        <van-grid :column-num="2">
            <van-grid-item v-for="item in purviewList" :key="item.id" :icon="item.icon" :text="$t(`home.${item.resourceName}`)" :to="item.requestPath" />
        </van-grid>
    </div>
</template>

<script>
import { getHomeList } from '@/api/home'
import { getUserinfo } from '@/api/test'

export default {
    name: 'RotationChart',
    data() {
        return {
            searchvalue: "",
            list: [],
            notices: ['欢迎来到校园疫情管理系统'],
            messageQuery: {
            },
            identity: '',
        }
    },
    computed:{
        purviewList(){
            if(this.identity === '管理员'){
                return this.list.filter(item => item.purview === 1)
            }else return this.list.filter(item => item.purview === 0)
        }
    },
    mounted(){
        getUserinfo().then(res => this.identity = res.result.identity)
        this.getHomeList()
    },
    methods:{
        getHomeList() { // 加载首页图标数据
            getHomeList().then(res => {
                if (res.status === 0) {
                    this.list = res.result
                } else {
                    this.$toast("加载菜单异常")
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
</style>