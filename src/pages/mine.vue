<template>
    <div class="container"> 
        <NavigationBar />
            <div class="content">
                <div class="head">
                    <p><img src="../assets/2.jpg"></p>
                </div>
                <ul class="minelist">
                    <li>设置个人资料
                        <span>></span>
                    </li>
                    <li>设置推荐类型<span>></span></li>
                    <li>我的订单<span>></span></li>
                    <li>我的影评<span>></span></li>
                    <li>我的收藏<span>></span></li>
                    <li>观影记录<span>></span></li>
                </ul>
                <button type="button" class="Login" :key="isLogin" @click="btn">{{isLogin ? '登陆' : '注册'}}</button>
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
                if(this.isLogin = !this.isLogin){
                    this.isLogin = !this.isLogin
                    this.$router.push({
                    name:'login',
                    params:{

                    }
                })
                }else if(this.isLogin = this.isLogin) {
                    this.isLogin = this.isLogin
                    this.$router.push({
                        name:'login',
                        params:{

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
    height: 26%;
    padding-top: 7%;
    background: #eeeeee;
}
.head p {
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
.minelist {
    margin-top: 10px;
}
.minelist li {
    text-align: left;
    padding: 15px 0 15px 20px;
    border-top: 1px solid #eeeeee;
    position: relative;
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
