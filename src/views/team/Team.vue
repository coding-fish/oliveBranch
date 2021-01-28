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
                              :src="require('../../image/avatar.jpg')" fit="cover"></el-image>
                  </div>
                </el-col>
                <el-col span="16">
                  <div style="height: 1rem"></div>
                  <el-row gutter="20">
                    <el-col span="20">
                      <div style="font-size: 2rem">{{ team.name }}</div>
                    </el-col>
                    <el-col span="2">
                      <el-button size="mini"
                                 style="vertical-align: center; margin-left: 0.5rem"
                                 v-if="!author.is_followed&&author.is_claimed===1"
                                 type="primary"
                                 @click="follow(0)">关注
                      </el-button>
                      <el-button size="mini"
                                 style="vertical-align: center; margin-left: 0.5rem"
                                 v-if="author.is_followed&&author.is_claimed===1"
                                 type="info"
                                 @click="follow(1)">取消关注
                      </el-button>
                    </el-col>
                    <el-col span="2">
                      <el-button size="mini"
                                 style="vertical-align: center; margin-left: 0.5rem"
                                 v-if="author.is_claimed===1"
                                 type="warning"
                                 @click="privateMessageDisplay">私信TA
                      </el-button>
                    </el-col>
                  </el-row>
                  <div style="height: 3rem"></div>
                  <div style="font-size: 1rem; color: #4a5568">{{ team.description }}</div>
                </el-col>
              </el-row>
              <!--课程-->
              <div class="label">课程</div>
              <el-divider></el-divider>
              <el-row gutter="20">
                <el-col span="6" v-for="item in 5" :key="item">
                  <el-card shadow="hover"
                           style="font-weight: 500; background-color: white; height: 200px">
                    <img src="../../assets/bhkw.png" height="135px" width="180px" align="center"/><br>
                    课程名称{{ item }}
                    <div style="font-size: 10px; color: #4a5568">授课团队{{ item }}</div>
                  </el-card>
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
      <el-footer>
        <el-row gutter="20">
          <el-col :span="3">
            <div class="grid-content"></div>
          </el-col>
          <el-col :span="18">
            <div style="text-align: center;">
              <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="author.total"
                  :page-size="author.page_size"
                  :current-page="author.current_page"
                  @current-change="handleCurrentChange">
              </el-pagination>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content"></div>
          </el-col>
        </el-row>

      </el-footer>
    </el-container>


    <!--私信输入框-->
    <el-dialog
        title="请填写私信内容"
        :visible.sync="privateMessageVisible"
        center
        :append-to-body='true'
        :lock-scroll="false"
        width="50%"
        :before-close="privateMessageClose">
      <el-input
          type="textarea"
          :rows="5"
          autosize
          placeholder="请输入内容"
          v-model="privateMessageText">
      </el-input>
      <el-button class="medium" style="margin-left:40%;position:relative;margin-top:30px" plain
                 @click="submitPrivateMessage(author.author_user_id, privateMessageText)">发送私信
      </el-button>
    </el-dialog>
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
      /*按钮的逻辑：
      1.认领：is_claimed
        0 -> 未被认领
        1 -> 已被他人认领
        2 -> 已被自己认领
      2.举报：is_reported
        0 -> 未被举报，显示举报冒领门户的按钮
        1 -> 已被举报（自己或他人），显示不能点击的按钮
      3.关注：is_followed
        0 -> 未关注
        1 -> 已关注
      */
      imgUrl_left: require('../../assets/image/author/stair-left.jpg'),
      imgUrl_right: require('../../assets/image/author/stair-right.jpg'),
      team: {
        name: "蓝天支教团",
        description: "这是一个源自北航的支教团，旨在将航天知识无偿传播到全国各地的孩子中。" +
            "后面这句话是用来凑字数的，测试一下超过一行的文本将如何显示。如果字数太长，可能" +
            "需要更多行，这时候卡片甚至还要延长。这时候卡片甚至还要延长。这时候卡片甚至还要延长。这时候卡片甚至还要延长。" +
            "这时候卡片甚至还要延长。这时候卡片甚至还要延长。这时候卡片甚至还要延长。这时候卡片甚至还要延长。这时候卡片甚至还要延长。" +
            "这时候卡片甚至还要延长。这时候卡片甚至还要延长。这时候卡片甚至还要延长。这时候卡片甚至还要延长。这时候卡片甚至还要延长。" +
            "这时候卡片甚至还要延长。这时候卡片甚至还要延长。这时候卡片甚至还要延长。这时候卡片甚至还要延长。这时候卡片甚至还要延长。" +
            "这时候卡片甚至还要延长。这时候卡片甚至还要延长。这时候卡片甚至还要延长。这时候卡片甚至还要延长。这时候卡片甚至还要延长。"
      },
      author: {
        author_id: 0,
        author_user_id: -2,
        name: "testName",
        orgs: "",
        h_index: 0,
        tags: [],
        n_pubs: 0,
        n_citation: 0,
        is_claimed: 1,
        is_reported: 0,
        is_followed: false,
        relative_author: [],
        pubs: [],
        page_num: 2,
        page_size: 10,
        current_page: 1,
        status: 0,
        total: 0,
      },
      permit_claim: false,
      searchInput: '',
      reportVisible: false,
      reportText: '',
      privateMessageVisible: false,
      privateMessageText: '',
      myChart: null,
      chartData: [],
      chartLink: [],
      is_login: -1,
      user_id: -1,
    }
  },
  mounted() {
    this.get_login_status();
    this.get_user_info();
    setTimeout(() => {
      this.get_author_id();
      this.get_author(1);
    }, 100)
  },
  methods: {
    //完成
    get_login_status() {
      this.$axios.post('/apis/user/getstatus')
          .then(res => {
            this.is_login = res.data.status
            this.user_id = res.data.userid
          })
    },
    //获取用户信息，查看该用户是否可以认领门户（已认领别的门户则不能再认领门户）
    get_user_info() {
      this.$axios.post('/apis/personality/get')
          .then(res => {
            this.permit_claim = !res.data.is_associated;
          })
    },
    //完成
    get_author_id() {
      // this.author.author_id = JSON.parse(this.$Base64.decode(this.$route.query.author_id))
      this.author.author_id = this.$route.query.author_id
      //获取用户信息，该用户是否可以认领门户
      //同时获取认领门户者的门户id以及认领状态
      this.$axios.post('/apis/user/get_userid_by_authorid',
          {
            authorid: this.$route.query.author_id
          }).then(res => {
        if (res.data.status === 0) {
          this.author.author_user_id = res.data.userid
          if (res.data.userid === -1) {
            this.author.is_claimed = 0
          } else if (res.data.userid !== this.user_id) {
            this.author.is_claimed = 1
          } else if (res.data.userid === this.user_id) {
            this.author.is_claimed = 2
          }
          //获取关注状态
          this.$axios.post('/apis/user/get_follow_state',
              {
                userid: this.author.author_user_id
              }).then(res => {
            if (res.data.status === 0) {
              this.author.is_followed = res.data.is_follow
            }
          })
        }
      })
    },
    //未完成
    get_author(pagenumber) {
      this.$axios.post('/apis/search/getauthorbyid',
          {
            authorid: this.author.author_id,
            pagenumber: pagenumber,
          })
          .then(res => {
            console.log(res)
            if (res.status === 200) {
              this.author.total = res.data.total
              this.author.author_id = res.data.res.id
              this.author.name = res.data.res.name
              this.author.h_index = res.data.res.h_index
              this.author.n_pubs = res.data.res.n_pubs
              this.author.tags = res.data.res.tags
              this.author.n_citation = res.data.res.n_citation
              if (typeof (res.data.res.orgs) !== "undefined")
                this.author.orgs = res.data.res.orgs
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
            } else {
              alert('抱歉，您所点击的专家还未建立门户')
              this.$router.go(-1)
            }
          })

    },
    //完成
    dataEChart(q) {
      let data = [];
      data.push({
        name: this.author.name,
        symbolSize: 100,
        graph_id: 0,
      })
      for (let i = 0; i < q.length; i++) {
        data.push(q[i])
      }

      return data;
    },
    //完成
    linkEChart(data) {
      let dataLink = [];
      for (let i = 0; i < data.length; i++) {
        dataLink.push({
          value: data[i].symbolSize,
          source: 0,
          target: data[i].graph_id,
        })
      }
      return dataLink;
    },

    //按钮：举报、私信、关注
    //举报输入框，未完成
    reportDisplay() {
      if (this.is_login === 1) {
        alert('请先登录！')
        this.$router.push('/login')
      }
      this.reportVisible = true;
    },
    //提交举报门户，未完成
    submitReport(text) {
      if (this.reportText === '')
        this.$alert('举报内容不能为空', '系统提示', {
          confirmButtonText: '确定',
        })
      else {
        this.$axios.post('/apis/report/reportauthor',
            {
              author_id: this.author.author_id,
              author_user_id: this.author.author_user_id,
              text: text
            }).then(res => {
          if (res.data.data.status === 0) {
            this.author.is_reported = 1 - this.author.is_reported
            this.$message({
              type: 'success',
              message: '举报成功，请等待管理员处理',
            })
            this.reportClose();
          }
        })
      }
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
  }
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

</style>