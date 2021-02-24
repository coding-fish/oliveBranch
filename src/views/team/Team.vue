<template>
  <div>
    <div>
      <new-navigation></new-navigation>
    </div>
    <el-container>
      <el-main>
        <el-row gutter="20">
          <!--左侧留白-->
          <el-col :span="1">
            <div class="grid-content" style="margin-top: 0.5rem; margin-right: 0.5rem">
            </div>
          </el-col>
          <el-col :span="22">
            <div style="height: 1rem"></div>
            <div style="margin: 0 1rem;">
              <!--基本信息-->
              <el-row :gutter="20">
                <el-col span="6">
                  <div style="min-height: 100px">
                    <el-image style="width:250px;height:250px;border-radius:300px"
                              :src="this.team.logo" fit="cover"></el-image>
                  </div>
                </el-col>
                <el-col span="10">
                  <div style="height: 1rem"></div>
                  <el-row gutter="20">
                    <el-col span="20">
                      <div style="font-size: 2rem">{{ team.name }}</div>
                    </el-col>
                    <!--                    <el-col span="2">-->
                    <!--                      <el-button size="mini"-->
                    <!--                                 style="vertical-align: center; margin-left: 0.5rem"-->
                    <!--                                 type="primary"-->
                    <!--                                 @click="follow(0)">关注-->
                    <!--                      </el-button>-->
                    <!--                      <el-button size="mini"-->
                    <!--                                 style="vertical-align: center; margin-left: 0.5rem"-->
                    <!--                                 type="info"-->
                    <!--                                 @click="follow(1)">取消关注-->
                    <!--                      </el-button>-->
                    <!--                    </el-col>-->
                    <!--                    <el-col span="2">-->
                    <!--                      <el-button size="mini"-->
                    <!--                                 style="vertical-align: center; margin-left: 0.5rem"-->
                    <!--                                 type="warning"-->
                    <!--                                 @click="privateMessageDisplay"/>私信TA-->
                    <!--                    </el-col>-->
                  </el-row>
                  <div style="height: 3rem"></div>
                  <div style="font-size: 1rem; color: #4a5568">{{ team.description }}</div>
                </el-col>
                <el-col span="6">
                  <div style="text-align: center">
                    <img :src="team.qrcode" height="200px" v-if="this.team.qrcode"/>
                  </div>
                  <div style="text-align: center" v-if="this.team.qrcode">
                    扫描上方二维码关注我们
                  </div>
                </el-col>
              </el-row>
              <!--课程-->
              <div class="label">课程</div>
              <el-divider></el-divider>
              <el-row gutter="20">
                <el-col span="6" v-for="(item,index) in this.team_courses" :key="index">
                  <el-link :underline="false" @click="jumpToDetail(item)">
                    <el-card shadow="hover"
                             style="font-weight: 500; background-color: white;
                           height: 250px; margin-bottom: 20px">
                      <img :src="item.picture" height="150px" width="250px"/><br>
                      {{ item.name }}
                      <div style="font-size: 10px; color: #4a5568; width: 250px">{{ item.description | ellipsis }}</div>
                    </el-card>
                  </el-link>

                </el-col>
              </el-row>
            </div>
          </el-col>
          <!--右侧留白-->
          <el-col :span="1">
            <div class="grid-content" style="margin-top: 0.5rem; margin-right: 0.5rem">
            </div>
          </el-col>
        </el-row>
      </el-main>
      <!-- 分页-->
      <!--      <el-footer>-->
      <!--        <el-row gutter="20">-->
      <!--          <el-col :span="3">-->
      <!--            <div class="grid-content"></div>-->
      <!--          </el-col>-->
      <!--          <el-col :span="18">-->
      <!--            <div style="text-align: center;">-->
      <!--              <el-pagination-->
      <!--                  background-->
      <!--                  layout="prev, pager, next"-->
      <!--                  :total="author.total"-->
      <!--                  :page-size="author.page_size"-->
      <!--                  :current-page="author.current_page"-->
      <!--                  @current-change="handleCurrentChange">-->
      <!--              </el-pagination>-->
      <!--            </div>-->
      <!--          </el-col>-->
      <!--          <el-col :span="3">-->
      <!--            <div class="grid-content"></div>-->
      <!--          </el-col>-->
      <!--        </el-row>-->

      <!--      </el-footer>-->
    </el-container>
    <!--私信输入框-->
    <!--    <el-dialog-->
    <!--        title="请填写私信内容"-->
    <!--        :visible.sync="privateMessageVisible"-->
    <!--        center-->
    <!--        :append-to-body='true'-->
    <!--        :lock-scroll="false"-->
    <!--        width="50%"-->
    <!--        :before-close="privateMessageClose">-->
    <!--      <el-input-->
    <!--          type="textarea"-->
    <!--          :rows="5"-->
    <!--          autosize-->
    <!--          placeholder="请输入内容"-->
    <!--          v-model="privateMessageText">-->
    <!--      </el-input>-->
    <!--      <el-button class="medium" style="margin-left:40%;position:relative;margin-top:30px" plain-->
    <!--                 @click="submitPrivateMessage(author.author_user_id, privateMessageText)">发送私信-->
    <!--      </el-button>-->
    <!--    </el-dialog>-->
    <new-bottom></new-bottom>
  </div>
</template>

<script>
import echarts from 'echarts'
import NewNavigation from "../navigatorandsearch/NewNavigation";
import NewBottom from "@/views/navigatorandsearch/NewBottom";

export default {
  name: "Team",
  data() {
    return {
      a: "2",
      team_id: 0,
      team: {
        name: "",
        teacher: "",
        description: "",
        logo: undefined,
        qrcode: undefined,
      },
      team_courses: [],
    }
  },
  created() {
    this.getData()
  },
  mounted() {
  },
  methods: {
    getData() {
      this.team_id = this.$route.query.teamid
      const loading = this.$loading({
        lock: true,
        text: '加载中...若长时间未响应，可尝试刷新页面',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$axios.post('/apis/team/getteamdetail', {
        id: this.team_id
      }).then(res => {
        console.log(res)
        let result = res.data.error_code
        if (result === 0) {
          this.team.name = res.data.data.name
          this.team.teacher = res.data.data.teacher
          this.team.description = res.data.data.description
          this.team.logo = res.data.data.logo
          this.team.qrcode = res.data.data.qrcode
        } else {
          this.$message.error(res.data.message)
        }
      })

      this.$axios.post('/apis/course/searchcourse', {
        type: 1,//按团队id检索
        value: this.team_id,
        sort: 1,//按照授课时间降序
      }).then(res => {
        let result = res.data.error_code
        if (result === 0) {
          this.team_courses = res.data.data
        } else {
          this.$message.error(res.data.message)
        }
        loading.close()
      })
    },
    jumpToDetail(item) {
      this.$router.push({
        path: '/course',
        query: {
          courseid: item.id
        }
      })
    },
    reportClose(done) {
      this.reportVisible = false;
    },
    //私信，未完成
    privateMessageDisplay() {
      if (this.is_login === 1) {
        alert('请先登录！')
        this.$router.push('/login')
      } else if (this.author.is_claimed === 0) {
        this.$alert('该门户未被认领！', '系统提示', {
          confirmButtonText: '确定'
        })
      } else
        this.privateMessageVisible = true;
    },
    submitPrivateMessage(id, text) {
      if (this.privateMessageText === '')
        this.$alert('私信内容不能为空', '系统提示', {
          confirmButtonText: '确定',
        })
      else {
        this.$axios.post('/apis/message/sendimessage',
            {
              id: id,
              message: text
            }).then(res => {
          if (res.data.data.status === 0) {
            this.$message({
              type: 'success',
              message: '私信发送成功',
            })
            this.privateMessageVisible = false
          }

        })
      }
    },
    privateMessageClose(done) {
      this.privateMessageVisible = false;
    },
    //关注，未完成
    follow(flag) {
      if (this.is_login === 1) {
        alert('请先登录！')
        this.$router.push('/login')
      } else if (this.author.is_claimed === 0) {
        this.$alert('该门户未被认领！', '系统提示', {
          confirmButtonText: '确定'
        })
      } else {
        this.$axios.post('/apis/user/change_follow_state',
            {
              userid: this.author.author_user_id,
            }).then(res => {
          if (res.data.status === 0) {
            this.author.is_followed = !this.author.is_followed
            this.$message({
              type: "success",
              message: "操作成功",
            })
          }
        })

      }
    },
    //是否给别人看某个学术成果，完成
    pub_display(index, flag) {
      this.author.pubs[index].is_display = 1 - this.author.pubs[index].is_display
      //展示出来
      if (flag === 1) {
        this.$axios.post('/apis/search/paperdisplay',
            {
              userid: this.user_id,
              paperid: this.author.pubs[index].paper_id,
            }).then(res => {
          console.log(res)
          if (res.data.status === 0) {
            this.$message({
              type: "success",
              message: "设置展示成功",
            })
          }
        })
      } else {
        console.log(this.author.pubs[index].paper_id)
        this.$axios.post('/apis/search/papernotdisplay',
            {
              userid: this.user_id,
              paperid: this.author.pubs[index].paper_id,
            }).then(res => {
          console.log(res)
          if (res.data.status === 0) {
            this.$message({
              type: "success",
              message: "设置隐藏成功",
            })
          }
        })
      }
    },
    //跳转门户所绑定用户的个人信息页面，未完成
    jump_to_info(user_id) {
      if (user_id < 0) {
        alert('对不起，该门户未被认领')
      } else {
        this.$router.push({
          name: 'userinfo',
          param: {
            userid: user_id
          }
        })
      }
    },
    //跳转对应学术成果，已完成
    jump_to_paper(paper_id) {
      this.$router.push({
        path: '/paper',
        query: {
          // paper_id: this.$Base64.encode(JSON.stringify(paper_id)),
          paper_id: paper_id,
        }
      })
    },
    //跳转对应专家门户，已完成
    jumpToPortal(author_id) {
      this.$router.push({
        path: '/author',
        query: {
          author_id: author_id,
        }
      })
    },
    //请求分页数据，未完成
    handleCurrentChange(val) {
      this.$axios.post('/apis/search/getauthorbyid',
          {
            authorid: this.author.author_id,
            pagenumber: val
          })
          .then(res => {
            console.log(res)
            if (res.status === 200) {
              this.author.pubs = []
              for (let i = 0; i < res.data.res.pubs.length; i++) {
                // this.author.pubs[i].paper_id = res.data.res.pubs[i].i;
                // this.author.pubs[i].is_display = res.data.res.pubs[i].is_display;
                //学术成果
                this.$axios.post('/apis/search/getpaperbyid',
                    {
                      paperid: res.data.res.pubs[i].i
                    }).then(res2 => {
                  let obj = {
                    paper_id: res.data.res.pubs[i].i,
                    is_display: res.data.res.pubs[i].isdisplay,
                    title: res2.data.title,
                    author: res2.data.authors,
                    venue_raw: res2.data.venue_raw,
                    year: res2.data.year,
                    keywords: res2.data.keywords,
                    n_citation: res2.data.n_citation,
                    page_start: res2.data.page_start,
                    page_end: res2.data.page_end,
                    volumn: res2.data.volumn,
                    issue: res2.data.issue,
                    isbn: res2.data.isbn,
                    doi: res2.data.doi,
                    abstract: res2.data.abstract,
                  }
                  if (typeof (res.data.res.pubs[i].isdisplay) == "undefined") {
                    obj.is_display = 1
                  }
                  this.author.pubs.push(obj)
                })
              }
              console.log('切换到第' + val + '页成功')
              this.current_page = val
            }
          })
    },
  },
  computed: {},
  components: {
    NewBottom,
    NewNavigation,
  },
  filters: {
    // 只显示前32个字符，超出用省略号
    ellipsis(value) {
      if (!value) return ''
      if (value.length > 32) {
        return value.slice(0, 32) + '...'
      }
      return value
    }
  },
}
</script>

<style>
body {
  background-image: url('../../assets/image/user/image/login-back.png');
  background-attachment: fixed;
}
</style>

<style scoped>
.el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover {
  box-shadow: 1px 1px 0 0 rgba(0, 0, 0, .1)
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.profile {
  text-align: left;
  /*border: 2px #d3dce6;*/
  /*border-right-style: solid;*/
}

.echartLayout {
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 100%;
}

.el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.label {
  text-align: left;
  margin-left: 0px;
  font-family: "Arial Black";
  font-size: 24px;
  font-weight: 500;
}

.el-link :hover {
  color: #0f72ca;
  /*font-size: 20px;*/
  text-shadow: black;
}
</style>