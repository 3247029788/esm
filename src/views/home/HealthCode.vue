<template>
    <div style="width:100%" class="qrBox">
        <NavTopBar :title="$t('home.个人健康码')" :leftArrow="true" :rightArrow="true" />

        <van-row type="flex" justify="center">
            <van-col span="22" class="userInfoBox ">
                <van-row type="flex" justify="center" class="infoBox">
                    <van-col span="8">
                        <van-icon name="manager" size="20" color="#1989fa" /> {{$t('home.姓名')}}
                    </van-col>
                    <van-col span="16">
                        <van-icon name="phone-circle" size="20" color="#1989fa" /> {{$t('home.联系方式')}}
                    </van-col>
                    <van-col span="8">
                        {{codeInfo.username}}
                    </van-col>
                    <van-col span="16">
                        {{codeInfo.mobile}}
                    </van-col>
                </van-row>
            </van-col>
        </van-row>

        <van-row type="flex" justify="center">
            <van-col span="22" class="qrImgBox">
                <p class="margin:5px">
                    {{nowTime}}
                </p>

                <img class="qrCodeImage" :style="qrDynamicStyle" src="../../assets/qrcode.png" />
            </van-col>
        </van-row>
        <van-row type="flex" justify="center">
            <van-col span="22">
                <van-row type="flex" justify="space-between">
                    <van-col span="11" class="userInfoBox" :style="dayBoxStyle">
                        <strong>{{$t('home.健康打卡天数')}}：</strong>
                        <p>{{day}} {{$t('home.天')}}</p>
                    </van-col>
                    <van-col span="11" class="userInfoBox">
                        <strong>{{$t('home.健康码类型')}}：</strong>
                        <p>
                        {{$t(`home.${codeInfo.codeTypeName}`)}}
                        <van-icon :name="icon" size="18" :color="iconColor" /> <br>
                        </p>
                    </van-col>
                </van-row>
            </van-col>
        </van-row>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import NavTopBar from "@/components/NavTopBar";
import { getCardDays, getHealthcode } from '@/api/home';

export default {
    name: 'HealthCode',
    components: {
        NavTopBar
    },
    data() {
        return {
            day: 0,
            icon: 'checked',
            iconColor: "green",
            nowTime: '2000-07-15 00:00:00',
            qrDynamicStyle: {
                border: "1px solid red"
            },
            dayBoxStyle: {
                backgroundColor: "Thistle",
                color: "white"
            },
            codeInfo: {
                id: '',
                codeType: '',
                codeTypeName: 'xxx',
                username: 'xxx',
                mobile: 'xxxx'
            }
        }
    },
    created() {
        this.continuousDay()
        this.handlGetQrCodeInfoByUser()
        this.timer = setInterval(() => {
            this.nowTime = dayjs().format('YYYY-MM-DD HH:mm:ss'); // 修改数据date
        }, 1000);
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
        }
    },
    methods: {
        handlGetQrCodeInfoByUser() {
            getHealthcode().then(res => {
                if (res.status === 0) {
                    this.codeInfo = res.result
                    switch (this.codeInfo.codeType) {
                    case "red":
                        this.icon = 'clear'
                        this.iconColor = 'red'
                        this.qrDynamicStyle.border = "5px groove #e74033"
                        this.qrDynamicStyle.backgroundColor = "rgb(255, 68, 68)"
                        break;
                    case "yellow":
                        this.icon = 'warning'
                        this.iconColor = 'yellow'
                        this.qrDynamicStyle.border = "5px groove #fcc72d"
                        this.qrDynamicStyle.backgroundColor = "rgb(255, 187, 51)"
                        break;
                    case "gray":
                        this.icon = 'more'
                        this.iconColor = 'gray'
                        this.qrDynamicStyle.border = "5px groove #e2e3e5"
                        this.qrDynamicStyle.backgroundColor = "rgb(142, 142, 147)"
                        break;
                    case "green":
                        this.icon = 'checked'
                        this.iconColor = 'green'
                        this.qrDynamicStyle.border = "5px groove #00a94e"
                        this.qrDynamicStyle.backgroundColor = "rgb(91, 200, 96)"
                        break;
                    default:
                        // this.$router.go(-1)
                        this.$toast.fail("健康码类型错误")
                        break;
                    }
                } else {
                    this.$toast("查询健康码信息异常")
                    // 返回上一级
                    // this.$router.go(-1)
                }
            })
        },
        continuousDay() { // 查询连续打卡天数
            getCardDays().then(res => {
                if (res.status == 0) {
                    this.day = res.result
                    if (this.day > 7) {
                        this.dayBoxStyle.backgroundColor = '#208c44'
                    } else {
                        this.dayBoxStyle.backgroundColor = '#fcc72d'
                    }
                } else {
                    this.$toast("查询连续打卡天数失败")
                }
            })
        }
    }
}
</script>

<style scopec>
  .qrCodeImage {
    margin: 0 auto;
    width: 70%;
  }
  .infoBox {
    margin-top: 10px;
  }
  .userInfoBox {
    margin-top: 8px;
    margin-bottom: 8px;
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    font-size: 15px;
    font-weight: 600;
    background-color: white;
    box-shadow: #ccc 0px 0px 5px;
    border-radius: 5px;
  }
  .userInfoBox > p {
    margin: 0;
  }
  .qrImgBox {
    background-color: white;
    box-shadow: #ccc 0px 0px 5px;
    padding: 20px;
    text-align: center;
    font-size: 15px;
    font-weight: 600;
    border-radius: 5px;
  }
  </style>