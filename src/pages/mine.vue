<template>
    <div class="container"> 
        <NavigationBar />
            <div class="content">
                <div class="head">
                    <div class="imgbox"><img src="../assets/2.jpg"></div>
                    <div class="name">
                    <p class="username">{{username}}</p>
                    </div>
                </div>
                <ul class="minelist">
                    <li>设置个人资料
                        <span class="el-icon-arrow-right"></span>
                    </li>
                    <li>设置推荐类型<span class="el-icon-arrow-right"></span></li>
                    <li>我的订单<span class="el-icon-arrow-right"></span></li>
                    <li>我的影评<span class="el-icon-arrow-right"></span></li>
                    <li>我的收藏<span class="el-icon-arrow-right"></span></li>
                    <li>观影记录<span class="el-icon-arrow-right"></span></li>
                </ul>
                <button type="button" class="Login" :key="isLogin" @click="btn">{{isLogin ? '登陆' : '退出登陆'}}</button>
            </div>
        <TabBar/>
    </div>
</template>
<script>
    import TabBar from '../components/tabbar'
    import NavigationBar from '../components/navigationbar'
    export default{
        name:'Mine',
        components:{TabBar,NavigationBar},
        data(){
            return {
                isLogin:'true'
            }
        },
        methods:{
            btn(){
                if(this.isLogin = this.isLogin){
                    // this.isLogin = !this.isLogin
                    this.$router.push({
                    name:'login',
                    params:{
                        username:this.$route.params.username
                        }
                    })
                }
                
            }
        }
    }
</script>
<style scoped>
.head {
    width: 100%;
    padding: 10px 0;
    padding-top: 7%;
    background: #eeeeee;
}
.head .imgbox {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 50%;
    margin: 0 auto;
}
.head img {
    width: 100%;
    height: 100%;
}
.name {
    margin-top: 10px;
}
.minelist {
    margin-top: 10px;
}
.minelist li {
    text-align: left;
    padding: 15px 0 15px 20px;
    border-top: 1px solid #eeeeee;
    position: relative;
}
.minelist li:last-child {
    border-bottom: 1px solid #eeeeee;
    margin-bottom: 25px;
}
.minelist li span {
    width: 10px;
    position: absolute;
    right: 10px;
}
.Login {
    width: 70%;
    padding: 10px 0;
    border-radius: 5px;
    background: rgb(167, 57, 40);
}
.register {
    width: 70%;
    padding: 10px 0;
    border-radius: 5px;
    background: rgb(60, 179, 113);
}
</style>
