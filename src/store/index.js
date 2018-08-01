import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        title:'主页',
        left:'0'
    },
    //修改提交
    mutations:{
        changeTitle(state,title){
            state.title = title
        }
    }
})