<template>
    <el-container>
        <el-main>
            <div v-for="(item,index) in msgCollection" :key="index">
                <el-card class="box-card" style="margin-bottom: 20px">
                    <div class="text item" style="margin-left: 20px">
                       你的 {{item.message}}被举报了！
                    </div>
                    <el-button type="primary" style="margin:10px; float: right" @click="dele(item.message_id)">
                        已阅
                    </el-button>

                </el-card>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import NewNavigation from "../navigatorandsearch/NewNavigation";
    export default {
        name: 'reportedMsg',
        components: {
            NewNavigation,
        },
        data(){
            return{
                msgCollection:[
                ]
            }
        },
        mounted() {
            this.getReportedMsg()
        },
        methods: {
            getReportedMsg() {
                var that=this
                this.$axios({
                    url:'/apis/message/getreportmessage',
                    method:"post",
                }).then(res=>{
                    console.log(res);
                    that.msgCollection = res.data.data.msgCollection
                    that.reportedMsgNum = res.data.data.msgCollection.length
                })
            },
            dele(id){
                var that = this
                this.$axios.post('/apis/message/readreportmessage',
                    {
                        message_id: id
                    },).then(res=>{
                    console.log(res);
                    that.$router.go(0)
                })
            }
        }
    }
</script>

<style scoped>
    body{
        background-image: url('../../assets/image/user/image/login-back.png');
    }
    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .box-card {
        width: 1200px;
    }
</style>