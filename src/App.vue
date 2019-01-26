<template>
<div>
    <div>
     <Header/>
        <!-- <keep-alive> -->
            <router-view></router-view>
        <!-- </keep-alive> -->
    </div>
     <Footer/>

    </div>
</template>
<script>
import Header from '@/app/components/header.vue'
import Footer from '@/app/components/footer.vue'

export default {
    data: function() {
        return {
            
        }
    },
    components: {
        Header,
        Footer
    },
    created: function(){

    }
}
</script>