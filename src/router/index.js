import Vue from 'vue'
import Router from 'vue-router'
import stldemo from "@/components/StlDemo"
import objdemo from "@/components/ObjDemo"

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
// 安装路由
Vue.use(Router)



export default new Router({
    routes: [
        {
            path: '/stl',
            name: 'stldemo',
            component: stldemo
        }, {
            path: '/obj',
            name: 'objdemo',
            component: objdemo
        }
    ]
})