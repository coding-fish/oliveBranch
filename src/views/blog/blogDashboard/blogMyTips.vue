<template>
  <div>
<!--    <div>-->
<!--      <new-navigation></new-navigation>-->
<!--    </div>-->
    <div style="width:80%">
        <ul >
          <li style="margin-top:5px;margin-left:10px">
            <el-card shadow="never" v-show="get">
              <div v-show="list.length==0" style="color:gray" class="flex6">
                您暂未发布任何评论哦~ 快去看看我们的广场逛一逛叭~
                <svg class="icon" aria-hidden="true" style="font-size:30px;margin-left:20px">
  <use xlink:href="#icon-lab-kuqi-copy"></use>
</svg>
              </div>
              <div  v-for="(item,index) in list" :key="index" v-show="list.length>0">
                <div class="flex6" >
                  <span style="font-size:12px;color:gray;margin-right:15px">{{ formatDate(item.date) }}</span>
                  <span style="fonr-size:13px;margin-right:15px">评论了</span>
                  <el-link class="blog-title" :underline="false" :href="'/BlogItem/'+item.userid+'/'+item.blogid" style="font-size:16px">{{item.blogname }}</el-link>
                </div>
                <p style="margin-top:7px;">{{ item.content }}</p>
                <div class="flex6" style="margin-top:20px">
                  <span style="font-size:12px;color:gray">来自于</span>
                  <el-image
                          style="width: 30px; height: 30px;border-radius:30px"
                          :src='item.img'
                          fit="cover"></el-image>
                  <el-link class="blog-title" :underline="false" :href="'/userinfo/'+item.userid" style="font-size:14px;font-weight:900;margin-right:20px;margin-left:10px">{{ item.username }}</el-link>
                  <span class="flex6 iconsize">
                                <svg class="icon color_deep iconmargin" aria-hidden="true">
                                 <use xlink:href="#icon-yueduliang" ></use>
                                </svg>
                               <span class="iconcolor"> 阅读量{{ item.readnum }} |</span></span>
                  <span class="flex6 iconsize ">
                            <svg class="icon color_deep iconmargin" aria-hidden="true">
                                 <use xlink:href="#icon-pinglun" ></use>
                                </svg>
                            <span class="iconcolor">评论量{{ item.tipnum }} |</span></span>
                  <span class="flex6 iconsize ">
                             <svg class="icon color_deep iconmargin" aria-hidden="true">
                                 <use xlink:href="#icon-buoumaotubiao15" ></use>
                              </svg>
                           <span class="iconcolor"> 点赞量{{ item.likenum }} </span></span>
                  <el-divider class="inline-divider" style="margin-top:20px;margin-bottom:20px"></el-divider>

                </div>
              </div>
            </el-card>

          </li>
        </ul>
      </div>
  </div>

</template>
<script>
  import NewNavigation from "../../navigatorandsearch/NewNavigation";
// @ is an alias to /src
export default {
  name: "BlogMyTips",
  components: {
    NewNavigation,
  },
  data(){
      return{
          list:[],
          get:false

      }
  },
    mounted(){
    //获取我的评论信息
     this.$axios.post('/apis/blog/getmycomment',
              {
               
              },
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
         //       console.log(res)
         this.get=true
                this.list=res.data.data.list
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
},
  }
  
}
</script>
<style>
body{
  background-image: url('../../../assets/image/user/image/login-back.png');
}
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
