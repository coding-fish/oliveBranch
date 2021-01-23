<template>
    <div class="wrapper">
        <new-navigation></new-navigation>
        <section>
            <main style="text-align: center">

                <div style="margin-top: 20px">
                    <keep-alive>
                        <el-input placeholder="请输入关键词" v-model="input" class="input-with-select" style="width: 66.6% ">
                            <el-select v-model="select" slot="prepend" placeholder="请选择" class="object_select"
                                       style="width: 140px;">
                                <el-option v-for="item in subject" :key="item.value" :label="item.label"
                                           :value="item.value">
                                    <div @click="search_type(item.label)">{{ item.label }}</div>
                                    <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
                                </el-option>
                            </el-select>
                            <el-button slot="append" icon="el-icon-search" @click="search_click()"
                                       v-loading.fullscreen.lock="fullscreenLoading"></el-button>
                        </el-input>
                    </keep-alive>
                </div>


                <el-row>
                    <el-col :span="24">
                        <div class="grid-content bg-purple-dark"></div>
                    </el-col>
                </el-row>

                <el-row v-if="paper_boolen || author_boolen">
                    <el-col :span="4">
                        <div style="height: 40px"></div>
                    </el-col>
                    <el-col :span="16">
                        <div class="search_result">
                            <el-tabs type="border-card"
                                     style="background-color: rgba(240,241,244); border-radius: 10px margin-top: 20%">
                                <el-tab-pane label="专家" v-if="author_boolen">
                                    <el-col style="margin-top: 1rem; text-align: left">
                                        <el-button @click="search1()">综合</el-button>
                                        <el-button @click="search2()">发表论文数</el-button>
                                        <el-button @click="search3()">h指数</el-button>
                                        <el-button @click="search4()">被引用数</el-button>
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
                                        <el-col :span="4">
                                            <div class="grid-content"></div>
                                        </el-col>
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
                                        <el-col :span="4">
                                            <div class="grid-content"></div>
                                        </el-col>
                                    </el-footer>

                                </el-tab-pane>

                                <el-tab-pane label="论文" v-if="paper_boolen">
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


                                        <el-form :inline="true" :model="formInline" class="demo-form-inline"
                                                 style="margin-top:2rem">
                                            <el-form-item label="起始年限">
                                                <!-- <el-select v-model="formInline.start" placeholder="起始年限">
                                                    <el-option v-for="item in start" :key="item.value" :label="item.label" :value="item.value" >
                                                    <div @click="search_start(item.label)">{{ item.label }}</div>
                                                    </el-option>
                                                </el-select> -->
                                                <el-input-number v-model="min_num" @change="search_start(min_num)"
                                                                 :min="1800" :max="2020" label="起始年限"></el-input-number>
                                            </el-form-item>
                                            <el-form-item label="结束年限">
                                                <!-- <el-select v-model="formInline.end" placeholder="结束年限">
                                                    <el-option v-for="item in start" :key="item.value" :label="item.label" :value="item.value" >
                                                    <div @click="search_end(item.label)">{{ item.label }}</div>
                                                    </el-option>
                                                </el-select> -->
                                                <el-input-number v-model="max_num" @change="search_end(max_num)"
                                                                 :min="1800" :max="2020" label="结束年限"></el-input-number>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-button @click="search8()">按发表年限筛选</el-button>
                                            </el-form-item>
                                        </el-form>
                                        <el-col>
                                            <span v-if="totalnum!==10000">共找到{{totalnum}}条结果   当前{{current_page}}/{{totalpage}}</span>
                                            <span v-else>共找到超过10000条结果</span>
                                        </el-col>
                                        <!-- <div class="block">
                                            <el-cascader
                                            v-model="value_year"
                                            :options="options"
                                            clearable
                                            @change="change_year"></el-cascader>
                                             <el-button @click="search8()">按发表年限筛选</el-button>
                                        </div> -->
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
                                                             @click="jumpToAouther(author.id)">{{author.name}}
                                                    </el-link>
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
                                        <el-col :span="4">
                                            <div class="grid-content"></div>
                                        </el-col>
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
                                        <el-col :span="4">
                                            <div class="grid-content"></div>
                                        </el-col>
                                    </el-footer>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div style="height: 40px"></div>
                    </el-col>
                </el-row>

            </main>
        </section>
    </div>
</template>

<script>
    import NewNavigation from '../navigatorandsearch/NewNavigation';

    export default {
        name: 'Searching',
        data() {
            return {
                min_num: 1800,
                max_num: 2020,
                formInline: {
                    start: '',
                    end: ''
                },
                start: [{
                    value: '选项1', label: '1800'
                }, {
                    value: '选项2', label: '1801'
                }, {
                    value: '选项3', label: '1802'
                }, {
                    value: '选项4', label: '1803'
                }, {
                    value: '选项5', label: '1804'
                }, {
                    value: '选项6', label: '1805'
                }, {
                    value: '选项7', label: '1806'
                }, {
                    value: '选项8', label: '1807'
                }, {
                    value: '选项9', label: '1998'
                }, {
                    value: '选项10', label: '1999'
                }],
                end: [{
                    value: '选项1', label: '1990'
                }, {
                    value: '选项2', label: '1991'
                }, {
                    value: '选项3', label: '1992'
                }, {
                    value: '选项4', label: '1993'
                }, {
                    value: '选项5', label: '1994'
                }, {
                    value: '选项6', label: '1995'
                }, {
                    value: '选项7', label: '1996'
                }, {
                    value: '选项8', label: '1997'
                }, {
                    value: '选项9', label: '1998'
                }, {
                    value: '选项10', label: '1999'
                }],

                search1_ascending: 1,//默认升序排列
                search2_ascending: 1,//默认升序排列
                search3_ascending: 1,//默认升序排列
                search4_ascending: 1,//默认升序排列
                search5_ascending: 1,//默认升序排列
                search6_ascending: 1,//默认升序排列
                search7_ascending: 1,//默认升序排列

                //   pickerOptions: {
                //   shortcuts: [{
                //     text: '最近一周',
                //     onClick(picker) {
                //       const end = new Date();
                //       const start = new Date();
                //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                //       picker.$emit('pick', [start, end]);
                //     }
                //   }, {
                //     text: '最近一个月',
                //     onClick(picker) {
                //       const end = new Date();
                //       const start = new Date();
                //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                //       picker.$emit('pick', [start, end]);
                //     }
                //   }, {
                //     text: '最近三个月',
                //     onClick(picker) {
                //       const end = new Date();
                //       const start = new Date();
                //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                //       picker.$emit('pick', [start, end]);
                //     }
                //   }]
                // },
                value1: '',
                value2: '',
                collapse: false,
                pageSize: 10,
                current_page: 1,
                pagenum: 10,
                totalnum: 10,
                Author_information: [
                    //     {
                    //     id:"",
                    //     name:"",
                    //     h_index:"",//h指数
                    //     n_pubs:"",//发表论文数
                    //     tags:[{
                    //         t:"",//关键词内容
                    //         w:""//相关论文数量
                    //     }],//相关领域
                    //     n_citation:"",//被引数
                    //     // pubs:[{
                    //     //     i:"",//论文id
                    //     //     r:""//作者排名
                    //     // }],//论文
                    //     orgs:""//工作单位
                    // }
                ],
                //   }, {
                //     id:155,
                //     name:"我吃西红柿",
                //     h_index:"16",
                //     n_pubs:"3",
                //     tags:[{
                //         t:"计算机",
                //         w:"100"
                //     }, {
                //         t:"生物",
                //         w:"50"
                //     }],
                //     n_citation:"1065",
                //     orgs:"起点中文网"
                //   }, {
                //     id:156,
                //     name:"我不吃西红柿",
                //     h_index:"20",
                //     n_pubs:"39",
                //     tags:[{
                //         t:"计算机",
                //         w:"100"
                //     }, {
                //         t:"生物",
                //         w:"50"
                //     }],
                //     n_citation:"1065",
                //     orgs:"终点中文网"
                //   },],
                papers_information: [
                    //     {
                    //     id:"",
                    //     title:"",
                    //     authors:{
                    //         id:"",
                    //         name:""
                    //     },
                    //     venue_name:"",//刊物名
                    //     year:"",//发表年
                    //     n_citation:"",//被引数
                    //     url:""//相关链接
                    // }
                ],
                //   }, {
                //     id:"1",
                //     title:"Semantic Wikipedia",
                //     authors:[{
                //         id:"ak",
                //         name:"Max V"
                //     }, {
                //         id:"ak1",
                //         name:"Markus Kr"
                //     }],
                //     venue_name:"WWW",//刊物名
                //     year:"2006",//发表年
                //     n_citation:"639",//被引数
                //     url:[{
                //        url_n:"http://doi.acm.org/10.1145/1135777.1135863"//相关链接
                //     }]
                //   }, {
                //     id:"2",
                //     title:"Parsing",
                //     authors:[{
                //         id:"ak",
                //         name:"Ralph Grishman"
                //     }],
                //     venue_name:"ACL",//刊物名
                //     year:"1981",//发表年
                //     n_citation:"11",//被引数
                //     url:[{
                //         url_n:"http://aclweb.org/anthology-new/P/P81/P81-1022.pdf"
                //     }, {
                //          url_n:"https://static.aminer.org/pdf/20160902/aclanthology/index.txt"
                //     }]
                //   }],
                subject: [{
                    value: '选项1', label: '作者'
                }, {
                    value: '选项2', label: '领域'
                }, {
                    value: '选项3', label: '机构'
                }, {
                    value: '选项4', label: '标题'
                }, {
                    value: '选项5', label: '刊物'
                }, {
                    value: '选项6', label: '关键词'
                }, {
                    value: '选项7', label: '摘要'
                }, {
                    value: '选项8', label: 'ISSN'
                }, {
                    value: '选项9', label: 'ISBN'
                }, {
                    value: '选项10', label: 'DOI'
                }],
                value: this.$route.query.type,//this.$route.params.type
                input: this.$route.query.input,//this.$route.params.input
                select: this.$route.query.type,//this.$route.params.type
                output_label: this.$route.query.type,//this.$route.params.type
                label_type: 1,
                author_boolen: false,
                paper_boolen: false,
                order: 1,
                // start_year:1990,
                // end_year:2020,
                s_year: 1800,
                e_year: 2020,
                is_range: 0,
                totalpage: 0
            };
        },
        components: {
            NewNavigation
        },
        mounted() {
            this.search_click();
        },
        methods: {
            search_start(label) {
                this.s_year = label
                console.log(label)
                console.log(this.s_year)
            },
            search_end(label) {
                this.e_year = label
            },
            search_type(label) {
                this.output_label = label;
                console.log(this.output_label);
            },
            get_input() {
                this.input = this.$route.query.input
            },
            search_click() {
                if (this.input == '') {
                    this.$alert('关键词不能为空', 'tips.', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `action: ${action}`
                            });
                        }
                    });
                } else {
                    this.$router.push({
                        path: '/Searching',
                        query: {
                            input: this.input,
                            type: this.output_label
                        }
                    })
                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    })
                    if (this.output_label == 'ISBN') {
                        this.label_type = 9
                        this.author_boolen = false
                        this.paper_boolen = true
                    } else if (this.output_label == '作者') {
                        this.label_type = 1
                        this.author_boolen = true
                        this.paper_boolen = false
                    } else if (this.output_label == '领域') {
                        this.label_type = 2
                        this.author_boolen = true
                        this.paper_boolen = false
                    } else if (this.output_label == '机构') {
                        this.label_type = 3
                        this.author_boolen = true
                        this.paper_boolen = false
                    } else if (this.output_label == '标题') {
                        this.label_type = 4
                        this.author_boolen = false
                        this.paper_boolen = true
                    } else if (this.output_label == '刊物') {
                        this.label_type = 5
                        this.author_boolen = false
                        this.paper_boolen = true
                    } else if (this.output_label == '关键词') {
                        this.label_type = 6
                        this.author_boolen = false
                        this.paper_boolen = true
                    } else if (this.output_label == '摘要') {
                        this.label_type = 7
                        this.author_boolen = false
                        this.paper_boolen = true
                    } else if (this.output_label == 'ISSN') {
                        this.label_type = 8
                        this.author_boolen = false
                        this.paper_boolen = true
                    } else if (this.output_label == 'DOI') {
                        this.label_type = 10
                        this.author_boolen = false
                        this.paper_boolen = true
                    }
                    this.order = 1
                    this.$axios.post('/apis/search/basicsearch',
                        {
                            type: this.label_type,
                            content: this.input,
                            order: this.order,
                            isasc: 0,
                            pagenumber: 1
                        }).then(res => {
                        console.log(res)

                        this.papers_information = res.data.res
                        this.Author_information = res.data.res
                        this.totalnum = res.data.total
                        this.totalpage = Math.ceil(this.totalnum / 10)
                        loading.close()

                    }),
                        console.log(this.label_type)
                    console.log(this.input)
                }
            },
            jumpToAouther(Auther_id) {
                this.$router.push({
                    path: '/Author',
                    query: {
                        author_id: Auther_id
                    }
                })
            },
            jumpToPaper(Paper_id) {
                this.$router.push({
                    path: '/paper',
                    query: {
                        paper_id: Paper_id
                    }
                })
            },
            search1() {
                if (this.search1_ascending == 1) {
                    this.search1_ascending = 0
                } else {
                    this.search1_ascending = 1
                }
                this.order = 1
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                this.$axios.post('/apis/search/basicsearch',
                    {
                        type: this.label_type,
                        content: this.input,
                        order: this.order,
                        isasc: this.search1_ascending,
                        isrange: this.is_range,
                        lowrange: this.start_year,
                        highrange: this.end_year,
                        pagenumber: 1
                    }).then(res => {
                        console.log(res)
                        this.papers_information = res.data.res
                        this.Author_information = res.data.res
                        this.totalnum = res.data.total
                        this.totalpage = Math.ceil(this.totalnum / 10)
                        loading.close()

                    }
                )
                // this.search1_ascending=!this.search1_ascending
            },
            search2() {
                if (this.search2_ascending == 1) {
                    this.search2_ascending = 0
                } else {
                    this.search2_ascending = 1
                }
                this.order = 4
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                this.$axios.post('/apis/search/basicsearch',
                    {
                        type: this.label_type,
                        content: this.input,
                        order: this.order,
                        isasc: this.search2_ascending,
                        isrange: this.is_range,
                        lowrange: this.start_year,
                        highrange: this.end_year,
                        pagenumber: 1
                    }).then(res => {
                        console.log(res)

                        this.papers_information = res.data.res
                        this.Author_information = res.data.res
                        this.totalnum = res.data.total
                        this.totalpage = Math.ceil(this.totalnum / 10)
                        loading.close()

                    }
                )
                // this.search2_ascending=!this.search2_ascending
            },
            search3() {
                if (this.search3_ascending == 1) {
                    this.search3_ascending = 0
                } else {
                    this.search3_ascending = 1
                }
                this.order = 2
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                this.$axios.post('/apis/search/basicsearch',
                    {
                        type: this.label_type,
                        content: this.input,
                        order: this.order,
                        isasc: this.search3_ascending,
                        isrange: this.is_range,
                        lowrange: this.start_year,
                        highrange: this.end_year,
                        pagenumber: 1
                    }).then(res => {
                        console.log(res)

                        this.papers_information = res.data.res
                        this.Author_information = res.data.res
                        this.totalnum = res.data.total
                        this.totalpage = Math.ceil(this.totalnum / 10)
                        loading.close()

                    }
                )
                // this.search3_ascending=!this.search3_ascending
            },
            search4() {
                if (this.search4_ascending == 1) {
                    this.search4_ascending = 0
                } else {
                    this.search4_ascending = 1
                }
                this.order = 3
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                this.$axios.post('/apis/search/basicsearch',
                    {
                        type: this.label_type,
                        content: this.input,
                        order: this.order,
                        isasc: this.search4_ascending,
                        isrange: this.is_range,
                        lowrange: this.start_year,
                        highrange: this.end_year,
                        pagenumber: 1
                    }).then(res => {
                        console.log(res)

                        this.papers_information = res.data.res
                        this.Author_information = res.data.res
                        this.totalnum = res.data.total
                        this.totalpage = Math.ceil(this.totalnum / 10)
                        loading.close()

                    }
                )
                // this.search4_ascending=!this.search4_ascending
            },
            search5() {
                if (this.search5_ascending == 1) {
                    this.search5_ascending = 0
                } else {
                    this.search5_ascending = 1
                }
                this.order = 1
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                this.$axios.post('/apis/search/basicsearch',
                    {
                        type: this.label_type,
                        content: this.input,
                        order: this.order,
                        isasc: this.search5_ascending,
                        israng: this.is_range,
                        lowrange: this.start_year,
                        highrange: this.end_year,
                        pagenumber: 1
                    }).then(res => {
                        console.log(res)

                        this.papers_information = res.data.res
                        this.Author_information = res.data.res
                        this.totalnum = res.data.total
                        this.totalpage = Math.ceil(this.totalnum / 10)
                        loading.close()

                    }
                )
                // this.search5_ascending=!this.search5_ascending
            },
            search6() {
                if (this.search6_ascending == 1) {
                    this.search6_ascending = 0
                } else {
                    this.search6_ascending = 1
                }
                this.order = 5
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                this.$axios.post('/apis/search/basicsearch',
                    {
                        type: this.label_type,
                        content: this.input,
                        order: this.order,
                        isasc: this.search6_ascending,
                        isrange: this.is_range,
                        lowrange: this.start_year,
                        highrange: this.end_year,
                        pagenumber: 1
                    }).then(res => {
                        console.log(res)

                        this.papers_information = res.data.res
                        this.Author_information = res.data.res
                        this.totalnum = res.data.total
                        this.totalpage = Math.ceil(this.totalnum / 10)
                        loading.close()

                    }
                )
                // this.search6_ascending=!this.search6_ascending
            },
            search7() {
                if (this.search7_ascending == 1) {
                    this.search7_ascending = 0
                } else {
                    this.search7_ascending = 1
                }
                this.order = 6
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                this.$axios.post('/apis/search/basicsearch',
                    {
                        type: this.label_type,
                        content: this.input,
                        order: this.order,
                        isasc: this.search7_ascending,
                        isrange: this.is_range,
                        lowrange: this.start_year,
                        highrange: this.end_year,
                        pagenumber: 1
                    }).then(res => {
                        console.log(res)

                        this.papers_information = res.data.res
                        this.Author_information = res.data.res
                        this.totalnum = res.data.total
                        this.totalpage = Math.ceil(this.totalnum / 10)
                        loading.close()

                    }
                )
                // this.search7_ascending=!this.search7_ascending
            },

            search8() {
                if (this.s_year > this.e_year) {
                    this.$alert('年限选择无效', 'tips.', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `action: ${action}`
                            });
                        }
                    });
                } else {
                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    })
                    this.start_year = this.s_year
                    this.end_year = this.e_year
                    console.log(this.s_year)
                    console.log(this.e_year)
                    this.is_range = 1
                    this.$axios.post('/apis/search/basicsearch',
                        {
                            type: this.label_type,
                            content: this.input,
                            order: this.order,
                            isasc: 0,
                            isrange: this.is_range,
                            lowrange: this.start_year,
                            highrange: this.end_year,
                            pagenumber: 1
                        }).then(res => {
                        console.log(res)
                        this.papers_information = res.data.res
                        this.Author_information = res.data.res
                        this.totalnum = res.data.total
                        this.totalpage = Math.ceil(this.totalnum / 10)
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
                this.$axios.post('/apis/search/basicsearch',
                    {
                        type: this.label_type,
                        content: this.input,
                        order: this.order,
                        isasc: 0,
                        isrange: this.is_range,
                        lowrange: this.start_year,
                        highrange: this.end_year,
                        pagenumber: val
                    }).then(res => {
                    console.log(res)

                    this.papers_information = res.data.res
                    this.Author_information = res.data.res
                    this.totalnum = res.data.total
                    this.totalpage = Math.ceil(this.totalnum / 10)
                    loading.close()

                })
                this.current_page = val
            }

        }
    }
</script>

<style scoped>
    .header {
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 1000;
    }

    .object_select {
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

    .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
        color: black;
    }

    .el-tabs--border-card > .el-tabs__header .el-tabs__item:not(.is-disabled):hover {
        color: #f9ae8f;
    }
</style>