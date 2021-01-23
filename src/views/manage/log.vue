<template>
    <div class="back">
    <div>
        <new-navigation :ac="a"></new-navigation>
    </div>
        <div class="flex antialiased min-h-screen">
            <aside class="flex flex-col text-indigo-100 bg-opacity-50" style="width:100px">
                <div class="text-sm md:text-xs img-25">
                    <a href="./blogreported" class="flex flex-col items-center p-4 md:p-6 font-medium tracking-wider left-nav" style="width:100px; color: white">
                    <img src="../../assets/image/manage/document.png" style="margin:10px">
                    违规帖子
                    </a>
                    <a href="./commentreported" class="flex flex-col items-center p-4 md:p-6 font-medium tracking-wider left-nav" style="color: white">
                    <img src="../../assets/image/manage/comment1.png" style="margin:10px" >
                    违规评论
                    </a>
                    <a href="./gwreported" class="flex flex-col items-center p-4 md:p-6 font-medium tracking-wider left-nav" style="color: white">
                    <img src="../../assets/image/manage/globe_3.png" style="margin:10px">
                    冒领门户
                    </a>
                    <a href="#" class="flex flex-col items-center p-4 md:p-6 font-medium tracking-wider active-nav" style="color: white">
                    <img src="../../assets/image/manage/log.png" style="margin:10px">
                    查看日志
                    </a>
                </div>
            </aside>
            <!-- padding:2% 6%; -->
            <!-- background:rgba(240,241,244); -->
            <main style="width:100%">
                <div style="margin-top: 2%;margin-left: 8%;margin-right: 8%">
                  <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%">
                    <el-table-column
                    prop="filename"
                    label="文件名"z>
                    </el-table-column>
                    <el-table-column
                    prop="startlinenum"
                    label="开始行数">
                    </el-table-column>
                    <el-table-column
                    prop="finishlinenum"
                    label="结束行数">
                    </el-table-column>
                    <el-table-column
                    prop="updateadministrator"
                    label="管理员">
                    </el-table-column>
                    <el-table-column
                    prop="updatetime"
                    label="更新时间">
                    </el-table-column>
                </el-table>
                <br>
                <el-table
                    :data="tableData2"
                    stripe
                    style="width: 100%">
                    <el-table-column
                    prop="filename"
                    label="文件名">
                    </el-table-column>
                    <el-table-column
                    prop="startlinenum"
                    label="开始行数">
                    </el-table-column>
                    <el-table-column
                    prop="finishlinenum"
                    label="结束行数">
                    </el-table-column>
                    <el-table-column
                    prop="updateadministrator"
                    label="管理员">
                    </el-table-column>
                    <el-table-column
                    prop="updatetime"
                    label="更新时间">
                    </el-table-column>
                </el-table>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import NewNavigation from "../navigatorandsearch/NewNavigation";

export default {
  name: "Log",
  components: {
    NewNavigation,
  },
  data(){
      // let flag
      return{
          a:"5-2",
        search:"搜索内容",
        count:0,
        tableData2: [],
        tableData: [],
      }
  },
  mounted(){
    //接口文档27.3
    this.$axios.post('/apis/search/getupdatebyfilename',
    {
        filename:"author",
        pagenumber:1
    }).then(res => {
      //接收数据
      console.log(res);
      for(var i=0,len = res.data.length; i<len;i++){
        res.data[i].updatetime = this.formatDate(res.data[i].updatetime)
      }
      this.tableData = res.data;
      // alert(this.res.data)
      console.log(this.tableData)
    }),
    this.$axios.post('/apis/search/getupdatebyfilename',
    {
        filename:"paper",
        pagenumber:1
    }).then(res => {
      //接收数据
      console.log(res.data);
      for(var i=0,len = res.data.length; i<len;i++){
        res.data[i].updatetime = this.formatDate(res.data[i].updatetime)
      }
      this.tableData2 = res.data;
      console.log(this.tableData2)
      // this.tableData2 = res.data;
    })
  },
  methods:{
    formatDate (date) {
      Date.prototype.format = function(fmt) {
        var o = {
          "M+" : this.getMonth()+1,                 //月份
          "d+" : this.getDate(),                    //日
          "h+" : this.getHours(),                   //小时
          "m+" : this.getMinutes(),                 //分
          "s+" : this.getSeconds(),                 //秒
          "q+" : Math.floor((this.getMonth()+3)/3), //季度
          "S"  : this.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt)) {
          fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        for(var k in o) {
          if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
          }
        }
        return fmt;
      }
      //假设输入的时间格式为YYYY-MM-DDTHH-mm-SS.sss
      const s = String(date)
      s.replace(/(\+d{2})(\d{2})$/, "$1:$2")
      return new Date(s).format('yyyy-MM-dd hh:mm:ss')
    
    }
  }
};
</script>

<style lang="scss" scoped>
  .img-25{
    /deep/ img{
      height: 25px;
    }
  }
  .grey-bgcolor {
     background-color:#f0f1f4;
  }
  .middle-nav {
    background-color: white;
  }
  .text-indigo-100 {
    color: #000;
  }
  .inbox a.active::before {
    background-color: #df5747;
  }
  aside{
    background-color:#df5747;
  }
  .active-nav{
    background-color:#e26c5f;
  }
  .left-nav:hover{
    background-color:#dc4a3a;
  }
</style>
<style>
    body {
        background-image: url('../../assets/image/user/image/login-back.png');
        background-attachment: fixed;
    }
</style>