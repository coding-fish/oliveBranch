<template>
    <el-container>
        <el-header>
            <nav>
                <div class="menu-container" style="vertical-align: center">
                    <div style="float: left;margin: -28px 0px 0px -280px">
                        <img src="../../assets/logoT02.png" height="80" width="160"/>
                    </div>
                    <!-- Menu -->
                    <ul class="menu">
                        <li class="menu-mac">
                            <a href="#">
                                <span>首页</span>
                            </a>
                        </li>
                        <li class="menu-iPad">
                            <a href="#">
                                <span>查看门户</span>
                            </a>
                        </li>
                        <li class="menu-iPhone">
                            <a href="#">
                                <span>帖子广场</span>
                            </a>
                        </li>
                        <li class="menu-watch">
                            <a href="#">
                                <span>消息中心</span>
                            </a>
                        </li>
                        <li class="menu-watch">
                            <a href="#">
                                <span>联系我们</span>
                            </a>
                        </li>
                        <li class="menu-tv" style="float: right; margin-right: -110px">
                            <a href="#">
                                <span>登录</span>
                            </a>
                        </li>
                        <li class="menu-support" style="float: right; margin-right: -170px">
                            <a href="#">
                                <span>注册</span>
                            </a>
                        </li>
                        <li style="float: right; margin-right: -260px; margin-top: -8px" >
                                <el-popover
                                        placement="top-start"
                                        width="200"
                                        trigger="hover">
                                    <div class="text item">
                                        <div style="width: 200px; height: 50px; margin-top: -10px">
                                            <el-row class="demo-avatar demo-basic">
                                                <el-col :span="8" :offset="1">
                                                    <div class="demo-basic--circle">
                                                        <div class="block">
                                                            <el-avatar :size="50" :src="picture"></el-avatar>
                                                        </div>
                                                    </div>
                                                </el-col>
                                                <el-col :span="8" :offset="1">
                                                    <h2>{{personName}}</h2>
                                                </el-col>
                                            </el-row>
                                        </div>
                                        <el-divider></el-divider>
                                        <div style="margin-top: 8px; margin-bottom:0px; margin-left: 12px">
                                            <el-link :underline="false">个人信息</el-link>
                                        </div>
<!--                                        <el-divider></el-divider>-->
                                        <div style="margin-top: 16px; margin-left: 12px">
                                            <el-link :underline="false">我的关注</el-link>
                                        </div>
                                        <div style="margin-top: 16px; margin-left: 12px">
                                            <el-link :underline="false">个人收藏</el-link>
                                        </div>
                                    </div>
                                    <el-button slot="reference" type="warning" class="el-icon-user" style="border-color: #f9ae8f;background-color: #fbede4;"></el-button>
                                </el-popover>
                        </li>
                    </ul>
                </div>
            </nav>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>

</template>

<script>
    export default {
        name: "Navigation",
        data() {
            return {
                visible: false,
                personName: '张小牛',
                picture: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            }
        },
        mounted(){
            this.getData()
        },
        methods:{
            getData() {
                var that=this
                this.$axios({
                    url:'/http://182.92.239.145/apis',
                    method:"post",
                }).then(res=>{
                    console.log(res);
                    that.personName = res.data.personName
                    that.picture = res.data.picture
                })
            }
        }

    }

</script>

<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .box-card {
        width: 480px;
    }
     /*/deep/.el-button--warning {*/
     /*    color: #FFF;*/
     /*    background-color: #fbede4;*/
     /*    border-color: #f9ae8f;*/
     /*}*/
    /*/deep/.el-link.el-link--default:hover {*/
    /*    color: #df5747;*/
    /*}*/
    /*/deep/.el-button:focus, .el-button:hover {*/
    /*    color: #df5747;*/
    /*    border-color: #f9ae8f;*/
    /*    background-color: #fbede4;*/
    /*}*/
    /deep/.el-button {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #FFF;
        border: 1px solid #DCDFE6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 50px;
    }
</style>