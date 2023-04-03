import echarts from 'echarts';

const install = function(Vue){
    Object.defineProperties(Vue.prototype, {
        $charts: {
            get(){
                return{
                    chinaMap(id,dataList){
                        let myEcharts = echarts.init(document.getElementById(id));
                        let option = {
                            title: {
                                text: '中国疫情图',
                                subtext:'点击省份可以查看确诊病例数',
                                left: '20',
                                top: '20',
                                textStyle: {
                                    fontSize: 16,
                                    fontWeight:'normal'
                                },
                            },
                            tooltip: {
                                triggerOn: "click",
                                formatter: function(e, t, n) {
                                    return '.5' == e.value ? e.name + "：有疑似病例" : e.seriesName + "<br />" + e.name + "：" + e.value
                                }
                            }, 
                            toolbox: {
                                show: true,
                                orient: 'vertical',
                                left: 'right',
                                top: 'center',
                                feature: {
                                    dataView: {readOnly: false},
                                    restore: {},
                                    saveAsImage: {}
                                }
                            }, // 提供下载工具
                            visualMap: {
                                min: 0,
                                max: 100000,
                                left: 26,
                                bottom: 40,
                                itemWidth:20,
                                showLabel: !0,
                                text: ["高", "低"],
                                pieces: [{
                                    gt: 100000,
                                    label: "> 100000人",
                                    color: "#7f1100"
                                }, {
                                    gte: 10000,
                                    lte: 100000,
                                    label: "10000 - 100000人",
                                    color: "#ff5428"
                                }, {
                                    gte: 1000,
                                    lt: 10000,
                                    label: "1000 - 10000人",
                                    color: "#ff8c71"
                                }, {
                                    gt: 100,
                                    lt: 1000,
                                    label: "100 - 1000人",
                                    color: "#ffd768"
                                }, {
                                    gt: 1,
                                    lt: 100,
                                    label: "1 - 100人",
                                    color: "#ffffff"
                                }],
                                show: !0
                            },
                            geo: {
                                map: "china",
                                roam: !1,
                                scaleLimit: {
                                    min: 1,
                                    max: 2
                                },
                                zoom: 1.23,
                                top: 100,
                                label: {
                                    normal: {
                                        show: !0,
                                        fontSize: "12",
                                        color: "rgba(0,0,0,0.7)"
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        //shadowBlur: 50,
                                        //shadowColor: 'rgba(0, 0, 0, 0.2)',
                                        borderColor: "rgba(0, 0, 0, 0.2)"
                                    },
                                    emphasis: {
                                        areaColor: "skyblue",
                                        shadowOffsetX: 0,
                                        shadowOffsetY: 0,
                                        borderWidth: 0
                                    }
                                }
                            },
                            series: [{
                                name: "确诊病例",
                                type: "map",
                                geoIndex: 0,
                                data: dataList
                            }]
                        }
                        myEcharts.setOption(option)
                    }
                }
            }
        }
    })
}

export default install