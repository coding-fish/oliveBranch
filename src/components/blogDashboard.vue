<template>
	<div>
		<div>
			<new-navigation :ac="a"></new-navigation>
		</div>
		<div class="router" style="left:30px">
			<blog-search></blog-search>
			<el-row style="margin-top:50px" :gutter="20">
				<el-col :span="4">
					<el-card shadow="never">
						<div class="flex6">
							<el-image style="width:40px;height:40px;border-radius:40px" :src="img" fit="cover"></el-image>
							<p style="margin-left:10px">{{name}}</p>
						</div>
						<div class="flex6" style="margin-top:15px">
							<div v-for="(item,index) in list" :key="index"  style="margin-right:13px">
								<p style="font-size:14px;text-align:center">{{ item.num }}</p>
								<p style="font-size:12px;color:grey;text-align:center">{{ item.tip }}</p>
							</div>
						</div>
					</el-card>
					<div>
					</div>
					<div >
						<main>
							<section >
								<div class="menu menu--salal">
									<router-link to="/BlogDashboard/BlogDesktop" class="menu__item" active-class="">
										<span class="menu__item-name" >帖子广场</span>
									</router-link>
									<router-link to="/BlogDashboard/BlogMyBlog" class="menu__item"  active-class="">
										<span class="menu__item-name" >我的帖子</span>
									</router-link>
									<router-link to="/BlogDashboard/BlogMyTips" class="menu__item"  active-class="">
										<span class="menu__item-name" >我的评论</span>
									</router-link>
									<a class="menu__item"  active-class="">
										<span class="menu__item-name"  @click="createblog()">发布帖子</span>
									</a>
								</div>
							</section>
						</main>
					</div>
				</el-col>
				<el-col :span="20">
					<router-view></router-view>
				</el-col>
			</el-row>
		</div>
	</div>

</template>


<script>
	import NewNavigation from "../views/navigatorandsearch/NewNavigation";
import blogSearch from '@/components/blogSearch'
export default {
  name: "BlogDashboard",
    components: {
      blogSearch,
			NewNavigation,
  },
  data(){
      return{
      	a:"3",
		  img:"",
        name:"",
        activeIndex: this.$route.path,
        list:[],
        id:0,
      }
  },
  mounted(){
	  	   this.$axios.post('/apis/user/getstatus', {
          }).then(res => {
         //       console.log(res);
			 this.id=res.data.userid
			
	  })
	   //获取用户的帖子论坛大致信息
	 this.$axios.post('/apis/blog/getuserbloginfo', {
            id:this.id
          })
              .then(res => {
            //    console.log(res);
                this.img=res.data.avatar;
                this.name=res.data.username;
                this.list=[{num:res.data.blogNum,tip:"贴子"},{num:res.data.likeNum,tip:"获赞"},{num:res.data.tipNum,tip:"评论"},]
			  })
	
		
  },
  methods:{
    handleSelect(key, keyPath) {
      console.log(this.$route.path)
      console.log(key, keyPath);
    },
    createblog(){
      //获取用户的帖子论坛大致信息
     this.$axios.post('/apis/blog/createblog',
              {
				  type:1
              },
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(res => {
        //        console.log(res);
                 this.$router.push({path:"/BlogEdit/"+this.id+"/"+res.data.blogid})
              })
    }
  }
}
</script>
<style>
    body{
          background-image: url('../assets/image/user/image/login-back.png');
    }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
