import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userId: 0,// uid不可能为0
        teamId: 0,// tid不可能为0
        keepLogIn: false,
        // portalId: null,
        user: {},
        // token: false,// 作用未知
    },
    getters: {

    },
    mutations: {
        // 页面刷新时防止信息丢失可以调用本地存储获取用户信息
        initUser(state) {
            let user = window.sessionStorage.getItem('user')
            if (user) {
                state.user = JSON.parse(user)
                // state.token = state.user.token
                state.userId = state.user.userId
                state.teamId = state.user.teamId
                state.keepLogIn = state.user.keepLogIn
            }
        },
        // 登录
        login(state, user) {
            // 保存登录状态
            state.user = user
            // 存储到本地存储
            window.sessionStorage.setItem('user', JSON.stringify(state.user))
        },
        // 退出登录
        logout(state) {
            // 清除状态
            state.user = {}
            // state.token = false
            // 清除本地存储
            window.sessionStorage.clear()
        },
        // setPortalId(state, pid) {
        //     state.portalId = pid;
        // },
    },
    actions: {},
    modules: {}
})
