<template>
    <div class="container">      
        <NavigationBar />
         <div class="content">
            注册
         </div>
        <TabBar/>   
    </div>
</template>
<script>
    import TabBar from '../components/tabbar'
    import NavigationBar from '../components/navigationbar'
    export default{
        name:'register',
        components:{TabBar,NavigationBar},
        data(){
            return {}
        }
    }
</script>
<style scoped>

</style>