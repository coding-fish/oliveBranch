<template>
    <el-container>
        <el-main>
            <div v-for="(item,index) in msgCollection" :key="index">
                <el-card class="box-card" style="margin-bottom: 20px">
                    <div class="text item" style="margin-left: 20px">
                        {{ item.name }} 评论了你的 {{item.blog_title}}
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
        name: 'commentMsg',
        components: {
            NewNavigation,
        },
        data(){
            return{
                blank: false,
                msgCollection:[
                ],
            }
        },
        mounted() {
            this.getCommentMsg()
        },
        methods: {
            getCommentMsg() {
                var that=this
                this.$axios({
                    url:'/apis/message/getcommentmessage',
                    method:"post",
                }).then(res=>{
                    console.log(res);
                    that.msgCollection = res.data.data.msgCollection
                    that.commentMsgNum = res.data.data.msgCollection.length
                })
            },
            dele(id){
                var that = this
                this.$axios.post('/apis/message/readcommentmessage',
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