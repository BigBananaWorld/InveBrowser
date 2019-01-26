<template>
    <div class="index">
        <Preview></Preview>
        <Charts></Charts>
        <Message></Message>
    </div>
</template>
<script>
import Preview from '@/app/preview.vue'
import Message from '@/app/message.vue'
import Charts from '@/app/charts.vue'
export default {
    components: {
        Preview,
        Message,
        Charts
    },

    data: function() {
        return {
            
        }
    },
    methods: {
         
    },
    created: function() {
        
    },
    mounted: function() {
        
    },
     beforeRouteLeave(to, from, next) {
        
        next()
    }
}
</script>