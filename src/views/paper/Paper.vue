<template>
	<div>
		<div>
			<new-navigation></new-navigation>
		</div>
		<el-container>
			<el-main style="padding-left: 0; padding-right: 0">
				<el-col :span="24">
					<el-col :span="4">
						<div class="grid-content" style="height: 700px; margin-top: 0.5rem; margin-right: 0.5rem">
<!--							<img :src="imgUrl_footer" alt="" style="width: 100%; height: 100%">-->
						</div>
					</el-col>
					<el-col :span="16" style="background-color: #ffffff; padding-bottom: 5rem">
						<!--					标题-->
						<div>
							<el-col :span="24" style="text-align: center; background-color: #ffffff;">
								<div>
									<div style="text-align: right">
										<el-button
														type="primary"
														icon="el-icon-star-on"
														v-if="paper.is_star"
														circle
														@click="star(1)"></el-button>
										<el-button
														type="info"
														icon="el-icon-star-off"
														v-else
														circle
														@click="star(0)"></el-button>
									</div>
									<div><strong style="font-size: 1.5rem">{{paper.title}}</strong>
										<!--						作者，点击可跳转到该学者的门户页面--></div>
									<div style="margin-top: 1rem" >
									<span v-for="(item, index) in paper.authors" :key="index">
										<el-link style="font-size: 1.2rem" :underline=false @click="jumpToPortal(item.id)">{{item.name}}</el-link>
										<span style="font-size: 1.2rem"  v-if="index!==paper.authors.length-1">, </span>
									</span>
									</div>
									<!--						来源-->
									<div style="margin-top: 1rem">
										<span v-if="typeof(paper.venue_raw)!=='undefined'">{{paper.venue_raw}}, </span>
										<span v-if="typeof(paper.volumn)!=='undefined'">Volumn {{paper.volumn}}, </span>
										<span v-if="typeof(paper.issue)!=='undefined'">Issue {{paper.issue}}, </span>
										<span v-if="typeof(paper.year)!=='undefined'">{{paper.year}}, </span>
										<span v-if="typeof(paper.page_start)!=='undefined'&&typeof(paper.page_end)!=='undefined'">
										Pages {{paper.page_start}}-{{paper.page_end}}
									</span>
									</div>
								</div>
							</el-col>
							<div style="margin: 0 1rem">
								<!--						摘要-->
								<el-col :span="24" style="text-align: left;">
									<el-divider></el-divider>
									<strong style="font-size: 1rem">摘要：</strong>
									<p v-if="typeof(paper.abstract)!=='undefined'&&paper.abstract!==''"
										 style="margin: 0.5rem 0 0.5rem 1rem">{{paper.abstract}}</p>
									<span v-else style="margin: 0.5rem 0 0.5rem 1rem">未知</span>
								</el-col>
								<!--						关键词-->
								<el-col :span="24" style="text-align: left; font-size: 1rem; margin-top: 3rem">
									<strong>关键词：</strong>
									<span v-if="typeof(paper.keywords)!=='undefined'&&paper.keywords.length!==0">
										<span v-for="(item, index) in paper.keywords" :key="index">
										{{item}};</span>
									</span>
									<span v-else>未知</span>
								</el-col>
								<!--						被引量-->
								<el-col :span="24" style="text-align: left; margin-top: 3rem; font-size: 1rem">
									<strong>被引量：</strong>
									<span v-if="typeof(paper.n_citation)!=='undefined'&&paper.n_citation!==''">
										{{paper.n_citation}}
									</span>
									<span v-else>0</span>
								</el-col>
								<!--						isbn-->
								<el-col :span="24" style="text-align: left; margin-top: 1rem">
									<strong>ISBN：</strong>
									<span v-if="typeof(paper.isbn)!=='undefined'&&paper.isbn!==''" >
										{{paper.isbn}}</span>
									<span v-else>未知</span>
								</el-col>
								<!--							doi-->
								<el-col :span="24" style="text-align: left; margin-top: 1rem">
									<strong>doi：</strong>
									<span v-if="typeof(paper.doi)!=='undefined'&&paper.doi!==''">
										{{paper.doi}}</span>
									<span v-else>未知</span>
								</el-col>
<!--相关链接-->
								<el-col :span="24" style="text-align: left; margin-top: 1rem">
									<el-col :span="3">
										<strong>相关链接：</strong>
									</el-col>
									<el-col :span="21" v-if="typeof(paper.url)!=='undefined'&&paper.url.length!==0">
										<el-col :span="24" v-for="(item, index) in paper.url" :key="index">
											<el-link :href="item" :underline=false>{{item}}</el-link>
										</el-col>
									</el-col>
									<span v-else>未知</span>
								</el-col>
							</div>

						</div>
					</el-col>
					<el-col :span="4">
						<div class="grid-content" style="height: 700px; margin-top: 0.5rem; margin-left: 0.5rem">
<!--							<img :src="imgUrl_footer" alt="" style="width: 100%; height: 100%">-->
						</div>
					</el-col>
				</el-col>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import NewNavigation from "../navigatorandsearch/NewNavigation";

	export default {
		name: "Paper",
		components: {
			NewNavigation,
		},
		data() {
			return {
				paper: {
					paper_id: 0,
					title: '',
					authors: [
						// {
						// 	id: 1,
						// 	name: '111',
						// },
						// {
						// 	id: 2,
						// 	name: '222',
						// },
						// {
						// 	id: 3,
						// 	name: '333',
						// },
					],
					venue_raw: '',
					year: '',
					keywords: [],
					n_citation: '',
					page_start: '',
					page_end: '',
					volumn: '',
					issue: '',
					isbn: '',
					doi: '',
					abstract: '',
					is_star: 0,
					url: [],
				},
				user_id: -1,
				imgUrl_left: require('../../assets/image/paper/flower-left.jpg'),
				imgUrl_right: require('../../assets/image/paper/flower-right.jpg'),
				imgUrl_footer: require('../../assets/image/paper/flower2.jpg'),
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
			star(flag) {
				this.paper.is_star = 1 - this.paper.is_star;
				this.$axios.post('/apis/user/star_paper',
						{
							userid: this.user_id,
							paperid: this.paper.paper_id
						}
				).then(res => {
							if(res.data.status === 0){
								this.$message({
									type: "success",
									message: res.data.message
								})
							}
						})
			},
			jumpToPortal(author_id) {
				this.$router.push({
					path: '/author',
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
	.el-col {
		border-radius: 4px;
	}
	.bg-purple-dark {
		background: #99a9bf;
	}
	.bg-purple {
		background: #d3dce6;
	}
	.bg-purple-light {
		background: #e5e9f2;
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