<template>
    <div>
        <el-menu
                :default-active="ac"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#df5747"
                text-color="#FFFFFF"
                active-text-color="#f9ae8f"
        >
            <div style="float: left">
                <img @click="gotoMain" class="navigationlogo" src="../../assets/logoT02-white.png" height="60" width="160"/>
            </div>
            <el-menu-item index="1" style="margin-left: 6rem; font-size: large" @click="gotoMain">首页</el-menu-item>
            <el-menu-item index="2" style="margin-left: 2rem; font-size: large" @click="gotoDoor">查看门户</el-menu-item>
            <el-menu-item index="3" style="margin-left: 2rem; font-size: large" @click="gotoBlog">帖子广场</el-menu-item>
            <el-menu-item index="4" style="margin-left: 2rem; font-size: large" @click="gotoMsgCollection">
                消息中心
                <el-badge :value="totalMsgNum">
                </el-badge>
            </el-menu-item>
            <el-submenu index="5" style="margin-left: 2rem;font-size: large" v-show="admin">
                <template slot="title" style="font-size: large">后台管理</template>
                <el-menu-item index="5-1" @click="gotoReported">处理举报</el-menu-item>
                <el-menu-item index="5-2" @click="gotoLog">查看日志</el-menu-item>
                <el-menu-item index="5-3" @click="manage=true">权限管理</el-menu-item>
            </el-submenu>
            <el-submenu index="6" style="margin-left: 2rem;font-size: large" v-show="admin">
                <template slot="title" style="font-size: large">更新数据</template>
                <el-menu-item index="6-1" @click="dialogFormVisible_author = true">更新作者信息</el-menu-item>
                <el-menu-item index="6-2" @click="dialogFormVisible_paper = true">更新论文信息</el-menu-item>
            </el-submenu>

            <el-menu-item style="display: block;float: right">
                <el-popover
                        placement="top-start"
                        width="200"
                        trigger="hover"
                        style="margin-left: 10px">
                    <div class="text item">
                        <div style="width: 200px; height: 50px; margin-top: -10px">
                            <el-row class="demo-avatar demo-basic">
                                <el-col :span="8" :offset="1">
                                    <div class="demo-basic--circle" style="margin-top: 10px">
                                        <div class="block">
                                            <el-avatar :size="50" :src="picture"></el-avatar>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="8" :offset="1" >
                                    <h2 style="margin-top: 15px;margin-bottom: 10px">{{personName}}</h2>
                                </el-col>
                            </el-row>
                        </div>
                        <el-divider></el-divider>
                        <div style="margin-top: 8px; margin-bottom:0px; margin-left: 12px">
                            <el-link :underline="false" @click="gotoMyinfo">个人信息</el-link>
                        </div>
                        <!--                                        <el-divider></el-divider>-->
                        <div style="margin-top: 16px; margin-left: 12px">
                            <el-link :underline="false" @click="gotoMyLike">我的关注</el-link>
                        </div>
                        <div style="margin-top: 16px; margin-left: 12px">
                            <el-link :underline="false" @click="gotoMyCollection">个人收藏</el-link>
                        </div>
                        <div style="margin-top: 16px; margin-left: 12px">
                            <el-link :underline="false" @click="logout" v-show="keepLogout">退出登录</el-link>
                        </div>
                    </div>
                    <el-button slot="reference" type="warning" class="el-icon-user"
                               style="border-color: #f9bb99;background-color: #f9bb99; border-radius: 50px"></el-button>
                </el-popover>
            </el-menu-item>
            <el-menu-item style="float: right" @click="gotoLogin" v-show="keepLogin">
                <span style="font-size: large">登录</span>
            </el-menu-item>

            <el-dialog  :visible.sync="manage">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="新增" name="first">
                        <el-form style="margin-top: 40px">
                            <el-form-item label="邮箱" :label-width="addAndDelWidth">
                                <el-input v-model="addPerson" autocomplete="off" style="width: 600px" placeholder="请输入待添加用户的邮箱">
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="删除" name="second" >
                        <el-form style="margin-top: 40px">
                            <el-form-item label="邮箱" :label-width="addAndDelWidth">
                                <el-input v-model="delPerson" autocomplete="off" style="width: 600px" placeholder="请输入待删除用户的邮箱">
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="manage = false">取 消</el-button>
                    <el-button type="primary"
                               @click="manage = false">确 定
                    </el-button>
                </div>
            </el-dialog>

            <el-dialog title="更新作者信息" :visible.sync="dialogFormVisible_author">
                <el-form :model="form">
                    <el-form-item label="开始行数" :label-width="formLabelWidth">
                        <el-input v-model="form.start" autocomplete="off" style="width: 600px">
                        </el-input>
                        <el-button style="margin-left: 15px" @click="getAuthorLine()">自动获取</el-button>
                    </el-form-item>
                    <el-form-item label="结尾行数" :label-width="formLabelWidth">
                        <el-input v-model="form.end" autocomplete="off">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible_author = false">取 消</el-button>
                    <el-button type="primary"
                               @click="dialogFormVisible_author = false, updateAuthor(form.start,form.end)">确 定
                    </el-button>
                </div>
            </el-dialog>

            <el-dialog title="更新论文信息" :visible.sync="dialogFormVisible_paper">
                <el-form :model="form_2">
                    <el-form-item label="开始行数" :label-width="formLabelWidth">
                        <el-input v-model="form_2.start" autocomplete="off" style="width: 600px">
                        </el-input>
                        <el-button style="margin-left: 15px" @click="getPaperLine()">自动获取</el-button>
                    </el-form-item>
                    <el-form-item label="结尾行数" :label-width="formLabelWidth">
                        <el-input v-model="form_2.end" autocomplete="off">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible_paper = false">取 消</el-button>
                    <el-button type="primary"
                               @click="dialogFormVisible_paper = false, updatePaper(form_2.start,form_2.end)">确 定
                    </el-button>
                </div>
            </el-dialog>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "NewNavigation",
        props:{
            ac:{
                type:String,
                default:"1"
            }
        },
        data() {
            return {
                addPerson:'',
                delPerson:'',
                activeName: 'second',
                admin: '',
                keepLogin: false,
                keepLogout: false,
                activeIndex2: '1',
                personName: '',
                picture: "",
                manage: false,
                dialogFormVisible_author: false,
                dialogFormVisible_paper: false,
                form: {
                    start: '',
                    end: '',
                    delivery: false,
                },
                form_2: {
                    start: '',
                    end: '',
                    delivery: false,
                },
                addAndDelWidth:'100px',
                formLabelWidth: '80px',
                formLabelWidth_2: '80px',
                userId: '',
                totalMsgNum: '',
                status:""
            };
        },
        mounted() {
            this.getData()
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            updateAuthor(start, end) {
                var that = this
                this.$axios.post('/apis/search/updateacademicdb',
                    {
                        administratorid: that.userId,
                        file: "author",
                        startline: start,
                        linesnumber: (end - start + 1)
                    })
                    .then(res => {
                        console.log(res);
                        that.$router.go(0)
                        this.$message({
                            type: 'success',
                            message: '更新成功!'
                        });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '更新失败'
                    });
                });
            },
            updatePaper(start, end) {
                var that = this
                this.$axios.post('/apis/search/updateacademicdb',
                    {
                        administratorid: that.userId,
                        file: "paper",
                        startline: start,
                        linesnumber: (end - start + 1)
                    })
                    .then(res => {
                        console.log(res);
                        that.$router.go(0)
                        this.$message({
                            type: 'success',
                            message: '更新成功!'
                        });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '更新失败'
                    });
                });
            },
            getAuthorLine() {
                var that = this
                this.$axios.post('/apis/search/getupdatebyfilename',
                    {
                        filename: "author",
                        pagenumber: 1,
                    })
                    .then(res => {
                        console.log(res);
                        that.form.start = res.data[0].finishlinenum
                    })
            },
            getPaperLine() {
                var that = this
                this.$axios.post('/apis/search/getupdatebyfilename',
                    {
                        filename: "paper",
                        pagenumber: 1,
                    })
                    .then(res => {
                        console.log(res);
                        that.form_2.start = res.data[0].finishlinenum
                    })
            },
            logout() {
                this.$axios({
                    url: '/apis/user/logout',
                    method: "post",
                }).then(res => {
                    console.log(res);
                    this.personName = '',
                        this.picture = '',
                        this.keepLogin = true,
                        this.keepLogout = false,
                        this.admin = false,
                        this.gotoLogin()
                })
            },
            gotoLog() {
                this.$router.push('/log')
            },
            gotoReported() {
                this.$router.push('/blogreported')
            },
            gotoDoor() {
                this.$router.push('/authoritem')
            },
            gotoMsgCollection() {
                this.$router.push('/messageNav/privacyMsg')
            },
            gotoMyinfo() {
                this.$router.push('/personinfo/information')
            },
            gotoMyLike() {
                this.$router.push('/personinfo/following')
            },
            gotoMyCollection() {
                this.$router.push('/personinfo/collected')
            },
            gotoLogin() {
                this.$router.push('/login')
            },
            gotoMain() {
                this.$router.push('/Search')
            },
            gotoBlog() {
                this.$router.push('/BlogDashboard/BlogDesktop')
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            getData() {
                var that = this
                this.$axios({
                    url: '/apis/personality/get',
                    method: "post",
                }).then(res => {
                    console.log(res);
                    that.status = res.data.status
                    if (that.status === 0) {
                        this.keepLogin = false;
                        this.keepLogout = true;
                        that.personName = res.data.username
                        that.picture = res.data.avatar
                        that.admin = res.data.is_admin
                        that.userId = res.data.userid
                    }
                    else if(that.status === 2){
                        this.keepLogin = true;
                        this.keepLogout = false;
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
div{
    /deep/ .el-menu-demo{
        border-bottom:0
    }
}
li{
    /deep/ .el-submenu__title{
        font-size:18px
    }
}
    .navigationlogo {
        height: 60px;
    }
.text {
    font-size: 14px;
}

.item {
    padding: 18px 0;
}

.box-card {
    width: 480px;
}

    body {
        background-image: url('../../assets/image/user/image/login-back.png');
        background-attachment: fixed;
    }
</style>