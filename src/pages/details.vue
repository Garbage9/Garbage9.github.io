<template>
    <div container>        
        <NavigationBar :goback="true"/>
        <div class="content">
            <div class="header">
            <div class="imgbox"><img :src="obj.images.large"></div>
            <ul class="synopsis-list">
                <li class="name">
                    <h3 class="CN">{{obj.title}}</h3>
                    <!-- <span class="EN">{{obj.original_title}}</span> -->
                </li>
                <li class="genres-list">类型：
                    <span class="genres">{{obj.genres[0]}}</span>
                    <span class="genres">{{obj.genres[1]}}</span>
                    <span class="genres">{{obj.genres[2]}}</span>
                </li>
                <li class="director">导演：
                    <span>{{obj.directors[0].name}}</span>
                    <span>{{obj.directors[1].name}}</span>
                </li>
                <li class="casts">主演：
                    <span>{{obj.casts[0].name}}</span>
                    <span>{{obj.casts[1].name}}</span>
                    <span>{{obj.casts[2].name}}</span>
                </li>
                <li class="time"></li>
                <li class="long">上映时间：{{obj.year}}</li>
                <li class="score">豆瓣评分：{{obj.rating.average}}</li>
            </ul>
            <div class="plot"></div>
            <div class="evaluate"></div>
            </div>
            <div class="plot">
                <h3>剧情：</h3>
                <p><img :src="obj.images.small"></p>
                <p><img :src="obj.images.small"></p>
            </div>
        </div>
    </div>
</template>
<script>
    import NavigationBar from '../components/navigationbar'
    export default{        
        name:'Details',
        components:{NavigationBar},
        data(){
            return {
                val:this.$route.params.msg,
                id:this.$route.params.id,
                datas:[],
                obj: {}
            }
        },
        mounted(){
              // 跨域请求
            let nowurl = this.HOST + '/movie/in_theaters';
            let hoturl = this.HOST + '/movie/top250';
            let soonurl = this.HOST + '/movie/coming_soon';
            //最新
            this.$axios.get(nowurl, {
                params: {
                count: 16,
                page:'1',
                }
            })
            .then(res => {
                // 所有电影的数据
                this.datas = res['data']['subjects'];
                // 这里是 查找数组里对应id的对象
                var _this = this
                var obj = this.datas.find(function(x){
                    return x.id == _this.id
                })
                // 对应id的电影的所有数据 这是一个对象
                this.obj = obj
            })
            .catch(error => {

            });
              this.$axios.get(hoturl, {
                params: {
                count: 16,
                page:'1',
                }
            })
            .then(res => {
                // 所有电影的数据
                this.datas = res['data']['subjects'];
                // 这里是 查找数组里对应id的对象
                var _this = this
                var obj = this.datas.find(function(x){
                    return x.id == _this.id
                })
                // 对应id的电影的所有数据 这是一个对象
                this.obj = obj
            })
            .catch(error => {

            });
              this.$axios.get(soonurl, {
                params: {
                count: 16,
                page:'1',
                }
            })
            .then(res => {
                // 所有电影的数据
                this.datas = res['data']['subjects'];
                // 这里是 查找数组里对应id的对象
                var _this = this
                var obj = this.datas.find(function(x){
                    return x.id == _this.id
                })
                // 对应id的电影的所有数据 这是一个对象
                this.obj = obj
            })
            .catch(error => {

            });
        }
    }
</script>
<style scoped>
.content{
    height: calc(100% - 64px);
    overflow-y: scroll;
    padding: 10px;
    background: #eeeeee;
}
.content .imgbox {
    display: inline-block;
    width: 40%;
    vertical-align: top;
}
.content .imgbox img {
    width: 100%;
}
.content .synopsis-list {
    width: 50%;
    display: inline-block;
    text-align: left; 
}
.header {
    width: 100%;
    padding-bottom: 25px;
    border-bottom: 1px solid #555555;
}
.synopsis-list {
    margin-left: 10px;
}
.synopsis-list li {
    margin-bottom: 5px;
    font-weight: bold;
}
.synopsis-list li span {
    font-weight: lighter;
}
.plot h3 {
    text-align: left;
    margin: 20px 0;
}
.plot p {
    margin: 20px 0;
}

</style>
