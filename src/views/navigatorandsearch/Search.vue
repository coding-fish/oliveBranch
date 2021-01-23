<template>

    <div>
        <new-navigation></new-navigation>
        <el-container>
            <el-main style="text-align: center;">
                <div style="height: 280px;">
                    <img src="../../assets/logoT.png" height="320" width="350"/></div>
                <div style="margin-top: 15px; margin-bottom: 90px;" id="searchInput">
                    <el-input placeholder="请输入内容" v-model="input3" style="width: 900px;">
                        <el-select v-model="value" slot="prepend" placeholder="标题" style="width: 140px;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                <div @click="getType(item.label)">{{item.label}}</div>
                            </el-option>
                        </el-select>
                        <el-button slot="append" icon="el-icon-search" @click="sendSearch(input3, type)"></el-button>
                    </el-input>
                    <el-link type="danger" :underline="false" style="margin-left: 10px; font-size: 16px"
                             @click="gotoCompSearch()">高级检索
                    </el-link>
                </div>
                <el-row style="margin-bottom: 60px">
                    <!--                卡片-1-左-->
                    <el-col :span="6" :offset="2">
                        <div>
                            <el-card shadow="hover" class="box-card" style="width: 420px; height: 340px;">
                                <div slot="header" class="clearfix">
                                    <span style="float: left">学术焦点</span>
                                </div>
                                <div>
                                </div>
                                <div style="width: 380px;height: 200px;">
                                    <div v-for="rank in ranks" style="width: 380px; height: 50px;margin-bottom: 1px ">
                                        <svg class="icon"
                                             style=" float: left; width: 40px;height: 30px; margin: 5px 0px 15px 0px;">
                                            <use xlink:href="#icon-bingren"></use>
                                        </svg>
                                        <ul style="width: 330px; height: 30px; margin: 5px 0px 10px -40px; float: right;">
                                            <el-link v-bind:href="'/paper/?paper_id='+rank.id" style="float: left;">{{rank.title}}
                                            </el-link>
                                        </ul>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </el-col>
                    <!--                卡片-1-中-->
                    <el-col :span="7" :offset="1">
                        <div>
                            <el-card shadow="hover" class="box-card" style="width: 420px; height: 340px">
                                <div slot="header" class="clearfix">
                                    <span style="float: left">热门专家</span>
                                </div>
                                <div style="width: 380px; height: 240px">
                                    <div v-for="lib in library" style="width: 380px; height: 50px; margin-top: -6px">
                                        <svg class="icon"
                                             style="float: left;margin-top: 5px;margin-left: 5px; font-size: 30px">
                                            <use xlink:href="#icon-tangguo"></use>
                                        </svg>
                                        <ul style="float:right; width: 300px; margin-top: 7px">
                                            <el-link v-bind:href="'/author?author_id='+lib.id" style="float: left">{{lib.name}}</el-link>
                                        </ul>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </el-col>
                    <!--                卡片-1-右-->
                    <el-col :span="8">
                        <div>
                            <el-card shadow="hover" class="box-card" style="width: 420px; height: 340px">
                                <div slot="header" class="clearfix">
                                    <span style="float: left">热门帖子</span>
                                </div>
                                <div v-for="sci in science" class="text item"
                                     style="width: 380px; height: 20px;margin-top: 3% ">
                                    <svg class="icon"
                                         style="float: left;width: 40px;height: 35px; margin: -2px 0px 15px 0px;">
                                        <use xlink:href="#icon-tianshi"></use>
                                    </svg>
                                    <div style="float:left; width: 300px;">
                                        <el-link v-bind:href="'/BlogItem/'+sci.userid+'/'+sci.blogid">{{sci.blogname}}
                                        </el-link>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
            <el-footer>

            </el-footer>
        </el-container>
    </div>

</template>

<script>
    import NewNavigation from '../navigatorandsearch/NewNavigation';

    export default {
        name: "Search",
        components: {
            NewNavigation
        },
        data() {
            return {
                professor: '',
                proRank: '#1',
                proIntroduction: 'Pro Introduction',
                options: [{
                    value: '选项1',
                    label: '标题'
                }, {
                    value: '选项2',
                    label: '关键词'
                }, {
                    value: '选项3',
                    label: '作者'
                }, {
                    value: '选项4',
                    label: '机构'
                }, {
                    value: '选项5',
                    label: '领域'
                }, {
                    value: '选项6',
                    label: '刊物'
                }, {
                    value: '选项7',
                    label: '摘要'
                }, {
                    value: '选项8',
                    label: 'ISSN'
                }, {
                    value: '选项9',
                    label: 'ISBN'
                }, {
                    value: '选项10',
                    label: 'DOI'
                }],
                value: '',
                ranks: [{
                    id: '',
                    title: '',
                    n_citation: ''
                }],
                library: [{
                    id: '',
                    name: '',
                    h_index: '',
                    n_pubs: '',
                    n_citation: '',
                }],
                science: [{
                    avatar: '',
                    blogid: '',
                    blogname: '',
                    htmlcontent: '',
                    likenum: '',
                    readnum: '',
                    textcontent: '',
                    tipnum: '',
                    userid: '',
                }],
                input3: '',
                type: '标题'
            }
        },
        mounted() {
            this.getRanks()
            this.getLibrary()
            this.getScience()
        },
        methods: {
            //高级检索跳转
            gotoCompSearch() {
                this.$router.push('/AdvancedSearch')
            },
            //学术焦点
            getRanks() {
                var that = this
                this.$axios.post('/apis/search/popularpapers',
                ).then(res => {
                    console.log(res);
                    that.ranks = res.data
                })
            },
            //热门专家
            getLibrary() {
                var that = this
                this.$axios.post('/apis/search/popularauthors')
                    .then(res => {
                        console.log(res);
                        that.library = res.data
                    })
            },
            // 热门帖子
            getScience() {
                var that = this
                this.$axios.post('/apis/blog/gethotblogs',
                    {
                        type: 0
                    },)
                    .then(res => {
                        console.log(res);
                        that.science = res.data.data.list
                    })
            },
            getType(label) {
                this.type = label
            },
            sendSearch(input, type) {
                if (input.length === 0) {
                    this.$message({
                        type: 'info',
                        message: '请输入搜索内容！'
                    })
                } else {
                    this.$router.push({
                        path: '/Searching',
                        query: {
                            input: input,
                            type: type
                        }
                    })
                }
            }
        }
    }
</script>

<style>
    body {
        background-image: url('../../assets/image/user/image/login-back.png');
    }
</style>
<style lang="scss" scoped>
#searchInput{
    /deep/ .el-input-group__prepend{
        background-color:#FFF;
        border:2px solid #005bac;
        box-shadow: 0 1px 4px 0 rgba(0,0,0,.2);
        border-right-width: 0;
    }
    /deep/ .el-input-group>.el-input__inner{
        border:2px solid #df5747;
        box-shadow: 0 1px 4px 0 rgba(0,0,0,.2);
        border-right-width: 0;
        border-left-width: 0;
    }
    /deep/ .el-input-group__append{
        background-color:#FFF;
        border:2px solid #df5747;
        box-shadow: 0 1px 4px 0 rgba(0,0,0,.2);
        border-left-width: 0;
    }
}

    /deep/ .el-carousel__item[data-v-1a1d373c]:nth-child(2n+1) {
        background-color: #df5747;
        color: white;
    }

    /deep/ .el-carousel__item[data-v-1a1d373c]:nth-child(2n) {
        background-color: #005bac;
        color: white;
    }

    /deep/ .el-carousel__mask {
        width: 100%;
        background-color: #FFF;
        opacity: .24;
        transition: .2s;
    }

    /*#df5747*/
    /deep/ .el-card__header {
        background-color: #005bac;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
    }

    /deep/ .el-card__body {
        display: flex;
        flex-direction: column;
        background-color: white;
    }

    /deep/ .el-input__inner {
        height: 55px;
        border-style: solid solid solid solid;
        font-size: 16px;
    }

    /deep/ .el-input-group__prepend {
        /*background-color: #db8fbe;*/
        border-style: solid;
        border-radius: 27px 0 0 27px;
        /*color: white;*/
    }

    /deep/ .el-input-group__append {
        /*background-color: #db8fbe;*/
        border-style: solid;
        border-radius: 0 27px 27px 0;
        /*color: white;*/
    }

    .el-select .el-input {
        width: 130px;
    }

    .input-with-select .el-input-group__prepend {
        background-color: #fff;
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
        width: 480px;
    }

    .el-carousel__item h3 {
        color: mediumpurple;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>