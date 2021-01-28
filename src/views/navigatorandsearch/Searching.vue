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
                  <span v-if="totalnum!==10000">
                    <div style="color: #3a8ee6">共找到{{ totalnum }}条结果</div>
                  </span>
                  <span v-else>共找到超过10000条结果</span>
                </el-col>
                <el-col style="margin-top: 1rem; text-align: left">
                  <el-button @click="search1()">全部</el-button>
                  <el-button @click="search2()">授课时间</el-button>
                </el-col>
                <el-col :span="24" style="margin-top: 1rem; text-align: left"
                        v-for="(item, index) in Author_information"
                        :key="index">
                  <el-card class="box-card" shadow="hover">
                    <div class="card">
                      <el-row gutter="20">
                        <el-col span="6">
                          <img src="../../assets/bhkw.png" height="120px" width="160px"/>
                        </el-col>
                        <el-col span="18">
                          <el-col :span="24" style="margin-bottom: 1rem">
                            <el-link @click="jumpToAouther(item.id)" style="font-size: 1.2rem">
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
                              {{ item.description }}</span>
                          </el-col>
                        </el-col>
                      </el-row>
                    </div>
                  </el-card>
                </el-col>

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
                          @current-change="handleCurrentChange">
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
              <div v-for="item in 4" :key="item" style="margin-left: 1rem">
                <el-card shadow="hover"
                         style="font-weight: 500; background-color: white; height: 200px">
                  <img src="../../assets/bhkw.png" height="135px" width="180px" align="center"/><br>
                  课程名称{{ item }}
                  <div style="font-size: 10px; color: #4a5568">授课团队{{ item }}</div>
                </el-card>
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
      min_num: 1800,
      max_num: 2020,
      formInline: {
        start: '',
        end: ''
      },
      start: [{
        value: '选项1', label: '1800'
      }, {
        value: '选项2', label: '1801'
      }],
      end: [{
        value: '选项1', label: '1990'
      }, {
        value: '选项2', label: '1991'
      }],

      search1_ascending: 1,//默认升序排列
      search2_ascending: 1,//默认升序排列
      search3_ascending: 1,//默认升序排列
      search4_ascending: 1,//默认升序排列
      search5_ascending: 1,//默认升序排列
      search6_ascending: 1,//默认升序排列
      search7_ascending: 1,//默认升序排列

      value1: '',
      value2: '',
      collapse: false,
      pageSize: 10,//每页显示10条
      current_page: 1,
      pagenum: 10,
      totalnum: 66,// 找到的结果总数
      Author_information: [
        {
          id: "",
          name: "testPaper",
          team: "",//h指数
          description: "this is a test course despciption...",//发表论文数
          tags: [{
            t: "",//关键词内容
            w: ""//相关论文数量
          }],//相关领域
          n_citation: "",//被引数
          pubs: [{
            i: "",//论文id
            r: ""//作者排名
          }],//论文
          orgs: ""//工作单位
        }, {
          id: 155,
          name: "我吃西红柿",
          team: "蓝天支教团",
          description: "We are just doing what we are told. I feel something so wrong, doing the right thing." +
              "I couldn't lie, couldn't lie , couldn't lie. Everything that kills me makes me feel alive. Take the money " +
              "and watch it burn. Send no more counting dollars we'll be counting stars."
          ,
          tags: [{
            t: "计算机",
            w: "100"
          }, {
            t: "生物",
            w: "50"
          }],
          n_citation: "1065",
          orgs: "起点中文网"
        }, {
          id: 156,
          name: "我不吃西红柿",
          team: "传承实践队",
          description: "这是关于西红柿的阿巴阿巴",
          tags: [{
            t: "计算机",
            w: "100"
          }, {
            t: "生物",
            w: "50"
          }],
          n_citation: "1065",
          orgs: "终点中文网"
        },
        {
          id: 88,
          name: "shape of YOU",
          team: "北航支教团",
          description: "Baby I've been I've been losing sleep, dreaming about the things that we could be.",
          tags: [{
            t: "计算机",
            w: "100"
          }, {
            t: "生物",
            w: "50"
          }],
          n_citation: "1065",
          orgs: "终点中文网"
        },],
      subject: [{
        value: '选项1', label: '作者'
      }, {
        value: '选项2', label: '领域'
      }],
      value: this.$route.query.type,//this.$route.params.type
      input: this.$route.query.input,//this.$route.params.input
      select: this.$route.query.type,//this.$route.params.type
      output_label: this.$route.query.type,//this.$route.params.type
      label_type: 1,
      author_boolen: false,
      paper_boolen: false,
      order: 1,
      s_year: 1800,
      e_year: 2020,
      is_range: 0,
      totalpage: 0
    };
  },
  components: {
    NewBottom,
    NewNavigation
  },
  mounted() {
    this.search_click();
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
    get_input() {
      this.input = this.$route.query.input
    },
    search_click() {
      if (this.input == '') {
        this.$alert('关键词不能为空', 'tips.', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${action}`
            });
          }
        });
      } else {
        this.$router.push({
          path: '/Searching',
          query: {
            input: this.input,
            type: this.output_label
          }
        })
        // 先注释掉
        // const loading = this.$loading({
        //     lock: true,
        //     text: 'Loading',
        //     spinner: 'el-icon-loading',
        //     background: 'rgba(0, 0, 0, 0.7)'
        // })
        if (this.output_label == 'ISBN') {
          this.label_type = 9
          this.author_boolen = false
          this.paper_boolen = true
        }
        this.order = 1
        this.$axios.post('/apis/search/basicsearch',
            {
              type: this.label_type,
              content: this.input,
              order: this.order,
              isasc: 0,
              pagenumber: 1
            }).then(res => {
          console.log(res)

          this.papers_information = res.data.res
          this.Author_information = res.data.res
          this.totalnum = res.data.total
          this.totalpage = Math.ceil(this.totalnum / 10)
          loading.close()

        }),
            console.log(this.label_type)
        console.log(this.input)
      }
    },
    jumpToAouther(Auther_id) {
      this.$router.push({
        path: '/Author',
        query: {
          author_id: Auther_id
        }
      })
    },
    jumpToPaper(Paper_id) {
      this.$router.push({
        path: '/course',
        query: {
          paper_id: Paper_id
        }
      })
    },
    search1() {
      if (this.search1_ascending == 1) {
        this.search1_ascending = 0
      } else {
        this.search1_ascending = 1
      }
      this.order = 1
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$axios.post('/apis/search/basicsearch',
          {
            type: this.label_type,
            content: this.input,
            order: this.order,
            isasc: this.search1_ascending,
            isrange: this.is_range,
            lowrange: this.start_year,
            highrange: this.end_year,
            pagenumber: 1
          }).then(res => {
            console.log(res)
            this.papers_information = res.data.res
            this.Author_information = res.data.res
            this.totalnum = res.data.total
            this.totalpage = Math.ceil(this.totalnum / 10)
            loading.close()

          }
      )
      // this.search1_ascending=!this.search1_ascending
    },
    handleCurrentChange(val) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$axios.post('/apis/search/basicsearch',
          {
            type: this.label_type,
            content: this.input,
            order: this.order,
            isasc: 0,
            isrange: this.is_range,
            lowrange: this.start_year,
            highrange: this.end_year,
            pagenumber: val
          }).then(res => {
        console.log(res)

        this.papers_information = res.data.res
        this.Author_information = res.data.res
        this.totalnum = res.data.total
        this.totalpage = Math.ceil(this.totalnum / 10)
        loading.close()

      })
      this.current_page = val
    }

  }
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
</style>