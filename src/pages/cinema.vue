<template>
    <div class="container">      
        <NavigationBar />
         <div class="content">
            <Input search class="search" v-model="searchString" placeholder="找影院"/>
            <div class="imgbox">
                <img src="http://pic5.qiyipic.com/common/lego/20160131/30a7f780b7cb44e1bacecc33e52dc9b4.jpg?src=focustat_6_20130410_17">
            </div>
            <ul class="cinema-list">
                <li v-for="(content,index) in filteredArticles" :key="index" class="movies">
                    <h4>{{content.cinemaName}}</h4>
                    <p class="price">{{content.price}}<span>元起</span></p>
                    <div class="address"><span>{{content.address}}</span></div>
                    <div class="tag-list">
                        <p class="tag">
                            <span>{{content.snack}}</span>
                            <span>{{content.rebate}}</span>
                        </p>
                        <p class="tag-cin">
                            <span>{{content.movieHall}}</span>
                            <span>{{content.screen}}</span>
                        </p>
                    </div>
                    <div class="mask"  @click="gobuy" :data-index="index"></div>
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
        name:'Cinema',
        components:{TabBar,NavigationBar},
        data(){
            return {
                id:'',
                datas:[],
                contentlist:'',
                searchString:'',
                articles:[null]
            }
        },
        created(){
            this.$axios.get('../../static/JSON/cinema.json')
            .then(res => { // 请求成功
                this.contentlist = res.data.result.data;
                this.id = res.data.result.data[0].id
                console.log(this.id);
            })
            .catch(error => { // 请求异常
            });
        },
        computed: {
        filteredArticles: function () {
            var articles_array = this.contentlist,
            searchString = this.searchString;
            if(!searchString){
            return articles_array;
            }
            searchString = searchString.trim().toLowerCase();
            articles_array = articles_array.filter(function(item){
            if(item.cinemaName.toLowerCase().indexOf(searchString) !== -1){
                return item;
            }
            })
            return articles_array;
        }
        },
        methods:{
            gobuy(event){
                let index = event.target.dataset.index;
                let id = this.contentlist[index].id;
                console.log(id)
                this.$router.push({
                    name:"buy",
                    params:{
                        id:id
                    }
                })
            }
        },
     
    }
</script>
<style scoped>
.content {
    width: 100%;
}
.search {
    width: 90%;
    margin: 12px 0;
}
.imgbox {
    width: 100%;
    height: 145px;
    border-top: 1px solid #b0b0b0;
    overflow: hidden;
}
.imgbox img {
    width: 100%;
    height: 100%;
}
.cinema-list {

}
.cinema-list li {
    padding: 8px 30px 10px;
    border-bottom: 1px solid #eeeeee;
    text-align: left;
    position: relative;
}
.cinema-list li h4 {
    font-size: 17px;
    margin: 5px 0;
    display: inline-block;
}
.cinema-list li .price {
    font-size: 15px;
    display: inline-block;
    margin-left: 25px;
    color: rgba(141, 19, 19, 0.822);
}
.mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
.price span {
    font-size: 10px;
}
.address {
  width: 90%;
  font-size: 10px;
  margin: 2px 0 5px;
}
.cinema-list li .tag-list p {
    display: inline-block;
    font-size: 10px;
    margin-top: 3px;
}
.tag-list .tag span {
    padding: 2px;
    color: rgb(226, 166, 53);
    border:1px solid rgb(226, 166, 53);
}
.tag-list .tag-cin span {
    padding: 2px;
    color: rgb(94, 157, 230);
    border:1px solid rgb(94, 157, 230);
    
}
.more p {
    border-bottom: 1px solid #eeeeee;
    padding: 13px 0;
}
</style>