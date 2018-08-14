<template>
    <div class="container">      
        <NavigationBar/>
         <div class="content">
             <div class="banner"></div>
             <div class="movieName">
                 <h3>{{obj.title}}</h3>
                 <p class="address">{{obj.address}}</p>
             </div>
         </div>
    </div>
</template>
<script>
    import NavigationBar from '../components/navigationbar'
    export default {
        name:"buy",
        components:{NavigationBar},
        data(){
            return {
                id:this.$route.params.id,
                obj: {},
                data:[],
                contentlist:''
            }
        },
        created(){
            this.$axios.get('../../static/JSON/cinema.json')
            .then(res => { // 请求成功
                this.contentlist = res.data.result.data;
                var _this = this
                var obj = this.contentlist.find(function(x){
                    return x.id == _this.id
                })
                // 对应id的电影的所有数据 这是一个对象
                this.obj = obj
                // this.id = res.data.result.data[0].id
                console.log(this.contentlist);
            })
            .catch(error => { // 请求异常
            console.log(">>")
            });
        },
    }
</script>
<style scoped>

</style>
