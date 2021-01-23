<template>
  <div >
    <div>
      <new-navigation></new-navigation>
    </div>
    <div style="margin-top:20px">
      <el-dialog
              title="举报"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose"
              center>
        <el-input
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 4}"
                placeholder="请输入内容"
                v-model="jubao">
        </el-input>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false;jubao=''">取 消</el-button>
    <el-button type="primary" @click="ju(jubao)">确 定</el-button>
  </span>
      </el-dialog>
      <el-dialog
              title="举报"
              :visible.sync="dialogVisible2"
              width="30%"
              center>
        <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="jubaotip"
                 class="resizeNone">
        </el-input>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false;jubaotip=''">取 消</el-button>
    <el-button type="primary" @click="jutip(jubaotip)">确 定</el-button>
  </span>
      </el-dialog>
       <el-dialog
              title="私信"
              :visible.sync="dialogVisible3"
              width="30%"
              center>
        <el-input
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 4}"
                placeholder="请输入内容"
                v-model="sixin">
        </el-input>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible3= false;sixin=''">取 消</el-button>
    <el-button type="primary" @click="sendsixin(sixin)">确 定</el-button>
  </span>
      </el-dialog>
      <el-row style="margin-left:30px;margin-right:10px" :gutter="20">
        <el-col :span="5">
          <el-card shadow="never">
            <div class="flex6" style="margin-left:16px">
              <el-image style="width:40px;height:40px;border-radius:40px" :src="userimg" fit="cover"></el-image>
              <el-link class="blog-title" :underline="false" :href="'/userinfo/'+userid" style="margin-left:10px">{{ username }}</el-link>
            </div>
            <div class="flex6" style="margin-top:15px;margin-bottom:15px;margin-left:16px">
              <div v-for="(item,index) in userlist" :key="index" style="margin-right:13px">
                <p style="font-size:14px;text-align:center">{{ item.num }}</p>
                <p style="font-size:12px;color:grey;text-align:center">{{ item.tip }}</p>
              </div>
            </div>
            <el-button type="primary" v-show="own!=userid&&follow==0" @click="changeFollow(1)">关注</el-button>
            <el-button type="primary" v-show="own!=userid&&follow==1" @click="changeFollow(0)">取消关注</el-button>
            <el-button type="primary" v-show="own!=userid" @click="dialogVisible3=true">私信</el-button>
 
          </el-card>
          <el-card shadow="never" style="margin-top:30px">
            <h1 style="font-size:14px;font-weight:900">热门文章</h1>
            <ul v-for="(item,index) in userhotlist" :key="index">
              <li style="margin-top:5px;margin-left:10px;margin-bottom:10px" class="flex6">
                <el-link class="blog-title" :underline="false" :href="'/blogItem/'+userid+'/'+item.blogid" style="font-size:12px;font-weight:500;color:gray;margin-right:5px">{{ item.blogname }}

                </el-link>
                <i class="flex6 iconsize">
                  <svg class="icon color_deep iconmargin" aria-hidden="true">
                    <use xlink:href="#icon-yueduliang" ></use>
                  </svg>
                  <i class="iconcolor" >{{ item.readnum }} </i></i>
              </li>
            </ul>
          </el-card>
        </el-col>
        <!-- <el-col :span="1" class="grid-content"></el-col> -->
        <el-col :span="18">
          <div style="background:white;padding:20px">
            <h2 style="font-size:2em">{{ blogname }}</h2>
            <div class="flex6">
              <el-button style="margin-right:30px">{{ chose[type].name }} </el-button>
              <span class="flex6 iconsize">
                                <svg class="icon color_deep iconmargin" aria-hidden="true">
                                 <use xlink:href="#icon-yueduliang" ></use>
                                </svg>
                               <span class="iconcolor"> 阅读量{{ readnum }} |</span></span>
              <span class="flex6 iconsize ">
                            <svg class="icon color_deep iconmargin" aria-hidden="true">
                                 <use xlink:href="#icon-pinglun" ></use>
                                </svg>
                            <span class="iconcolor">评论量{{ tipnum }} |</span></span>
              <span class="flex6 iconsize ">
                             <svg class="icon color_deep iconmargin" aria-hidden="true">
                                 <use xlink:href="#icon-buoumaotubiao15" ></use>
                              </svg>
                           <span class="iconcolor"> 点赞量{{ likenum }} </span></span>
              <el-button type="text" @click="checkstar(1)" v-show="star==0&&own!=userid" >
                  <span class="flex6">
                <svg class="icon color_deep iconmargin" aria-hidden="true" style="font-size:20px">
                  <use xlink:href="#icon-shoucang"></use>
                </svg>
                <span style="color:gray;margin-left:10px">已收藏</span>
                  </span>
              </el-button>
              <el-button  type="text" @click="checkstar(0)" v-show="star==1&&own!=userid">
                         <span class="flex6">
                          <svg class="icon color_middle iconmargin" aria-hidden="true" style="font-size:20px">
                                 <use xlink:href="#icon-shoucang"></use>
                                </svg>
                          <span style="color:gray;margin-left:10px">  收藏</span>
                         </span>
              </el-button>
              <el-button  type="text" @click="checklike(0)" v-show="like==1&&own!=userid">
                         <span class="flex6">
                          <svg class="icon color_deep iconmargin" aria-hidden="true" style="font-size:20px">
                                 <use xlink:href="#icon-buoumaotubiao15"></use>
                                </svg>
                          <span style="color:gray;margin-left:10px">  点赞</span>
                         </span>
              </el-button>
              <el-button type="text" @click="checklike(1)" v-show="like==0&&own!=userid">
                         <span class="flex6">
                          <svg class="icon color_deep iconmargin" aria-hidden="true" style="font-size:20px">
                                 <use xlink:href="#icon-xihuan"></use>
                                </svg>
                          <span style="color:gray;margin-left:10px">  已点赞</span>
                         </span>
              </el-button>
              <el-button v-show="own!=userid" type="text" @click="dialogVisible = true" >
                         <span class="flex6">
                          <svg class="icon color_deep iconmargin" aria-hidden="true" style="font-size:20px">
                                 <use xlink:href="#icon-report"></use>
                                </svg>
                          <span style="color:gray;margin-left:10px">  举报</span>
                         </span>
              </el-button>
              <el-button type="primary" v-show="own==userid" @click="dele()">删帖</el-button>
            </div>
        
            <p v-html="htmlcontent"></p>
          </div>
          <div style="background:white;padding:20px;margin-top:10px">
            <div class="flex6">
              <el-input type="textarea" style="width:90%" autosize placeholder="请输入内容" v-model="textarea1"></el-input>
              <el-button type="text" style="height:100%;margin-left:10px" @click="sendtip(textarea1)" >
                <svg class="icon color_deep iconmargin" aria-hidden="true" style="font-size:20px">
                  <use xlink:href="#icon-fasong" ></use>
                </svg>
              </el-button>
            </div>
            <div style="margin-top:20px">
              <div v-show="tiplist.length==0&&get" style="color:gray" class="flex6">
                目前还没有看官发表任何观点
                <svg class="icon" aria-hidden="true" style="font-size:30px;color:#ce3524;margin-left:10px"> 
  <use xlink:href="#icon-kelian"></use>
</svg>
                 ，真的不准备来说点什么嘛
              </div>
              <ul v-for="(item,index) in tiplist" :key="index" >
                <li style="margin-top:5px;margin-left:10px;margin-bottom:0px">
                  <div style="margin-bottom:40px">
                  <div style="margin-bottom:0px">
                    <div>
                      <div class="flex7" >
                      <el-image style="width:40px;height:40px;border-radius:40px" :src="item.img" fit="cover"></el-image>
                      <el-link class="blog-title" :underline="false" :href="'/userinfo/'+item.user_id" style="margin-left:10px;align-items:top !important">{{ item.name }} :</el-link>
                   
                    </div> 
                    <el-button type="text" style="float:right;margin-top:-40px" @click="tipid=item.comment_id;dialogVisible2 = true">
                      <svg class="icon color_deep iconmargin" aria-hidden="true" style="font-size:20px">
                        <use xlink:href="#icon-report" ></use>
                      </svg>
                    </el-button>
                    </div>
                    <p style=";margin-left:15px;margin-top:10px">{{ item.textcontent }}</p>
                  
                  </div>
                   
                  </div>
                    <div >
<el-divider></el-divider>
                    </div>
                 
                </li>
              </ul>
            </div>
          </div>

          <div style=";margin-top:10px">
            <el-card shadow="never">
              <ul v-for="(item,index) in hotbloglist" :key="index">
                <li style="margin-top:5px;margin-left:10px">

                  <div>
                    <div class="flex6">
                      <el-link class="blog-title" :underline="false"  :href="'/BlogItem/'+item.userid+'/'+item.blogid" style="width:70%;justify-content:left">
                        <h2 style="font-size:20px;justify-content:left">{{ item.blogname}}</h2>
                      </el-link>
                      <div class="flex6">
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
                    </div>

                    <div class="flex6">
                      <p style="width:50%;padding-left:15px;white-space:nowrap;font-size:14px;color:gray;overflow: hidden; text-overflow: ellipsis;">{{ item.textcontent }}</p>

                    </div>
                  </div>
                  <el-divider></el-divider>

                </li>
              </ul>
            </el-card>

          </div>
        </el-col>
      </el-row>
    </div>
  </div>

</template>


<script>
  import NewNavigation from "../navigatorandsearch/NewNavigation";
export default {
  name: "BlogItem",
  components: {
    NewNavigation,
  },
  data(){
      return{
        get:false,
        owner:"",
        sixin:"",
          dialogVisible: false,
          dialogVisible2:false,
          dialogVisible3:false,
          jubao:"", 
          jubaotip:"",
          textarea1:"",
          tipid:23,
          follow:1,
        userimg:"",
        username:"",
        userlist:[],
        userid:0,
        userhotlist:[ ],
        blogid:2,
        type:1,
        blogname:"",
        htmlcontent:"",
        readnum:23,
        tipnum:23,
        likenum:123,
        like:0,
        tiplist:[],
        hotbloglist:[],
        chose:[{name:"全部",type:0},{name:"Python",type:1},{name:"Java",type:2},
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
          {name:"其他",type:32},],
        star:1
      }
  }, mounted(){
     	 
        var that = this;
        this.userid=this.$route.params.userid;
           
        this.blogid=this.$route.params.blogid;  
        this.$axios.post('/apis/user/getstatus', {
          }).then(res => {
         //       console.log(res);
			 this.own=res.data.userid
  //  alert(this.own==this.userid)
	  })
         //获取博客信息
     this.$axios.post('/apis/blog/getbloginfo',
              {
                id:this.blogid
              },
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
            //    console.log(res);
                this.blogname=res.data.data.title;
                this.htmlcontent=res.data.data.htmlcontent;
                this.readnum=res.data.data.readnum;
                this.tipnum=res.data.data.tipnum;
                this.likenum=res.data.data.likenum;
                this.like=res.data.data.is_like;
                this.tiplist=res.data.data.tiplist;
                this.get=true;
                this.type=res.data.data.type,
              //  alert(this)
                this.star=res.data.data.is_collect
                 //获取相关帖子信息
     this.$axios.post('/apis/blog/gethotblogs',
              {
                type:this.type
              },
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
           
            //    console.log(res);
          //     alert(res.data.data.list.length)
             //   alert(res.data.data.list)
                if(res.data.data.list.length>4)
                this.hotbloglist=res.data.data.list.splice(0,5)
                else
                this.hotbloglist=res.data.data.list

            })
            })

    //获取博客主信息
     this.$axios.post('/apis/blog/getuserbloginfo',
              {
                id:this.userid
              },
              // {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
              )
              .then(res => {
       //         console.log(res);
       
                this.userimg=res.data.avatar;
                that.username=res.data.username;
                this.userlist=[{num:res.data.blogNum,tip:"贴子"},{num:res.data.likeNum,tip:"获赞"},{num:res.data.tipNum,tip:"评论"},]
      })
    //获取关注状态
     this.$axios.post('/apis/user/get_follow_state',
              {
                userid:this.userid
              },
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
        //        console.log(res);
                this.follow=res.data.is_follow
                })
       //获取博客主热门帖子信息
     this.$axios.post('/apis/blog/getuserhotblog',
              {
                id:this.userid
              },
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
      //          console.log(res);
                this.userhotlist=res.data.data.list
            })
    
           
  },
  methods:{
      checklike(type){
        //点赞 取消点赞
     this.$axios.post('/apis/blog/setbloglike',
              {
                id:this.blogid,
                type:type
              },
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res);
                if(res.data.status==0){
                    
                    if(type==1){
                      this.likenum=this.likenum-1
                      this.like=1
                    }
                    else {
                      this.likenum=this.likenum+1
                      this.like=0
                    }
                }else{
                     this.$message({
          message: '点赞或者取消点赞失败',
          type: 'warning'
        });
                }
            })  
      },
       checkstar(type){
        //收藏 取消收藏
     this.$axios.post('/apis/blog/setblogcollect',
              {
                id:this.blogid,
                type:type
              },
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
     //           console.log(res);
                if(res.data.status==0){
                    this.star=type
                }
                else{
                     this.$message({
          message: '收藏或者取消收藏失败',
          type: 'warning'
        });
                }
                }
            )  
      },
      ju(text){
          //举报
     this.$axios.post('/apis/report/reportblog',
              {
                id:this.blogid,
                text:text
              },
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
      //          console.log(res);
                if(res.data.data.status==0){
            this.$message({
          message: '举报成功',
          type: 'success'
        });
                }
                else{
            this.$message({
          message: '举报失败',
          type: 'warning'
        });
                }
            })  
          this.dialogVisible = false;
          this.jubao="";
      },
      jutip(text){
           //举报评论
     this.$axios.post('/apis/report/reportcomment',
              {
                id:this.tipid,
                text:text
              },
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
     //           console.log(res);
                if(res.data.data.status==0){
              this.$message({
          message: '举报成功',
          type: 'success'
        });
                }  else{
              this.$message({
          message: '举报失败',
          type: 'warning'
        });
                }
              
                })
                
           
          this.dialogVisible2 = false;
          this.jubaotip="";
      },
      sendsixin(text){
 this.$axios.post('/apis/message/sendimessage',
              {
                id:this.userid,
                message:text
              },
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
        //        console.log(res);
                if(res.data.data.status==0){
                     this.$message({
          message: '发送私信成功',
          type: 'success'
        });
    
                }
                else{
                    this.$message({
          message: '发送私信失败',
          type: 'warning'
        });
                }
            })  
          this.sixin="";
          this.dialogVisible3 = false;
      },
      sendtip(text){
            //评论
     this.$axios.post('/apis/comment/create',
              {
                id:this.blogid,
                text:text
              },
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
      //          console.log(res);
                if(res.data.data.status==0){
              this.$message({
          message: '评论成功',
          type: 'success'
        });
                    var tip={comment_id:res.data.data.id,user_id:res.data.data.userid,name:res.data.data.name,img:res.data.data.avatar,textcontent:text};
                    this.tiplist.splice(0,0,tip);
                    this.tipnum++;
                }
                else{
            this.$message({
          message: '评论失败',
          type: 'warning'
        });
                }
            })  
          this.textarea1="";
      },
      changeFollow(type){
           //切换关注状态
     this.$axios.post('/apis/user/change_follow_state',
              {
                userid:this.userid
              },
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
   //             console.log(res);
               if(res.data.status==0){
                 this.follow=type
               }
            })  
      },
      dele(){
           //删帖
     this.$axios.post('/apis/blog/deleteblog',
              {
                blogid:this.blogid,
              },
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
                console.log(res);
                if(res.data.status==0){
              this.$message({
          message: '删帖成功',
          type: 'success'
        });
          this.$router.push({path:"/BlogDashboard/BlogDesktop"})
                }  else{
              this.$message({
          message: '删帖失败',
          type: 'warning'
        });
                }
              
                })
      }
  }
}
</script>
<style scoped>
.el-link {
    display: inline-flex;
    flex-direction: row;
    align-items: top ;
    justify-content: center;
    vertical-align: middle;
    position: relative;
    text-decoration: none;
    outline: 0;
    padding: 0;
}
  body{
          background-image: url('../../assets/image/user/image/login-back.png');
    }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
