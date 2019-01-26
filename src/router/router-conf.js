import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'

Vue.use(Router)
const vueRouter = new Router({
    // mode: 'history',
    routes: [{
            path: '/',
            name: 'index',
            component: function(resolve) {
                return require(['@/app/index.vue'], resolve)
            }
        },
        {
            path: '/deal',
            name: 'deal',
            component: function(resolve) {
                return require(['@/app/dealDetail.vue'], resolve)
            }
        },
        {
            path: '/account',
            name: 'account',
            component: function(resolve) {
                return require(['@/app/accountDetail.vue'], resolve)
            }
        },
        {
            path: '/text',
            name: 'text',
            component: function(resolve) {
                return require(['@/app/textDetail.vue'], resolve)
            }
        },
        {
            path: '/snapshot',
            name: 'snapshot',
            component: function(resolve) {
                return require(['@/app/kzDetail.vue'], resolve)
            }
        },
        {
            path: '/treaty',
            name: 'treaty',
            component: function(resolve) {
                return require(['@/app/treatyDetail.vue'], resolve)
            }
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})


vueRouter.beforeEach(function(to, from, next) {
    console.log(to.name)
    next()
});

export default vueRouter;