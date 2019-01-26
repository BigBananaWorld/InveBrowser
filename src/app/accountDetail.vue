<template>
    <div class="index ">
        <div class="accountDetail_block container">
            <div class="headbox">
                <div class="title">
                    <div class="word">
                        <span class="word1 color2">账户地址</span>
                        <span class="word2 color3">{{addr}}</span>
                    </div>
                    <a href="javascript:;" class="copy" v-clipboard:copy="addr" v-clipboard:success="onCopy">
                    <img src="@/assets/img/copy.png" alt="">
                    <div class="copymsg" v-show="isCopy">
                        <span class="colorfff">已复制到剪贴板</span>
                    </div>
                </a>
                </div>
                <div class="cont">
                    <div class="item">
                        <p class="conttitle color9"><span>余额：</span></p>
                        <p class="text color3">
                            {{money}}
                            <span> INVE</span>
                        </p>
                    </div>
                    <div class="item">
                        <p class="conttitle color9"><span>消息数量：</span></p>
                        <p class="text color3">{{msgcount}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="accountBox container">
            <div class="title color2">
                <span>交易列表</span>
            </div>
            <table class="table-hover" border="1">
                <tr class="tablehead color9">
                    <th>Hash值</th>
                    <th>时间</th>
                    <th>发送人</th>
                    <th>接收人</th>
                    <th>数额</th>
                </tr>
                <tbody>
                    <tr v-for="item in listData">
                        <td class="color2">{{item.hash}}</td>
                        <td class="colorA8B">{{item.updatetime | fomatTime}}</td>
                        <td><a href="javascript:;" class="color306">{{item.fromaddress}}</a></td>
                        <td><a href="javascript:;" class="color306">L0678L067</a></td>
                        <td>50,000.00 <span> INVE</span></td>
                    </tr>
                </tbody>
            </table>
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
            listData: [],
            addr: '',
            money:0,
            msgcount:0,
            isCopy: false,
            isShowing: null,
            total:1,
            pageSize:10,
            page:1
        }
    },
    methods: {
        onCopy(e) {
            this.isCopy = true;
            clearTimeout(this.isShowing);
            this.isShowing = setTimeout(() => {
                this.isCopy = false;
            }, 1500)
        },
        pageChange(index){
            this.page = index;
            this.getData(this.addr);
        },
        getData(addr) {
            let formdata = new FormData();
            formdata.append("address", addr);
            formdata.append("limit", this.pageSize);
            formdata.append("page", this.page);
            this.axios.post('messagesinfo', formdata).then((res) => {
                console.log(res)
                if (res.data.code == 0) {
                    this.money = res.data.total;
                    this.msgcount = res.data.address;
                    this.listData = res.data.page.list;
                    this.total = res.data.page.totalCount;
                }

            })
        }
    },
    created: function() {

    },
    mounted: function() {
        this.addr = this.$route.query.addr;
        this.getData(this.addr);
    },
    beforeRouteLeave(to, from, next) {

        next()
    }
}
</script>
<style scoped lang="scss">
$width-mobile: 768px; // 移动端适配宽度
.accountDetail_block {
    font-size: 20px;
    margin-top: 20px;
    padding: 25px 36px 40px;
    background-color: #fff;
    .title {
        padding-bottom: 1em;
        .word {
            display: inline-block;
            max-width: 90%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .word1 {
                font-size: 16px;
            }
            .word2 {
                font-size: 14px;
            }
        }
        .copy {
            display: inline-block;
            position: relative;
            img {
                vertical-align: text-top;
            }
            .copymsg {
                position: absolute;
                font-size: 12px;
                text-align: center;
                width: 112px;
                padding: 11px 0;
                background-color: rgba(0, 0, 0, .6);
                border-radius: 4px;
                left: -45px;
                &:before {
                    content: ' ';
                    position: absolute;
                    width: 0;
                    height: 0;
                    top: -14px;
                    left: 45px;
                    border-top: 7px solid transparent;
                    border-bottom: 7px solid rgba(0, 0, 0, .6);
                    border-right: 7px solid transparent;
                    border-left: 7px solid transparent;
                }
            }
        }
    }
    .cont {
        border-top: 1px solid #F0F5FF;
        padding-top: 1.45em;
        .item {
            vertical-align: top;
            & * {
                display: inline-block;
            }
            .conttitle {
                width: 80px;
                font-size: 14px;
                text-align: left;
            }
            .text {
                word-break: break-all;
                font-size: 12px;
                text-align: left;
            }
        }
    }
    @media screen and (max-width: $width-mobile) {
        & {
            padding: 25px 20px 40px;
        }
        .cont {
            .item {
                .text {
                    width: 65%;
                }
            }
        }
    }
}

.accountBox {
    padding: 15px 36px 40px;
    margin-top: 20px;
    background-color: #fff;
    font-size: 20px;
    .title {
        font-size: 16px;
        /*padding-top: 15px;*/
        padding-bottom: 14px;
        /*padding-left: 23px;*/
    }
    table {
        border-collapse: collapse;
        border: solid #fff;
        border-width: 0px 0px 0px 0px;
        width: 100%;
        table-layout: fixed;
        .tablehead {
            font-size: 14px;
            height: 36px;
        }
        tr {
            border-bottom: 1px solid #F0F5FF;
            border-top: 1px solid #F0F5FF;
        }
        td,
        th {
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: break-all;
        }

        th:nth-child(1) {
            text-align: left;
        }
        th:nth-child(2),
        td:nth-child(2) {
            max-width: 100px;
            width: 15%;
        }
        td {
            font-size: 12px;
            height: 56px;

            a:hover {
                color: #005AFF;
            }
        }
    }
    .pg {
        position: relative;
        height: 110px;
    }
    @media screen and (max-width: $width-mobile) {
        & {
            padding: 15px 20px 40px;
        }
    }
}
</style>