<template>
	<div>
		<div>
			<new-navigation :ac="a"></new-navigation>
		</div>
		<div>
			<el-container>
				<el-main>
					<el-row>
						<el-col :span="24">
							<el-col :span="4"><div class="grid-content"></div></el-col>
							<el-col :span="16">
								<div style="text-align: center; margin: 3rem 0">
									<strong style="font-size: 1.5rem">请选择您要认领的门户。</strong>
									<el-button 
													style="vertical-align: top;
													margin-left: 1rem;
													background-color: #df5747;
													color: white"
													@click="nameVisible = true">输入姓名，认领您的门户</el-button>
								</div>
								<el-card
												style="background-color: white; border-radius: 10px; margin-top: 1rem"
												 v-for="(item, index) in author_item" :key="index">
									<el-col :span="24">
										<el-col :span="12"><el-link style="font-size: 1.5rem;" :underline=false @click="jumpToPortal(item.id)">{{item.name}}</el-link></el-col>
										<el-col :span="2" :offset="4" style="right: 2rem;">
											<el-button style="vertical-align: middle; margin-left: 5rem; background-color:#fbede4;"
																 @click="submitClaim(user_id, item.id)">认领门户</el-button>
										</el-col>

									</el-col>
									<el-col :span="24" style="margin-top: 1rem">
										<span style="font-size: 1rem;">
											<i class="el-icon-office-building">   工作单位：</i>
											<span v-if="typeof(item.orgs)!=='undefined'&&item.orgs.length!==0">{{item.orgs[0]}}</span>
											<span v-else>未知</span>
										</span>
									</el-col>
									<el-col :span="24" style="margin-top: 1rem">
										<span style="font-size: 1rem">
											<i class="el-icon-s-grid"></i>   相关领域：</span>
										<span v-if="typeof(item.tags)!=='undefined'&&item.tags.length!==0">
											<span style="font-size: 1rem;"
														v-for="(item2, index2) in item.tags" :key="index2">{{item2.t}}；</span>
										</span>
										<span v-else>未知</span>
									</el-col>
									<el-col :span="24" style="margin-top: 1rem; margin-bottom: 1rem">
										<span style="font-size: 1rem;">
											<i class="el-icon-s-opportunity">   发表论文数：</i>
											<span v-if="typeof(item.n_pubs)!=='undefined'&&item.n_pubs!==''">
												{{item.n_pubs}}</span>
											<span v-else>0</span>
										</span>
									</el-col>
								</el-card>
							</el-col>
							<el-col :span="4"><div class="grid-content"></div></el-col>
						</el-col>
					</el-row>
				</el-main>
				<el-footer>
					<el-col :span="4"><div class="grid-content"></div></el-col>
					<el-col :span="16">
						<div style="text-align: center;">
							<el-pagination
											background
											layout="prev, pager, next"
											:total="total"
											:page-size="10"
											:current-page="current_page"
											@current-change="handleCurrentChange">
							</el-pagination>
						</div>
					</el-col>
					<el-col :span="4"><div class="grid-content"></div></el-col>
				</el-footer>
			</el-container>
		</div>

<!--		姓名输入框-->
		<el-dialog
						title="请填写您的真实姓名，如输入中文无结果，请输入姓名的拼音，格式如“Sansi Zhang”"
						:visible.sync="nameVisible"
						center
						:append-to-body='true'
						:lock-scroll="false"
						width="50%"
						:before-close="nameClose">
			<el-input
							type="textarea"
							:rows="5"
							autosize
							placeholder="请输入内容"
							v-model="nameText">
			</el-input>
			<el-button class="medium" style="margin-left:40%;position:relative;margin-top:30px" plain
								 @click="submitName(nameText)">发送姓名
			</el-button>
		</el-dialog>
	</div>
</template>

<script>
	import NewNavigation from "../navigatorandsearch/NewNavigation";

	export default {
		name: "AuthorItem",
		data() {
			return {
				a:"2",
				author_item: [],
				user_id: -1,
				page_size: 10,
				page_num: 2,
				current_page: 1,
				nameVisible: false,
				nameText: '',
				total: 0,
			}
		},
		components: {
			NewNavigation,
		},
		mounted() {
			this.get_login_status();
		},
		methods: {
			//获取登录状态
			get_login_status() {
				this.$axios.post('/apis/user/getstatus')
						.then(res => {
							if(res.data.status === 1){
								alert('请先登录！')
								this.$router.push('/login')
							}
							else{
								this.user_id = res.data.userid
								this.is_associate_author()
							}
						})
			},
			//获取已经认领的门户
			is_associate_author() {
					this.$axios.post('/apis/personality/get')
							.then(res => {
								if(res.data.is_associated) {
									this.$router.push({
										path: '/team',
										query: {
											author_id: res.data.author_id
										},
									})
								}
								else{
									if(typeof(this.$route.query.nametext) !== 'undefined'
									&& this.$route.query.nametext !== ''){
										const loading = this.$loading({
											lock: true,
											text: 'Loading',
											spinner: 'el-icon-loading',
											background: 'rgba(0, 0, 0, 0.7)'
										})
										this.$axios.post('/apis/search/getassAuthor',
												{
													name: this.$route.query.nametext,
													pagenumber: 1,
												})
												.then(res => {
													this.nameText = this.$route.query.nametext
													this.total = res.data.total
													this.author_item = res.data.res
													this.nameVisible = false;
													loading.close()
												})
									}
								}
							})
			},
			//分页
			handleCurrentChange(val) {
				this.$axios.post('/apis/search/getassAuthor',
						{
							name: this.nameText,
							pagenumber: val
						})
						.then(res => {
							this.author_item = res.data.res
							if(res.status === 200){
								this.current_page = val
							}
						})
			},
			nameClose(done) {
				this.nameVisible = false;
			},
			submitName(text) {
				if(text === '')
					this.$alert('姓名不能为空', '系统提示', {
						confirmButtonText: '确定',
					})
				else{
					// this.$axios.post('/apis/search/getassAuthor',
					// 		{
					// 			name: text,
					// 			pagenumber: 1,
					// 		})
					// 		.then(res => {
					// 			this.total = res.data.total
					// 			this.author_item = res.data.res
					// 			this.nameVisible = false;
					// 		})
					this.nameVisible = false;
					this.$router.push({
						path: '/authoritem',
						query: {
							nametext: text
						}
					})
					this.$router.go(0)
				}
			},

			submitClaim(user_id, author_id) {
				this.$axios.post('/apis/search/associatetoAuthor',
						{
							userid: user_id,
							authorid: author_id
						}).then(res => {
					console.log(res)
					if(res.data.status === 0){
						this.$message({
							type: 'success',
							message: '认领成功',
						})
						this.$router.push({
							path: '/team',
							query: {
								author_id: author_id,
								pagenumber: 1,
							}
						})
					}
					else{
						this.$message({
							type: 'danger',
							message: '认领失败',
						})
					}
				})
			},
			jumpToPortal(author_id) {
				this.$router.push({
					path: '/team',
					query: {
						author_id: author_id,
					}
				})
			},
		}
	}
</script>

<style scoped>
	body{
		background-image: url('../../assets/image/user/image/login-back.png');
		background-attachment: fixed;
	}
	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}
</style>
<style>
    body {
        background-image: url('../../assets/image/user/image/login-back.png');
    }
</style>