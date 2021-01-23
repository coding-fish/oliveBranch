<template>
  <div>
<!--    <div>-->
<!--      <new-navigation></new-navigation>-->
<!--    </div>-->
    <div style="width:80%">
      <ul>
        <li style="margin-top:5px;margin-left:10px">
          <el-card shadow="never" v-show="get">
            <div v-show="list.length==0" style="color:gray" class="flex6">
              你还没有发布帖子呦~快来开发你的星球叭
              <svg class="icon" aria-hidden="true" style="font-size:30px;margin-left:20px">
  <use xlink:href="#icon-xingfen"></use></svg>
            </div>
            <div  v-for="(item,index) in list" :key="index" v-show="list.length>0">
              <div class="flex6">
                <el-link class="blog-title" :underline="false" :href="'/BlogEdit/'+id+'/'+item.blogid" style="max-width:80%;">
                  <h2 style="font-size:20px;white-space:nowrap;overflow: hidden; text-overflow: ellipsis;">{{ item.title }}</h2>
                </el-link>
                <el-link class="blog-title" :underline="false" style="margin-left:20px"  :href="'/BlogItem/'+id+'/'+item.blogid">
                  <i class="flex6">
                    <svg class="icon color_deep iconmargin"  style="font-size:20px" aria-hidden="true">
                      <use xlink:href="#icon-yueduliang" ></use>
                    </svg>查看
                  </i>
                </el-link>

              </div>
              <p style="margin-top:7px;padding-left:15px;white-space:nowrap;font-size:14px;color:black;overflow: hidden; text-overflow: ellipsis;">{{ item.textcontent }}</p>
              <div class="flex6" style="color:gray;font-size:12px">
                <span style="margin-right:15px">{{ formatDate(item.date) }} |</span>
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
              </div>
              <el-divider class="inline-divider" style="margin-top:20px;margin-bottom:20px"></el-divider>

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
  name: "BlogMyBlog",
  components: {
    NewNavigation,
  },
  data(){
      return{
          list:[],
          id:1,
          get:false
      }
  },
  mounted(){
      this.$axios.post('/apis/user/getstatus', {
          }).then(res => {
         //       console.log(res);
			 this.id=res.data.userid
			//获取我的帖子信息
     this.$axios.post('/apis/blog/getuserblogs',
             {
                id:this.id
              },
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                this.get=true;
  //              console.log(res)
                this.list=res.data.data.list
              })
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
