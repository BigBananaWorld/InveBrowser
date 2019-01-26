<template>
    <transition name="show">
        <div class="prompt_block font14" v-show="show">
            {{title}}
        </div>
    </transition>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: "成功"
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
            }, 2000)
        }
    },
    created: function() {

    }
}
</script>
<style>
.prompt_block {
    position: absolute;
    border-radius: 4px;
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