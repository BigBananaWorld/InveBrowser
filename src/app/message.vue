<template>
    <div class="message_block container">
        <div class="title clearfix">
            <img src="@/assets/img/message.png" alt="">
            <span class="word color2">全网预览</span>
            <div class="select">
                <a href="javascript:;" class="item" :class="{active:item.type==currentType}" v-for="item in types" @click="changeType(item.type)">
                    {{item.name}}
                </a>
            </div>
        </div>
        <div class="cont clearfix">
            <div v-for="(unit,index) in dataList">
                <div class="item jy container" v-if="unit.type == 1">
                    <div class="row">
                        <div class="col-sm-8">
                            <div class="word">
                                <img src="@/assets/img/jy.png" alt="">
                                <a href="javascript:;" class="color3" @click="goToDetail(unit.type,unit.hash)">{{unit.hash}}</a>
                            </div>
                            <div class="sub clearfix">
                                <div class="subitem left">
                                    <span class="color9">发送人：</span>
                                    <a href="javascript:;" class="color306" @click="goToAddress(unit.fromAddress)">{{unit.fromAddress}}</a>
                                </div>
                                <div class="subitem right">
                                    <span class="color9">接受人：</span>
                                    <a href="javascript:;" class="color306" @click="goToAddress(unit.toAddress)">{{unit.toAddress}}</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="rightbox">
                                <div class="time colorA8B">
                                    <span>{{unit.timestamp | fomatTime}}</span>
                                </div>
                                <div class="money">
                                    <span class="color9 s">交易金额：</span>
                                    <span>{{unit.amount}} </span>
                                    <span class="color9 s">INVE</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item hy container" v-if="unit.type == 2">
                    <div class="row">
                        <div class="col-sm-8">
                            <div class="word">
                                <img src="@/assets/img/hy.png" alt="">
                                <a href="javascript:;" class="color3" @click="goToDetail(unit.type,unit.hash)">{{unit.hash}}</a>
                            </div>
                            <div class="sub clearfix">
                                <div class="subitem left">
                                    <span class="color9">合约内容：</span>
                                    <span>{{unit.data}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="rightbox">
                                <div class="time colorA8B">
                                    <span>{{unit.timestamp | fomatTime}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item wb container" v-if="unit.type == 4">
                    <div class="row">
                        <div class="col-sm-8">
                            <div class="word">
                                <img src="@/assets/img/wb.png" alt="">
                                <a href="javascript:;" class="color3" @click="goToDetail(unit.type,unit.hash)">{{unit.hash}}</a>
                            </div>
                            <div class="sub clearfix">
                                <div class="subitem left">
                                    <span class="color9">文本内容：</span>
                                    <span>{{unit.context}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="rightbox">
                                <div class="time colorA8B">
                                    <span>{{unit.timestamp | fomatTime}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item kz container" v-if="unit.type == 3">
                    <div class="row">
                        <div class="col-sm-8">
                            <div class="word">
                                <img src="@/assets/img/kz.png" alt="">
                                <a href="javascript:;" class="color3" @click="goToDetail(unit.type,unit.hash)">{{unit.hash}}</a>
                            </div>
                            <div class="sub clearfix">
                                <div class="subitem left">
                                    <span class="color9">快照版本：</span>
                                    <span>{{unit.snapVersion}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="rightbox">
                                <div class="time colorA8B">
                                    <span>{{unit.timestamp | fomatTime}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pg">
                <Pagenation v-bind:total="total" v-on:changgPage="pageChange" ref="pg" />
            </div>
        </div>
    </div>
</template>
<script>
import Pagenation from '@/app/components/pagenation.vue'
export default {
    components: {
        Pagenation
    },
    data: function() {
        return {
            types: [{
                    name: '全部',
                    type: 0
                },
                {
                    name: '交易',
                    type: 1
                },
                {
                    name: '合约',
                    type: 2
                },
                {
                    name: '文本',
                    type: 4
                },
                {
                    name: '快照',
                    type: 3
                }
            ],
            currentType: 0,
            dataList: [],
            total: 1,
            page: 1,
            pageSize: 10
        }
    },
    methods: {
        pageChange(index) {
            this.page = index;
            this.getData();
        },
        changeType(type) {
            this.currentType = type;
            this.page = 1;
            this.getData(type);
        },
        getData(type = 0) {
            let formdata = new FormData();
            formdata.append("limit", this.pageSize);
            formdata.append("page", this.page);
            if (type != 0) {
                formdata.append("type", type);
            }
            this.axios.post('messageslist', formdata).then((res) => {
                this.dataList = res.data.page.list;
                if (res.data.page.list.length == 0) {
                    this.total = 1;
                } else {
                    this.total = res.data.page.totalPage;
                }

            })
        },
        xunhuan() {
            // setTimeout(this.getData,5000);
        },
        goToDetail(type, hash) {
            if (type == 1) {
                this.$router.push({
                    path: "/deal",
                    query: {
                        hash: hash
                    }
                })
            }
            if (type == 2) {
                this.$router.push({
                    path: "/treaty",
                    query: {
                        hash: hash
                    }
                })
            }
            if (type == 3) {
                this.$router.push({
                    path: "/snapshot",
                    query: {
                        hash: hash
                    }
                })
            }
            if (type == 4) {
                this.$router.push({
                    path: "/text",
                    query: {
                        hash: hash
                    }
                })
            }
        },
        goToAddress(addr){
            this.$router.push({
                    path: "/account",
                    query: {
                        addr: addr
                    }
                })
        }
    },
    created: function() {
      
    },
    mounted: function() {
        this.getData();
    },
    beforeRouteLeave(to, from, next) {
        next()
    }
}
</script>
<style scoped lang="scss">
$width-mobile: 768px; // 移动端适配宽度
.message_block {
    font-size: 20px;
    background-color: #fff;
    margin-top: 20px;
    /*height: 142px;*/
    padding: 14px 0 0 0;
    .w20 {
        width: 20%;
    }
    .title {
        padding: 0 60px 0 22px;
        height: 50px;
        border-bottom: 1px solid #F0F5FF;
        img {
            margin-right: .4em;
            display: inline-block;
            transform: translateY(3px);
            vertical-align: baseline;
        }
        .word {
            font-size: 16px;
            margin-right: .7em;
            vertical-align: baseline;
        }
        .select {
            float: right;
            .item {
                &.active,
                &:hover {
                    color: #3065C5;
                    &:before {
                        content: '';
                        position: absolute;
                        width: 100%;
                        height: 2px;
                        top: 41px;
                        background-color: #005AFF;
                    }
                }

                display: inline-block;
                position:relative;
                font-size: 14px;
                color:#808EA7;
                margin-right:1.7em;
            }
            .item:last-child {
                margin-right: 0;
            }
        }
    }
    .cont {
        .item {
            padding: 0 60px 0 22px;
            padding-bottom: 1em;
            padding-top: 1em;
            border-bottom: 1px solid #F0F5FF;
        }

        .word {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            img {
                vertical-align: baseline;
            }
            a {
                font-size: 16px;
            }
            a:hover {
                color: #005AFF;
            }
        }
        .sub {
            font-size: 12px;
            margin-top: 1em;
            .subitem {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 100%;
                a:hover {
                    color: #005AFF;
                }
            }
        }
        .time {
            font-size: 12px;
            line-height: 28px;
            text-align: right;
        }
        .money {
            margin-top: .5em;
            font-size: 14px;
            line-height: 28px;
            text-align: right;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .s {
                font-size: 12px;
            }
        }
        .jy {
            border-left: 4px solid #FFD387;
            .sub {
                .subitem {
                    width: 45%;
                }
            }
        }
        .hy {
            border-left: 4px solid #9BDDB5;
        }
        .wb {
            border-left: 4px solid #87DEFF;
        }
        .kz {
            border-left: 4px solid #D2ACFD;
        }
        .pg {
            position: relative;
            height: 110px;
        }
    }
    @media screen and (max-width: $width-mobile) {
        & {
            margin: 20px 10px;
            padding: 8px 0 0 0;
        }
        .w20 {
            width: 50%;
        }
        .title {
            padding: 0 20px 0 20px;
            height: 60px;
            .select {
                float: none;
                .item {
                    &.active,
                    &:hover {
                        &:before {
                            top: 23px;
                        }
                    }
                }
            }
        }
        .cont {
            .item {
                padding: 14px 20px 14px 20px;
                .rightbox {
                    margin-top: 14px;
                }
            }
            .jy {

                .money {
                    margin-top: 0;
                    float: left;
                    text-align: left;
                    width: 65%;
                    /*overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;*/
                }
                .time {
                    float: right;
                    width: 35%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>