<template>
    <div id="app">
        <button @click="toLink('/obj')">点击切换查看obj</button>
        <button @click="toLink('/stl')">点击切换查看stl</button>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
        methods:{
            toLink(val){
                this.$router.push(val);
            }
        }
    }
</script>

<style>
    html, body, #app {
        height: 100%;
    }
</style>
