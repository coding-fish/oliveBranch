<template>
    <div>
        <div>
            <new-navigation></new-navigation>
        </div>
        <el-row>
          <el-col :span="11">
          <el-input
  type="textarea"
  autosize
  placeholder="请输入内容"
  v-model="name"
  style="font-size:30px;margin-top:20px"
  >
</el-input> 
          
              </el-col> 
              <el-col :span="1" class="grid-content"></el-col>
                <el-col :span="12">
                  <h2 style="margin-top:20px;font-size:2em">{{ name }}</h2>
                  </el-col> 
              <el-col  :span="24">
             <wang-enduit v-model="content" ref="child"></wang-enduit>
          </el-col>
        </el-row>
        <el-row style="margin-top:16px">
           <el-col :span="15" class="grid-content"></el-col>
          <el-col :span="6">
            <span style="color:#df5746;font-size:20px;font-weight:700;margin-right:18px">文章类型:</span>
      <el-select v-model="type" placeholder="请选择">
    <el-option
      v-for="item in chose"
      :key="item.type"
      :label="item.name"
      :value="item.type">  
      <span style="float: left">{{ item.name }}</span>
    </el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
                <el-button type="primary" @click="submit()">提交</el-button>
          </el-col>
        </el-row>
    </div>

</template>
<script>
import NewNavigation from "../navigatorandsearch/NewNavigation";
import wangEnduit from "./wangEnduit";
// @ is an alias to /src
export default {
  name: "BlogEdit",
    components: {
      NewNavigation,
      wangEnduit
    },
  data(){
      return{
        text:"",
          name:"",
          content:"",
          type:1,
          chose:
          [{name:"全部",type:0},{name:"Python",type:1},{name:"Java",type:2},
          {name:"前端",type:3},{name:"架构",type:4},{name:"区块链",type:5},
          {name:"数据库",type:6},{name:"5G",type:7},{name:"游戏开发",type:8},
          {name:"移动开发",type:9},{name:"运维",type:10},{name:"安全",type:11},
          {name:"研发管理",type:12},{name:"物联网",type:13},
          {name:"生物",type:14},{name:"物理",type:15},{name:"党政",type:16},
          {name:"农林",type:17},{name:"建筑",type:18},{name:"制造",type:19},
          {name:"教育",type:20},{name:"党政",type:21},{name:"能源",type:22},
          {name:"卫生",type:23},{name:"航空",type:24},{name:"金融",type:25},
          {name:"商贸",type:26},{name:"会计",type:27},{name:"国防",type:28},
          {name:"体育",type:29},{name:"电子",type:30},{name:"创业",type:31},
          {name:"其他",type:32},]
        ,

      }
  },
   mounted(){
     this.$axios.post('/apis/blog/getbloginfo',
              {
                id:this.$route.params.blogid
              },
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
       //        console.log(res);
                this.name=res.data.data.title;
                this.content=res.data.data.htmlcontent
                this.type=res.data.data.type
              })
  },
  methods:{
      submit(){
        if(this.name=="")
        alert("博客名字不可为空")
        else{
            this.text=this.$refs.child.gettxt();
           this.$axios.post('/apis/blog/editblog',
              {
                id:this.$route.params.blogid,
                name:this.name,
                htmlcontent:this.content,
                textcontent:this.text,
                type:this.type
              },
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
      //          console.log(res);
                this.$router.push({path:"/BlogItem/"+this.$route.params.userid+"/"+this.$route.params.blogid})
              })
        }
        
      }
  }
}
</script>
<style scoped>
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
