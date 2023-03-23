<template>
    <div class="outer">
        <van-tabs class="tabs"  v-model="active" type="card" background="#F1F1F1" color="white" title-active-color="#333" title-inactive-color="#333">
            <van-tab title="全国疫情数据(含港澳台)" name="a">
                <van-grid :column-num="2" style="padding:0;">
                    <van-grid-item style="text-align: center;padding:0;">
                        <div class="cover_today_confirm">
                            <h4>现有确诊</h4>
                            <div class="number" style="color:red">9006774</div>
                            <p class="added" style="display: block;">较昨日<span style="color:red">+24325</span></p>
                        </div>
                    </van-grid-item>
                    <van-grid-item style="text-align: center;padding:0;">
                        <div class="cover_today_confirm">
                            <h4>累计确诊</h4>
                            <div class="number" style="color:#a31d13">9506895</div>
                            <p class="added" style="display: block;">较昨日<span style="color:#a31d13">+46184</span></p>
                        </div>
                    </van-grid-item>
                </van-grid>
                <van-grid :column-num="3" style="padding:0;">
                    <van-grid-item style="text-align: center;padding:0;">
                        <div class="cover_today_confirm">
                            <h4>境外输入</h4>
                            <div class="number" style="color:#ffa352">28824</div>
                            <p class="added" style="display: block;">较昨日<span style="color:#ffa352">+116</span></p>
                        </div>
                    </van-grid-item>
                    <van-grid-item style="text-align: center;padding:0;">
                        <div class="cover_today_confirm">
                            <h4>累计死亡</h4>
                            <div class="number" style="color:#333">31509</div>
                            <p class="added" style="display: block;">较昨日<span style="color:#333">+78</span></p>
                        </div>
                    </van-grid-item>
                    <van-grid-item style="text-align: center;padding:0;">
                        <div class="cover_today_confirm">
                            <h4>累计治愈</h4>
                            <div class="number" style="color:#34aa70">468612</div>
                            <p class="added" style="display: block;">较昨日<span style="color:#34aa70">+5552</span></p>
                        </div>
                    </van-grid-item>
                </van-grid>
                <span class="introduce">
                    截至2022-12-28 00:00
                </span>
            </van-tab>

            <van-tab name="b">
                <template slot="title">
                    <van-icon name="location-o" slot="left-icon"/>
                    {{provinceNcov.province}}疫情数据
                </template>
                <van-grid :column-num="3" style="padding:0;">
                    <van-grid-item style="text-align: center;padding:0;">
                        <div class="cover_today_confirm">
                            <h4>累计确诊</h4>
                            <div class="number" style="color:#a31d13">{{ provinceNcov.confirm }}</div>
                            <p class="added" style="display: block;">较昨日<span style="color:#a31d13">+{{ provinceNcov.confirm_add }}</span></p>
                        </div>
                    </van-grid-item>
                    <van-grid-item style="text-align: center;padding:0;">
                        <div class="cover_today_confirm">
                            <h4>累计死亡</h4>
                            <div class="number" style="color:#333">{{provinceNcov.dead}}</div>
                            <p class="added" style="display: block;">较昨日<span style="color:#333">+{{provinceNcov.dead_add}}</span></p>
                        </div>
                    </van-grid-item>
                    <van-grid-item style="text-align: center;padding:0;">
                        <div class="cover_today_confirm">
                            <h4>累计治愈</h4>
                            <div class="number" style="color:#34aa70">{{ provinceNcov.heal }}</div>
                            <p class="added" style="display: block;">较昨日<span style="color:#34aa70">+{{provinceNcov.heal_add}}</span></p>
                        </div>
                    </van-grid-item>
                </van-grid>
                <span class="introduce">
                    截至2022-12-28 00:00
                </span>
                <van-button class="zj_btn" block size="small" round @click="showPopup">
                    <van-icon name="location-o" />
                    {{provinceNcov.province}}
                    <van-icon name="arrow-down" />
                </van-button>
                <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
                    <van-area title="请选择地区" :area-list="areaProvince" value="code" @change="change" @cancel="cancel" @confirm="confirm"/>
                </van-popup>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { getProvince,getProvinceNcov } from '@/api/visual'

export default {
    name: 'Ncovdata',
    data() {
        return {
            active: 'a',
            areaProvince:{},
            show:false,
            provinceNcov:{
                province:'浙江',
            },
            code:'',
        }
    },
    mounted(){
        getProvince().then(res => {
            const province = res.result
            this.areaProvince = {province_list:{...province},city_list:{},county_list:{}}
        }),
        getProvinceNcov({province:this.provinceNcov.province}).then(res => {
            this.provinceNcov = {...res.result}
        })
    },
    methods:{
        confirm(code){
            this.provinceNcov.province = code[0].name
            getProvinceNcov({province:this.provinceNcov.province}).then(res => {
                this.provinceNcov = {...res.result}
            })
            this.show = false;
        },
        change(val){
            console.log(val)
        },
        showPopup(){
            this.show = true;
        },
        cancel(){
            this.show = false;
        }
    }
}
</script>

<style lang="less" scoped>
.outer{
    width: 90%;
    margin:0 5%;
}
.tabs{
    // border: 1px solid black;
    box-shadow: 0 0 10px rgba(11, 1, 1, 0.4);
    border-radius: 4px;  
    padding-bottom: 5px;
}
.cover_today_confirm{
    width: 100%;
    height: 100%;
    // background: #bfa;
    border-radius: 4px;
    h4{
        font-size: 12px;
        margin: 7px 0;
    }
    .added{
        font-size: 8px;
        color:#999;
    }
}
/deep/.van-grid-item .van-grid-item__content {
  padding: 1px;
}
.introduce{
    font-size: 12px;
    color: #999;
    margin: 7px 10px;
    vertical-align: middle;
}
.zj_btn{
    width: 150px;
    border: 1px solid #999;
    margin: 10px 20px;
}
</style>