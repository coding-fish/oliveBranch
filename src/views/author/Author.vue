<template>
	<div>
		<div>
			<new-navigation :ac="a"></new-navigation>
		</div>
		<el-container>
			<el-main style="padding-left: 0; padding-right: 0">
				<el-row>
					<!--				基本信息-->
					<el-col :span="4">
						<div class="grid-content" style="height: 700px; margin-top: 0.5rem; margin-right: 0.5rem">
<!--							<img :src="imgUrl_left" alt="" style="width: 100%; height: 100%">-->
						</div>
					</el-col>

					<el-col :span="16" >
						<div style="margin: 0 1rem;">
							<el-col :span="24">
								<!-- <div style="font-weight: 700;
								font-size: 1.5rem;
								text-align: center; margin: 1rem 0">基本信息</div> -->
								<div style="height: 25rem">
									<el-col :span="24">
										<el-col :span="24" style="margin-bottom: 1rem;">
											<el-card class="is-always-shadow is-hover-shadow" style="background:#ffffff; border-radius: 10px;">
												<div style="font-weight: 700;
								font-size: 1.5rem;
								text-align: center; margin: 1rem 0">基本信息</div>
												<el-popover
																placement="top-start"
																width="240"
																trigger="hover"
																content="点击可跳转到该学者的个人信息页面" style="margin-right: 1rem">
													<el-link
																	slot="reference"
																	v-if="author.author_user_id!==-1"
																	style="font-size: 2rem"
																	:underline=false
																	:href="'/userinfo/'+author.author_user_id">{{author.name}}</el-link>
													<el-link
																	slot="reference"
																	v-else
																	style="font-size: 2rem"
																	:underline=false
																	href="">{{author.name}}</el-link>
												</el-popover>

												<!--											<el-button size="mini" style="vertical-align: bottom"-->
												<!--																 v-else type="info" disabled>门户已被认领</el-button>-->
												<el-button size="mini"
																	 style="vertical-align: center; margin-left: 0.5rem"
																	 v-if="author.is_claimed===0&&permit_claim"
																	 type="danger"
																	 @click="submitClaim(user_id, author.author_id)">认领该门户</el-button>
												<el-button size="mini"
																	 style="vertical-align: center; margin-left: 0.5rem"
																	 v-if="author.is_claimed===2"
																	 type="danger"
																	 @click="cancelClaim">解除认领</el-button>

												<el-button size="mini"
																	 style="vertical-align: center; margin-left: 0.5rem"
																	 v-if="author.is_claimed===1"
																	 type="danger"
																	 @click="reportDisplay">举报冒领门户</el-button>
												<el-button size="mini"
																	 style="vertical-align: center; margin-left: 0.5rem"
																	 v-if="!author.is_followed&&author.is_claimed===1"
																	 type="primary"
																	 @click="follow(0)">关注</el-button>
												<el-button size="mini"
																	 style="vertical-align: center; margin-left: 0.5rem"
																	 v-if="author.is_followed&&author.is_claimed===1"
																	 type="info"
																	 @click="follow(1)">取消关注</el-button>

												<el-button size="mini"
																	 style="vertical-align: center; margin-left: 0.5rem"
																	 v-if="author.is_claimed===1"
																	 type="warning"
																	 @click="privateMessageDisplay">私信TA</el-button>
											</el-card>

										</el-col>
									</el-col>

									<el-col :span="24" style="margin-left: 0">
										<el-col :span="12">
											<el-col :span="24" style="font-size: 1rem; margin-bottom: 1rem">
												<el-card style="background:#ffffff;  border-radius: 10px">
													<div>
														<i class="el-icon-s-opportunity" style="margin-right: 0.5rem"></i>
														<strong>相关领域：</strong>
														<span v-if="typeof(author.tags)==='undefined'||author.tags.length===0">未知</span>
													</div>
													<div v-if="typeof(author.tags)!=='undefined'&&author.tags.length!==0">
														<el-col :span="24" style="margin-top: 0.5rem;"
																		v-for="(item, index) in author.tags" :key="index">
															{{item.t}}
														</el-col>
													</div>
													<el-col :span="24">
														<el-divider></el-divider>
														<i class="el-icon-office-building" style="margin-right: 0.5rem"></i>
														<strong>工作单位：</strong>
														<span v-if="typeof(author.orgs)!=='undefined'&&author.orgs[0]!==''">
														{{author.orgs[0]}}
													</span>
														<span v-else>未知</span>
													</el-col>
													<el-col :span="24" style="font-size: 1.2rem; text-align: center; margin-bottom: 2rem">
														<el-divider></el-divider>
														<el-col :span="8" style="margin-bottom: 1rem">
															<el-col :span="24" style="margin-bottom: 1rem">发表论文数</el-col>
															<el-col :span="24"
																			v-if="typeof(author.n_pubs)!=='undefined'&&author.n_pubs!==''">
																{{author.n_pubs}}</el-col>
															<el-col :span="24" v-else>0</el-col>
														</el-col>
														<el-col :span="8" style="margin-bottom: 1rem">
															<el-col :span="24" style="margin-bottom: 1rem">h指数</el-col>
															<el-col :span="24"
																			v-if="typeof(author.h_index)!=='undefined'&&author.h_index!==''">
																{{author.h_index}}</el-col>
															<el-col :span="24" v-else>0</el-col>
														</el-col>
														<el-col :span="8" style="margin-bottom: 1rem">
															<el-col :span="24" style="margin-bottom: 1rem">被引量</el-col>
															<el-col :span="24"
																			v-if="typeof(author.n_citation)!=='undefined'&&author.n_citation!==''">
																{{author.n_citation}}</el-col>
															<el-col :span="24" v-else>0</el-col>
														</el-col>
													</el-col>
												</el-card>
											</el-col>
										</el-col>
										<el-col :span="12">
											<div class="grid-content" style="text-align: center">
												<span style="font-weight: 700; font-size: 1.5rem; margin-bottom: 0.5rem">相关专家网络</span>
												<div id="myNetwork"
														 style="width: 100%; height: 30rem;
											 overflow: hidden; text-align: center"/>
											</div>
										</el-col>
									</el-col>
								</div>
							</el-col>

							<el-col :span="24">
								<el-divider></el-divider>
							</el-col>

							<!--					学术成果展示-->
							<el-col :span="24">
								<!-- <div style="text-align: center; font-size: 1.6rem"><strong>学术成果</strong></div> -->
							</el-col>

							<div style="text-align: center; font-size: 1.6rem"><strong>学术成果</strong></div>

								<el-card class="box-card" style="background-color: #ffffff; border-radius: 15px; margin: 1rem 0;"
									v-if="author.pubs.length!==0
									&&(author.is_claimed===2||author.pubs[0].is_display===1)">
									<el-col :span="24"
													style="text-align: left"
													v-for="(item, index) in author.pubs"
													:key="index">
										<div class="text item"
												 v-if="typeof(item.title)!=='undefined'&&item.title!==''
												 &&(author.is_claimed===2||item.is_display===1)">
											<el-divider></el-divider>
											<el-col :span="18" style="margin-bottom: 1rem">
												<el-link @click="jump_to_paper(item.paper_id)" style="font-size: 1.2rem" :underline=false>
													<i class="el-icon-document"></i>
													{{item.title}}
												</el-link>
											</el-col>
											<el-col :span="6" style="text-align: right">
												<el-button v-if="item.is_display===1&&author.is_claimed===2"
                                 @click="pub_display(index, 0)">当前状态：展示给他人</el-button>
												<el-button v-if="item.is_display===0&&author.is_claimed===2"
																	 @click="pub_display(index, 1)">当前状态：不展示给他人</el-button>
											</el-col>
											<el-col :span="24"
															style="margin-bottom: 1rem">
												<el-link v-for="(author, index2) in item.author"
																 :key="index2"
																 style="margin-right: 0.5rem; font-size: 16px"
																 :underline=false
																 @click="jumpToPortal(author.id)">
													{{author.name}}
													<span v-if="index2!==item.author.length-1">,</span>
												</el-link>
											</el-col>
											<el-col :span="24" style="margin-bottom: 1rem"
															v-if="(typeof(item.venue_raw)!=='undefined'&&item.venue_raw!=='')
																		&&(typeof(item.year)!=='undefined'&&item.year!=='')">
												{{item.venue_raw}}({{item.year}})
											</el-col>
											<el-col :span="24" style="margin-bottom: 1rem">
												<span>被引量：</span>
												<span v-if="typeof(item.n_citation)!=='undefined'&&item.n_citation!==''">
													{{item.n_citation}}
												</span>
												<span v-else>0</span>
											</el-col>
										</div>
										<div v-if="typeof(item.title)==='undefined'||item.title===''"
											style="text-align: center;">
											<el-divider></el-divider>
											<span>该学术成果还未收录</span>
										</div>
									</el-col>
								</el-card>
								<div v-else style="text-align: center; margin-top: 1rem">该学者的成果还未收录！</div>
						</div>

					</el-col>
					<el-col :span="4">
						<div class="grid-content" style="height: 700px; margin-top: 0.5rem; margin-left: 0.5rem">
<!--							<img :src="imgUrl_right" alt="" style="width: 100%; height: 100%">-->
						</div>
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
											:total="author.total"
											:page-size="author.page_size"
											:current-page="author.current_page"
											@current-change="handleCurrentChange">
							</el-pagination>
						</div>
				</el-col>
				<el-col :span="4"><div class="grid-content"></div></el-col>
			</el-footer>
		</el-container>

<!--		举报冒领输入框-->
		<el-dialog
						title="填写举报信息"
						:visible.sync="reportVisible"
						center
						:append-to-body='true'
						:lock-scroll="false"
						width="50%"
						:before-close="reportClose">
			<el-input
							type="textarea"
							:rows="5"
							autosize
							placeholder="请输入内容"
							v-model="reportText">
			</el-input>
			<el-button class="medium" style="margin-left:40%;position:relative;margin-top:30px" plain
								 @click="submitReport(reportText)">提交举报
			</el-button>
		</el-dialog>

<!--私信输入框-->
		<el-dialog
						title="请填写私信内容"
						:visible.sync="privateMessageVisible"
						center
						:append-to-body='true'
						:lock-scroll="false"
						width="50%"
						:before-close="privateMessageClose">
			<el-input
							type="textarea"
							:rows="5"
							autosize
							placeholder="请输入内容"
							v-model="privateMessageText">
			</el-input>
			<el-button class="medium" style="margin-left:40%;position:relative;margin-top:30px" plain
								 @click="submitPrivateMessage(author.author_user_id, privateMessageText)">发送私信
			</el-button>
		</el-dialog>
	</div>
</template>

<script>
	import echarts from 'echarts'
	import NewNavigation from "../navigatorandsearch/NewNavigation";

	export default {
		name: "Author",
		data() {
			return {
				a:"2",
				/*按钮的逻辑：
				1.认领：is_claimed
					0 -> 未被认领
					1 -> 已被他人认领
					2 -> 已被自己认领
				2.举报：is_reported
					0 -> 未被举报，显示举报冒领门户的按钮
					1 -> 已被举报（自己或他人），显示不能点击的按钮
				3.关注：is_followed
					0 -> 未关注
					1 -> 已关注
				*/
				imgUrl_left: require('../../assets/image/author/stair-left.jpg'),
				imgUrl_right: require('../../assets/image/author/stair-right.jpg'),
				author: {
					author_id: 0,
					author_user_id: -1,
					name: "",
					orgs: "",
					h_index: 0,
					tags: [],
					n_pubs: 0,
					n_citation: 0,
					is_claimed: 0,
					is_reported: 0,
					is_followed: false,
					relative_author: [],
					pubs: [],
					page_num: 2,
					page_size: 10,
					current_page: 1,
					status: 0,
					total: 0,
				},
				permit_claim: false,
				searchInput: '',
				reportVisible: false,
				reportText: '',
				privateMessageVisible: false,
				privateMessageText: '',
				myChart: null,
				chartData:[],
				chartLink:[],
				is_login: -1,
				user_id: -1,
			}
		},
		mounted () {
			this.get_login_status();
			this.get_user_info();
			setTimeout(() => {
				this.get_author_id();
				this.get_author(1);
			}, 100)
		},
		methods: {
			//完成
			get_login_status() {
				this.$axios.post('/apis/user/getstatus')
						.then(res => {
							this.is_login = res.data.status
							this.user_id = res.data.userid
						})
			},
			//获取用户信息，查看该用户是否可以认领门户（已认领别的门户则不能再认领门户）
			get_user_info() {
				this.$axios.post('/apis/personality/get')
						.then(res => {
							this.permit_claim = !res.data.is_associated;
						})
			},
			//完成
			get_author_id() {
				// this.author.author_id = JSON.parse(this.$Base64.decode(this.$route.query.author_id))
				this.author.author_id = this.$route.query.author_id
				//获取用户信息，该用户是否可以认领门户
				//同时获取认领门户者的门户id以及认领状态
				this.$axios.post('/apis/user/get_userid_by_authorid',
						{
							authorid: this.$route.query.author_id
						}).then(res => {
							if(res.data.status === 0) {
								this.author.author_user_id = res.data.userid
								if(res.data.userid === -1){
									this.author.is_claimed = 0
								}
								else if(res.data.userid !== this.user_id) {
									this.author.is_claimed = 1
								}
								else if(res.data.userid === this.user_id) {
									this.author.is_claimed = 2
								}
								//获取关注状态
								this.$axios.post('/apis/user/get_follow_state',
										{
											userid: this.author.author_user_id
										}).then(res => {
									if(res.data.status === 0){
										this.author.is_followed = res.data.is_follow
									}
								})
							}
				})
			},
			//未完成
			get_author(pagenumber) {
				this.$axios.post('/apis/search/getauthorbyid',
						{
							authorid: this.author.author_id,
							pagenumber: pagenumber,
						})
						.then(res => {
							console.log(res)
							if(res.status === 200){
								this.author.total = res.data.total
								this.author.author_id = res.data.res.id
								this.author.name = res.data.res.name
								this.author.h_index = res.data.res.h_index
								this.author.n_pubs = res.data.res.n_pubs
								this.author.tags = res.data.res.tags
								this.author.n_citation = res.data.res.n_citation
								if(typeof(res.data.res.orgs) !== "undefined")
									this.author.orgs = res.data.res.orgs
								for(let i = 0; i < res.data.res.pubs.length; i++) {
									// this.author.pubs[i].paper_id = res.data.res.pubs[i].i;
									// this.author.pubs[i].is_display = res.data.res.pubs[i].is_display;
									//学术成果
									this.$axios.post('/apis/search/getpaperbyid',
											{
												paperid: res.data.res.pubs[i].i
											}).then(res2 => {
										let obj = {
											paper_id: res.data.res.pubs[i].i,
											is_display: res.data.res.pubs[i].isdisplay,
											title: res2.data.title,
											author: res2.data.authors,
											venue_raw: res2.data.venue_raw,
											year: res2.data.year,
											keywords: res2.data.keywords,
											n_citation: res2.data.n_citation,
											page_start: res2.data.page_start,
											page_end: res2.data.page_end,
											volumn: res2.data.volumn,
											issue: res2.data.issue,
											isbn: res2.data.isbn,
											doi: res2.data.doi,
											abstract: res2.data.abstract,
										}
										if(typeof(res.data.res.pubs[i].isdisplay) == "undefined"){
											obj.is_display = 1
										}
										this.author.pubs.push(obj)
									})
								}
								//相关专家
								this.$axios.post('/apis/search/getrelatedauthor',
										{
											authorid: this.author.author_id,
											pagenumber: 1,
										}).then(res3 => {
									if(res3.data.res.length !== 0){
										for(let i = 0; i < res3.data.res.length; i++) {
											let obj = {
												name: res3.data.res[i].name,
												author_id: res3.data.res[i].id,
												graph_id: i + 1,
												symbolSize: res3.data.res[i].account_cooperation * 0.3 + 30,
												org: res3.data.res[i].org
											}
											this.author.relative_author.push(obj)
										}
									}
								})
								//相似专家
								this.$axios.post('/apis/search/getsimilarauthor',
										{
											authorid: this.author.author_id,
											pagenumber: 1,
										}).then(res4 => {
											if(res4.data.res.length !== 0) {
												let tmp_len = this.author.relative_author.length;
												for(let j = 0; j < res4.data.res.length; j++){
													let obj = {
														name: res4.data.res[j].name,
														author_id: res4.data.res[j].id,
														graph_id: j+tmp_len + 1,
														symbolSize: 40,
														org: res4.data.res[j].org
													}
													this.author.relative_author.push(obj)
												}
												let q = JSON.parse(JSON.stringify(this.author.relative_author))
												this.graph(q);
											}
								})
								let only = JSON.parse(JSON.stringify(this.author.relative_author))
									if(only.length === 0){
										this.graph(only)
									}
							}
							else {
								alert('抱歉，您所点击的专家还未建立门户')
								this.$router.go(-1)
							}
						})

			},
			//完成
			graph(q) {
				let dom = document.getElementById('myNetwork');
				this.myChart = echarts.init(dom);
				this.chartData = this.dataEChart(q);
				this.chartLink = this.linkEChart(this.chartData);
				let option = {
					tooltip:{
						show: false,
					},
					series: [
						{
							//symbolSize: 40,
							type:'graph',
							layout:'force',
							links: this.chartLink,
							data: this.chartData,
							hoverAnimation: true,
							edgeLabel: {
								normal: {
									formatter:"{c}",
									show: true
								},
							},
							edgeSymbol:'circle',
							force:{
								repulsion: 1200,
								//edgeLength: 50,
								layoutAnimation: true,
							},
							focusNodeAdjacency: true,
							cursor: 'pointer',
							//roam:true,
							itemStyle:{
								normal:{
									color: {
										type: 'radial',
										x: 0.5,
										y: 0.5,
										r: 0.6,
										colorStops: [{
											offset: 0, color: 'pink' // 0% 处的颜色
										}, {
											offset: 1, color: 'orange' // 100% 处的颜色
										}],
										global: false // 缺省为 false
									},
									borderColor: 'grey',
									borderWidth: 2,
									borderType: 'dotted',

								},
								//鼠标放上去有阴影效果
								emphasis: {
									shadowColor: '#eab820',
									shadowOffsetX: 0,
									shadowOffsetY: 0,
									shadowBlur: 20,
								},

							},
							lineStyle: {
								color: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0, color: 'red' // 0% 处的颜色
									}, {
										offset: 1, color: 'blue' // 100% 处的颜色
									}],
									global: false // 缺省为 false
								},
								//type: 'dashed',
								curveness: 0.2,
							},
							label:{
								normal:{
									show: true,
									//position: 'right',
									//color: 'auto',
									fontFamily: 'Arial',
									fontSize: 14,
								},
							},
							categories: {

							},
						}
					],
					graphic: {
						elements: [{
							type: 'circle',
							draggable: false,
						}]
					},
					animation: true,

				};
				this.myChart.setOption(option);
				this.myChart.on('click', function (params) {

				});
			},
			//完成
			dataEChart(q){
				let data = [];
				data.push({
					name: this.author.name,
					symbolSize: 100,
					graph_id: 0,
				})
				for(let i = 0; i < q.length; i++){
					data.push(q[i])
				}

				return data;
			},
			//完成
			linkEChart(data){
				let dataLink = [];
				for(let i = 0;i < data.length; i++){
					dataLink.push({
						value: data[i].symbolSize,
						source: 0,
						target: data[i].graph_id,
					})
				}
				return dataLink;
			},

			//按钮：认领、举报、私信、关注
			//认领门户
			submitClaim(user_id, author_id) {
				this.$axios.post('/apis/search/associatetoAuthor',
						{
							userid: user_id,
							authorid: author_id
						}).then(res => {
					if(res.data.status === 0){
						this.$message({
							type: 'success',
							message: '认领成功',
						})
						this.$router.go(0)
					}
					else{
						this.$message({
							type: 'danger',
							message: '认领失败',
						})
					}
				})
			},
			//解除认领，调试
			cancelClaim() {
				this.$axios.post('/apis/search/disassociatetoAuthor',
						{
							userid: this.user_id
						})
						.then(res => {
							if(res.data.status === 0){
								this.$message({
									type: 'success',
									message: '解除认领成功',
								})
								this.$router.go(0)
							}
						})
			},
			//举报输入框，未完成
			reportDisplay() {
				if(this.is_login === 1) {
					alert('请先登录！')
					this.$router.push('/login')
				}
				this.reportVisible = true;
			},
			//提交举报门户，未完成
			submitReport(text) {
				if(this.reportText === '')
					this.$alert('举报内容不能为空', '系统提示', {
						confirmButtonText: '确定',
				})
				else{
					this.$axios.post('/apis/report/reportauthor',
				{
						author_id: this.author.author_id,
						author_user_id: this.author.author_user_id,
						text: text
				}).then(res => {
						if(res.data.data.status === 0){
							this.author.is_reported = 1 - this.author.is_reported
							this.$message({
								type: 'success',
								message: '举报成功，请等待管理员处理',
							})
							this.reportClose();
						}
					})
				}
			},
			reportClose(done) {
				this.reportVisible = false;
			},
			//私信，未完成
			privateMessageDisplay() {
				if(this.is_login === 1) {
					alert('请先登录！')
					this.$router.push('/login')
				}
				else if(this.author.is_claimed === 0){
					this.$alert('该门户未被认领！', '系统提示', {
						confirmButtonText: '确定'
					})
				}
				else
					this.privateMessageVisible = true;
			},
			submitPrivateMessage(id, text) {
				if(this.privateMessageText === '')
					this.$alert('私信内容不能为空', '系统提示', {
						confirmButtonText: '确定',
					})
				else{
					this.$axios.post('/apis/message/sendimessage',
							{
								id: id,
								message: text
							}).then(res => {
								if(res.data.data.status === 0){
									this.$message({
										type: 'success',
										message: '私信发送成功',
									})
									this.privateMessageVisible = false
								}

							})
				}
			},
			privateMessageClose(done) {
				this.privateMessageVisible = false;
			},
			//关注，未完成
			follow(flag) {
				if(this.is_login === 1) {
					alert('请先登录！')
					this.$router.push('/login')
				}
				else if(this.author.is_claimed === 0){
					this.$alert('该门户未被认领！', '系统提示', {
						confirmButtonText: '确定'
					})
				}
				else{
					this.$axios.post('/apis/user/change_follow_state',
							{
								userid: this.author.author_user_id,
							}).then(res => {
						if(res.data.status === 0){
							this.author.is_followed = !this.author.is_followed
							this.$message({
								type: "success",
								message: "操作成功",
							})
						}
					})

				}
			},
			//是否给别人看某个学术成果，完成
			pub_display(index, flag) {
				this.author.pubs[index].is_display = 1-this.author.pubs[index].is_display
				//展示出来
				if(flag === 1){
					this.$axios.post('/apis/search/paperdisplay',
							{
								userid: this.user_id,
								paperid: this.author.pubs[index].paper_id,
							}).then(res => {
						console.log(res)
						if(res.data.status === 0){
							this.$message({
								type: "success",
								message: "设置展示成功",
							})
						}
					})
				}
				else {
					console.log(this.author.pubs[index].paper_id)
					this.$axios.post('/apis/search/papernotdisplay',
							{
								userid: this.user_id,
								paperid: this.author.pubs[index].paper_id,
							}).then(res => {
						console.log(res)
						if(res.data.status === 0){
							this.$message({
								type: "success",
								message: "设置隐藏成功",
							})
						}
					})
				}
			},
			//跳转门户所绑定用户的个人信息页面，未完成
			jump_to_info(user_id) {
				if(user_id < 0){
					alert('对不起，该门户未被认领')
				}
				else{
					this.$router.push({
						name: 'userinfo',
						param: {
							userid: user_id
						}
					})
				}
			},
			//跳转对应学术成果，已完成
			jump_to_paper(paper_id){
				this.$router.push({
					path: '/paper',
					query: {
						// paper_id: this.$Base64.encode(JSON.stringify(paper_id)),
						paper_id: paper_id,
					}
				})
			},
			//跳转对应专家门户，已完成
			jumpToPortal(author_id) {
				this.$router.push({
					path: '/author',
					query: {
						author_id: author_id,
					}
				})
			},
			//请求分页数据，未完成
			handleCurrentChange(val) {
				this.$axios.post('/apis/search/getauthorbyid',
						{
							authorid: this.author.author_id,
							pagenumber: val
						})
						.then(res => {
							console.log(res)
							if(res.status === 200){
								this.author.pubs = []
								for(let i = 0; i < res.data.res.pubs.length; i++) {
									// this.author.pubs[i].paper_id = res.data.res.pubs[i].i;
									// this.author.pubs[i].is_display = res.data.res.pubs[i].is_display;
									//学术成果
									this.$axios.post('/apis/search/getpaperbyid',
											{
												paperid: res.data.res.pubs[i].i
											}).then(res2 => {
										let obj = {
											paper_id: res.data.res.pubs[i].i,
											is_display: res.data.res.pubs[i].isdisplay,
											title: res2.data.title,
											author: res2.data.authors,
											venue_raw: res2.data.venue_raw,
											year: res2.data.year,
											keywords: res2.data.keywords,
											n_citation: res2.data.n_citation,
											page_start: res2.data.page_start,
											page_end: res2.data.page_end,
											volumn: res2.data.volumn,
											issue: res2.data.issue,
											isbn: res2.data.isbn,
											doi: res2.data.doi,
											abstract: res2.data.abstract,
										}
										if(typeof(res.data.res.pubs[i].isdisplay) == "undefined"){
											obj.is_display = 1
										}
										this.author.pubs.push(obj)
									})
								}
								console.log('切换到第' + val + '页成功')
								this.current_page = val
							}
						})
			},
		},
		computed: {

		},
		components: {
			NewNavigation,
		}
	}
</script>

<style>
	body{
		background-image: url('../../assets/image/user/image/login-back.png');
		background-attachment: fixed;
	}
</style>

<style scoped>
.el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover{
	box-shadow:1px 1px 0 0 rgba(0,0,0,.1)
}
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

	.profile {
		text-align: left;
		/*border: 2px #d3dce6;*/
		/*border-right-style: solid;*/
	}

	.echartLayout {
		margin: auto;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}

	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}
	.clearfix:after {
		clear: both
	}

	.box-card {
		width: 100%;
	}

	.el-select .el-input {
		width: 130px;
	}
	.input-with-select .el-input-group__prepend {
		background-color: #fff;
	}

</style>