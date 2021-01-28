<template>
  <div>
<!--    <div>-->
<!--      <new-navigation></new-navigation>-->
<!--    </div>-->
    <div class="collected">
      <el-card class="collectedList">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="学术成果" name="paper">
            <div v-show="!paperValid">您还没有收藏学术成果……</div>
            <div v-show="paperValid" class="collected-main" v-for="item in p_collected" :key="item.paper_id">
              <div class="collected-block">
                <el-row>
                  <el-col :span="21">
                    <div class="following-content">
                      <el-link class="blog-title" :underline="false" @click="jump_to_paper(item.paper_id)"><h2>{{item.title}}</h2></el-link>
                      <p class="limit-text-length blog-info-p">
                        <el-link v-if="item.author1" :underline="false" @click="toAuthor(item.author1.id)">{{item.author1.name}}</el-link>
                        <span v-if="item.author2">,</span> 
                        <el-link v-if="item.author2" :underline="false" @click="toAuthor(item.author2.id)">{{item.author2.name}}</el-link>
                        <span v-if="item.authorCount == 3">, ...</span> | {{item.source}}
                      </p>
                    </div>
                  </el-col>
                  <el-col :span="3" style="padding-top:20px">
                    <el-button v-show="item.collected" @click="unfavPaper(item.paper_id)">取消收藏</el-button>
                    <el-button v-show="!item.collected" type="primary" @click="favPaper(item.paper_id)">收藏</el-button>
                  </el-col>
                </el-row>
              </div>
              <el-divider style="margin:10px 0px;"></el-divider>
            </div>
          </el-tab-pane>
          <el-tab-pane label="博客帖文" name="blog">
            <div v-show="!blogValid">您还没有收藏帖子……</div>
            <div v-show="blogValid" class="collected-main" v-for="item in b_collected" :key="item.blogid">
              <div class="collected-block">
                <el-row>
                  <el-col :span="21">
                    <div class="following-content">
                      <el-link class="blog-title" :underline="false" :href="'/BlogItem/'+item.authorid+'/'+item.blogid"><h2>{{item.title}}</h2></el-link>
                      <el-row>
                        <el-col :span="1">
                          <img :src="item.avatar" class="inline-avatar">
                        </el-col>
                        <el-row :span="23">
                           <div class="bloginfo-block limit-text-length blog-info-p"><el-link :underline="false" :href="'/userinfo/'+item.authorid">{{item.author}}</el-link> | {{item.content}}</div>
                        </el-row>
                      </el-row>
                    </div>
                  </el-col>
                  <el-col :span="3" style="padding-top:20px">
                    <el-button v-if="item.collectStatus == true" @click="unfavBlog(item.blogid)">取消收藏</el-button>
                    <el-button v-else type="primary" @click="favBlog(item.blogid)">收藏</el-button>
                  </el-col>
                </el-row>
              </div>
              <el-divider style="margin:10px 0px;"></el-divider>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>

</template>

<script>
import NewNavigation from "../navigatorandsearch/NewNavigation";

export default {
  name: 'Collected',
  components: {
    NewNavigation,
  },
  data() {
    return {
      blogValid:false,
      user_id:0,
      paperValid:false,
      activeName: 'paper',
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      p_idList:[],
      p_collected:[
        // {
        //   paper_id:2,
        //   title:"Paper2",
        //   team:[
        //     {id:1, name:"Zhang Manwei"},
        //     {id:2, name:"Another team"},
        //   ],
        //   source:"Journal2",
        // }
      ],
      b_collected:[
        // {
        //   blogid:1,
        //   title:"Blog1 : Today's weather : snow storm",
        //   team:"Zhang Manwei",
        //   authorid:1,
        //   avatar:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        //   content:"This is a very rough blog.",
        //   created:'',
        //   bio:'',
        // },
      ],
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    toAuthor(authorid) {
      this.$router.push({
        path:'/team',
        query:{
          author_id:authorid,
        }
      })
    },
    jump_to_paper(paper_id){
      this.$router.push({
        path: '/course',
        query: {
          paper_id: this.$Base64.encode(JSON.stringify(paper_id)),
        }
      })
    },
    getCollectedBlog(userID) {
      var that = this
      this.$axios.post('/apis/blog/collectbloglist', {
        userid:userID
      }).then(res => {
        console.log(res)
        // console.log(res.data.status)
        if(res.data.status !== 0 ){
          console.log("请求收藏帖子列表失败");
          return
        }
        var i;
        var result = res.data.data.list;
        var blogList = new Array()
        var avatarItem="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
        var read=0, like=0, tip=0;
        for(i=0;i<result.length;i++){
          this.blogValid=true
          var blogItem = new Object()
          //   blogid:2,
          //   title:"Blog2",
          //   team:"Another team",
          //   authorid:2,
          //   avatar:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          //   content:"This is an another very rough blog.",
          //   created:'',

          // team: "aaa"
          // authorid: ""
          // bio: ""
          // blogid: 12
          // content: "英国bla"
          // created: "2020-12-21T16:25:29.186"
          // title: "多国确认出现变异新冠病毒确诊病例"
          blogItem.blogid = result[i].blogid
          blogItem.title = result[i].title
          blogItem.author = result[i].author
          blogItem.authorid = result[i].userid
          blogItem.content = result[i].content
          blogItem.created = result[i].created
          blogItem.avatar = avatarItem
          blogItem.collectStatus = true
          this.$axios.post('/apis/personality/get_other',{
            userid : result[i].userid
          }).then(res => {
            // c
            if(res.data.avatar!="")
              blogItem.avatar = res.data.avatar
          })
          blogList[i]=blogItem
        }
        that.b_collected = blogList
        // console.log("that.b_collected")
        // console.log(that.b_collected)
      });
    },
    getPaperInfo(){
      var i=0
      this.p_idList.forEach(item => {
        var paperItem = new Object()

        this.$axios.post('/apis/search/getpaperbyid',{
          paperid:item
        }).then(res => {
          console.log(res)
          // var authorList = new Array()
          var authorRes = res.data.authors

          paperItem.title = res.data.title
          paperItem.source = res.data.venue.raw
          paperItem.paper_id = item
          paperItem.collected = true
          paperItem.authorCount = 0
          if(authorRes.length < 1){
          }else{
            paperItem.authorCount += 1
            paperItem.author1 = new Object()
            paperItem.author1.id = authorRes[0].id
            paperItem.author1.name = authorRes[0].name
            if(authorRes.length == 1){
            }else{
              paperItem.authorCount += 1
              paperItem.author2 = new Object()
              paperItem.author2.id = authorRes[1].id
              paperItem.author2.name = authorRes[1].name
              if(authorRes.length == 2){
              }else{
                paperItem.authorCount += 1
              }
            } 
          } 
        })
        this.$set(this.p_collected,i,paperItem)
        i+=1
      })
      console.log(this.p_collected)
    },
    getCollectedPaper(userID) {
      var that = this
      this.$axios.post('/apis/user/get_star_paper_by_userid',{
        userid:userID
      }).then(paperIdRes => {
        // console.log(paperIdRes)
        this.p_idList = paperIdRes.data.paper_id_list
        console.log(this.p_idList)
        this.getPaperInfo()
        var result = paperIdRes.data.paper_id_list
        var paperList = new Array()
        for(var i=0,len=result.length; i<len; i++){
          var paperItem = new Object()
          that.paperValid=true

          var p_id = result[i]
          paperItem.paper_id = p_id
          paperItem.collected = true
          // this.$axios.post('/apis/search/getpaperbyid',{
          //   paperid:p_id
          // }).then(res => {
          //   // console.log(res)
          //   // var authorList = new Array()
          //   var authorRes = res.data.authors

          //   paperItem.title = res.data.title
          //   paperItem.source = res.data.venue.raw
          //   paperItem.authorCount = 0
          //   if(authorRes.length < 1){
          //   }else{
          //     paperItem.authorCount += 1
          //     paperItem.author1 = new Object()
          //     paperItem.author1.id = authorRes[0].id
          //     paperItem.author1.name = authorRes[0].name
          //     if(authorRes.length == 1){
          //     }else{
          //       paperItem.authorCount += 1
          //       paperItem.author2 = new Object()
          //       paperItem.author2.id = authorRes[1].id
          //       paperItem.author2.name = authorRes[1].name
          //       if(authorRes.length == 2){
          //       }else{
          //         paperItem.authorCount += 1
          //       }
          //     } 
          //   } 
          // })
          paperList[i]=paperItem
          // this.$set(that.p_collected,i,paperItem)
          // paper_id:2,
          //   title:"Paper2",
          //   team:[
          //     {id:1, name:"Zhang Manwei"},
          //     {id:2, name:"Another team"},
          //   ],
          //   source:"Journal2",
        }
        // that.p_collected = paperList
        console.log(that.p_collected)
        // that.p_collected.forEach(item => {
        //   this.$set(item,'collectedStatus',true)
        //   return
        // })
      })
    },
    init() {
      var that = this
      this.$axios.post('/apis/user/getstatus').then(res => {
        // console.log(res)
        if(res.data.status !=0 ){
          console.log('登录状态请求失败')
          return
        }
        this.user_id = res.data.userid
        this.getCollectedPaper(res.data.userid)
        this.getCollectedBlog(res.data.userid)
        

        // TODO: 查询所有收藏学术成果
        
      });
      
    },
    switchPaperFav (id) {
      this.$axios.post('/apis/user/star_paper',{
        userid: this.user_id,
        paperid:id
      }).then(res => {
        // console.log(res)
        if(res.data.status !=0 ){
          console.log('收藏状态切换失败')
          return
        }
      });
    },
    unfavPaper(id) {
      this.p_collected.forEach(item =>{
        if(item.paper_id == id)
          this.$set(item, 'collected', false)
      })
      this.switchPaperFav(id)
    },
    favPaper(id) {
      this.p_collected.forEach(item =>{
        if(item.paper_id == id)
          this.$set(item, 'collected', true)
      })
      this.switchPaperFav(id)
    },
    
    unfavBlog(blogid) {
      this.b_collected.forEach(item =>{
        if(item.blogid == blogid)
          this.$set(item, 'collectStatus', false)
          console.log(item)
      })
      this.$axios.post('/apis/blog/setblogcollect',{
        id: blogid,
        type: 1
      }).then(res => {
        // console.log(res)
        if(res.data.status !=0 ){
          console.log('收藏状态切换失败')
          return
        }
      });
    },
    favBlog(blogid) {
      this.b_collected.forEach(item =>{
        if(item.blogid == blogid)
          this.$set(item, 'collectStatus', true)
      })
      this.$axios.post('/apis/blog/setblogcollect',{
        id: blogid,
        type: 0
      }).then(res => {
        // console.log(res)
        if(res.data.status !=0 ){
          console.log('收藏状态切换失败')
          return
        }
      });
    },
  }
}
</script>

<style>
.following-content{
  text-align: left;
  padding-left:10px;
}
.el-divider{
 margin:10px 0px;
}
h2{
  margin-top:10px;
  margin-bottom: 8px;
}
p {
  display: block;
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-inline-start: 0em;
  margin-inline-end: 0em;
}
.collectedList{
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 50px;
}
.collected{
    margin-right: 3%;
}
.el-form{
    margin-right: 100px;
}
.personPage{
    margin-top: 30px;
}
.bloginfo-block{
    padding-top:6px;
}
.inline-avatar{
    margin-right:10px;
    height:30px;
    width:30px;
    border-radius:50%
}
.blog-info-p{
  font-size: 0.9em;
}
.limit-text-length{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>