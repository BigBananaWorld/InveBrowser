<template>
    <div class="index ">
        <div class="accountDetail_block container">
            <div class="headbox">
                <div class="title">
                    <div class="word">
                        <span class="word1 color2">快照</span>
                        <span class="word2 color3">#f5b975ea5d13c518d4087f3f85805f0f5115f586d5eb50dee3255b21f2fb20207</span>
                    </div>
                    <a href="javascript:;" class="copy" 
                        v-clipboard:copy="pageData.hash"
                        v-clipboard:success="onCopy">
                    <img src="@/assets/img/copy.png" alt="">
                    <div class="copymsg" v-show="isCopy">
                        <span class="colorfff">已复制到剪贴板</span>
                    </div>
                </a>
                </div>
                <div class="cont">
                    <div class="item">
                        <p class="conttitle color9"><span>状态：</span></p>
                        <p class="text color3">已确定</p>
                    </div>
                    <div class="item">
                        <p class="conttitle color9"><span>时间：</span></p>
                        <p class="text color3">16 secs ago (2019/1/12 2:36:59)</p>
                    </div>
                    <div class="item">
                        <p class="conttitle color9"><span>发送人：</span></p>
                        <p class="text color3">TFGyUt7BWRDdNHPvMkYJfXDzd5g5mZEpss</p>
                    </div>
                    <div class="item">
                        <p class="conttitle color9"><span>快照版本</span></p>
                        <p class="text color3">
                            <span>FESE34FEFE</span>
                        </p>
                    </div>
                    <div class="item">
                        <p class="conttitle color9"><span>前一快照：</span></p>
                        <p class="text color3">FJDSHFEOW384HF3923H57DHJFKS73F3U3R3</p>
                    </div>
                     <div class="item">
                        <p class="conttitle color9"><span>当前快照：</span></p>
                        <p class="text color3">FJDSHFEOW384HF3923H57DHJFKS73F3U3R3</p>
                    </div>
                    <div class="item">
                        <p class="conttitle color9"><span>快照点：</span></p>
                        <p class="text color3">888</p>
                    </div>
                    <div class="item">
                        <p class="conttitle color9"><span>Merkle tree：</span></p>
                        <p class="text color3">FJDSHFEOW384HF3923H57DHJFKS73F3U3R3</p>
                    </div>
                    <div class="item">
                        <p class="conttitle color9"><span>手续费总和：</span></p>
                        <p class="text color3">455,886,874,888.878 INVE</p>
                    </div>
                    <div class="item">
                        <p class="conttitle color9"><span>奖励比率：</span></p>
                        <p class="text color3">50%</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="accountBox container">
            <div class="title color2">
                <span>奖励列表</span>
            </div>
            <table class="table-hover" border="1">
                <tr class="tablehead color9">
                    <th>时间</th>
                    <th>接收人</th>
                    <th>数额</th>
                </tr>
                <tbody>
                    <tr v-for="item in listData">
                        <td class="colorA8B">13 mins ago</td>
                        <td><a href="javascript:;" class="color306">L06778L067838L0678L067838L0678L067838L0678L067838L06</a></td>
                        <td>
                            50,000.00 <span> INVE</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            listData: [1, 2, 3, 4],
             pageData:{
                hash:""
            },
             isCopy:false,
            isShowing:null
        }
    },
    methods: {
         onCopy(e){
            this.isCopy = true;
            clearTimeout(this.isShowing);
            this.isShowing = setTimeout(()=>{
                this.isCopy = false;
            },1500)
        },
         getData(hash){
            let formdata = new FormData();
            formdata.append("hash", hash);
            this.axios.post('messagesinfo', formdata).then((res) => {
                console.log(res)
                // this.dataList = res.data.page.list;
                // if (res.data.page.list.length == 0) {
                //     this.total = 1;
                // } else {
                //     this.total = res.data.page.totalPage;
                // }

            })
        }
    },
    created: function() {
        console.log(this.$route.params.id);
    },
    mounted: function() {
         console.log(this.$route.query.hash);
        this.getData(this.$route.query.hash)
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
            .copymsg{
                position: absolute;
                font-size: 12px;
                text-align: center;
                width:112px;
                padding:11px 0;
                background-color: rgba(0,0,0,.6);
                border-radius: 4px;
                left:-45px;
                &:before{
                    content:' ';
                    position: absolute;
                    width:0;
                    height: 0;
                    top:-14px;
                    left:45px;
                    border-top:7px solid transparent;
                      border-bottom:7px solid rgba(0,0,0,.6);
                      border-right:7px solid transparent;
                      border-left:7px solid transparent;

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
                width: 95px;
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
                    width: 62%;
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
            /*text-align: center;*/
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: break-all;
        }

        th:nth-child(1),td:nth-child(1) {
            max-width: 100px;
            width: 15%;
            text-align: left;
        }
    
        td {
            font-size: 12px;
            height: 56px;

            a:hover {
                color: #005AFF;
            }
        }
    }
    @media screen and (max-width: $width-mobile) {
        & {
            padding: 15px 20px 40px;
        }
    }
}
</style>