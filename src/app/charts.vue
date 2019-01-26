<template>
    <div class="charts_block container">
        <div class="row">
            <div class="one col-sm-6 clearfix">
                <div class="title">过去14天消息数</div>
                <div class="chart  left" id="chartone"></div>
            </div>
            <div class="two col-sm-6 clearfix">
                <div class="title">过去14天账户数</div>
                <div class="chart  right" id="charttwo"></div>
            </div>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts/dist/echarts.simple'
// import echarts from 'echarts'
import ecOption from '@/conf/echartsoption.js'
export default {
    components: {

    },

    data: function() {
        return {
            chartOne: {},
            chartTwo: {},
            optionOne:{},
            optionTwo:{},
            currentWidth: 0
        }
    },
    methods: {
        initEcharts(data) {
            this.$nextTick(function() {
                this.chartOne = echarts.init(document.getElementById('chartone'));
                this.chartTwo = echarts.init(document.getElementById('charttwo'));
                let optionjson = JSON.stringify(ecOption.exchangeOption);
                this.optionOne = JSON.parse(optionjson);
                this.optionTwo = JSON.parse(optionjson);
                
                this.optionOne.xAxis.data = this.createDateArray();
                this.optionTwo.xAxis.data = this.createDateArray();

                
                this.getListData().then(res=>{
                    this.optionOne.series[0].data=res.data.accounts;
                    this.optionTwo.series[0].data=res.data.messages;
                    this.chartOne.setOption(this.optionOne);
                    this.chartTwo.setOption(this.optionTwo);
                })
                // setTimeout(()=>{
                //     this.optionOne.series[0].data=[111,222,333,444,555,66,28];
                //     this.chartOne.setOption(this.optionOne);
                // },2000)
                
            })
        },

        getListData(){
            return this.axios.post('graphdatas')
            // .then((res) => {
            //     console.log(res)
                // this.dataList = res.data.page.list;
                // if (res.data.page.list.length == 0) {
                //     this.total = 1;
                // } else {
                //     this.total = res.data.page.totalPage;
                // }

            // })
        },
        listenWidth() {
            let me = this;
            let option = ecOption.exchangeOption;
            window.onresize = function() {
                var docWidth = document.body.clientWidth;
                var temp = me.currentWidth - docWidth;
                if (Math.abs(temp) > 40) {
                    me.chartOne.resize();
                    me.chartTwo.resize();
                    me.currentWidth = docWidth;
                }
            };
        },
        createDateArray(){
            let now = new Date();
            let res = []
            for(let i=1;i<=14;i++){
                let temp = now.getTime()-1000*60*60*24*i;
                let tempDate = new Date(temp);
                let resDate =(tempDate.getMonth()+1)+ '/'+ tempDate.getDate();
                res.push(resDate);
            }
            return res.reverse();
        }
    },

    mounted: function() {
        this.initEcharts();
        this.listenWidth();
        this.createDateArray()
    },
    beforeRouteLeave(to, from, next) {

        next()
    }
}
</script>
<style scoped lang="scss">
$width-mobile: 768px; // 移动端适配宽度
.charts_block {
    margin-top: 20px;
    .title{
        color:#333;
        background-color: #fff;
        text-align: center;
        padding-top: 23px;
        margin-bottom: -10px;
        font-size: 16px;
    }
    .chart {
        width: 100%;
        margin: 0 auto;
        height: 248px;
        background-color: #fff;
    }
    .one {
        padding-left: 0;
        padding-right: 10px;
    }
    .two {
        padding-right: 0px;
        padding-left: 10px;
    }
    @media screen and (max-width: $width-mobile) {
        .one {
            padding-left: 10px;
            padding-right: 10px;
            margin-bottom: 20px;
        }
        .two {
            padding-right: 10px;
            padding-left: 10px;
        }
    }
}
</style>