<template>
    <div class="index ">
        <div class="ttDetail_block container">
            <div class="title">
                <div class="word">
                    <span class="word1 color2">合约</span>
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
                    <p class="conttitle color9"><span>合约内容：</span></p>
                    <p class="text color3">TFGyUt7BWRDdNHPvMkYJfXDzd5g5mZEpss</p>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
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
                if (res.data.code == 0) {
                   this.pageData = res.data.data;
                }

            })
        }
    },
    created: function() {
        
    },
    mounted: function() {
        this.getData(this.$route.query.hash);
    },
    beforeRouteLeave(to, from, next) {

        next()
    }
}
</script>
<style scoped lang="scss">
$width-mobile: 768px; // 移动端适配宽度
.ttDetail_block {
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
        .cont{
            .item{
                .text{
                    width: 65%;
                }
            }
        }
    }
}
</style>