<template>
  <div>
    <new-navigation></new-navigation>
    <div>
      <el-row style="margin:10px 20px;">
        <el-col :span="4">
          <div>
            <el-card v-if="this.userId" shadow="never">
              <div class="flex6">
                <el-image style="width:40px;height:40px;border-radius:40px" :src="picture" fit="cover"></el-image>
                <p style="margin-left:10px">{{ personName }}</p>
              </div>
              <div class="flex6" style="margin-top:15px">
                <div v-for="(item,index) in list" :key="index" style="margin-right:13px">
                  <p style="font-size:14px;text-align:center">{{ item.num }}</p>
                  <p style="font-size:12px;color:grey;text-align:center">{{ item.tip }}</p>
                </div>
              </div>
            </el-card>
            <el-card v-if="!userId">
              <div style="color: black">
                登录后可使用更多功能
              </div>
            </el-card>

            <div class="menu menu--salal">
              <router-link to="/BlogDesktop" class="menu__item" active-class="">
                <span class="menu__item-name">帖子广场</span>
              </router-link>
              <router-link to="/BlogMyBlog" class="menu__item" active-class="">
                <span class="menu__item-name">我的帖子</span>
              </router-link>
              <router-link to="/BlogMyTips" class="menu__item" active-class="">
                <span class="menu__item-name">我的评论</span>
              </router-link>
              <a class="menu__item" active-class="">
                <span class="menu__item-name" @click="createblog()">发布帖子</span>
              </a>
            </div>
          </div>
        </el-col>
        <el-col :span="14">
          <ul>
            <li style="margin-left:10px">
              <el-card shadow="never" v-show="get">
                <div v-show="get&&list.length===0" style="color:gray">
                  <span>当前类别暂无帖子QAQ</span>
                </div>
                <div v-for="(item,index) in list" :key="index" v-show="list.length>0">
                  <div class="flex6" style="margin-left:0">
                    <el-link class="blog-title" :underline="false" :href="'/BlogItem/'+item.userid+'/'+item.blogid"
                             style="width:70%;justify-content: left">
                      <h2 style="font-size:20px;margin-left:0;font-size:20px">{{ item.blogname }}</h2>
                    </el-link>
                  </div>
                  <div style="justify-content: left">
                    <p style="margin-top:7px; text-align:left; justify-content: left;
                    width:80%; padding-left:15px; white-space:nowrap; font-size:14px;
                    color:gray; overflow: hidden; text-overflow: ellipsis;">
                      {{ item.textcontent }}</p>
                  </div>
                  <el-row :gutter="20" style="margin-top:15px">
                    <el-col :span="14">
                      <!--                      <el-link class="blog-title" :underline="false" :href="'/userinfo/'+item.userid">-->
                      <div class="flex6">
                        <el-image style="width:30px;height:30px;border-radius:30px"
                                  :src="item.avatar" fit="cover"></el-image>
                        <el-link class="blog-title" :underline="false" style="padding-left:15px">
                          {{ item.username }}
                        </el-link>
                      </div>
                      <!--                      </el-link>-->
                    </el-col>

                    <el-col :span="10" class="flex6">
                      <span class="flex6 iconsize">
                        <svg class="icon color_deep iconmargin" aria-hidden="true">
                          <use xlink:href="#icon-yueduliang"></use>
                        </svg>
                        <span class="iconcolor"> 阅读量{{ item.readnum }} |</span>
                      </span>

                      <span class="flex6 iconsize ">
                        <svg class="icon color_deep iconmargin" aria-hidden="true">
                          <use xlink:href="#icon-pinglun"></use>
                        </svg>
                        <span class="iconcolor"> 评论量{{ item.tipnum }} |</span>
                      </span>

                      <span class="flex6 iconsize ">
                        <svg class="icon color_deep iconmargin" aria-hidden="true">
                          <use xlink:href="#icon-buoumaotubiao15"></use>
                        </svg>
                        <span class="iconcolor"> 点赞量{{ item.likenum }} </span>
                      </span>
                    </el-col>
                  </el-row>
                  <el-divider class="inline-divider" style="margin-top:20px;margin-bottom:20px"></el-divider>
                </div>
              </el-card>
            </li>
          </ul>
        </el-col>
        <el-col :span="6">
          <div class="cards" style="margin-top:40px">
            <div class="card card__one flex6" v-for="(item,index) in types" :key="index"
                 style="width:100px;margin-right:0px">
              <div class="card-text">
                <el-button :type="item.type === type ? 'danger' : 'default'">
                  <span style="padding-top:-10px;font-size:13px" @click="changeType(item)"> {{ item.name }}</span>
                </el-button>
              </div>

            </div>

          </div>
        </el-col>
      </el-row>
    </div>
    <new-bottom></new-bottom>
  </div>

</template>


<script>
import NewNavigation from "../../navigatorandsearch/NewNavigation";
import NewBottom from "@/views/navigatorandsearch/NewBottom";
// @ is an alias to /src
export default {
  name: "BlogDesktop",
  components: {
    NewBottom,
    NewNavigation,
  },
  data() {
    return {
      list: [],
      types: [{name: "全部", type: 0}, {name: "Python", type: 1}, {name: "Java", type: 2},
        {name: "前端", type: 3}, {name: "架构", type: 4}, {name: "区块链", type: 5},
        {name: "数据库", type: 6}, {name: "5G", type: 7}, {name: "游戏开发", type: 8},
        {name: "移动开发", type: 9}, {name: "运维", type: 10}, {name: "安全", type: 11},
        {name: "研发管理", type: 12}, {name: "物联网", type: 13},
        {name: "生物", type: 14}, {name: "物理", type: 15}, {name: "党政", type: 16},
        {name: "农林", type: 17}, {name: "建筑", type: 18}, {name: "制造", type: 19},
        {name: "教育", type: 20}, {name: "党政", type: 21}, {name: "能源", type: 22},
        {name: "卫生", type: 23}, {name: "航空", type: 24}, {name: "金融", type: 25},
        {name: "商贸", type: 26}, {name: "会计", type: 27}, {name: "国防", type: 28},
        {name: "体育", type: 29}, {name: "电子", type: 30}, {name: "创业", type: 31},
        {name: "其他", type: 32},],
      userId: 0,
      type: 0,
      get: false,
      picture: "",
      personName: "",
    }
  },
  mounted() {
    this.getUserData();
    this.getBlogs();
  },
  methods: {
    getUserData() {
      if (this.$store.state.keepLogIn === true) {
        this.keepLogin = true;
        if (this.$store.state.userId !== 0) {
          // 是普通用户
          this.userId = this.$store.state.userId;
          this.$axios.post('/apis/user/getuserinfo', {
            id: this.userId
          }).then(res => {
            if (res.data.error_code === 0) {
              this.personName = res.data.data.username;
              this.picture = res.data.data.avatar;
            }
          })
        } else {
          // 是团队
          this.userId = this.$store.state.teamId;
          this.$axios.post('/apis/team/getteamdetail', {
            id: this.userId
          }).then(res => {
            if (res.data.error_code === 0) {
              this.personName = res.data.data.name;
              this.picture = res.data.data.logo;
              this.admin = true;
            }
          })
        }
      }
      //获取用户的帖子论坛大致信息
      this.$axios.post('/apis/blog/getuserbloginfo', {
        id: this.userId
      })
          .then(res => {
            //    console.log(res);
            this.img = res.data.avatar;
            this.name = res.data.username;
            this.list = [{num: res.data.blogNum, tip: "贴子"}, {num: res.data.likeNum, tip: "获赞"}, {
              num: res.data.tipNum,
              tip: "评论"
            },]
          })
    },
    getBlogs() {
      //获取热门帖子信息
      this.$axios.post('/apis/blog/gethotblogs',
          {
            type: 0
          },
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .then(res => {
            this.get = true
            //     console.log(res)
            this.list = res.data.data.list
          })

      let cards = document.querySelector(".cards");
      let images = document.querySelectorAll(".card__img");
      let backgrounds = document.querySelectorAll(".card__bg");
      let range = 40;

      // const calcValue = (a, b) => (((a * 100) / b) * (range / 100) -(range / 2)).toFixed(1);
      let calcValue = function calcValue(a, b) {
        return (a / b * range - range / 2).toFixed(1);
      }; // thanks @alice-mx
      let timeout = void 0;
      document.addEventListener('mousemove', function (_ref) {
        let x = _ref.x, y = _ref.y;
        if (timeout) {
          window.cancelAnimationFrame(timeout);
        }
        timeout = window.requestAnimationFrame(function () {
          let yValue = calcValue(y, window.innerHeight);
          let xValue = calcValue(x, window.innerWidth);
          //   console.log(xValue, yValue);
          cards.style.transform = "rotateX(" + yValue + "deg) rotateY(" + xValue + "deg)";

          [].forEach.call(images, function (image) {
            image.style.transform = "translateX(" + -xValue + "px) translateY(" + yValue + "px)";
          });

          [].forEach.call(backgrounds, function (background) {
            background.style.backgroundPosition = xValue * .45 + "px " + -yValue * .45 + "px";
          });
        });
      }, false);
    },
    createblog() {
      // 先生成一个帖子id，然后跳转到编辑界面
      this.$axios.post('/apis/blog/createblog',
          {
            type: 1
          },
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .then(res => {
            if (res.data.error_code === 0)
              this.$router.push({
              path: "/BlogEdit",
              query: {blogid: res.data.blogid}
            })
            else
              this.$message.error('服务器错误')
          })
    },
    formatDate(date) {
      Date.prototype.format = function (fmt) {
        let o = {
          "M+": this.getMonth() + 1,                 //月份
          "d+": this.getDate(),                    //日
          "h+": this.getHours(),                   //小时
          "m+": this.getMinutes(),                 //分
          "s+": this.getSeconds(),                 //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          "S": this.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (let k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          }
        }
        return fmt;
      }
      //假设输入的时间格式为YYYY-MM-DDTHH-mm-SS.sss
      const s = String(date)
      s.replace(/(\+d{2})(\d{2})$/, "$1:$2")
      return new Date(s).format('yyyy-MM-dd hh:mm:ss')
    },
    changeType(item) {
      this.$axios.post('/apis/blog/gethotblogs',
          {
            type: item.type
          },
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .then(res => {
            // console.log(res)
            this.list = res.data.data.list
            this.type = item.type
          })
    },
    removeHtmlStyle(html) {
      let rel = /style\s*?=\s*?([‘"])[\s\S]*?\1/;
      let newHtml = "";
      if (html) {
        newHtml = html.replace(rel, "");
      }
      return newHtml;
    },
  }
}
</script>

<style>
body {
  background-color: rgba(240, 241, 244, 100);
  height: 100%;
  display: block;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

h1 {
  color: #0f72ca;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 30px;
  -webkit-transform: translateZ(35px);
  transform: translateZ(35px);
}

.cards {
  display: inline-block;
  padding: 30px 15px;
  margin: 0px 10px;
  -webkit-perspective: 1800px;
  perspective: 1800px;
  text-align: left;
  -webkit-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  /*-webkit-transform-style: preserve-3d;*/
  /*transform-style: preserve-3d;*/
  /*-webkit-transform: rotateX(11deg) rotateY(16.5deg);*/
  /*transform: rotateX(11deg) rotateY(16.5deg);*/
  min-width: 50px;
}

.card {

  display: inline-block;
  height: 50px;
  overflow: hidden;
  -webkit-perspective: 1200px;
  perspective: 1200px;
  position: relative;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transform: translatez(35px);
  transform: translatez(35px);
  transition: -webkit-transform 200ms ease-out;
  transition: transform 200ms ease-out, -webkit-transform 200ms ease-out;
  width: 100px;
  text-align: center;
}

.card:not(:last-child) {
  margin-right: 10px;
}


.card__bg {
  bottom: -50px;
  left: -50px;
  position: absolute;
  right: -50px;
  top: -50px;
  -webkit-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  -webkit-transform: translateZ(-50px);
  transform: translateZ(-50px);
  z-index: 0;
}

.card__text {
  align-items: center;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgb(20, 18, 18) 100%);
  bottom: 0;
  display: flex;
  flex-direction: column;
  height: 50px;
  justify-content: center;
  position: absolute;
  width: 100%;
  z-index: 2;
}

.card__title {
  color: #fff;
  font-size: 13px;
  padding: 0 6px;
  margin-bottom: 3px;
}


.twitter__link {
  cursor: pointer;
  position: absolute;
  right: -10px;
  top: 12px;
  z-index: -1;
  background: #00aced;
  border-radius: 20px;
  height: 30px;
  text-decoration: none;
  padding-right: 10px;
  justify-content: space-between;
  font-weight: 600;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 14px;
  width: 74px;
  opacity: 0.15;
}

.twitter__link:hover {
  opacity: 1;
}

.twitter__icon {
  height: 30px;
}

/deep/ .el-link:hover {
  color: #0f72ca;
}
</style>
