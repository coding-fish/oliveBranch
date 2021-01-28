<template>
	<div>
    <new-navigation></new-navigation>
		<el-container>
			<el-main style="padding-left: 130px; padding-right: 130px;">
				<el-row :gutter="20" style="padding-top: 1rem">
					<el-col :span="10">
						<div class="grid-content" style="height: 300px">
							<img src="../../assets/image/paper/flower2.jpg" style="width: 100%; height: 100%">
						</div>
					</el-col>
					<el-col :span="14" style=" height: 300px; padding-bottom: 5rem">
            <div style="margin-left: 15px; margin-top: 0px; font-size: 24px">
              数学分析
            </div>
            <div style="background-color: #d4d4d4; height: 110px; margin: 20px">
              <div style="text-color: #000000; padding: 15px; font-size: small">
                <div style="font-size: medium">第一次开课<br><br></div>
                <strong>开课时间：</strong>待定<br>
                <strong>课堂链接：</strong>待定
              </div>
            </div>
            <div style="padding: 20px">
              已有{{count}}人参加<br>

                <button style="height: 52px; width: 220px; color: white;
                background-color: #3a8ee6; border-radius: 0px;
                border-color: #3a8ee6; text-align: center" @click="join_course(id)">
                  <div style="font-size: 18px">加入课程</div>
                </button>

            </div>
<!--            <div style="margin: 0 1rem">-->
<!--								&lt;!&ndash;						关键词&ndash;&gt;-->
<!--								<el-col :span="24" style="text-align: left; font-size: 1rem; margin-top: 3rem">-->
<!--									<strong>关键词：</strong>-->
<!--									<span v-if="typeof(paper.keywords)!=='undefined'&&paper.keywords.length!==0">-->
<!--										<span v-for="(item, index) in paper.keywords" :key="index">-->
<!--										{{item}};</span>-->
<!--									</span>-->
<!--									<span v-else>未知</span>-->
<!--								</el-col>-->
<!--							</div>-->
					</el-col>
				</el-row>
        <el-row :gutter="20" style="height: 10px;">
        </el-row>
        <el-row :gutter="20" style="min-height: 300px;">
          <el-col :span="16" style="background-color: white; height: 300px">
            <div style="padding: 10px">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="课程详情" name="first">
                  课程详情
                </el-tab-pane>
                <el-tab-pane label="课程评价" name="second">
                  课程评价
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
          <el-col :span="8" style=" min-height: 100px;">
            <el-row :gutter="20">
              <el-col :span="8" >
                <div style="padding: 5px">
                  <img src="../../assets/image/paper/flower-left.jpg"
                       style="width: 100px; height: 100px;">
                </div>
              </el-col>
              <el-col :span="16">
                <div style="text-align: center; padding-top: 30px; min-height: 120px;
                font-size: 25px; background-color: white">蓝天支教团</div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
			</el-main>
		</el-container>
    <new-bottom></new-bottom>
	</div>
</template>

<script>
	import NewNavigation from "../navigatorandsearch/NewNavigation";
	import NewBottom from "@/views/navigatorandsearch/NewBottom";

	export default {
		name: "Course",
		components: {
			NewNavigation,
      NewBottom
		},
		data() {
			return {
				paper: {
					paper_id: 0,
					title: '',
					keywords: [],
					abstract: '',
					is_star: 0,
					url: [],
				},
				user_id: -1,
        count: 233,
        activeName: 'first'
			}
		},
		mounted() {
			this.get_paper_id();
			this.init();
		},
		methods: {
			init() {
				this.$axios.post('/apis/user/getstatus')
						.then(res => {
							this.user_id = res.data.userid
							this.$axios.post('/apis/search/getpaperbyid',
									{
										paperid: this.paper.paper_id
									})
									.then(res => {
										if(res.status === 200) {
											this.paper.title = res.data.title
											this.paper.authors = res.data.authors
											this.paper.venue_raw = res.data.venue.raw
											this.paper.year = res.data.year
											this.paper.keywords = res.data.keywords
											this.paper.n_citation = res.data.n_citation
											this.paper.page_start = res.data.page_start
											this.paper.page_end = res.data.page_end
											this.paper.volumn = res.data.volume
											this.paper.issue = res.data.issue
											this.paper.isbn = res.data.isbn
											this.paper.doi = res.data.doi
											this.paper.abstract = res.data.abstract
											this.paper.url = res.data.url
											this.get_star_status()
										}
										else {
											alert('抱歉，您所点击的论文还未收录')
											this.$router.go(-1)
										}
									})
						})
			},
			get_paper_id() {
				this.paper.paper_id = this.$route.query.paper_id
			},
			jumpToPortal(author_id) {
				this.$router.push({
					path: '/team',
					query: {
						author_id: author_id,
					}
				})
			},
			get_star_status() {
				this.$axios.post('/apis/user/get_star_status',
						{
							userid: this.user_id,
							paperid: this.paper.paper_id
						}).then(res => {
							this.paper.is_star = res.data.is_star
				})
			},
      handleClick(tab, event) {
        console.log(tab, event);
      }
		},
	}
</script>

<style>
	body{
		background-image: url('../../assets/image/user/image/login-back.png');
		background-attachment: fixed;
	}
</style>

<style scoped>
	.el-row {
		margin-bottom: 20px;
	&:last-child {
		 margin-bottom: 0;
	 }
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}
	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
</style>