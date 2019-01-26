<template>
    <div class="main exchange_block clearfix">
        <div class="market left">
            <div>
                <div class="classification_box clearfix">
                    <ul class="classification left" :style="selectStyle">
                        <li v-for="(item,index) in typeList" :key="index" @click="changeCoin(item.name,index)">
                            <a href="javascript:void(0)" class="font16 color999" :class="{active:item.name == currentCoin}">{{item.name}}</a></li>
                    </ul>
                </div>
                <div class="select_box right" v-show="typeList.length > 12">
                    <a @click="turnleft()" class="color999 font16" href="javascript:;">
                        <img src="@/img/exchange/left.png" alt=""></a>
                    <a @click="turnright()" class="color999 font16" href="javascript:;"><img src="@/img/exchange/right1.png" alt="" style="margin-left:15px;"></a>
                </div>
            </div>
            <div class="table">
                <ol>
                    <li class="exchange">交易所</li>
                    <li class="pair">交易对</li>
                    <li class="base">平台价</li>
                    <li class="lastprice">最新成交价</li>
                    <li class="change" style="color:#666;">24H变化</li>
                    <li class="hightest">24H最高</li>
                    <li class="lowest">24H最低</li>
                    <li class="deal">总成交量</li>
                    <!-- <li class="trend">24H趋势</li> -->
                </ol>
                <ul v-for="(item,index) in datalist" :key="index">
                    <li class="exchange"><img :src="item.namepic" alt=""><span>{{item.exchangenamech}}</span></li>
                    <li class="pair"><span>{{item.tradingpair.replace('_','/')}}</span></li>
                    <!-- <li class="base">{{getUnit(item.tradingpair)}} {{item.pricebase.toFixed(2)}}</li> -->
                    <li class="base"><img v-show="getUnit(item.tradingpair)" :src="getUnit(item.tradingpair)" alt=""><span>{{parseNumber(item.pricebase.toFixed(2))}}</span></li>
                    <li class="lastprice"><img v-show="getUnit(item.tradingpair)" :src="getUnit(item.tradingpair)" alt=""><span>{{parseNumber(item.price.toFixed(2))}}</span></li>
                    <li class="change" :class="{red: item.change24h>0}"><span v-show="item.change24h>0">+</span><span>{{item.change24h}}%</span></li>
                    <li class="hightest"><img v-show="getUnit(item.tradingpair)" :src="getUnit(item.tradingpair)" alt=""><span>{{parseNumber(item.high.toFixed(2))}}</span></li>
                    <li class="lowest"><img v-show="getUnit(item.tradingpair)" :src="getUnit(item.tradingpair)" alt=""><span>{{parseNumber(item.low.toFixed(2))}}</span></li>
                    <li class="deal"><span>{{parseNumber(item.volume)}}</span></li>  
                    <!--  <li class="trend">
                        <div class="echar" :id="'echartid'+index"></div>
                    </li> -->
                </ul>
            </div>
            <div class="pg">
                <Pagenation v-bind:total="total" v-on:changgPage="pageChange" ref="initPg" />
            </div>
        </div>
        <div class="right">
            <div class="excmsg">
                <excMsg></excMsg>
            </div>
            <excRank></excRank>
        </div>
    </div>
</template>
<script>
// import echarts from 'echarts'
// import ecOption from '@/conf/echartsoption.js'
import Units from '@/conf/exchangeunit.js'
import excMsg from '@/app/components/exchange_msg.vue'
import excRank from '@/app/components/exchange_rank.vue'
import Pagenation from '@/app/components/pagenation.vue'

export default {
    components: {
        Pagenation,
        excMsg,
        excRank
    },
    computed: {
        selectStyle: function() {
            return {
                transform: 'translateX(-' + this.widh + 'px)'
            }
        }
    },
    data: function() {
        return {
            currentSelect: 0,
            currentType: 1,
            typeList: [],
            datalist: [],
            page: 1,
            pageSize: 15,
            total: 1,
            shownum: 12,
            widh: 0,
            currentCoin: '',
            units: Units.units
        }
    },
    methods: {
        turnleft() {
            if (this.currentSelect > 0) {
                this.currentSelect--
                    this.classificationMove(0)
            }
        },
        turnright() {
            if (this.typeList.length > this.shownum) {
                this.currentSelect++
                    this.classificationMove(1)
            }
        },
        classificationMove(type) {
            if (type == 1) {
                if (this.currentSelect >= 0 && this.typeList.length >= 12 && this.shownum < this.typeList.length) {
                    this.widh = this.currentSelect * 400
                    this.shownum = 12 + this.currentSelect * 6
                }
            }
            if (type == 0) {
                this.shownum = 12 + this.currentSelect * 6
                if (this.currentSelect >= 0 && this.typeList.length >= 12 && this.shownum < this.typeList.length) {
                    this.widh = this.currentSelect * 400

                }
            }


        },
        getCoinTypes() {
            this.axios({
                method: 'get',
                baseURL: this.rootUrl,
                url: 'content/api/coindog'
            }).then(result => {
                let obj = result.data.list
                for (let i = 0, len = 30; i < len; i++) {
                    this.typeList.push(obj[i])
                }

            })
        },
        changeCoin(name='BTC',index=0){
            this.page = 1;
            this.$refs.initPg.current = 1
            this.getData(name,index)
        },

        getData(name = 'BTC', index = 0) {
            this.currentCoin = name
            this.currentType = index + 1
            this.axios({
                method: 'get',
                baseURL: this.rootUrl,
                url: 'content/api/selectByName',
                params: {
                    name: this.currentCoin,
                    page: this.page,
                    limit: this.pageSize
                }
            }).then(result => {
                if (result.data.code == 0) {
                    this.datalist = result.data.page.list
                    this.total = result.data.page.totalPage
                    // this.initEcharts()
                }
            })

        },

        pageChange(param) {
            this.page = param

            this.getData(this.currentCoin, 0)
        },

        // initEcharts(data) {
        //     this.$nextTick(function() {
        //         this.datalist.forEach((value, index) => {
        //             let myChart = echarts.init(document.getElementById('echartid' + index))
        //             let option = ecOption.exchangeOption
        //             myChart.setOption(option);
        //         })
        //     })
        // },
        parseNumber(num) {
            let num1 = parseInt(num)
            if (num1 > 10000) {
                return (num1 / 10000).toFixed(2) + '万'
            }
            return num
        },
        getUnit(str) {
            if (str.indexOf('USD') > 0 || str.indexOf('USDT')>0) {
                return this.units.us
            }
            if (str.indexOf('EUR') > 0) {
                return this.units.eu
            }
            if (str.indexOf('KRW') > 0) {
                return this.units.kr
            }
            if (str.indexOf('GBP') > 0) {
                return this.units.en
            }
            if (str.indexOf('BTC') > 0) {
                return this.units.btc
            }
            if (str.indexOf('ETH') > 0) {
                return this.units.eth
            }

        }
    },
    created: function() {

    },
    mounted: function() {
        this.getData()
        this.getCoinTypes()
    }

}
</script>
<style>
.exchange_block .market {
    width: 835px;
}

.exchange_block .select_box {
    transform: translateY(-35px);
}

.exchange_block .market .classification_box {
    max-width: 790px;
    overflow: hidden;
    position: relative;
}

.exchange_block .classification {
    white-space: nowrap;
    height: 36px;
    transition: transform 0.8s;
    -webkit-transition: -webkit-transform 0.8s;
}

.exchange_block .classification li {
    position: relative;
    display: inline-block;
    /*width: 55px;*/
    margin-right: 40px;
    padding-bottom: 15px;
    overflow: hidden;
    text-align: left;
}

.exchange_block .classification a:after {
    content: "";
    width: 0;
    height: 3px;
    background: #333333;
    position: absolute;
    bottom: 0;
    left: 0%;
    transition: all .2s;
}

.exchange_block .classification a.active {
    font-weight: bold;
    font-size: 16px;
    color: #333333;
}

.exchange_block .classification a:hover:after,
.exchange_block .classification a.active:after {
    left: 0%;
    width: 100%;
}

.exchange_block .table {
    margin-top: 32px;
}

.exchange_block .table ol {
    height: 60px;
    margin: 0;
    border: 1px solid #E5E5E5;
}

.exchange_block .table ol li {
    box-sizing: border-box;
    float: left;
    color: #666;
    font-size: 14px;
    line-height: 58px;
}

.exchange_block .table ul {
    display: block;
    box-sizing: border-box;
    height: 52px;
    margin: 0;
    border-left: 1px solid #E5E5E5;
    border-right: 1px solid #E5E5E5;
    border-bottom: 1px solid #E5E5E5;
}

.exchange_block .table ul li {
    box-sizing: border-box;
    float: left;
    color: #333;
    font-size: 14px;
    height: 52px;
    line-height: 51px;
}
.exchange_block .table ul li *{
    display: inline-block;
    vertical-align: middle;
}

.exchange_block .table ul li img {
    /*width: 9px;*/
    height:13px;
    margin-right: 3px;
}

.exchange_block .table .exchange {
    padding-left: 16px;
    /*line-height: 50px;*/
    width: 130px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    text-overflow: -o-ellipsis-lastline;
        -webkit-box-orient: vertical;
}

.exchange_block .table .exchange img {
    height: 18px;
    width: 18px;
    /*transform: translateY(3px);*/
    margin-right: 11px;
}

.exchange_block .table .lastprice {
    width: 100px;
}

.exchange_block .table .change {
    width: 90px;
    color: #3CB034;
}

.exchange_block .table .red {
    color: #D32124;
}

.exchange_block .table .pair {
    width: 90px;
}

.exchange_block .table .base {
    width: 100px;
}

.exchange_block .table .hightest {
    width: 100px;
}

.exchange_block .table .lowest {
    width: 100px;
}

.exchange_block .table .deal {
    width: 100px;
}


/*.exchange_block .table .trend {
    width: 120px;
    padding-right: 16px;
    text-align: center;
    overflow: hidden;
}*/

.exchange_block .table .trend .echar {
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    width: 65px;
    height: 110px;
    padding: 0px;
    border-width: 0px;
    cursor: default;
    transform: translateY(-29px);
}

.exchange_block .excmsg {
    margin-bottom: 24px;
    margin-top: 5px;
}

.exchange_block .pg {
    position: relative;
    padding-top: 20px;
    padding-bottom: 50px;
}
</style>