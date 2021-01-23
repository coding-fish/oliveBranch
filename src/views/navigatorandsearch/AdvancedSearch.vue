    <template>
    <div class="wrapper">
        <new-navigation></new-navigation>
        <section>
            <main style="text-align: center">

                <div style="margin-top: 20px">
                    <dl>
                        <dd>

                        <el-input placeholder="请输入关键词" v-model="input" class="input-with-select" style="width: 60% ">
                            <el-select v-model="select" slot="prepend" placeholder="请选择" class="object_select"  style="width: 140px;">
                                <el-option v-for="item in subject" :key="item.value" :label="item.label" :value="item.value" >
                                    <div @click="search_type(item.label)">{{ item.label }}</div>
                                    <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
                                </el-option>
                            </el-select>
                        </el-input>

                        <el-select v-model="select3" slot="prepend" placeholder="请选择" class="object_select"  style="width: 88px;">
                            <el-option v-for="item3 in subject_i1" :key="item3.value3" :label="item3.label3" :value="item3.value3" >
                                <div @click="search_acc1(item3.label3)">{{ item3.label3 }}</div>
                                <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
                            </el-option>
                        </el-select>
                        </dd>
                    <dd>
                        <el-select v-model="select2" slot="prepend" placeholder="请选择" class="object_select"  style="width: 88px;">
                            <el-option v-for="item2 in subject2" :key="item2.value2" :label="item2.label2" :value="item2.value2" >
                                <div @click="search_op(item2.label2)">{{ item2.label2 }}</div>
                                <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
                            </el-option>
                        </el-select>

                        <el-input placeholder="请输入关键词" v-model="input1" style="width: 60% ">
                            <el-select v-model="select1" slot="prepend" placeholder="请选择" class="object_select"  style="width: 140px;">
                                <el-option v-for="item1 in subject1" :key="item1.value1" :label="item1.label1" :value="item1.value1" >
                                    <div @click="search_type1(item1.label1)">{{ item1.label1 }}</div>
                                    <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
                                </el-option>
                            </el-select>
                        </el-input>
                        <el-select v-model="select4" slot="prepend" placeholder="请选择" class="object_select"  style="width: 88px;">
                            <el-option v-for="item4 in subject_i2" :key="item4.value4" :label="item4.label4" :value="item4.value4" >
                                <div @click="search_acc2(item4.label4)">{{ item4.label4 }}</div>
                                <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
                            </el-option>
                        </el-select>
                    </dd>

                        <el-button slot="append" icon="el-icon-search" @click="search_click()" v-loading.fullscreen.lock="fullscreenLoading">检索</el-button>

                    </dl>


<!--                    <el-input placeholder="请输入关键词" v-model="input" class="input-with-select" style="width: 66.6% ">-->
<!--                        <el-select v-model="select" slot="prepend" placeholder="请选择" class="object_select"  style="width: 140px;">-->
<!--                            <el-option v-for="item in subject" :key="item.value" :label="item.label" :value="item.value" >-->
<!--                                <div @click="search_type(item.label)">{{ item.label }}</div>-->
<!--                                &lt;!&ndash; <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> &ndash;&gt;-->
<!--                            </el-option>-->
<!--                        </el-select>-->
<!--                        <el-button slot="append" icon="el-icon-search" @click="search_click()" v-loading.fullscreen.lock="fullscreenLoading"></el-button>-->
<!--                    </el-input>-->

                </div>





                <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
                </el-row>

                <el-row v-if="paper_boolen || author_boolen">
                    <el-col :span="4"><div style="height: 40px"></div></el-col>
                    <el-col :span="16">
                        <div class="search_result" >
                            <el-tabs type="border-card" style="background-color: rgba(240,241,244);  border-radius: 10px margin-top: 20%">
                                <el-tab-pane label="专家" v-if="author_boolen">
                                    <el-col style="margin-top: 1rem; text-align: left">
                                        <el-button  @click="search1()">综合</el-button>
                                        <el-button  @click="search2()">发表论文数</el-button>
                                        <el-button  @click="search3()">h指数</el-button>
                                        <el-button  @click="search4()">被引用数</el-button>
                                    </el-col>
                                    <el-col>
                                        <span v-if="totalnum!==10000">共找到{{totalnum}}条结果   当前{{current_page}}/{{totalpage}}</span>
                                        <span v-else>共找到超过10000条结果</span>
                                    </el-col>
                                    <el-col :span="24" style="margin-top: 1rem; text-align: left"
                                            v-for="(item, index) in Author_information"
                                            :key="index">
                                        <el-card class="box-card" shadow="always">
                                            <div class="text item">
                                                <el-col :span="24" style="margin-bottom: 1rem">
                                                    <el-link @click="jumpToAouther(item.id)" style="font-size: 1.2rem">
                                                        <i class="el-icon-document"></i>
                                                        {{item.name}}
                                                    </el-link>
                                                </el-col>
                                                <el-col :span="24" style="margin-bottom: 1rem">
                                                    <span v-if="typeof(item.h_index)!=='undefined'&&item.h_index!==''">h指数：{{item.h_index}}</span>
                                                    <span v-else>h指数：未知</span>
                                                </el-col>
                                                <el-col :span="24" style="margin-bottom: 1rem">
                                                    <span v-if="typeof(item.n_pubs)!=='undefined'&&item.n_pubs!==''">发表量：{{item.n_pubs}}</span>
                                                    <span v-else>发表量：未知</span>
                                                </el-col>
                                                <el-col :span="24" style="margin-bottom: 1rem">
                                                    <span v-if="typeof(item.n_citation)!=='undefined'&&item.n_citation!==''">被引量：{{item.n_citation}}</span>
                                                    <span v-else>被引量：未知</span>
                                                </el-col>
                                                <el-col :span="24" style="margin-bottom: 1rem">
                                                    <span v-if="typeof(item.orgs)!=='undefined'&&item.orgs!==''&&item.orgs[0]!==''">工作单位：{{item.orgs[0]}}</span>
                                                    <span v-else>工作单位：未知</span>
                                                </el-col>
                                                <el-col :span="24" style="margin-bottom: 1rem">
                                                    <span v-if="typeof(item.tags)!=='undefined'&&item.tags!==''">相关领域：
                                                        <span v-for="(item2, index2) in (item.tags || '').slice(0,10)"
                                                              :key="index2">{{item2.t}}({{item2.w}});</span>
                                                    </span>
                                                    <span v-else>相关领域：未知</span>
                                                </el-col>
                                            </div>
                                        </el-card>
                                    </el-col>

                                    <el-footer>
                                        <el-col :span="4"><div class="grid-content"></div></el-col>
                                        <el-col :span="24">
                                            <div style="text-align: center;">
                                                <el-pagination
                                                        background
                                                        layout="prev, pager, next"
                                                        :total="totalnum"
                                                        :page-size="pageSize"
                                                        :current-page="current_page"
                                                        @current-change="handleCurrentChange">
                                                </el-pagination>
                                            </div>
                                        </el-col>
                                        <el-col :span="4"><div class="grid-content"></div></el-col>
                                    </el-footer>

                                </el-tab-pane>

                                <el-tab-pane label="论文" >
                                    <el-col style="margin-top: 1rem; text-align: left">

                                        <!-- <div class="block">
                                            <el-date-picker
                                            style="width: 66.6% "
                                            v-model="value2"
                                            type="daterange"
                                            align="right"
                                            unlink-panels
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期"
                                            :picker-options="pickerOptions">
                                            </el-date-picker>
                                            <el-button @click="search8()">筛选发表年限</el-button>
                                        </div> -->

                                        <el-button @click="search5()">综合</el-button>
                                        <el-button @click="search6()">发表时间</el-button>
                                        <el-button @click="search7()">被引用数</el-button>


                                        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top:2rem">
                                            <el-form-item label="起始年限">
                                                <!-- <el-select v-model="formInline.start" placeholder="起始年限">
                                                    <el-option v-for="item in start" :key="item.value" :label="item.label" :value="item.value" >
                                                    <div @click="search_start(item.label)">{{ item.label }}</div>
                                                    </el-option>
                                                </el-select> -->
                                                <el-input-number v-model="min_num" @change="search_start(min_num)" :min="1800" :max="2020" label="起始年限"></el-input-number>
                                            </el-form-item>
                                            <el-form-item label="结束年限">
                                                <!-- <el-select v-model="formInline.end" placeholder="结束年限">
                                                    <el-option v-for="item in start" :key="item.value" :label="item.label" :value="item.value" >
                                                    <div @click="search_end(item.label)">{{ item.label }}</div>
                                                    </el-option>
                                                </el-select> -->
                                                <el-input-number v-model="max_num" @change="search_end(max_num)" :min="1800" :max="2020" label="结束年限"></el-input-number>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-button @click="search8()">按发表年限筛选</el-button>
                                            </el-form-item>
                                        </el-form>

                                        <!-- <div class="block">
                                            <el-cascader
                                            v-model="value_year"
                                            :options="options"
                                            clearable
                                            @change="change_year"></el-cascader>
                                             <el-button @click="search8()">按发表年限筛选</el-button>
                                        </div> -->
                                    </el-col>
                                    <el-col>
                                        <span v-if="totalnum!==10000">共找到{{totalnum}}条结果   当前{{current_page}}/{{totalpage}}</span>
                                        <span v-else>共找到超过10000条结果</span>
                                    </el-col>
                                    <el-col :span="24" style="margin-top: 1rem; text-align: left"
                                            v-for="(item, index) in papers_information"
                                            :key="index">
                                        <el-card class="box-card" shadow="always">
                                            <div class="text item">
                                                <el-col :span="24" style="margin-bottom: 1rem">
                                                    <el-link @click="jumpToPaper(item.id)" style="font-size: 1.2rem">
                                                        <i class="el-icon-document"></i>
                                                        {{item.title}}
                                                    </el-link>
                                                </el-col>
                                                <el-col :span="24" style="margin-bottom: 1rem">
                                                    <el-link v-for="(author, index2) in item.authors"
                                                             :key="index2"
                                                             style="margin-right: 0.5rem; font-size: 16px"
                                                             @click="jumpToAouther(author.id)">{{author.name}}</el-link>
                                                </el-col>
                                                <el-col :span="24" style="margin-bottom: 1rem">
                                                    <span v-if="typeof(item.venue_name)!=='undefined'&&item.venue_name!==''">发表刊物：{{item.venue_name}}</span>
                                                    <span v-else>发表刊物：未知</span>
                                                </el-col>
                                                <el-col :span="24" style="margin-bottom: 1rem">
                                                    <span v-if="typeof(item.year)!=='undefined'&&item.year!==''">发表年限：{{item.year}}</span>
                                                    <span v-else>发表年限：未知</span>
                                                </el-col>
                                                <el-col :span="24" style="margin-bottom: 1rem">
                                                    <span v-if="typeof(item.n_citation)!=='undefined'&&item.n_citation!==''">被引量：{{item.n_citation}}</span>
                                                    <span v-else>被引量：未知</span>
                                                </el-col>
                                                <el-col :span="24" style="margin-bottom: 1rem">
                                                    <el-col :span="3">相关链接：</el-col>
                                                    <el-col :span="21" v-if="typeof(item.url)!=='undefined'&&item.url!==''">
                                                        <el-col :span="24" v-for="(item2, index2) in item.url"
                                                                :key="index2">
                                                            <el-link :href="item2" color="blue">{{item2}}</el-link>
                                                        </el-col>
                                                    </el-col>
                                                    <span v-else>未知</span>
                                                </el-col>
                                            </div>
                                        </el-card>
                                    </el-col>
                                    <el-footer>
                                        <el-col :span="4"><div class="grid-content"></div></el-col>
                                        <el-col :span="24">
                                            <div style="text-align: center;">
                                                <el-pagination
                                                        background
                                                        layout="prev, pager, next"
                                                        :total="totalnum"
                                                        :page-size="pageSize"
                                                        :current-page="current_page"
                                                        @current-change="handleCurrentChange">
                                                </el-pagination>
                                                <!-- 分页器 -->
                                            </div>
                                        </el-col>
                                        <el-col :span="4"><div class="grid-content"></div></el-col>
                                    </el-footer>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </el-col>
                    <el-col :span="4"><div style="height: 40px"></div></el-col>
                </el-row>

            </main>
        </section>
    </div>
</template>

<script>
    import NewNavigation from '../navigatorandsearch/NewNavigation';
    export default {
        name: 'AdvancedSearch',
        data() {
            return {
                min_num:1800,
                max_num:2020,
                formInline: {
                    start: '',
                    end: ''
                },

                search1_ascending: 1,//默认升序排列
                search2_ascending: 1,//默认升序排列
                search3_ascending: 1,//默认升序排列
                search4_ascending: 1,//默认升序排列
                search5_ascending: 1,//默认升序排列
                search6_ascending: 1,//默认升序排列
                search7_ascending: 1,//默认升序排列



                collapse: false,
                pageSize: 10,
                current_page: 1,
                pagenum: 10,
                totalnum: 10,
                Author_information: [

                ],

                papers_information: [

                ],

                subject: [{value:'选项1', label: '作者'
                }, {value:'选项2', label: '领域'
                }, {value:'选项3', label: '机构'
                }, {value:'选项4', label: '标题'
                }, {value:'选项5', label: '刊物'
                }, {value:'选项6', label: '关键词'
                }, {value:'选项7', label: '摘要'
                }, {value:'选项8', label: 'ISSN'
                }, {value:'选项9', label: 'ISBN'
                }, {value:'选项10', label: 'DOI'
                }],
                subject1: [{value1:'选项1', label1: '作者', disabled: false
                }, {value1:'选项2', label1: '领域', disabled: false
                }, {value1:'选项3', label1: '机构', disabled: false
                }, {value1:'选项4', label1: '标题', disabled: false
                }, {value1:'选项5', label1: '刊物', disabled: false
                }, {value1:'选项6', label1: '关键词', disabled: false
                }, {value1:'选项7', label1: '摘要', disabled: false
                }, {value1:'选项8', label1: 'ISSN', disabled: false
                }, {value1:'选项9', label1: 'ISBN', disabled: false
                }, {value1:'选项10', label1: 'DOI', disabled: false
                }],
                subject2: [{value2:'选项1', label2: 'and'
                }, {value2:'选项2', label2: 'or'
                }, {value2:'选项3', label2: 'not'
                }],
                subject_i1: [{value3:'选项1', label3: '精确'
                }, {value3:'选项2', label3: '模糊'
                }],
                subject_i2: [{value4:'选项1', label4: '精确'
                }, {value4:'选项2', label4: '模糊'
                }],
                value: '关键词',//this.$route.params.type
                value1: '关键词',//this.$route.params.type
                value2: 'and',//this.$route.params.type
                value3: '精确',//this.$route.params.type
                value4: '精确',//this.$route.params.type
                input:'',//this.$route.params.input
                input1:'',
                select: '关键词',//this.$route.params.type
                select1: '关键词',//this.$route.params.type
                select2: 'and',//this.$route.params.type
                select3: '精确',//this.$route.params.type
                select4: '精确',//this.$route.params.type
                output_label:'关键词',//this.$route.params.type
                output_label1:'关键词',//this.$route.params.type
                output_acc1:1,
                output_acc2:1,
                label_type:1,
                label_type1:1,
                author_boolen:false,
                paper_boolen:false,
                order:1,
                s_year:1800,
                e_year:2020,
                is_range:0,
                boolop:'and',
                totalpage:1
            };
        },
        components: {
            NewNavigation
        },
        // mounted () {
        //     this.search_click();
        // },
        methods: {
            search_acc1(label){
                if(label==='精确'){
                    this.output_acc1=1
                }
                else{
                    this.output_acc1=0
                }
            },
            search_acc2(label){
                if(label==='精确'){
                    this.output_acc1=1
                }
                else{
                    this.output_acc1=0
                }
            },
            search_start(label){
                this.s_year=label
                console.log(label)
                console.log(this.s_year)
            },
            search_end(label){
                this.e_year=label
            },
            search_type(label){
                this.output_label=label;
                console.log(this.output_label);
            },
            search_type1(label){
                this.output_label1=label;
                console.log(this.output_label1);
            },
            search_op(label){
                this.boolop=label;
                console.log(this.boolop);
            },
            get_input(){
                this.input=this.$route.query.input
            },
            search_click() {
                if(this.input=='') {
                    this.$alert('关键词不能为空', 'tips.', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `action: ${ action }`
                            });
                        }
                    });
                }
                else if(this.input1==''){
                    this.$alert('关键词不能为空', 'tips.', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `action: ${ action }`
                            });
                        }
                    });
                }
                else if(this.output_label=='ISBN'){
                    if(this.output_label1=='作者'||this.output_label1=='领域'||this.output_label1=='机构'){
                        this.$alert('检索类型组合不匹配', 'tips.', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `action: ${ action }`
                                });
                            }
                        });

                    }
                    else{
                        this.label_type=9
                        this.author_boolen=false
                        this.paper_boolen=true
                        if(this.output_label1=='ISBN'){
                            this.label_type1=9
                        }
                        else if(this.output_label1=='标题'){
                            this.label_type1=4
                        }
                        else if(this.output_label1=='刊物'){
                            this.label_type1=5
                        }
                        else if(this.output_label1=='关键词'){
                            this.label_type1=6
                        }
                        else if(this.output_label1=='摘要'){
                            this.label_type1=7
                        }
                        else if(this.output_label1=='ISSN'){
                            this.label_type1=8
                        }
                        else if(this.output_label1=='DOI'){
                            this.label_type1=10
                        }
                        const loading = this.$loading({
                            lock: true,
                            text: 'Loading',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        })
                        this.order=1
                        this.$axios.post('/apis/search/multisearch',
                            {
                                type: this.label_type,
                                type1:this.label_type1,
                                content: this.input,
                                content1: this.input1,
                                is_acc: this.output_acc1,
                                is_acc1: this.output_acc2,
                                boolop:this.boolop,
                                order: this.order,
                                isasc: 0,
                                pagenumber:1
                            }).then(res => {
                            console.log(res)

                            this.papers_information=res.data.res
                            this.Author_information=res.data.res
                            this.totalnum=res.data.total
                            this.totalpage = Math.ceil( this.totalnum / 10)
                            loading.close()

                        }),
                            console.log(this.label_type)
                        console.log(this.input)
                        console.log(this.label_type1)
                        console.log(this.input1)
                    }
                }
                else if(this.output_label=='作者'){
                    if(this.output_label1=='标题'||
                        this.output_label1=='刊物'||
                        this.output_label1=='关键词'||
                        this.output_label1=='摘要'||
                        this.output_label1=='ISSN'||
                        this.output_label1=='ISBN'||
                        this.output_label1=='DOI'){
                        this.$alert('检索类型组合不匹配', 'tips.', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `action: ${ action }`
                                });
                            }
                        });

                    }
                    else {
                        this.label_type = 1
                        this.author_boolen = true
                        this.paper_boolen = false
                        if(this.output_label1=='作者'){
                            this.label_type1=1
                        }
                        else if(this.output_label1=='领域'){
                            this.label_type1=2
                        }
                        else if(this.output_label1=='机构'){
                            this.label_type1=3
                        }
                        const loading = this.$loading({
                            lock: true,
                            text: 'Loading',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        })
                        this.order=1
                        this.$axios.post('/apis/search/multisearch',
                            {
                                is_acc: this.output_acc1,
                                is_acc1: this.output_acc2,
                                type: this.label_type,
                                type1:this.label_type1,
                                content: this.input,
                                content1: this.input1,
                                boolop:this.boolop,
                                order: this.order,
                                isasc: 0,
                                pagenumber:1
                            }).then(res => {
                            console.log(res)

                            this.papers_information=res.data.res
                            this.Author_information=res.data.res
                            this.totalnum=res.data.total
                            this.totalpage = Math.ceil( this.totalnum / 10)
                            loading.close()

                        }),
                            console.log(this.label_type)
                        console.log(this.input)
                        console.log(this.label_type1)
                        console.log(this.input1)
                    }
                }
                else if(this.output_label=='领域'){
                    if(this.output_label1=='标题'||
                        this.output_label1=='刊物'||
                        this.output_label1=='关键词'||
                        this.output_label1=='摘要'||
                        this.output_label1=='ISSN'||
                        this.output_label1=='ISBN'||
                        this.output_label1=='DOI'){
                        this.$alert('检索类型组合不匹配', 'tips.', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `action: ${ action }`
                                });
                            }
                        });

                    }
                    else{
                        this.label_type=2
                        this.author_boolen=true
                        this.paper_boolen=false
                        if(this.output_label1=='作者'){
                            this.label_type1=1
                        }
                        else if(this.output_label1=='领域'){
                            this.label_type1=2
                        }
                        else if(this.output_label1=='机构'){
                            this.label_type1=3
                        }
                        const loading = this.$loading({
                            lock: true,
                            text: 'Loading',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        })
                        this.order=1
                        this.$axios.post('/apis/search/multisearch',
                            {
                                is_acc: this.output_acc1,
                                is_acc1: this.output_acc2,
                                type: this.label_type,
                                type1:this.label_type1,
                                content: this.input,
                                content1: this.input1,
                                boolop:this.boolop,
                                order: this.order,
                                isasc: 0,
                                pagenumber:1
                            }).then(res => {
                            console.log(res)

                            this.papers_information=res.data.res
                            this.Author_information=res.data.res
                            this.totalnum=res.data.total
                            this.totalpage = Math.ceil( this.totalnum / 10)
                            loading.close()

                        }),
                            console.log(this.label_type)
                        console.log(this.input)
                        console.log(this.label_type1)
                        console.log(this.input1)
                    }
                }
                else if(this.output_label=='机构'){
                    if(this.output_label1=='标题'||
                        this.output_label1=='刊物'||
                        this.output_label1=='关键词'||
                        this.output_label1=='摘要'||
                        this.output_label1=='ISSN'||
                        this.output_label1=='ISBN'||
                        this.output_label1=='DOI'){
                        this.$alert('检索类型组合不匹配', 'tips.', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `action: ${ action }`
                                });
                            }
                        });

                    }
                    else {
                        this.label_type = 3
                        this.author_boolen = true
                        this.paper_boolen = false
                        if(this.output_label1=='作者'){
                            this.label_type1=1
                        }
                        else if(this.output_label1=='领域'){
                            this.label_type1=2
                        }
                        else if(this.output_label1=='机构'){
                            this.label_type1=3
                        }
                        const loading = this.$loading({
                            lock: true,
                            text: 'Loading',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        })
                        this.order=1
                        this.$axios.post('/apis/search/multisearch',
                            {
                                is_acc: this.output_acc1,
                                is_acc1: this.output_acc2,
                                type: this.label_type,
                                type1:this.label_type1,
                                content: this.input,
                                content1: this.input1,
                                boolop:this.boolop,
                                order: this.order,
                                isasc: 0,
                                pagenumber:1
                            }).then(res => {
                            console.log(res)

                            this.papers_information=res.data.res
                            this.Author_information=res.data.res
                            this.totalnum=res.data.total
                            this.totalpage = Math.ceil( this.totalnum / 10)
                            loading.close()

                        }),
                            console.log(this.label_type)
                        console.log(this.input)
                        console.log(this.label_type1)
                        console.log(this.input1)
                    }
                }
                else if(this.output_label=='标题'){
                    if(this.output_label1=='作者'||this.output_label1=='领域'||this.output_label1=='机构'){
                        this.$alert('检索类型组合不匹配', 'tips.', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `action: ${ action }`
                                });
                            }
                        });

                    }
                    else{
                        this.label_type = 4
                        this.author_boolen = false
                        this.paper_boolen = true
                        if(this.output_label1=='ISBN'){
                            this.label_type1=9
                        }
                        else if(this.output_label1=='标题'){
                            this.label_type1=4
                        }
                        else if(this.output_label1=='刊物'){
                            this.label_type1=5
                        }
                        else if(this.output_label1=='关键词'){
                            this.label_type1=6
                        }
                        else if(this.output_label1=='摘要'){
                            this.label_type1=7
                        }
                        else if(this.output_label1=='ISSN'){
                            this.label_type1=8
                        }
                        else if(this.output_label1=='DOI'){
                            this.label_type1=10
                        }
                        const loading = this.$loading({
                            lock: true,
                            text: 'Loading',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        })
                        this.order=1
                        this.$axios.post('/apis/search/multisearch',
                            {
                                is_acc: this.output_acc1,
                                is_acc1: this.output_acc2,
                                type: this.label_type,
                                type1:this.label_type1,
                                content: this.input,
                                content1: this.input1,
                                boolop:this.boolop,
                                order: this.order,
                                isasc: 0,
                                pagenumber:1
                            }).then(res => {
                            console.log(res)

                            this.papers_information=res.data.res
                            this.Author_information=res.data.res
                            this.totalnum=res.data.total
                            this.totalpage = Math.ceil( this.totalnum / 10)
                            loading.close()

                        }),
                            console.log(this.label_type)
                        console.log(this.input)
                        console.log(this.label_type1)
                        console.log(this.input1)
                    }
                }
                else if(this.output_label=='刊物'){
                    if(this.output_label1=='作者'||this.output_label1=='领域'||this.output_label1=='机构'){
                        this.$alert('检索类型组合不匹配', 'tips.', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `action: ${ action }`
                                });
                            }
                        });

                    }
                    else {
                        this.label_type = 5
                        this.author_boolen = false
                        this.paper_boolen = true
                        if(this.output_label1=='ISBN'){
                            this.label_type1=9
                        }
                        else if(this.output_label1=='标题'){
                            this.label_type1=4
                        }
                        else if(this.output_label1=='刊物'){
                            this.label_type1=5
                        }
                        else if(this.output_label1=='关键词'){
                            this.label_type1=6
                        }
                        else if(this.output_label1=='摘要'){
                            this.label_type1=7
                        }
                        else if(this.output_label1=='ISSN'){
                            this.label_type1=8
                        }
                        else if(this.output_label1=='DOI'){
                            this.label_type1=10
                        }
                        const loading = this.$loading({
                            lock: true,
                            text: 'Loading',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        })
                        this.order=1
                        this.$axios.post('/apis/search/multisearch',
                            {
                                is_acc: this.output_acc1,
                                is_acc1: this.output_acc2,
                                type: this.label_type,
                                type1:this.label_type1,
                                content: this.input,
                                content1: this.input1,
                                boolop:this.boolop,
                                order: this.order,
                                isasc: 0,
                                pagenumber:1
                            }).then(res => {
                            console.log(res)

                            this.papers_information=res.data.res
                            this.Author_information=res.data.res
                            this.totalnum=res.data.total
                            this.totalpage = Math.ceil( this.totalnum / 10)
                            loading.close()

                        }),
                            console.log(this.label_type)
                        console.log(this.input)
                        console.log(this.label_type1)
                        console.log(this.input1)
                    }
                }
                else if(this.output_label=='关键词'){
                    if(this.output_label1=='作者'||this.output_label1=='领域'||this.output_label1=='机构'){
                        this.$alert('检索类型组合不匹配', 'tips.', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `action: ${ action }`
                                });
                            }
                        });

                    }
                    else {
                        this.label_type = 6
                        this.author_boolen = false
                        this.paper_boolen = true
                        if(this.output_label1=='ISBN'){
                            this.label_type1=9
                        }
                        else if(this.output_label1=='标题'){
                            this.label_type1=4
                        }
                        else if(this.output_label1=='刊物'){
                            this.label_type1=5
                        }
                        else if(this.output_label1=='关键词'){
                            this.label_type1=6
                        }
                        else if(this.output_label1=='摘要'){
                            this.label_type1=7
                        }
                        else if(this.output_label1=='ISSN'){
                            this.label_type1=8
                        }
                        else if(this.output_label1=='DOI'){
                            this.label_type1=10
                        }
                        const loading = this.$loading({
                            lock: true,
                            text: 'Loading',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        })
                        this.order=1
                        this.$axios.post('/apis/search/multisearch',
                            {
                                is_acc: this.output_acc1,
                                is_acc1: this.output_acc2,
                                type: this.label_type,
                                type1:this.label_type1,
                                content: this.input,
                                content1: this.input1,
                                boolop:this.boolop,
                                order: this.order,
                                isasc: 0,
                                pagenumber:1
                            }).then(res => {
                            console.log(res)

                            this.papers_information=res.data.res
                            this.Author_information=res.data.res
                            this.totalnum=res.data.total
                            this.totalpage = Math.ceil( this.totalnum / 10)
                            loading.close()

                        }),
                            console.log(this.label_type)
                        console.log(this.input)
                        console.log(this.label_type1)
                        console.log(this.input1)
                    }
                }
                else if(this.output_label=='摘要'){
                    if(this.output_label1=='作者'||this.output_label1=='领域'||this.output_label1=='机构'){
                        this.$alert('检索类型组合不匹配', 'tips.', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `action: ${ action }`
                                });
                            }
                        });

                    }
                    else {
                        this.label_type = 7
                        this.author_boolen = false
                        this.paper_boolen = true
                        if(this.output_label1=='ISBN'){
                            this.label_type1=9
                        }
                        else if(this.output_label1=='标题'){
                            this.label_type1=4
                        }
                        else if(this.output_label1=='刊物'){
                            this.label_type1=5
                        }
                        else if(this.output_label1=='关键词'){
                            this.label_type1=6
                        }
                        else if(this.output_label1=='摘要'){
                            this.label_type1=7
                        }
                        else if(this.output_label1=='ISSN'){
                            this.label_type1=8
                        }
                        else if(this.output_label1=='DOI'){
                            this.label_type1=10
                        }
                        const loading = this.$loading({
                            lock: true,
                            text: 'Loading',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        })
                        this.order=1
                        this.$axios.post('/apis/search/multisearch',
                            {
                                is_acc: this.output_acc1,
                                is_acc1: this.output_acc2,
                                type: this.label_type,
                                type1:this.label_type1,
                                content: this.input,
                                content1: this.input1,
                                boolop:this.boolop,
                                order: this.order,
                                isasc: 0,
                                pagenumber:1
                            }).then(res => {
                            console.log(res)

                            this.papers_information=res.data.res
                            this.Author_information=res.data.res
                            this.totalnum=res.data.total
                            this.totalpage = Math.ceil( this.totalnum / 10)
                            loading.close()

                        }),
                            console.log(this.label_type)
                        console.log(this.input)
                        console.log(this.label_type1)
                        console.log(this.input1)
                    }
                }
                else if(this.output_label=='ISSN'){
                    if(this.output_label1=='作者'||this.output_label1=='领域'||this.output_label1=='机构'){
                        this.$alert('检索类型组合不匹配', 'tips.', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `action: ${ action }`
                                });
                            }
                        });

                    }
                    else {
                        this.label_type = 8
                        this.author_boolen = false
                        this.paper_boolen = true
                        if(this.output_label1=='ISBN'){
                            this.label_type1=9
                        }
                        else if(this.output_label1=='标题'){
                            this.label_type1=4
                        }
                        else if(this.output_label1=='刊物'){
                            this.label_type1=5
                        }
                        else if(this.output_label1=='关键词'){
                            this.label_type1=6
                        }
                        else if(this.output_label1=='摘要'){
                            this.label_type1=7
                        }
                        else if(this.output_label1=='ISSN'){
                            this.label_type1=8
                        }
                        else if(this.output_label1=='DOI'){
                            this.label_type1=10
                        }
                        const loading = this.$loading({
                            lock: true,
                            text: 'Loading',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        })
                        this.order=1
                        this.$axios.post('/apis/search/multisearch',
                            {
                                is_acc: this.output_acc1,
                                is_acc1: this.output_acc2,
                                type: this.label_type,
                                type1:this.label_type1,
                                content: this.input,
                                content1: this.input1,
                                boolop:this.boolop,
                                order: this.order,
                                isasc: 0,
                                pagenumber:1
                            }).then(res => {
                            console.log(res)

                            this.papers_information=res.data.res
                            this.Author_information=res.data.res
                            this.totalnum=res.data.total
                            this.totalpage = Math.ceil( this.totalnum / 10)
                            loading.close()

                        }),
                            console.log(this.label_type)
                        console.log(this.input)
                        console.log(this.label_type1)
                        console.log(this.input1)
                    }
                }
                else if(this.output_label=='DOI'){
                    if(this.output_label1=='作者'||this.output_label1=='领域'||this.output_label1=='机构'){
                        this.$alert('检索类型组合不匹配', 'tips.', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `action: ${ action }`
                                });
                            }
                        });

                    }
                    else {
                        this.label_type = 10
                        this.author_boolen = false
                        this.paper_boolen = true
                        if(this.output_label1=='ISBN'){
                            this.label_type1=9
                        }
                        else if(this.output_label1=='标题'){
                            this.label_type1=4
                        }
                        else if(this.output_label1=='刊物'){
                            this.label_type1=5
                        }
                        else if(this.output_label1=='关键词'){
                            this.label_type1=6
                        }
                        else if(this.output_label1=='摘要'){
                            this.label_type1=7
                        }
                        else if(this.output_label1=='ISSN'){
                            this.label_type1=8
                        }
                        else if(this.output_label1=='DOI'){
                            this.label_type1=10
                        }
                        const loading = this.$loading({
                            lock: true,
                            text: 'Loading',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        })
                        this.order=1
                        this.$axios.post('/apis/search/multisearch',
                            {
                                is_acc: this.output_acc1,
                                is_acc1: this.output_acc2,
                                type: this.label_type,
                                type1:this.label_type1,
                                content: this.input,
                                content1: this.input1,
                                boolop:this.boolop,
                                order: this.order,
                                isasc: 0,
                                pagenumber:1
                            }).then(res => {
                            console.log(res)

                            this.papers_information=res.data.res
                            this.Author_information=res.data.res
                            this.totalnum=res.data.total
                            this.totalpage = Math.ceil( this.totalnum / 10)
                            loading.close()

                        }),
                            console.log(this.label_type)
                            console.log(this.input)
                            console.log(this.label_type1)
                            console.log(this.input1)
                    }
                }
            },
            jumpToAouther(Auther_id){
                this.$router.push({
                    path:'/Author',
                    query: {
                        author_id: Auther_id
                    }
                })
            },
            jumpToPaper(Paper_id){
                this.$router.push({
                    path:'/paper',
                    query: {
                        paper_id: Paper_id
                    }
                })
            },
            search1(){
                if(this.search1_ascending == 1){
                    this.search1_ascending=0
                }
                else{
                    this.search1_ascending=1
                }
                this.order=1
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                this.$axios.post('/apis/search/multisearch',
                    {
                        is_acc: this.output_acc1,
                        is_acc1: this.output_acc2,
                        type: this.label_type,
                        type1:this.label_type1,
                        content: this.input,
                        content1: this.input1,
                        boolop:this.boolop,
                        order: this.order,
                        isasc: this.search1_ascending,
                        isrange:this.is_range,
                        lowrange:this.start_year,
                        highrange:this.end_year,
                        pagenumber:1
                    }).then(res => {
                        console.log(res)
                        this.papers_information=res.data.res
                        this.Author_information=res.data.res
                        this.totalnum=res.data.total
                    this.totalpage = Math.ceil( this.totalnum / 10)
                        loading.close()

                    }
                )
                // this.search1_ascending=!this.search1_ascending
            },
            search2(){
                if(this.search2_ascending == 1){
                    this.search2_ascending=0
                }
                else{
                    this.search2_ascending=1
                }
                this.order=4
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                this.$axios.post('/apis/search/multisearch',
                    {
                        is_acc: this.output_acc1,
                        is_acc1: this.output_acc2,
                        type: this.label_type,
                        type1:this.label_type1,
                        content: this.input,
                        content1: this.input1,
                        boolop:this.boolop,
                        order: this.order,
                        isasc: this.search2_ascending,
                        isrange:this.is_range,
                        lowrange:this.start_year,
                        highrange:this.end_year,
                        pagenumber:1
                    }).then(res => {
                        console.log(res)

                        this.papers_information=res.data.res
                        this.Author_information=res.data.res
                        this.totalnum=res.data.total
                    this.totalpage = Math.ceil( this.totalnum / 10)
                        loading.close()

                    }
                )
                // this.search2_ascending=!this.search2_ascending
            },
            search3(){if(this.search3_ascending == 1){
                this.search3_ascending=0
            }
            else{
                this.search3_ascending=1
            }
                this.order=2
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                this.$axios.post('/apis/search/multisearch',
                    {
                        is_acc: this.output_acc1,
                        is_acc1: this.output_acc2,
                        type: this.label_type,
                        type1:this.label_type1,
                        content: this.input,
                        content1: this.input1,
                        boolop:this.boolop,
                        order: this.order,
                        isasc: this.search3_ascending,
                        isrange:this.is_range,
                        lowrange:this.start_year,
                        highrange:this.end_year,
                        pagenumber:1
                    }).then(res => {
                        console.log(res)

                        this.papers_information=res.data.res
                        this.Author_information=res.data.res
                        this.totalnum=res.data.total
                    this.totalpage = Math.ceil( this.totalnum / 10)
                        loading.close()

                    }
                )
                // this.search3_ascending=!this.search3_ascending
            },
            search4(){
                if(this.search4_ascending == 1){
                    this.search4_ascending=0
                }
                else{
                    this.search4_ascending=1
                }
                this.order=3
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                this.$axios.post('/apis/search/multisearch',
                    {
                        is_acc: this.output_acc1,
                        is_acc1: this.output_acc2,
                        type: this.label_type,
                        type1:this.label_type1,
                        content: this.input,
                        content1: this.input1,
                        boolop:this.boolop,
                        order: this.order,
                        isasc: this.search4_ascending,
                        isrange:this.is_range,
                        lowrange:this.start_year,
                        highrange:this.end_year,
                        pagenumber:1
                    }).then(res => {
                        console.log(res)

                        this.papers_information=res.data.res
                        this.Author_information=res.data.res
                        this.totalnum=res.data.total
                    this.totalpage = Math.ceil( this.totalnum / 10)
                        loading.close()

                    }
                )
                // this.search4_ascending=!this.search4_ascending
            },
            search5(){
                if(this.search5_ascending == 1){
                    this.search5_ascending=0
                }
                else{
                    this.search5_ascending=1
                }
                this.order=1
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                this.$axios.post('/apis/search/multisearch',
                    {
                        is_acc: this.output_acc1,
                        is_acc1: this.output_acc2,
                        type: this.label_type,
                        type1:this.label_type1,
                        content: this.input,
                        content1: this.input1,
                        boolop:this.boolop,
                        order: this.order,
                        isasc: this.search5_ascending,
                        israng:this.is_range,
                        lowrange:this.start_year,
                        highrange:this.end_year,
                        pagenumber:1
                    }).then(res => {
                        console.log(res)

                        this.papers_information=res.data.res
                        this.Author_information=res.data.res
                        this.totalnum=res.data.total
                    this.totalpage = Math.ceil( this.totalnum / 10)
                        loading.close()

                    }
                )
                // this.search5_ascending=!this.search5_ascending
            },
            search6(){
                if(this.search6_ascending == 1){
                    this.search6_ascending=0
                }
                else{
                    this.search6_ascending=1
                }
                this.order=5
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                this.$axios.post('/apis/search/multisearch',
                    {
                        is_acc: this.output_acc1,
                        is_acc1: this.output_acc2,
                        type: this.label_type,
                        type1:this.label_type1,
                        content: this.input,
                        content1: this.input1,
                        boolop:this.boolop,
                        order: this.order,
                        isasc: this.search6_ascending,
                        isrange:this.is_range,
                        lowrange:this.start_year,
                        highrange:this.end_year,
                        pagenumber:1
                    }).then(res => {
                        console.log(res)

                        this.papers_information=res.data.res
                        this.Author_information=res.data.res
                        this.totalnum=res.data.total
                    this.totalpage = Math.ceil( this.totalnum / 10)
                        loading.close()

                    }
                )
                // this.search6_ascending=!this.search6_ascending
            },
            search7(){
                if(this.search7_ascending == 1){
                    this.search7_ascending=0
                }
                else{
                    this.search7_ascending=1
                }
                this.order=6
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                this.$axios.post('/apis/search/multisearch',
                    {
                        is_acc: this.output_acc1,
                        is_acc1: this.output_acc2,
                        type: this.label_type,
                        type1:this.label_type1,
                        content: this.input,
                        content1: this.input1,
                        boolop:this.boolop,
                        order: this.order,
                        isasc: this.search7_ascending,
                        isrange:this.is_range,
                        lowrange:this.start_year,
                        highrange:this.end_year,
                        pagenumber:1
                    }).then(res => {
                        console.log(res)

                        this.papers_information=res.data.res
                        this.Author_information=res.data.res
                        this.totalnum=res.data.total
                    this.totalpage = Math.ceil( this.totalnum / 10)
                        loading.close()

                    }
                )
                // this.search7_ascending=!this.search7_ascending
            },

            search8(){
                if(this.s_year>this.e_year) {
                    this.$alert('年限选择无效', 'tips.', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `action: ${ action }`
                            });
                        }
                    });
                }
                else{
                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    })
                    this.start_year=this.s_year
                    this.end_year=this.e_year
                    console.log(this.s_year)
                    console.log(this.e_year)
                    this.is_range=1
                    this.$axios.post('/apis/search/multisearch',
                        {
                            is_acc: this.output_acc1,
                            is_acc1: this.output_acc2,
                            type: this.label_type,
                            type1:this.label_type1,
                            content: this.input,
                            content1: this.input1,
                            boolop:this.boolop,
                            order: this.order,
                            isasc: 0,
                            isrange:this.is_range,
                            lowrange:this.start_year,
                            highrange:this.end_year,
                            pagenumber:1
                        }).then(res => {
                        console.log(res)
                        this.papers_information=res.data.res
                        this.Author_information=res.data.res
                        this.totalnum=res.data.total
                        this.totalpage = Math.ceil( this.totalnum / 10)
                        loading.close()
                    })
                }
            },

            handleCurrentChange(val) {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                this.$axios.post('/apis/search/multisearch',
                    {
                        is_acc: this.output_acc1,
                        is_acc1: this.output_acc2,
                        type: this.label_type,
                        type1:this.label_type1,
                        content: this.input,
                        content1: this.input1,
                        boolop:this.boolop,
                        order: this.order,
                        isasc: 0,
                        isrange:this.is_range,
                        lowrange:this.start_year,
                        highrange:this.end_year,
                        pagenumber:val
                    }).then(res => {
                    console.log(res)

                    this.papers_information=res.data.res
                    this.Author_information=res.data.res
                    this.totalnum=res.data.total
                    this.totalpage = Math.ceil( this.totalnum / 10)
                    loading.close()

                })
                this.current_page = val
            },

        }
    }
</script>

<style scoped>
    .header{
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 1000;
    }

    .object_select{
        width: 130px;
    }
    .grid-content {
        min-height: 36px;
    }

</style>
<style>
    body {
        background-image: url('../../assets/image/user/image/login-back.png');
        background-attachment: fixed;
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
        color: black;
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover{
        color: #f9ae8f;
    }
</style>