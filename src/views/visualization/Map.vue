<template>
  <div class="map_outer">
    <p class="title">
        <i></i>
        {{ $t('visual.疫情地图') }}
      </p>
    <div id="map" v-show="showNowMap"></div>
    <div id="mapAll" v-show="!showNowMap"></div>
    <div class="btn">
        <button @click="now" :style="style_now">{{ $t('visual.现有确诊') }}</button>
        <button @click="all" :style="style">{{ $t('visual.累计确诊') }}</button>
    </div>
    <div id="line_map"></div>
  </div>
</template>

<script>
import { getMapdata,getCS } from '@/api/visual'
import echarts from 'echarts';

export default {
    name:'Map',
    data() {
        return {
            dataList:[],
            showNowMap: true,
            style_now:{
                color:'',
                border:'',
            },
            style:{

            },
        }
    },
    mounted(){
        this.now()
        getCS()
        this.getLineMap()
    },
    methods:{
        async getMap(){
            try{
                const {result} = await getMapdata()
                const data = result.map(item=> {
                    return {'name':item.province, 'value':item.confirm}
                })
                this.dataList = data
                this.$charts.chinaMap('mapAll',this.dataList)
            }catch(e){
                this.$toast.fail(e.message)
            }
        },
        async now(){
            try{
                this.style_now.color = 'red'
                this.style_now.border = '1px solid red'
                this.style.color = ''
                this.style.border = ''
                this.showNowMap = true
                const {result} = await getMapdata()
                const data = result.map(item=> {
                    return {'name':item.province, 'value':item.now_confirm}
                })
                this.dataList = data
                this.$nowCharts.chinaMap('map',data)
            }catch(e){
                throw(e.message)
            }
        },
        all(){
            this.style.color = 'red'
            this.style.border = '1px solid red'
            this.style_now.color = ''
            this.style_now.border = ''
            this.showNowMap = false
            this.getMap()
        },
        async getLineMap(){
            const {result} = await getCS()
            let myEcharts = echarts.init(document.getElementById('line_map'));

            let dateList = result.map(item => item.date)
            let myData = []
            for(let i = 0;i<dateList.length;i++){
                if((i+1)%7 === 0) myData.push(dateList[i])
            }

            let List1 = result.map(item => item.confirm)
            let myList1 = []
            for(let i = 0;i<dateList.length;i++){
                if((i+1)%7 === 0) myList1.push(List1[i])
            }

            let List2 = result.map(item => item.suspect)
            let myList2 = []
            for(let i = 0;i<dateList.length;i++){
                if((i+1)%7 === 0) myList2.push(List2[i])
            }

            // 设置最高图表
            const dataUrl1 = "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAUqSURBVEiJxZZbiJVVFMd/a3/7+75zzozZYFM52mSaFtikSGF2J0jCQrpAPUSF5FtSL0JPvQRB+RJETz10e4mkAsMoJIMuZCaV2FXNdEIZdRw7jtM5323v3cPe55IRZhAt2PDNMHv9//u/1vqvEaabjv8xNEDy7ifQypB2huQFFCUUFWIMVAasA2fBOTgbXQFEQBQoAR3hoggSDUmMSxNcvQaNGsXamz0BWhnSaiOtDNo5UhSeQFkFAh5cOgTc37AQAQEn4r+VAh1BrCHRuCRBKgPOdd+hASTLkXbuCbQyJCugKAIBC8Z4cBuuOYdnIiFN+Bb/syjxJKIItAoEEqh58C65DgGyHFp5UCJDshzyEilLKA0YC84iDq9GB/NM6QGUwiUaEQU2hziCOO4q6TxDiPoISFEhRYFk/tDOydff47/7a+88sks0jWdf7ZEQcB0FBPKH7iManyD+aBeUGhKLsxYhvDzWUMR9ClQVlBWUJRQlkpeYhfOov/CGL4HtkLDgoL3xYcgKAMyi+WSP3d9jIuCGzqO6fhnlTSuC3B44eXs7cvKUx6qqPgUqg5QVUpogewUO7NBsML5uYl23+QSQovQJfjzI4IbnMItHMYtHuyqgpCu1nGiifjkCjRQ30AgETJ8CNrzS+HqLMaipJmbscrA2dH9vBOX4SZ+kL8rrl0GaoHd+G8AFFymqlWO4ZUuo7X8LZwJGB69HwHWPueRizNjlRN/sRUwFxoUS9LpfHzlO9ujdxB9/RbRvPDSBw4xeDHnRp4LCzr/Q95K1f8LpTJQ+o5dRzdPYVptqbDHpGx9gF4xQXbuU9PWt4VJvFGWq6VvoqoVE+8dRR0+EJB0jUsjkb0hlMEtGUYcnz4QLBJR0ZZPpGdShCdzqVZSrV+GGZiEnmmTr78ENn+/ljyLs3As4764nAGg/s4F466dhFHu5Os1no4jy9pUMbHy+7/d+bv0wKhVcS3nzUAo5eoJ4+5foXT+ACPVNr6GOTjG4YRPxh196++7cA2ovb0HKCnvZCG7uMHbuMGbhPGSySbp5m39ux5j67mnAe3UUedvsnEYNO28YOzwESlDHp1DjE7SffARzxQIGHt8Euq+CscYsGCHe+gl6z35QiuKOG7Dzhv3ci+B05E8U9kO3BHFYFnGMHZ1NecsK7PmzqK5dir1oDm5oFubKy4j2jtPe+BDxx1/jIgWpv+5EcImGSFE8uIZyzWkP2EjRu/fiEm86pLF3xUR7zC6BJIY0xpUJbqCOOnwcvfM7ovGj2DmzqW5aTrZuLTL9O4Prn6a89Rp+f+kpai++6V8rAmlKvH0X6tgUcmrGW63W3qg2PICaOuU3YS3xRAIpYbrp0lfeRWZayEwbaYeNmBeQl36LDdSRyabfE2GGndZ+SVmLnTMbdXLa74Ez+snF2j8uTaCe4uo13GAdN9ggX7c29EAt6ToeSrrsSUrvkKdbEGvcYN0vJlxYUNrvwazAzWoA3nyIopAjEIhjXC2GWoqrh1NL+krQqOEIazLq7O8i7Afjfdv0nBIXCPRHpLru1yOgcbHP59IEQglcI4VGrVeCv7jD34W1JO98hN6976//lIhQLV9Cce9t3RH7JyFn/5O+2LlnFaPD2/TXPw3GX3zbIyFCed0Y1YorZ/h1cjUrr97x3xAA+OCzpVy96D11+Nil8We7AShvXI6df9E4ew7cyR03fn/OOc85tmwb4cjEDtl3wMnPvziOTOxgy7aR/x64PzZ/XpeDh96Xg4feZ/Pn9X+b5g/AMXoVWZPppgAAAABJRU5ErkJggg==";
            const dataUrl2 = "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAUqSURBVEiJxZZNbFRVFMd/5747rzOdtkALttDyHaKAfEMUDST1CxOiibhR2btRF7gjLlxo4g4W6kZ3bnQBGqMYMPEjGEAWYC02RIICQgFFSwttpzPz7j0u7p3XFl1YE+NNzkzezNxz/ud/zvmfkb79vcr/eCzAkbOGSh0m6kI1U2pOqDtwPpjXYAqgoMjfOhMUBAQwEiwxwQoJpInSZIViQSkVYMdKHwBUajBeJwdRy6DuoJ4DEFQVRdDI1520SXwVCUBEBCMagjcAWCGLCTUcWICJTJioByCVOlQzqDmoOwksKKgKqiGMqqJ3kCAKIhGGBEtEYvZKmkDmQRUEwcgUANUsZF6pawQgVCMLmQfnGwwQGQjP0wDEYD5UIT4r1kAhESQFH++Y+F0OoO6g6pRqFoJX6rB7i6OWxdpPo10oJMqbX9u8DAK0FpW9jzle+dRiELralOVzlZVdytoFntNXhC9+TDCi2ERJ3RQGMgdZbLxapH9Ju/Lu8QTnJkF4QgO+sC1jIptegh1LPccvCNuXe55a5xgcFm6Ow5IOePUzi1MoWbBGYrzIBgSaM69kPjRe5kK2c0owpxnmlIO1NwdrsNawNFGeWOP55ExCW1H54FTCa4ctB/oSRqswUglB6356rJwBr5Mj52LNh8aEezp9HL/J7gflxmhw2DjPbfbUnDBSkXxknYebFaFoQxM7Lziv00Y7B6CRWq/QPVtZ1en54erkyGjUgDAFyrVbwnNbPMcvGBa0edZ0h3S8KqqwslNBPUZgXouybZnHJnD5pjBWiwkxpQRTz62KMF6H5fOUgeuG8Zpwd6fSP2joHxS+HzT0Dxq+HxSGxqGtBK8fLhCnHwVai3BXK8xrVYyBuS1KR1lpKtwZLTIg8boR4VYVLg8beldkPLTC0VaCoTFh9xZHR1n5fTSMW2ersvu9lEMDSa6LEjXy5EXhy3MGa2B9j/LNT4bb1aCALenk73IGGpJpDFgBI8qvt4Wj5w19VwwiyttHLb/dFvZ+Yjl63nDkbIKJDkyDTkNUwEl/l4aERe1KIhp8R2luCJGByQ9srt1CqQBds6CjHNDeGIUrw8KL2x2P3uP5uN9gjWJNkFshjJgRDb4M7FztuTQkrOpS5pRh40IfEwxxcgA2gdQGyeyZrTyw1DGrpGzo9qzrVjYuVFbMU87fEB652zM4LBgT7jQMUdIkgOkoK70rPIvbldtV2LzIs77bM7clyrINMXMAadTqJgvNKVwdEQ72JXx0JuHAdwlnrgnPbHJsXqTsOWgZHIF9uzLWd/v8nhDeN/Yo63qU2c3KsZ8NyzqUL88ZnlzjOXdDaLKQxs0IIH37e/X9U4axqjBea2zEIMk1F7ZYOYU/xsLG9HEv2LhcGtrf3gzDlSDTjX6w0QJIpViAUiEkWW5Snt0U13HRBnFQwhYzJpbFKXUnjFbDc1nA+zDBXoNz4p2ag3KqeZMlQr4JC4mQ2hCnWIhmp4xhqQBh2wuJhKyricZtqGQu/CdwHrwPO8HnyhhrKXEi8i4PLNkIokF9k4VSGv6Q5AAeX+X/qhB/c7zCoR8MA9ckV8+p8796vrLzXp+P2D85M/gpfLj34a1ds/3n/Vel5dQvZto63rTIs3aBjl4fNo/teuOLE/8JAIB39vSuXt3FoWsjsvjkxdAE9y3xzJ+llwaus/P5/V8NzMTfjAEAvPnigws2LkwPjlW5XwSaU749fbn29EtvHbs6U1//CgDAvj1bSxs6ih8CfPfHxK6X95+o/Bs/fwIleHxCHzUwBQAAAABJRU5ErkJggg==";
            const data = {
                xdata: myData,
                valList1: myList1,
                valList2: myList2
            };
            
            let option = {
                backgroundColor: '#102147', //设置背景颜色
                title: {
                    top: "4%",
                    left: "1%",
                    text: "全国疫情新增趋势",
                    textStyle: {
                        color: "#fff",
                        fontSize: 16,
                        fontWeight: "400",
                    },
                },
                tooltip: {
                    trigger: "axis",
                    backgroundColor: "#1B366A",
                    borderWidth: 0,
                    textStyle: {
                        color: "#fff",
                    },
                },
                color: ["#65B765", "#448CF6"],
                legend: {
                    top: "10%",
                    right: "10%",
                    icon: "rect",
                    itemHeight: 2,
                    itemWidth: 24,
                    itemGap: 20,
                    data: ["确诊", "疑似"],
                    textStyle: {
                        color: "#fff",
                        fontSize: 16,
                    },
                },
                grid: {
                    top: "20%",
                    left: "5%",
                    right: "5%",
                    bottom: "5%",
                    containLabel: true,
                },
                xAxis: {
                    type: "category",
                    boundaryGap: true,
                    axisLabel: {
                        align: "center",
                        rotate: 45,
                        interval: 0,
                        textStyle: {
                            color: "#fff",
                            fontSize: 8,
                        },
                        margin:20
                    },
                    axisLine: {
                        //不显示坐标轴线
                        show: false,
                    },
                    axisTick: {
                        //不显示坐标轴刻度线
                        show: false,
                    },
                    data: data.xdata,
                },
                yAxis: {
                    type: "value",
                    axisTick: {
                        //不显示坐标轴刻度线
                        show: true,
                    },
                    axisLine: {
                        show: true, //暗藏或显示
                        lineStyle: {
                            type: "solid",
                            color: "#E6EDF9",
                        },
                    },
                    axisLabel: {
                        textStyle: {
                            color: "#fff",
                            fontSize: 16,
                        },
                    },
                    splitLine: {
                        //网格线
                        lineStyle: {
                            type: "dashed", //设置网格线类型 dotted：虚线   solid:实线
                            width: 1,
                        },
                        show: true, //暗藏或显示
                    },
                    data:['3000','6000','9000','12000','15000']
                },
                series: [
                    {
                        name: "确诊",
                        type: "line",
                        showSymbol: false,
                        itemStyle: {
                            normal: {
                            lineStyle: {
                                width: 2,
                            },
                            },
                        },

                        data: data.valList1,
                    },
                    {
                        name: "疑似",
                        type: "line",
                        showSymbol: false,
                        itemStyle: {
                            normal: {
                            lineStyle: {
                                width: 2,
                            },
                            },
                        },
                        data: data.valList2,
                        markPoint: {
                            data: [
                            {
                                type: "max",
                                symbol: dataUrl1,
                            },
                            {
                                type: "min",
                                symbol: dataUrl2,
                            },
                            ],
                            symbol: "none",
                            label: {
                            show: true,
                            position: "bottom", // 显示位置
                            textStyle: {
                                fontSize: 16,
                                color: "#fff",
                            },
                            },
                            symbolSize: [32, 20],
                            symbolOffset: [0, -40],
                        },
                    },
                ],
            };
            myEcharts.setOption(option)
        }
    }
}
</script>

<style lang="less" scoped>
.map_outer{
    p{
        margin: 10px;
        font-size: 18px;
    }
    i{
        width: 6px;
        height: 20px;
        margin-right: 3px;
        margin-left: 10px;
        display: inline-block;
        vertical-align: middle;
        background-color: #4169e2;
    }
    #map{
        margin: 0 5%;
        width: 90%;
        height: 518px;
        user-select: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        padding: 0px;
        background-color: rgb(243,243,243);
        border-width: 0px;
    }
    #mapAll{
        margin: 0 5%;
        width: 90%;
        height: 518px;
        user-select: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        padding: 0px;
        background-color: rgb(243,243,243);
        border-width: 0px;
    }
    #line_map{
        margin: 0 5%;
        width: 90%;
        height: 518px;
        user-select: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        padding: 0px;
        background-color: rgb(243,243,243);
        border-width: 0px;
    }
    .btn{
        height: 60px;
        margin: 0 5%;
    }
    .btn button{
        float: left;
        width: 158px;
        height: 40px;
        margin-right: 20px;
        margin-top: 10px;
        border: 1px solid #d2d2d2;
        background-color: #fff;
        border-radius: 5px;
        font-size: 15px;
        color: #444;
        text-align: center;
        line-height: 40px;
        outline: none;
        margin-bottom: 10px;
        &:nth-of-type(2){
            margin-right: 0;
        }
    }
}
</style>