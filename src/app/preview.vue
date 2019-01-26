<template>
    <div class="preview_block container">
        <div class="title ">
            <img src="@/assets/img/preview.png" alt="">
            <span class="word color2">全网预览</span>
            <span class="subword colorA8B">协议版本:5f38e</span>
        </div>
        <div class="cont">
            <div class="">
                <div class="item w20 left">
                    <div class="number color3">{{pageData.accountsTotal | parseNumber}}</div>
                    <div class="subword colorA8B">账户数量</div>
                </div>
                <div class="item w20 left">
                    <div class="number color3">{{pageData.messageTotal | parseNumber}}</div>
                    <div class="subword colorA8B">消息数量</div>
                </div>
                <div class="item w20 left">
                    <div class="number color3">{{pageData.messages.tps | parseNumber}}</div>
                    <div class="subword colorA8B">TPS</div>
                </div>
                <div class="item w20 left">
                    <div class="number color3">{{pageData.messages.shardnumber | parseNumber}}</div>
                    <div class="subword colorA8B">节点数量</div>
                </div>
                <div class="item w20 left">
                    <div class="number color3">{{pageData.messages.runtime | fromToday | parseNumber}}</div>
                    <div class="subword colorA8B">运行天数</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {

    },

    data: function() {
        return {
            pageData:{
                messages:{}
            }
        }
    },
    methods: {
        getData(){
            this.axios.post('preview').then((res) => {
               this.pageData = res.data;
            })
            this.xunhuan();
        },
        xunhuan(){
            // setTimeout(this.getData,5000);
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

.preview_block {
    font-size: 20px;
    background-color: #fff;
    margin-top: 20px;
    /*height: 142px;*/
    padding: 18px 0 0;
    .w20 {
        width: 20%;
    }
    .title {
        padding: 0 20px;
        * {
            vertical-align: baseline;
        }
        img {
            margin-right: .4em;
                display: inline-block;
    transform: translateY(3px);
        }
        .word {
            font-size: 16px;
            margin-right: .7em;
        }
        .subword {
            font-size: 12px;
        }
    }
    .cont {
        
        padding-right: 15px;
        padding-left: 15px;
        .item {
            border-right: 1px solid #EEEEEE;
            text-align: center;
            margin-bottom:1.15em;
            margin-top: .9em;
            .number {
                font-size: 20px;
                margin-bottom: .7em;
            }
            .subword {
                font-size: 14px;
            }
        }
        .item:last-child {
            border-right: 0px solid #EEEEEE;
        }
    }
    @media screen and (max-width: $width-mobile) {
        &{
            margin:20px 10px;
        }
        .w20 {
            width: 50%;
        }
        .cont {
            padding-top: .9em;
            .item{
                margin-bottom:0;
                margin-top: 0;
                padding-top:.9em;
                padding-bottom:1.15em;
                border-bottom: 1px solid #EEEEEE;
                &:first-child,&:nth-child(2){
                    padding-top:0;
                }
                &:last-child {
                    border-bottom: 0px solid #EEEEEE;
                    border-right: 1px solid #EEEEEE;
                     margin-bottom:1.15em;
                padding-bottom:0;
                }
                &:nth-child(2n) {
                    border-right: 0px solid #EEEEEE;
                }
            }
        }
    }
}
</style>