<template>
<div>
  <div>
    <new-navigation :ac="a"></new-navigation>
  </div>
  <div class="flex antialiased min-h-screen">
    <aside class="flex flex-col text-indigo-100 bg-opacity-50" style="width:100px">
      <div class="text-sm md:text-xs img-25">
        <a href="#" class="flex flex-col items-center p-4 md:p-6 font-medium tracking-wider active-nav" style="width:100px; color: white">
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
        <a href="./log" class="flex flex-col items-center p-4 md:p-6 font-medium tracking-wider left-nav" style="color: white">
          <img src="../../assets/image/manage/log.png" style="margin:10px">
          查看日志
        </a>
      </div>
    </aside>
        <!-- bg-indigo-900  -->
    <section v-if="flag==0" class="p-4 text-indigo-100 grey-bgcolor" style="width:250px;bgcolor:white">
      <div class="flex flex-col space-y-6 inbox">
        <ul>
          <li v-for="(item,index) in list" :key="index" style="margin:5px;width:210px">
            
            <!-- py-6 -->
            <a class="relative flex pl-5 pr-3 py-3  rounded-lg middle-nav"  v-bind:class="index==activeindex? 'active':'bg-opacity-50 hover:bg-opacity-75'" @click="active(index)">
              <div class="flex-grow mr-2" style="color: black;">
                <!-- mb-2 -->
                <header class="flex md:flex-col xl:flex-row justify-between mr-2 leading-snug">
                  <div>
                    <h1 class="text-lg font-semibold">{{item.title}}</h1>
                    <h2 class="flex flex-wrap">
                    </h2>
                  </div>
                </header>
                <p>举报人：{{item.user_name_r}}</p>
                <p>举报时间：{{formatDate(item.time)}}</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </section>
    <main v-show="flag==0" class="hidden md:flex flex-col  p-4 md:p-8 bg-gray-200" style="background:rgba(240,241,244);padding:2% 6%;width:100%">
      <div class="px-6 py-5 bg-white shadow rounded-lg mb-4 md:mb-8" style="background:white">
        <div class="flex mb-4">
          <div class="flex-shrink-0 h-8 w-8 lg:h-12 lg:w-12 mr-4 bg-gray-300 rounded-full overflow-hidden">
            <!-- <a :href="'/userinfo/'+item.user_id"><img :src="item.user_icon" class="h-full w-full object-cover"></a> -->
            <el-link :underline="false" :href="'/userinfo/'+item.user_id">
            <el-image style="height:48px;width:48px;border-radius:50%" :src="item.user_icon" fit="cover"></el-image>
            </el-link>
          </div>
          <div >
            <el-link :underline="false" :href="'/BlogItem/'+item.user_id+'/'+item.blog_id" class=" font-semibold" style="font-size:30px">{{item.title}}</el-link>
          </div>
        </div>
        <div class="space-y-4">
          <p v-html="item.content"></p>
        </div>
        <el-divider></el-divider>
        <div class="flex mb-4">
          <div >
            <p class="font-semibold text-lg" >举报理由:</p>
            <p>      </p>
            <p >{{item.reason}}</p>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap items-center -mb-4 pt-4 md:pt-8 justify-end ">
        <el-button type="primary" @click="ss(activeindex,1)">删帖</el-button>
        <el-button v-on:click="ss(activeindex,0)">忽略</el-button>
      </div>
    </main>
  
  </div>
</div>

</template>

<script>
// @ is an alias to /src
import NewNavigation from "../navigatorandsearch/NewNavigation";

export default {
  name: "ArticleReported",
  components: {
    NewNavigation,
  },
  data(){
      // let flag
      return{
        a:"5-1",
        search:"搜索内容",
        count:0,
        activeindex:0,
        list:[],
        item:{},
        flag:0,
      }
  },
  mounted(){
    //接口文档27.3
    this.$axios.post('/apis/report/getblogreports',
    {
      type:2,
    }).then(res => {
      //接收数据
      console.log(res);
      this.list = res.data.data.article_reported_list;
      if(this.list.length==0)
        this.flag=1;
      else this.item=this.list[0]
    })
  },
  methods:{
    active(i){
      this.activeindex=i
      this.item=this.list[i];
    },
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
    },
    ss(index,i) {
      ///alert(this.list[index].report_id)
      this.$axios.post('/apis/report/handleblogreport',
      {
          id: this.list[index].report_id,
          type:i,
      })
      .then(res => {
        console.log(res);
        if (res.data.data.status === 0) {
          this.$message({ message: '删除帖子失败', type: 'warning' });
        } else {
          this.$router.go(0);
          // this.list.splice(this.activeindex,1)
          // this.activeindex=0
          // if(this.list.length==0)
          //   this.flag=1;
          // else this.item=this.list[0]
          // this.$message({ message: '处理举报成功', type: 'success' });
        }
      })
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