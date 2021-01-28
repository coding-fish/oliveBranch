<template>

  <div>
    <new-navigation></new-navigation>
    <el-container>
      <el-main style="text-align: center;">
        <div  style="margin-top: 0px; margin-bottom: 0px;
                margin-left: 100px; margin-right: 100px; height: 350px">
          <el-carousel type="card" height="350px">
            <el-carousel-item v-for="item in 6" :key="item">
              <h3>课程图片{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        <el-row style="margin-left: 100px; margin-right: 100px">
          <div class="label">最近直播</div>
          <el-divider></el-divider>
          <el-row :gutter="20">
            <el-col :span="6" v-for="item in 4" :key="item">
              <div class="grid-content bg-purple" style="font-weight: bold;">
                <img src="../../assets/bhkw.png" height="120px" width="250px"/><br>
                课程名称{{ item }}
                <div style="font-size: 10px; color: #4a5568">授课团队{{ item }}</div>
                <el-divider></el-divider>
                <div style="font-size: 10px; color: #050505">内容简介{{ item }}</div>
              </div>
            </el-col>
          </el-row>
        </el-row>
        <el-row style="margin-left: 100px; margin-right: 100px">
          <div class="label">热门课程</div>
          <el-divider></el-divider>
          <el-row :gutter="20">
            <el-col :span="6" v-for="item in 4" :key="item">
              <div class="grid-content bg-purple" style="font-weight: bold;">
                <img src="../../assets/bhkw.png" height="120px" width="250px"/><br>
                课程名称{{ item }}
                <div style="font-size: 10px; color: #4a5568">授课团队{{ item }}</div>
                <el-divider></el-divider>
                <div style="font-size: 10px; color: #050505">内容简介{{ item }}</div>
              </div>
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
      professor: '',
      proRank: '#1',
      proIntroduction: 'Pro Introduction',
      options: [{
        value: '选项1',
        label: '标题'
      }, {
        value: '选项2',
        label: '关键词'
      }],
      value: '',
      ranks: [{
        id: '',
        title: '',
        n_citation: ''
      }],
      library: [{
        id: '',
        name: '',
        h_index: '',
        n_pubs: '',
        n_citation: '',
      }],
      science: [{
        avatar: '',
        blogid: '',
        blogname: '',
        htmlcontent: '',
        likenum: '',
        readnum: '',
        textcontent: '',
        tipnum: '',
        userid: '',
      }],
      input3: '',
      type: '标题'
    }
  },
  mounted() {
    // this.getRanks()
    // this.getLibrary()
    // this.getScience()
  },
  methods: {
    //高级检索跳转
    gotoCompSearch() {
      this.$router.push('/AdvancedSearch')
    },
    // //学术焦点
    // getRanks() {
    //     var that = this
    //     this.$axios.post('/apis/search/popularpapers',
    //     ).then(res => {
    //         console.log(res);
    //         that.ranks = res.data
    //     })
    // },
    // //热门专家
    // getLibrary() {
    //     var that = this
    //     this.$axios.post('/apis/search/popularauthors')
    //         .then(res => {
    //             console.log(res);
    //             that.library = res.data
    //         })
    // },
    // // 热门帖子
    // getScience() {
    //     var that = this
    //     this.$axios.post('/apis/blog/gethotblogs',
    //         {
    //             type: 0
    //         },)
    //         .then(res => {
    //             console.log(res);
    //             that.science = res.data.data.list
    //         })
    // },
    // getType(label) {
    //     this.type = label
    // },
    sendSearch(input, type) {
      if (input.length === 0) {
        this.$message({
          type: 'info',
          message: '请输入搜索内容！'
        })
      } else {
        this.$router.push({
          path: '/Searching',
          query: {
            input: input,
            type: type
          }
        })
      }
    }
  }
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
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
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

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>