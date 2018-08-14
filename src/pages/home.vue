<template>
    <div class="container">            
        <NavigationBar />
        <div class="content">
            <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide><img class="banner" src="../assets/m1.jpg"></swiper-slide>
                <swiper-slide><img class="banner" src="../assets/m2.jpg"></swiper-slide>
                <swiper-slide><img class="banner" src="../assets/m3.jpg"></swiper-slide>
                <swiper-slide><img class="banner" src="../assets/m4.jpg"></swiper-slide>
                <swiper-slide><img class="banner" src="../assets/m5.jpg"></swiper-slide>
            </swiper>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
        <div class="swiper-scrollbar"   slot="scrollbar"></div>
        <div class="notice">
            <!-- <router-link :to="item.href"> -->
                <Icon class="icon" type="md-volume-down" color="orange"/>最新最新最新电影
                <!-- {{item.activity}}</router-link>   -->
        </div>
        <div class="new">
            <h3 class="title">最新上映</h3>
            <ul class="new-list clearFix">
                <li v-for="(content, index) in contentlist" :key="index">
                    <div class="imgbox"><img :src="content.images.large" v-lazy="imgObj"></div>
                    <h4 class="name">{{content.title}}</h4>
                    <span class="score">评分：{{content.rating.average}}</span>
                    <div class="mask"  @click="newDetails" :data-index="index"></div>
                </li>
            </ul>
        </div>
         <div class="hot">
            <h3 class="title">最热推荐</h3>
            <ul class="hot-list clearFix">
                <li v-for="(content, index) in hotlist" :key="index">
                    <div class="imgbox"><img :src="content.images.large" v-lazy="imgObj"></div>
                    <h4 class="name">{{content.title}}</h4>
                    <span class="score">评分：{{content.rating.average}}</span>
                    <div class="mask"  @click="hotDetails" :data-index="index"></div>
                </li>
            </ul>
        </div>
         <div class="soon">
            <h3 class="title">即将上映</h3>
            <ul class="soon-list clearFix">
                <li v-for="(content, index) in soonlist" :key="index">
                    <div class="imgbox"><img :src="content.images.large" v-lazy="imgObj"></div>
                    <h4 class="name">{{content.title}}</h4>
                    <div class="mask"  @click="soonDetails" :data-index="index"></div>
                </li>
            </ul>
        </div>
        </div>
        <TabBar/>
    </div>
</template>
<script>
    import TabBar from '../components/tabbar'
    import NavigationBar from '../components/navigationbar'
    export default{
        name:'Home',
        data(){
            return {
                id:'',
                datas: [],
                imgObj: {
                // error: require('../assets/error.jpg'),
                // loading: require('../assets/loading.gif')
                }, 
                contentlist: '',
                hotlist:'',
                soonlist:'',
                   swiperOption: {
                       pagination:'.swiper-pagination',
            // 如果需要滚动条
                    scrollbar: {
                        el: '.swiper-scrollbar',
                    },
                },
                currentDate: new Date().toLocaleDateString()
            }
        },
        computed:{
            swiper(){
                return this.$refs.mySwiper.swiper
            }
        },
        components:{TabBar,NavigationBar},
        methods:{
            newDetails(event){
                let index = event.target.dataset.index;
                let id = this.datas[index].id;
                console.log(id)
                this.$router.push({
                    name:"Details",
                    params:{
                        id: id,
                    }   
            })
            },
            hotDetails(event){
                let index = event.target.dataset.index;
                let id  = this.datas[index].id;
                console.log(id)
                this.$router.push({
                    name:"Details",
                    params:{
                        id: id,
                    }
            })

            },
            soonDetails(event){
                let index = event.target.dataset.index;
                let id = this.datas[index].id;
                console.log(id)
                this.$router.push({
                    name:"Details",
                    params:{
                        id: id,
                    }
            })
                
            }

        },
        created() {
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
                this.contentlist = res['data']['subjects']
                this.datas = res['data']['subjects'];
                this.id = res['data']['subjects'][0].id
                console.log(res['data']['subjects'])
           
            })
            .catch(error => {

            });
            // 热映
            this.$axios.get(hoturl,{
                params:{
                    count:16,
                    page:'1'
                }
            }) 
            .then(res => {
                this.hotlist = res['data']['subjects'];
                this.id = res['data']['subjects'][0].id
            })
            .catch(error => {

            });
            //即将
            this.$axios.get(soonurl,{
                params:{
                    count:12,
                    page:'1'
                }
            }) 
            .then(res => {
                this.soonlist = res['data']['subjects']
                this.id = res['data']['subjects'][0].id
            })
            .catch(error => {

            });
        },
    }
</script>
<style scoped>
.inputtxt{
    display: block;
    margin: 50px auto; 
}
/* 轮播 */
.banner {
    width: 100%;
    height: 150px;
}
.banner .image {
    width: 100%;
}
/* 通知 */
.notice {
    margin: 10px 0;
}
.notice .icon {
    margin-right: 6px;
}
/* 内容 */
.new {
    width: 100%;
}
.hot {
    width: 100%;
}
.title {
    text-align: left;
    font-size: 16px;
    margin: 10px 0 10px 5px;
}
.new-list {
    margin: 10px 5px;
}
.hot-list {
    margin: 10px 5px;
}
li {
    float: left;
    /* width: calc(100%/3); */
    width: 25%;
    height: 221px;
    padding: 10px;
    position: relative;
    cursor: pointer;
}
.imgbox {
    text-align: center;
}
.imgbox img {
    width: 100%;
    text-align: center;
}
.mask {
    width: 100%;
    height: 100%; 
    position: absolute; 
    top:0;
    left:0;
}
.name {
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    font-size: 13px;
    margin: 5px 0 0;
}
.score {
    font-size: 12px;
}
</style>
