<template>
    <div class="container">    
        <NavigationBar />
        <div class="content">
            <Input search class="search" v-model="searchString" placeholder="输入电影关键字..."/>
            <ul class="movieslist">
                <li v-for="(article,index) in filteredArticles" :key="index" class="movies">
                     <div class="imgBox">
                        <img :src="article.images.large">
                    </div>
                    <div class="synopsis">
                        <h4 class="name">{{article.title}}</h4>
                        <p class="genres-list">类型：
                            <span class="genres">{{article.genres[0]}}</span>
                            <span class="genres">{{article.genres[1]}}</span>
                            <span class="genres">{{article.genres[2]}}</span>
                        </p>
                        <p class="casts">主演：
                            <span>{{article.casts[0].name}}</span>
                            <span>{{article.casts[1].name}}</span>
                        </p>
                        <p>上映时间：<span>{{article.year}}</span></p>
                        <p>豆瓣评分：<span>{{article.rating.average}}</span></p>
                    </div>
                    <div class="mask"  @click="hotDetails" :data-index="index"></div>
                </li>
            </ul>
            <div class="more">
                <p>加载更多</p>
            </div>
        </div>
        <TabBar/>    
    </div>
</template>
<script>
    import TabBar from '../components/tabbar'
    import NavigationBar from '../components/navigationbar'
    export default{
        name:'Search',
        components:{TabBar,NavigationBar},
        data(){
            return {
                datas: [],
                id:'',
                hotlist:'',
                searchString:'',
                articles:[null],
            }   
        },
        computed: {
            filteredArticles: function () {
              var articles_array = this.articles,
                searchString = this.searchString;
              if(!searchString){
                return articles_array;
              }
              searchString = searchString.trim().toLowerCase();
              articles_array = articles_array.filter(function(item){
                if(item.title.toLowerCase().indexOf(searchString) !== -1){
                  return item;
                }else if(item.year.toLowerCase().indexOf(searchString) !== -1){
                    return item;
                }else if (item.casts[0].name.toLowerCase().indexOf(searchString) !== -1){
                    return item;
                }else if (item.casts[1].name.toLowerCase().indexOf(searchString) !== -1){
                    return item;
                }
              })
              return articles_array;
            }
          }, 
           methods:{
            hotDetails(event){
                console.log(">>>>")
                    let index = event.target.dataset.index;
                    let id = this.datas[index].id;
                    this.$router.push({
                        name:"Details",
                        params:{
                            id:id,
                        }   
                    })
                },
         },      
         created() { 
            // 跨域请求
            let hoturl = this.HOST + '/movie/top250';
            this.$axios.get(hoturl,{
                params:{
                    count:30,
                    page:'1',
                }
            }) 
            .then(res => {
                this.hotlist = res['data']['subjects'];
                this.datas = res['data']['subjects'];
                this.id = res['data']['subjects'][0].id;
                this.articles = res['data']['subjects'];
                console.log(res['data']['subjects'])
            })
            .catch(error => {

            });
         },
        
    }
</script>
<style scoped>
.content {
    background: #eeeeee;
}
.search {
    width: 60%;
    margin: 15px 0;
    
}
.movieslist {
    list-style: none;
}
.movies div {
    display: inline-block;
}
.movies {
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #b0b0b0;
    position: relative;
}
.mask {
    width: 100%;
    height: 100%; 
    position: absolute; 
    top:0;
    left:0;
}
.imgBox {
    width: 25%;
    vertical-align: top;
}
.imgBox img {
    width: 90%;
}
.synopsis {
    width: 60%;
    text-align: left;
    margin-left: 15px;
}
.more {
    width: 100%;
    padding: 13px 0;
    border-bottom: 1px solid #eeeeee;
}
</style>
