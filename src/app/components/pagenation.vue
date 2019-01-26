<template>
    <ul class="pagenation">
        <li class="pre" @click="goPre()" :class="{gray:current==1}">上一页</li>
        <li class="page" v-show="sfont" @click="goPage(1)">1</li>
        <span v-show="sfont">...</span>
        <li class="page" v-for="(item,index) in pages" :key="item" @click="goPage(item)" :class="{selected:current==item}">{{item}}</li>
        <span v-show="efont">...</span>
        <li class="page" v-show="efont" @click="goPage(total)" >{{total}}</li>
        <li class="next" @click="goNext()" :class="{gray:current==total}">下一页</li>
    </ul>
</template>
<script>
export default {
    props: {
        total: {
            type: Number,
            default: 10
        }
    },
    computed: {
        pages: function() {
            let left = 1,
                right = this.total;
            let pageArr = []
            if (this.total <= 7) {
                while (left <= right) {
                    pageArr.push(left);
                    left++;
                }
                this.efont = false;
                this.sfont = false;
                return pageArr;
            }

            if(this.total>7 && this.current<=5){
                this.efont = true
                this.sfont = false
                while(left <= 6){
                    pageArr.push(left);
                    left++;
                }
                
                return pageArr;
            }

            if(this.total>7 && this.current <= this.total -5 && this.current > 5){
                 this.efont = true
                this.sfont = true
                left = this.current-2
                right = this.current + 2
                while (left <= right) {
                    pageArr.push(left);
                    left++;
                }
                return pageArr;
            }

            if(this.total>7 && this.current>(this.total-5)){
               
                this.sfont = true
                this.efont = false
                left = this.total -5
                while(left <= right){
                    pageArr.push(left);
                    left++;
                }
                return pageArr;
            }

            return pageArr;
        }
    },
    data: function() {
        return {
            current: 1,//当前页
            sfont:false,//是否显示左边的‘...’
            efont:false
        }
    },
    methods: {
        goPage: function(param) {
            if(this.current != param){
                this.current = param
                this.$emit('changgPage',param)
            }
            
        },
        goPre: function(){
            if(this.current>1){
                this.current--
                this.$emit('changgPage',this.current)
            }
       
        },
        goNext: function(){
            if(this.current < this.total){
                this.current++
                this.$emit('changgPage',this.current)
            }
           
        }
    },
    created: function() {

    }
}
</script>
<style scoped>
.pagenation{
    position: absolute;
    right:65px;
    top:42px;
}

.pagenation .pre,.pagenation .next {
    display: inline-block;
    cursor: pointer;
    border: 1px solid #E5E5E4;
     padding-top: 2px;
    padding-right:4px;
    padding-left:4px;
    height:26px;
    color: #3065C5;
    margin-right: 6px;
    font-size:14px;
}

.pagenation .pre.gray,.pagenation .next.gray{
    color:#A8B0BF;
}

.pagenation .page {
     display: inline-block;
     box-sizing: border-box;
     padding-top: 2px;
    cursor: pointer;
    border: 1px solid #E5E5E4;
    width:26px;
    height:26px;
    color: #3065C5;
    margin-right: 6px;
    font-size:14px;
    text-align: center;
}

.pagenation .selected {
    background-color: #E6EFFF;
     border: 1px solid #F0F5FF;
}
</style>