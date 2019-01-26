/**
 * echarts图表配置
 */
export default {
    //行情页面配置
    exchangeOption: {
        tooltip: {},
       
        xAxis: {
            // show: false,
            data: [],
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#EAEAEA'
                }
            },
            axisLabel:{
                color:'#A8B0BF',
                fontSize:10,
                rotate:36
            }
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisLabel:{
                color:'#A8B0BF',
                fontSize:12
            }
            // scale: true
        },
        grid: {
            // left: 120
        },
        series: [{
            type: 'line',
            // showSymbol: false,
            lineStyle: {
                color: '#FF7100'
            },
            areaStyle: {
                normal: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: '#FFA810' // 0% 处的颜色
                        }, {
                            offset: 0.8,
                            color: '#FFFFFF' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                }
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320],
        }]
    }
}