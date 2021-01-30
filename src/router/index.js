import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    //主页
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/navigatorandsearch/Search'),
        // redirect: "/search"
    },
    //检索
    {
        path: '/search',
        name: 'Search',
        component: () => import('../views/navigatorandsearch/Search')
    },
    {
        path: '/Searching',
        name: 'Searching',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/navigatorandsearch/Searching.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/user/Login.vue')
    },
    {
        path: '/personinfo',
        name: 'PersonInfo',
        component: () => import('../views/user/PersonInfo.vue'),
        children: [
            {
                path: 'information',
                name: 'Information',
                component: () => import('../views/user/Information.vue'),
            },
            {
                path: 'following',
                name: 'Following',
                component: () => import('../views/user/Following.vue'),
            },
            {
                path: 'collected',
                name: 'Collected',
                component: () => import('../views/user/Collected.vue'),
            },
        ],
    },
    {
        path: '/messageNav',
        name: 'messageNav',
        component: () => import('../views/message/messageNav'),
        children: [
            {
                path: 'commentMsg',
                name: 'commentMsg',
                component: () => import('../views/message/commentMsg'),
            },
            {
                path: 'likeMsg',
                name: 'likeMsg',
                component: () => import('../views/message/likeMsg'),
            },
            {
                path: 'reportedMsg',
                name: 'reportedMsg',
                component: () => import('../views/message/reportedMsg'),
            },
            {
                path: 'privacyMsg',
                name: 'privacyMsg',
                component: () => import('../views/message/privacyMsg'),
            },
        ],
    },
    {
        path: '/userinfo/:userId',
        name: 'UserId',
        component: () => import('../views/user/UserInfo.vue'),
    },

    //团队门户
    {
        path: '/team',
        name: 'Team',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/team/Team.vue')
    },

    //课程详情
    {
        path: '/course',
        name: 'Paper',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/course/Course.vue')
    },
    //上传课程
    {
        path: '/upload',
        name: 'UploadCourse',
        component: () => import('../views/course/UploadCourse')
    },
    //   //要认领的门户列表
    // {
    //   path: '/authoritem',
    //   name: 'AuthorItem',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/team/AuthorItem')
    // },
    //管理员处理举报
    {
        path: '/blogreported',
        name: 'BlogReported',
        component: () => import("../views/manage/articleReported.vue")
    },
    {
        path: '/commentreported',
        name: 'CommentReported',
        component: () => import("../views/manage/commentReported.vue")
    },
    {
        path: '/gwreported',
        name: 'GWReported',
        component: () => import("../views/manage/gwReported.vue")
    },
    //查看日志
    {
        path: '/log',
        name: 'Log',
        component: () => import("../views/manage/log.vue")
    },
    //帖子相关
    {
        path: "/BlogDashboard",
        name: "BlogDashboard",
        component: () => import("../components/blogDashboard.vue"),
        children: [
            {
                path: "BlogDesktop",
                name: "BlogDesktop",
                component: () => import("../views/blog/blogDashboard/blogDesktop.vue")
            },
            {
                path: "BlogMyBlog",
                name: "BlogMyBlog",
                component: () => import("../views/blog/blogDashboard/blogMyBlog.vue")
            },
            {
                path: "BlogMyTips",
                name: "BlogMyTips",
                component: () => import("../views/blog/blogDashboard/blogMyTips.vue")
            }
        ]
    },
    {
        path: "/BlogSearchItems/:type/:search",
        name: "BlogSearchItems",
        component: () => import("../views/blog/blogSearchItems.vue")
    },
    {
        path: "/BlogItem/:userid/:blogid",
        name: "BlogItem",
        component: () => import("../views/blog/blogItem.vue")
    },
    {
        path: "/BlogEdit/:userid/:blogid",
        name: "BlogEdit",
        component: () => import("../views/blog/blogEdit.vue")
    },
    // {
    //   path: '/AdvancedSearch',
    //   name: 'AdvancedSearch',
    //   component: () => import('../views/navigatorandsearch/AdvancedSearch.vue')
    // },
    {
        path: "/changefile/:userid/:blogid",
        name: "ChangeFile",
        component: () => import("../views/blog/changeFile.vue")
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
