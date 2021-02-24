<template>
  <div>
    <el-row gutter="20" style="margin: 0px">
      <el-col span="3" style="padding: 0px">
        <div @click="gotoMain">
          <img class="navigationlogo" src="@/assets/logo1.png"/>
        </div>
      </el-col>
      <el-col span="15" style="background-color: #0f72ca">
        <el-menu
            :default-active="ac"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#0f72ca"
            text-color="#FFFFFF"
            active-text-color="#f9ae8f"
        >
          <el-menu-item index="1" style="margin-left: 0rem; font-size: large" @click="gotoMain">首页</el-menu-item>
          <el-menu-item index="2" style="margin-left: 0rem; font-size: large" @click="gotoDoor">课程广场</el-menu-item>
          <el-menu-item index="3" style="margin-left: 0rem; font-size: large" @click="gotoBlog">论坛</el-menu-item>
<!--    <el-menu-item index="4" style="margin-left: 0rem; font-size: large" @click="gotoMsgCollection">-->
<!--      消息中心-->
<!--      <el-badge :value="totalMsgNum">-->
<!--      </el-badge>-->
<!--    </el-menu-item>-->
          <el-menu-item index="5" style="margin-left: 0rem; font-size: large"
                        v-if="admin"  @click="gotoUpload">上传课程</el-menu-item>
          <el-menu-item index="6" style="margin-left: 0rem; font-size: large"
                        v-if="admin"  @click="gotoTeamInfo">团队信息</el-menu-item>
<!--          <el-submenu index="7" style="margin-left: 0rem;font-size: large" v-show="admin">-->
<!--            <template slot="title" style="font-size: large">后台管理</template>-->
<!--            <el-menu-item index="7-1" @click="gotoReported">处理举报</el-menu-item>-->
<!--            <el-menu-item index="7-2" @click="gotoLog">查看日志</el-menu-item>-->
<!--            <el-menu-item index="7-3" @click="manage=true">权限管理</el-menu-item>-->
<!--          </el-submenu>-->
          <!--      <el-dialog :visible.sync="manage">-->
          <!--        <el-tabs v-model="activeName" @tab-click="handleClick">-->
          <!--          <el-tab-pane label="新增" name="first">-->
          <!--            <el-form style="margin-top: 40px">-->
          <!--              <el-form-item label="邮箱" :label-width="addAndDelWidth">-->
          <!--                <el-input v-model="addPerson" autocomplete="off" style="width: 600px" placeholder="请输入待添加用户的邮箱">-->
          <!--                </el-input>-->
          <!--              </el-form-item>-->
          <!--            </el-form>-->
          <!--          </el-tab-pane>-->
          <!--          <el-tab-pane label="删除" name="second">-->
          <!--            <el-form style="margin-top: 40px">-->
          <!--              <el-form-item label="邮箱" :label-width="addAndDelWidth">-->
          <!--                <el-input v-model="delPerson" autocomplete="off" style="width: 600px" placeholder="请输入待删除用户的邮箱">-->
          <!--                </el-input>-->
          <!--              </el-form-item>-->
          <!--            </el-form>-->
          <!--          </el-tab-pane>-->
          <!--        </el-tabs>-->
          <!--        <div slot="footer" class="dialog-footer">-->
          <!--          <el-button @click="manage = false">取 消</el-button>-->
          <!--          <el-button type="primary"-->
          <!--                     @click="manage = false">确 定-->
          <!--          </el-button>-->
          <!--        </div>-->
          <!--      </el-dialog>-->

          <!--      <el-dialog title="更新作者信息" :visible.sync="dialogFormVisible_author">-->
          <!--        <el-form :model="form">-->
          <!--          <el-form-item label="开始行数" :label-width="formLabelWidth">-->
          <!--            <el-input v-model="form.start" autocomplete="off" style="width: 600px">-->
          <!--            </el-input>-->
          <!--            <el-button style="margin-left: 15px" @click="getAuthorLine()">自动获取</el-button>-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="结尾行数" :label-width="formLabelWidth">-->
          <!--            <el-input v-model="form.end" autocomplete="off">-->
          <!--            </el-input>-->
          <!--          </el-form-item>-->
          <!--        </el-form>-->
          <!--        <div slot="footer" class="dialog-footer">-->
          <!--          <el-button @click="dialogFormVisible_author = false">取 消</el-button>-->
          <!--          <el-button type="primary"-->
          <!--                     @click="dialogFormVisible_author = false, updateAuthor(form.start,form.end)">确 定-->
          <!--          </el-button>-->
          <!--        </div>-->
          <!--      </el-dialog>-->

          <!--      <el-dialog title="更新论文信息" :visible.sync="dialogFormVisible_paper">-->
          <!--        <el-form :model="form_2">-->
          <!--          <el-form-item label="开始行数" :label-width="formLabelWidth">-->
          <!--            <el-input v-model="form_2.start" autocomplete="off" style="width: 600px">-->
          <!--            </el-input>-->
          <!--            <el-button style="margin-left: 15px" @click="getPaperLine()">自动获取</el-button>-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="结尾行数" :label-width="formLabelWidth">-->
          <!--            <el-input v-model="form_2.end" autocomplete="off">-->
          <!--            </el-input>-->
          <!--          </el-form-item>-->
          <!--        </el-form>-->
          <!--        <div slot="footer" class="dialog-footer">-->
          <!--          <el-button @click="dialogFormVisible_paper = false">取 消</el-button>-->
          <!--          <el-button type="primary"-->
          <!--                     @click="dialogFormVisible_paper = false, updatePaper(form_2.start,form_2.end)">确 定-->
          <!--          </el-button>-->
          <!--        </div>-->
          <!--      </el-dialog>-->
        </el-menu>
      </el-col>
      <el-col span="4" style="background-color: #0f72ca; height: 60px">
        <!--搜索框-->
        <div style="margin-top: 15px; float: right" @keyup.enter="sendSearch(input1)">
          <div style="" id="searchInput">
            <el-row>
              <el-col span="20">
                <input
                    style="border-radius: 5px;
                    height: 30px;"
                    placeholder="  搜索课程"
                    prefix-icon="el-icon-search"
                    v-model="input1">
                </input>
              </el-col>
              <el-col span="4" style="margin-left: 0">
                <div @click="sendSearch(input1)" style="border-radius: 5px; height: 30px; width: 15px">
                  <i class="el-icon-search"></i>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col span="2" style="height: 60px;background-color: #0f72ca">
        <!--用户头像-->
        <div style="text-align: center; margin-top: 10px" v-if="keepLogin">
          <el-popover
              placement="top-start"
              trigger="hover"
              style="margin-right: 10px;">
            <div class="text item">
              <div style="width: 200px; height: 50px; margin-top: -10px">
                <el-row class="demo-avatar demo-basic">
                  <el-col :offset="1">
                    {{ personName }}
                  </el-col>
                </el-row>
              </div>
              <div style="height: 10px"></div>
              <div v-if="userId">
                <div style="margin-top: 8px; margin-bottom:0px; margin-left: 12px" v-if="this.$store.state.userId">
                  <el-link :underline="false" @click="gotoMyinfo">个人信息</el-link>
                </div>
<!--                <div style="margin-top: 16px; margin-left: 12px">-->
<!--                  <el-link :underline="false" @click="gotoMyLike">我的关注</el-link>-->
<!--                </div>-->
<!--                <div style="margin-top: 16px; margin-left: 12px">-->
<!--                  <el-link :underline="false" @click="gotoMyCollection">个人收藏</el-link>-->
<!--                </div>-->
            </div>
              <div style="margin-top: 16px; margin-left: 12px">
                <el-link :underline="false" @click="logout">退出登录</el-link>
              </div>
            </div>
            <!--            <div class="demo-basic&#45;&#45;circle" style="margin-top: 10px">-->
            <!--              <div class="block">-->
            <!--                <el-avatar :size="50" :src="picture"></el-avatar>-->
            <el-image class="avatar" :src="this.picture" slot="reference"></el-image>
            <!--              </div>-->
            <!--            </div>-->
            <!--            <el-button slot="reference" type="warning" class="el-icon-user"-->
            <!--                       style="border-color: #67c23a;background-color: #67c23a; border-radius: 50px"></el-button>-->
          </el-popover>
        </div>
        <div style="text-align: center; margin-top: 15px" @click="gotoLogin" v-if="!keepLogin">
          <el-link :underline="false" style="font-size: large; color: white">
            登录</el-link>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: "NewNavigation",
  props: {
    ac: {
      type: String,
      default: "1"
    }
  },
  data() {
    return {
      admin: false,// fixme:团队不应该显示个人信息等
      keepLogin: false,
      userId: '',// 登录的是学生或团队，都叫userId
      personName: '',
      picture: undefined,
      manage: false,
      totalMsgNum: '',
      input1: '',// 搜索框中的文字
      type: 0,// 默认根据课程名称检索
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    sendSearch(input) {
      if (input.length === 0) {
        this.$message({
          type: 'info',
          message: '请输入搜索内容！'
        })
      } else {
        this.$router.push({
          path: '/Searching',
          query: {
            input: this.input1,
            // pagenum: 1,
            // type: 0
          }
        });
      }
    },
    logout() {
      this.$store.state.keepLogIn = false;
      this.$store.state.teamId = 0;
      this.$store.state.userId = 0;
      this.keepLogin = false;
      this.userId = '';
      // 再清除本地存储，否则登出后刷新会回到登录状态
      this.$store.commit('logout')
    },
    gotoLog() {
      this.$router.push('/log')
    },
    gotoReported() {
      this.$router.push('/blogreported')
    },
    // 课程广场
    gotoDoor() {
      // fixme: for debug
      this.$message.success('开发中，敬请期待')
      // this.$router.push({
      //   path: '/searching',
      //   query: {
      //     input: 'java'
      //   }
      // })
    },
    gotoMsgCollection() {
      this.$router.push('/messageNav/privacyMsg')
    },
    gotoTeamInfo() {
      this.$router.push({
        path: '/teaminfo',
        query: {
          teamid: this.$store.state.teamId
        }
      })
    },
    gotoMyinfo() {
      this.$router.push('/information')
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
    // 主页
    gotoMain() {
      this.$router.push('/Search')
    },
    // 论坛(帖子广场
    gotoBlog() {
      // fixme: for debug
      this.$message.success('开发中，敬请期待')
      // this.$router.push('/BlogDashboard')
    },
    // 上传课程
    gotoUpload() {
      this.$router.push('/upload')
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    getData() {
      if (this.$store.state.keepLogIn === true) {
        this.keepLogin = true;
        if (this.$store.state.userId !== 0) {
          // 是普通用户
          this.userId = this.$store.state.userId;
          this.$axios.post('/apis/user/getuserinfo', {
            id: this.userId
          }).then(res => {
            if (res.data.error_code === 0) {
              this.personName = res.data.data.username;
              this.picture = res.data.data.avatar;
            }
          })
        } else {
          // 是团队
          this.userId = this.$store.state.teamId;
          this.$axios.post('/apis/team/getteamdetail', {
            id: this.userId
          }).then(res => {
            if (res.data.error_code === 0) {
              this.personName = res.data.data.name;
              this.picture = res.data.data.logo;
              this.admin = true;
            }
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  /deep/ .el-menu-demo {
    border-bottom: 0
  }
}

li {
  /deep/ .el-submenu__title {
    font-size: 18px
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

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: block;
}

body {
  //background-color: whitesmoke;
  background-image: url('../../assets/image/user/image/login-back.png');
  background-attachment: fixed;
}

.el-link :hover{
  color: rgb(249,174,143);
}
</style>