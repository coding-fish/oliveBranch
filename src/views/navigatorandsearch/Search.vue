<template>
  <!--这是网站的主页-->
  <div>
    <new-navigation></new-navigation>
    <el-container>
      <el-main style="text-align: center;">
        <el-row style="margin: 0 100px">
          <el-col span="4">
            <div style="height: 360px; background-color: white; padding: 0 10px">
              <el-collapse v-model="activeName" accordion>
                <el-collapse-item title="小学" name="1">
                  <div>
                    <el-link>更多功能</el-link>
                  </div>
                  <div>
                    <el-link>敬请期待</el-link>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="初中" name="2">
                  <div>开发中，敬请期待</div>
                </el-collapse-item>
                <el-collapse-item title="高中" name="3">
                  <div>开发中，敬请期待</div>
                </el-collapse-item>
                <el-collapse-item title="团队风采" name="4">
                  <div>开发中，敬请期待</div>
                </el-collapse-item>
                <el-collapse-item title="在线咨询" name="5">
                  <div>开发中，敬请期待</div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-col>
          <el-col span="12">
            <div>
              <el-carousel height="400px" indicator-position="none">
                <el-carousel-item v-for="item in imgs" :key="item">
                  <img :src="item.url" height="360px"/>
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
          <el-col span="8">
            <div style="height: 120px; background-color: white; color: black;
            font-size: 0.5rem ;padding: 1rem">
              <el-row>
                <el-col span="8">
                  <img src="@/assets/logo0.jpg" width="150"/>
                </el-col>
                <el-col span="16">
                  <p>
                    橄榄支实践队由北京航空航天大学的学生创建组成，旨在通过一个在线平台，实现支教团队与需要帮助的学校之间信息共享。支教团队把支教变成课程的形式，学校与学生可以由平台获取到课程信息，实现双方双向选择，希望通过这种方式为教育不发达的地区实现教育脱贫贡献力量。
                  </p>
                </el-col>
              </el-row>
            </div>
            <div style="height: 120px; background-color: white; color: black;">
            </div>
            <div style="height: 120px; background-color: white; color: black;">
              <el-row>
                <el-col span="24">
                  开发中，敬请期待
                </el-col>
              </el-row>
<!--              <a href="src/assets/handler.pdf" target="_blank">-->

<!--              </a>-->
            </div>
          </el-col>
        </el-row>

        <el-row style="margin-left: 100px; margin-right: 100px">
          <div class="label">最近直播</div>
          <el-divider></el-divider>
          <el-row :gutter="20">
            <!--最多显示4条-->
            <el-col :span="6" v-for="(item, index) in latest_courses" :key="index" v-if="index<4">
              <el-link @click="jumpToDetail(item)" :underline=false>
                <div class="grid-content bg-purple" style="font-weight: bold; height: 300px">
                  <el-image :src="item.picture" style="height: 180px">
                    <div slot="error" class="image-slot">
                      <div
                          style="background-color: #3a8ee6; height: 180px; width: 290px; line-height: 100px; text-align: center; color: white">
                        暂无图片
                      </div>
                    </div>
                  </el-image>
                  {{ item.name }}
                  <div style="font-size: 10px; color: #4a5568">{{ item.team }}</div>
                  <br/>
                  <div style="font-size: 10px; color: #050505;">{{ item.description | ellipsis }}</div>
                </div>
              </el-link>
            </el-col>
          </el-row>
        </el-row>
        <el-row style="margin-left: 100px; margin-right: 100px">
          <div class="label">热门课程</div>
          <el-divider></el-divider>
          <el-row :gutter="20">
            <!--最多显示4条-->
            <el-col :span="6" v-for="(item, index) in popular_courses" :key="index" v-if="index<4">
              <el-link @click="jumpToDetail(item)" :underline=false>
                <div class="grid-content bg-purple" style="font-weight: bold;height: 300px">
                  <el-image :src="item.picture" style="height: 180px">
                    <div slot="error" class="image-slot">
                      <div
                          style="background-color: #3a8ee6; height: 180px; width: 290px; line-height: 100px; text-align: center; color: white">
                        暂无图片
                      </div>
                    </div>
                  </el-image>
                  {{ item.name }}
                  <div style="font-size: 10px; color: #4a5568">{{ item.team }}</div>
                  <br>
                  <div style="font-size: 10px; color: #050505">{{ item.description | ellipsis }}</div>
                </div>
              </el-link>
            </el-col>
          </el-row>
        </el-row>
      </el-main>
      <el-footer></el-footer>
    </el-container>
    <NewBottom></NewBottom>
  </div>

</template>

<script>
import NewNavigation from '../navigatorandsearch/NewNavigation';
import NewBottom from "@/views/navigatorandsearch/NewBottom";

export default {
  name: "Search",
  components: {
    NewBottom,
    NewNavigation
  },
  data() {
    return {
      latest_courses: [],// 最近直播的课程
      popular_courses: [],// 热门课程
      value: '',
      type: '标题',
      imgs: [
        {url: require('@/assets/carousel/1.jpg')},
        {url: require('@/assets/carousel/2.jpg')},
        {url: require('@/assets/carousel/3.jpg')},
        {url: require('@/assets/carousel/4.jpg')},
        {url: require('@/assets/carousel/5.jpg')},
        {url: require('@/assets/carousel/6.jpg')},
      ],
      activeName: "-1",// 手风琴从1开始数，所以这是一个无效数字
    }
  },
  mounted() {
    this.getLatest();
    this.getPopular();
  },
  methods: {
    getLatest() {
      this.$axios.post('/apis/course/getlatest')
          .then(res => {
            if (res.data.error_code === 0) {
              this.latest_courses = res.data.data;
            } else {
              this.$message.error('网络错误')
            }
          })
    },
    getPopular() {
      this.$axios.post('apis/course/getpopular')
          .then(res => {
            if (res.data.error_code === 0) {
              this.popular_courses = res.data.data;
            } else {
              this.$message.error('网络错误')
            }
          })
    },
    jumpToDetail(item) {
      this.$router.push({
        path: '/course',
        query: {
          courseid: item.id
        }
      })
    }
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
  /*background-color: whitesmoke;*/
  background-image: url('../../assets/image/user/image/login-back.png');
}
</style>
<style lang="scss" scoped>
#searchInput {
  /deep/ .el-input-group__prepend {
    background-color: #FFF;
    border: 2px solid #005bac;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .2);
    border-right-width: 0;
  }

  /deep/ .el-input-group > .el-input__inner {
    border: 2px solid #005bac;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .2);
    border-right-width: 0;
    border-left-width: 0;
  }

  /deep/ .el-input-group__append {
    background-color: #FFF;
    border: 2px solid #005bac;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .2);
    border-left-width: 0;
  }
}

/deep/ .el-carousel__item[data-v-1a1d373c]:nth-child(2n+1) {
  background-color: #005bac;
  color: white;
}

/deep/ .el-carousel__item[data-v-1a1d373c]:nth-child(2n) {
  background-color: #005bac;
  color: white;
}

/deep/ .el-carousel__mask {
  width: 100%;
  background-color: #FFF;
  opacity: .24;
  transition: .2s;
}

/*#df5747*/
/deep/ .el-card__header {
  background-color: #005bac;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

/deep/ .el-card__body {
  display: flex;
  flex-direction: column;
  background-color: white;
}

/deep/ .el-input__inner {
  height: 55px;
  border-style: solid solid solid solid;
  font-size: 16px;
}

/deep/ .el-input-group__prepend {
  /*background-color: #db8fbe;*/
  border-style: solid;
  border-radius: 27px 0 0 27px;
  /*color: white;*/
}

/deep/ .el-input-group__append {
  /*background-color: #db8fbe;*/
  border-style: solid;
  border-radius: 0 27px 27px 0;
  /*color: white;*/
}

.el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
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
  width: 480px;
}

.el-carousel__item h3 {
  color: #694753;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  //background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  //background-color: #d3dce6;
}

.label {
  text-align: left;
  margin-left: 0px;
  font-family: "Arial Black";
  font-size: 24px;
  font-weight: 500;
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
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
  border-radius: 0px;
  min-height: 36px;
  height: 250px;
  text-align: left;
  padding: 5px;
}

.el-link :hover {
  // 自定义的悬停效果
  color: #0f72ca;
  //font-size: 20px;
  text-shadow: black;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

</style>