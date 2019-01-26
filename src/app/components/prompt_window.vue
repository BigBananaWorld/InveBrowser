<template>
    <transition name="show">
        <div class="winprompt_block font14" v-show="show">
            {{title}}
        </div>
    </transition>
</template>
<script>
/**
 * 该组件主要用于在整个窗口下的弹窗
 */
export default {
    props: {
        title: {
            type: String,
            default: "成功"
        },
        time: {
            type: Number,
            default: 2000
        }
    },
    data: function() {
        return {
            show: false
        }
    },
    methods: {
        showEl() {
            this.show = true
            setTimeout(() => {
                this.show = false
            }, this.time)
        }
    },
    created: function() {

    }
}
</script>
<style>
.winprompt_block {
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    width: 242px;
    box-sizing: border-box;
    padding: 19px 30px;
    background-color: rgba(58, 58, 60, 0.8);
    color: #fff;
    z-index: 4000;
    text-align: center;
}
</style>