<template>
  <div>
    <new-navigation></new-navigation>
    <el-container>
      <el-main style="padding-left: 130px; padding-right: 130px;">
        <el-row :gutter="20" style="padding-top: 1rem">
          <el-col :span="10">
            <div class="grid-content" style="height: 300px">
              <img :src=this.course.picture style="width: 100%; height: 100%">
            </div>
          </el-col>
          <el-col :span="14" style=" height: 300px; padding-bottom: 5rem">
            <div style="margin-left: 15px; margin-top: 0px; font-size: 24px">
              {{ this.course.name }}
            </div>
            <div style="background-color: #d4d4d4; height: 120px; margin: 20px">
              <div style="text-color: #000000; padding: 15px; font-size: small">
                <div style="font-size: medium">{{ this.course.teacher }}<br><br></div>
                <strong>开课时间：</strong>
                <span v-if="this.course.starttime">
                  {{ this.course.starttime }} 至 {{ this.course.endtime }}
                </span>
                <span v-if="!this.course.starttime">待定</span>
                <br>
                <strong>课堂链接：</strong>
                <!--                <el-link :href=this.course.link target="_blank" v-if="hasJoined">{{ this.course.link }}</el-link>-->
                <el-link v-if="hasJoined" :underline="false">
                  <div v-if="this.course.link">
                    <a :href="this.course.link" target="_blank">{{ this.course.link }}</a>
                  </div>
                  <div v-if="!this.course.link">
                    暂未发布
                  </div>
                </el-link>
                <el-link href v-if="!hasJoined">加入课程后可以访问</el-link>
              </div>
            </div>
            <div style="padding: 20px">
              已有{{ this.course.count }}人参加<br>

              <button style="height: 52px; width: 220px; color: white;
                background-color: #3a8ee6; border-radius: 0px;
                border-color: #3a8ee6; text-align: center" @click="join_course" v-if="!hasJoined">
                <div style="font-size: 18px">加入课程</div>
              </button>
              <button style="height: 52px; width: 220px; color: white;
                background-color: #3a8ee6; border-radius: 0px;
                border-color: #3a8ee6; text-align: center" v-if="hasJoined">
                <div v-if="this.course.link">
                <a :href="this.course.link" target="_blank">
                  <div style="font-size: 18px">已加入，开始学习</div>
                </a>
                </div>
                <div v-if="!this.course.link">
                  <div style="font-size: 18px">已加入，开始学习</div>
                </div>
              </button>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="height: 10px;">
        </el-row>
        <el-row :gutter="20" style="min-height: 300px;">
          <el-col :span="16" style="background-color: white; height: 300px">
            <div style="padding: 10px">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="课程详情" name="first">
                  {{ this.course.description }}
                </el-tab-pane>
                <el-tab-pane label="课程评价" name="second">
                  课程评价
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
          <el-col :span="8" style=" min-height: 100px;">
            <el-row>
              <el-col :span="8">
                <!--团队图像，需要改接口-->
                <!--<div style="background-color: white">-->
                <!--  <img src="../../assets/image/paper/flower-left.jpg"-->
                <!--       style="width: 100px; height: 100px;">-->
                <!--</div>-->
              </el-col>
              <el-col :span="24">
                  <div style="text-align: center; padding-top: 30px; height: 120px;
                background-color: white">
                    <el-link class="teamlink" @click="jumpToTeam" :underline="false">
                      点此进入{{ this.course.team }}
                    </el-link>
                  </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <new-bottom></new-bottom>
  </div>
</template>

<script>
import NewNavigation from "../navigatorandsearch/NewNavigation";
import NewBottom from "@/views/navigatorandsearch/NewBottom";

export default {
  name: "Course",
  components: {
    NewNavigation,
    NewBottom
  },
  data() {
    return {
      course: {
        course_id: '',
        name: '',
        picture: undefined,
        team: '',
        teamid: 0,
        teacher: '',
        description: '',
        link: '',//todo: 加协议头
        starttime: undefined,
        endtime: undefined,
        count: 0,// 加入课程的人数
      },
      hasJoined: false,//是否已加入课程
      user_id: 0,// 用户id
      activeName: 'first' // 课程描述√ | 课程评价
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await this.get_course_id();

      this.$axios.post('/apis/course/getcoursedetail', {
        id: this.course.course_id
      })
          .then(res => {
                console.log(res.data)
                if (res.status === 200) {
                  if (res.data.error_code === 0) {
                    this.course.name = res.data.data.name
                    this.course.team = res.data.data.team
                    this.course.teamid = res.data.data.teamid
                    this.course.teacher = res.data.data.teacher
                    this.course.description = res.data.data.description
                    this.course.starttime = res.data.data.starttime
                    this.course.endtime = res.data.data.endtime
                    this.course.picture = res.data.data.picture
                    this.course.count = res.data.data.count
                    if (res.data.data.link) {
                      this.course.link = 'http://' + res.data.data.link// fixme:默认都是http协议
                    } else {
                      this.course.link = ''
                    }
                    // 是否加入课程
                    if (this.$store.state.userId !== 0) {
                      this.user_id = this.$store.state.userId;
                    } else if (this.$store.state.teamId !== 0) {
                      this.user_id = this.$store.state.teamId;
                    }
                    if (this.user_id !== 0) {
                      this.$axios.post('/apis/course/isjoined', {
                        uid: this.user_id,
                        cid: this.course.course_id
                      }).then(res => {
                        if (res.data.data.joined === 1) {
                          this.hasJoined = true;
                        }
                      })
                    }
                  } else {
                    this.$message.error('课程不存在')
                  }
                } else {
                  this.$message({
                    message: '网络错误',
                    type: 'warning'
                  })
                  this.$router.go(-1)
                }
              }
          )
    },
    async get_course_id() {
      this.course.course_id = this.$route.query.courseid
      // this.course.course_id = this.$route.params.courseid// 用params传值 刷新后值会丢失
    },
    join_course() {
      if (this.user_id === 0) {
        this.$message.error('请先登录')
      } else {
        this.$axios.post('apis/course/joincourse', {
          uid: this.user_id,
          cid: this.course.course_id
        }).then(res => {
          if (res.data.data.joined === 1) {
            this.$message.success('加入成功')
            this.hasJoined = true;
          } else {
            this.$message.error('加入失败')
          }
        })
      }
    },
    jumpOutLink() {
      if (this.course.link !== '暂无') {
        this.$router.replace(this.course.link)
        window.open()
      } else {
        this.$message.info('课程链接暂未发布')
      }
    },
    jumpToTeam() {
      if (this.course.teamid) {
        this.$router.push({
          path: '/team',
          query: {
            teamid: this.course.teamid
          }
        })
      }
      else {
        // do nothing
      }
    },
    jumpToPortal(author_id) {
      this.$router.push({
        path: '/team',
        query: {
          author_id: author_id
        }
      })
    }
    ,
    handleClick(tab, event) {
      console.log(tab, event);
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
.el-row {
  margin-bottom: 20px;

&
:last-child {
  margin-bottom: 0;
}

}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.teamlink {
  font-size: 25px;
}
.teamlink:hover{
  color: #0f72ca;
}
</style>