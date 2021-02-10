<template>
  <div class="wrapper">
    <new-navigation></new-navigation>
    <el-container>
      <el-main>
        <el-row :gutter="20" style="min-height: 800px">
          <el-col :span="18">
            <div class="search_result">
              <el-tabs type="border-card"
                       style="background-color: rgba(240,241,244,100); border-radius: 10px;
                        margin-top: 1rem; margin-left: 100px; margin-bottom: 1rem">
                <el-col style="text-align: left">
                  <span>
                    <div style="color: #3a8ee6">共找到{{ totalnum }}条结果</div>
                  </span>
                </el-col>
                <el-col style="margin-top: 1rem; text-align: left">
                  <el-button @click="search1()">全部</el-button>
                  <el-button @click="search2()">授课时间</el-button>
                </el-col>
                <!--注意页码从1开始，index从0开始-->
                <el-col :span="24" style="margin-top: 1rem; text-align: left"
                        v-for="(item, index) in course_information"
                        :key="index"
                        v-if="index>=pageSize*(current_page-1) && index<pageSize*current_page"
                >
                  <el-card class="box-card" shadow="hover">
                    <div class="card" @click="jumpToDetail(item)">
                      <el-row gutter="20">
                        <el-col span="6">
                          <el-image :src="item.picture" height="120px" width="160px">
                            <div slot="error" class="image-slot">
                              <div
                                  style="background-color: #3a8ee6; height: 120px; width: 220px; line-height: 100px; text-align: center; color: white">
                                暂无图片
                              </div>
                            </div>
                          </el-image>
                        </el-col>
                        <el-col span="18">
                          <el-col :span="24" style="margin-bottom: 1rem">
                            <el-link :underline="false" style="font-size: 1.2rem">
                              {{ item.name }}
                            </el-link>
                          </el-col>
                          <el-col :span="24" style="margin-bottom: 1rem; color: #909399">
                          <span v-if="typeof(item.team)!=='undefined'&&item.team!==''">
                            {{ item.team }}
                          </span>
                          </el-col>
                          <el-col :span="24" style="margin-bottom: 1rem">
                            <span v-if="typeof(item.description)!=='undefined'&&item.description!==''">
                              {{ item.description | ellipsis }}</span>
                          </el-col>
                        </el-col>
                      </el-row>
                    </div>
                  </el-card>
                </el-col>
                <!--分页插件-->
                <el-footer>
                  <el-col :span="4">
                    <div class="grid-content"></div>
                  </el-col>
                  <el-col :span="24">
                    <div style="text-align: center;">
                      <el-pagination
                          background
                          layout="prev, pager, next"
                          :total="totalnum"
                          :page-size="pageSize"
                          :current-page="current_page"
                          @current-change="handleCurrentChange"
                          @prev-click="handlePrevClick"
                          @next-click="handleNextClick"
                      >
                      </el-pagination>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content"></div>
                  </el-col>
                </el-footer>

              </el-tabs>
            </div>
          </el-col>
          <el-col :span="6">
            <div style="margin-right: 2rem">
              <div class="label">热门课程</div>
              <el-divider></el-divider>
              <div v-for="(item, index) in popular_courses" :key="index" v-if="index<4" style="margin-left: 1rem">
                <el-link @click="jumpToDetail(item)" :underline=false>
                <el-card shadow="hover"
                         style="font-weight: 500; background-color: white; height: 200px">
                  <el-image :src="item.picture" style="height: 120px" align="center">
                    <div slot="error" class="image-slot">
                      <div
                          style="background-color: #3a8ee6; height: 120px; width: 260px; line-height: 100px; text-align: center; color: white">
                        暂无图片
                      </div>
                    </div>
                  </el-image>
                  <br>
                  {{ item.name }}
                  <div style="font-size: 10px; color: #4a5568">{{ item.team }}</div>
                </el-card>
                </el-link>
                <div style="height: 10px"></div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <new-bottom></new-bottom>
  </div>
</template>

<script>
import NewNavigation from '../navigatorandsearch/NewNavigation';
import NewBottom from "@/views/navigatorandsearch/NewBottom";

export default {
  name: 'Searching',
  data() {
    return {
      input: this.$route.query.input,// 检索的字符串
      course_information: [],// 检索结果列表
      popular_courses: [],// 热门课程
      totalnum: 0,// 找到的结果总数
      pageSize: 10,//每页显示10条
      totalpage: 0,// 分页的总数 = totalnum / pageSize
      current_page: 1,//this.$route.query.pagenum,// 当前所在页

      search1_ascending: 1,//默认升序排列
      pagenum: 10,
    };
  },
  components: {
    NewBottom,
    NewNavigation
  },
  mounted() {
    this.search_init();
  },
  methods: {
    search_start(label) {
      this.s_year = label
      console.log(label)
      console.log(this.s_year)
    },
    search_end(label) {
      this.e_year = label
    },
    search_type(label) {
      this.output_label = label;
      console.log(this.output_label);
    },
    init() {
      this.input = this.$route.query.input;
      // this.current_page = this.$route.query.pagenum
    },
    search_init() {
      this.init();
      const loading = this.$loading({
        lock: true,
        text: '搜索中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      // 获取搜索结果
      this.$axios.post('/apis/course/searchcourse', {
        type: 0,// must be a number
        value: this.input,
        sort:0,// 排序方式
      }).then(res => {
        console.log(res)
        if (res.data.error_code === 0) {
          this.course_information = res.data.data
          this.totalnum = this.course_information.length
          this.totalpage = Math.ceil(this.totalnum / 10)// 每页显示10条结果
        } else {
          this.$message.error('网络错误')
        }
        loading.close()
      })
      // 获取热门课程
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
    },
    search1() {
      // if (this.search1_ascending == 1) {
      //   this.search1_ascending = 0
      // } else {
      //   this.search1_ascending = 1
      // }
      // this.order = 1
      // const loading = this.$loading({
      //   lock: true,
      //   text: 'Loading',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // })
      // this.$axios.post('/apis/search/basicsearch',
      //     {
      //       type: this.label_type,
      //       content: this.input,
      //       order: this.order,
      //       isasc: this.search1_ascending,
      //       isrange: this.is_range,
      //       lowrange: this.start_year,
      //       highrange: this.end_year,
      //       pagenumber: 1
      //     }).then(res => {
      //       console.log(res)
      //       this.papers_information = res.data.res
      //       this.course_information = res.data.res
      //       this.totalnum = res.data.total
      //       this.totalpage = Math.ceil(this.totalnum / 10)
      //       loading.close()
      //
      //     }
      // )
      // this.search1_ascending=!this.search1_ascending
    },
    search2() {
      //todo: 根据时间排序，后期可能扩展
    },
    handleCurrentChange(val) {
      const loading = this.$loading({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.current_page = val;
      loading.close()
    },
    handlePrevClick() {
      if (this.current_page > 1) {
        this.current_page = this.current_page - 1;
      }
    },
    handleNextClick() {
      if (this.current_page < this.totalpage) {
        this.current_page = this.current_page + 1;
      }
    }
  },
  filters: {
    // 只显示前64个字符，超出用省略号
    ellipsis(value) {
      if (!value) return ''
      if (value.length > 64) {
        return value.slice(0, 64) + '...'
      }
      return value
    }
  },
}
</script>

<style scoped>
.header {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 1000;
}

.object_select {
  width: 130px;
}

.grid-content {
  min-height: 36px;
  text-align: left;
  padding-left: 15px;
  padding-right: 15px;
}

</style>
<style>
body {
  background-image: url('../../assets/image/user/image/login-back.png');
  background-attachment: fixed;
}

.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  color: black;
}

.el-tabs--border-card > .el-tabs__header .el-tabs__item:not(.is-disabled):hover {
  color: #005bac;
}

.label {
  text-align: left;
  margin-top: 1rem;
  margin-left: 1rem;
  font-family: "Arial Black";
  font-size: 20px;
  font-weight: 500;
}

.card:hover {
  box-shadow: #005abc;
}

.el-link :hover {
  color: #0f72ca;
  /*font-size: 20px;*/
}
</style>